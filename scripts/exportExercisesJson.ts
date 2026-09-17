import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { allExercises } from "../src/data/exercises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, "..", "src", "exercises");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log(`Exporting ${allExercises.length} exercises to ${OUT_DIR}...`);

allExercises.forEach(ex => {
  const filePath = path.join(OUT_DIR, `${ex.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(ex, null, 2), "utf-8");
});

// Also write a master index JSON
const masterPath = path.join(OUT_DIR, "all_exercises.json");
fs.writeFileSync(masterPath, JSON.stringify(allExercises, null, 2), "utf-8");

console.log(`Successfully exported ${allExercises.length} exercises to /src/exercises/*.json`);
