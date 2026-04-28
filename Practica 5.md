# 🐳 Actividad Docker-MYSQLDUMP
## Automatizar el proceso de creación de backups de bases de datos

---

## 📋 Requisitos previos
- Windows con Ubuntu (WSL) instalado
- Docker Desktop instalado y abierto
- DBeaver instalado
- MySQL corriendo en un contenedor Docker llamado `sql`

---

## 🐳 Paso 0 — Iniciar el contenedor Docker con MySQL

Desde la terminal de Ubuntu (WSL):
```bash
docker start sql
```

Verificar que está corriendo:
```bash
docker ps
```
Debe aparecer el contenedor `sql` con STATUS `Up` y puerto `3306:3306`.

> ⚠️ Docker Desktop debe estar abierto en Windows para que los comandos `docker` funcionen desde Ubuntu WSL.

---

## ✅ Paso 1 — Verificar que el servicio Cron esté activo

```bash
systemctl status cron
```

Si muestra `inactive (dead)`, iniciarlo con:
```bash
sudo systemctl start cron
```

---

## 🔍 Paso 2 — Verificar la ubicación de mysqldump

```bash
which mysqldump
```
Resultado esperado:
```
/usr/bin/mysqldump
```

---

## 💾 1. mysqldump automático

### Ir a la carpeta de respaldos:
```bash
cd /mnt/c/Users/Edgar/Documents/servidor/
```

### Ver los archivos generados:
```bash
ls
```

### Ver archivos con ruta completa:
```bash
ls /mnt/c/Users/Edgar/Documents/servidor/
```

### Configurar el crontab:
```bash
crontab -e
```

Agregar esta línea **sin `#` al inicio**:
```bash
* * * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql && ls /mnt/c/Users/Edgar/Documents/servidor/
```

> 💡 El `&& ls` al final muestra en la terminal los archivos cada vez que se genera un nuevo respaldo.

Verificar que se guardó:
```bash
crontab -l
```

### Resultado esperado:
Cada minuto aparece un archivo nuevo:
```
respaldo_2026-03-25_19-39.sql
respaldo_2026-03-25_19-40.sql
respaldo_2026-03-25_19-41.sql
respaldo_2026-03-25_19-42.sql
respaldo_2026-03-25_19-43.sql
```

---

## 📅 2. En fechas exactas

Los campos del crontab controlan cuándo se ejecuta el respaldo:

```
* * * * * comando
│ │ │ │ │
│ │ │ │ └── Día de la semana (0=domingo, 6=sábado)
│ │ │ └──── Mes (1-12)
│ │ └────── Día del mes (1-31)
│ └──────── Hora (0-23)
└────────── Minuto (0-59)
```

### Ejemplos:

**Todos los días a las 11:00 PM:**
```bash
0 23 * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql
```

**Cada lunes a las 8:00 AM:**
```bash
0 8 * * 1 /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql
```

**El día 1 de cada mes a medianoche:**
```bash
0 0 1 * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql
```

---

## 🗑️ 3. Respaldos limitados

Para conservar solo los **últimos 5 respaldos** y eliminar los más antiguos automáticamente:

```bash
crontab -e
```

Agregar esta línea:
```bash
* * * * * /usr/bin/mysqldump -h 127.0.0.1 -u TU_USUARIO -pTU_CONTRASEÑA servidor > /mnt/c/Users/Edgar/Documents/servidor/respaldo_$(date +\%F_\%H-\%M).sql && ls -t /mnt/c/Users/Edgar/Documents/servidor/respaldo_*.sql | tail -n +6 | xargs rm -f
```

### ¿Cómo funciona?
| Parte del comando | Descripción |
|---|---|
| `mysqldump ... > respaldo_fecha.sql` | Crea el nuevo respaldo |
| `&&` | Solo continúa si el respaldo fue exitoso |
| `ls -t ... respaldo_*.sql` | Lista los respaldos del más nuevo al más antiguo |
| `tail -n +6` | Selecciona todos excepto los 5 más recientes |
| `xargs rm -f` | Elimina los seleccionados |

> 💡 Cambia el `6` por `(N+1)` donde N es cuántos respaldos quieres conservar. Ejemplo: para guardar los últimos **10** usa `tail -n +11`.

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

# 5. Ver archivos generados
ls
ls /mnt/c/Users/Edgar/Documents/servidor/

# 6. Editar crontab
crontab -e

# 7. Ver tareas configuradas
crontab -l
```

---
Autor: Keyna vianney Villa Vera<br>
Materia: (Computación en la Nube(361)<br>
Institución: (Universidad Autonoma de Baja California )</p>

*Documentación generada el 25 de marzo de 2026*
