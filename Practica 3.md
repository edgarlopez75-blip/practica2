[denue.csv](https://github.com/user-attachments/files/25883397/denue.csv)# Importación de un archivo CSV a una base de datos usando DBeaver

## Introducción

En esta práctica se realizó la importación de un archivo CSV a una base de datos utilizando el gestor de bases de datos DBeaver.

El objetivo fue crear una tabla dentro de la base de datos y cargar la información contenida en el archivo CSV para poder realizar consultas SQL posteriormente.

El archivo utilizado contiene información del DENUE (Directorio Estadístico Nacional de Unidades Económicas) del Instituto Nacional de Estadística y Geografía (INEGI).

---

## Herramientas utilizadas

- DBeaver
- MySQL
- Archivo CSV
- GitHub

---

## Procedimiento

### 1. Abrir la conexión a la base de datos

1. Abrir el programa DBeaver.
2. Conectarse al servidor de base de datos.
3. Seleccionar la base de datos donde se guardará la información.

---

### 2. Iniciar el proceso de importación

1. Hacer clic derecho sobre la base de datos.
2. Seleccionar la opción:

```
Import Data
```

3. Seleccionar:

```
CSV → Import from CSV file(s)
```

4. Presionar **Next**.

---

### 3. Seleccionar el archivo CSV

1. Presionar **Browse** o **Add File**.
2. Buscar el archivo en la computadora.
3. Seleccionar el archivo:

```

denue.csv


Presionar **Next**.

---

### 4. Crear la tabla en la base de datos

1. Seleccionar la opción:

```
Create new table
```

2. Asignar el nombre de la tabla:

```
denue
```

3. Verificar que las columnas del archivo CSV sean detectadas correctamente.

---

### 5. Cargar los datos

En la sección **Data load settings** se puede dejar la configuración por defecto.

Después presionar:

```
Finish
```

para comenzar la importación.

---

## Verificación de los datos

Para comprobar que los datos se cargaron correctamente se ejecuta la siguiente consulta:

```sql
SELECT * FROM denue;
```

---

## Problemas comunes y soluciones

### Problema 1: Data too long for column

Error:

```
SQL Error [1406]: Data too long for column 'nom_estab'
```

Causa:

El texto del archivo CSV es más largo que el tamaño permitido en la columna de la tabla.

Ejemplo:

```sql
nom_estab VARCHAR(50)
```

Si el texto tiene más de 50 caracteres se produce el error.

Solución:

Aumentar el tamaño de la columna con el siguiente comando:

```sql
ALTER TABLE denue
MODIFY nom_estab VARCHAR(255);
```

También se puede usar:

```sql
TEXT
```

---

### Problema 2: Error during batch insert

Error:

```
Error occurred during batch insert
```

Causa:

Algunas filas del archivo CSV contienen datos incorrectos o incompatibles con el tipo de dato de la tabla.

Solución:

- Presionar **Skip** para saltar la fila con error.
- Revisar el archivo CSV y corregir los datos.

---

### Problema 3: La tabla no existe

Error:

```
Table 'database.tabla' doesn't exist
```

Causa:

Se intenta insertar datos en una tabla que no ha sido creada.

Solución:

Crear la tabla antes de insertar los datos.

```sql
CREATE TABLE denue (
id INT,
nom_estab VARCHAR(255),
nombre_act VARCHAR(255)
);
```

---

### Problema 4: Formato incorrecto de fecha

Causa:

El CSV puede tener fechas con formato:

```
21/05/1981
```

Pero MySQL utiliza el formato:

```
YYYY-MM-DD
```

Solución:

Convertir la fecha al formato correcto:

```
1981-05-21
```

---

## Conclusión

La importación de archivos CSV mediante DBeaver permite cargar grandes cantidades de información a una base de datos de forma rápida y sencilla.

Sin embargo, es importante verificar los tipos de datos y el tamaño de las columnas para evitar errores durante la importación.

Este tipo de herramientas facilita el manejo de datos y el trabajo con bases de datos en proyectos de análisis o desarrollo de software.
