# Fundamentos DS Lab

**Fundamentos DS Lab** es una plataforma web interactiva diseñada para el entrenamiento técnico intensivo en **Python, NumPy y pandas**, orientada específicamente a la ciencia de datos (limpieza de datos, agregaciones, joins relacionales, álgebra matricial vectorizada y análisis exploratorio - EDA).

> [!NOTE]
> **Aviso:** Esta plataforma **no sustituye el curso GCI**. Es un gimnasio de fundamentos técnicos para llegar con soltura a la manipulación y preparación de datos.

---

## Características Principales

- **Ejecución local en el navegador con Pyodide**: Ejecuta Python 3.12+ con NumPy y pandas compilados a WebAssembly (Wasm) dentro de un Web Worker dedicado. El código no viaja a ningún servidor externo.
- **Visualización Rica de Salidas**:
  - Renderizado automático de tablas HTML interactivas para DataFrames de pandas (`to_html`).
  - Representación detallada de arreglos NumPy (`ndarray`) con inspección de `shape` y `dtype`.
  - Captura en tiempo real de `stdout` y `stderr` con mensajes de error amigables en español.
- **Currículo Completo de 102 Ejercicios**:
  - **Módulo A: Python para Datos** (22 ejercicios): slicing con paso, list/dict comprehensions, simulacro de CSV a mano con diccionarios, anti-joins mentales con sets y lectura de tracebacks.
  - **Módulo B: NumPy** (32 ejercicios): creación de matrices, indexing multidimensional, máscaras booleanas, broadcasting por la derecha, reducciones por eje (`axis=0` vs `axis=1`), estandarización Z-score, matrices de distancias y métricas manuales (MSE, Accuracy).
  - **Módulo C: pandas** (48 ejercicios): selección `loc`/`iloc`, saneamiento de nulos, limpieza de monedas (`C$`) y formatos de fecha mixtos, `groupby` con named aggregations, imputación por subgrupo con `.transform()`, joins relacionales con `validate='1:m'`, tablas dinámicas (`pivot_table`), formato tidy (`melt`), series de tiempo ligeras (`shift`/`pct_change`) y caso integrador Capstone.
- **Ruta de Estudio Estructurada en 10 Sesiones**: Sesiones pedagógicas de 45 a 75 minutos con fundamentos teóricos concisos, desbloqueo de sesiones al superar el 80% y tracking de avance.
- **Datasets del Mundo Real** (en `/public/data/`):
  - `pacientes.csv` (100 filas): datos clínicos con fechas heterogéneas, costos con comas y nulos intencionales.
  - `municipios.csv` (15 municipios): catálogo demográfico maestro.
  - `encuesta_empleo.csv` (120 filas): mercado laboral e ingresos.
  - `ventas_tienda.csv` (150 transacciones): comercio y sucursales.
- **Modo Examen**: Oculta pistas progresivas y soluciones de referencia para autoevaluaciones rigurosas.
- **Persistencia en el Navegador**: Progreso, respuestas, notas personales y estado de sesiones guardados automáticamente en `localStorage` (sin necesidad de crear cuentas ni login).
- **Referencia Rápida (Cheatsheet)**: Guía navegable de sintaxis con botones para copiar código directamente.
- **Sandbox Libre**: Entorno interactivo con plantillas de carga rápida para experimentar libremente con los datasets.

---

## Requisitos Previos e Instalación

### 1. Clonar el repositorio e instalar dependencias
```bash
# Entrar al directorio
cd ds-lab

# Instalar dependencias de Node.js
npm install
```

### 2. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL indicada (típicamente `http://localhost:3000` o `http://localhost:5173`).

> [!IMPORTANT]
> **Primera carga de Pyodide:**
> La primera vez que abras la aplicación, el navegador descargará el runtime de WebAssembly de Python, NumPy y pandas (~20–25 MB). Aparecerá una pantalla con barra de progreso. En visitas posteriores, estos paquetes quedan cacheados en tu navegador y cargan de forma casi instantánea.

---

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo Vite con hot-reload |
| `npm run build` | Compila la aplicación a producción en la carpeta `dist/` |
| `npm test` | Valida la integridad del banco de ejercicios y de las 10 sesiones |
| `npm run export:json` | Exporta cada ejercicio a archivos individuales en `src/exercises/*.json` |
| `python3 generate_data.py` | Regenera de forma reproducible todos los archivos CSV en `public/data/` |
| `python3 solutions_check.py` | Ejecuta y verifica en CPython que el 100% de las soluciones pasen sus tests |

---

## Verificación de Soluciones en Python Local

Para correr la validación de soluciones en tu terminal:

```bash
# Crear un entorno virtual Python
python3 -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias científicas mínimas
pip install numpy pandas

# Ejecutar el comprobador automático de las 102 soluciones
python3 solutions_check.py
```

---

## Cómo Añadir un Ejercicio Nuevo

Cada ejercicio se define bajo el siguiente formato JSON y se almacena en `src/exercises/<id>.json` o en `src/data/exercises/`:

```json
{
  "id": "pd-49",
  "module": "pandas",
  "title": "Cálculo de Margen de Ganancia",
  "difficulty": 2,
  "concepts": ["assign", "operaciones entre columnas", "margen"],
  "session": 9,
  "tag": "performance",
  "estimatedMinutes": 6,
  "dataset": "ventas_tienda.csv",
  "theory_md": "### Margen de Ganancia\nPara calcular una columna derivada a partir de dos columnas existentes:\n```python\ndf['margen'] = (df['precio'] - df['costo']) / df['precio']\n```",
  "prompt_md": "En `df_ventas`, calcula el monto total facturado multiplicando `unidades * precio`. Asigna el resultado a la columna `'total'` y guarda en la variable `result` la suma de dicha columna redondeada a 2 decimales.",
  "setup_code": "import pandas as pd\ndf_ventas = pd.read_csv('/data/ventas_tienda.csv')",
  "starter_code": "# TODO: Calcula el total y la suma en result\nresult = 0.0\n",
  "solution_code": "df_ventas['total'] = df_ventas['unidades'] * df_ventas['precio']\nresult = round(float(df_ventas['total'].sum()), 2)",
  "tests": [
    {
      "name": "result es de tipo float",
      "check": "isinstance(result, float)",
      "hint": "La variable result debe ser un número float."
    },
    {
      "name": "Suma acumulada correcta",
      "check": "result > 10000.0",
      "hint": "Verifica la multiplicación de unidades por precio."
    }
  ],
  "hints": [
    "Usa `df_ventas['total'] = df_ventas['unidades'] * df_ventas['precio']`.",
    "Calcula la suma con `.sum()` y redondea con `round(float(...), 2)`."
  ],
  "forbidden": "No uses un bucle for para iterar las filas"
}
```

### Reglas para los Tests:
1. **Nunca dependas de `print()`**: Los tests siempre deben evaluar una variable final documentada en el prompt (`result`, `clean`, `avg`, `joined`, etc.).
2. **Usa checks booleanos precisos**: Expresiones que evalúen a `True` o `False` (`isinstance(...)`, `np.allclose(...)`, `result.shape == (n, m)`, `list(df.columns) == [...]`).
3. **Mensajes en español humano**: El campo `hint` de cada test debe explicar qué se esperaba si la prueba falla.

---

## Atajos de Teclado

- **`Ctrl + Enter`** o **`Cmd + Enter`**: Ejecuta el código inmediatamente en el editor.
- **`Tab`**: Indenta 4 espacios estándar de Python.
