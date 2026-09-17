import { Exercise, ModuleType } from "../../types/exercise";
import { pythonExercises } from "./pythonExercises";
import { numpyExercises } from "./numpyExercises";
import { pandasExercises } from "./pandasExercises";

export const allExercises: Exercise[] = [
  ...pythonExercises,
  ...numpyExercises,
  ...pandasExercises
];

export const exercisesMap: Record<string, Exercise> = allExercises.reduce((acc, ex) => {
  acc[ex.id] = ex;
  return acc;
}, {} as Record<string, Exercise>);

export function getExerciseById(id: string): Exercise | undefined {
  return exercisesMap[id];
}

export function getExercisesByModule(mod: ModuleType): Exercise[] {
  return allExercises.filter(ex => ex.module === mod);
}

export function getExercisesBySession(sessionNum: number): Exercise[] {
  return allExercises.filter(ex => ex.session === sessionNum);
}

export function getAdjacentExercises(currentId: string): { prev?: Exercise; next?: Exercise } {
  const index = allExercises.findIndex(ex => ex.id === currentId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? allExercises[index - 1] : undefined,
    next: index < allExercises.length - 1 ? allExercises[index + 1] : undefined
  };
}
