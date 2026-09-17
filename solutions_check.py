#!/usr/bin/env python3
"""
solutions_check.py
Validador automatizado para Fundamentos DS Lab.
Carga cada ejercicio en src/exercises/*.json, ejecuta su setup_code + solution_code,
y evalúa que el 100% de los tests unitarios pasen satisfactoriamente.
"""

import sys
import os
import glob
import json
import traceback

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    exercises_dir = os.path.join(root_dir, "src", "exercises")
    data_dir = os.path.join(root_dir, "public", "data")
    
    # Check if numpy and pandas are installed
    try:
        import numpy as np
        import pandas as pd
    except ImportError:
        print("\n[!] AVISO: numpy o pandas no están instalados en el entorno Python actual.")
        print("Para correr este script localmente en CPython, crea un entorno virtual:")
        print("  python3 -m venv .venv")
        print("  source .venv/bin/activate  # En Windows: .venv\\Scripts\\activate")
        print("  pip install numpy pandas")
        print("  python3 solutions_check.py\n")
        print("Alternativamente, los tests se validan automáticamente en el navegador vía Pyodide.")
        sys.exit(0)

    # In CPython, simulate /data path if needed by monkey-patching or checking paths
    # If code uses /data/pacientes.csv, we can mock or symlink or replace in read_csv
    real_read_csv = pd.read_csv
    def patched_read_csv(filepath_or_buffer, *args, **kwargs):
        if isinstance(filepath_or_buffer, str) and filepath_or_buffer.startswith("/data/"):
            filename = os.path.basename(filepath_or_buffer)
            local_path = os.path.join(data_dir, filename)
            if os.path.exists(local_path):
                return real_read_csv(local_path, *args, **kwargs)
        return real_read_csv(filepath_or_buffer, *args, **kwargs)
        
    pd.read_csv = patched_read_csv

    json_files = sorted(glob.glob(os.path.join(exercises_dir, "*.json")))
    json_files = [f for f in json_files if not f.endswith("all_exercises.json")]

    print(f"==================================================")
    print(f" Verificando soluciones de {len(json_files)} ejercicios...")
    print(f"==================================================")

    total_tests = 0
    passed_tests = 0
    failed_exercises = []

    for fpath in json_files:
        with open(fpath, "r", encoding="utf-8") as f:
            ex = json.load(f)

        ex_id = ex.get("id", "unknown")
        title = ex.get("title", "Sin título")
        setup_code = ex.get("setup_code", "")
        solution_code = ex.get("solution_code", "")
        tests = ex.get("tests", [])

        full_code = (setup_code + "\n" if setup_code else "") + solution_code

        # Clean execution scope
        scope = {
            "__name__": "__main__",
            "np": np,
            "pd": pd
        }

        # 1. Execute solution
        try:
            exec(full_code, scope)
        except Exception as e:
            failed_exercises.append((ex_id, title, f"Error en ejecución de solución: {type(e).__name__}: {e}"))
            continue

        # 2. Evaluate tests
        ex_passed = True
        for t in tests:
            total_tests += 1
            test_name = t.get("name", "Test")
            check_code = t.get("check", "")
            hint = t.get("hint", "")

            try:
                passed = bool(eval(check_code, scope))
                if passed:
                    passed_tests += 1
                else:
                    ex_passed = False
                    failed_exercises.append((ex_id, title, f"Fallo test '{test_name}': {hint}"))
                    break
            except Exception as te:
                ex_passed = False
                failed_exercises.append((ex_id, title, f"Excepción en test '{test_name}': {type(te).__name__}: {te}"))
                break

    print(f"\nResumen de Verificación:")
    print(f"- Ejercicios analizados: {len(json_files)}")
    print(f"- Tests totales evaluados: {total_tests}")
    print(f"- Tests superados: {passed_tests}")

    if not failed_exercises:
        print("\n✅ ¡ÉXITO TOTAL! Todas las soluciones pasan el 100% de sus tests.")
        return 0
    else:
        print(f"\n❌ Se encontraron problemas en {len(failed_exercises)} ejercicios:")
        for eid, tit, err in failed_exercises:
            print(f"  • [{eid}] {tit}: {err}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
