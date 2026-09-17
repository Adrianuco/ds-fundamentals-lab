import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Code,
  Grid,
  Table,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  X,
  Bookmark
} from "lucide-react";
import { allExercises } from "../data/exercises";
import { Exercise, ModuleType, ExerciseTag } from "../types/exercise";
import { storageService } from "../services/storageService";

interface ExercisesPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialModule?: ModuleType;
}

const TAGS: { id: ExerciseTag | "all"; label: string }[] = [
  { id: "all", label: "Todas las etiquetas" },
  { id: "warmup", label: "warmup" },
  { id: "indexing", label: "indexing" },
  { id: "missing", label: "missing" },
  { id: "groupby", label: "groupby" },
  { id: "join", label: "join" },
  { id: "reshape", label: "reshape" },
  { id: "dates", label: "dates" },
  { id: "strings", label: "strings" },
  { id: "performance", label: "performance" }
];

export const ExercisesPage: React.FC<ExercisesPageProps> = ({
  onNavigate,
  initialModule
}) => {
  const [selectedModule, setSelectedModule] = useState<ModuleType | "all">(initialModule || "all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const handleToggleFavorite = (exerciseId: string) => {
    storageService.toggleFavorite(exerciseId);
    setFavorites(storageService.getFavorites());
  };

  const progress = storageService.getAllProgress();

  const filteredExercises = useMemo(() => {
    return allExercises.filter(ex => {
      // Module filter
      if (selectedModule !== "all" && ex.module !== selectedModule) {
        return false;
      }
      // Tag filter
      if (selectedTag !== "all" && ex.tag !== selectedTag) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== "all" && ex.difficulty !== selectedDifficulty) {
        return false;
      }
      // Status filter
      const isCompleted = !!progress[ex.id]?.completed;
      if (selectedStatus === "completed" && !isCompleted) return false;
      if (selectedStatus === "pending" && isCompleted) return false;

      // Favorites filter
      if (onlyFavorites && !favorites.includes(ex.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = ex.title.toLowerCase().includes(query);
        const matchId = ex.id.toLowerCase().includes(query);
        const matchConcepts = ex.concepts.some(c => c.toLowerCase().includes(query));
        if (!matchTitle && !matchId && !matchConcepts) return false;
      }

      return true;
    });
  }, [selectedModule, selectedTag, selectedDifficulty, selectedStatus, onlyFavorites, favorites, searchQuery, progress]);

  const clearFilters = () => {
    setSelectedModule("all");
    setSelectedTag("all");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
    setOnlyFavorites(false);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedModule !== "all" ||
    selectedTag !== "all" ||
    selectedDifficulty !== "all" ||
    selectedStatus !== "all" ||
    onlyFavorites ||
    searchQuery.trim() !== "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">
            Catálogo de Ejercicios
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explora la colección completa de {allExercises.length} retos clasificados por módulo, concepto y nivel.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 font-medium">
            Mostrando <strong className="text-slate-900">{filteredExercises.length}</strong> de {allExercises.length} ejercicios
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold px-2 py-1 rounded bg-indigo-50 flex items-center space-x-1"
            >
              <span>Limpiar filtros</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Row 1: Search bar + Module pills */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Buscar por título, ID (ej. pd-05) o conceptos (groupby, mask, merge)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>

          {/* Module Selector */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setSelectedModule("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedModule === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todos ({allExercises.length})
            </button>
            <button
              onClick={() => setSelectedModule("python")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                selectedModule === "python" ? "bg-amber-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Python (22)</span>
            </button>
            <button
              onClick={() => setSelectedModule("numpy")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                selectedModule === "numpy" ? "bg-sky-500 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>NumPy (32)</span>
            </button>
            <button
              onClick={() => setSelectedModule("pandas")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                selectedModule === "pandas" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Table className="w-3 h-3" />
              <span>pandas (48)</span>
            </button>
          </div>
        </div>

        {/* Row 2: Secondary filters (Tags, Difficulty, Status) */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="font-medium">Filtros:</span>
          </div>

          {/* Tags Dropdown */}
          <select
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {TAGS.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Todas las dificultades</option>
            <option value="1">Dificultad 1 (Básico)</option>
            <option value="2">Dificultad 2 (Intermedio)</option>
            <option value="3">Dificultad 3 (Avanzado)</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completados</option>
          </select>

          {/* Favorite Toggle Filter */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              onlyFavorites
                ? "bg-amber-50 text-amber-900 border-amber-300 shadow-xs ring-1 ring-amber-300"
                : "bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyFavorites ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />
            <span>Favoritos / Repasar ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No se encontraron ejercicios con los filtros seleccionados.</p>
          <button
            onClick={clearFilters}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExercises.map(ex => {
            const isCompleted = progress[ex.id]?.completed;
            const isFav = favorites.includes(ex.id);

            let badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
            if (ex.module === "numpy") badgeColor = "bg-sky-100 text-sky-800 border-sky-200";
            if (ex.module === "pandas") badgeColor = "bg-indigo-100 text-indigo-800 border-indigo-200";

            return (
              <div
                key={ex.id}
                onClick={() => onNavigate("exercise", { id: ex.id })}
                className={`bg-white rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-indigo-300 ${
                  isFav
                    ? "ring-1 ring-amber-300/80 border-amber-300/80 bg-amber-50/10"
                    : isCompleted
                    ? "border-emerald-200/80 bg-emerald-50/20"
                    : "border-slate-200"
                }`}
              >
                <div className="space-y-3">
                  {/* Top bar: module badge, session tag, difficulty dots, bookmark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase border ${badgeColor}`}>
                        {ex.module}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                        Sesión {ex.session}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Difficulty Dots */}
                      <div className="flex items-center space-x-1" title={`Dificultad: ${ex.difficulty} de 5`}>
                        {[1, 2, 3, 4, 5].map(dot => (
                          <span
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full ${
                              dot <= ex.difficulty ? "bg-amber-500" : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Bookmark button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(ex.id);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isFav
                            ? "text-amber-500 hover:text-amber-600 bg-amber-50"
                            : "text-slate-300 hover:text-amber-500 hover:bg-slate-100"
                        }`}
                        title={isFav ? "Quitar de favoritos" : "Guardar como favorito para repasar"}
                      >
                        <Bookmark className={`w-4 h-4 ${isFav ? "fill-amber-400" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title and ID */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{ex.id}</div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {ex.title}
                    </h3>
                  </div>

                  {/* Concept tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {ex.concepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: time, status, action */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{ex.estimatedMinutes} min</span>
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center space-x-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completado</span>
                    </span>
                  ) : (
                    <span className="font-semibold text-indigo-600 flex items-center space-x-0.5">
                      <span>Resolver</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
