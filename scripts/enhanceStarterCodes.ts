import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { allExercises } from "../src/data/exercises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Analyzing starter codes for all 102 exercises...");

function createCleanStarter(ex: any): string {
  // Extract the TODO comment and placeholder from current starter
  const starterLines = ex.starter_code.trim().split("\n");
  const todoLine = starterLines.find((l: string) => l.trim().startsWith("# TODO")) || "# TODO: Escribe tu solución aquí";
  
  // Find placeholder assignment at the end if exists (e.g. result = None, result = [], etc.)
  let placeholder = "";
  if (ex.id === "py-01") {
    placeholder = 'result = ""';
  } else if (starterLines.length > 0) {
    const lastLines = starterLines.filter((l: string) => 
      l.includes("result =") || 
      l.includes("arr =") || 
      l.includes("df =") || 
      l.includes("clean_df =") ||
      l.includes("def ") ||
      l.includes("pass")
    );
    if (lastLines.length > 0) {
      placeholder = lastLines.join("\n");
    } else {
      placeholder = "result = None";
    }
  } else {
    placeholder = "result = None";
  }

  // If setup_code has data definitions or imports, include them at the top of starter
  const setup = ex.setup_code ? ex.setup_code.trim() : "";
  
  if (setup) {
    return `${setup}

# --- TU SOLUCIÓN A CONTINUACIÓN ---
${todoLine}
${placeholder}
`;
  } else {
    return `${todoLine}
${placeholder}
`;
  }
}

// Check sample
console.log("Sample enhanced py-01:");
console.log(createCleanStarter(allExercises.find(e => e.id === "py-01")));

console.log("Sample enhanced np-01:");
console.log(createCleanStarter(allExercises.find(e => e.id === "np-01")));

console.log("Sample enhanced pd-01:");
console.log(createCleanStarter(allExercises.find(e => e.id === "pd-01")));
