import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  RotateCcw,
  Terminal,
  Table as TableIcon,
  Sparkles,
  Database,
  FileCode,
  Loader2
} from "lucide-react";
import { pyodideService, ExecutionResult } from "../services/pyodideService";

const TEMPLATES: Record<string, { label: string; code: string }> = {
  blank: {
    label: "Python en blanco",
    code: `# Sandbox libre - Python 3 + NumPy + pandas
import numpy as np
import pandas as pd

print("¡Hola desde Pyodide en el navegador!")
`
  },
  pacientes: {
    label: "Dataset: Pacientes (/data/pacientes.csv)",
    code: `import pandas as pd
import numpy as np

# Cargar dataset de pacientes con problemas de formato
df = pd.read_csv("/data/pacientes.csv")

print("Dimensiones:", df.shape)
print("Columnas:", list(df.columns))

# Mostrar primeras filas (se renderizarán en la pestaña Vista Previa)
result = df.head(10)
`
  },
  municipios: {
    label: "Dataset: Municipios (/data/municipios.csv)",
    code: `import pandas as pd

df_mun = pd.read_csv("/data/municipios.csv")
print("Total municipios:", len(df_mun))

# Resumen por zona
resumen = df_mun.groupby("zona")["poblacion"].agg(["count", "mean", "sum"])
print(resumen)

result = df_mun
`
  },
  empleo: {
    label: "Dataset: Encuesta de Empleo (/data/encuesta_empleo.csv)",
    code: `import pandas as pd
import numpy as np

df_emp = pd.read_csv("/data/encuesta_empleo.csv")

# Ingreso promedio por sector en ocupados
ocupados = df_emp[df_emp["ocupado"] == 1]
tabla = ocupados.groupby("sector")["ingreso"].mean().round(2).reset_index()

print(tabla)
result = tabla
`
  },
  ventas: {
    label: "Dataset: Ventas de Tienda (/data/ventas_tienda.csv)",
    code: `import pandas as pd

df_ventas = pd.read_csv("/data/ventas_tienda.csv", parse_dates=["fecha"])

# Crear columna de facturación
df_ventas["facturacion"] = df_ventas["unidades"] * df_ventas["precio"]

# Tabla dinámica por tienda y categoría
tabla = df_ventas.pivot_table(
    index="tienda",
    columns="categoria",
    values="facturacion",
    aggfunc="sum",
    fill_value=0
).round(2)

result = tabla
`
  },
  numpy: {
    label: "NumPy: Broadcasting y Estandarización",
    code: `import numpy as np

# Generar matriz aleatoria de características (6 x 3)
rng = np.random.default_rng(42)
X = rng.integers(10, 100, size=(6, 3)).astype(float)

# Estandarizar por columna (media 0, std 1)
X_scaled = (X - X.mean(axis=0)) / X.std(axis=0)

print("Original:\\n", X)
print("\\nMedias por columna tras escalar:", np.round(X_scaled.mean(axis=0), 2))
print("Desviaciones tras escalar:", np.round(X_scaled.std(axis=0), 2))

result = X_scaled
`
  }
};

export const SandboxPage: React.FC = () => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>("pacientes");
  const [code, setCode] = useState<string>(TEMPLATES["pacientes"].code);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [activeTab, setActiveTab] = useState<"console" | "preview">("preview");

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setCode(TEMPLATES[key].code);
    setExecutionResult(null);
  };

  const handleExecute = async () => {
    if (isRunning) return;
    setIsRunning(true);
    try {
      const res = await pyodideService.executeCode(code);
      setExecutionResult(res);
      if (res.previewHtml || res.previewRepr) {
        setActiveTab("preview");
      } else {
        setActiveTab("console");
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        stdout: "",
        stderr: "Error al ejecutar: " + (err?.message || String(err)),
        error: err?.message || String(err)
      });
      setActiveTab("console");
    } finally {
      setIsRunning(false);
    }
  };

  // Keyboard shortcut Ctrl/Cmd + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleExecute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900 m-0">Sandbox Libre</h1>
          <p className="text-xs text-slate-500">
            Experimenta sin tests. Los 4 archivos CSV están montados en <code>/data/*.csv</code>.
          </p>
        </div>

        {/* Template dropdown + Run Button */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-xs text-slate-600">
            <FileCode className="w-4 h-4 text-slate-400" />
            <span className="font-semibold hidden md:inline">Plantilla:</span>
            <select
              value={selectedTemplateKey}
              onChange={e => handleSelectTemplate(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {Object.entries(TEMPLATES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setCode(TEMPLATES[selectedTemplateKey].code)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors"
            title="Restablecer plantilla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white" />
            )}
            <span>Ejecutar (Ctrl+Enter)</span>
          </button>
        </div>
      </div>

      {/* Editor + Output split */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Editor */}
        <div className="lg:col-span-7 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={val => setCode(val || "")}
              options={{
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                tabSize: 4,
                automaticLayout: true
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-5 bg-slate-950 text-white flex flex-col h-full overflow-hidden">
          {/* Output tabs header */}
          <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs shrink-0">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1 rounded-md font-semibold flex items-center space-x-1.5 transition-colors ${
                  activeTab === "preview" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Vista Previa de Datos</span>
              </button>

              <button
                onClick={() => setActiveTab("console")}
                className={`px-3 py-1 rounded-md font-semibold flex items-center space-x-1.5 transition-colors ${
                  activeTab === "console" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Consola / Salida</span>
              </button>
            </div>

            {executionResult?.executionTimeMs !== undefined && (
              <span className="text-[11px] text-slate-400">
                {executionResult.executionTimeMs} ms
              </span>
            )}
          </div>

          {/* Output Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
            {activeTab === "preview" && (
              <div>
                {executionResult?.previewHtml ? (
                  <div className="space-y-3">
                    <div className="text-[11px] text-indigo-300 font-bold">
                      {executionResult.previewRepr}
                    </div>
                    <div
                      className="df-table-container bg-white text-slate-900 rounded-xl overflow-x-auto shadow-xs"
                      dangerouslySetInnerHTML={{ __html: executionResult.previewHtml }}
                    />
                  </div>
                ) : executionResult?.previewRepr ? (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-sky-300 whitespace-pre-wrap">
                    {executionResult.previewRepr}
                  </div>
                ) : (
                  <div className="text-slate-500 italic p-4 text-center">
                    Asigna un DataFrame o array a una variable como <code>df</code> o <code>result</code> para verlo aquí tabulado.
                  </div>
                )}
              </div>
            )}

            {activeTab === "console" && (
              <div className="space-y-2">
                {executionResult?.stdout && (
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">STDOUT:</span>
                    <pre className="text-emerald-400 whitespace-pre-wrap">{executionResult.stdout}</pre>
                  </div>
                )}

                {executionResult?.stderr && (
                  <div>
                    <span className="text-rose-400 text-[10px] uppercase font-bold block mb-1">STDERR:</span>
                    <pre className="text-rose-300 whitespace-pre-wrap bg-rose-950/40 p-3 rounded-xl border border-rose-900/50">
                      {executionResult.stderr}
                    </pre>
                  </div>
                )}

                {!executionResult?.stdout && !executionResult?.stderr && !isRunning && (
                  <p className="text-slate-500 italic">
                    Presiona "Ejecutar" para ver la salida de tus instrucciones en consola.
                  </p>
                )}

                {isRunning && (
                  <p className="text-indigo-400 animate-pulse">Ejecutando en Pyodide...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
