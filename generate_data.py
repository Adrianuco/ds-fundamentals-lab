#!/usr/bin/env python3
"""
generate_data.py
Genera los datasets de práctica para Fundamentos DS Lab de forma reproducible.
Crea archivos CSV en public/data/.
"""

import os
import random
import csv
from datetime import date, timedelta

random.seed(42)

DATA_DIR = os.path.join(os.path.dirname(__file__), "public", "data")
os.makedirs(DATA_DIR, exist_ok=True)

# 1. municipios.csv
def generate_municipios():
    municipios = [
        ("Managua", "Managua", 1050000, "urbana"),
        ("León", "León", 210000, "urbana"),
        ("Granada", "Granada", 130000, "urbana"),
        ("Matagalpa", "Matagalpa", 160000, "urbana"),
        ("Estelí", "Estelí", 135000, "urbana"),
        ("Masaya", "Masaya", 175000, "urbana"),
        ("Chinandega", "Chinandega", 140000, "urbana"),
        ("Juigalpa", "Chontales", 65000, "rural"),
        ("Somoto", "Madriz", 40000, "rural"),
        ("Rivas", "Rivas", 55000, "rural"),
        ("San Carlos", "Río San Juan", 52000, "rural"),
        ("Jinotega", "Jinotega", 145000, "rural"),
        ("Boaco", "Boaco", 62000, "rural"),
        ("Ocotal", "Nueva Segovia", 48000, "rural"),
        ("Bluefields", "RACCS", 60000, "rural")
    ]
    filepath = os.path.join(DATA_DIR, "municipios.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["municipio", "departamento", "poblacion", "zona"])
        for row in municipios:
            writer.writerow(row)
    print(f"Generated {filepath} ({len(municipios)} rows)")

# 2. pacientes.csv (80–120 rows, dirty data)
def generate_pacientes():
    diagnosticos = [
        "Infección respiratoria", "Hipertensión", "Diabetes Tipo 2", "Gastroenteritis",
        "Dermatitis", "Asma", "Cefalea tensional", "Traumatismo leve"
    ]
    municipios_validos = ["Managua", "León", "Granada", "Matagalpa", "Estelí", "Masaya", "Chinandega", "Juigalpa", "Tipitapa"]
    seguros = ["INSS", "Privado", "MINSA (Gratuito)", None]
    
    rows = []
    base_date = date(2023, 1, 1)
    
    for i in range(1, 101):
        pid = f"PAC-{i:03d}"
        mun = random.choice(municipios_validos)
        sexo = random.choice(["F", "M"])
        
        # Edad con algunos nulos intencionales (aprox 8%)
        if random.random() < 0.08:
            edad = ""
        else:
            edad = str(random.randint(12, 85))
            
        # Fechas mixtas intencionales: ISO YYYY-MM-DD o DD/MM/YYYY
        random_days = random.randint(0, 360)
        d = base_date + timedelta(days=random_days)
        if i % 3 == 0:
            fecha_str = f"{d.day:02d}/{d.month:02d}/{d.year}"
        else:
            fecha_str = f"{d.year}-{d.month:02d}-{d.day:02d}"
            
        diag = random.choice(diagnosticos)
        
        # Costo: a veces número puro, a veces con formato "1,250.50"
        costo_val = round(random.uniform(150.0, 3500.0), 2)
        if costo_val > 1000 and random.random() < 0.5:
            costo_str = f"{costo_val:,.2f}"
        else:
            costo_str = f"{costo_val:.2f}"
            
        # Seguro con nulos (None)
        seg = random.choice(seguros)
        seg_str = seg if seg is not None else ""
        
        rows.append([pid, mun, sexo, edad, fecha_str, diag, costo_str, seg_str])
        
    filepath = os.path.join(DATA_DIR, "pacientes.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "municipio", "sexo", "edad", "fecha_consulta", "diagnostico", "costo", "seguro"])
        for r in rows:
            writer.writerow(r)
    print(f"Generated {filepath} ({len(rows)} rows)")

# 3. encuesta_empleo.csv (100+ rows)
def generate_encuesta_empleo():
    sectores = ["Comercio", "Servicios", "Agricultura", "Manufactura", "Construcción", "Tecnología"]
    rows = []
    
    for i in range(1, 121):
        eid = f"EMP-{i:04d}"
        sexo = random.choice(["F", "M"])
        edad = random.randint(18, 65)
        # Ocupado 0 o 1
        ocupado = 1 if random.random() < 0.75 else 0
        if ocupado == 1:
            horas = random.choice([20, 30, 40, 44, 48, 50, 60])
            ingreso = round(random.uniform(7000.0, 38000.0), 2)
            sector = random.choice(sectores)
        else:
            horas = 0
            ingreso = 0.0
            sector = "Desocupado"
        anio = random.choice([2022, 2023])
        rows.append([eid, sexo, edad, ocupado, ingreso, horas, sector, anio])
        
    filepath = os.path.join(DATA_DIR, "encuesta_empleo.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["id", "sexo", "edad", "ocupado", "ingreso", "horas", "sector", "anio"])
        for r in rows:
            writer.writerow(r)
    print(f"Generated {filepath} ({len(rows)} rows)")

# 4. ventas_tienda.csv (150 rows)
def generate_ventas():
    skus = [
        ("SKU-001", "Alimentos", 45.0),
        ("SKU-002", "Alimentos", 80.0),
        ("SKU-003", "Bebidas", 25.0),
        ("SKU-004", "Bebidas", 35.5),
        ("SKU-005", "Limpieza", 110.0),
        ("SKU-006", "Limpieza", 65.0),
        ("SKU-007", "Cuidado Personal", 95.0),
        ("SKU-008", "Cuidado Personal", 140.0),
        ("SKU-009", "Tecnología", 450.0),
        ("SKU-010", "Tecnología", 1200.0)
    ]
    tiendas = ["Central", "Norte", "Sur", "Occidente"]
    base_date = date(2023, 6, 1)
    
    rows = []
    for i in range(150):
        d = base_date + timedelta(days=random.randint(0, 90))
        fecha_str = d.strftime("%Y-%m-%d")
        sku_info = random.choice(skus)
        sku = sku_info[0]
        cat = sku_info[1]
        precio_base = sku_info[2]
        unidades = random.randint(1, 15)
        # Variación leve de precio por tienda o descuento
        precio = round(precio_base * random.choice([0.95, 1.0, 1.05]), 2)
        tienda = random.choice(tiendas)
        rows.append([fecha_str, sku, cat, unidades, precio, tienda])
        
    filepath = os.path.join(DATA_DIR, "ventas_tienda.csv")
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["fecha", "sku", "categoria", "unidades", "precio", "tienda"])
        for r in rows:
            writer.writerow(r)
    print(f"Generated {filepath} ({len(rows)} rows)")

if __name__ == "__main__":
    generate_municipios()
    generate_pacientes()
    generate_encuesta_empleo()
    generate_ventas()
    print("All datasets generated successfully in public/data/")
