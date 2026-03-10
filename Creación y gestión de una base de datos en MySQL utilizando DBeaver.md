<h1>Creación y gestión de una base de datos en MySQL utilizando DBeaver</h1>

<h2>Descripción</h2>
<p>
Esta práctica consiste en la creación y administración básica de una base de datos utilizando MySQL a través de la herramienta DBeaver.
Durante el desarrollo de la actividad se realizaron tareas como la creación de una base de datos, la construcción de una tabla,
la inserción de registros y la consulta de información almacenada. El objetivo principal fue comprender cómo se organizan los datos
dentro de un sistema de gestión de bases de datos y cómo se pueden manipular mediante el lenguaje SQL.
</p>

<hr>

<h2>Entorno de Trabajo</h2>
<p>El entorno utilizado para esta práctica fue el siguiente:</p>

<ul>
<li>DBeaver como herramienta de administración de bases de datos</li>
<li>MySQL como sistema gestor de base de datos</li>
<li>Conexión local al servidor de base de datos</li>
<li>Editor SQL integrado en DBeaver</li>
</ul>

<p>
La base de datos creada durante la práctica fue llamada:
</p>

<p><strong>servidor</strong></p>

<hr>

<h2>Procedimiento Realizado</h2>

<h3>1. Creación de la base de datos</h3>
<p>
El primer paso fue abrir DBeaver y establecer la conexión con el servidor de MySQL. Una vez que la conexión fue exitosa,
se procedió a crear una nueva base de datos que serviría como contenedor de la información utilizada en la práctica.
La base de datos fue nombrada <strong>servidor</strong>, lo que permitió organizar los datos dentro de un mismo entorno de trabajo.
</p>

<p>El comando utilizado para crear la base de datos fue:</p>

<p><code>CREATE DATABASE servidor;</code></p>

<p>Posteriormente se seleccionó la base de datos para comenzar a trabajar dentro de ella:</p>

<p><code>USE servidor;</code></p>

<hr>

<h3>2. Creación de la tabla</h3>
<p>
Después de crear la base de datos, se procedió a crear una tabla llamada <strong>estudiantes</strong>.
Las tablas permiten almacenar información de forma organizada mediante filas y columnas.
Cada columna representa un tipo de información específica y cada fila corresponde a un registro dentro de la tabla.
</p>

<p>
La tabla fue diseñada con tres campos principales. El campo <strong>id</strong> funciona como identificador
único para cada registro, el campo <strong>nombre</strong> almacena el nombre del estudiante
y el campo <strong>fecha_nacimiento</strong> guarda la fecha de nacimiento de cada persona.
</p>

<p>El comando utilizado fue el siguiente:</p>

<p>
<code>
CREATE TABLE estudiantes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50),
fecha_nacimiento DATE
);
</code>
</p>

<hr>

<h3>3. Inserción de datos en la tabla</h3>
<p>
Una vez creada la tabla, se procedió a insertar información dentro de ella utilizando comandos SQL.
Para esta práctica se registró un estudiante llamado Pako junto con su fecha de nacimiento.
Es importante mencionar que MySQL utiliza el formato de fecha <strong>año-mes-día</strong> para almacenar correctamente
los valores de tipo DATE.
</p>

<p>El comando utilizado para insertar el registro fue:</p>

<p>
<code>
INSERT INTO estudiantes (nombre, fecha_nacimiento)
VALUES ('Pako', '1981-05-21');
</code>
</p>

<hr>

<h3>4. Consulta de los datos</h3>
<p>
Después de insertar los registros, se realizó una consulta para verificar que la información
se hubiera guardado correctamente dentro de la tabla. Las consultas permiten visualizar
los datos almacenados en la base de datos y confirmar que las operaciones realizadas fueron exitosas.
</p>

<p>El comando utilizado fue:</p>

<p><code>SELECT * FROM estudiantes;</code></p>

<p>
Al ejecutar esta consulta, el sistema muestra todos los registros existentes dentro de la tabla,
incluyendo el identificador generado automáticamente, el nombre del estudiante y su fecha de nacimiento.
</p>

<hr>


<h2>Aprendizajes obtenidos</h2>

<ul>
<li>Creación de bases de datos en MySQL</li>
<li>Diseño de tablas con diferentes tipos de datos</li>
<li>Uso del lenguaje SQL para manipulación de información</li>
<li>Inserción de registros en una base de datos</li>
<li>Consulta de información almacenada</li>
<li>Identificación y corrección de errores de sintaxis</li>
</ul>

<hr>

<h2>Conclusión</h2>
<p>
Esta práctica permitió comprender el proceso básico de creación y administración de una base de datos
utilizando MySQL mediante la herramienta DBeaver. A través de la creación de una base de datos,
el diseño de una tabla y la inserción de registros, fue posible entender cómo se organiza la información
dentro de un sistema de gestión de bases de datos.
</p>

<p>
El uso de bases de datos es fundamental en el desarrollo de aplicaciones y sistemas informáticos,
ya que permite almacenar grandes cantidades de información de forma estructurada y facilitar su consulta
cuando sea necesario.
</p>

<hr>

<p>
Autor: Edgar Eduardo Lopez Orozco<br>
Autor: Keyna vianney Villa Vera<br>
Materia: Computación en la Nube (361)<br>
Institución: Universidad Autónoma de Baja California
</p>
