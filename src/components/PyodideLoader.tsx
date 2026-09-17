import React from "react";
import { Loader2, Terminal, CheckCircle } from "lucide-react";

interface PyodideLoaderProps {
  progressMessage: string;
  percent: number;
  error?: string | null;
  onRetry?: () => void;
}

export const PyodideLoader: React.FC<PyodideLoaderProps> = ({
  progressMessage,
  percent,
  error,
  onRetry
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
          {error ? (
            <span className="text-2xl">⚠️</span>
          ) : (
            <Terminal className="w-8 h-8 animate-pulse text-indigo-600" />
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {error ? "Error al inicializar Python" : "Cargando Python en el navegador..."}
        </h3>

        <p className="text-sm text-slate-500 mb-6">
          {error
            ? error
            : "Pyodide está preparando el entorno de ejecución Python 3, NumPy y pandas directamente en tu navegador."}
        </p>

        {!error ? (
          <div className="space-y-3">
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.max(5, percent)}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="truncate pr-2">{progressMessage || "Descargando binarios WebAssembly..."}</span>
              <span className="font-semibold text-slate-600">{percent}%</span>
            </div>

            <p className="text-xs text-slate-400 pt-2 border-t border-slate-100 italic">
              Nota: La primera carga descarga WebAssembly (~20MB) y puede tardar unos segundos. Se almacena en caché para las siguientes visitas.
            </p>
          </div>
        ) : (
          <button
            onClick={onRetry}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Reintentar inicialización
          </button>
        )}
      </div>
    </div>
  );
};
