// Storage Service for Fundamentos DS Lab
// Manages local persistence for exercise solutions, progress, notes, exam mode, and study plan sessions.

export interface ExerciseProgress {
  completed: boolean;
  code: string;
  passedCount: number;
  totalCount: number;
  updatedAt: number;
}

const STORAGE_KEYS = {
  PROGRESS: "ds_lab_progress_v1",
  NOTES: "ds_lab_notes_v1",
  SESSIONS: "ds_lab_sessions_v1",
  EXAM_MODE: "ds_lab_exam_mode_v1",
  LAST_EXERCISE: "ds_lab_last_exercise_v1",
  FAVORITES: "ds_lab_favorites_v1"
};

export const storageService = {
  // --- Progress ---
  getAllProgress(): Record<string, ExerciseProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getExerciseProgress(exerciseId: string): ExerciseProgress | null {
    const all = this.getAllProgress();
    return all[exerciseId] || null;
  },

  saveExerciseProgress(exerciseId: string, progress: ExerciseProgress): void {
    try {
      const all = this.getAllProgress();
      all[exerciseId] = progress;
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.warn("Error saving exercise progress:", e);
    }
  },

  saveUserCode(exerciseId: string, code: string): void {
    try {
      const all = this.getAllProgress();
      const current = all[exerciseId] || {
        completed: false,
        code: "",
        passedCount: 0,
        totalCount: 0,
        updatedAt: Date.now()
      };
      current.code = code;
      current.updatedAt = Date.now();
      all[exerciseId] = current;
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.warn("Error saving user code:", e);
    }
  },

  // --- Notes ---
  getAllNotes(): Record<string, string> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getExerciseNote(exerciseId: string): string {
    const all = this.getAllNotes();
    return all[exerciseId] || "";
  },

  saveExerciseNote(exerciseId: string, note: string): void {
    try {
      const all = this.getAllNotes();
      all[exerciseId] = note;
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(all));
    } catch (e) {
      console.warn("Error saving note:", e);
    }
  },

  // --- Sessions ---
  getCompletedSessions(): Record<number, boolean> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  setSessionCompleted(sessionNum: number, completed: boolean): void {
    try {
      const all = this.getCompletedSessions();
      all[sessionNum] = completed;
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(all));
    } catch (e) {
      console.warn("Error saving session status:", e);
    }
  },

  // --- Exam Mode ---
  getExamMode(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.EXAM_MODE) === "true";
    } catch {
      return false;
    }
  },

  setExamMode(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_MODE, val ? "true" : "false");
    } catch (e) {
      console.warn("Error saving exam mode:", e);
    }
  },

  // --- Last Exercise ---
  getLastExerciseId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_EXERCISE);
    } catch {
      return null;
    }
  },

  setLastExerciseId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_EXERCISE, id);
    } catch (e) {
      console.warn("Error saving last exercise:", e);
    }
  },

  // --- Favorites ---
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isFavorite(exerciseId: string): boolean {
    const favs = this.getFavorites();
    return favs.includes(exerciseId);
  },

  toggleFavorite(exerciseId: string): boolean {
    try {
      const favs = this.getFavorites();
      const idx = favs.indexOf(exerciseId);
      let isNowFav = false;
      if (idx >= 0) {
        favs.splice(idx, 1);
        isNowFav = false;
      } else {
        favs.push(exerciseId);
        isNowFav = true;
      }
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return isNowFav;
    } catch (e) {
      console.warn("Error toggling favorite:", e);
      return false;
    }
  },

  // Reset all data
  resetAllProgress(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
      localStorage.removeItem(STORAGE_KEYS.SESSIONS);
      localStorage.removeItem(STORAGE_KEYS.LAST_EXERCISE);
    } catch (e) {
      console.warn("Error clearing progress:", e);
    }
  }
};
