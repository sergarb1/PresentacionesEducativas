---
layout: cover
author: María José Santamonica
---

# Unidad 01 — Despliegue de aplicaciones web<br>🦺 Lubuntu 25 + Apache: de cero a tu fiestón de webs

## 1r CFGS DAW · Despliegue de Aplicaciones Web

---
class: sparse-slide
---

## 🎯 El plan de hoy — y sale guay

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🐧</span>
    <strong>Lubuntu 25.04</strong>
    <p style="font-size:0.85rem;">VM montada con <b>Osboxes</b> o con la <b>ISO</b></p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔌</span>
    <strong>Apache2 en 3 comandos</strong>
    <p style="font-size:0.85rem;">Servidor web activo y feliz</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🎪</span>
    <strong>3 virtual hosts</strong>
    <p style="font-size:0.85rem;">fieston · chuchis · gatitos</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🧯</span>
    <strong>Troubleshooting</strong>
    <p style="font-size:0.85rem;">403, 404 y demás bichos</p>
  </div>
</div>

<div class="success" style="margin-top:0.8rem;">
  Al terminar tendrás una VM con Apache sirviendo <strong>tres webs distintas por el mismo puerto 80</strong>, con sus logs y todo. ¡Vamos allá! 💪
</div>

---
---

## 🐧 ¿Qué es Lubuntu, en corto?

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🪶</span>
    <strong>LXQt ultraligero</strong>
    <p style="font-size:0.85rem;">Con 2 GB de RAM va volando</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📦</span>
    <strong>Base Ubuntu</strong>
    <p style="font-size:0.85rem;">Mismo <code>apt</code>, mismos paquetes</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🖥️</span>
    <strong>Perfecta para VMs</strong>
    <p style="font-size:0.85rem;">Instala en 10 minutos</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🛠️</span>
    <strong>Sobria y seria</strong>
    <p style="font-size:0.85rem;">Nada de tonterías: a trabajar</p>
  </div>
</div>

<div class="info" style="margin-top:0.7rem;">
  Usamos <strong>Lubuntu 25.04 «Plucky Puffin»</strong>: es la que trae <strong>Osboxes</strong> y la que descargas de la web oficial. Aviso honesto: las versiones 25.x ya están <strong>EOL</strong> — para el aula va de cine, pero si algún día montas algo <strong>para producción</strong>, quédate con <strong>26.04 LTS</strong>. 😉
</div>

---
class: sparse-slide
---

## 🗺️ Dos caminos para montarla: los dos son guays

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>🚀 Ruta A — Osboxes (el atajo mágico)</strong>
    <p style="font-size:0.95rem;">Descargas una <b>imagen VDI</b> ya instalada, la añades a VirtualBox y arrancas. En 5 minutos tienes escritorio. Ideal si lo que quieres es practicar Apache <b>hoy</b>.</p>
  </div>
  <div class="comparison-item">
    <strong>💿 Ruta B — ISO (el curso completo)</strong>
    <p style="font-size:0.95rem;">Descargas la <b>ISO oficial</b>, creas la VM y la instalas tú paso a paso con Calamares. Es lo que te preguntarán en un examen o un trabajo: <b>lo sabrás de verdad</b>.</p>
  </div>
</div>

<div class="info" style="margin-top:0.7rem;">
  Recomendación de profe: haz <strong>primero la A</strong> (para no bloquearte con Apache) y luego la <strong>B</strong> cuando tengas calma. O las dos, ¡que mola más! 🎉
</div>

---

## 📦 Ruta A: conseguir el disco de Osboxes

<div class="step"><div class="step-number">1</div><div class="step-content">Entra en <strong>osboxes.org/lubuntu</strong> y localiza <strong>Lubuntu 25.04 Plucky Puffin → VirtualBox (VDI) 64bit</strong> (~1,8 GB).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Descarga el archivo <strong>comprimido</strong> y descomprímelo con <strong>7-Zip, File Roller</strong> o <code>7z x archivo.7z</code>: dentro va el disco <strong>.vdi</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Guarda el <strong>.vdi</strong> en una carpeta fija, p. ej. <code>~/VMs/lubuntu-daw/</code>. De ese disco depende todo lo demás.</div></div>

<div class="info" style="margin-top:0.6rem;">
  <strong>Credenciales de la imagen Osboxes:</strong> usuario <code>osboxes</code> · contraseña <code>osboxes.org</code> · root <code>osboxes.org</code>. Son públicas: cámbialas en cuanto arranques. 🤫
</div>

<div class="warning" style="margin-top:0.5rem;">
  En VirtualBox, añade el disco como <strong>«Disco existente»</strong> (Máquina → Añadir). Si eliges «Crear disco nuevo» apuntando al <strong>.vdi</strong>, VirtualBox lo <strong>reescribe</strong> y te quedas sin sistema. Cuidado con ese clic. 😬
</div>

---

## 🔧 Ruta A: montar la máquina en VirtualBox

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Máquina → Añadir…</strong> y selecciona el <code>.vdi</code> descomprimido («Disco existente»).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>System:</strong> 2048 MB de RAM (4096 si te lo permites) y <strong>2 procesadores</strong>. Con LXQt sobra con 2 GB.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Red → Adaptador 1 → Puente (Bridged):</strong> así tu PC ve la VM por IP, que es lo que necesitas para los virtual hosts.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content"><strong>Máquina → Iniciar</strong>. Arranca directa, sin instalación. 🎬</div></div>

<div class="info" style="margin-top:0.5rem;">
  Si en tu red el puente no va (Wi-Fi corporativa…), usa <strong>Red interna (host-only)</strong>: VirtualBox creará una red entre tu PC y la VM que también funciona para el navegador.
</div>

---

## 🔑 Ruta A: primer arranque (5 minutos y listo)

<div class="step"><div class="step-number">1</div><div class="step-content">Entra con <code>osboxes</code> / <code>osboxes.org</code> y <strong>cambia la contraseña</strong> de inmediato.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Actualiza todo: un servidor desactualizado es un servidor con agujeros.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Apunta la <strong>IP de la VM</strong> (la usaremos pronto): <code>ip -4 addr show</code>.</div></div>

<div class="terminal" style="margin-top:0.5rem;">
  <div><span class="prompt">$</span> sudo passwd                      <span class="output"># nueva contraseña, ya</span></div>
  <div><span class="prompt">$</span> sudo apt update && sudo apt upgrade -y</div>
  <div class="output">Calculando... Hecho. 0 actualizados, 0 nuevos… ojalá 😉</div>
  <div><span class="prompt">$</span> ip -4 addr show | grep inet</div>
  <div class="output">inet <span class="highlight">192.168.1.50</span>/24 brd 192.168.1.255 scope global ...</div>
</div>

<div class="success" style="margin-top:0.5rem;">
  Esa IP en azul es tu <strong>oro</strong>: apúntatela, es la que apuntará tu <code>/etc/hosts</code>.
</div>

---

## 💿 Ruta B: descargar la ISO oficial

<div class="step"><div class="step-number">1</div><div class="step-content">Ve a <strong>lubuntu.me → Downloads</strong> (te lleva al espejo oficial de Ubuntu: <code>cdimage.ubuntu.com/lubuntu/releases/plucky/release/</code>).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Descarga <strong>lubuntu-25.04-desktop-amd64.iso</strong> (~3,1 GB). Puedes usar BitTorrent si tu conexión va lenta.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Verifica la descarga con el fichero <strong>SHA256SUMS</strong> de la misma carpeta: si los hashes coinciden, la ISO está limpia. ✨</div></div>

<div class="terminal" style="margin-top:0.5rem;">
  <div><span class="prompt">$</span> sha256sum lubuntu-25.04-desktop-amd64.iso</div>
  <div class="output">dbf78e6c71197e6f…c8b3a9  lubuntu-25.04-desktop-amd64.iso</div>
  <div><span class="prompt">$</span> grep amd64.iso SHA256SUMS   <span class="output"># debe coincidir la 1.ª columna</span></div>
</div>

---

## 🖥️ Ruta B: crear la VM nueva en VirtualBox

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Máquina → Nueva…</strong> → nombre <code>lubuntu-daw</code>, tipo <strong>Linux</strong>, versión <strong>Ubuntu (64 bits)</strong>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Asigna memoria y CPU según la tabla: con esto Lubuntu va cómodo sin comerse tu portátil.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Crea el <strong>disco virtual de 20 GB</strong> (dinámico: solo ocupa lo que use).</div></div>

<table>
  <tr><th>Ajuste</th><th>Valor recomendado</th><th>Por qué</th></tr>
  <tr><td>💠 Memoria</td><td><strong>2048–4096 MB</strong></td><td>LXQt pide poco</td></tr>
  <tr><td>⚙️ Procesadores</td><td><strong>2</strong></td><td>Instalación ágil</td></tr>
  <tr><td>💾 Disco</td><td><strong>20 GB</strong> dinámico</td><td>Sobra para Apache + webs</td></tr>
  <tr><td>🌐 Red</td><td><strong>Puente (Bridged)</strong></td><td>Tu PC debe ver la VM</td></tr>
  <tr><td>📀 Óptico</td><td><strong>La ISO</strong> al arrancar</td><td>Se «expulsa» tras instalar</td></tr>
</table>

---

## 📝 Ruta B: el instalador, paso a paso

<div class="step"><div class="step-number">1</div><div class="step-content">Arranca con la ISO elegida y elige <strong>idioma español</strong> → «Prueba Lubuntu» o directamente <strong>«¡Instalar Lubuntu!»</strong>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Particiones: <strong>«Borrar disco e instalar Lubuntu»</strong>. Es una VM: tu PC real ni se entera. 😎</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Zona horaria (Madrid), <strong>usuario, contraseña</strong> y nombre de equipo <code>lubuntu-daw</code>.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content">Instala (~10 min, Calamares) → <strong>Reiniciar</strong> → <strong>expulsa la ISO</strong> del lector virtual y ya está: ¡dentro! 🥳</div></div>

<div class="info" style="margin-top:0.5rem;">
  Tras el primer arranque: mismo ritual que la Ruta A — <code>sudo apt update && sudo apt upgrade -y</code> y a por Apache. Ambas rutas acaban en <strong>exactamente el mismo punto</strong>.
</div>

---

## 🌐 La red de la VM: la clave de todo lo que viene

<div class="two-cols">
  <div class="left">
    <div class="warning">
      <p><strong>🔴 NAT (por defecto)</strong></p>
      <p>La VM sale a internet, pero <strong>tu PC no puede entrar a ella</strong>: es una puerta de un solo sentido. El navegador del host no llegaría a Apache.</p>
    </div>
    <div class="info">
      <p><strong>🟢 Puente (Bridged) o Solo anfitrión</strong></p>
      <p>La VM coge IP de tu red y <strong>tu PC la ve</strong>: navegador, <code>curl</code>, todo. <strong>Éste es el que queremos</strong> para los vhosts. ✅</p>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> ip -4 addr show | grep inet</div>
      <div class="output">inet <span class="highlight">192.168.1.50</span>/24 ... global</div>
      <div class="output">inet 127.0.0.1/8 ... host</div>
      <div><span class="prompt">$</span> ping -c 2 192.168.1.50</div>
      <div class="output">64 bytes from 192.168.1.50: ...</div>
    </div>
    <div class="step">
      <div class="step-number">💡</div>
      <div class="step-content">Prueba el <strong>ping desde tu PC host</strong>: si contesta, la puerta está abierta.</div>
    </div>
  </div>
</div>

---
class: sparse-slide
---

## 🔌 ¿Qué es Apache, en una frase?

<div class="key-idea">
  <div class="key-idea-text">
    Apache es el <strong>camarero del puerto 80</strong>: recibe tu petición HTTP, mira <strong>qué nombre pides</strong> y te sirve la web de esa mesa. Un camarero, <strong>varias mesas</strong>: eso es un virtual host.
  </div>
</div>

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">📜</span>
    <strong>apache2 2.4</strong>
    <p style="font-size:0.85rem;">El estándar de facto</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🌍</span>
    <strong>Puerto 80 / 443</strong>
    <p style="font-size:0.85rem;">HTTP y HTTPS</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">👥</span>
    <strong>Usuario www-data</strong>
    <p style="font-size:0.85rem;">Trabaja sin privilegios</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🧩</span>
    <strong>Módulos + vhosts</strong>
    <p style="font-size:0.85rem;">Config modular e inofensiva</p>
  </div>
</div>

---
class: compact-slide
---

## 🚀 Instalar Apache2: tres comandos y a volar

<div class="terminal">
  <div><span class="prompt">$</span> sudo apt update</div>
  <div><span class="prompt">$</span> sudo apt install -y apache2</div>
  <div class="output">Desempaquetando apache2 (2.4…) … Hecho.</div>
  <div><span class="prompt">$</span> sudo systemctl enable --now apache2</div>
  <div><span class="prompt">$</span> systemctl is-active apache2</div>
  <div class="highlight">active</div>
  <div><span class="prompt">$</span> systemctl is-enabled apache2</div>
  <div class="highlight">enabled</div>
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="success">
      <strong>active</strong>: el servicio está corriendo <strong>ahora mismo</strong>.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>enabled</strong>: arrancará <strong>solo</strong> en cada reboot. Sin misterios.
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.5rem;">
  <code>systemctl start|stop|restart apache2</code> para arrancarlo, pararlo o reiniciarlo. Y sí: <strong>instalado ya funciona</strong>, Apache trae una web por defecto.
</div>

---

## ✅ Primer test: ¿responde el camarero?

<div class="two-cols">
  <div class="left">
    <div class="step"><div class="step-number">1</div><div class="step-content">Desde el <strong>navegador de tu PC</strong>: abre <code>http://192.168.1.50</code> (tu IP de VM).</div></div>
    <div class="step"><div class="step-number">2</div><div class="step-content">Verás la página azul <strong>«Apache2 Debian Default Page — It works!»</strong> 🎉</div></div>
    <div class="success">Si la ves, ya tienes <strong>servidor web publicado en tu red</strong>. Enhorabuena, profe. 🥂</div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> curl -s http://localhost/ | head -n 3</div>
      <div class="output">&lt;!DOCTYPE html&gt;</div>
      <div class="output">&lt;html&gt;</div>
      <div class="output">  &lt;head&gt;</div>
      <div class="output">Apache2 Debian Default Page</div>
    </div>
    <div class="info" style="font-size:0.9rem;">
      <code>curl</code> va desde <strong>dentro de la VM</strong>: comprueba Apache <strong>sin depender del navegador ni de la red</strong>. El doble check perfecto.
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🗂️ Anatomía de /etc/apache2 (guía de supervivencia)

<table>
  <tr><th>Elemento</th><th>Qué guarda</th><th>Quién lo toca</th></tr>
  <tr><td><code>apache2.conf</code></td><td>Config global del servidor</td><td>Casi nunca (a mano)</td></tr>
  <tr><td><code>ports.conf</code></td><td><code>Listen 80</code> → puertos que atiende</td><td>A mano</td></tr>
  <tr><td><code>sites-available/</code></td><td>Tus sitios, <strong>apagados</strong></td><td>Tú creas los <code>.conf</code></td></tr>
  <tr><td><code>sites-enabled/</code></td><td><strong>Enlaces</strong> a los que suenan</td><td><code>a2ensite</code> / <code>a2dissite</code></td></tr>
  <tr><td><code>mods-*</code> · <code>conf-*</code></td><td>Módulos y recortes de config</td><td><code>a2enmod</code> · <code>a2enconf</code></td></tr>
  <tr><td><code>logs/</code></td><td><code>error.log</code> y <code>access.log</code></td><td>Apache (tu mejor amigo)</td></tr>
  <tr><td><code>/var/www/html/</code></td><td>Web por defecto «It works!»</td><td>Tú, cuando la quieras</td></tr>
</table>

<div class="info" style="margin-top:0.5rem;">
  <strong>Regla de oro:</strong> editas en <code>sites-available</code> y activas con <code>a2ensite</code>. <code>sites-enabled</code> solo contiene enlaces — <strong>nunca edites ahí</strong>, se perdería al reactivar.
</div>

---
class: compact-slide
---

## 🎪 Un servidor, tres mundos: el concepto de virtual host

<div class="key-idea" style="margin-top:0.8rem;padding:1rem 1.4rem 1rem 3.2rem;">
  <div class="key-idea-text" style="font-size:1.2rem;">
    Apache escucha en el <strong>puerto 80</strong> y lee la cabecera <strong>Host</strong> que trae cada petición. Según ese nombre, sirve un <strong>DocumentRoot</strong> distinto: <strong>mismo puerto, tres webs</strong>.
  </div>
</div>

<table style="margin-top:0.5rem;">
  <tr><th>🌐 Nombre (ServerName)</th><th>📁 DocumentRoot</th><th>🤪 Su rollo</th></tr>
  <tr><td><code>fieston.local</code></td><td><code>/var/www/fieston</code></td><td>🎉 Web de pura fiesta</td></tr>
  <tr><td><code>chuchis.local</code></td><td><code>/var/www/chuchis</code></td><td>🍔 Carta de tapas virtuales</td></tr>
  <tr><td><code>gatitos.local</code></td><td><code>/var/www/gatitos</code></td><td>🐈 Refugio de memes felinos</td></tr>
</table>

<div class="warning" style="margin-top:0.35rem;">
  Sin virtual hosts, <strong>todos</strong> verían la web por defecto: el <strong>Host</strong> es la diferencia entre «quiero fieston» y «quiero los gatitos».
</div>

---

## 📍 /etc/hosts en TU PC: que los nombres resuelvan

<div class="step"><div class="step-number">1</div><div class="step-content">Edita el fichero de <strong>tu PC host</strong>: <strong>Windows</strong> → <code>C:\Windows\System32\drivers\etc\hosts</code> (como administrador) · <strong>Linux/macOS</strong> → <code>/etc/hosts</code>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Añade <strong>los tres nombres en la misma línea</strong> apuntando a la IP de tu VM.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Guarda. En Windows, limpia la caché: <code>ipconfig /flushdns</code>.</div></div>

<div class="code-card" style="margin-top:0.4rem;">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">/etc/hosts (Windows: C:\Windows\System32\drivers\etc\hosts)</div>
    <div class="code-card-badge">DNS casero</div>
  </div>
  <pre><code>192.168.1.50   fieston.local   chuchis.local   gatitos.local</code></pre>
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>IP equivocada = «No se puede conectar»</strong> (y nada tiene que ver con Apache). Si cambiaste la IP o la VM está en NAT, vuelve a la diapositiva de red. 🔍
</div>

---
class: compact-slide
---

## 🎉 Vhost 1: la web de fieston.local

<div class="step"><div class="step-number">1</div><div class="step-content">Crea su directorio y su <code>index.html</code> (con actitud fiestera, como no puede ser de otra forma):</div></div>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">/var/www/fieston/index.html</div>
    <div class="code-card-badge">HTML</div>
  </div>
  <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="es"&gt;
&lt;head&gt;&lt;meta charset="utf-8"&gt;&lt;title&gt;🎉 ¡Fiestón! 🎊&lt;/title&gt;&lt;/head&gt;
&lt;body style="text-align:center;font-family:sans-serif;background:#1E293B;color:#fff;padding-top:4rem;"&gt;
  &lt;h1&gt;🎉 ¡Bienvenido a fieston.local! &lt;/h1&gt;
  &lt;p&gt;Apache está al mando y el server no para de sonar. 🕺&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>

<div class="terminal" style="margin-top:0.4rem;">
  <div><span class="prompt">$</span> sudo mkdir -p /var/www/fieston</div>
  <div><span class="prompt">$</span> sudo nano /var/www/fieston/index.html   <span class="output"># pega y guarda</span></div>
</div>

---
class: compact-slide
---

## 📄 Vhost 1: su fichero de configuración

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">/etc/apache2/sites-available/fieston.conf</div>
    <div class="code-card-badge">Apache</div>
  </div>
  <pre><code>&lt;VirtualHost *:80&gt;
    ServerName fieston.local
    DocumentRoot /var/www/fieston
    &lt;Directory /var/www/fieston&gt;
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    &lt;/Directory&gt;
    ErrorLog ${APACHE_LOG_DIR}/fieston-error.log
    CustomLog ${APACHE_LOG_DIR}/fieston-access.log combined
&lt;/VirtualHost&gt;</code></pre>
</div>

<div class="two-cols" style="margin-top:0.1rem;">
  <div class="left">
    <div class="info" style="font-size:0.83rem;padding:0.45rem 0.8rem;">
      <p><strong>🔑 Las 3 claves</strong></p>
      <p><code>ServerName</code> = nombre que escucha · <code>DocumentRoot</code> = dónde lee el HTML · <code>Directory</code> = permisos.</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="font-size:0.83rem;padding:0.45rem 0.8rem;">
      <p><strong>📊 Logs propios</strong></p>
      <p><code>ErrorLog</code> y <code>CustomLog</code> <strong>por sitio</strong>: no mezclas los errores de gatitos con los de chuchis.</p>
    </div>
  </div>
</div>

---
class: compact-slide
---

## ⚡ Activamos fieston: la receta completa

<div class="terminal">
  <div><span class="prompt">$</span> sudo a2ensite fieston.conf</div>
  <div class="output">Enabling site fieston.</div>
  <div><span class="prompt">$</span> sudo apache2ctl configtest</div>
  <div class="output">Syntax OK</div>
  <div><span class="prompt">$</span> sudo systemctl reload apache2</div>
  <div><span class="prompt">$</span> curl -s http://fieston.local/ | grep title</div>
  <div class="highlight">&lt;title&gt;🎉 ¡Fiestón! 🎊&lt;/title&gt;</div>
</div>

<div class="step" style="margin-top:0.6rem;"><div class="step-number">📝</div><div class="step-content"><strong>Crear</strong> → <strong>a2ensite</strong> → <strong>configtest</strong> → <strong>reload</strong>. Esta cadena es sagrada: <code>a2ensite</code> solo crea el enlace, el sitio <strong>suena cuando recargas</strong>.</div></div>
<div class="step"><div class="step-number">🛑</div><div class="step-content">Si el <code>configtest</code> dice <span class="error-inline">Syntax OK</span> es que todo encaja; si da error, <strong>corrígelo antes de recargar</strong> (mira el número de línea que te pone).</div></div>

<div class="success" style="margin-top:0.5rem;">
  Abre <strong><code>fieston.local</code></strong> en tu navegador y verás la fiesta. 🎊 <strong>¡Primer vhost funcionando!</strong>
</div>

---
class: compact-slide
---

## 🍔 🐈 Misma receta ×2: chuchis y gatitos

<table>
  <tr><th>Sitio</th><th>ServerName</th><th>DocumentRoot</th><th>Contenido</th></tr>
  <tr><td>🍔 <strong>chuchis</strong></td><td><code>chuchis.local</code></td><td><code>/var/www/chuchis</code></td><td>Carta de tapas y croquetas</td></tr>
  <tr><td>🐈 <strong>gatitos</strong></td><td><code>gatitos.local</code></td><td><code>/var/www/gatitos</code></td><td>Memes con bigotes</td></tr>
</table>

<div class="terminal" style="margin-top:0.5rem;">
  <div><span class="prompt">$</span> sudo mkdir -p /var/www/chuchis /var/www/gatitos</div>
  <div><span class="prompt">$</span> sudo cp /var/www/fieston/index.html /var/www/chuchis/index.html</div>
  <div><span class="prompt">$</span> sudo cp /var/www/fieston/index.html /var/www/gatitos/index.html</div>
  <div><span class="prompt">$</span> sudo nano /etc/apache2/sites-available/chuchis.conf   <span class="output"># ServerName + DocumentRoot + logs</span></div>
  <div><span class="prompt">$</span> sudo nano /etc/apache2/sites-available/gatitos.conf   <span class="output"># ídem</span></div>
  <div><span class="prompt">$</span> sudo a2ensite chuchis.conf gatitos.conf</div>
  <div><span class="prompt">$</span> sudo systemctl reload apache2</div>
</div>

<div class="info" style="margin-top:0.4rem;font-size:0.9rem;">
  Truco: copia el <code>.conf</code> de fieston con <code>sudo cp</code> y cambia <strong>solo 3 líneas</strong> (ServerName, DocumentRoot y los logs). Luego personaliza cada <code>index.html</code> con su temática. <strong>Un solo reload</strong> para todos: Apache los carga de golpe. 🚀
</div>

---

## 🚪 Cerramos la web de bienvenida (000-default)

<div class="terminal">
  <div><span class="prompt">$</span> sudo a2dissite 000-default</div>
  <div class="output">Site 000-default disabled; To activate the new configuration, you need to run:</div>
  <div class="output">  systemctl reload apache2</div>
  <div><span class="prompt">$</span> sudo apache2ctl configtest &amp;&amp; sudo systemctl reload apache2</div>
  <div class="output">Syntax OK</div>
</div>

<div class="two-cols" style="margin-top:0.45rem;">
  <div class="left">
    <div class="info">
      <p><strong>¿Por qué?</strong></p>
      <p><code>000-default</code> es la página «It works!»: mientras esté activa, <strong>todo lo que llegue sin nombre reconocido</strong> va a ella. Se quita con <code>a2dissite 000-default</code>.</p>
    </div>
  </div>
  <div class="right">
    <div class="success">
      <p><strong>✅ Ahora</strong></p>
      <p>Los dueños del puerto 80 son <strong>fieston, chuchis y gatitos</strong>. Mira qué suena de verdad con <code>ls -l /etc/apache2/sites-enabled/</code>.</p>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🧪 Probar como profesionales: navegador, curl y logs

<div class="two-cols">
  <div class="left">
    <div class="step"><div class="step-number">🌍</div><div class="step-content"><strong>En el navegador</strong>: <code>fieston.local</code>, <code>chuchis.local</code>, <code>gatitos.local</code> → tres mundos con el mismo puerto 80.</div></div>
    <div class="step"><div class="step-number">🐬</div><div class="step-content"><strong>Con curl</strong> simulas cualquier nombre al vuelo:</div></div>
    <div class="terminal" style="font-size:0.76rem;padding:0.8rem 1rem;">
      <div><span class="prompt">$</span> curl -H "Host: chuchis.local" http://192.168.1.50/</div>
      <div class="output">…carta de croquetas…</div>
      <div><span class="prompt">$</span> curl -H "Host: gatitos.local" http://192.168.1.50/</div>
      <div class="output">…bigotes y memes…</div>
    </div>
  </div>
  <div class="right">
    <div class="step"><div class="step-number">📊</div><div class="step-content"><strong>Cada sitio con sus logs</strong> (los de su <code>.conf</code>): errores aparte, accesos aparte — <code>200</code> = guay, <code>40x</code> = a leer el log. 🦸</div></div>
    <div class="terminal" style="font-size:0.76rem;padding:0.8rem 1rem;">
      <div><span class="prompt">$</span> sudo tail -f /var/log/apache2/fieston-error.log</div>
      <div class="output">[error] ...client denied by server configuration</div>
      <div><span class="prompt">$</span> sudo tail -f /var/log/apache2/fieston-access.log</div>
      <div class="output">192.168.1.10 - - [...] "GET / HTTP/1.1" 200 853</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🧯 Los 5 errores típicos (y su arreglazo)

<table>
  <tr><th>💥 Síntoma</th><th>🕵️ Causa probable</th><th>🔧 Arreglazo</th></tr>
  <tr><td><strong>403 Forbidden</strong></td><td>No existe el DocumentRoot o permisos</td><td><code>ls -l</code> en el directorio · <code>sudo chown -R www-data:www-data /var/www/…</code></td></tr>
  <tr><td><strong>404 Not Found</strong></td><td>Tipo en <code>DocumentRoot</code> o archivo sin <code>index.html</code></td><td><code>sudo apache2ctl -S</code> y mira qué sitio recibe la petición</td></tr>
  <tr><td><strong>Sigue saliendo «It works!»</strong></td><td>No activaste tu sitio o no recargaste</td><td><code>a2ensite</code> + <code>configtest</code> + <code>reload</code>, en ese orden</td></tr>
  <tr><td><strong>«No se puede conectar»</strong></td><td>IP mal en <code>/etc/hosts</code> o VM en NAT</td><td><code>ip -4 addr show</code> → corrige el hosts → red en puente</td></tr>
  <tr><td><strong>Conexión rechazada</strong></td><td>Firewall cortando el 80</td><td><code>sudo ufw status</code> → <code>sudo ufw allow 80/tcp</code></td></tr>
</table>

<div class="info" style="margin-top:0.5rem;">
  Método pro siempre igual: <strong>1) ¿responde la IP? (ping/curl) → 2) ¿Apache corre? (systemctl) → 3) ¿el nombre resuelve? (hosts) → 4) ¿el sitio está habilitado? (a2ensite -l / apache2ctl -S)</strong>. Capa a capa hasta dar con el bicho. 🐛
</div>

---
class: sparse-slide
---

## 🏆 Mochila de salida: lo que ya tienes entre manos

<div class="features-grid">
  <div class="feature-item">
    <span class="feature-icon">🐧</span>
    <strong>VM montada</strong>
    <p style="font-size:0.85rem;">Por Osboxes o por ISO, con red en puente</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">⚡</span>
    <strong>Apache2 activo</strong>
    <p style="font-size:0.85rem;">Se arranca solo en cada boot</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🎪</span>
    <strong>3 vhosts + logs</strong>
    <p style="font-size:0.85rem;">fieston · chuchis · gatitos</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🧹</span>
    <strong>Default apagado</strong>
    <p style="font-size:0.85rem;">Solo suenan tus sitios</p>
  </div>
</div>

<div class="success" style="margin-top:0.35rem;">
  Has pasado de <strong>«cero máquina»</strong> a <strong>tres webs publicadas en tu red</strong> con nombres divertidos, configuración modular y logs por sitio. ¡Que quede claro que esto lo sabes hacer! 🚀
</div>

<div class="info" style="margin-top:0.2rem;">
  <strong>Siguiente nivel:</strong> HTTPS gratis con <strong>Certbot</strong> 🎆
</div>

---
layout: closing
---
