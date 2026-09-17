import { allExercises } from "../src/data/exercises";
import { studySessions } from "../src/data/sessions";

console.log("==================================================");
console.log(" Validando consistencia e integridad del currículo...");
console.log("==================================================");

let hasErrors = false;

// 1. Total count check
if (allExercises.length < 90) {
  console.error(`❌ Error: Se esperaban al menos 90 ejercicios y hay ${allExercises.length}`);
  hasErrors = true;
} else {
  console.log(`✓ Total de ejercicios: ${allExercises.length} (Cumple objetivo de >= 90)`);
}

// 2. Module distribution check
const pythonCount = allExercises.filter(e => e.module === "python").length;
const numpyCount = allExercises.filter(e => e.module === "numpy").length;
const pandasCount = allExercises.filter(e => e.module === "pandas").length;

console.log(`  - Python: ${pythonCount} ejercicios (Req: 22)`);
console.log(`  - NumPy: ${numpyCount} ejercicios (Req: 32)`);
console.log(`  - pandas: ${pandasCount} ejercicios (Req: 48)`);

if (pythonCount < 22 || numpyCount < 32 || pandasCount < 48) {
  console.error("❌ Error: Distribución por módulo no cumple los requisitos mínimos");
  hasErrors = true;
}

// 3. Check for uniqueness of IDs
const idSet = new Set<string>();
for (const ex of allExercises) {
  if (idSet.has(ex.id)) {
    console.error(`❌ Error: ID duplicado '${ex.id}'`);
    hasErrors = true;
  }
  idSet.add(ex.id);

  // Check required fields
  if (!ex.title || !ex.theory_md || !ex.prompt_md || !ex.solution_code) {
    console.error(`❌ Error en ejercicio ${ex.id}: campos esenciales vacíos`);
    hasErrors = true;
  }

  if (!ex.tests || ex.tests.length === 0) {
    console.error(`❌ Error en ejercicio ${ex.id}: no contiene tests`);
    hasErrors = true;
  }

  // Check for stub placeholders in solutions
  if (ex.solution_code.includes("TODO") || ex.solution_code.trim() === "pass") {
    console.error(`❌ Error en ejercicio ${ex.id}: la solución contiene un TODO o es un stub vació`);
    hasErrors = true;
  }
}

// 4. Check sessions
console.log(`✓ Sesiones del plan de estudio: ${studySessions.length}`);
let totalSessionExercises = 0;
for (const session of studySessions) {
  totalSessionExercises += session.exerciseIds.length;
  for (const eid of session.exerciseIds) {
    if (!idSet.has(eid)) {
      console.error(`❌ Error en Sesión ${session.session}: el ejercicio '${eid}' no existe en el catálogo`);
      hasErrors = true;
    }
  }
}
console.log(`✓ Total de ejercicios mapeados en las 10 sesiones: ${totalSessionExercises}`);

if (hasErrors) {
  console.error("\n❌ Validación fallida. Corrige los errores arriba.");
  process.exit(1);
} else {
  console.log("\n✅ Integridad de los 102 ejercicios y 10 sesiones verificada con éxito!");
  process.exit(0);
}
