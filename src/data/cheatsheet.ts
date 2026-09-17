export interface CheatsheetSection {
  title: string;
  items: {
    name: string;
    syntax: string;
    description: string;
  }[];
}

export interface CheatsheetCategory {
  id: "python" | "numpy" | "pandas";
  name: string;
  icon: string;
  description: string;
  sections: CheatsheetSection[];
}

export const cheatsheetData: CheatsheetCategory[] = [
  {
    id: "python",
    name: "Python para Datos",
    icon: "Code",
    description: "Sintaxis esencial, colecciones, filtrados, formateo y estructuras base para manipulación analítica.",
    sections: [
      {
        title: "Tipos, Casting y f-strings",
        items: [
          {
            name: "Casting numérico",
            syntax: "monto = float('1250.50')\nedad = int('28')",
            description: "Convierte cadenas de texto a tipos numéricos float o int."
          },
          {
            name: "f-strings con formato de moneda y decimales",
            syntax: 'f"Total: C$ {monto:,.2f}"  # C$ 1,250.50\nf"Tasa: {tasa:.1%}"       # 8.5%',
            description: "Formatea números flotantes con separador de miles (,) y decimales fijos (.2f)."
          }
        ]
      },
      {
        title: "Listas: Slicing y Comprensiones",
        items: [
          {
            name: "Slicing con paso",
            syntax: "sub = lista[start:stop:step]\nultimos = lista[-3:]\ninvertida = lista[::-1]",
            description: "Extrae subconjuntos de secuencias. step negativo recorre en reversa."
          },
          {
            name: "List comprehension con filtro",
            syntax: "[x * 1.10 for x in valores if x > 500]",
            description: "Aplica transformación y filtrado en una sola línea idiomática."
          },
          {
            name: "Aplanar lista de listas",
            syntax: "[elem for fila in matriz for elem in fila]",
            description: "Aplana estructuras bidimensionales a una sola lista continua."
          }
        ]
      },
      {
        title: "Diccionarios y Conteo de Frecuencias",
        items: [
          {
            name: "Acceso seguro con .get()",
            syntax: "val = diccionario.get(clave, 0.0)",
            description: "Evita excepciones KeyError devolviendo un valor por defecto si la clave no existe."
          },
          {
            name: "Contador de frecuencias",
            syntax: "conteo = {}\nfor x in datos:\n    conteo[x] = conteo.get(x, 0) + 1",
            description: "Patrón base para construir tablas de frecuencia con Python estándar."
          },
          {
            name: "Combinar listas con zip en dict",
            syntax: "dict_datos = dict(zip(columnas, valores))\n# O con filtro: {k: v for k, v in zip(ks, vs) if v > 0}",
            description: "Aparea dos listas paralelas creando pares clave-valor."
          }
        ]
      },
      {
        title: "Manejo de Errores y Calidad",
        items: [
          {
            name: "Conversión segura try/except",
            syntax: "try:\n    n = float(texto)\nexcept (ValueError, TypeError):\n    n = 0.0",
            description: "Captura conversiones corruptas ('N/A', None) sin detener la ejecución."
          },
          {
            name: "Operaciones de conjuntos (Anti-Join)",
            syntax: "huerfanos = sorted(list(set(lista_a) - set(lista_b)))",
            description: "Encuentra elementos presentes en A pero ausentes en B a velocidad O(1)."
          }
        ]
      }
    ]
  },
  {
    id: "numpy",
    name: "NumPy",
    icon: "Grid",
    description: "Cálculo matricial en C, operaciones vectorizadas, broadcasting dimensional y álgebra lineal.",
    sections: [
      {
        title: "Creación y Generadores",
        items: [
          {
            name: "Crear array tipado",
            syntax: "arr = np.array([1, 2, 3], dtype=np.float64)\narr.shape  # (N, M)\narr.ndim   # dimensiones",
            description: "Instancia un ndarray contiguo en memoria C."
          },
          {
            name: "Secuencias: arange vs linspace",
            syntax: "np.arange(0, 10, 2)       # paso = 2 (stop exclusivo)\nnp.linspace(0.0, 1.0, 5)  # 5 puntos equidistantes",
            description: "Generación de rangos numéricos continuos y discretos."
          },
          {
            name: "Matrices especiales",
            syntax: "np.zeros((3, 4))    # Ceros\nnp.ones((2, 2))     # Unos\nnp.eye(3)           # Matriz identidad 3x3\nnp.full((2, 3), -1) # Relleno con valor",
            description: "Inicialización rápida de matrices con forma dada."
          }
        ]
      },
      {
        title: "Indexado, Máscaras y Selección",
        items: [
          {
            name: "Slicing 2D",
            syntax: "M[1:4, 2:5]   # Filas 1 a 3, Columnas 2 a 4\nM[:, 0]       # Primera columna completa\nM[0, :]       # Primera fila completa",
            description: "Acceso posicional matricial rápido (devuelve vistas en memoria)."
          },
          {
            name: "Máscara booleana y bitwise",
            syntax: "mask = (x >= 20) & (x < 35)\nfiltrados = x[mask]",
            description: "Filtrado elemento a elemento usando & (AND), | (OR) y ~ (NOT) con paréntesis."
          },
          {
            name: "np.where condicional",
            syntax: "np.where(arr >= 60, 'Aprobado', 'Reprobado')",
            description: "Bifurcación vectorizada estilo if-else sin iteraciones lentas de Python."
          },
          {
            name: "np.clip (Winsorización)",
            syntax: "arr_acotado = np.clip(arr, a_min=0, a_max=60)",
            description: "Recorta valores extremos superiores e inferiores a límites dados."
          }
        ]
      },
      {
        title: "Broadcasting y Ejes (Axis)",
        items: [
          {
            name: "Regla mnemotécnica de axis",
            syntax: "M.mean(axis=0)  # Colapsa filas -> Un resultado POR COLUMNA\nM.sum(axis=1)   # Colapsa columnas -> Un resultado POR FILA",
            description: "Operaciones de agregación sobre matrices multidimensionales."
          },
          {
            name: "Vector columna con [:, None]",
            syntax: "medias_filas = M.mean(axis=1)[:, None]\nM_centrada = M - medias_filas  # (N, M) - (N, 1)",
            description: "Alinea vectores de tamaño N para operar fila por fila sobre matrices (N, M)."
          },
          {
            name: "Estandarización Z-score",
            syntax: "z = (X - X.mean(axis=0)) / X.std(axis=0)",
            description: "Escala variables numéricas para que tengan media 0 y desviación estándar 1."
          },
          {
            name: "Matriz de distancias 1D",
            syntax: "D = np.abs(v[:, None] - v[None, :])",
            description: "Calcula distancias absolutas entre todos los pares de puntos con broadcasting."
          }
        ]
      },
      {
        title: "Missing Values y Álgebra",
        items: [
          {
            name: "np.isnan y np.nanmean",
            syntax: "media = np.nanmean(arr)\narr_limpio = np.where(np.isnan(arr), media, arr)",
            description: "Operaciones estadísticas ignorando valores flotantes nulos (np.nan)."
          },
          {
            name: "Producto punto y métricas",
            syntax: "dot = u @ v  # o np.dot(u, v)\nmse = np.mean((y_real - y_pred)**2)\nacc = (y_pred == y_real).mean()",
            description: "Operaciones algebraicas vectorizadas para evaluación de modelos."
          }
        ]
      }
    ]
  },
  {
    id: "pandas",
    name: "pandas",
    icon: "Table",
    description: "Manipulación de tablas, limpieza de nulos, series de tiempo, agrupaciones, joins y reshape.",
    sections: [
      {
        title: "Carga y Selección (loc / iloc)",
        items: [
          {
            name: "Carga de CSV con fechas",
            syntax: "df = pd.read_csv('/data/ventas.csv', parse_dates=['fecha'])",
            description: "Lee archivos CSV infiriendo columnas de fecha en datetime64."
          },
          {
            name: ".iloc (Índice posicional entero)",
            syntax: "df.iloc[0:5, 1:3]  # Filas 0 a 4, columnas 1 y 2 (exclusivo a la derecha)",
            description: "Selección estrictamente basada en posición numérica entera."
          },
          {
            name: ".loc (Índice por etiquetas)",
            syntax: "df.loc[2:6, ['municipio', 'poblacion']]  # Extremos inclusivos",
            description: "Selección por nombres de columnas y etiquetas del índice."
          },
          {
            name: "Filtros con .isin() y .between()",
            syntax: "df[df['tienda'].isin(['Central', 'Occidente'])]\ndf[df['edad'].between(25, 40)]",
            description: "Filtrado de pertenencia en listas de categorías o intervalos numéricos cerrados."
          }
        ]
      },
      {
        title: "Calidad de Datos, Nulos y Tipos",
        items: [
          {
            name: "Diagnóstico de % de nulos",
            syntax: "(df.isna().mean() * 100).round(2).sort_values(ascending=False)",
            description: "Genera el reporte porcentual de valores faltantes por columna."
          },
          {
            name: "dropna selectivo y fillna",
            syntax: "df.dropna(subset=['edad'])\ndf['edad_imp'] = df['edad'].fillna(df['edad'].median())",
            description: "Eliminación restringida o imputación con estadísticos robustos."
          },
          {
            name: "Limpieza de strings monetarios",
            syntax: "df['costo_num'] = pd.to_numeric(\n    df['costo'].astype(str).str.replace(',', '', regex=False),\n    errors='coerce'\n)",
            description: "Elimina comas o símbolos y convierte a float forzando errores a NaN."
          },
          {
            name: "Fechas mixtas y accesor .dt",
            syntax: "fechas = pd.to_datetime(df['fecha'], format='mixed')\ndf['mes'] = fechas.dt.month\ndf['anio'] = fechas.dt.year",
            description: "Parsea formatos heterogéneos y extrae partes del calendario."
          }
        ]
      },
      {
        title: "Groupby y Named Aggregations",
        items: [
          {
            name: "Named Aggregations limpias",
            syntax: "resumen = df.groupby('sector').agg(\n    ingreso_medio=('ingreso', 'mean'),\n    total_personas=('id', 'size')\n).reset_index()",
            description: "Agrupa y nombra directamente las columnas resultantes evitando multiíndices."
          },
          {
            name: "Imputación por grupo con .transform()",
            syntax: "med_grupo = df.groupby('municipio')['edad'].transform('median')\ndf['edad_imp'] = df['edad'].fillna(med_grupo)",
            description: "Conserva el tamaño original del DataFrame para operar a nivel de subpoblación."
          },
          {
            name: "Top-N por grupo",
            syntax: "df.groupby('categoria', group_keys=False).apply(lambda g: g.nlargest(2, 'unidades'))",
            description: "Filtra los registros líderes dentro de cada grupo."
          }
        ]
      },
      {
        title: "Joins, Reshape y Series Temporales",
        items: [
          {
            name: "Merge con validación de unicidad",
            syntax: "pd.merge(ventas, municipios, on='municipio', how='left', validate='m:1')",
            description: "Une tablas garantizando que no existan duplicados en la clave de la derecha."
          },
          {
            name: "Anti-Join con indicator=True",
            syntax: "m = pd.merge(pacientes, municipios, on='municipio', how='left', indicator=True)\nhuerfanos = m[m['_merge'] == 'left_only']",
            description: "Detecta registros que no tienen match en la tabla relacionada."
          },
          {
            name: "Pivot Table y Crosstab",
            syntax: "df.pivot_table(index='tienda', columns='categoria', values='unidades', aggfunc='sum')\npd.crosstab(df['sexo'], df['ocupado'], normalize='index') * 100",
            description: "Tabulaciones dinámicas cruzadas y porcentajes de contingencia."
          },
          {
            name: "Lags y cambios con .shift() y .pct_change()",
            syntax: "df['anterior'] = df['precio'].shift(1)\ndf['crecimiento_pct'] = (df['ventas'].pct_change() * 100).round(2)",
            description: "Operaciones de series de tiempo para cálculos de variación y crecimiento."
          }
        ]
      }
    ]
  }
];
