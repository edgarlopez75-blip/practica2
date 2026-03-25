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
 
## 🧪 Paso 3 — Ir a la carpeta de respaldos y probar manualmente
 
Navegar a la carpeta donde se guardarán los respaldos:
```bash
cd /mnt/c/Users/Edgar/Documents/servidor/
```
 
Hacer el respaldo de prueba:
```bash
mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > respaldo.sql
```
 
Verificar que se creó:
```bash
ls
```
 
Verificar que tiene contenido:
```bash
ls -lh
```
Debe mostrar un tamaño mayor a **0 bytes**.
 
Abrir el archivo para confirmar:
```bash
vim respaldo.sql
```
Para salir de vim: presiona `Esc` luego escribe `:q` y `Enter`
 
---
 
## ⚙️ Paso 4 — Configurar el crontab para automatizar el respaldo
 
### Abrir el editor de crontab:
```bash
crontab -e
```
 
Agregar esta línea al final del archivo **sin `#` al inicio**:
 
```bash
* * * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql
```
 
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
 
## 👀 Paso 6 — Ver los respaldos desde la terminal de Ubuntu
 
### Ver todos los archivos `.sql` de la carpeta:
```bash
ls *.sql
```
 
### Ver con tamaño y fecha:
```bash
ls -lh
```
 
### Ver en tiempo real cada segundo si aparece uno nuevo:
```bash
watch -n 1 ls -lh /mnt/c/Users/Edgar/Documents/servidor/*.sql
```
Para salir presiona `Ctrl + C`
 
---
 
## 📁 Resultado esperado
 
Cada minuto aparece un archivo nuevo en la carpeta:
 
```
respaldo_2026-03-25_12-28.sql
respaldo_2026-03-25_12-29.sql
respaldo_2026-03-25_12-30.sql
```
 
Cada archivo contiene:
- ✅ La estructura completa de la base de datos `servidor`
- ✅ Las tablas: `denue` y `estudiantes`
- ✅ Todos los datos registrados
 
---
 
## 🕐 Cambiar frecuencia del respaldo (opcional)
 
Una vez confirmado que funciona, cambiar a una vez por día a las **11:00 PM**:
 
```bash
0 23 * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql
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
 
# 4. Ir a la carpeta de respaldos
cd /mnt/c/Users/Edgar/Documents/servidor/
 
# 5. Probar respaldo manualmente
mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > respaldo.sql
 
# 6. Ver archivos creados
ls *.sql
 
# 7. Ver archivos con tamaño y fecha
ls -lh
 
# 8. Editar crontab
crontab -e
 
# 9. Ver tareas configuradas
crontab -l
 
# 10. Ver respaldos en tiempo real
watch -n 1 ls -lh /mnt/c/Users/Edgar/Documents/servidor/*.sql
```
