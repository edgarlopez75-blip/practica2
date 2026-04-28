# Normalización del DENUE
 
> **Materia:** Bases de Datos / Análisis de Datos  
> **Herramienta:** Microsoft Excel  
> **Fuente de datos:** INEGI — DENUE (Directorio Estadístico Nacional de Unidades Económicas)
 
---
 
## Estructura del Archivo Excel
 
El archivo `DENUE_Normalizado.xlsx` contiene **8 hojas** organizadas bajo un enfoque de normalización relacional orientado al analista:
 
| Hoja | Descripción |
|------|-------------|
| `Establecimientos` | Tabla de hechos principal con 678 registros normalizados (26 → 11 columnas) |
| `CAT_Actividades` | Catálogo de actividades económicas SCIAN con sector de 2 dígitos |
| `CAT_Entidades` | Catálogo de entidades federativas |
| `CAT_Municipios` | Catálogo de municipios con referencia a entidad |
| `CAT_Localidades` | Catálogo de localidades con jerarquía completa (entidad → municipio → localidad) |
| `CAT_PersonalOcupado` | Catálogo de rangos de personal con estimado numérico y clasificación de tamaño |
| `Tablas_Especificas` | Tablas resumen analíticas (por municipio, actividad y tamaño) |
| `Justificacion` | Documentación técnica de todas las decisiones de normalización |
 
---
 
## Diccionarios de Datos (Catálogos)
 
### `Establecimientos` — Tabla Principal
 
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `ID` | Numérico | Identificador único del establecimiento |
| `Nombre Establecimiento` | Texto | Nombre comercial |
| `Razón Social` | Texto | Razón social legal (puede ser nulo) |
| `Clave Actividad` | Numérico | Código SCIAN → referencia `CAT_Actividades` |
| `Rango Personal Ocupado` | Texto | Categoría de empleados → referencia `CAT_PersonalOcupado` |
| `Dirección` | Texto | Dirección consolidada en un solo campo |
| `Código Postal` | Numérico | CP del establecimiento |
| `ID Localidad` | Numérico | Referencia → `CAT_Localidades` |
| `ID Municipio` | Numérico | Referencia → `CAT_Municipios` |
| `ID Entidad` | Numérico | Referencia → `CAT_Entidades` |
 
---
 
### `CAT_Actividades` — Actividades Económicas SCIAN
 
| Campo | Descripción |
|-------|-------------|
| `Código Actividad` | Código SCIAN de 6 dígitos |
| `Nombre Actividad` | Descripción de la actividad económica |
| `Sector (2 dígitos)` | Agrupación macro por sector productivo |
 
---
 
### `CAT_Entidades` — Entidades Federativas
 
| Campo | Descripción |
|-------|-------------|
| `Clave Entidad` | Clave numérica de la entidad |
| `Nombre Entidad` | Nombre de la entidad federativa |
 
---
 
### `CAT_Municipios` — Municipios
 
| Campo | Descripción |
|-------|-------------|
| `Clave Municipio` | Clave numérica del municipio |
| `Nombre Municipio` | Nombre del municipio |
| `Clave Entidad` | Referencia a `CAT_Entidades` |
 
---
 
### `CAT_Localidades` — Localidades
 
| Campo | Descripción |
|-------|-------------|
| `Clave Localidad` | Clave numérica de la localidad |
| `Nombre Localidad` | Nombre de la localidad |
| `Clave Municipio` | Referencia a `CAT_Municipios` |
| `Clave Entidad` | Referencia a `CAT_Entidades` |
 
---
 
### `CAT_PersonalOcupado` — Rangos de Personal
 
| Campo | Descripción |
|-------|-------------|
| `Rango` | Rango textual (ej. "0 a 5 personas") |
| `Estimado Personas` | Valor numérico representativo del rango |
| `Clasificación Tamaño` | Microempresa / Pequeña / Mediana / Grande |
 
---
 
## Tablas Específicas de Análisis
 
La hoja `Tablas_Especificas` incluye tablas resumen listas para consumo analítico inmediato:
 
### A) Establecimientos por Municipio
Concentración geográfica de unidades económicas:
- Municipio, Entidad
- Número de establecimientos
- % del total
- Personal estimado (suma)
### B) Establecimientos por Actividad Económica
Actividades dominantes en el universo analizado:
- Código y nombre de actividad SCIAN
- Conteo de establecimientos
- Participación porcentual
### C) Establecimientos por Tamaño de Empresa
Estructura del tejido empresarial:
- Clasificación (Micro / Pequeña / Mediana / Grande)
- Número de establecimientos
- Participación porcentual
---
 
## Justificación de las Acciones de Normalización
 
| # | Sección | Acción Tomada | Justificación Técnica |
|---|---------|---------------|----------------------|
| 1 | Hoja Establecimientos | Reducción de 26 → 11 columnas clave; dirección consolidada en un campo único | La tabla original tenía alta redundancia en campos de vialidad (`tipo_vial`, `nom_vial`, `tipo_v_e_1..3`, etc.). La consolidación elimina columnas innecesarias y facilita la lectura para el analista |
| 2 | CAT_Actividades | Catálogo único de actividades SCIAN con sector de 2 dígitos | **Normalización 3FN**: el nombre de la actividad depende funcionalmente solo del `codigo_act`. Separarlo evita que el mismo nombre se repita en cientos de filas |
| 3 | CAT_Entidades | Tabla propia para la relación clave–entidad | La entidad solo depende de su clave. Normalizar reduce 678 repeticiones a 2 registros únicos |
| 4 | CAT_Municipios | Catálogo con referencia a entidad | El municipio depende de su clave compuesta (`cve_ent`, `cve_mun`). Aislar esta dependencia parcial cumple la **2FN** y conserva la jerarquía geográfica |
| 5 | CAT_Localidades | Catálogo con jerarquía completa (entidad → municipio → localidad) | La localidad depende de `cve_loc + cve_mun + cve_ent`. Separarla completa la jerarquía y elimina dependencias transitivas de la tabla principal |
| 6 | CAT_PersonalOcupado | Catálogo con rangos, estimado numérico y clasificación de tamaño | El campo `per_ocu` es categórico codificado como texto. El catálogo estandariza la clasificación por tamaño (criterios INEGI/SE) y agrega valor numérico para cálculos estadísticos |
| 7 | Tablas_Especificas | Tablas resumen por municipio, actividad y tamaño | Permiten al analista obtener KPIs inmediatos sin manipular el dato crudo: concentración geográfica, actividades dominantes y estructura del universo de unidades económicas |
| 8 | Tratamiento de Nulos | Nulos en `raz_social`, `numero_int`, `cod_postal` se conservan como vacío | El DENUE publica muchos registros sin razón social o número interior. Son nulos **válidos y esperados**; imputarlos generaría datos falsos |
 
---
 
## Enfoque Analítico
 
La normalización aplicada sigue el principio de **diseño orientado al analista**:
 
- **Reducción de ruido**: De 26 columnas originales a 11 campos semánticamente claros.
- **Reutilización sin redundancia**: Los catálogos permiten actualizar un nombre o clasificación en un solo lugar.
- **Jerarquía geográfica explícita**: Entidad → Municipio → Localidad como cadena de llaves foráneas.
- **Tablas listas para análisis**: KPIs pre-calculados disponibles sin transformación adicional.
- **Integridad de nulos**: Los valores faltantes son documentados como válidos, no corregidos artificialmente.
---
 
---
 
## Contenido del Repositorio
 
```
DENUE-Normalizacion/
├── README.md                   ← Este archivo
└── DENUE_Normalizado.xlsx      ← Archivo Excel con normalización completa
```
 
---
 
##  Fuente de Datos
 
- **INEGI — DENUE:** https://www.inegi.org.mx/app/mapa/denue/
- **Sistema de Clasificación Industrial de América del Norte (SCIAN):** https://www.inegi.org.mx/app/scian/
