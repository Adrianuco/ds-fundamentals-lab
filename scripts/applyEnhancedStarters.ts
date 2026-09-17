import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pythonExercises } from "../src/data/exercises/pythonExercises";
import { numpyExercises } from "../src/data/exercises/numpyExercises";
import { pandasExercises } from "../src/data/exercises/pandasExercises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCleanStarter(ex: any): string {
  // Extract the TODO comment and placeholder from current starter
  const starterLines = ex.starter_code.trim().split("\n");
  const todoLine = starterLines.find((l: string) => l.trim().startsWith("# TODO")) || "# TODO: Escribe tu solución aquí";
  
  // Clean placeholder assignment
  let placeholder = "";
  if (ex.id === "py-01") {
    placeholder = 'result = ""';
  } else if (starterLines.length > 0) {
    const lastLines = starterLines.filter((l: string) => 
      !l.trim().startsWith("# TODO") &&
      !l.trim().startsWith("# ---") &&
      (
        l.includes("result =") || 
        l.includes("arr =") || 
        l.includes("df =") || 
        l.includes("clean_df =") ||
        l.includes("df_enriquecido =") ||
        l.includes("seq_arange =") ||
        l.includes("seq_linspace =") ||
        l.includes("matriz_2d =") ||
        l.includes("copia_segura =") ||
        l.includes("promedio_por_trimestre =") ||
        l.includes("total_por_sucursal =") ||
        l.includes("idx_train =") ||
        l.includes("idx_test =") ||
        l.includes("clean_costo =") ||
        l.includes("def ") ||
        l.includes("pass")
      )
    );
    if (lastLines.length > 0) {
      placeholder = lastLines.join("\n");
    } else {
      placeholder = "result = None";
    }
  } else {
    placeholder = "result = None";
  }

  const setup = ex.setup_code ? ex.setup_code.trim() : "";
  
  if (setup) {
    return `${setup}\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n${todoLine}\n${placeholder}\n`;
  } else {
    return `${todoLine}\n${placeholder}\n`;
  }
}

function updateExerciseList(list: any[]): any[] {
  return list.map(ex => {
    return {
      ...ex,
      starter_code: getCleanStarter(ex)
    };
  });
}

const newPython = updateExerciseList(pythonExercises);
const newNumpy = updateExerciseList(numpyExercises);
const newPandas = updateExerciseList(pandasExercises);

// Write to files
const dataDir = path.join(__dirname, "..", "src", "data", "exercises");

fs.writeFileSync(
  path.join(dataDir, "pythonExercises.ts"),
  `import { Exercise } from "../../types/exercise";\n\nexport const pythonExercises: Exercise[] = ${JSON.stringify(newPython, null, 2)};\n`,
  "utf-8"
);

fs.writeFileSync(
  path.join(dataDir, "numpyExercises.ts"),
  `import { Exercise } from "../../types/exercise";\n\nexport const numpyExercises: Exercise[] = ${JSON.stringify(newNumpy, null, 2)};\n`,
  "utf-8"
);

fs.writeFileSync(
  path.join(dataDir, "pandasExercises.ts"),
  `import { Exercise } from "../../types/exercise";\n\nexport const pandasExercises: Exercise[] = ${JSON.stringify(newPandas, null, 2)};\n`,
  "utf-8"
);

console.log("Successfully updated all 102 exercises with clean starter codes and complete initial data!");
