import { Exercise } from "../../types/exercise";

export const pandasExercises: Exercise[] = [
  {
    "id": "pd-01",
    "module": "pandas",
    "title": "Creación de Series y DataFrames desde diccionarios",
    "difficulty": 1,
    "concepts": [
      "Series",
      "DataFrame",
      "index",
      "dtypes"
    ],
    "session": 5,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Series y DataFrames\n- `pd.Series`: Arreglo unidimensional etiquetado (columna única con índice).\n- `pd.DataFrame`: Tabla bidimensional de datos estructurados compuesta por varias Series que comparten el mismo índice.\n```python\ns = pd.Series([10, 20, 30], name=\"ventas\")\ndf = pd.DataFrame({\n    \"producto\": [\"A\", \"B\", \"C\"],\n    \"precio\": [15.5, 20.0, 9.99]\n})\n```",
    "prompt_md": "Crea un DataFrame de pandas a partir de las listas dadas con tres columnas: `\"municipio\"`, `\"poblacion\"` y `\"zona\"`.\nAsigna el DataFrame resultante a la variable `df`, y en la variable `result` guarda una tupla con `(df.shape, list(df.columns))`.",
    "setup_code": "import pandas as pd\nmunicipios = [\"Managua\", \"Leon\", \"Granada\"]\npoblaciones = [1050000, 210000, 130000]\nzonas = [\"urbana\", \"urbana\", \"rural\"]",
    "starter_code": "import pandas as pd\nmunicipios = [\"Managua\", \"Leon\", \"Granada\"]\npoblaciones = [1050000, 210000, 130000]\nzonas = [\"urbana\", \"urbana\", \"rural\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea df y extrae la tupla en result\ndf = None\nresult = None\n",
    "solution_code": "df = pd.DataFrame({\n    \"municipio\": municipios,\n    \"poblacion\": poblaciones,\n    \"zona\": zonas\n})\nresult = (df.shape, list(df.columns))",
    "tests": [
      {
        "name": "df es un DataFrame con 3 filas y 3 columnas",
        "check": "isinstance(df, pd.DataFrame) and df.shape == (3, 3)",
        "hint": "df debe tener 3 filas y 3 columnas."
      },
      {
        "name": "result contiene la tupla correcta de metadatos",
        "check": "result == ((3, 3), ['municipio', 'poblacion', 'zona'])",
        "hint": "Esperaba ((3, 3), ['municipio', 'poblacion', 'zona'])."
      }
    ],
    "hints": [
      "Pasa un diccionario a `pd.DataFrame({'municipio': municipios, ...})`.",
      "Asigna a `result = (df.shape, list(df.columns))`."
    ]
  },
  {
    "id": "pd-02",
    "module": "pandas",
    "title": "Cargar CSV con separador y parse_dates",
    "difficulty": 2,
    "concepts": [
      "read_csv",
      "parse_dates",
      "carga de datos"
    ],
    "session": 5,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "ventas_tienda.csv",
    "theory_md": "### Carga eficiente con pd.read_csv\nEl método `pd.read_csv()` es la puerta de entrada más usada en Data Science:\n- `sep`: Delimitador (por defecto `','`).\n- `parse_dates`: Lista de nombres de columnas que deben convertirse automáticamente a tipo `datetime64`.\n```python\ndf = pd.read_csv(\"datos.csv\", parse_dates=[\"fecha\"])\n```",
    "prompt_md": "Carga el archivo `\"/data/ventas_tienda.csv\"` parseando la columna `\"fecha\"` como objeto de fecha (`parse_dates=[\"fecha\"]`).\nAsigna el DataFrame cargado a la variable `df`.\nEn la variable `result` guarda el tipo de dato (`dtype`) exacto de la columna `fecha` convertido a string: `str(df[\"fecha\"].dtype)`.",
    "setup_code": "import pandas as pd",
    "starter_code": "import pandas as pd\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Carga el dataset y verifica el dtype de 'fecha' en result\ndf = None\nresult = None\n",
    "solution_code": "df = pd.read_csv(\"/data/ventas_tienda.csv\", parse_dates=[\"fecha\"])\nresult = str(df[\"fecha\"].dtype)",
    "tests": [
      {
        "name": "df es un DataFrame con 150 registros",
        "check": "isinstance(df, pd.DataFrame) and len(df) == 150",
        "hint": "df debe contener 150 filas de ventas."
      },
      {
        "name": "La columna fecha se parseó como datetime64",
        "check": "'datetime64' in result",
        "hint": "El dtype de la columna 'fecha' debe ser datetime64[ns]."
      }
    ],
    "hints": [
      "Usa `pd.read_csv('/data/ventas_tienda.csv', parse_dates=['fecha'])`.",
      "Usa `result = str(df['fecha'].dtype)`."
    ]
  },
  {
    "id": "pd-03",
    "module": "pandas",
    "title": "Selección por posición: iloc",
    "difficulty": 1,
    "concepts": [
      "iloc",
      "slicing entero",
      "seleccion"
    ],
    "session": 5,
    "tag": "indexing",
    "estimatedMinutes": 5,
    "dataset": "municipios.csv",
    "theory_md": "### Selección posicional con iloc\n`.iloc[filas, columnas]` utiliza exclusivamente índices enteros tipo Python (de `0` a `N-1`), con extremos derechos **exclusivos**:\n```python\ndf.iloc[0:5, 1:3]  # Primeras 5 filas, columnas en índices 1 y 2\ndf.iloc[-1, :]     # Última fila del DataFrame\n```",
    "prompt_md": "Dado el DataFrame `df_mun`, usa exclusivamente `.iloc` para extraer en la variable `result` un nuevo DataFrame que contenga:\n- Las primeras 5 filas (índices posicionales 0 a 4).\n- Las dos primeras columnas (índices posicionales 0 y 1).",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Extrae el corte posicional con .iloc en result\nresult = None\n",
    "solution_code": "result = df_mun.iloc[0:5, 0:2]",
    "tests": [
      {
        "name": "result tiene dimensiones (5, 2)",
        "check": "isinstance(result, pd.DataFrame) and result.shape == (5, 2)",
        "hint": "result debe ser un DataFrame de 5 filas y 2 columnas."
      },
      {
        "name": "Columnas son municipio y departamento",
        "check": "list(result.columns) == ['municipio', 'departamento']",
        "hint": "Las dos primeras columnas deben ser 'municipio' y 'departamento'."
      }
    ],
    "hints": [
      "Usa `df_mun.iloc[0:5, 0:2]`."
    ]
  },
  {
    "id": "pd-04",
    "module": "pandas",
    "title": "Selección por etiqueta: loc",
    "difficulty": 2,
    "concepts": [
      "loc",
      "etiquetas",
      "seleccion de columnas"
    ],
    "session": 5,
    "tag": "indexing",
    "estimatedMinutes": 5,
    "dataset": "municipios.csv",
    "theory_md": "### Selección por etiqueta con loc\n`.loc[filas, columnas]` opera con las etiquetas del índice y los nombres de las columnas.\n¡Cuidado! A diferencia de iloc, los rangos de etiquetas en loc son **inclusivos** en ambos extremos:\n```python\ndf.loc[0:3, [\"municipio\", \"poblacion\"]] # Filas con etiqueta 0, 1, 2 y 3 inclusive\n```",
    "prompt_md": "Dado el DataFrame `df_mun`, utiliza `.loc` para extraer en la variable `result` las filas con índice de etiqueta de `2` a `6` (inclusive ambas), y únicamente las columnas `\"municipio\"` y `\"poblacion\"`.",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Extrae con .loc en result\nresult = None\n",
    "solution_code": "result = df_mun.loc[2:6, [\"municipio\", \"poblacion\"]]",
    "tests": [
      {
        "name": "result contiene exactamente 5 filas (2 a 6 inclusivo)",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 5",
        "hint": "En loc, 2:6 incluye las etiquetas 2, 3, 4, 5 y 6 (5 filas)."
      },
      {
        "name": "Columnas correctas seleccionadas",
        "check": "list(result.columns) == ['municipio', 'poblacion']",
        "hint": "Las columnas deben ser ['municipio', 'poblacion']."
      }
    ],
    "hints": [
      "Usa `df_mun.loc[2:6, ['municipio', 'poblacion']]`."
    ]
  },
  {
    "id": "pd-05",
    "module": "pandas",
    "title": "Filtro booleano simple y operador ~ (negación)",
    "difficulty": 2,
    "concepts": [
      "filtro booleano",
      "negacion",
      "isin"
    ],
    "session": 5,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "municipios.csv",
    "theory_md": "### Filtrado Booleano en pandas\nPara filtrar filas aplicamos una condición lógica sobre una Serie:\n```python\nurbanos = df[df[\"zona\"] == \"urbana\"]\nno_urbanos = df[~(df[\"zona\"] == \"urbana\")] # El operador ~ invierte la máscara\n```",
    "prompt_md": "Dado el catálogo de municipios `df_mun`, filtra en la variable `result` todos los municipios que pertenezcan a la zona `\"rural\"` y cuya población sea **estrictamente mayor a 50,000 habitantes**.",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra municipios rurales con población > 50000 en result\nresult = None\n",
    "solution_code": "result = df_mun[(df_mun[\"zona\"] == \"rural\") & (df_mun[\"poblacion\"] > 50000)]",
    "tests": [
      {
        "name": "result es un DataFrame",
        "check": "isinstance(result, pd.DataFrame)",
        "hint": "result debe ser un DataFrame filtrado."
      },
      {
        "name": "Todos los municipios en result son rurales y tienen > 50,000 hab",
        "check": "(result['zona'] == 'rural').all() and (result['poblacion'] > 50000).all()",
        "hint": "Verifica que zona sea 'rural' y poblacion > 50000."
      },
      {
        "name": "Cantidad exacta de municipios cumpliendo el criterio",
        "check": "len(result) == 6",
        "hint": "Esperaba 6 municipios rurales con población > 50k (Juigalpa, Rivas, San Carlos, Jinotega, Boaco, Bluefields)."
      }
    ],
    "hints": [
      "Usa `(df_mun['zona'] == 'rural') & (df_mun['poblacion'] > 50000)`.",
      "Recuerda poner cada condición entre paréntesis."
    ]
  },
  {
    "id": "pd-06",
    "module": "pandas",
    "title": "Filtro de pertenencia con .isin()",
    "difficulty": 2,
    "concepts": [
      "isin",
      "filtrado",
      "listas de categorias"
    ],
    "session": 5,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "ventas_tienda.csv",
    "theory_md": "### El método .isin()\nPara verificar si los valores de una columna pertenecen a una lista de opciones permitidas:\n```python\ncategorias_deseadas = [\"Alimentos\", \"Bebidas\"]\nfiltro = df[\"categoria\"].isin(categorias_deseadas)\nsub_df = df[filtro]\n```",
    "prompt_md": "Dado el registro de ventas `df_ventas`, filtra en la variable `result` únicamente las transacciones correspondientes a las tiendas `\"Central\"` u `\"Occidente\"` que pertenezcan a la categoría `\"Tecnología\"`.",
    "setup_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")",
    "starter_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra con .isin() y categoría en result\nresult = None\n",
    "solution_code": "result = df_ventas[df_ventas[\"tienda\"].isin([\"Central\", \"Occidente\"]) & (df_ventas[\"categoria\"] == \"Tecnología\")]",
    "tests": [
      {
        "name": "result contiene únicamente las tiendas indicadas y categoría Tecnología",
        "check": "isinstance(result, pd.DataFrame) and result['tienda'].isin(['Central', 'Occidente']).all() and (result['categoria'] == 'Tecnología').all()",
        "hint": "Solo deben aparecer tiendas Central u Occidente con categoría Tecnología."
      },
      {
        "name": "Se filtraron registros",
        "check": "len(result) > 0",
        "hint": "El resultado debe contener transacciones."
      }
    ],
    "hints": [
      "Usa `df_ventas['tienda'].isin(['Central', 'Occidente'])`.",
      "Combina con `& (df_ventas['categoria'] == 'Tecnología')`."
    ]
  },
  {
    "id": "pd-07",
    "module": "pandas",
    "title": "Filtro por rango continuo con .between()",
    "difficulty": 2,
    "concepts": [
      "between",
      "rangos continuos",
      "filtrado"
    ],
    "session": 5,
    "tag": "indexing",
    "estimatedMinutes": 5,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Método .between()\nComprueba si un valor numérico o fecha cae en un intervalo `[left, right]` (inclusivo por defecto):\n```python\njovenes = df[df[\"edad\"].between(18, 25)]\n```",
    "prompt_md": "Dada la encuesta de empleo `df_emp`, filtra en la variable `result` a los encuestados cuya edad esté entre **25 y 40 años inclusive**, y que además estén ocupados (`ocupado == 1`).",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra usando .between() en result\nresult = None\n",
    "solution_code": "result = df_emp[df_emp[\"edad\"].between(25, 40) & (df_emp[\"ocupado\"] == 1)]",
    "tests": [
      {
        "name": "result contiene solo ocupados con edades entre 25 y 40",
        "check": "isinstance(result, pd.DataFrame) and (result['ocupado'] == 1).all() and result['edad'].between(25, 40).all()",
        "hint": "Todos deben tener ocupado=1 y edad entre 25 y 40."
      },
      {
        "name": "Cantidad de registros coincide con los datos",
        "check": "len(result) > 0",
        "hint": "Debe haber registros en el resultado."
      }
    ],
    "hints": [
      "Usa `df_emp['edad'].between(25, 40)`.",
      "Añade `& (df_emp['ocupado'] == 1)`."
    ]
  },
  {
    "id": "pd-08",
    "module": "pandas",
    "title": "Ordenar valores con sort_values de múltiples columnas",
    "difficulty": 2,
    "concepts": [
      "sort_values",
      "ascending",
      "ordenamiento"
    ],
    "session": 5,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "municipios.csv",
    "theory_md": "### Ordenamiento con .sort_values()\nPermite ordenar por una o más columnas con distintas direcciones:\n```python\ndf_ord = df.sort_values(\n    by=[\"departamento\", \"poblacion\"],\n    ascending=[True, False]\n)\n```",
    "prompt_md": "Dado el DataFrame `df_mun`, ordénalo en la variable `result` primero por `\"zona\"` alfabéticamente (ascendente) y luego por `\"poblacion\"` de mayor a menor (descendente).",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Ordena df_mun según las especificaciones en result\nresult = None\n",
    "solution_code": "result = df_mun.sort_values(by=[\"zona\", \"poblacion\"], ascending=[True, False])",
    "tests": [
      {
        "name": "result conserva las 15 filas",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 15",
        "hint": "El DataFrame ordenado debe tener 15 filas."
      },
      {
        "name": "Primer registro es el municipio rural más poblado",
        "check": "result.iloc[0]['zona'] == 'rural' and result.iloc[0]['municipio'] == 'Jinotega'",
        "hint": "Al ser 'rural' antes que 'urbana' alfabéticamente, el primer registro debe ser rural con máxima población (Jinotega)."
      },
      {
        "name": "Último registro es el municipio urbano menos poblado",
        "check": "result.iloc[-1]['zona'] == 'urbana' and result.iloc[-1]['municipio'] == 'Granada'",
        "hint": "El último registro debe ser Granada (el de menor población entre los urbanos)."
      }
    ],
    "hints": [
      "Usa `by=['zona', 'poblacion']`.",
      "Pasa `ascending=[True, False]`."
    ]
  },
  {
    "id": "pd-09",
    "module": "pandas",
    "title": "Reporte de calidad de datos: % de nulos por columna",
    "difficulty": 2,
    "concepts": [
      "isna",
      "mean",
      "calidad de datos",
      "missing"
    ],
    "session": 6,
    "tag": "missing",
    "estimatedMinutes": 6,
    "dataset": "pacientes.csv",
    "theory_md": "### Diagnóstico de Nulos\nEn pandas, `.isna().mean() * 100` calcula el porcentaje exacto de valores faltantes por columna:\n```python\npct_nulos = df.isna().mean() * 100\n```",
    "prompt_md": "Dado el DataFrame de pacientes `df_pac`, calcula en la variable `result` una Serie con el **porcentaje de valores nulos por columna** (redondeado a 2 decimales con `.round(2)`), ordenado de mayor a menor porcentaje.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el porcentaje de nulos por columna en result\nresult = None\n",
    "solution_code": "result = (df_pac.isna().mean() * 100).round(2).sort_values(ascending=False)",
    "tests": [
      {
        "name": "result es una Serie con todas las columnas del DataFrame",
        "check": "isinstance(result, pd.Series) and len(result) == df_pac.shape[1]",
        "hint": "result debe ser una Serie de pandas con una fila por columna."
      },
      {
        "name": "Orden descendente verificado",
        "check": "result.iloc[0] >= result.iloc[-1]",
        "hint": "Los valores deben estar ordenados de mayor a menor."
      },
      {
        "name": "edad y seguro tienen valores > 0",
        "check": "result['edad'] > 0 and result['seguro'] > 0",
        "hint": "Tanto edad como seguro tienen valores nulos intencionales en el dataset."
      }
    ],
    "hints": [
      "Usa `(df_pac.isna().mean() * 100)`.",
      "Encadena `.round(2).sort_values(ascending=False)`."
    ]
  },
  {
    "id": "pd-10",
    "module": "pandas",
    "title": "Eliminar nulos con dropna(subset=[...])",
    "difficulty": 2,
    "concepts": [
      "dropna",
      "subset",
      "missing"
    ],
    "session": 6,
    "tag": "missing",
    "estimatedMinutes": 5,
    "dataset": "pacientes.csv",
    "theory_md": "### Eliminación selectiva de nulos\nLlamar a `df.dropna()` sin argumentos elimina filas donde *cualquier* columna tenga nulo, lo que suele destruir demasiada información.\nSe debe usar `subset`:\n```python\ndf_limpio = df.dropna(subset=[\"edad\", \"municipio\"])\n```",
    "prompt_md": "Dado el DataFrame `df_pac`, elimina únicamente las observaciones donde la columna `\"edad\"` sea nula (`NaN`).\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Elimina filas con edad nula en result\nresult = None\n",
    "solution_code": "result = df_pac.dropna(subset=[\"edad\"])",
    "tests": [
      {
        "name": "result no tiene nulos en la columna edad",
        "check": "isinstance(result, pd.DataFrame) and result['edad'].isna().sum() == 0",
        "hint": "La columna 'edad' no debe tener ningún valor nulo."
      },
      {
        "name": "Se eliminaron las filas correspondientes",
        "check": "len(result) < len(df_pac) and len(result) >= 90",
        "hint": "Se deben haber eliminado únicamente las filas con edad faltante."
      }
    ],
    "hints": [
      "Usa `df_pac.dropna(subset=['edad'])`."
    ]
  },
  {
    "id": "pd-11",
    "module": "pandas",
    "title": "Imputar nulos con la mediana",
    "difficulty": 2,
    "concepts": [
      "fillna",
      "median",
      "imputacion"
    ],
    "session": 6,
    "tag": "missing",
    "estimatedMinutes": 6,
    "dataset": "pacientes.csv",
    "theory_md": "### Imputación de Valores Faltantes\nLa mediana es más robusta que la media ante la presencia de valores extremos:\n```python\nmediana_edad = df[\"edad\"].median()\ndf[\"edad_imputada\"] = df[\"edad\"].fillna(mediana_edad)\n```",
    "prompt_md": "Dado el DataFrame `df_pac`:\n1. Calcula la mediana de la columna `\"edad\"`.\n2. Crea una copia del DataFrame y en ella crea una nueva columna llamada `\"edad_imputada\"` donde los valores faltantes de `\"edad\"` se hayan rellenado con dicha mediana.\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Imputa la edad con la mediana en result\nresult = None\n",
    "solution_code": "result = df_pac.copy()\nmediana = result[\"edad\"].median()\nresult[\"edad_imputada\"] = result[\"edad\"].fillna(mediana)",
    "tests": [
      {
        "name": "result contiene la columna edad_imputada sin nulos",
        "check": "'edad_imputada' in result.columns and result['edad_imputada'].isna().sum() == 0",
        "hint": "edad_imputada no debe contener ningún nulo."
      },
      {
        "name": "Longitud total conservada (100 filas)",
        "check": "len(result) == len(df_pac)",
        "hint": "No debes eliminar filas, solo rellenar."
      }
    ],
    "hints": [
      "Calcula `mediana = df_pac['edad'].median()`.",
      "Asigna `result['edad_imputada'] = result['edad'].fillna(mediana)`."
    ]
  },
  {
    "id": "pd-12",
    "module": "pandas",
    "title": "Limpiar y convertir salarios con moneda: 'C$' y comas",
    "difficulty": 2,
    "concepts": [
      "str.replace",
      "to_numeric",
      "limpieza de strings"
    ],
    "session": 6,
    "tag": "strings",
    "estimatedMinutes": 7,
    "dataset": "pacientes.csv",
    "theory_md": "### Limpieza de Cadenas de Texto con .str\nEl accesor `.str` permite aplicar transformaciones vectorizadas a texto:\n```python\ndf[\"monto_limpio\"] = (\n    df[\"monto\"]\n    .astype(str)\n    .str.replace(\"C$\", \"\", regex=False)\n    .str.replace(\",\", \"\", regex=False)\n    .str.strip()\n)\ndf[\"monto_num\"] = pd.to_numeric(df[\"monto_limpio\"], errors=\"coerce\")\n```",
    "prompt_md": "En el DataFrame `df_pac`, la columna `\"costo\"` contiene valores con comas (ej. `\"1,250.50\"`).\nLimpia la columna eliminando cualquier coma `\",\"` y espacios, y conviértela a tipo numérico (`float`) usando `pd.to_numeric`.\nGuarda en la variable `clean_costo` la Serie limpia resultante.\nAsigna a `result` el promedio del costo redondeado a 2 decimales: `round(clean_costo.mean(), 2)`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Limpia costo a float y calcula su promedio en result\nclean_costo = None\nresult = 0.0\n",
    "solution_code": "clean_costo = pd.to_numeric(\n    df_pac[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).str.strip(),\n    errors=\"coerce\"\n)\nresult = round(float(clean_costo.mean()), 2)",
    "tests": [
      {
        "name": "clean_costo es de tipo float",
        "check": "isinstance(clean_costo, pd.Series) and str(clean_costo.dtype).startswith('float')",
        "hint": "clean_costo debe ser una Serie de tipo float."
      },
      {
        "name": "Promedio del costo calculado correctamente",
        "check": "isinstance(result, float) and result > 1000.0 and result < 3000.0",
        "hint": "El costo promedio debe estar entre 1000 y 3000 córdobas."
      }
    ],
    "hints": [
      "Usa `df_pac['costo'].astype(str).str.replace(',', '', regex=False)`.",
      "Convierte con `pd.to_numeric(..., errors='coerce')`.",
      "Calcula `round(float(clean_costo.mean()), 2)`."
    ]
  },
  {
    "id": "pd-13",
    "module": "pandas",
    "title": "Conversión de fechas mixtas con pd.to_datetime",
    "difficulty": 3,
    "concepts": [
      "to_datetime",
      "format='mixed'",
      "fechas",
      "dt accessor"
    ],
    "session": 6,
    "tag": "dates",
    "estimatedMinutes": 7,
    "dataset": "pacientes.csv",
    "theory_md": "### Normalización de Fechas Heterogéneas\nCuando un archivo contiene fechas en múltiples formatos (ej: `2023-05-12` y `04/11/2022`), pandas 2.0+ incluye el argumento `format='mixed'`:\n```python\nfechas_dt = pd.to_datetime(df[\"fecha_raw\"], format=\"mixed\", dayfirst=True)\n```\nEl accesor `.dt` expone componentes: `.dt.year`, `.dt.month`, `.dt.day_name()`.",
    "prompt_md": "En `df_pac`, convierte la columna `\"fecha_consulta\"` a objetos datetime usando `pd.to_datetime(..., format=\"mixed\")`.\nCrea en el DataFrame una nueva columna llamada `\"mes_consulta\"` que contenga el número de mes (`1` a `12`) obtenido con `.dt.month`.\nGuarda en la variable `result` el conteo de consultas del mes con mayor frecuencia (entero).",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Convierte fechas, extrae el mes y calcula el valor en result\nresult = 0\n",
    "solution_code": "fechas = pd.to_datetime(df_pac[\"fecha_consulta\"], format=\"mixed\")\ndf_pac[\"mes_consulta\"] = fechas.dt.month\nresult = int(df_pac[\"mes_consulta\"].value_counts().max())",
    "tests": [
      {
        "name": "result es un número entero positivo",
        "check": "isinstance(result, int) and result > 0",
        "hint": "result debe ser la frecuencia máxima mensual."
      },
      {
        "name": "Columna mes_consulta creada correctamente",
        "check": "'mes_consulta' in df_pac.columns and df_pac['mes_consulta'].between(1, 12).all()",
        "hint": "Todos los meses deben estar entre 1 y 12."
      }
    ],
    "hints": [
      "Convierte con `pd.to_datetime(df_pac['fecha_consulta'], format='mixed')`.",
      "Extrae el mes con `.dt.month`.",
      "Usa `int(df_pac['mes_consulta'].value_counts().max())`."
    ]
  },
  {
    "id": "pd-14",
    "module": "pandas",
    "title": "Búsqueda y extracción de texto con .str.contains()",
    "difficulty": 2,
    "concepts": [
      "str.contains",
      "case=False",
      "na=False",
      "strings"
    ],
    "session": 6,
    "tag": "strings",
    "estimatedMinutes": 6,
    "dataset": "pacientes.csv",
    "theory_md": "### Filtrado por Subcadenas con .str.contains()\nPermite buscar palabras o patrones dentro de columnas de texto:\n```python\n# na=False evita que filas con nulos causen errores en el filtro\nmask = df[\"diagnostico\"].str.contains(\"respiratoria\", case=False, na=False)\npacientes_resp = df[mask]\n```",
    "prompt_md": "En `df_pac`, filtra todos los pacientes cuyo diagnóstico contenga la palabra `\"diabetes\"` (sin importar si está en mayúsculas o minúsculas).\nGuarda el DataFrame filtrado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra pacientes con diabetes en result\nresult = None\n",
    "solution_code": "result = df_pac[df_pac[\"diagnostico\"].str.contains(\"diabetes\", case=False, na=False)]",
    "tests": [
      {
        "name": "result es un DataFrame filtrado",
        "check": "isinstance(result, pd.DataFrame) and len(result) > 0",
        "hint": "result debe contener registros."
      },
      {
        "name": "Todos los diagnósticos en result contienen diabetes",
        "check": "result['diagnostico'].str.lower().str.contains('diabetes').all()",
        "hint": "Todos los diagnósticos deben contener la palabra diabetes."
      }
    ],
    "hints": [
      "Usa `df_pac['diagnostico'].str.contains('diabetes', case=False, na=False)`."
    ]
  },
  {
    "id": "pd-15",
    "module": "pandas",
    "title": "Construir feature de rangos de edad con pd.cut",
    "difficulty": 2,
    "concepts": [
      "pd.cut",
      "discretizacion",
      "bins",
      "feature engineering"
    ],
    "session": 6,
    "tag": "strings",
    "estimatedMinutes": 6,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Discretización con pd.cut\n`pd.cut()` segmenta valores numéricos en intervalos continuos asignando etiquetas:\n```python\nbins = [0, 18, 60, 100]\nlabels = [\"Menor\", \"Adulto\", \"Adulto Mayor\"]\ndf[\"grupo_edad\"] = pd.cut(df[\"edad\"], bins=bins, labels=labels)\n```",
    "prompt_md": "Dado el DataFrame de empleo `df_emp`, crea una nueva columna llamada `\"rango_edad\"` segmentando la variable `\"edad\"` en los siguientes intervalos:\n- `[18, 30]`: `\"18-30\"`\n- `(30, 50]`: `\"31-50\"`\n- `(50, 65]`: `\"51-65\"`\n(Usa `bins=[17, 30, 50, 65]` y `labels=[\"18-30\", \"31-50\", \"51-65\"]`).\nGuarda en la variable `result` el conteo de frecuencias de cada rango (`df_emp[\"rango_edad\"].value_counts()`).",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea la columna rango_edad y asigna value_counts a result\nresult = None\n",
    "solution_code": "df_emp[\"rango_edad\"] = pd.cut(\n    df_emp[\"edad\"],\n    bins=[17, 30, 50, 65],\n    labels=[\"18-30\", \"31-50\", \"51-65\"]\n)\nresult = df_emp[\"rango_edad\"].value_counts()",
    "tests": [
      {
        "name": "result es una Serie con las 3 categorías",
        "check": "isinstance(result, pd.Series) and len(result) == 3",
        "hint": "result debe contener las 3 categorías especificadas."
      },
      {
        "name": "Suma total de frecuencias es 120 (todas las filas de la encuesta)",
        "check": "result.sum() == 120",
        "hint": "La suma de las frecuencias debe ser 120."
      }
    ],
    "hints": [
      "Usa `pd.cut(df_emp['edad'], bins=[17, 30, 50, 65], labels=['18-30', '31-50', '51-65'])`.",
      "Asigna a `result = df_emp['rango_edad'].value_counts()`."
    ]
  },
  {
    "id": "pd-16",
    "module": "pandas",
    "title": "Creación de columnas condicionales con np.where",
    "difficulty": 2,
    "concepts": [
      "np.where",
      "assign",
      "creacion de columnas"
    ],
    "session": 6,
    "tag": "strings",
    "estimatedMinutes": 5,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Columnas Condicionales con np.where\nCombinar NumPy y pandas es la manera más idiomática y rápida de crear columnas binarias o condicionales:\n```python\ndf[\"salario_alto\"] = np.where(df[\"ingreso\"] > 25000, \"Alto\", \"Normal\")\n```",
    "prompt_md": "En `df_emp`, crea una nueva columna llamada `\"jornada\"` que valga:\n- `\"Completa\"` si `horas >= 40`.\n- `\"Parcial\"` si `horas < 40`.\nGuarda en la variable `result` la cantidad de trabajadores con `\"Completa\"` (entero).",
    "setup_code": "import pandas as pd\nimport numpy as np\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\nimport numpy as np\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea la columna jornada y cuenta 'Completa' en result\nresult = 0\n",
    "solution_code": "df_emp[\"jornada\"] = np.where(df_emp[\"horas\"] >= 40, \"Completa\", \"Parcial\")\nresult = int((df_emp[\"jornada\"] == \"Completa\").sum())",
    "tests": [
      {
        "name": "result es un número entero positivo",
        "check": "isinstance(result, int) and result > 0",
        "hint": "result debe ser un entero con el conteo de trabajadores de jornada completa."
      },
      {
        "name": "Valores válidos en la columna jornada",
        "check": "set(df_emp['jornada'].unique()) == {'Completa', 'Parcial'}",
        "hint": "La columna debe contener únicamente los valores 'Completa' y 'Parcial'."
      }
    ],
    "hints": [
      "Usa `np.where(df_emp['horas'] >= 40, 'Completa', 'Parcial')`.",
      "Calcula `int((df_emp['jornada'] == 'Completa').sum())`."
    ]
  },
  {
    "id": "pd-17",
    "module": "pandas",
    "title": "Groupby básico y Named Aggregations",
    "difficulty": 2,
    "concepts": [
      "groupby",
      "agg",
      "named aggregation"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 6,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Named Aggregations en Groupby\nLa sintaxis recomendada para evitar multiíndices en las columnas:\n```python\nresumen = df.groupby(\"sector\").agg(\n    ingreso_medio=(\"ingreso\", \"mean\"),\n    total_personas=(\"id\", \"count\")\n).reset_index()\n```",
    "prompt_md": "Dada la encuesta de empleo `df_emp`, calcula para cada sector económico:\n- `ingreso_promedio`: promedio de la columna `\"ingreso\"` (redondeado a 2 decimales).\n- `horas_maximas`: valor máximo de la columna `\"horas\"`.\nGuarda el DataFrame resultante con índice reiniciado (`.reset_index()`) en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Agrupa por sector con named aggregations en result\nresult = None\n",
    "solution_code": "result = df_emp.groupby(\"sector\").agg(\n    ingreso_promedio=(\"ingreso\", \"mean\"),\n    horas_maximas=(\"horas\", \"max\")\n).round(2).reset_index()",
    "tests": [
      {
        "name": "result es un DataFrame con las columnas solicitadas",
        "check": "isinstance(result, pd.DataFrame) and set(result.columns) == {'sector', 'ingreso_promedio', 'horas_maximas'}",
        "hint": "Las columnas deben ser 'sector', 'ingreso_promedio' y 'horas_maximas'."
      },
      {
        "name": "Existen todos los sectores económicos",
        "check": "len(result) == df_emp['sector'].nunique()",
        "hint": "Debe haber una fila por cada sector único."
      }
    ],
    "hints": [
      "Usa `df_emp.groupby('sector').agg(ingreso_promedio=('ingreso', 'mean'), horas_maximas=('horas', 'max')).round(2).reset_index()`."
    ]
  },
  {
    "id": "pd-18",
    "module": "pandas",
    "title": "Diferencia entre .size() y .count() en Groupby",
    "difficulty": 2,
    "concepts": [
      "size vs count",
      "nulos en groupby",
      "agregacion"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 6,
    "dataset": "pacientes.csv",
    "theory_md": "### size() vs count()\n- `.size()`: Cuenta el **número total de filas** del grupo (incluyendo nulos).\n- `.count()`: Cuenta únicamente las filas con **valores no nulos** (`notna()`) en cada columna.\n```python\ndf.groupby(\"grupo\")[\"edad\"].count() # Ignora nulos\ndf.groupby(\"grupo\").size()           # Cuenta todas las filas\n```",
    "prompt_md": "En `df_pac`, calcula por cada municipio dos métricas sobre los pacientes:\n1. El total absoluto de consultas (`total_filas`) usando `.size()`.\n2. El total de pacientes con edad registrada (`edades_validas`) usando el conteo de la columna `\"edad\"`.\nGuarda el DataFrame resultante en la variable `result` (con `.reset_index()`).",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Agrupa por municipio y calcula size y count de edad en result\nresult = None\n",
    "solution_code": "result = df_pac.groupby(\"municipio\").agg(\n    total_filas=(\"id\", \"size\"),\n    edades_validas=(\"edad\", \"count\")\n).reset_index()",
    "tests": [
      {
        "name": "result contiene total_filas y edades_validas",
        "check": "isinstance(result, pd.DataFrame) and 'total_filas' in result.columns and 'edades_validas' in result.columns",
        "hint": "Debe incluir las columnas total_filas y edades_validas."
      },
      {
        "name": "total_filas es mayor o igual a edades_validas",
        "check": "(result['total_filas'] >= result['edades_validas']).all()",
        "hint": "total_filas cuenta nulos, por lo que siempre debe ser >= edades_validas."
      }
    ],
    "hints": [
      "Usa `df_pac.groupby('municipio').agg(total_filas=('id', 'size'), edades_validas=('edad', 'count')).reset_index()`."
    ]
  },
  {
    "id": "pd-19",
    "module": "pandas",
    "title": "Filtrar grupos completos con .filter()",
    "difficulty": 3,
    "concepts": [
      "groupby filter",
      "filtrado de grupos"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 7,
    "dataset": "ventas_tienda.csv",
    "theory_md": "### El método groupby.filter()\nPermite conservar o descartar grupos enteros basándose en una condición agregada sobre el grupo:\n```python\n# Conservar solo tiendas con más de 30 transacciones\ndf_grandes = df.groupby(\"tienda\").filter(lambda g: len(g) > 30)\n```",
    "prompt_md": "Dado el registro de ventas `df_ventas`, utiliza `.groupby(\"tienda\").filter(...)` para filtrar y conservar únicamente aquellas tiendas cuya facturación total acumulada (`sum(unidades * precio)`) sea **estrictamente mayor a 50,000**.\nGuarda el DataFrame filtrado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")\ndf_ventas[\"facturacion\"] = df_ventas[\"unidades\"] * df_ventas[\"precio\"]",
    "starter_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")\ndf_ventas[\"facturacion\"] = df_ventas[\"unidades\"] * df_ventas[\"precio\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra tiendas con facturación acumulada > 50000 en result\nresult = None\n",
    "solution_code": "result = df_ventas.groupby(\"tienda\").filter(lambda g: g[\"facturacion\"].sum() > 50000)",
    "tests": [
      {
        "name": "result es un DataFrame",
        "check": "isinstance(result, pd.DataFrame)",
        "hint": "result debe ser un DataFrame."
      },
      {
        "name": "Cada tienda presente en result factura más de 50000",
        "check": "(result.groupby('tienda')['facturacion'].sum() > 50000).all()",
        "hint": "Todas las tiendas resultantes deben superar 50000 de facturación."
      }
    ],
    "hints": [
      "Usa `df_ventas.groupby('tienda').filter(lambda g: g['facturacion'].sum() > 50000)`."
    ]
  },
  {
    "id": "pd-20",
    "module": "pandas",
    "title": "Imputar nulos con la mediana DE SU PROPIO GRUPO con .transform()",
    "difficulty": 3,
    "concepts": [
      "transform",
      "imputacion por grupo",
      "groupby"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 8,
    "dataset": "pacientes.csv",
    "theory_md": "### Groupby con transform()\nA diferencia de `.agg()` (que reduce el grupo a una sola fila), `.transform()` devuelve una Serie con la **misma longitud y alineación** que el DataFrame original:\n```python\nmediana_grupo = df.groupby(\"sexo\")[\"edad\"].transform(\"median\")\ndf[\"edad_imputada\"] = df[\"edad\"].fillna(mediana_grupo)\n```",
    "prompt_md": "En `df_pac`, imputa los valores faltantes de la columna `\"edad\"` utilizando la **mediana de la edad del municipio al que pertenece cada paciente**. Si un municipio tuviera todos sus valores nulos, rellena con la mediana global.\nGuarda en la variable `result` la Serie de edad imputada sin ningún valor nulo.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Imputa edad con la mediana por municipio en result\nresult = None\n",
    "solution_code": "mediana_por_mun = df_pac.groupby(\"municipio\")[\"edad\"].transform(\"median\")\nmediana_global = df_pac[\"edad\"].median()\nresult = df_pac[\"edad\"].fillna(mediana_por_mun).fillna(mediana_global)",
    "tests": [
      {
        "name": "result no contiene nulos",
        "check": "isinstance(result, pd.Series) and result.isna().sum() == 0",
        "hint": "La Serie result no debe tener ningún NaN."
      },
      {
        "name": "Conserva la misma longitud (100 elementos)",
        "check": "len(result) == len(df_pac)",
        "hint": "Debe tener 100 filas."
      }
    ],
    "hints": [
      "Calcula `df_pac.groupby('municipio')['edad'].transform('median')`.",
      "Usa `.fillna()` pasando esa Serie generada."
    ]
  },
  {
    "id": "pd-21",
    "module": "pandas",
    "title": "Top-N por grupo con .nlargest()",
    "difficulty": 3,
    "concepts": [
      "nlargest",
      "top-n",
      "groupby"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 7,
    "dataset": "ventas_tienda.csv",
    "theory_md": "### Top-N por grupo\nPara obtener las N observaciones con mayores valores dentro de cada categoría:\n```python\ntop2 = df.groupby(\"categoria\", group_keys=False).apply(lambda g: g.nlargest(2, \"precio\"))\n```",
    "prompt_md": "En `df_ventas`, encuentra las **2 transacciones con mayor cantidad de unidades vendidas** para cada categoría de producto.\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")",
    "starter_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Encuentra las 2 mayores transacciones por categoría en result\nresult = None\n",
    "solution_code": "result = df_ventas.groupby(\"categoria\", group_keys=False).apply(lambda g: g.nlargest(2, \"unidades\"))",
    "tests": [
      {
        "name": "result contiene 2 filas por cada categoría (10 filas en total para 5 categorías)",
        "check": "isinstance(result, pd.DataFrame) and len(result) == df_ventas['categoria'].nunique() * 2",
        "hint": "Esperaba 2 observaciones por categoría."
      }
    ],
    "hints": [
      "Usa `df_ventas.groupby('categoria', group_keys=False).apply(lambda g: g.nlargest(2, 'unidades'))`."
    ]
  },
  {
    "id": "pd-22",
    "module": "pandas",
    "title": "Cálculo de brecha salarial por sexo con groupby",
    "difficulty": 2,
    "concepts": [
      "groupby",
      "brecha",
      "agregacion"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 6,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Comparación entre Grupos\nPodemos comparar métricas entre subpoblaciones indexando directamente la Serie resultante de un groupby:\n```python\nmedias = df.groupby(\"grupo\")[\"valor\"].mean()\ndiferencia = medias[\"A\"] - medias[\"B\"]\n```",
    "prompt_md": "En la encuesta de empleo `df_emp`, filtra únicamente a las personas ocupadas (`ocupado == 1`).\nCalcula el ingreso promedio de los hombres (`\"M\"`) y de las mujeres (`\"F\"`).\nGuarda en la variable `result` la diferencia absoluta (`abs(promedio_M - promedio_F)`) redondeada a 2 decimales.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula la diferencia de ingresos promedio entre sexos en result\nresult = 0.0\n",
    "solution_code": "ocupados = df_emp[df_emp[\"ocupado\"] == 1]\npromedios = ocupados.groupby(\"sexo\")[\"ingreso\"].mean()\nresult = round(float(abs(promedios[\"M\"] - promedios[\"F\"])), 2)",
    "tests": [
      {
        "name": "result es un float positivo",
        "check": "isinstance(result, float) and result >= 0.0",
        "hint": "result debe ser un float mayor o igual a 0."
      }
    ],
    "hints": [
      "Filtra `df_emp[df_emp['ocupado'] == 1]`.",
      "Agrupa: `.groupby('sexo')['ingreso'].mean()`.",
      "Calcula `round(float(abs(promedios['M'] - promedios['F'])), 2)`."
    ]
  },
  {
    "id": "pd-23",
    "module": "pandas",
    "title": "Matriz de Agregaciones Múltiples por Columna",
    "difficulty": 3,
    "concepts": [
      "agg dict",
      "agregaciones especificas"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 7,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Diccionario de Agregaciones en .agg()\nPodemos especificar agregaciones distintas para cada columna pasando un diccionario:\n```python\nresumen = df.groupby(\"sector\").agg({\n    \"ingreso\": [\"mean\", \"median\"],\n    \"horas\": \"max\",\n    \"id\": \"count\"\n})\n```",
    "prompt_md": "En `df_emp`, agrupa por `\"sector\"` y calcula:\n- `\"ingreso\"`: la media (`\"mean\"`).\n- `\"horas\"`: la mediana (`\"median\"`).\n- `\"edad\"`: el valor mínimo (`\"min\"`) y máximo (`\"max\"`).\nGuarda el resultado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Aplica el diccionario de agregaciones en result\nresult = None\n",
    "solution_code": "result = df_emp.groupby(\"sector\").agg({\n    \"ingreso\": \"mean\",\n    \"horas\": \"median\",\n    \"edad\": [\"min\", \"max\"]\n})",
    "tests": [
      {
        "name": "result es un DataFrame agrupado por sector",
        "check": "isinstance(result, pd.DataFrame) and len(result) == df_emp['sector'].nunique()",
        "hint": "result debe tener una fila por sector."
      }
    ],
    "hints": [
      "Pasa el diccionario exacto a `.agg({'ingreso': 'mean', 'horas': 'median', 'edad': ['min', 'max']})`."
    ]
  },
  {
    "id": "pd-24",
    "module": "pandas",
    "title": "Tasa por 1,000 habitantes combinando groupby y municipios",
    "difficulty": 3,
    "concepts": [
      "groupby",
      "merge",
      "tasas per capita",
      "feature engineering"
    ],
    "session": 7,
    "tag": "groupby",
    "estimatedMinutes": 8,
    "dataset": "pacientes.csv",
    "theory_md": "### Cálculo de Tasas Per Cápita\nPara calcular la tasa de incidencia de un evento por cada 1,000 habitantes:\n[\text{tasa} = \frac{\text{número de casos}}{\text{población total}} \times 1000]\nRequiere agrupar los casos y cruzar con la población maestro.",
    "prompt_md": "Calcula la cantidad de consultas médicas por municipio en `df_pac`.\nLuego, une ese conteo con la tabla `df_mun` (por la columna `\"municipio\"`).\nCalcula la nueva columna `\"tasa_por_mil\"` como:\n`(consultas / poblacion) * 1000` redondeado a 2 decimales.\nGuarda el DataFrame con las columnas `[\"municipio\", \"consultas\", \"poblacion\", \"tasa_por_mil\"]` ordenado de mayor a menor tasa en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula consultas por municipio, une y calcula tasa en result\nresult = None\n",
    "solution_code": "conteo = df_pac.groupby(\"municipio\").size().reset_index(name=\"consultas\")\nunido = pd.merge(conteo, df_mun[[\"municipio\", \"poblacion\"]], on=\"municipio\", how=\"inner\")\nunido[\"tasa_por_mil\"] = ((unido[\"consultas\"] / unido[\"poblacion\"]) * 1000).round(2)\nresult = unido[[\"municipio\", \"consultas\", \"poblacion\", \"tasa_por_mil\"]].sort_values(by=\"tasa_por_mil\", ascending=False)",
    "tests": [
      {
        "name": "result contiene las columnas especificadas",
        "check": "list(result.columns) == ['municipio', 'consultas', 'poblacion', 'tasa_por_mil']",
        "hint": "Las columnas deben ser exactamente municipio, consultas, poblacion, tasa_por_mil."
      },
      {
        "name": "Orden descendente por tasa verificado",
        "check": "result.iloc[0]['tasa_por_mil'] >= result.iloc[-1]['tasa_por_mil']",
        "hint": "El DataFrame debe estar ordenado de mayor a menor tasa_por_mil."
      }
    ],
    "hints": [
      "Agrupa con `df_pac.groupby('municipio').size().reset_index(name='consultas')`.",
      "Haz `pd.merge(...)` con `df_mun[['municipio', 'poblacion']]`.",
      "Calcula `(unido['consultas'] / unido['poblacion']) * 1000`."
    ]
  },
  {
    "id": "pd-25",
    "module": "pandas",
    "title": "Inner Join vs Left Join con pd.merge",
    "difficulty": 2,
    "concepts": [
      "merge",
      "inner join",
      "left join"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 6,
    "dataset": "municipios.csv",
    "theory_md": "### Joins en pandas\n- `how='inner'`: Conserva únicamente registros cuyas claves existan en **ambas** tablas.\n- `how='left'`: Conserva **todas** las filas de la tabla izquierda, rellenando con NaN las columnas de la derecha si no hubo match.\n```python\npd.merge(df_izq, df_der, on=\"clave\", how=\"left\")\n```",
    "prompt_md": "Dado el DataFrame de sucursales `df_sucursales` y el catálogo de municipios `df_mun`:\nRealiza un **Left Join** conservando todas las sucursales y agregando la información de su departamento y población.\nGuarda el resultado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_sucursales = pd.DataFrame({\n    \"sucursal_id\": [\"S1\", \"S2\", \"S3\", \"S4\"],\n    \"municipio\": [\"Managua\", \"León\", \"Tipitapa\", \"Granada\"],\n    \"empleados\": [15, 8, 5, 6]\n})",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_sucursales = pd.DataFrame({\n    \"sucursal_id\": [\"S1\", \"S2\", \"S3\", \"S4\"],\n    \"municipio\": [\"Managua\", \"León\", \"Tipitapa\", \"Granada\"],\n    \"empleados\": [15, 8, 5, 6]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza el left join en result\nresult = None\n",
    "solution_code": "result = pd.merge(df_sucursales, df_mun, on=\"municipio\", how=\"left\")",
    "tests": [
      {
        "name": "result conserva las 4 sucursales originales",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 4",
        "hint": "Un left join debe conservar todas las filas de df_sucursales (4)."
      },
      {
        "name": "Tipitapa tiene NaN en departamento porque no está en df_mun",
        "check": "pd.isna(result.loc[result['municipio'] == 'Tipitapa', 'departamento'].iloc[0])",
        "hint": "Tipitapa no figura en el catálogo maestro de municipios, por lo que debe quedar en NaN."
      }
    ],
    "hints": [
      "Usa `pd.merge(df_sucursales, df_mun, on='municipio', how='left')`."
    ]
  },
  {
    "id": "pd-26",
    "module": "pandas",
    "title": "Anti-Join: Detectar filas sin coincidencia con indicator=True",
    "difficulty": 3,
    "concepts": [
      "anti-join",
      "indicator",
      "merge",
      "integridad"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 7,
    "dataset": "pacientes.csv",
    "theory_md": "### Anti-Joins en pandas\nUn anti-join detecta registros huérfanos (filas de A que no tienen pareja en B).\nEl argumento `indicator=True` agrega una columna especial `_merge` con valores:\n- `\"both\"`: Clave presente en ambas tablas.\n- `\"left_only\"`: Clave presente solo en la tabla izquierda (los huérfanos).\n- `\"right_only\"`: Clave presente solo en la derecha.\n```python\nm = pd.merge(A, B, on=\"id\", how=\"left\", indicator=True)\nhuerfanos = m[m[\"_merge\"] == \"left_only\"]\n```",
    "prompt_md": "Encuentra todos los pacientes en `df_pac` cuyo `\"municipio\"` **no figure** en el catálogo oficial de `df_mun`.\nUtiliza un merge con `how=\"left\"` e `indicator=True`.\nGuarda en la variable `result` el DataFrame con los pacientes huérfanos (filtrados con `_merge == \"left_only\"`).",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza el anti-join y filtra los huérfanos en result\nresult = None\n",
    "solution_code": "merged = pd.merge(df_pac, df_mun[[\"municipio\"]], on=\"municipio\", how=\"left\", indicator=True)\nresult = merged[merged[\"_merge\"] == \"left_only\"]",
    "tests": [
      {
        "name": "result contiene únicamente registros huérfanos (ej. Tipitapa)",
        "check": "isinstance(result, pd.DataFrame) and (result['_merge'] == 'left_only').all()",
        "hint": "Todos los registros de result deben tener _merge == 'left_only'."
      },
      {
        "name": "Se detectaron pacientes huérfanos",
        "check": "len(result) > 0",
        "hint": "El dataset de pacientes contiene pacientes de Tipitapa que no están en municipios.csv."
      }
    ],
    "hints": [
      "Usa `pd.merge(df_pac, df_mun[['municipio']], on='municipio', how='left', indicator=True)`.",
      "Filtra `merged[merged['_merge'] == 'left_only']`."
    ]
  },
  {
    "id": "pd-27",
    "module": "pandas",
    "title": "Validación de unicidad de clave con validate='1:m'",
    "difficulty": 3,
    "concepts": [
      "validate",
      "integridad de llaves",
      "merge"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 6,
    "dataset": "municipios.csv",
    "theory_md": "### El argumento validate en merge\nEn ciencia de datos, duplicados inadvertidos en la tabla dimensional provocan explosión cartesiana de filas al hacer un join.\nEl parámetro `validate` verifica la relación esperada:\n- `\"one_to_many\"` o `\"1:m\"`: Verifica que la clave en la tabla izquierda sea única.\n- `\"many_to_one\"` o `\"m:1\"`: Verifica que la clave en la tabla derecha sea única.\nSi no se cumple, pandas lanza `MergeError`.",
    "prompt_md": "Verifica si la tabla `df_mun` tiene valores únicos en la columna `\"municipio\"`.\nPara ello, realiza un merge de `df_ventas` con `df_mun` validando que la relación sea de muchos a uno (`validate=\"many_to_one\"` o `\"m:1\"`) sobre la columna `\"municipio\"`.\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_ventas = pd.DataFrame({\n    \"transaccion_id\": [101, 102, 103],\n    \"municipio\": [\"Managua\", \"León\", \"Managua\"],\n    \"total\": [450, 120, 800]\n})",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_ventas = pd.DataFrame({\n    \"transaccion_id\": [101, 102, 103],\n    \"municipio\": [\"Managua\", \"León\", \"Managua\"],\n    \"total\": [450, 120, 800]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza el merge validado m:1 en result\nresult = None\n",
    "solution_code": "result = pd.merge(df_ventas, df_mun, on=\"municipio\", how=\"inner\", validate=\"m:1\")",
    "tests": [
      {
        "name": "result contiene las 3 transacciones unidas con éxito",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 3",
        "hint": "El merge validado debe completarse con 3 filas."
      },
      {
        "name": "Contiene columnas de ambas tablas",
        "check": "'departamento' in result.columns and 'total' in result.columns",
        "hint": "Debe incluir columnas de ambas tablas."
      }
    ],
    "hints": [
      "Usa `pd.merge(df_ventas, df_mun, on='municipio', how='inner', validate='m:1')`."
    ]
  },
  {
    "id": "pd-28",
    "module": "pandas",
    "title": "Manejo de sufijos en columnas homónimas (suffixes)",
    "difficulty": 2,
    "concepts": [
      "suffixes",
      "merge",
      "homonimas"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### El parámetro suffixes en pd.merge\nCuando ambas tablas comparten nombres de columnas que no forman parte de la clave de join, pandas agrega sufijos por defecto `_x` y `_y`.\nEs buena práctica definir sufijos explícitos y legibles:\n```python\npd.merge(A, B, on=\"id\", suffixes=(\"_actual\", \"_historico\"))\n```",
    "prompt_md": "Une `evaluaciones_2022` y `evaluaciones_2023` por la columna `\"empleado_id\"` usando `how=\"inner\"`.\nDefine sufijos explícitos: `(\"_2022\", \"_2023\")` para distinguir la columna `\"puntaje\"`.\nGuarda el resultado en la variable `result`.",
    "setup_code": "import pandas as pd\nevaluaciones_2022 = pd.DataFrame({\n    \"empleado_id\": [\"E1\", \"E2\", \"E3\"],\n    \"puntaje\": [80, 85, 90]\n})\nevaluaciones_2023 = pd.DataFrame({\n    \"empleado_id\": [\"E1\", \"E2\", \"E3\"],\n    \"puntaje\": [88, 85, 95]\n})",
    "starter_code": "import pandas as pd\nevaluaciones_2022 = pd.DataFrame({\n    \"empleado_id\": [\"E1\", \"E2\", \"E3\"],\n    \"puntaje\": [80, 85, 90]\n})\nevaluaciones_2023 = pd.DataFrame({\n    \"empleado_id\": [\"E1\", \"E2\", \"E3\"],\n    \"puntaje\": [88, 85, 95]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza el merge con suffixes explícitos en result\nresult = None\n",
    "solution_code": "result = pd.merge(evaluaciones_2022, evaluaciones_2023, on=\"empleado_id\", suffixes=(\"_2022\", \"_2023\"))",
    "tests": [
      {
        "name": "Columnas renombradas con los sufijos exactos",
        "check": "'puntaje_2022' in result.columns and 'puntaje_2023' in result.columns",
        "hint": "Deben existir las columnas puntaje_2022 y puntaje_2023."
      },
      {
        "name": "3 empleados conservados",
        "check": "len(result) == 3",
        "hint": "Esperaba 3 filas."
      }
    ],
    "hints": [
      "Pasa `suffixes=('_2022', '_2023')` al invocar `pd.merge()`."
    ]
  },
  {
    "id": "pd-29",
    "module": "pandas",
    "title": "Concatenación vertical con pd.concat y ignore_index",
    "difficulty": 2,
    "concepts": [
      "concat",
      "axis=0",
      "ignore_index"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Concatenación de DataFrames\n`pd.concat([df1, df2], axis=0, ignore_index=True)` apila verticalmente DataFrames con las mismas columnas.\n`ignore_index=True` regenera un índice continuo `0, 1, ..., N-1` para evitar duplicados en el índice.",
    "prompt_md": "Dadas las tablas de ventas semestrales `ventas_sem1` y `ventas_sem2`, únelas verticalmente en un solo DataFrame con un índice continuo reiniciado.\nGuarda el DataFrame unificado en la variable `result`.",
    "setup_code": "import pandas as pd\nventas_sem1 = pd.DataFrame({\n    \"mes\": [\"Ene\", \"Feb\", \"Mar\"],\n    \"monto\": [12000, 14500, 16000]\n})\nventas_sem2 = pd.DataFrame({\n    \"mes\": [\"Jul\", \"Ago\", \"Sep\"],\n    \"monto\": [18000, 17500, 21000]\n})",
    "starter_code": "import pandas as pd\nventas_sem1 = pd.DataFrame({\n    \"mes\": [\"Ene\", \"Feb\", \"Mar\"],\n    \"monto\": [12000, 14500, 16000]\n})\nventas_sem2 = pd.DataFrame({\n    \"mes\": [\"Jul\", \"Ago\", \"Sep\"],\n    \"monto\": [18000, 17500, 21000]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Concatena verticalmente con ignore_index=True en result\nresult = None\n",
    "solution_code": "result = pd.concat([ventas_sem1, ventas_sem2], axis=0, ignore_index=True)",
    "tests": [
      {
        "name": "result contiene 6 filas",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 6",
        "hint": "El resultado debe contener 6 filas."
      },
      {
        "name": "Índice continuo de 0 a 5",
        "check": "list(result.index) == list(range(6))",
        "hint": "El índice debe ir de 0 a 5 gracias a ignore_index=True."
      }
    ],
    "hints": [
      "Usa `pd.concat([ventas_sem1, ventas_sem2], ignore_index=True)`."
    ]
  },
  {
    "id": "pd-30",
    "module": "pandas",
    "title": "Detección y eliminación de duplicados de clave",
    "difficulty": 2,
    "concepts": [
      "duplicated",
      "drop_duplicates",
      "subset",
      "keep"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Detección y Remoción de Duplicados\n- `df.duplicated(subset=['id'], keep='first')`: Retorna máscara booleana con `True` en las apariciones repetidas.\n- `df.drop_duplicates(subset=['id'], keep='last')`: Elimina filas duplicadas conservando la última aparición.",
    "prompt_md": "Dado el DataFrame de actualizaciones de clientes `df_clientes_log`, donde un mismo `\"id\"` aparece varias veces con datos modificados:\nConserva únicamente el registro más reciente de cada cliente (usando `keep=\"last\"` sobre la columna `\"id\"`).\nGuarda el DataFrame limpio en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_clientes_log = pd.DataFrame({\n    \"id\": [101, 102, 101, 103, 102, 101],\n    \"email\": [\"old@a.com\", \"b@b.com\", \"mod@a.com\", \"c@c.com\", \"new_b@b.com\", \"latest@a.com\"],\n    \"version\": [1, 1, 2, 1, 2, 3]\n})",
    "starter_code": "import pandas as pd\ndf_clientes_log = pd.DataFrame({\n    \"id\": [101, 102, 101, 103, 102, 101],\n    \"email\": [\"old@a.com\", \"b@b.com\", \"mod@a.com\", \"c@c.com\", \"new_b@b.com\", \"latest@a.com\"],\n    \"version\": [1, 1, 2, 1, 2, 3]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Elimina duplicados conservando el último registro en result\nresult = None\n",
    "solution_code": "result = df_clientes_log.drop_duplicates(subset=[\"id\"], keep=\"last\")",
    "tests": [
      {
        "name": "result contiene exactamente 3 clientes únicos",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 3",
        "hint": "Debe haber una sola fila para 101, 102 y 103."
      },
      {
        "name": "Conserva la versión más reciente",
        "check": "result.loc[result['id'] == 101, 'email'].iloc[0] == 'latest@a.com'",
        "hint": "El cliente 101 debe tener el email 'latest@a.com'."
      }
    ],
    "hints": [
      "Usa `df_clientes_log.drop_duplicates(subset=['id'], keep='last')`."
    ]
  },
  {
    "id": "pd-31",
    "module": "pandas",
    "title": "Merge asof (Join aproximado por fecha u orden)",
    "difficulty": 3,
    "concepts": [
      "merge_asof",
      "series de tiempo",
      "joins aproximados"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Merge Asof (Alineación Temporal Más Cercana)\n`pd.merge_asof()` une dos DataFrames por una columna ordenada (típicamente tiempo), buscando la fila con el valor más cercano anterior o igual (`direction='backward'`):\n```python\npd.merge_asof(transacciones, tasas_cambio, on=\"fecha\", direction=\"backward\")\n```",
    "prompt_md": "Dadas las transacciones `df_tx` y la tabla de cotizaciones `df_tasas` (ambas ordenadas por `\"segundo\"`):\nRealiza un `pd.merge_asof` para asignarle a cada transacción la última tasa disponible en ese momento o antes.\nGuarda el resultado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_tx = pd.DataFrame({\n    \"segundo\": [2, 5, 8, 15],\n    \"monto_dolares\": [100, 50, 200, 30]\n})\ndf_tasas = pd.DataFrame({\n    \"segundo\": [0, 4, 10],\n    \"tasa\": [36.50, 36.55, 36.60]\n})",
    "starter_code": "import pandas as pd\ndf_tx = pd.DataFrame({\n    \"segundo\": [2, 5, 8, 15],\n    \"monto_dolares\": [100, 50, 200, 30]\n})\ndf_tasas = pd.DataFrame({\n    \"segundo\": [0, 4, 10],\n    \"tasa\": [36.50, 36.55, 36.60]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza merge_asof en result\nresult = None\n",
    "solution_code": "result = pd.merge_asof(df_tx, df_tasas, on=\"segundo\", direction=\"backward\")",
    "tests": [
      {
        "name": "result contiene las 4 transacciones con sus tasas asignadas",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 4 and 'tasa' in result.columns",
        "hint": "Debe contener 4 filas y la columna tasa."
      },
      {
        "name": "Tasas asignadas correctamente según el tiempo",
        "check": "result.loc[result['segundo'] == 2, 'tasa'].iloc[0] == 36.50 and result.loc[result['segundo'] == 5, 'tasa'].iloc[0] == 36.55",
        "hint": "En el segundo 2 la última tasa era 36.50; en el segundo 5 ya era 36.55."
      }
    ],
    "hints": [
      "Usa `pd.merge_asof(df_tx, df_tasas, on='segundo', direction='backward')`."
    ]
  },
  {
    "id": "pd-32",
    "module": "pandas",
    "title": "Join de tablas con nombres de clave distintos (left_on y right_on)",
    "difficulty": 2,
    "concepts": [
      "left_on",
      "right_on",
      "merge"
    ],
    "session": 8,
    "tag": "join",
    "estimatedMinutes": 6,
    "dataset": "municipios.csv",
    "theory_md": "### Claves con Distinto Nombre\nCuando las tablas tienen nombres diferentes para la misma entidad (ej: `\"ciudad_residencia\"` en una y `\"municipio\"` en otra):\n```python\npd.merge(A, B, left_on=\"ciudad_residencia\", right_on=\"municipio\")\n```",
    "prompt_md": "Une `df_usuarios` con `df_mun` haciendo coincidir la columna `\"ciudad_origen\"` con la columna `\"municipio\"`.\nLuego, elimina la columna redundante `\"municipio\"` del DataFrame final.\nGuarda el resultado en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_usuarios = pd.DataFrame({\n    \"user_id\": [1, 2, 3],\n    \"nombre\": [\"Claudia\", \"Gabriel\", \"Patricia\"],\n    \"ciudad_origen\": [\"Managua\", \"León\", \"Matagalpa\"]\n})",
    "starter_code": "import pandas as pd\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_usuarios = pd.DataFrame({\n    \"user_id\": [1, 2, 3],\n    \"nombre\": [\"Claudia\", \"Gabriel\", \"Patricia\"],\n    \"ciudad_origen\": [\"Managua\", \"León\", \"Matagalpa\"]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Realiza el merge con left_on y right_on y quita 'municipio' en result\nresult = None\n",
    "solution_code": "result = pd.merge(df_usuarios, df_mun, left_on=\"ciudad_origen\", right_on=\"municipio\", how=\"inner\").drop(columns=[\"municipio\"])",
    "tests": [
      {
        "name": "result contiene 3 usuarios",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 3",
        "hint": "Debe tener 3 filas."
      },
      {
        "name": "Columna 'ciudad_origen' conservada y 'municipio' eliminada",
        "check": "'ciudad_origen' in result.columns and 'municipio' not in result.columns",
        "hint": "ciudad_origen debe estar presente y municipio eliminada."
      }
    ],
    "hints": [
      "Usa `pd.merge(df_usuarios, df_mun, left_on='ciudad_origen', right_on='municipio')`.",
      "Aplica `.drop(columns=['municipio'])`."
    ]
  },
  {
    "id": "pd-33",
    "module": "pandas",
    "title": "Pivot Table: De formato largo a matriz resumen",
    "difficulty": 2,
    "concepts": [
      "pivot_table",
      "reshape",
      "agregacion"
    ],
    "session": 9,
    "tag": "reshape",
    "estimatedMinutes": 7,
    "dataset": "ventas_tienda.csv",
    "theory_md": "### Tablas Dinámicas con pivot_table()\n`pivot_table` remodela datos agregando valores:\n- `index`: Variables que formarán las filas.\n- `columns`: Variable que formará las columnas.\n- `values`: Variable numérica a resumir.\n- `aggfunc`: Función de agregación (`\"sum\"`, `\"mean\"`, etc.).\n```python\ntabla = df.pivot_table(index=\"tienda\", columns=\"categoria\", values=\"unidades\", aggfunc=\"sum\", fill_value=0)\n```",
    "prompt_md": "En `df_ventas`, construye una tabla pivote que muestre el **total de unidades vendidas** (`aggfunc=\"sum\"`), colocando las `\"tiendas\"` en las filas (`index`) y las `\"categorias\"` en las columnas (`columns`). Rellena los valores faltantes con `0` (`fill_value=0`).\nGuarda la tabla pivote resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")",
    "starter_code": "import pandas as pd\ndf_ventas = pd.read_csv(\"/data/ventas_tienda.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Construye la tabla pivote en result\nresult = None\n",
    "solution_code": "result = df_ventas.pivot_table(\n    index=\"tienda\",\n    columns=\"categoria\",\n    values=\"unidades\",\n    aggfunc=\"sum\",\n    fill_value=0\n)",
    "tests": [
      {
        "name": "result es un DataFrame pivote",
        "check": "isinstance(result, pd.DataFrame)",
        "hint": "result debe ser un DataFrame."
      },
      {
        "name": "Filas son tiendas y columnas categorías",
        "check": "len(result.index) == df_ventas['tienda'].nunique() and len(result.columns) == df_ventas['categoria'].nunique()",
        "hint": "Las filas deben coincidir con las tiendas y las columnas con las categorías."
      }
    ],
    "hints": [
      "Usa `df_ventas.pivot_table(index='tienda', columns='categoria', values='unidades', aggfunc='sum', fill_value=0)`."
    ]
  },
  {
    "id": "pd-34",
    "module": "pandas",
    "title": "Melt: De formato ancho a formato largo (Tidy Data)",
    "difficulty": 2,
    "concepts": [
      "melt",
      "tidy data",
      "despivotar",
      "reshape"
    ],
    "session": 9,
    "tag": "reshape",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Despivotar con pd.melt()\nTransforma columnas anchas (ej. meses o años) en filas de un formato ordenado (tidy data):\n```python\ndf_largo = pd.melt(\n    df_ancho,\n    id_vars=[\"producto\"],\n    value_vars=[\"Ene\", \"Feb\", \"Mar\"],\n    var_name=\"mes\",\n    value_name=\"ventas\"\n)\n```",
    "prompt_md": "Dado el DataFrame en formato ancho `df_reporte_ancho`:\nUsa `pd.melt` para transformarlo a formato largo, manteniendo `\"sucursal\"` como identificador (`id_vars`), agrupando los trimestres `[\"Q1\", \"Q2\", \"Q3\"]` en una columna llamada `\"trimestre\"` (`var_name`) y los montos en una columna llamada `\"facturacion\"` (`value_name`).\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_reporte_ancho = pd.DataFrame({\n    \"sucursal\": [\"Central\", \"Norte\", \"Sur\"],\n    \"Q1\": [1000, 850, 920],\n    \"Q2\": [1150, 900, 980],\n    \"Q3\": [1300, 950, 1050]\n})",
    "starter_code": "import pandas as pd\ndf_reporte_ancho = pd.DataFrame({\n    \"sucursal\": [\"Central\", \"Norte\", \"Sur\"],\n    \"Q1\": [1000, 850, 920],\n    \"Q2\": [1150, 900, 980],\n    \"Q3\": [1300, 950, 1050]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Aplica pd.melt en result\nresult = None\n",
    "solution_code": "result = pd.melt(\n    df_reporte_ancho,\n    id_vars=[\"sucursal\"],\n    value_vars=[\"Q1\", \"Q2\", \"Q3\"],\n    var_name=\"trimestre\",\n    value_name=\"facturacion\"\n)",
    "tests": [
      {
        "name": "result contiene 9 filas (3 sucursales x 3 trimestres)",
        "check": "isinstance(result, pd.DataFrame) and len(result) == 9",
        "hint": "El formato largo debe tener 9 filas."
      },
      {
        "name": "Columnas nombradas exactamente sucursal, trimestre, facturacion",
        "check": "list(result.columns) == ['sucursal', 'trimestre', 'facturacion']",
        "hint": "Las columnas deben ser sucursal, trimestre, facturacion."
      }
    ],
    "hints": [
      "Usa `pd.melt(df_reporte_ancho, id_vars=['sucursal'], value_vars=['Q1', 'Q2', 'Q3'], var_name='trimestre', value_name='facturacion')`."
    ]
  },
  {
    "id": "pd-35",
    "module": "pandas",
    "title": "Tablas de contingencia con pd.crosstab",
    "difficulty": 2,
    "concepts": [
      "crosstab",
      "contingencia",
      "frecuencias cruzadas"
    ],
    "session": 9,
    "tag": "reshape",
    "estimatedMinutes": 6,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Tablas de Contingencia\n`pd.crosstab(index, columns, normalize=...)` calcula frecuencias conjuntas de dos variables categóricas.\nEl parámetro `normalize=\"index\"` calcula porcentajes relativos por fila:\n```python\nct = pd.crosstab(df[\"sexo\"], df[\"ocupado\"], normalize=\"index\") * 100\n```",
    "prompt_md": "En la encuesta de empleo `df_emp`, calcula la tabla de contingencia entre `\"sexo\"` (filas) y `\"ocupado\"` (columnas), normalizada por filas (`normalize=\"index\"`) y multiplicada por 100 para expresar porcentajes. Redondea a 1 decimal.\nGuarda la tabla de porcentajes resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera la tabla con pd.crosstab en result\nresult = None\n",
    "solution_code": "result = (pd.crosstab(df_emp[\"sexo\"], df_emp[\"ocupado\"], normalize=\"index\") * 100).round(1)",
    "tests": [
      {
        "name": "result es un DataFrame de 2 filas por 2 columnas",
        "check": "isinstance(result, pd.DataFrame) and result.shape == (2, 2)",
        "hint": "Debe ser una tabla 2x2 (F y M vs 0 y 1)."
      },
      {
        "name": "Cada fila suma aproximadamente 100%",
        "check": "np.allclose(result.sum(axis=1), np.array([100.0, 100.0]), atol=0.2)",
        "hint": "La normalización por filas debe sumar 100% en cada sexo."
      }
    ],
    "hints": [
      "Usa `(pd.crosstab(df_emp['sexo'], df_emp['ocupado'], normalize='index') * 100).round(1)`."
    ]
  },
  {
    "id": "pd-36",
    "module": "pandas",
    "title": "Series de tiempo light: Desplazamientos con .shift()",
    "difficulty": 2,
    "concepts": [
      "shift",
      "series temporales",
      "lags"
    ],
    "session": 9,
    "tag": "dates",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Desplazamiento de Filas con .shift()\n`.shift(1)` desplaza los datos una posición hacia adelante, creando la variable rezagada (lag) del periodo anterior:\n```python\ndf[\"precio_ayer\"] = df[\"precio\"].shift(1)\n```",
    "prompt_md": "Dada la serie de precios diarios de combustible `df_precios`:\nCrea una nueva columna llamada `\"precio_anterior\"` desplazada 1 día hacia adelante con `.shift(1)`.\nLuego, calcula la variación absoluta en córdobas en la columna `\"variacion\"` como `precio - precio_anterior`.\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_precios = pd.DataFrame({\n    \"dia\": [1, 2, 3, 4, 5],\n    \"precio\": [42.50, 42.50, 43.10, 43.80, 43.20]\n})",
    "starter_code": "import pandas as pd\ndf_precios = pd.DataFrame({\n    \"dia\": [1, 2, 3, 4, 5],\n    \"precio\": [42.50, 42.50, 43.10, 43.80, 43.20]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea precio_anterior y variacion en result\nresult = None\n",
    "solution_code": "result = df_precios.copy()\nresult[\"precio_anterior\"] = result[\"precio\"].shift(1)\nresult[\"variacion\"] = (result[\"precio\"] - result[\"precio_anterior\"]).round(2)",
    "tests": [
      {
        "name": "result contiene las columnas precio_anterior y variacion",
        "check": "isinstance(result, pd.DataFrame) and 'precio_anterior' in result.columns and 'variacion' in result.columns",
        "hint": "Deben existir las columnas precio_anterior y variacion."
      },
      {
        "name": "Primera fila de variacion es NaN (no hay día previo)",
        "check": "pd.isna(result['variacion'].iloc[0])",
        "hint": "La primera fila de variacion debe ser NaN."
      },
      {
        "name": "Variación correcta del día 3",
        "check": "abs(result['variacion'].iloc[2] - 0.60) < 1e-3",
        "hint": "El día 3 subió de 42.50 a 43.10 (+0.60)."
      }
    ],
    "hints": [
      "Usa `result['precio_anterior'] = result['precio'].shift(1)`.",
      "Calcula `result['variacion'] = result['precio'] - result['precio_anterior']`."
    ]
  },
  {
    "id": "pd-37",
    "module": "pandas",
    "title": "Crecimiento porcentual con .pct_change()",
    "difficulty": 2,
    "concepts": [
      "pct_change",
      "crecimiento",
      "porcentajes"
    ],
    "session": 9,
    "tag": "dates",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Variación Porcentual\n`.pct_change()` calcula automáticamente el cambio porcentual respecto al registro anterior:\n[\text{pct} = \frac{x_t - x_{t-1}}{x_{t-1}}]\n```python\ndf[\"crecimiento_pct\"] = (df[\"ventas\"].pct_change() * 100).round(2)\n```",
    "prompt_md": "Dado el historial de ingresos mensuales `df_ingresos`, calcula en una nueva columna `\"crecimiento_pct\"` la tasa de crecimiento porcentual mensual (multiplicada por 100 y redondeada a 2 decimales).\nGuarda el DataFrame resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_ingresos = pd.DataFrame({\n    \"mes\": [\"Ene\", \"Feb\", \"Mar\", \"Abr\", \"May\"],\n    \"ingreso\": [10000.0, 12000.0, 11400.0, 14250.0, 15000.0]\n})",
    "starter_code": "import pandas as pd\ndf_ingresos = pd.DataFrame({\n    \"mes\": [\"Ene\", \"Feb\", \"Mar\", \"Abr\", \"May\"],\n    \"ingreso\": [10000.0, 12000.0, 11400.0, 14250.0, 15000.0]\n})\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula crecimiento_pct en result\nresult = None\n",
    "solution_code": "result = df_ingresos.copy()\nresult[\"crecimiento_pct\"] = (result[\"ingreso\"].pct_change() * 100).round(2)",
    "tests": [
      {
        "name": "Columna crecimiento_pct calculada",
        "check": "'crecimiento_pct' in result.columns and len(result) == 5",
        "hint": "Debe existir la columna crecimiento_pct."
      },
      {
        "name": "Crecimiento exacto de febrero (+20.0%)",
        "check": "abs(result['crecimiento_pct'].iloc[1] - 20.0) < 1e-2",
        "hint": "De 10,000 a 12,000 el crecimiento es exactamente 20.0%."
      }
    ],
    "hints": [
      "Usa `(result['ingreso'].pct_change() * 100).round(2)`."
    ]
  },
  {
    "id": "pd-38",
    "module": "pandas",
    "title": "Detección de outliers con el Rango Intercuartílico (IQR)",
    "difficulty": 3,
    "concepts": [
      "iqr",
      "outliers",
      "boxplot",
      "quantile"
    ],
    "session": 9,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Regla del IQR para Outliers\nEl rango intercuartílico (IQR = Q_3 - Q_1).\nUn valor se considera outlier severo si:\n[x < Q_1 - 1.5 \times IQR quad \text{o} quad x > Q_3 + 1.5 \times IQR]\n```python\nq1 = s.quantile(0.25)\nq3 = s.quantile(0.75)\niqr = q3 - q1\noutliers = s[(s < q1 - 1.5*iqr) | (s > q3 + 1.5*iqr)]\n```",
    "prompt_md": "En `df_emp`, filtra únicamente a los trabajadores ocupados con ingreso positivo (`ingreso > 0`).\nCalcula el límite superior de outliers para la variable `\"ingreso\"` utilizando la regla (Q_3 + 1.5 \times IQR).\nFiltra en la variable `result` todos los registros correspondientes a trabajadores cuyos ingresos sean **estrictamente mayores** a dicho límite superior.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Identifica y filtra los outliers de ingreso en result\nresult = None\n",
    "solution_code": "ocupados = df_emp[df_emp[\"ingreso\"] > 0]\ning = ocupados[\"ingreso\"]\nq1 = ing.quantile(0.25)\nq3 = ing.quantile(0.75)\niqr = q3 - q1\nlimite_sup = q3 + 1.5 * iqr\nresult = ocupados[ocupados[\"ingreso\"] > limite_sup]",
    "tests": [
      {
        "name": "result es un DataFrame",
        "check": "isinstance(result, pd.DataFrame)",
        "hint": "result debe ser un DataFrame."
      },
      {
        "name": "Todos los ingresos en result superan el umbral IQR",
        "check": "len(result) >= 0",
        "hint": "Se ejecutó el filtro correctamente."
      }
    ],
    "hints": [
      "Calcula `q1 = ing.quantile(0.25)` y `q3 = ing.quantile(0.75)`.",
      "Calcula `iqr = q3 - q1` y `limite_sup = q3 + 1.5 * iqr`.",
      "Filtra `ocupados[ocupados['ingreso'] > limite_sup]`."
    ]
  },
  {
    "id": "pd-39",
    "module": "pandas",
    "title": "Encadenamiento de métodos legible (Method Chaining)",
    "difficulty": 2,
    "concepts": [
      "method chaining",
      "pipe",
      "codigo limpio"
    ],
    "session": 9,
    "tag": "performance",
    "estimatedMinutes": 6,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Method Chaining en pandas\nEncadenar operaciones entre paréntesis produce pipelines de transformación limpios y sin variables intermedias desechables:\n```python\nresumen = (\n    df\n    .query(\"ocupado == 1\")\n    .assign(ingreso_usd=lambda d: d[\"ingreso\"] / 36.5)\n    .groupby(\"sector\")[\"ingreso_usd\"]\n    .mean()\n    .round(2)\n)\n```",
    "prompt_md": "Aplica un pipeline encadenado sobre `df_emp` para:\n1. Filtrar los ocupados (`ocupado == 1`).\n2. Agrupar por `\"anio\"`.\n3. Calcular la media de `\"horas\"` redondeada a 1 decimal.\nGuarda la Serie resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Escribe el pipeline encadenado en result\nresult = None\n",
    "solution_code": "result = (\n    df_emp\n    .loc[df_emp[\"ocupado\"] == 1]\n    .groupby(\"anio\")[\"horas\"]\n    .mean()\n    .round(1)\n)",
    "tests": [
      {
        "name": "result es una Serie indexada por anio",
        "check": "isinstance(result, pd.Series) and set(result.index) == {2022, 2023}",
        "hint": "El índice debe tener los años 2022 y 2023."
      }
    ],
    "hints": [
      "Usa `(df_emp.loc[df_emp['ocupado'] == 1].groupby('anio')['horas'].mean().round(1))`."
    ]
  },
  {
    "id": "pd-40",
    "module": "pandas",
    "title": "Análisis de cohortes por año de encuesta",
    "difficulty": 2,
    "concepts": [
      "cohortes",
      "comparacion temporal",
      "groupby"
    ],
    "session": 9,
    "tag": "groupby",
    "estimatedMinutes": 7,
    "dataset": "encuesta_empleo.csv",
    "theory_md": "### Comparación entre Cohortes Temporales\nAl agrupar por año y sector, comparamos la evolución temporal de los indicadores clave:\n```python\ntasa_ocupacion = df.groupby([\"anio\", \"sector\"])[\"ocupado\"].mean()\n```",
    "prompt_md": "En `df_emp`, calcula la tasa de ocupación (promedio de la variable `\"ocupado\"` multiplicado por 100 y redondeado a 1 decimal) para cada `\"anio\"`.\nGuarda la Serie resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")",
    "starter_code": "import pandas as pd\ndf_emp = pd.read_csv(\"/data/encuesta_empleo.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula la tasa de ocupación por año en result\nresult = None\n",
    "solution_code": "result = (df_emp.groupby(\"anio\")[\"ocupado\"].mean() * 100).round(1)",
    "tests": [
      {
        "name": "result contiene 2022 y 2023",
        "check": "isinstance(result, pd.Series) and len(result) == 2",
        "hint": "Debe contener una tasa por año."
      },
      {
        "name": "Tasas calculadas entre 50% y 90%",
        "check": "(result >= 50.0).all() and (result <= 90.0).all()",
        "hint": "Las tasas deben estar en un rango razonable."
      }
    ],
    "hints": [
      "Usa `(df_emp.groupby('anio')['ocupado'].mean() * 100).round(1)`."
    ]
  },
  {
    "id": "pd-41",
    "module": "pandas",
    "title": "Capstone 1: Pipeline completo de limpieza de pacientes",
    "difficulty": 3,
    "concepts": [
      "limpieza integral",
      "pipeline",
      "to_numeric",
      "to_datetime"
    ],
    "session": 10,
    "tag": "missing",
    "estimatedMinutes": 8,
    "dataset": "pacientes.csv",
    "theory_md": "### Pipelines de Limpieza en Producción\nEn un caso real, la limpieza de un dataset involucra:\n1. Parsear fechas heterogéneas.\n2. Limpiar símbolos monetarios y comas.\n3. Imputar o remover nulos según criterios de negocio.\n4. Estandarizar strings.",
    "prompt_md": "Crea una copia de `df_pac` y aplica el siguiente pipeline de saneamiento:\n1. Convierte `\"costo\"` a float limpiando comas: `df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)`.\n2. Convierte `\"fecha_consulta\"` a datetime con `pd.to_datetime(..., format=\"mixed\")`.\n3. Imputa los nulos de `\"edad\"` con la mediana de `edad`.\n4. Rellena los nulos de `\"seguro\"` con la etiqueta `\"No Especificado\"`.\nGuarda el DataFrame completamente limpio en la variable `clean_df`, y en `result` el número de nulos totales restantes en todo el DataFrame (`int(clean_df.isna().sum().sum())`).",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Construye clean_df y asigna total de nulos en result\nclean_df = None\nresult = -1\n",
    "solution_code": "clean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"fecha_consulta\"] = pd.to_datetime(clean_df[\"fecha_consulta\"], format=\"mixed\")\nclean_df[\"edad\"] = clean_df[\"edad\"].fillna(clean_df[\"edad\"].median())\nclean_df[\"seguro\"] = clean_df[\"seguro\"].fillna(\"No Especificado\")\nresult = int(clean_df.isna().sum().sum())",
    "tests": [
      {
        "name": "result es 0 (cero nulos restantes)",
        "check": "result == 0",
        "hint": "No debe quedar ningún valor nulo en clean_df."
      },
      {
        "name": "Tipos de datos correctos en clean_df",
        "check": "str(clean_df['costo'].dtype).startswith('float') and 'datetime64' in str(clean_df['fecha_consulta'].dtype)",
        "hint": "costo debe ser float y fecha_consulta datetime."
      }
    ],
    "hints": [
      "Aplica cada paso sobre una copia `clean_df = df_pac.copy()`.",
      "Calcula `result = int(clean_df.isna().sum().sum())`."
    ]
  },
  {
    "id": "pd-42",
    "module": "pandas",
    "title": "Capstone 2: Enriquecimiento con datos demográficos (Join)",
    "difficulty": 3,
    "concepts": [
      "merge",
      "enriquecimiento",
      "demografia"
    ],
    "session": 10,
    "tag": "join",
    "estimatedMinutes": 7,
    "dataset": "pacientes.csv",
    "theory_md": "### Enriquecimiento de Datos Clínicos\nAl unir los datos de consultas limpias con el maestro de municipios podemos segmentar el costo y la demanda según la zona (urbana/rural) y el departamento.",
    "prompt_md": "Dado el DataFrame de pacientes limpios `clean_df` (previamente preparado) y el catálogo de municipios `df_mun`:\nRealiza un **Inner Join** por la columna `\"municipio\"`.\nGuarda el DataFrame enriquecido en la variable `df_enriquecido`.\nEn la variable `result` guarda el gasto total acumulado en córdobas de los pacientes pertenecientes a municipios de la zona `\"rural\"` (redondeado a 2 decimales).",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"fecha_consulta\"] = pd.to_datetime(clean_df[\"fecha_consulta\"], format=\"mixed\")\nclean_df[\"edad\"] = clean_df[\"edad\"].fillna(clean_df[\"edad\"].median())\nclean_df[\"seguro\"] = clean_df[\"seguro\"].fillna(\"No Especificado\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"fecha_consulta\"] = pd.to_datetime(clean_df[\"fecha_consulta\"], format=\"mixed\")\nclean_df[\"edad\"] = clean_df[\"edad\"].fillna(clean_df[\"edad\"].median())\nclean_df[\"seguro\"] = clean_df[\"seguro\"].fillna(\"No Especificado\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Une con df_mun y calcula el costo rural en result\ndf_enriquecido = None\nresult = 0.0\n",
    "solution_code": "df_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")\nresult = round(float(df_enriquecido.loc[df_enriquecido[\"zona\"] == \"rural\", \"costo\"].sum()), 2)",
    "tests": [
      {
        "name": "df_enriquecido contiene columnas de ambas tablas",
        "check": "'departamento' in df_enriquecido.columns and 'costo' in df_enriquecido.columns",
        "hint": "df_enriquecido debe incluir columnas de ambas tablas."
      },
      {
        "name": "result es un float positivo con el total de gasto rural",
        "check": "isinstance(result, float) and result > 0.0",
        "hint": "El costo total de la zona rural debe ser mayor a 0."
      }
    ],
    "hints": [
      "Usa `pd.merge(clean_df, df_mun, on='municipio', how='inner')`.",
      "Filtra `df_enriquecido.loc[df_enriquecido['zona'] == 'rural', 'costo'].sum()`."
    ]
  },
  {
    "id": "pd-43",
    "module": "pandas",
    "title": "Capstone 3: Matriz de Costo Promedio por Diagnóstico y Zona",
    "difficulty": 3,
    "concepts": [
      "pivot_table",
      "analisis multidimensional",
      "capstone"
    ],
    "session": 10,
    "tag": "reshape",
    "estimatedMinutes": 7,
    "dataset": "pacientes.csv",
    "theory_md": "### Tabulación Cruzada de Costos\nPermite analizar la dispersión del gasto médico según la geografía y la condición clínica del paciente.",
    "prompt_md": "A partir de `df_enriquecido`, genera una tabla pivote (`pivot_table`) que presente:\n- Filas: `\"diagnostico\"`\n- Columnas: `\"zona\"` (`rural` y `urbana`)\n- Valores: promedio de `\"costo\"` (`aggfunc=\"mean\"`)\n- Relleno de nulos con `0.0` (`fill_value=0.0`)\n- Redondeo a 2 decimales.\nGuarda la tabla pivote resultante en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"fecha_consulta\"] = pd.to_datetime(clean_df[\"fecha_consulta\"], format=\"mixed\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"fecha_consulta\"] = pd.to_datetime(clean_df[\"fecha_consulta\"], format=\"mixed\")\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera la tabla pivote de costo medio en result\nresult = None\n",
    "solution_code": "result = df_enriquecido.pivot_table(\n    index=\"diagnostico\",\n    columns=\"zona\",\n    values=\"costo\",\n    aggfunc=\"mean\",\n    fill_value=0.0\n).round(2)",
    "tests": [
      {
        "name": "result es un DataFrame pivote con columnas de zona",
        "check": "isinstance(result, pd.DataFrame) and set(result.columns).issubset({'rural', 'urbana'})",
        "hint": "Las columnas deben ser 'rural' y 'urbana'."
      },
      {
        "name": "Valores positivos de costo",
        "check": "(result >= 0).all().all()",
        "hint": "Todos los costos promedio deben ser positivos."
      }
    ],
    "hints": [
      "Usa `df_enriquecido.pivot_table(index='diagnostico', columns='zona', values='costo', aggfunc='mean', fill_value=0.0).round(2)`."
    ]
  },
  {
    "id": "pd-44",
    "module": "pandas",
    "title": "Capstone 4: Pregunta de Negocio 1 - Diagnóstico más costoso per cápita",
    "difficulty": 3,
    "concepts": [
      "agregacion",
      "maximos",
      "pregunta de negocio"
    ],
    "session": 10,
    "tag": "groupby",
    "estimatedMinutes": 6,
    "dataset": "pacientes.csv",
    "theory_md": "### Responder Preguntas de Decisión\nEn Data Science, las transformaciones culminan en responder interrogantes directas de negocio.",
    "prompt_md": "A partir de `df_enriquecido`:\n¿Cuál es el diagnóstico con el **costo promedio más alto** por consulta?\nGuarda el nombre exacto de dicho diagnóstico (string) en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Identifica el diagnóstico con mayor costo medio en result\nresult = \"\"\n",
    "solution_code": "diag_costo = df_enriquecido.groupby(\"diagnostico\")[\"costo\"].mean()\nresult = str(diag_costo.idxmax())",
    "tests": [
      {
        "name": "result es un string con un diagnóstico existente",
        "check": "isinstance(result, str) and result in df_enriquecido['diagnostico'].unique()",
        "hint": "result debe ser un diagnóstico existente en los datos."
      }
    ],
    "hints": [
      "Agrupa: `df_enriquecido.groupby('diagnostico')['costo'].mean()`.",
      "Obtén el índice máximo con `.idxmax()`."
    ]
  },
  {
    "id": "pd-45",
    "module": "pandas",
    "title": "Capstone 5: Pregunta de Negocio 2 - Distribución por tipo de seguro",
    "difficulty": 2,
    "concepts": [
      "value_counts",
      "normalize",
      "frecuencias relativas"
    ],
    "session": 10,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "pacientes.csv",
    "theory_md": "### Distribuciones Porcentuales\n`value_counts(normalize=True) * 100` es la forma estándar de responder preguntas sobre proporciones de mercado.",
    "prompt_md": "En `clean_df`, calcula la distribución porcentual de los tipos de cobertura médica (`\"seguro\"`), multiplicada por 100 y redondeada a 1 decimal.\nGuarda la Serie en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"seguro\"] = clean_df[\"seguro\"].fillna(\"No Especificado\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"seguro\"] = clean_df[\"seguro\"].fillna(\"No Especificado\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula la distribución porcentual de seguro en result\nresult = None\n",
    "solution_code": "result = (clean_df[\"seguro\"].value_counts(normalize=True) * 100).round(1)",
    "tests": [
      {
        "name": "result es una Serie con porcentajes",
        "check": "isinstance(result, pd.Series) and abs(result.sum() - 100.0) < 1.0",
        "hint": "La suma de porcentajes debe rondar el 100%."
      }
    ],
    "hints": [
      "Usa `(clean_df['seguro'].value_counts(normalize=True) * 100).round(1)`."
    ]
  },
  {
    "id": "pd-46",
    "module": "pandas",
    "title": "Capstone 6: Pregunta de Negocio 3 - Departamento con mayor costo total",
    "difficulty": 2,
    "concepts": [
      "groupby",
      "idxmax",
      "agregacion"
    ],
    "session": 10,
    "tag": "groupby",
    "estimatedMinutes": 5,
    "dataset": "pacientes.csv",
    "theory_md": "### Identificación de Líderes por Agregación\nObtener el departamento con mayor gasto consolidado combinando groupby y sum.",
    "prompt_md": "En `df_enriquecido`, ¿qué departamento acumula el mayor gasto total en atención médica?\nGuarda el nombre del departamento (string) en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Encuentra el departamento con mayor gasto total en result\nresult = \"\"\n",
    "solution_code": "gasto_depto = df_enriquecido.groupby(\"departamento\")[\"costo\"].sum()\nresult = str(gasto_depto.idxmax())",
    "tests": [
      {
        "name": "result es un string con un departamento existente",
        "check": "isinstance(result, str) and result in df_enriquecido['departamento'].unique()",
        "hint": "result debe ser un departamento válido."
      }
    ],
    "hints": [
      "Usa `df_enriquecido.groupby('departamento')['costo'].sum().idxmax()`."
    ]
  },
  {
    "id": "pd-47",
    "module": "pandas",
    "title": "Capstone 7: Detección de Pacientes con Consultas Recurrentes",
    "difficulty": 2,
    "concepts": [
      "duplicated",
      "pacientes recurrentes",
      "conteo"
    ],
    "session": 10,
    "tag": "join",
    "estimatedMinutes": 5,
    "dataset": "pacientes.csv",
    "theory_md": "### Frecuencia de Visitas de Pacientes\nDeterminar si existen identificadores repetidos en registros transaccionales es crucial para estudios longitudinales.",
    "prompt_md": "En `df_pac`, calcula cuántos identificadores de paciente (`\"id\"`) son únicos.\nGuarda el número de pacientes únicos (entero) en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Cuenta los IDs únicos en result\nresult = 0\n",
    "solution_code": "result = int(df_pac[\"id\"].nunique())",
    "tests": [
      {
        "name": "result es un entero igual a 100",
        "check": "result == 100",
        "hint": "En este dataset los 100 pacientes tienen IDs distintos (PAC-001 a PAC-100)."
      }
    ],
    "hints": [
      "Usa `int(df_pac['id'].nunique())`."
    ]
  },
  {
    "id": "pd-48",
    "module": "pandas",
    "title": "Capstone 8: Reporte Ejecutivo Final de Salud",
    "difficulty": 3,
    "concepts": [
      "reporte ejecutivo",
      "dataframe final",
      "capstone"
    ],
    "session": 10,
    "tag": "groupby",
    "estimatedMinutes": 8,
    "dataset": "pacientes.csv",
    "theory_md": "### El Entregable Final de un Data Analyst\nSintetizar hallazgos en una tabla ejecutiva con nombres de métricas legibles para stakeholders.",
    "prompt_md": "A partir de `df_enriquecido`, genera un reporte por `\"departamento\"` con:\n- `total_consultas`: conteo de pacientes (`size`).\n- `gasto_total`: suma de costo (redondeada a 2 decimales).\n- `edad_promedio`: promedio de edad (redondeada a 1 decimal).\nOrdena el reporte de mayor a menor `gasto_total` y reinicia el índice.\nGuarda el DataFrame final en la variable `result`.",
    "setup_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"edad\"] = clean_df[\"edad\"].fillna(clean_df[\"edad\"].median())\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")",
    "starter_code": "import pandas as pd\ndf_pac = pd.read_csv(\"/data/pacientes.csv\")\nclean_df = df_pac.copy()\nclean_df[\"costo\"] = clean_df[\"costo\"].astype(str).str.replace(\",\", \"\", regex=False).astype(float)\nclean_df[\"edad\"] = clean_df[\"edad\"].fillna(clean_df[\"edad\"].median())\ndf_mun = pd.read_csv(\"/data/municipios.csv\")\ndf_enriquecido = pd.merge(clean_df, df_mun, on=\"municipio\", how=\"inner\")\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera el reporte ejecutivo final en result\nresult = None\n",
    "solution_code": "result = (\n    df_enriquecido\n    .groupby(\"departamento\")\n    .agg(\n        total_consultas=(\"id\", \"size\"),\n        gasto_total=(\"costo\", \"sum\"),\n        edad_promedio=(\"edad\", \"mean\")\n    )\n    .round({\"gasto_total\": 2, \"edad_promedio\": 1})\n    .sort_values(by=\"gasto_total\", ascending=False)\n    .reset_index()\n)",
    "tests": [
      {
        "name": "result contiene las columnas especificadas",
        "check": "isinstance(result, pd.DataFrame) and list(result.columns) == ['departamento', 'total_consultas', 'gasto_total', 'edad_promedio']",
        "hint": "Las columnas deben ser exactamente departamento, total_consultas, gasto_total, edad_promedio."
      },
      {
        "name": "Ordenado de mayor a menor gasto_total",
        "check": "result.iloc[0]['gasto_total'] >= result.iloc[-1]['gasto_total']",
        "hint": "Debe estar ordenado de mayor a menor gasto_total."
      }
    ],
    "hints": [
      "Usa `.groupby('departamento').agg(...)` con named aggregations.",
      "Redondea y ordena con `.sort_values(by='gasto_total', ascending=False).reset_index()`."
    ]
  }
];
