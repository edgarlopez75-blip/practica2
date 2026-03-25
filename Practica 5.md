# 🗄️ Automatización de Respaldo de Base de Datos MySQL
### Ubuntu WSL + Docker + MySQL + Cron

---

## 📋 Requisitos previos
- Windows con Ubuntu (WSL) instalado
- Docker Desktop instalado y abierto
- DBeaver instalado
- MySQL corriendo en un contenedor Docker llamado `sql`

---

## 🐳 Paso 0 — Iniciar el contenedor Docker con MySQL

Antes de realizar cualquier respaldo, el contenedor Docker debe estar corriendo.

### Opción A — Desde Docker Desktop (interfaz gráfica):
1. Abrir **Docker Desktop** en Windows
2. Ir a la sección **Containers**
3. Localizar el contenedor llamado **`sql`** (imagen: `ubuntu/mysql:latest`, puerto: `3306:3306`)
4. Hacer clic en el botón **▶ (Play)** para iniciarlo
5. Esperar a que el STATUS cambie a **Running**

### Opción B — Desde la terminal de Ubuntu (WSL):
```bash
docker start sql
```

Verificar que el contenedor está corriendo:
```bash
docker ps
```
Debe aparecer el contenedor `sql` con STATUS `Up` y puerto `3306:3306`.

> ⚠️ Docker Desktop debe estar abierto en Windows para que los comandos `docker` funcionen desde la terminal de Ubuntu (WSL).

---

## ✅ Paso 1 — Verificar que el servicio Cron esté activo

Antes de configurar cualquier tarea automática, asegurarse de que el servicio cron esté corriendo en Ubuntu WSL.

### Verificar el estado:
```bash
systemctl status cron
```

Si muestra `inactive (dead)`, iniciarlo con:
```bash
sudo systemctl start cron
```

Confirmar que está activo:
```bash
systemctl status cron
```
Debe mostrar **`active (running)`** en verde.

---

## 🔍 Paso 2 — Verificar la ubicación de mysqldump

El crontab necesita la ruta completa del ejecutable `mysqldump`.

```bash
which mysqldump
```

### Resultado esperado:
```
/usr/bin/mysqldump
```

---

## 🧪 Paso 3 — Probar el respaldo manualmente

Antes de automatizar, verificar que el comando funciona correctamente.

> El servidor MySQL corre dentro de Docker en Windows, por eso se usa la IP `127.0.0.1`.

```bash
/usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Desktop/prueba.sql
```

### Descripción de cada parte:
| Parámetro | Descripción |
|-----------|-------------|
| `-h 127.0.0.1` | IP del servidor MySQL (Docker) |
| `-u TU_USUARIO` | Usuario de MySQL |
| `-pTU_CONTRASEÑA` | Contraseña (sin espacio entre `-p` y la contraseña) |
| `servidor` | Nombre de la base de datos |
| `> /mnt/c/Users/Edgar/Desktop/prueba.sql` | Archivo de salida en el Escritorio |

> ⚠️ El mensaje `Warning: Using a password on the command line interface can be insecure` es normal y no afecta el proceso.

Si se genera el archivo `prueba.sql` con contenido, el entorno está correctamente configurado. ✅

---

## ⚙️ Paso 4 — Configurar el crontab para automatizar el respaldo

### Abrir el editor de crontab:
```bash
crontab -e
```

Agregar la siguiente línea al final del archivo:

```bash
* * * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Desktop/respaldo_$(date +\%F).sql
```

### Significado de `* * * * *`:
| Campo | Valor | Significado |
|-------|-------|-------------|
| Minuto | `*` | Cada minuto |
| Hora | `*` | Cualquier hora |
| Día del mes | `*` | Cualquier día |
| Mes | `*` | Cualquier mes |
| Día de la semana | `*` | Cualquier día |

> 💡 `$(date +\%F)` genera la fecha actual en formato `AAAA-MM-DD`, por ejemplo: `respaldo_2026-03-24.sql`

### Guardar y salir de nano:
- `Ctrl + O` → `Enter` (guardar)
- `Ctrl + X` (cerrar)

---

## 📋 Paso 5 — Verificar que el crontab se guardó

```bash
crontab -l
```

Debe aparecer la línea de `mysqldump` configurada.

---

## 📁 Resultado esperado

Después de 1 minuto aparecerá en el Escritorio un archivo:

```
respaldo_2026-03-24.sql
```

Este archivo contiene:
- ✅ La estructura completa de la base de datos `servidor`
- ✅ Las tablas: `denue` y `estudiantes`
- ✅ Todos los datos registrados

---

## 🕐 Cambiar frecuencia del respaldo (opcional)

Una vez confirmado que funciona, cambiar a una vez por día a las **11:00 PM**:

```bash
0 23 * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Desktop/respaldo_$(date +\%F).sql
```

---

## 📌 Resumen de comandos

```bash
# 1. Iniciar contenedor Docker
docker start sql

# 2. Verificar e iniciar cron
systemctl status cron
sudo systemctl start cron

# 3. Obtener ruta de mysqldump
which mysqldump

# 4. Probar respaldo manualmente
/usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Desktop/prueba.sql

# 5. Editar crontab
crontab -e

# 6. Ver tareas configuradas
crontab -l
```

---

*Documentación generada el 24 de marzo de 2026*
