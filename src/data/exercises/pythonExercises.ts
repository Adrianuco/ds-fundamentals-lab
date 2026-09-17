import { Exercise } from "../../types/exercise";

export const pythonExercises: Exercise[] = [
  {
    "id": "py-01",
    "module": "python",
    "title": "Casting y f-strings formateadas",
    "difficulty": 1,
    "concepts": [
      "tipos",
      "casting",
      "f-strings",
      "formato flotantes"
    ],
    "session": 1,
    "tag": "warmup",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Tipos y Formateo en Python\nEn ciencia de datos, con frecuencia recibimos números en formato texto (ej: `\"1250.75\"`) que deben convertirse a `float` o `int`.\nLas f-strings permiten formatear salidas con precisión decimal:\n```python\ntasa = 0.08456\ntexto = f\"Tasa: {tasa:.2%}\"      # \"Tasa: 8.46%\"\nprecio = 1250.5\ntexto2 = f\"C$ {precio:,.2f}\"    # \"C$ 1,250.50\"\n```",
    "prompt_md": "Dado el valor en texto `monto_raw = \"1450.854\"`, conviértelo a número decimal (`float`) y genera un string en la variable `result` con el formato exacto:\n`\"Total a pagar: C$ 1,450.85\"` (con dos decimales redondeados y separador de miles con coma).",
    "setup_code": "monto_raw = \"1450.854\"",
    "starter_code": "monto_raw = \"1450.854\"\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Convierte monto_raw a float y formatea el string en result\nresult = \"\"\n",
    "solution_code": "monto = float(monto_raw)\nresult = f\"Total a pagar: C$ {monto:,.2f}\"",
    "tests": [
      {
        "name": "Existe la variable result",
        "check": "'result' in locals() or 'result' in globals()",
        "hint": "Debes asignar el resultado a la variable `result`."
      },
      {
        "name": "result es de tipo string",
        "check": "isinstance(result, str)",
        "hint": "La variable result debe ser una cadena de texto (str)."
      },
      {
        "name": "Formato exacto con separador de miles y 2 decimales",
        "check": "result == 'Total a pagar: C$ 1,450.85'",
        "hint": "El string generado debe ser exactamente 'Total a pagar: C$ 1,450.85'."
      }
    ],
    "hints": [
      "Usa `float(monto_raw)` para hacer el casting inicial.",
      "En una f-string, `{monto:,.2f}` aplica comas para miles y 2 decimales.",
      "Asegúrate de anteponer 'Total a pagar: C$ '."
    ]
  },
  {
    "id": "py-02",
    "module": "python",
    "title": "Slicing y pasos en listas",
    "difficulty": 1,
    "concepts": [
      "listas",
      "slicing",
      "índice negativo",
      "step"
    ],
    "session": 1,
    "tag": "indexing",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Slicing en Python\nLa notación `lista[start:stop:step]` permite subseleccionar elementos de secuencias:\n- `start`: índice inicial (inclusivo, default 0).\n- `stop`: índice final (exclusivo).\n- `step`: incremento (negativo invierte la dirección).\n```python\ndatos = [10, 20, 30, 40, 50, 60]\nultimos_tres = datos[-3:]    # [40, 50, 60]\ninvertida = datos[::-1]      # [60, 50, 40, 30, 20, 10]\npares_idx = datos[::2]       # [10, 30, 50]\n```",
    "prompt_md": "Dada la lista `temperaturas`, extrae en la variable `result` una sublista que contenga los elementos desde el índice 1 (segundo elemento) hasta el índice 7 (octavo elemento), pero **tomando elementos alternos (de 2 en 2)**.",
    "setup_code": "temperaturas = [22.4, 25.1, 28.3, 31.0, 30.2, 29.5, 27.8, 26.0, 24.5]",
    "starter_code": "temperaturas = [22.4, 25.1, 28.3, 31.0, 30.2, 29.5, 27.8, 26.0, 24.5]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Extrae el slice requerido en la variable result\nresult = []\n",
    "solution_code": "result = temperaturas[1:8:2]",
    "tests": [
      {
        "name": "result es una lista",
        "check": "isinstance(result, list)",
        "hint": "result debe ser una lista obtenida mediante slicing."
      },
      {
        "name": "Contenido correcto del slice alterno",
        "check": "result == [25.1, 31.0, 29.5, 26.0]",
        "hint": "Esperaba [25.1, 31.0, 29.5, 26.0]. Revisa el rango [1:8:2]."
      }
    ],
    "hints": [
      "El índice inicial es 1 y el final debe incluir el índice 7 (por lo tanto stop es 8).",
      "El tercer argumento del slice es el paso o step (2).",
      "Usa `temperaturas[1:8:2]`."
    ]
  },
  {
    "id": "py-03",
    "module": "python",
    "title": "Comprensión de listas con filtro",
    "difficulty": 2,
    "concepts": [
      "list comprehension",
      "filtrado",
      "transformación"
    ],
    "session": 1,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### List Comprehensions en Data Science\nUna comprensión de lista transforma y filtra datos en una sola línea concisa:\n```python\n[expresion for elemento in iterable if condicion]\n```\nEjemplo:\n```python\nvalores = [-5, 12, 0, 45, -2, 30]\npositivos_al_cuadrado = [x**2 for x in valores if x > 0]\n```",
    "prompt_md": "Dada una lista de salarios brutos en dólares `salarios`, crea en la variable `result` una lista con los salarios que sean **estrictamente mayores a 500**, aplicándoles un incremento del 10% (multiplicar por 1.10 y redondear a 2 decimales con `round(..., 2)`).",
    "setup_code": "salarios = [420.0, 600.0, 750.5, 380.0, 1200.0, 500.0, 890.0]",
    "starter_code": "salarios = [420.0, 600.0, 750.5, 380.0, 1200.0, 500.0, 890.0]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera la lista en result usando list comprehension\nresult = []\n",
    "solution_code": "result = [round(s * 1.10, 2) for s in salarios if s > 500]",
    "tests": [
      {
        "name": "result es una lista",
        "check": "isinstance(result, list)",
        "hint": "result debe ser una lista."
      },
      {
        "name": "Elementos filtrados y aumentados correctamente",
        "check": "result == [660.0, 825.55, 1320.0, 979.0]",
        "hint": "Verifica que solo incluyas salarios > 500 y apliques round(s * 1.10, 2)."
      }
    ],
    "hints": [
      "La condición `if s > 500` debe ir al final de la comprensión.",
      "Aplica `round(s * 1.10, 2)` a la expresión inicial.",
      "El valor 500 exacto no entra porque la condición es estrictamente mayor."
    ]
  },
  {
    "id": "py-04",
    "module": "python",
    "title": "Diccionarios: acceso seguro con .get()",
    "difficulty": 1,
    "concepts": [
      "diccionarios",
      "get",
      "valores por defecto",
      "missing data"
    ],
    "session": 1,
    "tag": "dicts",
    "estimatedMinutes": 5,
    "dataset": "inline",
    "theory_md": "### Acceso seguro a Diccionarios\nAcceder a una clave inexistente con `d[k]` lanza un error `KeyError`.\nEl método `.get(key, default)` devuelve el valor asociado o un valor de respaldo sin lanzar excepciones:\n```python\nprecios = {\"leche\": 32.0, \"arroz\": 18.5}\ncosto = precios.get(\"frijoles\", 0.0) # Devuelve 0.0 en vez de KeyError\n```",
    "prompt_md": "Dado el catálogo de precios `precios` y la lista de compras solicitada `pedidos`, calcula el costo total de la compra en la variable `result` (tipo float). Si un artículo no existe en el catálogo, su precio debe asumirse en `0.0`.",
    "setup_code": "precios = {\"arroz\": 20.0, \"frijoles\": 35.0, \"aceite\": 65.0, \"azucar\": 18.0}\npedidos = [\"arroz\", \"carne\", \"frijoles\", \"aceite\", \"pan\", \"arroz\"]",
    "starter_code": "precios = {\"arroz\": 20.0, \"frijoles\": 35.0, \"aceite\": 65.0, \"azucar\": 18.0}\npedidos = [\"arroz\", \"carne\", \"frijoles\", \"aceite\", \"pan\", \"arroz\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el total de pedidos usando precios.get()\nresult = 0.0\n",
    "solution_code": "result = sum(precios.get(item, 0.0) for item in pedidos)",
    "tests": [
      {
        "name": "result es de tipo numérico",
        "check": "isinstance(result, (int, float))",
        "hint": "result debe ser un número."
      },
      {
        "name": "Total acumulado correcto",
        "check": "abs(result - 140.0) < 1e-5",
        "hint": "Esperaba 140.0 (arroz 20 + 0 + frijoles 35 + aceite 65 + 0 + arroz 20)."
      }
    ],
    "hints": [
      "Puedes iterar con un for sobre `pedidos` o usar `sum(...)`.",
      "Para cada `item` en `pedidos`, suma `precios.get(item, 0.0)`."
    ]
  },
  {
    "id": "py-05",
    "module": "python",
    "title": "Contador de frecuencias manual con diccionario",
    "difficulty": 2,
    "concepts": [
      "diccionarios",
      "conteo",
      "frecuencias",
      "EDA"
    ],
    "session": 1,
    "tag": "dicts",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Conteo de Frecuencias\nAntes de usar `value_counts()` de pandas, el conteo manual con diccionarios es un patrón fundamental para comprender cómo se agrupan datos categóricos:\n```python\nconteo = {}\nfor x in coleccion:\n    conteo[x] = conteo.get(x, 0) + 1\n```",
    "prompt_md": "Dada la lista de diagnósticos médicos `diagnosticos`, construye en la variable `result` un diccionario donde las claves sean los nombres de diagnóstico y los valores sean la cantidad de veces que aparece cada uno.",
    "setup_code": "diagnosticos = [\n    \"Gripe\", \"COVID-19\", \"Gripe\", \"Asma\", \"COVID-19\",\n    \"Gripe\", \"Diabetes\", \"Asma\", \"Gripe\", \"COVID-19\"\n]",
    "starter_code": "diagnosticos = [\n    \"Gripe\", \"COVID-19\", \"Gripe\", \"Asma\", \"COVID-19\",\n    \"Gripe\", \"Diabetes\", \"Asma\", \"Gripe\", \"COVID-19\"\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Construye el diccionario de frecuencias en result\nresult = {}\n",
    "solution_code": "result = {}\nfor diag in diagnosticos:\n    result[diag] = result.get(diag, 0) + 1",
    "tests": [
      {
        "name": "result es un diccionario",
        "check": "isinstance(result, dict)",
        "hint": "result debe ser un dict."
      },
      {
        "name": "Frecuencia exacta de cada diagnóstico",
        "check": "result == {'Gripe': 4, 'COVID-19': 3, 'Asma': 2, 'Diabetes': 1}",
        "hint": "Esperaba {'Gripe': 4, 'COVID-19': 3, 'Asma': 2, 'Diabetes': 1}."
      }
    ],
    "hints": [
      "Inicializa `result = {}`.",
      "Itera sobre cada elemento: `result[diag] = result.get(diag, 0) + 1`."
    ]
  },
  {
    "id": "py-06",
    "module": "python",
    "title": "Aplanar una lista de listas (Flattening)",
    "difficulty": 2,
    "concepts": [
      "listas",
      "list comprehension",
      "aplanar",
      "bucles anidados"
    ],
    "session": 1,
    "tag": "indexing",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Comprensiones anidadas\nPara aplanar una matriz o lista de listas en una sola lista plana unidimensional:\n```python\nmatriz = [[1, 2], [3, 4], [5, 6]]\nplana = [elem for fila in matriz for elem in fila]\n# plana = [1, 2, 3, 4, 5, 6]\n```\nEl orden de los `for` dentro de la comprensión sigue el mismo orden que tendrían en bucles tradicionales anidados.",
    "prompt_md": "Dada la lista `lotes_muestras`, aplánala en la variable `result` creando una lista continua con todos los identificadores individuales.",
    "setup_code": "lotes_muestras = [\n    [\"M-101\", \"M-102\", \"M-103\"],\n    [\"M-104\", \"M-105\"],\n    [\"M-106\", \"M-107\", \"M-108\", \"M-109\"]\n]",
    "starter_code": "lotes_muestras = [\n    [\"M-101\", \"M-102\", \"M-103\"],\n    [\"M-104\", \"M-105\"],\n    [\"M-106\", \"M-107\", \"M-108\", \"M-109\"]\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Aplana lotes_muestras en la variable result\nresult = []\n",
    "solution_code": "result = [muestra for lote in lotes_muestras for muestra in lote]",
    "tests": [
      {
        "name": "result es una lista",
        "check": "isinstance(result, list)",
        "hint": "result debe ser una lista."
      },
      {
        "name": "Cantidad total de elementos",
        "check": "len(result) == 9",
        "hint": "La lista aplanada debe tener 9 elementos en total."
      },
      {
        "name": "Elementos en orden correcto",
        "check": "result == ['M-101', 'M-102', 'M-103', 'M-104', 'M-105', 'M-106', 'M-107', 'M-108', 'M-109']",
        "hint": "Los elementos deben coincidir secuencialmente."
      }
    ],
    "hints": [
      "Usa una comprensión: `[item for sublista in lotes_muestras for item in sublista]`.",
      "O bien usa un bucle for tradicional haciendo `.extend()` a la lista resultante."
    ]
  },
  {
    "id": "py-07",
    "module": "python",
    "title": "Unir dos listas con zip en un diccionario",
    "difficulty": 2,
    "concepts": [
      "zip",
      "diccionarios",
      "dict comprehension"
    ],
    "session": 1,
    "tag": "dicts",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### La función zip()\n`zip(iter1, iter2)` aparea elementos de dos o más iterables elemento a elemento:\n```python\ncolumnas = [\"nombre\", \"edad\", \"ciudad\"]\nfila = [\"Ana\", 28, \"León\"]\nregistro = dict(zip(columnas, fila))\n# {'nombre': 'Ana', 'edad': 28, 'ciudad': 'León'}\n```",
    "prompt_md": "Dadas las listas paralelas `municipios` y `poblaciones`, combina ambas en la variable `result` (un diccionario donde cada municipio es la clave y su población como entero es el valor). Excluye del diccionario final aquellos municipios cuya población sea inferior a 100,000 habitantes.",
    "setup_code": "municipios = [\"Managua\", \"León\", \"Granada\", \"Somoto\", \"Matagalpa\", \"Ocotal\"]\npoblaciones = [1050000, 210000, 130000, 40000, 160000, 48000]",
    "starter_code": "municipios = [\"Managua\", \"León\", \"Granada\", \"Somoto\", \"Matagalpa\", \"Ocotal\"]\npoblaciones = [1050000, 210000, 130000, 40000, 160000, 48000]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Crea el diccionario filtrado en result\nresult = {}\n",
    "solution_code": "result = {mun: pob for mun, pob in zip(municipios, poblaciones) if pob >= 100000}",
    "tests": [
      {
        "name": "result es un diccionario",
        "check": "isinstance(result, dict)",
        "hint": "result debe ser un dict."
      },
      {
        "name": "Filtro de población aplicado correctamente",
        "check": "result == {'Managua': 1050000, 'León': 210000, 'Granada': 130000, 'Matagalpa': 160000}",
        "hint": "Solo deben incluirse municipios con población >= 100,000."
      }
    ],
    "hints": [
      "Puedes usar un dict comprehension: `{mun: pob for mun, pob in zip(municipios, poblaciones) if pob >= 100000}`.",
      "Recuerda que Somoto (40,000) y Ocotal (48,000) deben quedar fuera."
    ]
  },
  {
    "id": "py-08",
    "module": "python",
    "title": "Función de media y desvío manual",
    "difficulty": 2,
    "concepts": [
      "funciones",
      "args por defecto",
      "estadística descriptiva"
    ],
    "session": 1,
    "tag": "functions",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Funciones y Agregaciones Básicas\nDefinir funciones matemáticas puras permite entender la base antes de invocar librerías:\n```python\ndef calcular_media(valores):\n    if not valores:\n        return 0.0\n    return sum(valores) / len(valores)\n```",
    "prompt_md": "Define una función `stats_resumen(numeros, redondeo=2)` que retorne una tupla con `(media, rango)`, donde `rango = maximo - minimo`. Ambos valores deben estar redondeados al número de decimales especificado por `redondeo`.\nLuego, calcula el resultado para la lista `muestras` y guárdalo en la variable `result`.",
    "setup_code": "muestras = [12.45, 15.60, 9.80, 22.10, 14.35, 18.90]",
    "starter_code": "muestras = [12.45, 15.60, 9.80, 22.10, 14.35, 18.90]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Define la función y calcula result\ndef stats_resumen(numeros, redondeo=2):\n    pass\nresult = None\n",
    "solution_code": "def stats_resumen(numeros, redondeo=2):\n    media = sum(numeros) / len(numeros)\n    rango = max(numeros) - min(numeros)\n    return (round(media, redondeo), round(rango, redondeo))\n\nresult = stats_resumen(muestras)",
    "tests": [
      {
        "name": "Existe la función stats_resumen",
        "check": "callable(stats_resumen)",
        "hint": "Debes definir la función stats_resumen."
      },
      {
        "name": "result es una tupla de dos valores",
        "check": "isinstance(result, tuple) and len(result) == 2",
        "hint": "result debe ser una tupla (media, rango)."
      },
      {
        "name": "Valores correctos de media y rango",
        "check": "result == (15.53, 12.3)",
        "hint": "Esperaba media=15.53 y rango=12.30 (22.10 - 9.80)."
      }
    ],
    "hints": [
      "`sum(muestras) / len(muestras)` da la media.",
      "`max(muestras) - min(muestras)` da el rango.",
      "Aplica `round(..., redondeo)` a cada uno."
    ]
  },
  {
    "id": "py-09",
    "module": "python",
    "title": "Ordenar lista de diccionarios con sorted y key",
    "difficulty": 2,
    "concepts": [
      "sorted",
      "lambda",
      "ordenamiento",
      "estructuras"
    ],
    "session": 1,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Ordenamiento por clave personalizada\nLa función `sorted(iterable, key=lambda x: ..., reverse=True/False)` ordena elementos según el criterio de la función `key`:\n```python\npersonas = [{'nombre': 'Luis', 'edad': 30}, {'nombre': 'Ana', 'edad': 22}]\nordenadas = sorted(personas, key=lambda p: p['edad'])\n```",
    "prompt_md": "Dada la lista `estudiantes`, ordénala en la variable `result` de **mayor a menor nota** (descendente). En caso de empate en la nota, debe mantenerse el orden alfabético por nombre (ascendente).",
    "setup_code": "estudiantes = [\n    {\"nombre\": \"Carlos\", \"nota\": 85},\n    {\"nombre\": \"Beatriz\", \"nota\": 92},\n    {\"nombre\": \"Alberto\", \"nota\": 85},\n    {\"nombre\": \"Diana\", \"nota\": 78},\n    {\"nombre\": \"Elena\", \"nota\": 92}\n]",
    "starter_code": "estudiantes = [\n    {\"nombre\": \"Carlos\", \"nota\": 85},\n    {\"nombre\": \"Beatriz\", \"nota\": 92},\n    {\"nombre\": \"Alberto\", \"nota\": 85},\n    {\"nombre\": \"Diana\", \"nota\": 78},\n    {\"nombre\": \"Elena\", \"nota\": 92}\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Ordena la lista en result usando sorted() con key\nresult = []\n",
    "solution_code": "result = sorted(estudiantes, key=lambda x: (-x[\"nota\"], x[\"nombre\"]))",
    "tests": [
      {
        "name": "result es una lista",
        "check": "isinstance(result, list)",
        "hint": "result debe ser una lista."
      },
      {
        "name": "Orden correcto por nota descendente y nombre ascendente",
        "check": "[e['nombre'] for e in result] == ['Beatriz', 'Elena', 'Alberto', 'Carlos', 'Diana']",
        "hint": "Revisa la tupla de ordenamiento: (-x['nota'], x['nombre'])."
      }
    ],
    "hints": [
      "Para invertir una clave numérica en una tupla, puedes usar el signo negativo: `-x['nota']`.",
      "La tupla `(-x['nota'], x['nombre'])` ordena primero por nota desc y luego nombre asc."
    ]
  },
  {
    "id": "py-10",
    "module": "python",
    "title": "Bucketizar o categorizar valores numéricos",
    "difficulty": 2,
    "concepts": [
      "condicionales",
      "funciones",
      "categorizacion",
      "feature engineering"
    ],
    "session": 1,
    "tag": "functions",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Discretización manual (Binning)\nSegmentar variables continuas en categorías discretas es una tarea común en preprocesamiento:\n```python\ndef clasificar_temperatura(temp):\n    if temp < 15:\n        return \"Frio\"\n    elif temp <= 28:\n        return \"Templado\"\n    else:\n        return \"Calido\"\n```",
    "prompt_md": "Dada la lista de edades `edades_pacientes`, crea en la variable `result` una lista con la categoría de cada paciente siguiendo estas reglas:\n- Menor a 18: `\"Pediatrico\"`\n- Entre 18 y 59 (inclusive): `\"Adulto\"`\n- 60 o más: `\"Adulto Mayor\"`",
    "setup_code": "edades_pacientes = [8, 18, 45, 60, 72, 17, 33, 59, 81]",
    "starter_code": "edades_pacientes = [8, 18, 45, 60, 72, 17, 33, 59, 81]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Genera la lista de categorías en result\nresult = []\n",
    "solution_code": "def categorizar(edad):\n    if edad < 18:\n        return \"Pediatrico\"\n    elif edad <= 59:\n        return \"Adulto\"\n    else:\n        return \"Adulto Mayor\"\n\nresult = [categorizar(e) for e in edades_pacientes]",
    "tests": [
      {
        "name": "result contiene 9 elementos",
        "check": "isinstance(result, list) and len(result) == 9",
        "hint": "result debe ser una lista de 9 categorías."
      },
      {
        "name": "Categorías asignadas correctamente según umbrales",
        "check": "result == ['Pediatrico', 'Adulto', 'Adulto', 'Adulto Mayor', 'Adulto Mayor', 'Pediatrico', 'Adulto', 'Adulto', 'Adulto Mayor']",
        "hint": "Verifica los límites: 18 es Adulto, 59 es Adulto, 60 es Adulto Mayor."
      }
    ],
    "hints": [
      "Define una función auxiliar o usa expresiones if/else anidadas.",
      "Aplica la función sobre cada edad en una comprensión de lista."
    ]
  },
  {
    "id": "py-11",
    "module": "python",
    "title": "Extracción y limpieza de texto: '12.5 kg'",
    "difficulty": 2,
    "concepts": [
      "strings",
      "parsing",
      "split",
      "casting",
      "limpieza"
    ],
    "session": 1,
    "tag": "strings",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Parseo de cadenas con unidades\nCon frecuencia los datos en crudo traen unidades pegadas a los números:\n```python\nraw = \" 14.80 USD \"\nnumero = float(raw.strip().replace(\"USD\", \"\")) # 14.8\n```\nEl método `.split()` o `.strip()` permite aislar el valor numérico.",
    "prompt_md": "Dada la lista de pesos brutos `pesos_crudos`, extrae únicamente los valores numéricos convertidos a `float` en la variable `result`.\nIgnora la unidad (`\"kg\"`, `\"KG\"`, espacios) y omite cualquier registro que sea nulo (`None`) o vacío (`\"\"`).",
    "setup_code": "pesos_crudos = [\"12.5 kg\", \" 8.2KG \", \"\", \"45.0 kg\", None, \"100.25 kg\", \"   \"]",
    "starter_code": "pesos_crudos = [\"12.5 kg\", \" 8.2KG \", \"\", \"45.0 kg\", None, \"100.25 kg\", \"   \"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Limpia y extrae los floats en la variable result\nresult = []\n",
    "solution_code": "result = []\nfor p in pesos_crudos:\n    if p and p.strip():\n        val = p.lower().replace(\"kg\", \"\").strip()\n        result.append(float(val))",
    "tests": [
      {
        "name": "result es una lista de floats",
        "check": "isinstance(result, list) and all(isinstance(x, float) for x in result)",
        "hint": "result debe contener únicamente números flotantes."
      },
      {
        "name": "Valores numéricos parseados correctamente",
        "check": "result == [12.5, 8.2, 45.0, 100.25]",
        "hint": "Esperaba [12.5, 8.2, 45.0, 100.25]."
      }
    ],
    "hints": [
      "Verifica primero si `p is not None and p.strip() != ''`.",
      "Usa `.lower().replace('kg', '').strip()` para aislar el número antes de `float()`."
    ]
  },
  {
    "id": "py-12",
    "module": "python",
    "title": "CSV mental 1: Parsear texto delimitado por comas",
    "difficulty": 2,
    "concepts": [
      "csv sin pandas",
      "split",
      "listas",
      "parsing"
    ],
    "session": 2,
    "tag": "strings",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Un archivo CSV en memoria\nUn archivo CSV es texto con saltos de línea (`\\n`) y separadores de campos (`,`).\nEntender cómo procesar un CSV con Python estándar afianza la comprensión de lo que hace `pd.read_csv()`:\n```python\nlineas = texto_csv.strip().split(\"\\n\")\nencabezados = lineas[0].split(\",\")\nfilas = [linea.split(\",\") for linea in lineas[1:]]\n```",
    "prompt_md": "Dado el string `csv_data` que simula un archivo CSV de pacientes, conviértelo en la variable `result`: una lista de diccionarios, donde cada fila es un diccionario con claves dadas por el encabezado (`\"id\"`, `\"edad\"`, `\"ciudad\"`). Convierte el campo `edad` a entero (`int`).",
    "setup_code": "csv_data = \"\"\"id,edad,ciudad\nP01,24,Managua\nP02,45,Leon\nP03,19,Granada\nP04,52,Matagalpa\"\"\"",
    "starter_code": "csv_data = \"\"\"id,edad,ciudad\nP01,24,Managua\nP02,45,Leon\nP03,19,Granada\nP04,52,Matagalpa\"\"\"\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Procesa csv_data y crea la lista de dicts en result\nresult = []\n",
    "solution_code": "lineas = csv_data.strip().split(\"\\n\")\nheaders = lineas[0].split(\",\")\nresult = []\nfor l in lineas[1:]:\n    partes = l.split(\",\")\n    row_dict = {\n        headers[0]: partes[0],\n        headers[1]: int(partes[1]),\n        headers[2]: partes[2]\n    }\n    result.append(row_dict)",
    "tests": [
      {
        "name": "result contiene 4 registros",
        "check": "isinstance(result, list) and len(result) == 4",
        "hint": "La lista debe contener las 4 filas de datos (sin el encabezado)."
      },
      {
        "name": "Estructura de diccionarios y tipos de datos correctos",
        "check": "result[1] == {'id': 'P02', 'edad': 45, 'ciudad': 'Leon'}",
        "hint": "Verifica que las claves sean 'id', 'edad', 'ciudad' y que edad sea entero."
      }
    ],
    "hints": [
      "Separa con `.strip().split('\\n')` para obtener cada renglón.",
      "El primer renglón contiene los nombres de las columnas.",
      "Usa `int(partes[1])` para convertir la edad."
    ]
  },
  {
    "id": "py-13",
    "module": "python",
    "title": "CSV mental 2: Agrupación manual (Group By con dict)",
    "difficulty": 3,
    "concepts": [
      "groupby manual",
      "diccionarios",
      "agregacion",
      "csv mental"
    ],
    "session": 2,
    "tag": "dicts",
    "estimatedMinutes": 8,
    "dataset": "inline",
    "theory_md": "### Group By manual con defaultdict o dict\nPara agrupar elementos bajo una misma clave en Python estándar:\n```python\ngrupos = {}\nfor item in registros:\n    clave = item[\"departamento\"]\n    if clave not in grupos:\n        grupos[clave] = []\n    grupos[clave].append(item[\"valor\"])\n```",
    "prompt_md": "Dada la lista de consultas médicas `consultas`, calcula en la variable `result` un diccionario con el **gasto promedio por municipio**, redondeado a 1 decimal:\nFormato: `{\"Municipio\": promedio_gasto}`.",
    "setup_code": "consultas = [\n    {\"municipio\": \"Managua\", \"costo\": 500.0},\n    {\"municipio\": \"Leon\", \"costo\": 350.0},\n    {\"municipio\": \"Managua\", \"costo\": 650.0},\n    {\"municipio\": \"Granada\", \"costo\": 400.0},\n    {\"municipio\": \"Leon\", \"costo\": 450.0},\n    {\"municipio\": \"Managua\", \"costo\": 575.0}\n]",
    "starter_code": "consultas = [\n    {\"municipio\": \"Managua\", \"costo\": 500.0},\n    {\"municipio\": \"Leon\", \"costo\": 350.0},\n    {\"municipio\": \"Managua\", \"costo\": 650.0},\n    {\"municipio\": \"Granada\", \"costo\": 400.0},\n    {\"municipio\": \"Leon\", \"costo\": 450.0},\n    {\"municipio\": \"Managua\", \"costo\": 575.0}\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Agrupa por municipio y calcula el promedio en result\nresult = {}\n",
    "solution_code": "acum = {}\nfor c in consultas:\n    m = c[\"municipio\"]\n    if m not in acum:\n        acum[m] = []\n    acum[m].append(c[\"costo\"])\n\nresult = {m: round(sum(v) / len(v), 1) for m, v in acum.items()}",
    "tests": [
      {
        "name": "result es un diccionario con 3 municipios",
        "check": "isinstance(result, dict) and len(result) == 3",
        "hint": "Debe contener los 3 municipios únicos: Managua, Leon y Granada."
      },
      {
        "name": "Promedios correctos calculados",
        "check": "result == {'Managua': 575.0, 'Leon': 400.0, 'Granada': 400.0}",
        "hint": "Managua=(500+650+575)/3=575.0; Leon=(350+450)/2=400.0; Granada=400.0."
      }
    ],
    "hints": [
      "Acumula las listas de costos en un diccionario temporal `{m: [costos...]}`.",
      "Luego crea `result` con una comprensión: `{m: round(sum(vals)/len(vals), 1) for m, vals in acum.items()}`."
    ]
  },
  {
    "id": "py-14",
    "module": "python",
    "title": "Manejo de excepciones: KeyError y valores ausentes",
    "difficulty": 2,
    "concepts": [
      "try/except",
      "KeyError",
      "robusted de datos"
    ],
    "session": 2,
    "tag": "functions",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Diagnóstico de KeyError y try/except\nUn `KeyError` ocurre al buscar una clave que no existe en un diccionario.\nEn pipelines de ingestión de datos heterogéneos, podemos atrapar excepciones de forma selectiva:\n```python\ntry:\n    valor = registro[\"telefono\"]\nexcept KeyError:\n    valor = \"NO_REGISTRADO\"\n```",
    "prompt_md": "Dada una lista de perfiles de clientes `clientes`, algunos carecen de la clave `\"telefono\"` o `\"email\"`.\nConstruye en la variable `result` una lista de diccionarios donde cada registro tenga garantizadas las claves `\"id\"`, `\"nombre\"`, `\"telefono\"` y `\"email\"`.\nSi falta `telefono`, ponle `\"Sin Teléfono\"`; si falta `email`, ponle `\"Sin Email\"`.",
    "setup_code": "clientes = [\n    {\"id\": 1, \"nombre\": \"Marta\", \"telefono\": \"8888-1111\", \"email\": \"marta@mail.com\"},\n    {\"id\": 2, \"nombre\": \"Ramon\", \"telefono\": \"7777-2222\"},\n    {\"id\": 3, \"nombre\": \"Sonia\", \"email\": \"sonia@mail.com\"},\n    {\"id\": 4, \"nombre\": \"Felipe\"}\n]",
    "starter_code": "clientes = [\n    {\"id\": 1, \"nombre\": \"Marta\", \"telefono\": \"8888-1111\", \"email\": \"marta@mail.com\"},\n    {\"id\": 2, \"nombre\": \"Ramon\", \"telefono\": \"7777-2222\"},\n    {\"id\": 3, \"nombre\": \"Sonia\", \"email\": \"sonia@mail.com\"},\n    {\"id\": 4, \"nombre\": \"Felipe\"}\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Normaliza cada registro en result\nresult = []\n",
    "solution_code": "result = []\nfor c in clientes:\n    normalizado = {\n        \"id\": c[\"id\"],\n        \"nombre\": c[\"nombre\"],\n        \"telefono\": c.get(\"telefono\", \"Sin Teléfono\"),\n        \"email\": c.get(\"email\", \"Sin Email\")\n    }\n    result.append(normalizado)",
    "tests": [
      {
        "name": "result contiene 4 registros completos",
        "check": "len(result) == 4 and all(set(r.keys()) == {'id', 'nombre', 'telefono', 'email'} for r in result)",
        "hint": "Todos los registros deben tener las 4 claves especificadas."
      },
      {
        "name": "Valores por defecto aplicados a clientes incompletos",
        "check": "result[3] == {'id': 4, 'nombre': 'Felipe', 'telefono': 'Sin Teléfono', 'email': 'Sin Email'}",
        "hint": "Verifica el caso de Felipe (id 4)."
      }
    ],
    "hints": [
      "Puedes usar `.get('telefono', 'Sin Teléfono')` o bloques `try/except KeyError`.",
      "Asegúrate de no modificar la lista original."
    ]
  },
  {
    "id": "py-15",
    "module": "python",
    "title": "Filtrar diccionarios con múltiples condiciones",
    "difficulty": 2,
    "concepts": [
      "filtrado",
      "condicionales",
      "None",
      "comparaciones"
    ],
    "session": 2,
    "tag": "warmup",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Comparaciones con None y Valores Lógicos\nEn Python, los valores nulos se representan con el singleton `None`.\nPara evaluarlos siempre usamos el operador de identidad: `x is None` o `x is not None`.\n```python\nif registro[\"salario\"] is not None and registro[\"salario\"] > 0:\n    procesar(registro)\n```",
    "prompt_md": "Dada la lista `encuestados`, filtra en la variable `result` únicamente a las personas que cumplan **todas** estas condiciones:\n1. `edad >= 18`\n2. `ingreso is not None`\n3. `ingreso >= 10000.0`\n4. `ocupado == True`",
    "setup_code": "encuestados = [\n    {\"id\": 1, \"edad\": 25, \"ocupado\": True, \"ingreso\": 14000.0},\n    {\"id\": 2, \"edad\": 17, \"ocupado\": True, \"ingreso\": 12000.0},\n    {\"id\": 3, \"edad\": 34, \"ocupado\": False, \"ingreso\": 0.0},\n    {\"id\": 4, \"edad\": 42, \"ocupado\": True, \"ingreso\": None},\n    {\"id\": 5, \"edad\": 29, \"ocupado\": True, \"ingreso\": 9500.0},\n    {\"id\": 6, \"edad\": 50, \"ocupado\": True, \"ingreso\": 21000.0}\n]",
    "starter_code": "encuestados = [\n    {\"id\": 1, \"edad\": 25, \"ocupado\": True, \"ingreso\": 14000.0},\n    {\"id\": 2, \"edad\": 17, \"ocupado\": True, \"ingreso\": 12000.0},\n    {\"id\": 3, \"edad\": 34, \"ocupado\": False, \"ingreso\": 0.0},\n    {\"id\": 4, \"edad\": 42, \"ocupado\": True, \"ingreso\": None},\n    {\"id\": 5, \"edad\": 29, \"ocupado\": True, \"ingreso\": 9500.0},\n    {\"id\": 6, \"edad\": 50, \"ocupado\": True, \"ingreso\": 21000.0}\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Filtra los registros en result\nresult = []\n",
    "solution_code": "result = [\n    e for e in encuestados\n    if e[\"edad\"] >= 18\n    and e[\"ingreso\"] is not None\n    and e[\"ingreso\"] >= 10000.0\n    and e[\"ocupado\"] is True\n]",
    "tests": [
      {
        "name": "result contiene exactamente 2 personas que cumplen todo",
        "check": "isinstance(result, list) and len(result) == 2",
        "hint": "Solo 2 personas cumplen las 4 condiciones."
      },
      {
        "name": "IDs correctos seleccionados (1 y 6)",
        "check": "[e['id'] for e in result] == [1, 6]",
        "hint": "Deben ser los registros con id 1 y 6."
      }
    ],
    "hints": [
      "Asegúrate de evaluar `e['ingreso'] is not None` antes de comparar `e['ingreso'] >= 10000.0`.",
      "El encuestado 2 tiene 17 años (falla condición de edad).",
      "El encuestado 5 tiene 9500 (falla condición de ingreso)."
    ]
  },
  {
    "id": "py-16",
    "module": "python",
    "title": "Simular un Anti-Join con conjuntos (sets)",
    "difficulty": 2,
    "concepts": [
      "sets",
      "diferencia de conjuntos",
      "anti-join mental"
    ],
    "session": 2,
    "tag": "dicts",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Conjuntos (Sets) y Operaciones de Pertenencia\nLos sets en Python tienen tiempo de búsqueda (O(1)).\nLa diferencia de conjuntos (`set_a - set_b`) encuentra elementos presentes en A que no existen en B:\n```python\nregistrados = {\"USR-1\", \"USR-2\", \"USR-3\"}\nactivos = {\"USR-2\"}\ninactivos = registrados - activos # {\"USR-1\", \"USR-3\"}\n```",
    "prompt_md": "Dadas las listas `id_pacientes_cita` (pacientes que agendaron cita) e `id_pacientes_asistieron` (los que efectivamente se presentaron), obtén en la variable `result` una **lista ordenada alfabéticamente** con los IDs de los pacientes que faltaron a su cita (los que agendaron pero no asistieron).",
    "setup_code": "id_pacientes_cita = [\"PAC-01\", \"PAC-02\", \"PAC-03\", \"PAC-04\", \"PAC-05\", \"PAC-06\"]\nid_pacientes_asistieron = [\"PAC-02\", \"PAC-04\", \"PAC-06\"]",
    "starter_code": "id_pacientes_cita = [\"PAC-01\", \"PAC-02\", \"PAC-03\", \"PAC-04\", \"PAC-05\", \"PAC-06\"]\nid_pacientes_asistieron = [\"PAC-02\", \"PAC-04\", \"PAC-06\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Encuentra los faltantes y ordénalos en result\nresult = []\n",
    "solution_code": "result = sorted(list(set(id_pacientes_cita) - set(id_pacientes_asistieron)))",
    "tests": [
      {
        "name": "result es una lista ordenada",
        "check": "isinstance(result, list)",
        "hint": "result debe ser una lista."
      },
      {
        "name": "Identificadores exactos de pacientes ausentes",
        "check": "result == ['PAC-01', 'PAC-03', 'PAC-05']",
        "hint": "Esperaba ['PAC-01', 'PAC-03', 'PAC-05']."
      }
    ],
    "hints": [
      "Convierte ambas listas a `set()`.",
      "Usa el operador de diferencia `-`.",
      "Usa `sorted()` para devolver una lista ordenada."
    ]
  },
  {
    "id": "py-17",
    "module": "python",
    "title": "Parsear fechas sin librerías externas",
    "difficulty": 2,
    "concepts": [
      "strings",
      "fechas",
      "split",
      "formato"
    ],
    "session": 2,
    "tag": "strings",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Normalización de formatos de fecha\nEn datos heterogéneos es común encontrar fechas en formato latino (`DD/MM/YYYY`) que deben convertirse al estándar ISO (`YYYY-MM-DD`):\n```python\nfecha_latina = \"15/09/2023\"\nd, m, y = fecha_latina.split(\"/\")\niso = f\"{y}-{m}-{d}\"\n```",
    "prompt_md": "Dada la lista de fechas mixtas `fechas_raw`, estandarízalas en la variable `result` al formato ISO `\"YYYY-MM-DD\"`.\nSi la fecha ya viene en formato ISO (`\"-\"` como separador), mantenla igual. Si viene separada por `\"/\"` (`DD/MM/YYYY`), inviértela a `YYYY-MM-DD`. Asegúrate de que días y meses tengan 2 dígitos.",
    "setup_code": "fechas_raw = [\"2023-05-12\", \"04/11/2022\", \"2021-12-01\", \"25/01/2023\"]",
    "starter_code": "fechas_raw = [\"2023-05-12\", \"04/11/2022\", \"2021-12-01\", \"25/01/2023\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Normaliza las fechas a formato YYYY-MM-DD en result\nresult = []\n",
    "solution_code": "result = []\nfor f in fechas_raw:\n    if \"/\" in f:\n        d, m, y = f.split(\"/\")\n        result.append(f\"{y}-{int(m):02d}-{int(d):02d}\")\n    else:\n        result.append(f)",
    "tests": [
      {
        "name": "result contiene 4 fechas",
        "check": "isinstance(result, list) and len(result) == 4",
        "hint": "result debe contener las 4 fechas normalizadas."
      },
      {
        "name": "Todas las fechas están en formato YYYY-MM-DD",
        "check": "result == ['2023-05-12', '2022-11-04', '2021-12-01', '2023-01-25']",
        "hint": "Esperaba ['2023-05-12', '2022-11-04', '2021-12-01', '2023-01-25']."
      }
    ],
    "hints": [
      "Verifica si `'/' in f`.",
      "Si tiene barra, haz `d, m, y = f.split('/')` y reconstruye con f-string `f'{y}-{m}-{d}'`."
    ]
  },
  {
    "id": "py-18",
    "module": "python",
    "title": "Generar clave compuesta y detectar duplicados",
    "difficulty": 2,
    "concepts": [
      "tuplas",
      "duplicados",
      "integridad de datos"
    ],
    "session": 2,
    "tag": "dicts",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Detección de duplicados con llaves compuestas\nEn bases de datos, cuando no existe un ID único confiable, se usa una tupla como clave compuesta: `(nombre, fecha_nacimiento)`.\nLas tuplas son inmutables y por ende `hashable` (pueden ser claves de dict o miembros de set):\n```python\nvistos = set()\nfor r in registros:\n    clave = (r[\"nombre\"], r[\"fecha\"])\n    if clave in vistos:\n        print(\"Duplicado!\")\n    vistos.add(clave)\n```",
    "prompt_md": "Dada la lista `transacciones`, identifica las transacciones duplicadas basándote en la combinación de `(\"usuario\", \"monto\", \"fecha\")`.\nGuarda en la variable `result` únicamente la lista de los IDs de aquellas transacciones que son una **segunda o posterior aparición** (es decir, los duplicados que deben descartarse).",
    "setup_code": "transacciones = [\n    {\"id\": \"TX-1\", \"usuario\": \"U10\", \"monto\": 100, \"fecha\": \"2023-01-01\"},\n    {\"id\": \"TX-2\", \"usuario\": \"U20\", \"monto\": 250, \"fecha\": \"2023-01-01\"},\n    {\"id\": \"TX-3\", \"usuario\": \"U10\", \"monto\": 100, \"fecha\": \"2023-01-01\"}, # Duplicado de TX-1\n    {\"id\": \"TX-4\", \"usuario\": \"U30\", \"monto\": 400, \"fecha\": \"2023-01-02\"},\n    {\"id\": \"TX-5\", \"usuario\": \"U20\", \"monto\": 250, \"fecha\": \"2023-01-01\"}  # Duplicado de TX-2\n]",
    "starter_code": "transacciones = [\n    {\"id\": \"TX-1\", \"usuario\": \"U10\", \"monto\": 100, \"fecha\": \"2023-01-01\"},\n    {\"id\": \"TX-2\", \"usuario\": \"U20\", \"monto\": 250, \"fecha\": \"2023-01-01\"},\n    {\"id\": \"TX-3\", \"usuario\": \"U10\", \"monto\": 100, \"fecha\": \"2023-01-01\"}, # Duplicado de TX-1\n    {\"id\": \"TX-4\", \"usuario\": \"U30\", \"monto\": 400, \"fecha\": \"2023-01-02\"},\n    {\"id\": \"TX-5\", \"usuario\": \"U20\", \"monto\": 250, \"fecha\": \"2023-01-01\"}  # Duplicado de TX-2\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Identifica los IDs duplicados en result\nresult = []\n",
    "solution_code": "vistos = set()\nresult = []\nfor tx in transacciones:\n    clave = (tx[\"usuario\"], tx[\"monto\"], tx[\"fecha\"])\n    if clave in vistos:\n        result.append(tx[\"id\"])\n    else:\n        vistos.add(clave)",
    "tests": [
      {
        "name": "result contiene los IDs duplicados",
        "check": "result == ['TX-3', 'TX-5']",
        "hint": "Esperaba ['TX-3', 'TX-5']."
      }
    ],
    "hints": [
      "Usa un conjunto `vistos = set()`.",
      "Para cada transacción, genera la tupla `(tx['usuario'], tx['monto'], tx['fecha'])`.",
      "Si ya está en `vistos`, agrega `tx['id']` a `result`; de lo contrario agrégala a `vistos`."
    ]
  },
  {
    "id": "py-19",
    "module": "python",
    "title": "Cálculo de percentiles a mano (Nearest Rank)",
    "difficulty": 3,
    "concepts": [
      "estadistica",
      "ordenamiento",
      "percentiles",
      "math"
    ],
    "session": 2,
    "tag": "math",
    "estimatedMinutes": 8,
    "dataset": "inline",
    "theory_md": "### Cálculo básico de percentiles\nPara hallar el percentil (P) de una lista de tamaño (N) mediante el método de rango más cercano (nearest rank):\n1. Ordenar la lista: (x_0, x_1, dots, x_{N-1}).\n2. Calcular el índice: (k = lceil \frac{P}{100} \times N \rceil - 1) (usando índice 0).\nPor ejemplo, para la mediana ((P=50)) en datos ordenados.",
    "prompt_md": "Escribe una función `calcular_mediana(numeros)` que devuelva la mediana exacta de una lista numérica.\n- Si la cantidad de elementos es impar, devuelve el valor central.\n- Si es par, devuelve el promedio de los dos valores centrales.\nCalcula la mediana de `datos_a` y guárdala en `result_a`, y la de `datos_b` en `result_b`. Asigna a `result = (result_a, result_b)`.",
    "setup_code": "datos_a = [15, 3, 9, 21, 7]         # Impar (ordenado: 3, 7, 9, 15, 21 -> mediana: 9)\ndatos_b = [10, 4, 18, 2, 8, 14]     # Par (ordenado: 2, 4, 8, 10, 14, 18 -> mediana: (8+10)/2 = 9.0)",
    "starter_code": "datos_a = [15, 3, 9, 21, 7]         # Impar (ordenado: 3, 7, 9, 15, 21 -> mediana: 9)\ndatos_b = [10, 4, 18, 2, 8, 14]     # Par (ordenado: 2, 4, 8, 10, 14, 18 -> mediana: (8+10)/2 = 9.0)\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Define calcular_mediana y calcula result = (result_a, result_b)\ndef calcular_mediana(numeros):\n    pass\nresult = None\n",
    "solution_code": "def calcular_mediana(numeros):\n    s = sorted(numeros)\n    n = len(s)\n    if n % 2 == 1:\n        return float(s[n // 2])\n    else:\n        return float((s[n // 2 - 1] + s[n // 2]) / 2.0)\n\nresult = (calcular_mediana(datos_a), calcular_mediana(datos_b))",
    "tests": [
      {
        "name": "result es una tupla con dos medianas",
        "check": "isinstance(result, tuple) and len(result) == 2",
        "hint": "result debe ser una tupla (mediana_a, mediana_b)."
      },
      {
        "name": "Valores exactos de las medianas calculadas",
        "check": "result == (9.0, 9.0)",
        "hint": "Esperaba (9.0, 9.0)."
      }
    ],
    "hints": [
      "Recuerda ordenar primero la lista con `sorted(numeros)`.",
      "Para longitud impar `n`, el centro es `n // 2`.",
      "Para longitud par, promedia los índices `n//2 - 1` y `n//2`."
    ]
  },
  {
    "id": "py-20",
    "module": "python",
    "title": "Transformar estructura: De lista de dicts a dict de columnas",
    "difficulty": 2,
    "concepts": [
      "estructuras",
      "columnar",
      "dataframes base"
    ],
    "session": 2,
    "tag": "dicts",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Formato Orientado a Filas vs Columnas\nEn Python, los datos pueden estructurarse:\n- Por filas: `[{'a': 1, 'b': 2}, {'a': 3, 'b': 4}]` (como listas de dicts o JSON).\n- Por columnas: `{'a': [1, 3], 'b': [2, 4]}` (la estructura interna de pandas DataFrame).",
    "prompt_md": "Dada la lista de filas `filas_estudiantes`, transfórmala en la variable `result` a un diccionario de columnas con las claves `\"id\"`, `\"nombre\"` y `\"nota\"`, donde cada valor sea una lista con todos los valores de esa columna en orden.",
    "setup_code": "filas_estudiantes = [\n    {\"id\": 101, \"nombre\": \"Laura\", \"nota\": 88},\n    {\"id\": 102, \"nombre\": \"Marcos\", \"nota\": 94},\n    {\"id\": 103, \"nombre\": \"Sofía\", \"nota\": 76}\n]",
    "starter_code": "filas_estudiantes = [\n    {\"id\": 101, \"nombre\": \"Laura\", \"nota\": 88},\n    {\"id\": 102, \"nombre\": \"Marcos\", \"nota\": 94},\n    {\"id\": 103, \"nombre\": \"Sofía\", \"nota\": 76}\n]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Transforma a diccionario de columnas en result\nresult = {}\n",
    "solution_code": "result = {\n    \"id\": [r[\"id\"] for r in filas_estudiantes],\n    \"nombre\": [r[\"nombre\"] for r in filas_estudiantes],\n    \"nota\": [r[\"nota\"] for r in filas_estudiantes]\n}",
    "tests": [
      {
        "name": "result tiene las tres columnas como claves",
        "check": "isinstance(result, dict) and set(result.keys()) == {'id', 'nombre', 'nota'}",
        "hint": "El dict debe tener exactamente las claves 'id', 'nombre' y 'nota'."
      },
      {
        "name": "Columnas con listas completas de valores",
        "check": "result['id'] == [101, 102, 103] and result['nota'] == [88, 94, 76]",
        "hint": "Cada columna debe ser una lista con sus valores respectivos."
      }
    ],
    "hints": [
      "Puedes usar comprensiones de lista para cada clave: `'id': [r['id'] for r in filas_estudiantes]`.",
      "Verifica que el orden de los elementos coincida con el orden de las filas."
    ]
  },
  {
    "id": "py-21",
    "module": "python",
    "title": "Conversión segura de tipos con fallback",
    "difficulty": 2,
    "concepts": [
      "excepciones",
      "ValueError",
      "TypeError",
      "limpieza"
    ],
    "session": 2,
    "tag": "functions",
    "estimatedMinutes": 6,
    "dataset": "inline",
    "theory_md": "### Casteo seguro con funciones helper\nCuando limpiamos datos sucios, convertir strings con `float(x)` fallará si vienen valores corruptos como `\"N/A\"`, `\"null\"` o símbolos.\nUna función de conversión segura captura `(ValueError, TypeError)` y retorna un valor por defecto:\n```python\ndef safe_float(val, default=None):\n    try:\n        return float(val)\n    except (ValueError, TypeError):\n        return default\n```",
    "prompt_md": "Implementa la función `seguro_a_float(valor, por_defecto=0.0)`.\nAplica esta función sobre la lista de entradas sucias `entradas` y guarda la lista resultante de números en la variable `result`.",
    "setup_code": "entradas = [\"45.2\", \"12\", \"corrupto\", None, \"89.55\", \"N/A\", \"-3.5\"]",
    "starter_code": "entradas = [\"45.2\", \"12\", \"corrupto\", None, \"89.55\", \"N/A\", \"-3.5\"]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Define seguro_a_float y genera la lista limpia en result\ndef seguro_a_float(valor, por_defecto=0.0):\n    pass\nresult = []\n",
    "solution_code": "def seguro_a_float(valor, por_defecto=0.0):\n    try:\n        return float(valor)\n    except (ValueError, TypeError):\n        return por_defecto\n\nresult = [seguro_a_float(x) for x in entradas]",
    "tests": [
      {
        "name": "result contiene 7 elementos",
        "check": "isinstance(result, list) and len(result) == 7",
        "hint": "result debe contener un valor por cada entrada."
      },
      {
        "name": "Conversión con reemplazo de 0.0 en valores inválidos",
        "check": "result == [45.2, 12.0, 0.0, 0.0, 89.55, 0.0, -3.5]",
        "hint": "Esperaba [45.2, 12.0, 0.0, 0.0, 89.55, 0.0, -3.5]."
      }
    ],
    "hints": [
      "Dentro de `seguro_a_float`, usa un bloque `try:` con `return float(valor)`.",
      "En el `except (ValueError, TypeError):` devuelve `por_defecto`."
    ]
  },
  {
    "id": "py-22",
    "module": "python",
    "title": "Cuándo NO usar bucles for: vectorización mental",
    "difficulty": 3,
    "concepts": [
      "eficiencia",
      "for vs comprension",
      "vectorizacion mental"
    ],
    "session": 2,
    "tag": "performance",
    "estimatedMinutes": 7,
    "dataset": "inline",
    "theory_md": "### Bucles en Python vs Operaciones Vectorizadas\nEn Python puro, iterar 1 millón de veces con un bucle `for` toma cientos de milisegundos debido al overhead del intérprete.\nAunque en el siguiente módulo usaremos NumPy para vectorizar en C, con Python puro el uso de generadores, comprensiones y funciones built-in optimizadas (`sum`, `min`, `max`, `map`) es significativamente más rápido:\n```python\n# Lento:\ntotal = 0\nfor x in datos:\n    total += x * 2\n\n# Rápido y conciso:\ntotal = sum(x * 2 for x in datos)\n```",
    "prompt_md": "Dadas dos listas numéricas paralelas `cantidades` y `precios_unitarios`, calcula en la variable `result` el producto punto o facturación total ((sum cantidades_i \times precios_i)) en una **sola línea de código** utilizando `sum()` y `zip()`, sin escribir ningún bloque `for` explícito con dos puntos.",
    "setup_code": "cantidades = [10, 5, 2, 8, 15]\nprecios_unitarios = [12.5, 40.0, 150.0, 25.0, 18.0]",
    "starter_code": "cantidades = [10, 5, 2, 8, 15]\nprecios_unitarios = [12.5, 40.0, 150.0, 25.0, 18.0]\n\n# --- TU SOLUCIÓN A CONTINUACIÓN ---\n# TODO: Calcula el total en una sola línea sin bucles for explícitos\nresult = 0.0\n",
    "solution_code": "result = sum(c * p for c, p in zip(cantidades, precios_unitarios))",
    "tests": [
      {
        "name": "result es numérico",
        "check": "isinstance(result, (int, float))",
        "hint": "result debe ser un número."
      },
      {
        "name": "Producto punto calculado exactamente",
        "check": "abs(result - 1095.0) < 1e-5",
        "hint": "Esperaba 1095.0 (10*12.5 + 5*40 + 2*150 + 8*25 + 15*18)."
      }
    ],
    "hints": [
      "Apareja los elementos con `zip(cantidades, precios_unitarios)`.",
      "Pasa una expresión generadora a `sum(c * p for c, p in zip(...))`."
    ]
  }
];
