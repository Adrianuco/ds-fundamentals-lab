# Datasets de Fundamentos DS Lab

Este directorio contiene los archivos CSV locales utilizados en los ejercicios prácticos y en el Sandbox de la aplicación.
Pueden regenerarse en cualquier momento ejecutando `python3 generate_data.py` en la raíz del proyecto.

---

## 1. `pacientes.csv` (100 filas)
Simulación de registros de consultas médicas con irregularidades comunes del mundo real (fechas con formatos mixtos, costos monetarios con comas y valores faltantes).

| Columna | Tipo / Formato | Descripción | Reto de Limpieza / Particularidad |
|---|---|---|---|
| `id` | String (`PAC-XXX`) | Identificador único del paciente | Clave primaria |
| `municipio` | String | Municipio de procedencia | Se relaciona con `municipios.csv` |
| `sexo` | String (`F`, `M`) | Género del paciente | Categórica binaria |
| `edad` | Integer o nulo | Edad en años cumplidos | Contiene ~8% de valores nulos (vacíos) |
| `fecha_consulta`| String mixto | Fecha en que se realizó la consulta | Formatos mezclados: `YYYY-MM-DD` y `DD/MM/YYYY` |
| `diagnostico` | String | Condición diagnosticada | Categoría de diagnóstico médico |
| `costo` | String o Float | Costo de la atención en córdobas | Algunos valores mayores a 1000 contienen formato con comas (ej. `"1,250.50"`) |
| `seguro` | String o nulo | Tipo de cobertura médica | Opciones: `INSS`, `Privado`, `MINSA (Gratuito)` y nulos |

---

## 2. `municipios.csv` (15 filas)
Catálogo maestro de municipios con información demográfica para ejercicios de merge, joins y agregaciones per cápita.

| Columna | Tipo | Descripción |
|---|---|---|
| `municipio` | String | Nombre del municipio (clave foránea con `pacientes.csv`) |
| `departamento` | String | Departamento geográfico al que pertenece |
| `poblacion` | Integer | Número total de habitantes según censo |
| `zona` | String (`urbana`, `rural`) | Clasificación socioeconómica del municipio |

---

## 3. `encuesta_empleo.csv` (120 filas)
Muestra representativa de una encuesta de hogares y mercado laboral.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | String (`EMP-XXXX`) | Identificador de la persona encuestada |
| `sexo` | String (`F`, `M`) | Género |
| `edad` | Integer (18–65) | Edad del encuestado |
| `ocupado` | Integer (`0` o `1`) | Condición de ocupación laboral (1=Ocupado, 0=Desocupado) |
| `ingreso` | Float | Ingreso mensual reportado (0.0 si desocupado) |
| `horas` | Integer | Horas semanales habituales trabajadas (0 si desocupado) |
| `sector` | String | Sector económico (`Comercio`, `Servicios`, `Agricultura`, `Manufactura`, `Construcción`, `Tecnología`, `Desocupado`) |
| `anio` | Integer (`2022`, `2023`)| Año de la ronda de encuesta |

---

## 4. `ventas_tienda.csv` (150 filas)
Registro transaccional de ventas diarias en sucursales para análisis de series temporales simples, agrupaciones por categoría y métricas de facturación.

| Columna | Tipo | Descripción |
|---|---|---|
| `fecha` | String (`YYYY-MM-DD`) | Fecha de la transacción |
| `sku` | String (`SKU-XXX`) | Código único de producto |
| `categoria` | String | Categoría de producto (`Alimentos`, `Bebidas`, `Limpieza`, `Cuidado Personal`, `Tecnología`) |
| `unidades` | Integer (1–15) | Cantidad de unidades vendidas en la transacción |
| `precio` | Float | Precio unitario aplicado a la venta |
| `tienda` | String | Sucursal de la venta (`Central`, `Norte`, `Sur`, `Occidente`) |
