# Práctica GAS — Consulta de Negocios DENUE INEGI

**Materia:** Inteligencia de Negocios  
**Herramienta:** Google Apps Script  
**Dataset:** DENUE INEGI (`denue_inegi_11___1_.xlsx`)

---

## ¿Qué hace este proyecto?

Consulta el padrón de negocios del DENUE desde un Google Sheet usando tres funciones desarrolladas en Google Apps Script. El script parte de las funciones base `leerCelda`, `leerCeldas` y `setCelda` proporcionadas en clase.

---

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `Code.gs` | Script principal con las 3 funciones |
| `README.md` | Este archivo |

---

## Cómo instalar

1. Abre el Google Sheet con el dataset DENUE
2. Ve a **Extensiones → Apps Script**
3. Borra el contenido por defecto
4. Pega todo el contenido de `Code.gs`
5. Guarda con `Ctrl + S`
6. En el menú desplegable selecciona **`probar`** y presiona **▶ Ejecutar**
7. Los resultados aparecen en **Registro de ejecución**

---

## Funciones desarrolladas

### 1. `ls(arg)` — Filtro por información de contacto

Muestra los negocios según el tipo de contacto que tengan disponible.

```javascript
ls("t")  // Negocios con teléfono
ls("w")  // Negocios con página web
ls("c")  // Negocios con correo electrónico
ls("a")  // Negocios con los tres (teléfono + web + correo)
```

**Cómo se resolvió:**
Se leen todos los datos del Sheet con `getDataRange().getValues()`. Por cada fila se extraen las columnas `telefono` (índice 29), `correoelec` (30) y `www` (31). Se valida que cada campo no esté vacío ni sea cero. Un `if/else` evalúa la condición según el argumento y acumula las filas que cumplen. El resultado se imprime con `Logger.log`.

---

### 2. `lsV(tipoVialidad, nombreVialidad)` — Filtro por vialidad

Muestra los negocios ubicados exactamente en el tipo y nombre de vialidad indicados.

```javascript
lsV("CALLE", "LOPEZ MATEOS")
lsV("AVENIDA", "REFORMA")
```

**Cómo se resolvió:**
Los parámetros y los campos del dataset se normalizan con `.toUpperCase().trim()` para que la comparación no falle por mayúsculas o espacios. Se comparan exactamente `tipo_vial` (índice 6) y `nom_vial` (índice 7) con los parámetros recibidos. Solo se listan los registros donde ambos campos coinciden al mismo tiempo.

---

### 3. `lsGPS(latitud, longitud)` — 5 negocios más cercanos

Muestra los 5 negocios más cercanos a unas coordenadas GPS, dentro de un radio máximo de 3 km.

```javascript
lsGPS(21.88, -102.28)
lsGPS(32.63, -115.45)
```

**Cómo se resolvió:**

**Coordenadas del dataset:** Están almacenadas como enteros sin punto decimal. Se dividen entre `1e8` para convertirlas a grados decimales:
```
2196795311 / 1e8 = 21.96795311°
```

**Distancia:** Se implementó la fórmula de **Haversine** que considera la curvatura de la Tierra, mucho más precisa que la distancia euclidiana para coordenadas geográficas.

**Filtros aplicados:**
- Se descartan filas sin coordenadas (`NaN`)
- Se descartan coordenadas fuera del rango geográfico de México
- Solo se incluyen negocios a ≤ 3 km
- Se ordenan por distancia ascendente y se muestran los 5 primeros

---

## Buenas prácticas aplicadas

- **Lectura eficiente:** Se usa `getDataRange().getValues()` una sola vez por función, evitando llamadas celda por celda que consumen cuota de la API
- **Normalización:** Comparaciones insensibles a mayúsculas y espacios extra con `.toUpperCase().trim()`
- **Documentación:** Cada función tiene comentarios que explican su flujo paso a paso
- **Separación:** La función `haversine` está separada de la lógica principal para mayor claridad
