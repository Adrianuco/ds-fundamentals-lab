import { Exercise } from "../../types/exercise";

export const numpyExercises: Exercise[] = [
  {
    "id": "np-01",
    "module": "numpy",
    "title": "Creación de array, shape y dtype",
    "difficulty": 1,
    "concepts": [
      "np.array",
      "shape",
      "dtype",
      "ndim"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Fundamentos de ndarray\nUn `np.ndarray` es un contenedor contiguo en memoria de elementos del mismo tipo (`dtype`).\nA diferencia de una lista de Python, ofrece operaciones matemáticas a velocidad de C.\n```python\narr = np.array([1, 2, 3, 4], dtype=np.float32)\narr.shape # (4,) - Tupla con las dimensiones\narr.ndim  # 1    - Número de dimensiones\narr.dtype # dtype('float32')\n```",
    "prompt_md": "Dado el arreglo bidimensional de mediciones `datos_raw`, conviértelo a un arreglo de NumPy con tipo de dato `float64`.\nGuarda en la variable `arr` el arreglo creado, y en la variable `result` una tupla con `(arr.shape, arr.ndim, str(arr.dtype))`.",
    "setup_code": "import numpy as np\ndatos_raw = [[10, 20, 30], [40, 50, 60], [70, 80, 90], [100, 110, 120]]",
    "starter_code": "import numpy as np\ndatos_raw = [[10, 20, 30], [40, 50, 60], [70, 80, 90], [100, 110, 120]]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea arr como np.ndarray float64 y extrae sus metadatos en result\narr = None\nresult = None\n",
    "solution_code": "arr = np.array(datos_raw, dtype=np.float64)\nresult = (arr.shape, arr.ndim, str(arr.dtype))",
    "tests": [
      {
        "name": "arr es un ndarray de NumPy con dtype float64",
        "check": "isinstance(arr, np.ndarray) and arr.dtype == np.float64",
        "hint": "arr debe crearse con np.array(datos_raw, dtype=np.float64)."
      },
      {
        "name": "result contiene la tupla correcta de metadatos",
        "check": "result == ((4, 3), 2, 'float64')",
        "hint": "Esperaba ((4, 3), 2, 'float64')."
      }
    ],
    "hints": [
      "Pasa `dtype=np.float64` al invocar `np.array(datos_raw, ...)`.",
      "Usa `(arr.shape, arr.ndim, str(arr.dtype))` para la variable result."
    ]
  },
  {
    "id": "np-02",
    "module": "numpy",
    "title": "Generadores: arange vs linspace",
    "difficulty": 1,
    "concepts": [
      "np.arange",
      "np.linspace",
      "generadores"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Generación de secuencias numéricas\n- `np.arange(start, stop, step)`: Especifica el incremento (`step`). El extremo `stop` es exclusivo.\n- `np.linspace(start, stop, num)`: Especifica la cantidad exacta de puntos (`num`). El extremo `stop` es por defecto inclusivo.\n```python\na = np.arange(0, 10, 2)     # [0, 2, 4, 6, 8]\nb = np.linspace(0, 1, 5)    # [0.  , 0.25, 0.5 , 0.75, 1.  ]\n```",
    "prompt_md": "Genera en la variable `seq_arange` los números pares del 10 al 50 (inclusive el 50) usando `np.arange`.\nGenera en la variable `seq_linspace` un arreglo de 9 puntos equidistantes entre 0.0 y 2.0 (inclusive ambos) usando `np.linspace`.\nAsigna a `result = (seq_arange, seq_linspace)`.",
    "setup_code": "import numpy as np",
    "starter_code": "import numpy as np\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera ambas secuencias y agrúpalas en result\nseq_arange = None\nseq_linspace = None\nresult = None\n",
    "solution_code": "seq_arange = np.arange(10, 52, 2)\nseq_linspace = np.linspace(0.0, 2.0, 9)\nresult = (seq_arange, seq_linspace)",
    "tests": [
      {
        "name": "seq_arange incluye de 10 a 50 de 2 en 2",
        "check": "isinstance(seq_arange, np.ndarray) and seq_arange[0] == 10 and seq_arange[-1] == 50 and len(seq_arange) == 21",
        "hint": "seq_arange debe ir de 10 a 50 inclusive (21 elementos)."
      },
      {
        "name": "seq_linspace tiene 9 puntos de 0.0 a 2.0",
        "check": "isinstance(seq_linspace, np.ndarray) and len(seq_linspace) == 9 and np.allclose(seq_linspace, np.array([0., 0.25, 0.5, 0.75, 1., 1.25, 1.5, 1.75, 2.]))",
        "hint": "np.linspace(0.0, 2.0, 9) genera pasos de 0.25."
      }
    ],
    "hints": [
      "Para que `np.arange` incluya el 50 con paso 2, usa `stop=52`.",
      "Usa `np.linspace(0.0, 2.0, 9)`."
    ]
  },
  {
    "id": "np-03",
    "module": "numpy",
    "title": "Matrices especiales: zeros, ones, full, eye",
    "difficulty": 1,
    "concepts": [
      "np.zeros",
      "np.ones",
      "np.full",
      "np.eye"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Creación de Arreglos Especiales\nNumPy permite instanciar matrices de dimensiones dadas directamente:\n```python\nz = np.zeros((3, 4))       # Matriz 3x4 de ceros\no = np.ones((2, 3))        # Matriz 2x3 de unos\nf = np.full((2, 2), 7.5)   # Matriz 2x2 con valor 7.5\ni = np.eye(3)              # Matriz identidad 3x3\n```",
    "prompt_md": "Crea una matriz de tamaño 4x5 donde todos los valores sean `-1.0` (tipo float) usando `np.full`.\nLuego, modifica su diagonal principal para que tenga valores `1.0`.\nGuarda la matriz resultante en la variable `result`.",
    "setup_code": "import numpy as np",
    "starter_code": "import numpy as np\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea la matriz y asigna 1.0 en la diagonal\nresult = None\n",
    "solution_code": "result = np.full((4, 5), -1.0)\nnp.fill_diagonal(result, 1.0)",
    "tests": [
      {
        "name": "result tiene dimensiones (4, 5)",
        "check": "isinstance(result, np.ndarray) and result.shape == (4, 5)",
        "hint": "La matriz debe ser de 4 filas por 5 columnas."
      },
      {
        "name": "Diagonal principal es 1.0 y el resto -1.0",
        "check": "all(result[i, i] == 1.0 for i in range(4)) and result[0, 1] == -1.0 and result[3, 4] == -1.0",
        "hint": "Verifica que result[i, i] == 1.0 para i=0..3 y las demás posiciones sean -1.0."
      }
    ],
    "hints": [
      "Inicia con `result = np.full((4, 5), -1.0)`.",
      "Puedes usar `np.fill_diagonal(result, 1.0)` o un bucle `for i in range(4): result[i, i] = 1.0`."
    ]
  },
  {
    "id": "np-04",
    "module": "numpy",
    "title": "Slicing 2D: Filas, columnas y submatrices",
    "difficulty": 2,
    "concepts": [
      "slicing 2D",
      "indexado",
      "submatrices"
    ],
    "session": 3,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Slicing Bidimensional\nEn un arreglo 2D, indexamos como `arr[filas, columnas]`:\n```python\nM = np.arange(12).reshape(3, 4)\nfila_1 = M[1, :]       # Segunda fila completa\ncol_2 = M[:, 2]        # Tercera columna completa\nsub = M[0:2, 1:3]      # Filas 0 y 1, columnas 1 y 2\n```",
    "prompt_md": "Dada la matriz de 5x6 `matriz`, extrae en la variable `result` la submatriz central compuesta por:\n- Las filas con índice 1 a 3 (es decir, las filas 2, 3 y 4).\n- Las columnas con índice 2 a 4 (es decir, las columnas 3, 4 y 5).",
    "setup_code": "import numpy as np\nmatriz = np.arange(30).reshape(5, 6)",
    "starter_code": "import numpy as np\nmatriz = np.arange(30).reshape(5, 6)\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Extrae la submatriz central en result\nresult = None\n",
    "solution_code": "result = matriz[1:4, 2:5]",
    "tests": [
      {
        "name": "Dimensiones de la submatriz son (3, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (3, 3)",
        "hint": "La submatriz debe tener shape (3, 3)."
      },
      {
        "name": "Valores correctos de la submatriz",
        "check": "np.array_equal(result, np.array([[8, 9, 10], [14, 15, 16], [20, 21, 22]]))",
        "hint": "Esperaba [[8, 9, 10], [14, 15, 16], [20, 21, 22]]."
      }
    ],
    "hints": [
      "Para filas 1 a 3 inclusive, usa el slice `1:4`.",
      "Para columnas 2 a 4 inclusive, usa el slice `2:5`."
    ]
  },
  {
    "id": "np-05",
    "module": "numpy",
    "title": "Máscaras booleanas (Boolean Masking)",
    "difficulty": 2,
    "concepts": [
      "boolean mask",
      "filtrado",
      "condiciones logicas"
    ],
    "session": 3,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Filtrado con Máscaras Booleanas\nAl aplicar una comparación sobre un ndarray se genera un arreglo booleano de la misma forma.\nUsar esa máscara dentro de los corchetes `arr[mask]` filtra los elementos:\n```python\nv = np.array([10, -5, 20, 0, -2])\nmask = v > 0                 # [True, False, True, False, False]\npositivos = v[mask]          # [10, 20]\n```",
    "prompt_md": "Dado el arreglo de mediciones de glucosa en ayunas `glucosa`, extrae en la variable `result` todos los valores que representen hiperglucemia o riesgo elevado, definidos como valores **estrictamente mayores a 125.0 mg/dL**.",
    "setup_code": "import numpy as np\nglucosa = np.array([92.0, 134.5, 110.2, 145.0, 99.8, 126.0, 88.4, 180.2, 115.0])",
    "starter_code": "import numpy as np\nglucosa = np.array([92.0, 134.5, 110.2, 145.0, 99.8, 126.0, 88.4, 180.2, 115.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra los valores mayores a 125.0 en result\nresult = None\n",
    "solution_code": "result = glucosa[glucosa > 125.0]",
    "tests": [
      {
        "name": "result es un ndarray 1D",
        "check": "isinstance(result, np.ndarray) and result.ndim == 1",
        "hint": "result debe ser un arreglo 1D filtrado."
      },
      {
        "name": "Contenido filtrado correcto",
        "check": "np.allclose(np.sort(result), np.sort(np.array([134.5, 145.0, 126.0, 180.2])))",
        "hint": "Esperaba los valores: [134.5, 145.0, 126.0, 180.2]."
      }
    ],
    "hints": [
      "Genera la máscara con `glucosa > 125.0`.",
      "Indexa directamente: `result = glucosa[glucosa > 125.0]`."
    ]
  },
  {
    "id": "np-06",
    "module": "numpy",
    "title": "Operadores lógicos bitwise: & (AND), | (OR), ~ (NOT)",
    "difficulty": 2,
    "concepts": [
      "bitwise",
      "and logico",
      "mascaras compuestas"
    ],
    "session": 3,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Condiciones Compuestas en NumPy\nEn NumPy NO se pueden usar `and`, `or`, `not` de Python porque operan sobre el objeto entero.\nSe deben usar operadores bitwise elemento a elemento, **siempre entre paréntesis**:\n- `&`: AND lógico\n- `|`: OR lógico\n- `~`: NOT lógico (negación)\n```python\nmask = (x >= 10) & (x <= 20)\n```",
    "prompt_md": "Dado el arreglo `edades`, selecciona en la variable `result` todos los registros correspondientes a adultos jóvenes: edades **mayores o iguales a 20 Y estrictamente menores a 35**.",
    "setup_code": "import numpy as np\nedades = np.array([15, 20, 24, 35, 18, 30, 28, 42, 19, 33, 22])",
    "starter_code": "import numpy as np\nedades = np.array([15, 20, 24, 35, 18, 30, 28, 42, 19, 33, 22])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra edades entre 20 y < 35 en result\nresult = None\n",
    "solution_code": "result = edades[(edades >= 20) & (edades < 35)]",
    "tests": [
      {
        "name": "result contiene 6 elementos",
        "check": "isinstance(result, np.ndarray) and len(result) == 6",
        "hint": "Esperaba 6 elementos filtrados."
      },
      {
        "name": "Valores exactos filtrados",
        "check": "np.array_equal(result, np.array([20, 24, 30, 28, 33, 22]))",
        "hint": "Recuerda que 35 queda fuera (estrictamente menor)."
      }
    ],
    "hints": [
      "Usa `(edades >= 20) & (edades < 35)`.",
      "No olvides colocar cada condición individual entre paréntesis."
    ]
  },
  {
    "id": "np-07",
    "module": "numpy",
    "title": "Fancy Indexing (Indexado con listas de enteros)",
    "difficulty": 2,
    "concepts": [
      "fancy indexing",
      "seleccion de filas",
      "indices"
    ],
    "session": 3,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Fancy Indexing\nPermite seleccionar filas o elementos pasando un arreglo o lista de índices arbitrarios en el orden deseado:\n```python\narr = np.array([100, 200, 300, 400, 500])\nindices = [4, 0, 2]\nseleccion = arr[indices] # [500, 100, 300]\n```\nA diferencia de los slices, el fancy indexing siempre produce una **copia** en memoria.",
    "prompt_md": "Dada la matriz de características `X` (7 observaciones x 3 variables), selecciona en la variable `result` las filas con índices `[0, 3, 6]` en ese orden exacto.",
    "setup_code": "import numpy as np\nX = np.arange(21).reshape(7, 3)",
    "starter_code": "import numpy as np\nX = np.arange(21).reshape(7, 3)\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Selecciona las filas [0, 3, 6] en result\nresult = None\n",
    "solution_code": "result = X[[0, 3, 6]]",
    "tests": [
      {
        "name": "result tiene dimensiones (3, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (3, 3)",
        "hint": "La matriz resultante debe tener shape (3, 3)."
      },
      {
        "name": "Filas correctas seleccionadas",
        "check": "np.array_equal(result, np.array([[0, 1, 2], [9, 10, 11], [18, 19, 20]]))",
        "hint": "Verifica que seleccionaste las filas 0, 3 y 6."
      }
    ],
    "hints": [
      "Pasa una lista de enteros directamente en el eje de filas: `X[[0, 3, 6]]`."
    ]
  },
  {
    "id": "np-08",
    "module": "numpy",
    "title": "np.where: Selección condicional if-else vectorizada",
    "difficulty": 2,
    "concepts": [
      "np.where",
      "vectorizacion",
      "bifurcacion"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Selección vectorizada con np.where\n`np.where(condicion, valor_si_true, valor_si_false)` evalúa una condición vectorizada sin bucles:\n```python\nnotas = np.array([55, 80, 45, 95])\nestado = np.where(notas >= 60, \"Aprobado\", \"Reprobado\")\n```",
    "prompt_md": "Dado el arreglo de temperaturas en grados Celsius `temperaturas`, genera en la variable `result` un arreglo de texto donde cada valor sea:\n- `\"Calor\"` si la temperatura es mayor o igual a 30.0.\n- `\"Agradable\"` si es menor a 30.0.",
    "setup_code": "import numpy as np\ntemperaturas = np.array([28.5, 32.0, 29.8, 35.5, 22.0, 30.0, 31.2])",
    "starter_code": "import numpy as np\ntemperaturas = np.array([28.5, 32.0, 29.8, 35.5, 22.0, 30.0, 31.2])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Clasifica con np.where en result\nresult = None\n",
    "solution_code": "result = np.where(temperaturas >= 30.0, \"Calor\", \"Agradable\")",
    "tests": [
      {
        "name": "result tiene la misma longitud que temperaturas",
        "check": "isinstance(result, np.ndarray) and len(result) == 7",
        "hint": "result debe tener 7 elementos."
      },
      {
        "name": "Clasificación correcta",
        "check": "list(result) == ['Agradable', 'Calor', 'Agradable', 'Calor', 'Agradable', 'Calor', 'Calor']",
        "hint": "Revisa la condición >= 30.0."
      }
    ],
    "hints": [
      "Usa `np.where(temperaturas >= 30.0, 'Calor', 'Agradable')`."
    ]
  },
  {
    "id": "np-09",
    "module": "numpy",
    "title": "np.clip: Winsorizar y limitar valores extremos",
    "difficulty": 2,
    "concepts": [
      "np.clip",
      "outliers",
      "winsorizar",
      "limpieza"
    ],
    "session": 3,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Limitación de Outliers con np.clip\nEn preprocesamiento de datos, recortar valores que exceden un umbral mínimo o máximo (winsorización) evita que outliers distorsionen modelos:\n```python\nv = np.array([-10, 5, 20, 100])\nv_clipped = np.clip(v, a_min=0, a_max=50) # [0, 5, 20, 50]\n```",
    "prompt_md": "Dado el arreglo de horas de trabajo reportadas en una semana `horas_reportadas`, aplica `np.clip` para limitar los valores a un rango biológicamente y legalmente plausible: mínimo 0 horas y máximo 60 horas.\nGuarda el arreglo corregido en la variable `result`.",
    "setup_code": "import numpy as np\nhoras_reportadas = np.array([-5, 40, 48, 85, 30, 60, 72, 0, -2, 45])",
    "starter_code": "import numpy as np\nhoras_reportadas = np.array([-5, 40, 48, 85, 30, 60, 72, 0, -2, 45])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Limita las horas entre 0 y 60 con np.clip\nresult = None\n",
    "solution_code": "result = np.clip(horas_reportadas, 0, 60)",
    "tests": [
      {
        "name": "result contiene valores acotados entre 0 y 60",
        "check": "isinstance(result, np.ndarray) and (result >= 0).all() and (result <= 60).all()",
        "hint": "Ningún valor puede ser menor a 0 ni mayor a 60."
      },
      {
        "name": "Valores recortados correctos",
        "check": "np.array_equal(result, np.array([0, 40, 48, 60, 30, 60, 60, 0, 0, 45]))",
        "hint": "Esperaba [0, 40, 48, 60, 30, 60, 60, 0, 0, 45]."
      }
    ],
    "hints": [
      "Usa `np.clip(horas_reportadas, a_min=0, a_max=60)`."
    ]
  },
  {
    "id": "np-10",
    "module": "numpy",
    "title": "Reshape y Ravel: Reestructurar dimensiones",
    "difficulty": 2,
    "concepts": [
      "reshape",
      "ravel",
      "dimensiones"
    ],
    "session": 3,
    "tag": "reshape",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Reshape y el parámetro -1\n`arr.reshape(filas, columnas)` cambia la forma sin alterar los datos subyacentes.\nEl valor `-1` infiere automáticamente la dimensión faltante:\n```python\na = np.arange(12)\nm = a.reshape(3, -1) # Infiere 4 columnas (12 / 3 = 4)\nplano = m.ravel()    # Aplana de nuevo a 1D\n```",
    "prompt_md": "Dado el arreglo lineal `vector_lineal` de 24 elementos, reestructúralo en una matriz de 4 filas con el número de columnas calculado automáticamente (`-1`).\nLuego, guarda esa matriz 2D en la variable `matriz_2d`, y en `result` el resultado de aplanarla de vuelta a 1D usando `.ravel()`.",
    "setup_code": "import numpy as np\nvector_lineal = np.arange(24)",
    "starter_code": "import numpy as np\nvector_lineal = np.arange(24)\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea matriz_2d y luego result con ravel\nmatriz_2d = None\nresult = None\n",
    "solution_code": "matriz_2d = vector_lineal.reshape(4, -1)\nresult = matriz_2d.ravel()",
    "tests": [
      {
        "name": "matriz_2d tiene forma (4, 6)",
        "check": "isinstance(matriz_2d, np.ndarray) and matriz_2d.shape == (4, 6)",
        "hint": "matriz_2d debe tener 4 filas y 6 columnas."
      },
      {
        "name": "result es un arreglo 1D aplanado de 24 elementos",
        "check": "isinstance(result, np.ndarray) and result.shape == (24,) and np.array_equal(result, vector_lineal)",
        "hint": "result debe ser idéntico al vector lineal original."
      }
    ],
    "hints": [
      "Usa `vector_lineal.reshape(4, -1)`.",
      "Usa `matriz_2d.ravel()` para generar `result`."
    ]
  },
  {
    "id": "np-11",
    "module": "numpy",
    "title": "Vista vs Copia: arr.base y modificaciones accidentales",
    "difficulty": 3,
    "concepts": [
      "vistas",
      "copias",
      "arr.base",
      "mutabilidad"
    ],
    "session": 3,
    "tag": "performance",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Vistas vs Copias en NumPy\nUn slice básico (`arr[1:4]`) retorna una **vista**: comparte la misma memoria que el arreglo padre.\nSi modificas la vista, ¡el original cambia!\n```python\norig = np.array([1, 2, 3])\nvista = orig[:2]\nvista[0] = 99\n# orig ahora es [99, 2, 3]!\n# vista.base is orig  -> True\n```\nPara independizar datos, debemos invocar explícitamente `.copy()`.",
    "prompt_md": "Dado el arreglo original `datos_base`:\n1. Crea una copia independiente llamada `copia_segura` usando `.copy()`.\n2. Multiplica todos los elementos de `copia_segura` por 10.\n3. Comprueba que `datos_base` no haya cambiado.\nGuarda en la variable `result` una tupla con dos booleanos:\n`(copia_segura.base is None, np.array_equal(datos_base, np.array([10, 20, 30, 40])))`.",
    "setup_code": "import numpy as np\ndatos_base = np.array([10, 20, 30, 40])",
    "starter_code": "import numpy as np\ndatos_base = np.array([10, 20, 30, 40])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea la copia, multiplícala por 10 y arma result\ncopia_segura = None\nresult = None\n",
    "solution_code": "copia_segura = datos_base.copy()\ncopia_segura *= 10\nresult = (copia_segura.base is None, np.array_equal(datos_base, np.array([10, 20, 30, 40])))",
    "tests": [
      {
        "name": "result contiene la tupla de verificación (True, True)",
        "check": "result == (True, True)",
        "hint": "Asegúrate de haber usado .copy()."
      },
      {
        "name": "copia_segura contiene los valores multiplicados",
        "check": "np.array_equal(copia_segura, np.array([100, 200, 300, 400]))",
        "hint": "copia_segura debe ser [100, 200, 300, 400]."
      }
    ],
    "hints": [
      "Llama a `datos_base.copy()`.",
      "Modifica la copia multiplicando por 10.",
      "La tupla debe ser `(copia_segura.base is None, np.array_equal(datos_base, np.array([10, 20, 30, 40])))`."
    ]
  },
  {
    "id": "np-12",
    "module": "numpy",
    "title": "Transposición de matrices: .T y .transpose()",
    "difficulty": 2,
    "concepts": [
      "transposicion",
      "algebra lineal",
      "forma"
    ],
    "session": 3,
    "tag": "math",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Transposición de Arrays\nTransponer intercambia los ejes (filas pasan a ser columnas y viceversa):\n```python\nM = np.array([[1, 2, 3], [4, 5, 6]]) # shape (2, 3)\nM_T = M.T                             # shape (3, 2)\n```",
    "prompt_md": "Dada la matriz de puntuaciones `calificaciones` (filas = estudiantes, columnas = exámenes), calcula en la variable `result` su transpuesta, de manera que las filas representen exámenes y las columnas estudiantes.",
    "setup_code": "import numpy as np\ncalificaciones = np.array([\n    [85, 90, 78],\n    [92, 88, 95],\n    [70, 75, 80],\n    [88, 85, 89]\n])",
    "starter_code": "import numpy as np\ncalificaciones = np.array([\n    [85, 90, 78],\n    [92, 88, 95],\n    [70, 75, 80],\n    [88, 85, 89]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Transpón calificaciones en result\nresult = None\n",
    "solution_code": "result = calificaciones.T",
    "tests": [
      {
        "name": "Dimensiones invertidas a (3, 4)",
        "check": "isinstance(result, np.ndarray) and result.shape == (3, 4)",
        "hint": "La transpuesta debe tener forma (3, 4)."
      },
      {
        "name": "Primera fila corresponde al primer examen de los 4 alumnos",
        "check": "np.array_equal(result[0], np.array([85, 92, 70, 88]))",
        "hint": "Esperaba [85, 92, 70, 88]."
      }
    ],
    "hints": [
      "Usa `calificaciones.T` o `np.transpose(calificaciones)`."
    ]
  },
  {
    "id": "np-13",
    "module": "numpy",
    "title": "Aleatoriedad reproducible con default_rng",
    "difficulty": 2,
    "concepts": [
      "default_rng",
      "semilla",
      "probabilidad"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Generador de Números Aleatorios en NumPy Moderno\nLa API moderna de NumPy utiliza `np.random.default_rng(seed)` para garantizar reproducibilidad exacta en simulaciones:\n```python\nrng = np.random.default_rng(seed=42)\nuniformes = rng.uniform(low=0.0, high=1.0, size=5)\nenteros = rng.integers(low=1, high=100, size=(3, 3))\n```",
    "prompt_md": "Crea un generador aleatorio reproducible con semilla `seed=123` usando `np.random.default_rng(123)`.\nGenera en la variable `result` una matriz de tamaño 3x4 con números enteros aleatorios entre 10 y 50 (donde 50 sea inclusivo, es decir `high=51`).",
    "setup_code": "import numpy as np",
    "starter_code": "import numpy as np\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Instancia el generador y genera la matriz en result\nresult = None\n",
    "solution_code": "rng = np.random.default_rng(123)\nresult = rng.integers(low=10, high=51, size=(3, 4))",
    "tests": [
      {
        "name": "result tiene dimensiones (3, 4)",
        "check": "isinstance(result, np.ndarray) and result.shape == (3, 4)",
        "hint": "La matriz debe tener shape (3, 4)."
      },
      {
        "name": "Todos los enteros están en el rango [10, 50]",
        "check": "(result >= 10).all() and (result <= 50).all()",
        "hint": "Todos los valores deben estar entre 10 y 50."
      },
      {
        "name": "Reproducibilidad exacta con semilla 123",
        "check": "result[0, 0] == np.random.default_rng(123).integers(10, 51, size=(3, 4))[0, 0]",
        "hint": "Asegúrate de inicializar default_rng con la semilla 123."
      }
    ],
    "hints": [
      "Instancia con `rng = np.random.default_rng(123)`.",
      "Usa `rng.integers(10, 51, size=(3, 4))`."
    ]
  },
  {
    "id": "np-14",
    "module": "numpy",
    "title": "Manejo de NaN: np.isnan y np.nanmean",
    "difficulty": 2,
    "concepts": [
      "nan",
      "np.isnan",
      "np.nanmean",
      "missing data"
    ],
    "session": 3,
    "tag": "missing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Not a Number (NaN) en NumPy\nNumPy representa valores faltantes en floats con `np.nan`.\nCualquier operación aritmética estándar con NaN produce NaN (`5 + np.nan -> nan`).\nPara operar ignorando los nulos usamos las funciones prefijadas con `nan`:\n```python\nnp.isnan(arr)       # Máscara booleana de nulos\nnp.nanmean(arr)     # Media ignorando los NaN\nnp.nansum(arr)      # Suma ignorando los NaN\n```",
    "prompt_md": "Dado el arreglo `lecturas_sensores` que contiene valores nulos (`np.nan`):\n1. Calcula la media aritmética ignorando los nulos y guárdala en `media_sin_nan` (redondeada a 2 decimales).\n2. Reemplaza todos los valores `np.nan` del arreglo original por esa media calculada.\nGuarda el arreglo limpio en la variable `result`.",
    "setup_code": "import numpy as np\nlecturas_sensores = np.array([24.5, np.nan, 26.2, 25.0, np.nan, 27.8, 23.9])",
    "starter_code": "import numpy as np\nlecturas_sensores = np.array([24.5, np.nan, 26.2, 25.0, np.nan, 27.8, 23.9])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Imputa los nulos con nanmean en result\nresult = None\n",
    "solution_code": "media_sin_nan = round(float(np.nanmean(lecturas_sensores)), 2)\nresult = np.where(np.isnan(lecturas_sensores), media_sin_nan, lecturas_sensores)",
    "tests": [
      {
        "name": "result no contiene ningún valor NaN",
        "check": "isinstance(result, np.ndarray) and not np.isnan(result).any()",
        "hint": "Todos los NaN debieron haber sido reemplazados."
      },
      {
        "name": "Valores imputados correctamente con la media",
        "check": "np.allclose(result, np.array([24.5, 25.48, 26.2, 25.0, 25.48, 27.8, 23.9]), atol=0.01)",
        "hint": "La media de los 5 valores válidos es 25.48."
      }
    ],
    "hints": [
      "Calcula `np.nanmean(lecturas_sensores)`.",
      "Usa `np.where(np.isnan(arr), media, arr)` o asigna con máscara `result[np.isnan(result)] = media`."
    ]
  },
  {
    "id": "np-15",
    "module": "numpy",
    "title": "Producto punto y norma euclídea (Álgebra elemental)",
    "difficulty": 2,
    "concepts": [
      "np.dot",
      "norma",
      "algebra",
      "distancia"
    ],
    "session": 3,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Operaciones Vectoriales en DS\n- Producto punto: `np.dot(u, v)` o el operador `u @ v`.\n- Norma L2 (magnitud euclídea): `np.linalg.norm(v)` o `np.sqrt(np.sum(v**2))`.\n```python\nu = np.array([1, 2, 3])\nv = np.array([4, 5, 6])\ndot_prod = u @ v            # 1*4 + 2*5 + 3*6 = 32\nmagnitud = np.linalg.norm(u) # sqrt(1 + 4 + 9) = 3.7416\n```",
    "prompt_md": "Dados los vectores de pesos de un modelo lineal `w` y de características de un paciente `x`, y el sesgo escalar `b = 1.5`:\nCalcula la predicción lineal:\n(hat{y} = w cdot x + b)\nGuarda el valor escalar resultante (float redondeado a 2 decimales) en la variable `result`.",
    "setup_code": "import numpy as np\nw = np.array([0.45, -0.12, 0.88, 0.05])\nx = np.array([1.8, 25.0, 3.2, 80.0])\nb = 1.5",
    "starter_code": "import numpy as np\nw = np.array([0.45, -0.12, 0.88, 0.05])\nx = np.array([1.8, 25.0, 3.2, 80.0])\nb = 1.5\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula la predicción lineal en result\nresult = 0.0\n",
    "solution_code": "result = round(float(np.dot(w, x) + b), 2)",
    "tests": [
      {
        "name": "result es un float",
        "check": "isinstance(result, float)",
        "hint": "result debe ser un número flotante redondeado a 2 decimales."
      },
      {
        "name": "Valor de predicción exacto",
        "check": "abs(result - 6.13) < 1e-3",
        "hint": "Esperaba 6.13 (0.45*1.8 - 0.12*25.0 + 0.88*3.2 + 0.05*80.0 + 1.5)."
      }
    ],
    "hints": [
      "Usa `np.dot(w, x) + b` o `(w @ x) + b`.",
      "Redondea a 2 decimales con `round(float(...), 2)`."
    ]
  },
  {
    "id": "np-16",
    "module": "numpy",
    "title": "Split de índices para Train/Test aleatorio",
    "difficulty": 3,
    "concepts": [
      "permutacion",
      "train test split",
      "indices"
    ],
    "session": 3,
    "tag": "warmup",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Partición de Datos Manual en NumPy\nAntes de recurrir a `train_test_split` de scikit-learn, el procedimiento fundamental consiste en permutar los índices de las observaciones:\n```python\nn = len(datos)\nindices = np.random.default_rng(seed).permutation(n)\nsplit_point = int(n * 0.8)\nidx_train = indices[:split_point]\nidx_test = indices[split_point:]\n```",
    "prompt_md": "Dado un conjunto con `n_samples = 20` observaciones, genera una partición 70% entrenamiento / 30% prueba:\n1. Usa el generador `rng = np.random.default_rng(42)`.\n2. Permuta los índices de `0` a `n_samples - 1` con `rng.permutation(n_samples)`.\n3. Asigna el primer 70% (14 índices) a `idx_train` y el 30% restante (6 índices) a `idx_test`.\nGuarda la tupla `(idx_train, idx_test)` en la variable `result`.",
    "setup_code": "import numpy as np\nn_samples = 20",
    "starter_code": "import numpy as np\nn_samples = 20\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera idx_train y idx_test y asígnalos en result\nidx_train = None\nidx_test = None\nresult = None\n",
    "solution_code": "rng = np.random.default_rng(42)\nindices = rng.permutation(n_samples)\nsplit = int(n_samples * 0.70)\nidx_train = indices[:split]\nidx_test = indices[split:]\nresult = (idx_train, idx_test)",
    "tests": [
      {
        "name": "result es una tupla con dos arreglos",
        "check": "isinstance(result, tuple) and len(result) == 2",
        "hint": "result debe ser (idx_train, idx_test)."
      },
      {
        "name": "Longitudes correctas: 14 train y 6 test",
        "check": "len(result[0]) == 14 and len(result[1]) == 6",
        "hint": "Esperaba 14 muestras para train y 6 para test."
      },
      {
        "name": "Sin solapamiento entre train y test",
        "check": "len(set(result[0]).intersection(set(result[1]))) == 0",
        "hint": "Los índices de entrenamiento y prueba deben ser disjuntos."
      }
    ],
    "hints": [
      "Calcula `split = int(n_samples * 0.70)` que da 14.",
      "Separa con slices: `[:split]` y `[split:]`."
    ]
  },
  {
    "id": "np-17",
    "module": "numpy",
    "title": "Reducciones con axis: axis=0 vs axis=1",
    "difficulty": 2,
    "concepts": [
      "axis",
      "mean",
      "sum",
      "reducciones"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### La regla mnemotécnica de axis\nEn una matriz 2D:\n- `axis=0`: Opera **a lo largo de las columnas** (colapsa las filas). Resultado: tantas entradas como columnas tenga la matriz.\n- `axis=1`: Opera **a lo largo de las filas** (colapsa las columnas). Resultado: tantas entradas como filas tenga la matriz.\n```python\nM = np.array([[1, 2], [3, 4]])\ncol_means = M.mean(axis=0) # [2.0, 3.0]\nrow_means = M.mean(axis=1) # [1.5, 3.5]\n```",
    "prompt_md": "Dada la matriz `ventas_sucursal` (4 sucursales x 3 trimestres), calcula:\n1. Las ventas promedio de cada trimestre a lo largo de todas las sucursales en `promedio_por_trimestre` (`axis=0`).\n2. La suma total de ventas por sucursal en `total_por_sucursal` (`axis=1`).\nAsigna a `result = (promedio_por_trimestre, total_por_sucursal)`.",
    "setup_code": "import numpy as np\nventas_sucursal = np.array([\n    [120, 150, 180],\n    [90, 85, 110],\n    [200, 210, 250],\n    [140, 160, 170]\n])",
    "starter_code": "import numpy as np\nventas_sucursal = np.array([\n    [120, 150, 180],\n    [90, 85, 110],\n    [200, 210, 250],\n    [140, 160, 170]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula promedios por trimestre y totales por sucursal\npromedio_por_trimestre = None\ntotal_por_sucursal = None\nresult = None\n",
    "solution_code": "promedio_por_trimestre = ventas_sucursal.mean(axis=0)\ntotal_por_sucursal = ventas_sucursal.sum(axis=1)\nresult = (promedio_por_trimestre, total_por_sucursal)",
    "tests": [
      {
        "name": "Dimensiones de las reducciones",
        "check": "promedio_por_trimestre.shape == (3,) and total_por_sucursal.shape == (4,)",
        "hint": "promedio_por_trimestre debe tener 3 valores y total_por_sucursal 4 valores."
      },
      {
        "name": "Valores exactos de las reducciones",
        "check": "np.allclose(promedio_por_trimestre, np.array([137.5, 151.25, 177.5])) and np.array_equal(total_por_sucursal, np.array([450, 285, 660, 470]))",
        "hint": "Verifica axis=0 para columnas y axis=1 para filas."
      }
    ],
    "hints": [
      "Para trimestres usa `.mean(axis=0)`.",
      "Para sucursales usa `.sum(axis=1)`."
    ]
  },
  {
    "id": "np-18",
    "module": "numpy",
    "title": "Reglas de Broadcasting: alineación dimensional",
    "difficulty": 2,
    "concepts": [
      "broadcasting",
      "compatibilidad",
      "dimensiones"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Regla de Broadcasting\nDos dimensiones son compatibles para operar elemento a elemento si:\n1. Son iguales, O\n2. Una de ellas es 1.\nNumPy alinea las formas empezando por la **derecha**:\n```\nMatriz A:  (4, 3)\nVector b:     (3,) -> Se expande virtualmente a (4, 3)\n```\nPara expandir una dimensión se puede usar `np.newaxis` o `[:, None]`.",
    "prompt_md": "Dada la matriz de puntuaciones `puntajes` de forma `(4, 3)` y el vector de pesos por criterio `pesos` de longitud `3`, multiplica cada columna por su peso respectivo usando broadcasting.\nGuarda la matriz ponderada en la variable `result`.",
    "setup_code": "import numpy as np\npuntajes = np.array([\n    [10.0, 20.0, 30.0],\n    [15.0, 25.0, 35.0],\n    [12.0, 22.0, 32.0],\n    [18.0, 28.0, 38.0]\n])\npesos = np.array([0.2, 0.3, 0.5])",
    "starter_code": "import numpy as np\npuntajes = np.array([\n    [10.0, 20.0, 30.0],\n    [15.0, 25.0, 35.0],\n    [12.0, 22.0, 32.0],\n    [18.0, 28.0, 38.0]\n])\npesos = np.array([0.2, 0.3, 0.5])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Aplica broadcasting para ponderar puntajes en result\nresult = None\n",
    "solution_code": "result = puntajes * pesos",
    "tests": [
      {
        "name": "result tiene forma (4, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (4, 3)",
        "hint": "La matriz resultante debe conservar shape (4, 3)."
      },
      {
        "name": "Valores ponderados correctos",
        "check": "np.allclose(result[0], np.array([2.0, 6.0, 15.0])) and np.allclose(result[3], np.array([3.6, 8.4, 19.0]))",
        "hint": "Esperaba primera fila: [10*0.2, 20*0.3, 30*0.5] = [2.0, 6.0, 15.0]."
      }
    ],
    "hints": [
      "Debido a que `pesos` tiene longitud 3 y `puntajes` tiene 3 columnas, `puntajes * pesos` se alinea automáticamente."
    ]
  },
  {
    "id": "np-19",
    "module": "numpy",
    "title": "Broadcasting vertical con [:, None]",
    "difficulty": 3,
    "concepts": [
      "broadcasting",
      "newaxis",
      "vector columna"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Creación de Vectores Columna\nCuando queremos restar un vector de tamaño (N) a cada una de las (N) filas de una matriz ((N, M)), el vector 1D de tamaño ((N,)) NO se alineará correctamente porque se alinea a la derecha.\nDebemos transformarlo en un vector columna de forma ((N, 1)) usando `[:, None]`:\n```python\nfila_medias = M.mean(axis=1) # shape (N,)\nM_centrada = M - fila_medias[:, None] # (N, M) - (N, 1) -> compatible!\n```",
    "prompt_md": "Dada la matriz de mediciones `datos` de forma `(5, 3)`, centra cada fila restándole su propia media.\nGuarda la matriz resultante centrada por fila en la variable `result`.",
    "setup_code": "import numpy as np\ndatos = np.array([\n    [10.0, 20.0, 30.0],\n    [5.0, 15.0, 25.0],\n    [100.0, 200.0, 300.0],\n    [2.0, 4.0, 6.0],\n    [50.0, 60.0, 70.0]\n])",
    "starter_code": "import numpy as np\ndatos = np.array([\n    [10.0, 20.0, 30.0],\n    [5.0, 15.0, 25.0],\n    [100.0, 200.0, 300.0],\n    [2.0, 4.0, 6.0],\n    [50.0, 60.0, 70.0]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Centra cada fila restando su media con broadcasting\nresult = None\n",
    "solution_code": "medias_filas = datos.mean(axis=1, keepdims=True)\nresult = datos - medias_filas",
    "tests": [
      {
        "name": "result tiene forma (5, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (5, 3)",
        "hint": "result debe conservar las dimensiones (5, 3)."
      },
      {
        "name": "La media de cada fila en result es prácticamente cero",
        "check": "np.allclose(result.mean(axis=1), np.zeros(5), atol=1e-7)",
        "hint": "Al restar la media a cada fila, el promedio de cada fila debe ser 0."
      },
      {
        "name": "Valores correctos de la primera fila",
        "check": "np.allclose(result[0], np.array([-10.0, 0.0, 10.0]))",
        "hint": "Fila 1: media=20, valores [10-20, 20-20, 30-20] = [-10, 0, 10]."
      }
    ],
    "hints": [
      "Calcula las medias por fila con `datos.mean(axis=1, keepdims=True)` o `datos.mean(axis=1)[:, None]`.",
      "Resta `datos - medias_filas`."
    ]
  },
  {
    "id": "np-20",
    "module": "numpy",
    "title": "Estandarizar un vector 1D (Z-score)",
    "difficulty": 2,
    "concepts": [
      "estandarizacion",
      "z-score",
      "estadistica",
      "preprocesamiento"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Estandarización Z-Score\nLa transformación Z-Score convierte una variable para que tenga media (mu = 0) y desviación estándar (sigma = 1):\n[z = \frac{x - mu}{sigma}]\n```python\nmu = x.mean()\nsigma = x.std()\nz = (x - mu) / sigma\n```",
    "prompt_md": "Dado el arreglo de ingresos salariales `ingresos`, calcula su estandarización Z-Score.\nGuarda el arreglo estandarizado en la variable `result`.",
    "setup_code": "import numpy as np\ningresos = np.array([12000.0, 15000.0, 8500.0, 24000.0, 19000.0, 31000.0, 9500.0])",
    "starter_code": "import numpy as np\ningresos = np.array([12000.0, 15000.0, 8500.0, 24000.0, 19000.0, 31000.0, 9500.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Estandariza ingresos a media 0 y std 1 en result\nresult = None\n",
    "solution_code": "result = (ingresos - ingresos.mean()) / ingresos.std()",
    "tests": [
      {
        "name": "result tiene media prácticamente 0 y desviación 1",
        "check": "np.isclose(result.mean(), 0.0, atol=1e-6) and np.isclose(result.std(), 1.0, atol=1e-6)",
        "hint": "La media debe ser 0.0 y la desviación estándar 1.0."
      },
      {
        "name": "result conserva la forma original (7,)",
        "check": "result.shape == (7,)",
        "hint": "La forma debe ser (7,)."
      }
    ],
    "hints": [
      "Usa `(ingresos - ingresos.mean()) / ingresos.std()`."
    ]
  },
  {
    "id": "np-21",
    "module": "numpy",
    "title": "Estandarización por columna de una matriz (axis=0)",
    "difficulty": 3,
    "concepts": [
      "estandarizacion",
      "broadcasting",
      "axis=0",
      "preprocesamiento"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Estandarización de Matriz de Características\nEn Machine Learning, cada variable o columna de la matriz (X) debe escalarse independientemente:\n```python\nmedias = X.mean(axis=0)  # Una media por cada columna\nstds = X.std(axis=0)     # Una desviación por cada columna\nX_scaled = (X - medias) / stds\n```\nGracias al broadcasting por la derecha, un vector de forma ((M,)) opera sobre la matriz ((N, M)) columna a columna.",
    "prompt_md": "Dada la matriz de datos `X` (6 observaciones x 3 variables), estandariza cada columna para que tenga media 0 y desviación estándar 1.\nGuarda la matriz escalada en la variable `result`.",
    "setup_code": "import numpy as np\nX = np.array([\n    [10.0, 200.0, 0.5],\n    [12.0, 250.0, 0.8],\n    [8.0, 180.0, 0.3],\n    [15.0, 300.0, 1.2],\n    [9.0, 190.0, 0.4],\n    [11.0, 220.0, 0.7]\n])",
    "starter_code": "import numpy as np\nX = np.array([\n    [10.0, 200.0, 0.5],\n    [12.0, 250.0, 0.8],\n    [8.0, 180.0, 0.3],\n    [15.0, 300.0, 1.2],\n    [9.0, 190.0, 0.4],\n    [11.0, 220.0, 0.7]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Estandariza X por columnas en result\nresult = None\n",
    "solution_code": "result = (X - X.mean(axis=0)) / X.std(axis=0)",
    "tests": [
      {
        "name": "result conserva las dimensiones (6, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (6, 3)",
        "hint": "Las dimensiones deben ser (6, 3)."
      },
      {
        "name": "Medias de cada columna son 0 y desviaciones son 1",
        "check": "np.allclose(result.mean(axis=0), np.zeros(3), atol=1e-6) and np.allclose(result.std(axis=0), np.ones(3), atol=1e-6)",
        "hint": "Cada una de las 3 columnas debe tener media 0 y std 1."
      }
    ],
    "hints": [
      "Calcula `mu = X.mean(axis=0)` y `sigma = X.std(axis=0)`.",
      "Calcula `(X - mu) / sigma`."
    ]
  },
  {
    "id": "np-22",
    "module": "numpy",
    "title": "Matriz de distancias euclídeas 1D vía broadcasting",
    "difficulty": 3,
    "concepts": [
      "broadcasting",
      "distancia euclidea",
      "matriz de distancias"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 8,
    "dataset": "inline",
    "theory_md": "### Distancias Euclídeas por Pares\nPara calcular la distancia entre cada par de puntos en un vector 1D (v) de longitud (N):\nRestamos un vector fila ((1, N)) de un vector columna ((N, 1)):\n[D_{ij} = |v_i - v_j|]\n```python\nD = np.abs(v[:, None] - v[None, :])\n# D tiene dimensiones (N, N)\n```",
    "prompt_md": "Dado el arreglo de posiciones de sucursales en una carretera `posiciones` (en km), calcula la matriz cuadrada de distancias absolutas entre cada par de sucursales usando broadcasting.\nGuarda la matriz de distancias resultante en la variable `result`.",
    "setup_code": "import numpy as np\nposiciones = np.array([12.0, 25.5, 40.0, 72.0])",
    "starter_code": "import numpy as np\nposiciones = np.array([12.0, 25.5, 40.0, 72.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula la matriz de distancias por pares en result\nresult = None\n",
    "solution_code": "result = np.abs(posiciones[:, None] - posiciones[None, :])",
    "tests": [
      {
        "name": "result es una matriz cuadrada (4, 4)",
        "check": "isinstance(result, np.ndarray) and result.shape == (4, 4)",
        "hint": "La matriz de distancias debe ser de 4x4."
      },
      {
        "name": "La diagonal es cero (distancia de un punto a sí mismo)",
        "check": "np.array_equal(np.diag(result), np.zeros(4))",
        "hint": "La diagonal principal debe ser estrictamente 0."
      },
      {
        "name": "Matriz simétrica con distancias correctas",
        "check": "np.allclose(result, result.T) and np.isclose(result[0, 1], 13.5)",
        "hint": "Distancia entre 12.0 y 25.5 es |12.0 - 25.5| = 13.5."
      }
    ],
    "hints": [
      "Usa `np.abs(posiciones[:, None] - posiciones[None, :])`."
    ]
  },
  {
    "id": "np-23",
    "module": "numpy",
    "title": "One-Hot Encoding manual con arrays de enteros",
    "difficulty": 3,
    "concepts": [
      "one-hot",
      "np.eye",
      "fancy indexing",
      "categoricas"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### One-Hot Encoding con np.eye\nUn truco sumamente elegante para convertir un arreglo de categorías discretas (0, 1, dots, K-1) en una matriz One-Hot sin bucles ni dependencias externas:\n```python\ncategorias = np.array([0, 2, 1, 2, 0])\nK = 3\none_hot = np.eye(K)[categorias]\n```\nEl fancy indexing indexa las filas de la matriz identidad según los enteros de las categorías.",
    "prompt_md": "Dado el arreglo de clases asignadas `clases` (con 4 clases posibles: 0, 1, 2, 3), genera la matriz One-Hot correspondiente usando `np.eye`.\nGuarda la matriz binaria en la variable `result`.",
    "setup_code": "import numpy as np\nclases = np.array([2, 0, 3, 1, 0, 2, 3])",
    "starter_code": "import numpy as np\nclases = np.array([2, 0, 3, 1, 0, 2, 3])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera la matriz one-hot en result\nresult = None\n",
    "solution_code": "result = np.eye(4)[clases]",
    "tests": [
      {
        "name": "result tiene dimensiones (7, 4)",
        "check": "isinstance(result, np.ndarray) and result.shape == (7, 4)",
        "hint": "Esperaba shape (7, 4) para 7 muestras y 4 clases."
      },
      {
        "name": "Codificación exacta de las muestras",
        "check": "np.array_equal(result[0], np.array([0., 0., 1., 0.])) and np.array_equal(result[1], np.array([1., 0., 0., 0.]))",
        "hint": "La primera fila (clase 2) debe ser [0, 0, 1, 0]."
      }
    ],
    "hints": [
      "Genera la matriz identidad con `np.eye(4)`.",
      "Indexa con las clases: `np.eye(4)[clases]`."
    ]
  },
  {
    "id": "np-24",
    "module": "numpy",
    "title": "Métricas de evaluación: Accuracy y MSE a mano",
    "difficulty": 2,
    "concepts": [
      "accuracy",
      "mse",
      "metricas",
      "evaluacion"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Cálculo de Métricas en Machine Learning\n- **Accuracy**: Proporción de predicciones idénticas a las etiquetas reales:\n[\text{Acc} = \frac{1}{N} sum (hat{y}_i == y_i)]\n- **Error Cuadrático Medio (MSE)**:\n[\text{MSE} = \frac{1}{N} sum (y_i - hat{y}_i)^2]\n```python\nacc = (y_pred == y_true).mean()\nmse = np.mean((y_true - y_pred)**2)\n```",
    "prompt_md": "Dados los arreglos de valores reales `y_real` y valores predichos por un modelo de regresión `y_pred`:\nCalcula el **MSE** (Error Cuadrático Medio) redondeado a 3 decimales y guárdalo en la variable `result`.",
    "setup_code": "import numpy as np\ny_real = np.array([12.5, 14.0, 18.2, 9.8, 15.6, 21.0])\ny_pred = np.array([11.8, 14.5, 17.5, 10.2, 16.0, 19.8])",
    "starter_code": "import numpy as np\ny_real = np.array([12.5, 14.0, 18.2, 9.8, 15.6, 21.0])\ny_pred = np.array([11.8, 14.5, 17.5, 10.2, 16.0, 19.8])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el MSE y asígnalo en result\nresult = 0.0\n",
    "solution_code": "result = round(float(np.mean((y_real - y_pred)**2)), 3)",
    "tests": [
      {
        "name": "result es un float",
        "check": "isinstance(result, float)",
        "hint": "result debe ser un float."
      },
      {
        "name": "Valor exacto de MSE",
        "check": "abs(result - 0.498) < 1e-2",
        "hint": "Esperaba MSE ≈ 0.498."
      }
    ],
    "hints": [
      "Calcula las diferencias: `diferencias = y_real - y_pred`.",
      "Eleva al cuadrado y calcula la media: `np.mean(diferencias**2)`."
    ]
  },
  {
    "id": "np-25",
    "module": "numpy",
    "title": "Filtrar observaciones por percentil (percentile)",
    "difficulty": 2,
    "concepts": [
      "np.percentile",
      "filtrado",
      "estadistica"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Percentiles en NumPy\n`np.percentile(arr, q)` calcula el percentil (q) (de 0 a 100):\n```python\np90 = np.percentile(datos, 90)\ntop_10_porciento = datos[datos > p90]\n```",
    "prompt_md": "Dada la matriz de clientes `clientes` (filas = clientes, columna 0 = facturación total, columna 1 = antigüedad en meses), selecciona en la variable `result` todas las filas correspondientes a clientes cuya facturación (columna 0) sea **estrictamente mayor al percentil 75** de dicha columna.",
    "setup_code": "import numpy as np\nclientes = np.array([\n    [150.0, 12],\n    [320.0, 24],\n    [85.0, 6],\n    [410.0, 36],\n    [190.0, 18],\n    [520.0, 48],\n    [210.0, 14],\n    [380.0, 30]\n])",
    "starter_code": "import numpy as np\nclientes = np.array([\n    [150.0, 12],\n    [320.0, 24],\n    [85.0, 6],\n    [410.0, 36],\n    [190.0, 18],\n    [520.0, 48],\n    [210.0, 14],\n    [380.0, 30]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Selecciona las filas con col 0 > percentil 75 en result\nresult = None\n",
    "solution_code": "col0 = clientes[:, 0]\np75 = np.percentile(col0, 75)\nresult = clientes[col0 > p75]",
    "tests": [
      {
        "name": "result es un arreglo 2D",
        "check": "isinstance(result, np.ndarray) and result.ndim == 2",
        "hint": "result debe ser un arreglo 2D con las observaciones filtradas."
      },
      {
        "name": "Se seleccionan exactamente las observaciones del percentil superior",
        "check": "len(result) == 2 and np.array_equal(result[:, 0], np.array([410.0, 520.0]))",
        "hint": "El percentil 75 es 387.5; las facturaciones mayores son 410.0 y 520.0."
      }
    ],
    "hints": [
      "Obtén la columna 0 con `col0 = clientes[:, 0]`.",
      "Calcula el umbral con `p75 = np.percentile(col0, 75)`.",
      "Filtra la matriz completa: `result = clientes[col0 > p75]`."
    ]
  },
  {
    "id": "np-26",
    "module": "numpy",
    "title": "Rolling Mean simple con Slicing (Ventana de 3)",
    "difficulty": 3,
    "concepts": [
      "rolling mean",
      "slicing",
      "promedios moviles",
      "series de tiempo"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Media Móvil Vectorizada\nPara calcular la media móvil con ventana de tamaño 3 sobre un arreglo 1D sin librerías externas ni bucles for, podemos sumar los 3 arreglos desplazados mediante slicing:\n```python\n# Para arr = [x0, x1, x2, x3, x4]\n# w0 = (x0 + x1 + x2) / 3\n# w1 = (x1 + x2 + x3) / 3\n# w2 = (x2 + x3 + x4) / 3\nrolling_3 = (arr[:-2] + arr[1:-1] + arr[2:]) / 3.0\n```",
    "prompt_md": "Dado el arreglo de precios diarios de una acción `precios`, calcula la media móvil con ventana fija de 3 elementos utilizando suma de slices vectorizados.\nGuarda el arreglo resultante en la variable `result`.",
    "setup_code": "import numpy as np\nprecios = np.array([10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0])",
    "starter_code": "import numpy as np\nprecios = np.array([10.0, 12.0, 14.0, 16.0, 18.0, 20.0, 22.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el rolling mean de ventana 3 en result\nresult = None\n",
    "solution_code": "result = (precios[:-2] + precios[1:-1] + precios[2:]) / 3.0",
    "tests": [
      {
        "name": "result contiene 5 elementos (N - 3 + 1)",
        "check": "isinstance(result, np.ndarray) and len(result) == 5",
        "hint": "Para 7 elementos y ventana 3, el resultado tiene longitud 5."
      },
      {
        "name": "Valores correctos de la media móvil",
        "check": "np.allclose(result, np.array([12.0, 14.0, 16.0, 18.0, 20.0]))",
        "hint": "Esperaba [12.0, 14.0, 16.0, 18.0, 20.0]."
      }
    ],
    "hints": [
      "El primer término es `precios[:-2]`.",
      "El del centro es `precios[1:-1]`.",
      "El último es `precios[2:]`.",
      "Suma los tres y divide entre 3.0."
    ]
  },
  {
    "id": "np-27",
    "module": "numpy",
    "title": "Argmax y Argmin: Identificar índices extremos",
    "difficulty": 2,
    "concepts": [
      "argmax",
      "argmin",
      "indices extremos"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Localización de Máximos y Mínimos\n- `np.argmax(arr)`: Retorna el índice del valor máximo.\n- `np.argmin(arr)`: Retorna el índice del valor mínimo.\nEn 2D, pasando `axis=0` o `axis=1` retorna los índices a lo largo de ese eje.\n```python\nv = np.array([10, 45, 2, 88, 12])\nidx_max = np.argmax(v) # 3 (porque v[3] es 88)\n```",
    "prompt_md": "Dada la lista de días de la semana y el arreglo de temperaturas registradas `temperaturas`, encuentra el día con la temperatura máxima y el día con la temperatura mínima.\nGuarda en la variable `result` una tupla con los nombres de los días correspondientes: `(dia_maximo, dia_minimo)`.",
    "setup_code": "import numpy as np\ndias = [\"Lunes\", \"Martes\", \"Miércoles\", \"Jueves\", \"Viernes\", \"Sábado\", \"Domingo\"]\ntemperaturas = np.array([29.5, 31.0, 28.2, 34.5, 32.1, 27.8, 30.0])",
    "starter_code": "import numpy as np\ndias = [\"Lunes\", \"Martes\", \"Miércoles\", \"Jueves\", \"Viernes\", \"Sábado\", \"Domingo\"]\ntemperaturas = np.array([29.5, 31.0, 28.2, 34.5, 32.1, 27.8, 30.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Encuentra los días con temp máxima y mínima en result\nresult = None\n",
    "solution_code": "idx_max = int(np.argmax(temperaturas))\nidx_min = int(np.argmin(temperaturas))\nresult = (dias[idx_max], dias[idx_min])",
    "tests": [
      {
        "name": "result contiene la tupla correcta de días",
        "check": "result == ('Jueves', 'Sábado')",
        "hint": "El máximo es 34.5 (Jueves) y el mínimo es 27.8 (Sábado)."
      }
    ],
    "hints": [
      "Usa `np.argmax(temperaturas)` para el índice máximo.",
      "Usa `np.argmin(temperaturas)` para el mínimo.",
      "Indexa la lista `dias` con esos enteros."
    ]
  },
  {
    "id": "np-28",
    "module": "numpy",
    "title": "Apilado de arreglos: vstack y hstack",
    "difficulty": 2,
    "concepts": [
      "vstack",
      "hstack",
      "concatenacion"
    ],
    "session": 4,
    "tag": "reshape",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Apilado (Stacking) de Arreglos\n- `np.vstack((a, b))`: Apila verticalmente (fila a fila, incrementa el eje 0).\n- `np.hstack((a, b))`: Apila horizontalmente (columna a columna, incrementa el eje 1).\n```python\na = np.array([[1, 2], [3, 4]])\nb = np.array([[5, 6], [7, 8]])\nvert = np.vstack((a, b)) # shape (4, 2)\nhoriz = np.hstack((a, b)) # shape (2, 4)\n```",
    "prompt_md": "Dadas dos matrices de características `lote_1` y `lote_2` de tamaño `(3, 2)`, apílalas verticalmente para formar una matriz combinada de `(6, 2)`.\nLuego, agrégale una columna de unos a la derecha (sesgo o bias) de forma `(6, 1)` usando `np.hstack`.\nGuarda la matriz final de `(6, 3)` en la variable `result`.",
    "setup_code": "import numpy as np\nlote_1 = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])\nlote_2 = np.array([[7.0, 8.0], [9.0, 10.0], [11.0, 12.0]])",
    "starter_code": "import numpy as np\nlote_1 = np.array([[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]])\nlote_2 = np.array([[7.0, 8.0], [9.0, 10.0], [11.0, 12.0]])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Apila verticalmente y luego agrega la columna de unos\nresult = None\n",
    "solution_code": "combinado = np.vstack((lote_1, lote_2))\nbias = np.ones((6, 1))\nresult = np.hstack((combinado, bias))",
    "tests": [
      {
        "name": "result tiene dimensiones (6, 3)",
        "check": "isinstance(result, np.ndarray) and result.shape == (6, 3)",
        "hint": "La matriz resultante debe ser de 6x3."
      },
      {
        "name": "Tercera columna está compuesta exclusivamente de 1.0",
        "check": "np.array_equal(result[:, 2], np.ones(6))",
        "hint": "La última columna debe contener sólo unos."
      },
      {
        "name": "Primeras dos columnas contienen los datos combinados",
        "check": "result[0, 0] == 1.0 and result[5, 1] == 12.0",
        "hint": "Verifica que el apilado vertical conserve el orden."
      }
    ],
    "hints": [
      "Usa `combinado = np.vstack((lote_1, lote_2))`.",
      "Crea la columna con `bias = np.ones((6, 1))`.",
      "Combina con `np.hstack((combinado, bias))`."
    ]
  },
  {
    "id": "np-29",
    "module": "numpy",
    "title": "Cumsum: Suma acumulada de series",
    "difficulty": 2,
    "concepts": [
      "np.cumsum",
      "acumulados",
      "series temporales"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Suma Acumulada\n`np.cumsum(arr)` calcula la suma acumulativa progresiva:\n```python\ningresos_diarios = np.array([100, 150, 200])\nacumulado = np.cumsum(ingresos_diarios) # [100, 250, 450]\n```",
    "prompt_md": "Dado el arreglo de precipitaciones diarias en mm durante una tormenta `lluvia_diaria`, calcula la acumulación progresiva de lluvia a lo largo de los días.\nGuarda el arreglo acumulado en la variable `result`.",
    "setup_code": "import numpy as np\nlluvia_diaria = np.array([5.2, 12.8, 35.4, 45.0, 18.2, 6.0, 2.5])",
    "starter_code": "import numpy as np\nlluvia_diaria = np.array([5.2, 12.8, 35.4, 45.0, 18.2, 6.0, 2.5])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el acumulado con cumsum en result\nresult = None\n",
    "solution_code": "result = np.cumsum(lluvia_diaria)",
    "tests": [
      {
        "name": "result tiene la misma longitud y es un ndarray",
        "check": "isinstance(result, np.ndarray) and len(result) == 7",
        "hint": "result debe tener 7 elementos."
      },
      {
        "name": "Valores acumulados correctos",
        "check": "np.allclose(result, np.array([5.2, 18.0, 53.4, 98.4, 116.6, 122.6, 125.1]))",
        "hint": "Esperaba [5.2, 18.0, 53.4, 98.4, 116.6, 122.6, 125.1]."
      }
    ],
    "hints": [
      "Usa `np.cumsum(lluvia_diaria)`."
    ]
  },
  {
    "id": "np-30",
    "module": "numpy",
    "title": "Identificar valores únicos y conteo con np.unique",
    "difficulty": 2,
    "concepts": [
      "np.unique",
      "frecuencias",
      "conteos"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Valores Únicos y Frecuencias\n`np.unique(arr, return_counts=True)` extrae los valores sin repetición y la cantidad de apariciones de cada uno:\n```python\nx = np.array([\"A\", \"B\", \"A\", \"C\", \"B\", \"A\"])\nvalores, cuentas = np.unique(x, return_counts=True)\n# valores: ['A', 'B', 'C'], cuentas: [3, 2, 1]\n```",
    "prompt_md": "Dado el arreglo de códigos de respuesta en un servidor web `status_codes`, utiliza `np.unique` con `return_counts=True` para extraer:\n1. Los códigos únicos observados.\n2. Las frecuencias de cada código.\nConstruye en la variable `result` un diccionario donde las claves sean los códigos de estado (convertidos a int) y los valores sus frecuencias correspondientes (int).",
    "setup_code": "import numpy as np\nstatus_codes = np.array([200, 404, 200, 500, 200, 404, 200, 200, 503, 404])",
    "starter_code": "import numpy as np\nstatus_codes = np.array([200, 404, 200, 500, 200, 404, 200, 200, 503, 404])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Extrae únicos y frecuencias y arma el dict en result\nresult = {}\n",
    "solution_code": "valores, cuentas = np.unique(status_codes, return_counts=True)\nresult = {int(v): int(c) for v, c in zip(valores, cuentas)}",
    "tests": [
      {
        "name": "result es un diccionario con las 4 clases de códigos",
        "check": "isinstance(result, dict) and len(result) == 4",
        "hint": "Debe haber 4 códigos únicos: 200, 404, 500, 503."
      },
      {
        "name": "Frecuencias exactas calculadas",
        "check": "result == {200: 5, 404: 3, 500: 1, 503: 1}",
        "hint": "Esperaba {200: 5, 404: 3, 500: 1, 503: 1}."
      }
    ],
    "hints": [
      "Llama a `valores, cuentas = np.unique(status_codes, return_counts=True)`.",
      "Combina con dict comprehension: `{int(v): int(c) for v, c in zip(valores, cuentas)}`."
    ]
  },
  {
    "id": "np-31",
    "module": "numpy",
    "title": "Filtrar filas donde col0 > media y col1 < mediana",
    "difficulty": 3,
    "concepts": [
      "filtrado 2D",
      "axis",
      "comparaciones logicas"
    ],
    "session": 4,
    "tag": "indexing",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Filtrado Multivariable de Matrices\nPodemos combinar máscaras booleanas construidas a partir de diferentes columnas de una matriz 2D:\n```python\ncol0 = M[:, 0]\ncol1 = M[:, 1]\nmask = (col0 > col0.mean()) & (col1 < np.median(col1))\nfiltrada = M[mask]\n```",
    "prompt_md": "Dada la matriz de evaluaciones de sucursales `metricas` (columna 0 = volumen de ventas, columna 1 = reclamos de clientes), filtra y extrae en la variable `result` todas las filas que representen sucursales de alto rendimiento:\n- Volumen de ventas (`col 0`) **estrictamente mayor** que la media de la columna 0.\n- Reclamos (`col 1`) **estrictamente menor o igual** que la mediana de la columna 1.",
    "setup_code": "import numpy as np\nmetricas = np.array([\n    [100.0, 15.0],\n    [250.0, 8.0],\n    [80.0, 22.0],\n    [320.0, 5.0],\n    [180.0, 12.0],\n    [210.0, 18.0]\n])",
    "starter_code": "import numpy as np\nmetricas = np.array([\n    [100.0, 15.0],\n    [250.0, 8.0],\n    [80.0, 22.0],\n    [320.0, 5.0],\n    [180.0, 12.0],\n    [210.0, 18.0]\n])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Aplica el filtro multivariable en result\nresult = None\n",
    "solution_code": "col0 = metricas[:, 0]\ncol1 = metricas[:, 1]\ncond1 = col0 > col0.mean()\ncond2 = col1 <= np.median(col1)\nresult = metricas[cond1 & cond2]",
    "tests": [
      {
        "name": "result contiene 2 filas que cumplen ambas condiciones",
        "check": "isinstance(result, np.ndarray) and result.shape == (2, 2)",
        "hint": "Esperaba 2 filas filtradas."
      },
      {
        "name": "Sucursales correctas seleccionadas",
        "check": "np.array_equal(result, np.array([[250.0, 8.0], [320.0, 5.0]]))",
        "hint": "Las filas son [250.0, 8.0] y [320.0, 5.0]."
      }
    ],
    "hints": [
      "Calcula `col0.mean()` y `np.median(col1)`.",
      "Usa `metricas[(col0 > col0.mean()) & (col1 <= np.median(col1))]`."
    ]
  },
  {
    "id": "np-32",
    "module": "numpy",
    "title": "Correlación de Pearson entre dos arrays",
    "difficulty": 2,
    "concepts": [
      "np.corrcoef",
      "correlacion",
      "pearson",
      "estadistica"
    ],
    "session": 4,
    "tag": "math",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Coeficiente de Correlación de Pearson\n`np.corrcoef(x, y)` calcula la matriz de correlación (2 \times 2) entre dos variables cuantitativas:\n```python\nR = np.corrcoef(x, y)\nr_xy = R[0, 1] # Coeficiente entre x e y (-1 a +1)\n```",
    "prompt_md": "Dados los arreglos `horas_estudio` y `calificacion_examen`, calcula el coeficiente de correlación lineal de Pearson entre ambas variables.\nGuarda el valor escalar (float redondeado a 3 decimales) en la variable `result`.",
    "setup_code": "import numpy as np\nhoras_estudio = np.array([2.0, 4.5, 6.0, 1.5, 8.0, 10.0, 3.5, 7.0])\ncalificacion_examen = np.array([55.0, 70.0, 82.0, 50.0, 90.0, 98.0, 64.0, 85.0])",
    "starter_code": "import numpy as np\nhoras_estudio = np.array([2.0, 4.5, 6.0, 1.5, 8.0, 10.0, 3.5, 7.0])\ncalificacion_examen = np.array([55.0, 70.0, 82.0, 50.0, 90.0, 98.0, 64.0, 85.0])\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el coeficiente de Pearson en result\nresult = 0.0\n",
    "solution_code": "matriz_corr = np.corrcoef(horas_estudio, calificacion_examen)\nresult = round(float(matriz_corr[0, 1]), 3)",
    "tests": [
      {
        "name": "result es un float",
        "check": "isinstance(result, float)",
        "hint": "result debe ser un float."
      },
      {
        "name": "Correlación lineal fuertemente positiva",
        "check": "abs(result - 0.992) < 1e-2",
        "hint": "Esperaba correlación r ≈ 0.992."
      }
    ],
    "hints": [
      "Llama a `np.corrcoef(horas_estudio, calificacion_examen)`.",
      "Extrae la posición `[0, 1]` y redondea con `round(..., 3)`."
    ]
  }
];
