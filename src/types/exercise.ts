// Types for Fundamentos DS Lab exercises and curriculum

export type ModuleType = "python" | "numpy" | "pandas";

export type ExerciseTag =
  | "warmup"
  | "indexing"
  | "missing"
  | "groupby"
  | "join"
  | "reshape"
  | "dates"
  | "strings"
  | "performance"
  | "functions"
  | "dicts"
  | "math";

export interface ExerciseTest {
  name: string;
  check: string; // Python expression that must evaluate to True
  hint?: string; // Friendly human explanation if test fails
}

export interface Exercise {
  id: string;
  module: ModuleType;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  concepts: string[];
  session: number; // 1 to 10
  tag: ExerciseTag;
  estimatedMinutes: number;
  dataset: "inline" | "pacientes.csv" | "municipios.csv" | "encuesta_empleo.csv" | "ventas_tienda.csv";
  theory_md: string;
  prompt_md: string;
  setup_code: string;
  starter_code: string;
  solution_code: string;
  tests: ExerciseTest[];
  hints: string[];
  forbidden?: string;
}

export interface SessionInfo {
  session: number;
  title: string;
  module: ModuleType;
  objective: string;
  estimatedMinutes: number;
  keyFoundations: string[];
  exerciseIds: string[];
}
