import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import confetti from "canvas-confetti";
import {
  Play,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Terminal,
  Table as TableIcon,
  CheckSquare,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldAlert,
  Loader2,
  Database,
  Code,
  Bookmark
} from "lucide-react";
import { Exercise } from "../types/exercise";
import { exercisesMap, getAdjacentExercises } from "../data/exercises";
import { pyodideService, ExecutionResult, CheckTestsResult } from "../services/pyodideService";
import { storageService } from "../services/storageService";
import { MarkdownView } from "../components/MarkdownView";

interface ExercisePageProps {
  exerciseId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  examMode: boolean;
  onToggleExamMode: () => void;
}

export const ExercisePage: React.FC<ExercisePageProps> = ({
  exerciseId,
  onNavigate,
  examMode,
  onToggleExamMode
}) => {
  const exercise: Exercise | undefined = exercisesMap[exerciseId];

  // Code state
  const [code, setCode] = useState<string>("");
  const [activeOutputTab, setActiveOutputTab] = useState<"console" | "preview" | "tests">("console");
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [studentNote, setStudentNote] = useState<string>("");
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);

  // Execution states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [testsResult, setTestsResult] = useState<CheckTestsResult | null>(null);

  // Sample data preview state
  const [sampleCsvText, setSampleCsvText] = useState<string | null>(null);

  // Favorite / Bookmark state
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Navigation adjacent
  const { prev, next } = getAdjacentExercises(exerciseId);

  // Load saved code, notes, and progress on exercise change
  useEffect(() => {
    if (!exercise) return;

    storageService.setLastExerciseId(exercise.id);

    const savedProg = storageService.getExerciseProgress(exercise.id);
    if (savedProg && savedProg.code) {
      setCode(savedProg.code);
    } else {
      setCode(exercise.starter_code);
    }

    const savedNote = storageService.getExerciseNote(exercise.id);
    setStudentNote(savedNote);

    // Favorite state
    setIsFavorite(storageService.isFavorite(exercise.id));

    // Reset view states
    setRevealedHints([]);
    setShowSolution(false);
    setExecutionResult(null);
    setTestsResult(null);
    setActiveOutputTab("console");

    // Load CSV preview if applicable
    if (exercise.dataset !== "inline") {
      fetch(`/data/${exercise.dataset}`)
        .then(r => r.text())
        .then(txt => {
          const lines = txt.trim().split("\n").slice(0, 6).join("\n");
          setSampleCsvText(lines);
        })
        .catch(() => setSampleCsvText(null));
    } else {
      setSampleCsvText(null);
    }
  }, [exerciseId, exercise]);

  // Toggle favorite
  const handleToggleFavorite = () => {
    if (!exercise) return;
    const newState = storageService.toggleFavorite(exercise.id);
    setIsFavorite(newState);
  };

  // Autosave code
  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || "";
    setCode(val);
    if (exercise) {
      storageService.saveUserCode(exercise.id, val);
    }
  };

  // Reset to starter
  const handleResetCode = () => {
    if (!exercise) return;
    if (window.confirm("¿Seguro que deseas resetear el código a la plantilla original?")) {
      setCode(exercise.starter_code);
      storageService.saveUserCode(exercise.id, exercise.starter_code);
      setExecutionResult(null);
      setTestsResult(null);
      setActiveOutputTab("console");
    }
  };

  // Run Code (Ctrl+Enter or button)
  const handleExecute = async () => {
    if (!exercise || isRunning) return;
    setIsRunning(true);
    try {
      const res = await pyodideService.executeCode(code, exercise.setup_code);
      setExecutionResult(res);
      if (res.previewHtml || res.previewRepr) {
        setActiveOutputTab("preview");
      } else {
        setActiveOutputTab("console");
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        stdout: "",
        stderr: "Error al ejecutar: " + (err?.message || String(err)),
        error: err?.message || String(err)
      });
      setActiveOutputTab("console");
    } finally {
      setIsRunning(false);
    }
  };

  // Check Solution against tests
  const handleCheckTests = async () => {
    if (!exercise || isChecking) return;
    setIsChecking(true);
    setActiveOutputTab("tests");
    try {
      const res = await pyodideService.checkTests(code, exercise.setup_code, exercise.tests);
      setTestsResult(res);

      const passedCount = res.testResults.filter(t => t.passed).length;
      const totalCount = res.testResults.length;
      const allPassed = passedCount === totalCount && totalCount > 0;

      // Save progress to localStorage
      storageService.saveExerciseProgress(exercise.id, {
        completed: allPassed,
        code,
        passedCount,
        totalCount,
        updatedAt: Date.now()
      });

      if (allPassed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setTestsResult({
        success: false,
        stdout: "",
        stderr: err?.message || String(err),
        testResults: exercise.tests.map(t => ({
          name: t.name,
          passed: false,
          error: "Error al ejecutar el entorno de pruebas: " + (err?.message || String(err))
        }))
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Save notes
  const handleSaveNote = (val: string) => {
    setStudentNote(val);
    if (exercise) {
      storageService.saveExerciseNote(exercise.id, val);
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
  }, [code, exercise]);

  if (!exercise) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900">Ejercicio no encontrado</h2>
        <button
          onClick={() => onNavigate("exercises")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const currentProg = storageService.getExerciseProgress(exercise.id);
  const isCompleted = currentProg?.completed;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden">
      {/* Top Exercise Header Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
        {/* Left: Breadcrumbs & Meta */}
        <div className="flex items-center space-x-3 truncate">
          <button
            onClick={() => onNavigate("plan")}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 truncate"
          >
            Sesión {exercise.session}
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white uppercase shrink-0">
            {exercise.id}
          </span>
          <h2 className="text-sm font-bold text-slate-900 truncate m-0 hidden sm:inline">
            {exercise.title}
          </h2>
        </div>

        {/* Right: Prev/Next & status */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Favorite / Bookmark button */}
          <button
            onClick={handleToggleFavorite}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
              isFavorite
                ? "bg-amber-50 text-amber-800 border-amber-300 shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 border-slate-300 hover:bg-slate-50"
            }`}
            title={isFavorite ? "Quitar de favoritos" : "Guardar como favorito para repasar"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />
            <span className="hidden sm:inline">{isFavorite ? "Favorito" : "Para repasar"}</span>
          </button>

          {isCompleted && (
            <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Superado</span>
            </span>
          )}

          <div className="flex items-center space-x-1 border-l border-slate-200 pl-2">
            <button
              onClick={() => prev && onNavigate("exercise", { id: prev.id })}
              disabled={!prev}
              className={`p-1.5 rounded-lg border text-xs font-medium flex items-center transition-colors ${
                prev
                  ? "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
                  : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
              }`}
              title="Ejercicio anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => next && onNavigate("exercise", { id: next.id })}
              disabled={!next}
              className={`p-1.5 rounded-lg border text-xs font-medium flex items-center transition-colors ${
                next
                  ? "bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
                  : "bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed"
              }`}
              title="Siguiente ejercicio"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* ================================================== */}
        {/* LEFT COLUMN: Theory, Prompt, Hints, Data Sample */}
        {/* ================================================== */}
        <div className="lg:col-span-5 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto p-6 space-y-6">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-md font-semibold bg-indigo-50 text-indigo-700 uppercase">
              {exercise.module}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
              {exercise.tag}
            </span>
            <span className="flex items-center space-x-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>~{exercise.estimatedMinutes} min</span>
            </span>
            {isFavorite && (
              <span className="px-2 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                <Bookmark className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>Para repasar</span>
              </span>
            )}
            <div className="flex items-center space-x-0.5 ml-auto" title={`Dificultad: ${exercise.difficulty}/5`}>
              {[1, 2, 3, 4, 5].map(d => (
                <span
                  key={d}
                  className={`w-2 h-2 rounded-full ${
                    d <= exercise.difficulty ? "bg-amber-500" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enunciado (Prompt) */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
              <span>Enunciado del Reto</span>
            </h3>
            <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/70 font-medium">
              <MarkdownView content={exercise.prompt_md} className="text-slate-800" />
            </div>
            {exercise.forbidden && (
              <div className="text-xs bg-rose-50 text-rose-700 border border-rose-200 p-2.5 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Regla obligatoria:</strong> {exercise.forbidden}</span>
              </div>
            )}
          </div>

          {/* Fundamentos previos (Theory) */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Fundamentos Previos</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <MarkdownView content={exercise.theory_md} />
            </div>
          </div>

          {/* Setup Code / Initial Variables (if present) */}
          {exercise.setup_code && exercise.setup_code.trim().length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Code className="w-4 h-4 text-sky-600" />
                <span>Variables y Datos Iniciales</span>
              </h3>
              <div className="bg-slate-900 text-sky-300 p-3 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                <pre>{exercise.setup_code.trim()}</pre>
              </div>
              <p className="text-[11px] text-slate-400">
                Estas variables y librerías se precargan automáticamente en el entorno de ejecución.
              </p>
            </div>
          )}

          {/* Sample Data Preview (if CSV is used) */}
          {exercise.dataset !== "inline" && sampleCsvText && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Database className="w-4 h-4 text-emerald-600" />
                <span>Muestra de Datos ({exercise.dataset})</span>
              </h3>
              <div className="bg-slate-900 text-slate-200 p-3 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                <pre>{sampleCsvText}</pre>
              </div>
              <p className="text-[11px] text-slate-400">
                Archivo disponible en Pyodide en: <code>/data/{exercise.dataset}</code>
              </p>
            </div>
          )}

          {/* Pistas (Hints) - Blocked in Exam Mode */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>Pistas Progresivas</span>
              </h3>
              {examMode && (
                <span className="text-xs text-amber-600 font-semibold flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Bloqueado en Modo Examen</span>
                </span>
              )}
            </div>

            {examMode ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                Las pistas están deshabilitadas mientras el Modo Examen esté activo.
              </p>
            ) : (
              <div className="space-y-2">
                {exercise.hints.map((hint, idx) => {
                  const isRevealed = revealedHints.includes(idx);
                  return (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      {isRevealed ? (
                        <div className="p-3 bg-amber-50/50 text-xs text-slate-800 leading-relaxed">
                          <strong className="text-amber-700 block mb-1">Pista {idx + 1}:</strong>
                          <MarkdownView content={hint} />
                        </div>
                      ) : (
                        <button
                          onClick={() => setRevealedHints([...revealedHints, idx])}
                          className="w-full text-left p-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-between transition-colors"
                        >
                          <span className="font-semibold text-slate-700">Desbloquear Pista {idx + 1}</span>
                          <span className="text-indigo-600 font-medium">Revelar</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Personal Student Notes Drawer Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setShowNotesDrawer(!showNotesDrawer)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>{showNotesDrawer ? "Ocultar bloc de notas" : "Abrir bloc de notas personales"}</span>
            </button>

            {showNotesDrawer && (
              <div className="mt-2 space-y-2">
                <textarea
                  value={studentNote}
                  onChange={e => handleSaveNote(e.target.value)}
                  placeholder="Escribe aquí tus apuntes, dudas o recordatorios para este ejercicio (se guardan automáticamente)..."
                  className="w-full h-24 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* ================================================== */}
        {/* RIGHT COLUMN: Monaco Editor, Run & Output Tabs */}
        {/* ================================================== */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-900 text-white overflow-hidden">
          {/* Editor Action Toolbar */}
          <div className="bg-slate-850 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-bold text-slate-300">Editor Python</span>
              <span className="text-slate-500 text-[11px] hidden sm:inline">(Ctrl+Enter para ejecutar)</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetCode}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center space-x-1"
                title="Volver al código starter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resetear</span>
              </button>

              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
              >
                {isRunning ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white" />
                )}
                <span>Ejecutar</span>
              </button>

              <button
                onClick={handleCheckTests}
                disabled={isChecking}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
              >
                {isChecking ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle className="w-3.5 h-3.5" />
                )}
                <span>Comprobar Solución</span>
              </button>
            </div>
          </div>

          {/* Monaco Code Editor (flexible height) */}
          <div className="flex-1 min-h-[220px] relative">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                tabSize: 4,
                wordWrap: "on",
                automaticLayout: true
              }}
            />
          </div>

          {/* Output Panel Header & Tabs */}
          <div className="h-64 bg-slate-950 border-t border-slate-800 flex flex-col shrink-0">
            {/* Tab navigation */}
            <div className="bg-slate-900 px-4 py-1 flex items-center justify-between border-b border-slate-800 text-xs shrink-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveOutputTab("console")}
                  className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1.5 transition-colors ${
                    activeOutputTab === "console" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Consola</span>
                  {executionResult?.executionTimeMs !== undefined && (
                    <span className="text-[10px] text-slate-500 font-normal">
                      ({executionResult.executionTimeMs}ms)
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveOutputTab("preview")}
                  className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1.5 transition-colors ${
                    activeOutputTab === "preview" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Vista Previa (DF / Arrays)</span>
                  {(executionResult?.previewHtml || executionResult?.previewRepr) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  )}
                </button>

                <button
                  onClick={() => setActiveOutputTab("tests")}
                  className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1.5 transition-colors ${
                    activeOutputTab === "tests" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Pruebas Unitarias</span>
                  {testsResult && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        testsResult.testResults.every(t => t.passed)
                          ? "bg-emerald-950 text-emerald-400"
                          : "bg-rose-950 text-rose-400"
                      }`}
                    >
                      {testsResult.testResults.filter(t => t.passed).length}/{testsResult.testResults.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Solution reveal toggle button */}
              <div>
                {!examMode ? (
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-200 flex items-center space-x-1"
                  >
                    {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showSolution ? "Ocultar Solución" : "Ver Solución de Referencia"}</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-amber-500 font-medium">Modo Examen activo</span>
                )}
              </div>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-y-auto p-4 text-xs font-mono">
              {/* Tab 1: Console */}
              {activeOutputTab === "console" && (
                <div className="space-y-2">
                  {executionResult?.stdout && (
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">STDOUT:</span>
                      <pre className="text-emerald-400 whitespace-pre-wrap">{executionResult.stdout}</pre>
                    </div>
                  )}

                  {executionResult?.stderr && (
                    <div>
                      <span className="text-rose-400 text-[10px] uppercase font-bold block mb-1">STDERR / TRACEBACK:</span>
                      <pre className="text-rose-300 whitespace-pre-wrap bg-rose-950/40 p-2.5 rounded-lg border border-rose-900/50">
                        {executionResult.stderr}
                      </pre>
                    </div>
                  )}

                  {!executionResult?.stdout && !executionResult?.stderr && !isRunning && (
                    <p className="text-slate-500 italic">
                      Pulsa "Ejecutar" o presiona Ctrl+Enter para correr el código y ver salidas de consola.
                    </p>
                  )}

                  {isRunning && (
                    <p className="text-indigo-400 animate-pulse">Ejecutando código en Pyodide...</p>
                  )}
                </div>
              )}

              {/* Tab 2: Preview */}
              {activeOutputTab === "preview" && (
                <div>
                  {executionResult?.previewHtml ? (
                    <div className="space-y-2">
                      <div className="text-[11px] text-indigo-300 font-bold">
                        {executionResult.previewRepr}
                      </div>
                      <div
                        className="df-table-container bg-white text-slate-900 rounded-lg overflow-x-auto shadow-xs"
                        dangerouslySetInnerHTML={{ __html: executionResult.previewHtml }}
                      />
                    </div>
                  ) : executionResult?.previewRepr ? (
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-sky-300 whitespace-pre-wrap">
                      {executionResult.previewRepr}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">
                      No se detectó ningún DataFrame o array en variables comunes (result, clean, df, arr).
                    </p>
                  )}
                </div>
              )}

              {/* Tab 3: Tests */}
              {activeOutputTab === "tests" && (
                <div className="space-y-2.5">
                  {testsResult ? (
                    testsResult.testResults.map((t, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start space-x-3 ${
                          t.passed
                            ? "bg-emerald-950/40 border-emerald-800 text-emerald-300"
                            : "bg-rose-950/40 border-rose-800 text-rose-300"
                        }`}
                      >
                        <div className="mt-0.5">
                          {t.passed ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-400" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="font-bold text-xs">
                            {t.passed ? "Aprobado:" : "Fallo en:"} {t.name}
                          </div>
                          {!t.passed && t.error && (
                            <div className="text-[11px] text-rose-200/90 font-sans leading-relaxed bg-rose-950/60 p-2 rounded border border-rose-800/40">
                              {t.error}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">
                      Pulsa "Comprobar Solución" para ejecutar las pruebas automáticas contra tus variables finales.
                    </p>
                  )}
                </div>
              )}

              {/* Collapsible Solution Box (Overlay if opened) */}
              {showSolution && !examMode && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-indigo-500/50 space-y-2">
                  <div className="flex items-center justify-between text-indigo-300 font-bold text-xs">
                    <span>Solución de Referencia Idiomática:</span>
                    <button
                      onClick={() => setShowSolution(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      Cerrar
                    </button>
                  </div>
                  <pre className="text-emerald-400 text-xs font-mono p-3 bg-slate-950 rounded-lg overflow-x-auto">
                    {exercise.solution_code}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
