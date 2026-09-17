import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { PyodideLoader } from "./components/PyodideLoader";
import { HomePage } from "./pages/HomePage";
import { PlanPage } from "./pages/PlanPage";
import { ExercisesPage } from "./pages/ExercisesPage";
import { ExercisePage } from "./pages/ExercisePage";
import { CheatsheetPage } from "./pages/CheatsheetPage";
import { SandboxPage } from "./pages/SandboxPage";
import { pyodideService } from "./services/pyodideService";
import { storageService } from "./services/storageService";
import { ModuleType } from "./types/exercise";

export function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [currentExerciseId, setCurrentExerciseId] = useState<string>("py-01");
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<ModuleType | undefined>(undefined);

  // Exam Mode
  const [examMode, setExamMode] = useState<boolean>(storageService.getExamMode());

  // Pyodide status
  const [pyodideReady, setPyodideReady] = useState<boolean>(false);
  const [pyodideProgress, setPyodideProgress] = useState<{ message: string; percent: number }>({
    message: "Iniciando motor de Python...",
    percent: 10
  });
  const [pyodideError, setPyodideError] = useState<string | null>(null);

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (!hash || hash === "home") {
        setCurrentPage("home");
      } else if (hash === "plan") {
        setCurrentPage("plan");
      } else if (hash.startsWith("exercises")) {
        setCurrentPage("exercises");
      } else if (hash.startsWith("exercise/")) {
        const id = hash.replace("exercise/", "");
        if (id) {
          setCurrentExerciseId(id);
          setCurrentPage("exercise");
        }
      } else if (hash === "cheatsheet") {
        setCurrentPage("cheatsheet");
      } else if (hash === "sandbox") {
        setCurrentPage("sandbox");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page: string, params?: Record<string, string>) => {
    if (page === "home") {
      window.location.hash = "#/";
    } else if (page === "plan") {
      window.location.hash = "#/plan";
    } else if (page === "exercises") {
      if (params?.module) {
        setSelectedModuleFilter(params.module as ModuleType);
      }
      window.location.hash = "#/exercises";
    } else if (page === "exercise" && params?.id) {
      setCurrentExerciseId(params.id);
      window.location.hash = `#/exercise/${params.id}`;
    } else if (page === "cheatsheet") {
      window.location.hash = "#/cheatsheet";
    } else if (page === "sandbox") {
      window.location.hash = "#/sandbox";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleExamMode = () => {
    const next = !examMode;
    setExamMode(next);
    storageService.setExamMode(next);
  };

  // Initialize Pyodide on mount
  const initPyodide = () => {
    setPyodideError(null);
    setPyodideProgress({ message: "Iniciando motor de Python (Pyodide)...", percent: 15 });

    const unsubscribe = pyodideService.onProgress(status => {
      setPyodideProgress(status);
    });

    pyodideService
      .init()
      .then(() => {
        setPyodideReady(true);
      })
      .catch((err: any) => {
        console.error("Pyodide init error:", err);
        setPyodideError(err?.message || "No se pudo iniciar Pyodide en este navegador.");
      })
      .finally(() => {
        unsubscribe();
      });
  };

  useEffect(() => {
    initPyodide();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Pyodide Loading Splash (shows only on initial loading) */}
      {!pyodideReady && (
        <PyodideLoader
          progressMessage={pyodideProgress.message}
          percent={pyodideProgress.percent}
          error={pyodideError}
          onRetry={initPyodide}
        />
      )}

      {/* Global Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        examMode={examMode}
        onToggleExamMode={handleToggleExamMode}
        pyodideReady={pyodideReady}
      />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">
        {currentPage === "home" && <HomePage onNavigate={navigateTo} />}
        {currentPage === "plan" && <PlanPage onNavigate={navigateTo} />}
        {currentPage === "exercises" && (
          <ExercisesPage onNavigate={navigateTo} initialModule={selectedModuleFilter} />
        )}
        {currentPage === "exercise" && (
          <ExercisePage
            exerciseId={currentExerciseId}
            onNavigate={navigateTo}
            examMode={examMode}
            onToggleExamMode={handleToggleExamMode}
          />
        )}
        {currentPage === "cheatsheet" && <CheatsheetPage />}
        {currentPage === "sandbox" && <SandboxPage />}
      </main>
    </div>
  );
}

export default App;
