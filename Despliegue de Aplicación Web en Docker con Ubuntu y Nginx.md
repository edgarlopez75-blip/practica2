<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Despliegue_de_Aplicacin_Web_en_Docker_con_Ubuntu_y_Nginx_0"></a>Despliegue de Aplicación Web en Docker con Ubuntu y Nginx</h1>
<h2 class="code-line" data-line-start=2 data-line-end=3 ><a id="Descripcin_2"></a>Descripción</h2>
<p class="has-line-data" data-line-start="4" data-line-end="5">Este proyecto consiste en el despliegue de una página web HTML dentro de un contenedor Docker utilizando Ubuntu como sistema base y Nginx como servidor web. Durante la práctica se realizaron tareas de actualización del sistema, navegación en el entorno Linux, clonación de un repositorio desde GitHub y resolución de un problema relacionado con rutas de archivos.</p>
<hr>
<h2 class="code-line" data-line-start=8 data-line-end=9 ><a id="Entorno_de_Trabajo_8"></a>Entorno de Trabajo</h2>
<p class="has-line-data" data-line-start="10" data-line-end="11">El entorno utilizado para esta práctica fue:</p>
<ul>
<li class="has-line-data" data-line-start="12" data-line-end="14">
<p class="has-line-data" data-line-start="12" data-line-end="13">Docker Desktop</p>
</li>
<li class="has-line-data" data-line-start="14" data-line-end="16">
<p class="has-line-data" data-line-start="14" data-line-end="15">Contenedor basado en Ubuntu</p>
</li>
<li class="has-line-data" data-line-start="16" data-line-end="18">
<p class="has-line-data" data-line-start="16" data-line-end="17">Servidor Web Nginx</p>
</li>
<li class="has-line-data" data-line-start="18" data-line-end="20">
<p class="has-line-data" data-line-start="18" data-line-end="19">Git</p>
</li>
<li class="has-line-data" data-line-start="20" data-line-end="21">
<p class="has-line-data" data-line-start="20" data-line-end="21">Puerto expuesto: 8080</p>
</li>
</ul>
<p class="has-line-data" data-line-start="23" data-line-end="24">El directorio raíz del servidor web utilizado fue:</p>
<p class="has-line-data" data-line-start="25" data-line-end="26">/var/www/html</p>
<hr>
<h2 class="code-line" data-line-start=29 data-line-end=30 ><a id="Procedimiento_Realizado_29"></a>Procedimiento Realizado</h2>
<h3 class="code-line" data-line-start=31 data-line-end=32 ><a id="1_Actualizacin_del_sistema_31"></a>1. Actualización del sistema</h3>
<p class="has-line-data" data-line-start="33" data-line-end="34">Se ejecutaron los siguientes comandos:</p>
<ul>
<li class="has-line-data" data-line-start="35" data-line-end="37">
<p class="has-line-data" data-line-start="35" data-line-end="36">apt update</p>
</li>
<li class="has-line-data" data-line-start="37" data-line-end="39">
<p class="has-line-data" data-line-start="37" data-line-end="38">apt upgrade</p>
</li>
<li class="has-line-data" data-line-start="39" data-line-end="40">
<p class="has-line-data" data-line-start="39" data-line-end="40">apt upgrade -y</p>
</li>
</ul>
<p class="has-line-data" data-line-start="42" data-line-end="45">El comando <code>apt update</code> actualiza la lista de paquetes disponibles en el sistema.<br>
El comando <code>apt upgrade</code> muestra los paquetes que pueden actualizarse.<br>
El comando <code>apt upgrade -y</code> realiza la actualización automáticamente sin solicitar confirmación.</p>
<p class="has-line-data" data-line-start="46" data-line-end="47">El resultado indicó que el sistema ya se encontraba actualizado.</p>
<hr>
<h3 class="code-line" data-line-start=50 data-line-end=51 ><a id="2_Acceso_al_directorio_del_servidor_web_50"></a>2. Acceso al directorio del servidor web</h3>
<p class="has-line-data" data-line-start="52" data-line-end="53">Se accedió al directorio donde Nginx almacena los archivos que se muestran en el navegador mediante el comando:</p>
<p class="has-line-data" data-line-start="54" data-line-end="55">cd /var/www/html</p>
<hr>
<h3 class="code-line" data-line-start=58 data-line-end=59 ><a id="3_Verificacin_de_archivos_existentes_58"></a>3. Verificación de archivos existentes</h3>
<p class="has-line-data" data-line-start="60" data-line-end="62">Se utilizó el comando <code>ls</code> para verificar los archivos presentes en el directorio.<br>
Inicialmente se encontraron los siguientes archivos:</p>
<ul>
<li class="has-line-data" data-line-start="63" data-line-end="65">
<p class="has-line-data" data-line-start="63" data-line-end="64">index.html</p>
</li>
<li class="has-line-data" data-line-start="65" data-line-end="66">
<p class="has-line-data" data-line-start="65" data-line-end="66">logo.png</p>
</li>
</ul>
<hr>
<h3 class="code-line" data-line-start=70 data-line-end=71 ><a id="4_Clonacin_del_repositorio_70"></a>4. Clonación del repositorio</h3>
<p class="has-line-data" data-line-start="72" data-line-end="73">Se clonó el repositorio desde GitHub con el siguiente comando:</p>
<p class="has-line-data" data-line-start="74" data-line-end="75">git clone <a href="https://github.com/edgarlopez75-blip/practica2.git">https://github.com/edgarlopez75-blip/practica2.git</a></p>
<p class="has-line-data" data-line-start="76" data-line-end="77">Este comando descargó el proyecto dentro del directorio del servidor web, generando la carpeta llamada “practica2”.</p>
<p class="has-line-data" data-line-start="78" data-line-end="79">La estructura resultante fue:</p>
<p class="has-line-data" data-line-start="80" data-line-end="81">/var/www/html</p>
<ul>
<li class="has-line-data" data-line-start="82" data-line-end="84">
<p class="has-line-data" data-line-start="82" data-line-end="83">index.html</p>
</li>
<li class="has-line-data" data-line-start="84" data-line-end="86">
<p class="has-line-data" data-line-start="84" data-line-end="85">logo.png</p>
</li>
<li class="has-line-data" data-line-start="86" data-line-end="87">
<p class="has-line-data" data-line-start="86" data-line-end="87">practica2</p>
</li>
</ul>
<hr>
<h2 class="code-line" data-line-start=91 data-line-end=92 ><a id="Acceso_desde_el_navegador_91"></a>Acceso desde el navegador</h2>
<p class="has-line-data" data-line-start="93" data-line-end="94">La aplicación se ejecutó desde el navegador utilizando la siguiente dirección:</p>
<p class="has-line-data" data-line-start="95" data-line-end="96"><a href="http://127.0.0.1:8080/practica2/index.html">http://127.0.0.1:8080/practica2/index.html</a></p>
<p class="has-line-data" data-line-start="97" data-line-end="98">Donde:</p>
<ul>
<li class="has-line-data" data-line-start="99" data-line-end="101">
<p class="has-line-data" data-line-start="99" data-line-end="100">127.0.0.1 corresponde a localhost</p>
</li>
<li class="has-line-data" data-line-start="101" data-line-end="103">
<p class="has-line-data" data-line-start="101" data-line-end="102">8080 es el puerto configurado en Docker</p>
</li>
<li class="has-line-data" data-line-start="103" data-line-end="105">
<p class="has-line-data" data-line-start="103" data-line-end="104">practica2 es la carpeta del proyecto</p>
</li>
<li class="has-line-data" data-line-start="105" data-line-end="106">
<p class="has-line-data" data-line-start="105" data-line-end="106">index.html es el archivo principal</p>
</li>
</ul>
<hr>
<h2 class="code-line" data-line-start=110 data-line-end=111 ><a id="Problema_detectado_110"></a>Problema detectado</h2>
<p class="has-line-data" data-line-start="112" data-line-end="113">Se presentó un problema en el cual la imagen logo.png no se visualizaba correctamente en el navegador.</p>
<h3 class="code-line" data-line-start=114 data-line-end=115 ><a id="Causa_del_problema_114"></a>Causa del problema</h3>
<p class="has-line-data" data-line-start="116" data-line-end="117">El archivo index.html se encontraba dentro de la carpeta practica2, pero la imagen logo.png estaba fuera de esa carpeta.</p>
<p class="has-line-data" data-line-start="118" data-line-end="119">El navegador intentaba encontrar la imagen en la misma carpeta del archivo HTML, pero al no estar allí, no podía mostrarla.</p>
<hr>
<h2 class="code-line" data-line-start=122 data-line-end=123 ><a id="Solucin_aplicada_122"></a>Solución aplicada</h2>
<p class="has-line-data" data-line-start="124" data-line-end="125">Para solucionar el problema, se movió la imagen al directorio correcto utilizando el siguiente comando:</p>
<p class="has-line-data" data-line-start="126" data-line-end="127">mv /var/www/html/logo.png /var/www/html/practica2/</p>
<p class="has-line-data" data-line-start="128" data-line-end="129">Después de realizar este cambio, la estructura final quedó organizada correctamente y la imagen se visualizó sin problemas en el navegador.</p>
<hr>
<h2 class="code-line" data-line-start=132 data-line-end=133 ><a id="Aprendizajes_obtenidos_132"></a>Aprendizajes obtenidos</h2>
<p class="has-line-data" data-line-start="134" data-line-end="135">Durante esta práctica se reforzaron los siguientes conocimientos:</p>
<ul>
<li class="has-line-data" data-line-start="136" data-line-end="138">
<p class="has-line-data" data-line-start="136" data-line-end="137">Administración básica en Linux</p>
</li>
<li class="has-line-data" data-line-start="138" data-line-end="140">
<p class="has-line-data" data-line-start="138" data-line-end="139">Uso de comandos en terminal</p>
</li>
<li class="has-line-data" data-line-start="140" data-line-end="142">
<p class="has-line-data" data-line-start="140" data-line-end="141">Navegación y gestión de directorios</p>
</li>
<li class="has-line-data" data-line-start="142" data-line-end="144">
<p class="has-line-data" data-line-start="142" data-line-end="143">Clonación de repositorios con Git</p>
</li>
<li class="has-line-data" data-line-start="144" data-line-end="146">
<p class="has-line-data" data-line-start="144" data-line-end="145">Comprensión de rutas relativas en HTML</p>
</li>
<li class="has-line-data" data-line-start="146" data-line-end="148">
<p class="has-line-data" data-line-start="146" data-line-end="147">Despliegue de aplicaciones web en Docker</p>
</li>
<li class="has-line-data" data-line-start="148" data-line-end="149">
<p class="has-line-data" data-line-start="148" data-line-end="149">Resolución de errores relacionados con archivos estáticos</p>
</li>
</ul>
<hr>
<h2 class="code-line" data-line-start=153 data-line-end=154 ><a id="Conclusin_153"></a>Conclusión</h2>
<p class="has-line-data" data-line-start="155" data-line-end="156">Esta práctica permitió comprender el proceso completo de despliegue de una aplicación web estática dentro de un entorno contenerizado utilizando Docker. Asimismo, se reforzaron habilidades técnicas relacionadas con Linux, Git y servidores web, así como la importancia de una correcta estructura de archivos para el funcionamiento adecuado de una aplicación web.</p>
<hr>
<p class="has-line-data" data-line-start="159" data-line-end="162">Autor: Edgar Eduardo Lopez Orozco<br>
Materia: (Computación en la Nube(361)<br>
Institución: (Universidad Autonoma de Baja California )</p>
