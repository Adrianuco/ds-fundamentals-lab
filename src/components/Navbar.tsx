import React from "react";
import { BookOpen, Code2, Database, Terminal, CheckCircle2, ShieldAlert, Award } from "lucide-react";
import { allExercises } from "../data/exercises";
import { storageService } from "../services/storageService";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  examMode: boolean;
  onToggleExamMode: () => void;
  pyodideReady: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  examMode,
  onToggleExamMode,
  pyodideReady
}) => {
  const progress = storageService.getAllProgress();
  const completedCount = allExercises.filter(ex => progress[ex.id]?.completed).length;
  const totalCount = allExercises.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">Fundamentos DS Lab</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-medium border border-indigo-100">
                  Pre-GCI
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Gimnasio de Python, NumPy y pandas</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onNavigate("home")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate("plan")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === "plan"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Plan de Estudio
            </button>
            <button
              onClick={() => onNavigate("exercises")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === "exercises"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Ejercicios
            </button>
            <button
              onClick={() => onNavigate("cheatsheet")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === "cheatsheet"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Cheatsheet
            </button>
            <button
              onClick={() => onNavigate("sandbox")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === "sandbox"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Sandbox
            </button>
          </nav>

          {/* Actions: Progress, Exam Mode, Pyodide status */}
          <div className="flex items-center space-x-4">
            {/* Global progress pill */}
            <div
              className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors"
              onClick={() => onNavigate("plan")}
              title={`${completedCount} de ${totalCount} ejercicios completados`}
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <div className="text-xs font-semibold text-slate-700">
                {percentage}% <span className="text-slate-400 font-normal">({completedCount}/{totalCount})</span>
              </div>
            </div>

            {/* Exam Mode Toggle */}
            <button
              onClick={onToggleExamMode}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                examMode
                  ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
              }`}
              title="Modo Examen: Oculta pistas y soluciones de referencia"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Modo Examen</span>
              <span className={`w-2 h-2 rounded-full ${examMode ? "bg-white" : "bg-slate-300"}`} />
            </button>

            {/* Pyodide status indicator */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  pyodideReady ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-ping"
                }`}
              />
              <span className="text-slate-500 hidden lg:inline">
                {pyodideReady ? "Python listo" : "Cargando Python..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center justify-around text-xs font-medium">
        <button
          onClick={() => onNavigate("home")}
          className={`px-2 py-1 rounded ${currentPage === "home" ? "text-indigo-600 font-bold" : "text-slate-600"}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate("plan")}
          className={`px-2 py-1 rounded ${currentPage === "plan" ? "text-indigo-600 font-bold" : "text-slate-600"}`}
        >
          Plan (10)
        </button>
        <button
          onClick={() => onNavigate("exercises")}
          className={`px-2 py-1 rounded ${currentPage === "exercises" ? "text-indigo-600 font-bold" : "text-slate-600"}`}
        >
          Catálogo
        </button>
        <button
          onClick={() => onNavigate("cheatsheet")}
          className={`px-2 py-1 rounded ${currentPage === "cheatsheet" ? "text-indigo-600 font-bold" : "text-slate-600"}`}
        >
          Cheatsheet
        </button>
        <button
          onClick={() => onNavigate("sandbox")}
          className={`px-2 py-1 rounded ${currentPage === "sandbox" ? "text-indigo-600 font-bold" : "text-slate-600"}`}
        >
          Sandbox
        </button>
      </div>
    </header>
  );
};
