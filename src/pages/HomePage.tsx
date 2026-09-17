import React from "react";
import {
  Code,
  Grid,
  Table,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Award,
  BookOpen,
  ChevronRight,
  Bookmark
} from "lucide-react";
import { allExercises } from "../data/exercises";
import { studySessions } from "../data/sessions";
import { storageService } from "../services/storageService";

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const progress = storageService.getAllProgress();
  const lastExerciseId = storageService.getLastExerciseId() || "py-01";
  const lastExercise = allExercises.find(e => e.id === lastExerciseId) || allExercises[0];

  const favorites = storageService.getFavorites();
  const favoriteExercises = allExercises.filter(ex => favorites.includes(ex.id));

  const totalExercises = allExercises.length;
  const completedTotal = allExercises.filter(ex => progress[ex.id]?.completed).length;
  const globalPct = Math.round((completedTotal / totalExercises) * 100);

  // Module stats
  const pythonList = allExercises.filter(ex => ex.module === "python");
  const numpyList = allExercises.filter(ex => ex.module === "numpy");
  const pandasList = allExercises.filter(ex => ex.module === "pandas");

  const pythonCompleted = pythonList.filter(ex => progress[ex.id]?.completed).length;
  const numpyCompleted = numpyList.filter(ex => progress[ex.id]?.completed).length;
  const pandasCompleted = pandasList.filter(ex => progress[ex.id]?.completed).length;

  const pythonPct = Math.round((pythonCompleted / pythonList.length) * 100);
  const numpyPct = Math.round((numpyCompleted / numpyList.length) * 100);
  const pandasPct = Math.round((pandasCompleted / pandasList.length) * 100);

  // Find first uncompleted exercise for each module
  const firstUncompletedPython = pythonList.find(e => !progress[e.id]?.completed) || pythonList[0];
  const firstUncompletedNumpy = numpyList.find(e => !progress[e.id]?.completed) || numpyList[0];
  const firstUncompletedPandas = pandasList.find(e => !progress[e.id]?.completed) || pandasList[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Entrenamiento Técnico Intensivo</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white m-0">
            Fundamentos DS Lab
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Plataforma interactiva para dominar la manipulación técnica de datos en Python, NumPy y pandas.
            Aprende a transformar vectores, resolver joins complejos, limpiar datos sucios y agregar métricas con retroalimentación instantánea en el navegador.
          </p>

          {/* Mandatory Disclaimer */}
          <div className="flex items-start space-x-3 bg-amber-500/15 border border-amber-500/30 rounded-xl p-4 text-amber-200 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-300">Aviso importante:</strong> Este entorno{" "}
              <strong>no sustituye el curso GCI</strong>. Es un gimnasio de fundamentos técnicos diseñado para que llegues con soltura práctica a la modelación y analítica avanzada.
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("exercise", { id: lastExercise.id })}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continuar práctica ({lastExercise.id.toUpperCase()})</span>
            </button>
            <button
              onClick={() => onNavigate("plan")}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver Ruta de 10 Sesiones</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Progress Overview */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 m-0">Progreso Global de Aprendizaje</h2>
            <p className="text-sm text-slate-500 mt-1">
              Ejercicios completados satisfactoriamente con 100% de pruebas superadas.
            </p>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-indigo-600">{globalPct}%</span>
            <span className="text-sm text-slate-500 font-medium">({completedTotal} de {totalExercises} ejercicios)</span>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-sky-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(1, globalPct)}%` }}
          />
        </div>
      </div>

      {/* Favorites / Review Section (if student has saved exercises) */}
      {favoriteExercises.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Bookmark className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 m-0">Ejercicios Guardados para Repasar</h3>
                <p className="text-xs text-slate-600 m-0">
                  Tienes {favoriteExercises.length} ejercicio{favoriteExercises.length > 1 ? "s" : ""} marcado{favoriteExercises.length > 1 ? "s" : ""} como favoritos para repasar.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate("exercises")}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 inline-flex items-center space-x-1 self-start sm:self-auto"
            >
              <span>Ver todos en el catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {favoriteExercises.slice(0, 3).map(fav => (
              <div
                key={fav.id}
                onClick={() => onNavigate("exercise", { id: fav.id })}
                className="bg-white p-3.5 rounded-xl border border-amber-200/70 hover:border-amber-400 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <span className="font-bold text-slate-400 uppercase">{fav.id}</span>
                    <span className="px-1.5 py-0.2 rounded font-semibold text-[10px] uppercase bg-amber-100 text-amber-800">
                      {fav.module}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5 m-0 group-hover:text-indigo-600 transition-colors">
                    {fav.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The 3 Core Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-900 m-0">Módulos del Laboratorio</h2>
          <button
            onClick={() => onNavigate("exercises")}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center space-x-1"
          >
            <span>Ver todos ({totalExercises})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Python */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Python para Datos</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Listas, slicing con pasos, comprensión, acceso seguro a diccionarios, CSV mental a mano y tracebacks.
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{pythonPct}% completado</span>
                  <span>{pythonCompleted}/{pythonList.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pythonPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate("exercise", { id: firstUncompletedPython.id })}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continuar Python</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Module 2: NumPy */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">NumPy Vectorizado</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Broadcasting dimensional, reducciones con axis=0 y axis=1, máscaras lógicas, estandarización y distancias.
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{numpyPct}% completado</span>
                  <span>{numpyCompleted}/{numpyList.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${numpyPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate("exercise", { id: firstUncompletedNumpy.id })}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continuar NumPy</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Module 3: pandas */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Table className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">pandas en Producción</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  El núcleo: selección loc/iloc, saneamiento de nulos, groupby con named agg, merge relacional, reshape y capstone.
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{pandasPct}% completado</span>
                  <span>{pandasCompleted}/{pandasList.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pandasPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate("exercise", { id: firstUncompletedPandas.id })}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 font-semibold text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continuar pandas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 10-Session Roadmap preview */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 m-0">Ruta de Estudio Sugerida (10 Sesiones)</h2>
            <p className="text-sm text-slate-500 mt-1">
              Sesiones de 45 a 75 minutos diseñadas para una progresión pedagógica óptima.
            </p>
          </div>
          <button
            onClick={() => onNavigate("plan")}
            className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm hover:bg-indigo-100 transition-colors self-start sm:self-auto"
          >
            Abrir Plan Completo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {studySessions.map(sess => {
            const sessCompleted = sess.exerciseIds.filter(id => progress[id]?.completed).length;
            const sessPct = Math.round((sessCompleted / sess.exerciseIds.length) * 100);
            const isFinished = sessPct >= 80;

            return (
              <div
                key={sess.session}
                onClick={() => onNavigate("plan")}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-indigo-300 hover:shadow-xs ${
                  isFinished ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50/50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    S{sess.session}
                  </span>
                  {isFinished && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 h-8 leading-tight">
                  {sess.title.split(":")[1] || sess.title}
                </h4>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{sessCompleted}/{sess.exerciseIds.length} ej</span>
                  <span className="font-semibold text-slate-700">{sessPct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
