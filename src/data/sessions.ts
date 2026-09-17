import { SessionInfo } from "../types/exercise";

export const studySessions: SessionInfo[] = [
  {
    session: 1,
    title: "Python: Fundamentos, Colecciones y Funciones",
    module: "python",
    objective: "Dominar tipos de datos, formateo, slicing de secuencias, list/dict comprehensions y funciones antes de manipular datos.",
    estimatedMinutes: 60,
    keyFoundations: [
      "Tipos primitivos, casting y f-strings con formato decimal y miles",
      "Slicing con start, stop, step e índices negativos",
      "Comprensión de listas con filtros condicionales",
      "Acceso seguro a diccionarios con .get(key, default) y conteo de frecuencias",
      "Funciones con parámetros por defecto y desempaquetado",
      "Manejo seguro de None e identidades"
    ],
    exerciseIds: [
      "py-01", "py-02", "py-03", "py-04", "py-05",
      "py-06", "py-07", "py-08", "py-09", "py-10", "py-11"
    ]
  },
  {
    session: 2,
    title: "Python: Simulacro 'CSV a Mano' y Diagnóstico de Errores",
    module: "python",
    objective: "Aprender a procesar archivos delimitados como listas de diccionarios, agrupar a mano y leer tracebacks de errores habituales.",
    estimatedMinutes: 65,
    keyFoundations: [
      "Estructura en memoria de un archivo CSV sin librerías externas",
      "Group By y agregación manual usando diccionarios",
      "Diagnóstico y manejo de KeyError, IndexError y ValueError con try/except",
      "Operaciones de conjuntos (sets) y simulación de Anti-Joins",
      "Transformación entre formato orientado a filas vs orientado a columnas",
      "Cuándo NO usar bucles for en ciencia de datos y vectorización mental"
    ],
    exerciseIds: [
      "py-12", "py-13", "py-14", "py-15", "py-16",
      "py-17", "py-18", "py-19", "py-20", "py-21", "py-22"
    ]
  },
  {
    session: 3,
    title: "NumPy: Creación, Shape, Indexado y Máscaras",
    module: "numpy",
    objective: "Construir arrays n-dimensionales eficientes, dominar el indexado multidimensional y el filtrado booleano en memoria.",
    estimatedMinutes: 65,
    keyFoundations: [
      "np.ndarray vs listas de Python: memoria contigua, shape, ndim y dtype",
      "Generadores de secuencias: np.arange vs np.linspace",
      "Matrices especiales: zeros, ones, full y matriz identidad eye",
      "Slicing bidimensional: filas, columnas y submatrices",
      "Máscaras booleanas y operadores lógicos bitwise (&, |, ~)",
      "Fancy indexing y selección condicional con np.where y np.clip",
      "Vistas vs copias en memoria y propiedades de arr.base",
      "Aleatoriedad reproducible moderna con np.random.default_rng(seed)"
    ],
    exerciseIds: [
      "np-01", "np-02", "np-03", "np-04", "np-05", "np-06", "np-07", "np-08",
      "np-09", "np-10", "np-11", "np-12", "np-13", "np-14", "np-15", "np-16"
    ]
  },
  {
    session: 4,
    title: "NumPy: Broadcasting, Reducciones (Axis) y Estandarización",
    module: "numpy",
    objective: "Comprender a fondo la regla de alineación por la derecha, reducciones dimensionales por eje y operaciones de Machine Learning.",
    estimatedMinutes: 70,
    keyFoundations: [
      "Regla mnemotécnica de axis: axis=0 (por columnas) vs axis=1 (por filas)",
      "Reglas formales de broadcasting: alineación dimensional hacia la derecha",
      "Vectores columna con [:, None] y centrado de matrices",
      "Estandarización Z-score vectorizada de vectores y matrices (axis=0)",
      "Cálculo de matrices de distancias euclídeas por pares mediante broadcasting",
      "One-Hot encoding manual vectorizado con np.eye",
      "Métricas a mano: Accuracy, Error Cuadrático Medio (MSE) y correlación de Pearson",
      "Promedios móviles (rolling mean) con slicing y percentiles"
    ],
    exerciseIds: [
      "np-17", "np-18", "np-19", "np-20", "np-21", "np-22", "np-23", "np-24",
      "np-25", "np-26", "np-27", "np-28", "np-29", "np-30", "np-31", "np-32"
    ]
  },
  {
    session: 5,
    title: "pandas: Carga, Selección (loc / iloc) y Filtros",
    module: "pandas",
    objective: "Cargar datasets reales, navegar con precisión mediante loc/iloc y aplicar filtros booleanos y de intervalos continuos.",
    estimatedMinutes: 55,
    keyFoundations: [
      "Arquitectura de pandas: Series vs DataFrames y gestión de índices",
      "Carga eficiente con pd.read_csv: delimitadores y parse_dates",
      "Selección posicional .iloc vs selección por etiquetas .loc",
      "Filtros booleanos con operadores lógicos & y ~",
      "Filtros de conjuntos con .isin() y rangos continuos con .between()",
      "Ordenamiento multidimensional con .sort_values()"
    ],
    exerciseIds: [
      "pd-01", "pd-02", "pd-03", "pd-04",
      "pd-05", "pd-06", "pd-07", "pd-08"
    ]
  },
  {
    session: 6,
    title: "pandas: Nulos, Tipos, Texto y Fechas",
    module: "pandas",
    objective: "Diagnosticar y limpiar datos del mundo real: valores faltantes, conversión de tipos numéricos y manipulación de texto y fechas.",
    estimatedMinutes: 60,
    keyFoundations: [
      "Diagnóstico de calidad de datos: porcentaje de nulos por columna",
      "Remoción selectiva con dropna(subset=[...])",
      "Imputación de valores faltantes con estadísticos robustos (mediana)",
      "Limpieza de cadenas de texto monetarias con .str.replace() y pd.to_numeric()",
      "Normalización de fechas mixtas con pd.to_datetime(format='mixed') y accesor .dt",
      "Búsqueda de patrones en texto con .str.contains(case=False)",
      "Discretización en intervalos con pd.cut() y columnas condicionales con np.where"
    ],
    exerciseIds: [
      "pd-09", "pd-10", "pd-11", "pd-12",
      "pd-13", "pd-14", "pd-15", "pd-16"
    ]
  },
  {
    session: 7,
    title: "pandas: Agrupaciones y Agregaciones (Group By)",
    module: "pandas",
    objective: "Dominar el patrón split-apply-combine, named aggregations, transform para imputación por grupo y tasas per cápita.",
    estimatedMinutes: 65,
    keyFoundations: [
      "Sintaxis moderna de Named Aggregations para evitar multiíndices en columnas",
      "Diferencia fundamental entre .size() (filas totales) y .count() (valores válidos)",
      "Filtrado de grupos completos con .groupby().filter()",
      "Imputación de nulos a nivel de subpoblación con .groupby().transform()",
      "Extracción de los Top-N registros por grupo con .nlargest()",
      "Cálculo de brechas entre categorías e indicadores de salud per cápita"
    ],
    exerciseIds: [
      "pd-17", "pd-18", "pd-19", "pd-20",
      "pd-21", "pd-22", "pd-23", "pd-24"
    ]
  },
  {
    session: 8,
    title: "pandas: Joins (Merge), Concatenación y Calidad de Llaves",
    module: "pandas",
    objective: "Combinar múltiples fuentes de datos relacionales, prevenir errores de duplicidad con validate y detectar registros huérfanos.",
    estimatedMinutes: 60,
    keyFoundations: [
      "Tipos de merge: Inner, Left, Right y Outer joins",
      "Detección de anti-joins y registros huérfanos con indicator=True",
      "Validación de unicidad de llaves y prevención de explosión cartesiana con validate='1:m'",
      "Resolución de colisiones de nombres con el argumento suffixes",
      "Concatenación vertical de lotes con pd.concat() e ignore_index=True",
      "Detección y deduplicación con drop_duplicates(subset, keep='last')",
      "Alineación aproximada en series de tiempo con pd.merge_asof()"
    ],
    exerciseIds: [
      "pd-25", "pd-26", "pd-27", "pd-28",
      "pd-29", "pd-30", "pd-31", "pd-32"
    ]
  },
  {
    session: 9,
    title: "pandas: Reshape (Pivot/Melt), Series de Tiempo y Features",
    module: "pandas",
    objective: "Transformar la forma de los datos entre formato ancho y tidy, tabular frecuencias cruzadas y generar indicadores temporales.",
    estimatedMinutes: 60,
    keyFoundations: [
      "Tablas dinámicas con pivot_table(): agregación cruzada de filas y columnas",
      "Despivotar de ancho a largo con pd.melt() para formato Tidy",
      "Tablas de contingencia y porcentajes relativos con pd.crosstab()",
      "Lags y cálculos de cambio temporal con .shift() y .pct_change()",
      "Detección analítica de outliers con el Rango Intercuartílico (IQR)",
      "Method chaining legible para pipelines de transformación sin variables basuras"
    ],
    exerciseIds: [
      "pd-33", "pd-34", "pd-35", "pd-36",
      "pd-37", "pd-38", "pd-39", "pd-40"
    ]
  },
  {
    session: 10,
    title: "Capstone Integrador: Caso Clínico y Demográfico",
    module: "pandas",
    objective: "Resolver un caso integral de principio a fin sobre los datasets de pacientes y municipios: limpieza, join, agregación y preguntas de negocio.",
    estimatedMinutes: 75,
    keyFoundations: [
      "Pipeline completo de saneamiento de registros hospitalarios en producción",
      "Enriquecimiento de pacientes con demografía municipal mediante join",
      "Tabulación cruzada de costo médico por diagnóstico y zona socioeconómica",
      "Resolución de preguntas de impacto para toma de decisiones",
      "Auditoría de unicidad de pacientes y pacientes recurrentes",
      "Generación del reporte ejecutivo consolidado final para stakeholders"
    ],
    exerciseIds: [
      "pd-41", "pd-42", "pd-43", "pd-44",
      "pd-45", "pd-46", "pd-47", "pd-48"
    ]
  }
];
