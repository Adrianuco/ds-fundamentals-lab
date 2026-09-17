// Pyodide Client Service
// Bulletproof Dual-Mode: Uses Web Worker when supported, with automatic Main-Thread fallback.

export interface TestResult {
  name: string;
  passed: boolean;
  error?: string | null;
}

export interface ExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  previewHtml?: string | null;
  previewRepr?: string | null;
  previewType?: string | null;
  error?: string;
  executionTimeMs?: number;
}

export interface CheckTestsResult {
  success: boolean;
  stdout: string;
  stderr: string;
  testResults: TestResult[];
  error?: string;
  executionTimeMs?: number;
}

type ProgressCallback = (status: { message: string; percent: number }) => void;

class PyodideService {
  private worker: Worker | null = null;
  private pyodideMain: any = null;
  private isReady: boolean = false;
  private isLoading: boolean = false;
  private loadError: string | null = null;
  private useMainThread: boolean = false;
  private progressListeners: Set<ProgressCallback> = new Set();
  private readyListeners: Set<() => void> = new Set();
  private pendingRequests: Map<string, {
    resolve: (val: any) => void;
    reject: (err: any) => void;
    timeoutId: any;
  }> = new Map();
  private reqCounter = 0;

  constructor() {}

  public onProgress(cb: ProgressCallback) {
    this.progressListeners.add(cb);
    return () => this.progressListeners.delete(cb);
  }

  public onReady(cb: () => void) {
    if (this.isReady) {
      cb();
    } else {
      this.readyListeners.add(cb);
    }
    return () => this.readyListeners.delete(cb);
  }

  public getStatus() {
    return {
      isReady: this.isReady,
      isLoading: this.isLoading,
      loadError: this.loadError
    };
  }

  private notifyProgress(message: string, percent: number) {
    this.progressListeners.forEach(cb => cb({ message, percent }));
  }

  private markReady() {
    this.isReady = true;
    this.isLoading = false;
    this.readyListeners.forEach(cb => cb());
    this.readyListeners.clear();
  }

  public async init(): Promise<void> {
    if (this.isReady) return Promise.resolve();
    if (this.isLoading) {
      return new Promise(resolve => this.onReady(resolve));
    }

    this.isLoading = true;
    this.loadError = null;

    // First, attempt to use Web Worker (classic worker from public/pyodide.worker.js)
    try {
      await this.initWorker();
      return;
    } catch (workerErr) {
      console.warn("Worker initialization failed or timed out. Falling back to Main Thread Pyodide:", workerErr);
    }

    // Fallback to Main Thread Pyodide
    try {
      await this.initMainThread();
    } catch (mainErr: any) {
      this.isLoading = false;
      this.loadError = "Error al inicializar Pyodide: " + (mainErr?.message || String(mainErr));
      throw mainErr;
    }
  }

  private initWorker(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Classic worker without type="module", so importScripts works cleanly
        this.worker = new Worker("/pyodide.worker.js");

        const timeout = setTimeout(() => {
          reject(new Error("Worker timeout on init"));
        }, 12000);

        this.worker.onmessage = (e: MessageEvent) => {
          const { id, type, message, percent, error } = e.data || {};

          if (type === "PROGRESS") {
            this.notifyProgress(message, percent);
          } else if (type === "READY") {
            clearTimeout(timeout);
            this.markReady();
            resolve();
          } else if (type === "INIT_ERROR") {
            clearTimeout(timeout);
            reject(new Error(error));
          } else if (id && this.pendingRequests.has(id)) {
            const req = this.pendingRequests.get(id)!;
            clearTimeout(req.timeoutId);
            this.pendingRequests.delete(id);
            req.resolve(e.data);
          }
        };

        this.worker.onerror = (err) => {
          clearTimeout(timeout);
          reject(err);
        };

        this.worker.postMessage({ type: "INIT" });
      } catch (e) {
        reject(e);
      }
    });
  }

  private async initMainThread(): Promise<void> {
    this.useMainThread = true;
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch (e) {}
      this.worker = null;
    }

    this.notifyProgress("Cargando Pyodide en el navegador...", 30);

    // Ensure loadPyodide is available globally
    if (typeof (window as any).loadPyodide === "undefined") {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("No se pudo cargar el script de Pyodide"));
        document.head.appendChild(script);
      });
    }

    this.notifyProgress("Descargando runtime WebAssembly...", 50);
    this.pyodideMain = await (window as any).loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    });

    this.notifyProgress("Cargando paquetes NumPy y pandas...", 70);
    await this.pyodideMain.loadPackage(["numpy", "pandas"]);

    this.notifyProgress("Montando datasets en el sistema de archivos...", 85);
    try {
      this.pyodideMain.FS.mkdir("/data");
    } catch (e) {}

    const datasets = ["pacientes.csv", "municipios.csv", "encuesta_empleo.csv", "ventas_tienda.csv"];
    for (const ds of datasets) {
      try {
        const resp = await fetch("/data/" + ds);
        if (resp.ok) {
          const text = await resp.text();
          this.pyodideMain.FS.writeFile("/data/" + ds, text);
          this.pyodideMain.FS.writeFile("/" + ds, text);
          this.pyodideMain.FS.writeFile(ds, text);
        }
      } catch (err) {
        console.warn("No se pudo precargar " + ds, err);
      }
    }

    await this.pyodideMain.runPythonAsync(`
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

    this.markReady();
  }

  private getRequestId(): string {
    return `req_${Date.now()}_${++this.reqCounter}`;
  }

  public async executeCode(code: string, setupCode: string = "", timeoutMs = 9000): Promise<ExecutionResult> {
    if (!this.isReady) {
      await this.init();
    }

    const startTime = performance.now();

    // If using Web Worker
    if (this.worker && !this.useMainThread) {
      const id = this.getRequestId();
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          if (this.pendingRequests.has(id)) {
            this.pendingRequests.delete(id);
            this.restartWorker();
            resolve({
              success: false,
              stdout: "",
              stderr: "Tiempo de ejecución excedido (Timeout ~8s). Revisa si tienes bucles infinitos.",
              error: "TimeoutError",
              executionTimeMs: timeoutMs
            });
          }
        }, timeoutMs);

        this.pendingRequests.set(id, {
          resolve: (data: any) => {
            const endTime = performance.now();
            resolve({
              success: data.success,
              stdout: data.stdout || "",
              stderr: data.stderr || "",
              previewHtml: data.previewHtml,
              previewRepr: data.previewRepr,
              previewType: data.previewType,
              error: data.error,
              executionTimeMs: Math.round(endTime - startTime)
            });
          },
          reject: (err: any) => {
            resolve({
              success: false,
              stdout: "",
              stderr: err?.message || String(err),
              error: err?.message || String(err),
              executionTimeMs: Math.round(performance.now() - startTime)
            });
          },
          timeoutId
        });

        this.worker!.postMessage({
          id,
          type: "EXECUTE",
          payload: { code, setupCode }
        });
      });
    }

    // Main thread execution fallback
    try {
      const fullCode = (setupCode ? setupCode + "\n" : "") + code;
      this.pyodideMain.globals.set("__user_code__", fullCode);

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
      const [stdout, stderr, previewHtml, previewRepr, previewType] = await this.pyodideMain.runPythonAsync(runnerPython);
      const endTime = performance.now();

      return {
        success: true,
        stdout: stdout || "",
        stderr: stderr || "",
        previewHtml,
        previewRepr,
        previewType,
        executionTimeMs: Math.round(endTime - startTime)
      };
    } catch (err: any) {
      const endTime = performance.now();
      return {
        success: false,
        stdout: "",
        stderr: err?.message || String(err),
        error: err?.message || String(err),
        executionTimeMs: Math.round(endTime - startTime)
      };
    }
  }

  public async checkTests(
    code: string,
    setupCode: string = "",
    tests: Array<{ name: string; check: string; hint?: string }>,
    timeoutMs = 9000
  ): Promise<CheckTestsResult> {
    if (!this.isReady) {
      await this.init();
    }

    const startTime = performance.now();

    // If using Web Worker
    if (this.worker && !this.useMainThread) {
      const id = this.getRequestId();
      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          if (this.pendingRequests.has(id)) {
            this.pendingRequests.delete(id);
            this.restartWorker();
            resolve({
              success: false,
              stdout: "",
              stderr: "Tiempo de ejecución de pruebas excedido (Timeout ~8s).",
              testResults: tests.map(t => ({
                name: t.name,
                passed: false,
                error: "Timeout al evaluar pruebas."
              })),
              error: "TimeoutError",
              executionTimeMs: timeoutMs
            });
          }
        }, timeoutMs);

        this.pendingRequests.set(id, {
          resolve: (data: any) => {
            const endTime = performance.now();
            resolve({
              success: data.success,
              stdout: data.stdout || "",
              stderr: data.stderr || "",
              testResults: data.testResults || [],
              error: data.error,
              executionTimeMs: Math.round(endTime - startTime)
            });
          },
          reject: (err: any) => {
            resolve({
              success: false,
              stdout: "",
              stderr: err?.message || String(err),
              testResults: tests.map(t => ({
                name: t.name,
                passed: false,
                error: err?.message || "Error al verificar tests"
              })),
              error: err?.message || String(err),
              executionTimeMs: Math.round(performance.now() - startTime)
            });
          },
          timeoutId
        });

        this.worker!.postMessage({
          id,
          type: "CHECK_TESTS",
          payload: { code, setupCode, tests }
        });
      });
    }

    // Main thread execution fallback
    try {
      const fullCode = (setupCode ? setupCode + "\n" : "") + code;
      this.pyodideMain.globals.set("__user_code__", fullCode);
      this.pyodideMain.globals.set("__tests_json__", JSON.stringify(tests));

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
      const rawResult = await this.pyodideMain.runPythonAsync(testRunnerPython);
      const parsed = JSON.parse(rawResult);
      const endTime = performance.now();

      return {
        success: true,
        stdout: parsed.stdout || "",
        stderr: parsed.stderr || "",
        testResults: parsed.results || [],
        executionTimeMs: Math.round(endTime - startTime)
      };
    } catch (err: any) {
      const endTime = performance.now();
      return {
        success: false,
        stdout: "",
        stderr: err?.message || String(err),
        testResults: tests.map(t => ({
          name: t.name,
          passed: false,
          error: err?.message || "Error al verificar tests"
        })),
        error: err?.message || String(err),
        executionTimeMs: Math.round(endTime - startTime)
      };
    }
  }

  private restartWorker() {
    try {
      if (this.worker) {
        this.worker.terminate();
        this.worker = null;
      }
      this.isReady = false;
      this.isLoading = false;
      this.init().catch(e => console.error("Worker restart failed", e));
    } catch (e) {
      console.error("Error restarting worker", e);
    }
  }
}

export const pyodideService = new PyodideService();
