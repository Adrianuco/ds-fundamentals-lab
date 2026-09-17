// Classic Web Worker for Pyodide (no type="module", so importScripts works everywhere)
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

let pyodide = null;
let initialized = false;

async function initPyodideRuntime() {
  if (initialized) return;

  self.postMessage({ type: "PROGRESS", message: "Descargando motor Pyodide...", percent: 20 });

  // In a classic worker, importScripts is fully supported
  importScripts(PYODIDE_CDN + "pyodide.js");

  const loader = self.loadPyodide || globalThis.loadPyodide || (typeof loadPyodide !== "undefined" ? loadPyodide : null);
  if (!loader) {
    throw new Error("loadPyodide no está disponible tras cargar pyodide.js");
  }

  pyodide = await loader({
    indexURL: PYODIDE_CDN
  });

  self.postMessage({ type: "PROGRESS", message: "Cargando NumPy y pandas...", percent: 65 });
  await pyodide.loadPackage(["numpy", "pandas"]);

  self.postMessage({ type: "PROGRESS", message: "Montando datasets locales...", percent: 85 });

  try {
    pyodide.FS.mkdir("/data");
  } catch (e) {}

  const datasets = ["pacientes.csv", "municipios.csv", "encuesta_empleo.csv", "ventas_tienda.csv"];
  const origin = (self.location && self.location.origin) ? self.location.origin : "";
  for (const ds of datasets) {
    try {
      const resp = await fetch(origin + "/data/" + ds);
      if (resp.ok) {
        const text = await resp.text();
        pyodide.FS.writeFile("/data/" + ds, text);
        pyodide.FS.writeFile("/" + ds, text);
        pyodide.FS.writeFile(ds, text);
      }
    } catch (err) {
      console.warn("No se pudo precargar " + ds, err);
    }
  }

  // Helper Python environment
  await pyodide.runPythonAsync(`
import sys
import io
import json
import numpy as np
import pandas as pd

class OutputCapture:
    def __enter__(self):
        self._stdout = sys.stdout
        self._stderr = sys.stderr
        self.stdout_io = io.StringIO()
        self.stderr_io = io.StringIO()
        sys.stdout = self.stdout_io
        sys.stderr = self.stderr_io
        return self

    def __exit__(self, *args):
        sys.stdout = self._stdout
        sys.stderr = self._stderr
        self.stdout_val = self.stdout_io.getvalue()
        self.stderr_val = self.stderr_io.getvalue()
`);

  initialized = true;
  self.postMessage({ type: "READY" });
}

self.onmessage = async function(e) {
  const data = e.data || {};
  const id = data.id;
  const type = data.type;
  const payload = data.payload || {};

  if (type === "INIT") {
    try {
      await initPyodideRuntime();
    } catch (err) {
      self.postMessage({ type: "INIT_ERROR", error: err && err.message ? err.message : String(err) });
    }
    return;
  }

  if (type === "EXECUTE") {
    try {
      if (!initialized) {
        await initPyodideRuntime();
      }

      const code = payload.code || "";
      const setupCode = payload.setupCode || "";
      const fullCode = (setupCode ? setupCode + "\n" : "") + code;

      pyodide.globals.set("__user_code__", fullCode);

      const runnerPython = `
with OutputCapture() as cap:
    _exec_globals = {
        '__name__': '__main__',
        'np': np,
        'pd': pd
    }
    exec(__user_code__, _exec_globals)

_stdout_out = cap.stdout_val
_stderr_out = cap.stderr_val

_preview_html = None
_preview_repr = None
_preview_type = None

_candidates = ['result', 'clean', 'df', 'res', 'ans', 'avg', 'summary', 'joined', 'merged', 'arr', 's', 'tabla']
_found_var = None

for _cand in _candidates:
    if _cand in _exec_globals:
        _found_var = _exec_globals[_cand]
        break

if _found_var is not None:
    _preview_type = type(_found_var).__name__
    if isinstance(_found_var, pd.DataFrame):
        _preview_html = _found_var.head(25).to_html(classes="table-auto w-full text-xs text-left border-collapse", border=0)
        _preview_repr = f"DataFrame: {_found_var.shape[0]} filas × {_found_var.shape[1]} columnas\\nColumnas: {list(_found_var.columns)}"
    elif isinstance(_found_var, pd.Series):
        _preview_html = _found_var.head(25).to_frame().to_html(classes="table-auto w-full text-xs text-left border-collapse", border=0)
        _preview_repr = f"Series (len={len(_found_var)}, dtype={_found_var.dtype})"
    elif isinstance(_found_var, np.ndarray):
        _preview_repr = f"ndarray (shape={_found_var.shape}, dtype={_found_var.dtype}):\\n{repr(_found_var)}"
    else:
        _preview_repr = repr(_found_var)

(_stdout_out, _stderr_out, _preview_html, _preview_repr, _preview_type)
`;
      const [stdout, stderr, previewHtml, previewRepr, previewType] = await pyodide.runPythonAsync(runnerPython);

      self.postMessage({
        id: id,
        type: "EXECUTE_RESULT",
        success: true,
        stdout: stdout || "",
        stderr: stderr || "",
        previewHtml: previewHtml,
        previewRepr: previewRepr,
        previewType: previewType
      });
    } catch (err) {
      self.postMessage({
        id: id,
        type: "EXECUTE_RESULT",
        success: false,
        error: err && err.message ? err.message : String(err),
        stdout: "",
        stderr: err && err.message ? err.message : String(err)
      });
    }
    return;
  }

  if (type === "CHECK_TESTS") {
    try {
      if (!initialized) {
        await initPyodideRuntime();
      }

      const code = payload.code || "";
      const setupCode = payload.setupCode || "";
      const tests = payload.tests || [];
      const fullCode = (setupCode ? setupCode + "\n" : "") + code;

      pyodide.globals.set("__user_code__", fullCode);
      pyodide.globals.set("__tests_json__", JSON.stringify(tests));

      const testRunnerPython = `
with OutputCapture() as cap:
    _exec_globals = {
        '__name__': '__main__',
        'np': np,
        'pd': pd
    }
    _syntax_or_runtime_err = None
    try:
        exec(__user_code__, _exec_globals)
    except Exception as e:
        _syntax_or_runtime_err = f"{type(e).__name__}: {str(e)}"

_stdout_out = cap.stdout_val
_stderr_out = cap.stderr_val

_tests = json.loads(__tests_json__)
_test_results = []

if _syntax_or_runtime_err is not None:
    for t in _tests:
        _test_results.append({
            "name": t.get("name", "Test"),
            "passed": False,
            "error": f"Error al ejecutar código: {_syntax_or_runtime_err}"
        })
else:
    for t in _tests:
        test_name = t.get("name", "Verificación")
        check_code = t.get("check", "")
        hint_on_fail = t.get("hint", "")
        try:
            passed = bool(eval(check_code, _exec_globals))
            if passed:
                _test_results.append({
                    "name": test_name,
                    "passed": True,
                    "error": None
                })
            else:
                _test_results.append({
                    "name": test_name,
                    "passed": False,
                    "error": hint_on_fail or "La verificación devolvió False. Revisa el valor o tipo esperado."
                })
        except AssertionError as ae:
            msg = str(ae) or hint_on_fail or "Aserción fallida."
            _test_results.append({
                "name": test_name,
                "passed": False,
                "error": msg
            })
        except Exception as te:
            msg = f"{type(te).__name__}: {str(te)}"
            if hint_on_fail:
                msg += f" ({hint_on_fail})"
            _test_results.append({
                "name": test_name,
                "passed": False,
                "error": msg
            })

json.dumps({
    "stdout": _stdout_out,
    "stderr": _stderr_out,
    "results": _test_results
})
`;
      const rawResult = await pyodide.runPythonAsync(testRunnerPython);
      const parsed = JSON.parse(rawResult);

      self.postMessage({
        id: id,
        type: "CHECK_TESTS_RESULT",
        success: true,
        stdout: parsed.stdout || "",
        stderr: parsed.stderr || "",
        testResults: parsed.results || []
      });
    } catch (err) {
      self.postMessage({
        id: id,
        type: "CHECK_TESTS_RESULT",
        success: false,
        error: err && err.message ? err.message : String(err),
        testResults: (payload.tests || []).map(function(t) {
          return {
            name: t.name || "Test",
            passed: false,
            error: err && err.message ? err.message : "Error al evaluar pruebas"
          };
        })
      });
    }
  }
};
