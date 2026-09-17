import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Circle,
  PlayCircle,
  CheckCircle,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";
import { studySessions } from "../data/sessions";
import { exercisesMap } from "../data/exercises";
import { storageService } from "../services/storageService";

interface PlanPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const PlanPage: React.FC<PlanPageProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(storageService.getAllProgress());
  const [completedSessions, setCompletedSessions] = useState(storageService.getCompletedSessions());
  const [expandedSession, setExpandedSession] = useState<number | null>(1);

  const handleResetAllProgress = () => {
    if (window.confirm("¿Seguro que deseas reiniciar todo el progreso del laboratorio? Se restablecerán tus códigos y avances para que puedas trabajar con las plantillas originales actualizadas.")) {
      storageService.resetAllProgress();
      setProgress({});
      setCompletedSessions({});
      window.location.reload();
    }
  };

  const handleToggleComplete = (sessionNum: number, currentCompleted: boolean, canComplete: boolean) => {
    if (!canComplete && !currentCompleted) return;

    const nextState = !currentCompleted;
    storageService.setSessionCompleted(sessionNum, nextState);
    setCompletedSessions({ ...completedSessions, [sessionNum]: nextState });

    if (nextState) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Currículo de Entrenamiento Técnico</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">
            Plan de Estudio: 10 Sesiones Prácticas
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Cada sesión está diseñada para completarse en un bloque enfocado de 45 a 75 minutos. Incluye fundamentos teóricos mínimos y una batería de ejercicios prácticos progresivos con validación automatizada.
          </p>
        </div>
        <button
          onClick={handleResetAllProgress}
          className="shrink-0 inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-slate-200 transition-colors self-start md:self-auto"
          title="Reiniciar todas las soluciones y progreso guardado"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Progreso</span>
        </button>
      </div>

      {/* Session List */}
      <div className="space-y-6">
        {studySessions.map(session => {
          const totalEx = session.exerciseIds.length;
          const completedEx = session.exerciseIds.filter(id => progress[id]?.completed).length;
          const percentage = Math.round((completedEx / totalEx) * 100);
          const isMarkedCompleted = !!completedSessions[session.session];
          const canMarkCompleted = percentage >= 80;
          const isExpanded = expandedSession === session.session;

          // Status label
          let statusText = "No empezado";
          let statusColor = "bg-slate-100 text-slate-600";
          if (isMarkedCompleted || percentage === 100) {
            statusText = "Completo";
            statusColor = "bg-emerald-100 text-emerald-800 border border-emerald-200";
          } else if (completedEx > 0) {
            statusText = "En curso";
            statusColor = "bg-sky-100 text-sky-800 border border-sky-200";
          }

          return (
            <div
              key={session.session}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
                isMarkedCompleted ? "border-emerald-200" : "border-slate-200"
              }`}
            >
              {/* Session Card Header */}
              <div
                className="p-6 cursor-pointer select-none hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => setExpandedSession(isExpanded ? null : session.session)}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-xs font-bold">
                      Sesión {session.session}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}>
                      {statusText}
                    </span>
                    <span className="flex items-center space-x-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{session.estimatedMinutes} min</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {session.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {session.objective}
                  </p>
                </div>

                {/* Progress & Accordion Toggle */}
                <div className="flex items-center space-x-4 self-end md:self-center shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-700">
                      {percentage}% <span className="text-slate-400 font-normal">({completedEx}/{totalEx})</span>
                    </div>
                    <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-6">
                  {/* Foundations bullet list */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Fundamentos Teóricos Clave:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                      {session.keyFoundations.map((foundation, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{foundation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exercises list */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Ejercicios Prácticos ({session.exerciseIds.length}):
                      </h4>
                      <span className="text-xs text-slate-500">
                        Completa al menos el 80% para desbloquear finalización
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {session.exerciseIds.map(id => {
                        const ex = exercisesMap[id];
                        if (!ex) return null;
                        const isDone = progress[id]?.completed;

                        return (
                          <div
                            key={id}
                            onClick={() => onNavigate("exercise", { id })}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                              isDone
                                ? "bg-emerald-50/60 border-emerald-200 hover:bg-emerald-100/60"
                                : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-xs"
                            }`}
                          >
                            <div className="flex items-center space-x-3 truncate pr-2">
                              {isDone ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                              )}
                              <div className="truncate">
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase">{ex.id}</span>
                                  <span className="text-xs font-semibold text-slate-800 truncate">{ex.title}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 truncate">
                                  {ex.concepts.slice(0, 3).join(", ")}
                                </div>
                              </div>
                            </div>

                            <span className="text-[11px] font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform shrink-0">
                              Resolver →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Complete Session Action Bar */}
                  <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-600">
                      Progreso de la sesión: <strong className="text-slate-900">{percentage}%</strong>{" "}
                      ({completedEx} de {totalEx} resueltos).
                      {!canMarkCompleted && !isMarkedCompleted && (
                        <span className="text-amber-600 ml-1">
                          (Requiere 80% para marcar como completa)
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleToggleComplete(session.session, isMarkedCompleted, canMarkCompleted)}
                      disabled={!canMarkCompleted && !isMarkedCompleted}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-2 ${
                        isMarkedCompleted
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : canMarkCompleted
                          ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isMarkedCompleted ? "Sesión Completada ✓" : "Marcar Sesión como Completa"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
