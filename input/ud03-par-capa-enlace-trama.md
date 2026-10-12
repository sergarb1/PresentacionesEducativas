---
layout: cover
---

# Unidad 03 — Capa de enlace y trama Ethernet

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## La capa de enlace
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    En la unidad anterior dejamos los <strong>bits</strong> listos en el cable. Ahora viene la pregunta que todo bit teme: <strong>¿para quién soy?</strong> Esa es la <strong>capa 2</strong>: la identidad de 48 bits de cada tarjeta (<strong>MAC</strong>) y el sobre Ethernet que envuelve los datos (<strong>la trama</strong>).
  </div>
</div>

En esta unidad: el modelo OSI como mapa, las direcciones MAC, la trama Ethernet campo a campo y la encapsulación capa a capa.

---
class: compact-slide
---

## El modelo OSI: el mapa de 7 capas

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">7</div>
      <div class="step-content"><strong>Aplicación</strong> · HTTP, DNS, el navegador</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content"><strong>Presentación</strong> · TLS, JPEG, UTF-8</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Sesión</strong> · sesiones RPC, cookies</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Transporte</strong> · TCP, UDP</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Red</strong> · IP, routers</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Enlace</strong> · Ethernet, switches <span class="badge badge-blue">aquí</span></div>
    </div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Física</strong> · cable UTP, fibra, radio</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>La regla de oro:</strong> cada capa solo habla con su vecina. Si la 2 no sabe mover bits, no le importa: se los pide a la 1.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>El truco de los tres de abajo:</strong> 1 = <strong>bits</strong>, 2 = <strong>trama</strong>, 3 = <strong>paquete</strong>.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      OSI es un <strong>vocabulario</strong>: en Internet corre <strong>TCP/IP</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Dónde estamos y qué vive en cada capa

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Capa</th><th>La UD anterior</th><th>Esta unidad</th></tr></thead>
      <tbody>
        <tr><td><strong>3 · Red</strong></td><td>—</td><td>IP, routers <em>(UD de dirección IP)</em></td></tr>
        <tr><td><strong>2 · Enlace</strong></td><td>—</td><td><strong>Trama Ethernet, MACs</strong></td></tr>
        <tr><td><strong>1 · Física</strong></td><td><strong>Medios, crimpado, cableado</strong></td><td>—</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      El switch también vive en la capa 2 (lo abre la unidad de switching); sus tramas salen de aquí.
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Si esto falla…</th><th>Capa</th></tr></thead>
      <tbody>
        <tr><td>Cable suelto, LED apagado, señal débil</td><td>1</td></tr>
        <tr><td>Trama con FCS malo, MAC desconocida</td><td><strong>2 (aquí)</strong></td></tr>
        <tr><td>No hay ping a la red vecina</td><td>3</td></tr>
      </tbody>
    </table>
    <div class="success" style="margin-top:0.5rem;">
      <strong>Diagnosticar de abajo arriba:</strong> primero ¿hay señal?, luego ¿hay trama?, luego ¿hay ruta? Nunca al revés.
    </div>
  </div>
</div>

---
class: sparse-slide
---

## Mini-chequeo: el modelo OSI

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué PDU viaja en las capas 1, 2 y 3?
2. ¿OSI y TCP/IP son protocolos o modelos?
3. Esta unidad ¿en qué capa vive y por qué?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>1 → bits · 2 → trama · 3 → paquete</strong></li>
    <li>Son <strong>modelos</strong> (mapas). En Internet manda <strong>TCP/IP</strong>; OSI se usa para nombrar capas y diagnosticar</li>
    <li>En la <strong>capa 2</strong>: trama Ethernet con MACs. La 1 (medios) quedó en la UD2 y la 3 (IP) llega después</li>
  </ul>
</div>

---
class: compact-slide
---

## Direcciones MAC
### La identidad de la tarjeta, en 48 bits

<div class="key-idea" style="margin-top:1rem;">
  <div class="key-idea-text" style="font-size:1.15rem;">
    La <strong>dirección MAC</strong> es el nombre de pila de la tarjeta de red: <strong>6 bytes en hexadecimal</strong> que la capa 2 usa para decidir «¿esta trama es para mí?». La escriben en <strong>fábrica</strong> y es única en el mundo.
  </div>
</div>

<div class="two-cols" style="margin-top:0.8rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">formatos de una MAC</div>
      </div>
      <pre><code>00:1A:2B:3C:4D:5E    (dos puntos, lo típico)
00-1A-2B-3C-4D-5E    (guiones, también válido)
001A.2B3C.4D5E       (el estilo Cisco)</code></pre>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Parte</th><th>Bits</th><th>Quién la asigna</th></tr></thead>
      <tbody>
        <tr><td><strong>OUI</strong> (3 primeros bytes)</td><td>24</td><td>IEEE → el fabricante</td></tr>
        <tr><td><strong>NIC</strong> (3 últimos)</td><td>24</td><td>El fabricante (su serie)</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      En <code>ipconfig /all</code> o <code>ip link</code> verás tu MAC: los 6 primeros caracteres dicen <strong>quién fabricó</strong> la placa.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los tres tipos de trama

<div class="two-cols" style="align-items:start;">
  <div class="left">
    <table>
      <thead><tr><th>Tipo</th><th>Ejemplo</th><th>Quién la recoge</th></tr></thead>
      <tbody>
        <tr><td><strong>Unicast</strong></td><td>00:1A:2B:3C:4D:5E</td><td>Solo esa tarjeta</td></tr>
        <tr><td><strong>Multicast</strong></td><td>01:00:5E:…</td><td>El grupo suscrito</td></tr>
        <tr><td><strong>Broadcast</strong></td><td><strong>FF:FF:FF:FF:FF:FF</strong></td><td>Todas las tarjetas de la LAN</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      El <strong>primer byte</strong> lleva dos bits con nombre: <strong>I/G</strong> (0 = unicast, 1 = grupo) y <strong>U/L</strong> (0 = de fábrica, 1 = local, la cambiaste tú).
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>MAC frente a IP, en una frase:</strong> la <strong>MAC</strong> lleva la trama <em>de switch en switch</em> (en tu LAN); la <strong>IP</strong> lleva el paquete <em>de red en red</em> (de extremo a extremo).
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Al cruzar un router, las <strong>MACs se cambian</strong> (nuevo tramo, nuevas tarjetas) pero la <strong>IP de destino no toca</strong>: lo verás en encapsulación.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      El puente entre ambos: <strong>ARP</strong> pregunta por broadcast «¿quién tiene esta IP?» y recibe la MAC. Detalle completo en la unidad de IP.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: MAC

<div class="question-card">
  <span class="question-icon">🧠</span>
  Cuatro preguntas y a casa:
</div>

1. Una MAC 00:1A:2B:3C:4D:5E: ¿cuántos bytes, cuál es el OUI?
2. ¿Qué MAC es broadcast y dónde aparece?
3. Te mudas de casa con el mismo ordenador: ¿cambia tu MAC? ¿Y tu IP?
4. Una MAC empieza por 02:…: ¿unicast o multicast? ¿De fábrica o local?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>6 bytes (48 bits)</strong>; los 3 primeros son el <strong>OUI</strong> del fabricante (bit I/G = 0 → unicast)</li>
    <li><strong>FF:FF:FF:FF:FF:FF</strong> — las tramas que van «para todos»: preguntas ARP, anuncios DHCP</li>
    <li>La <strong>MAC no cambia</strong> (es de la tarjeta); la <strong>IP sí</strong> (tu nueva red te da otra)</li>
    <li>El nibble 2 es 0010: bit I/G = 0 → <strong>unicast</strong>; bit U/L = 1 → <strong>administrada localmente</strong></li>
  </ul>
</div>

---
class: compact-slide
---

## La trama Ethernet
### El sobre de la capa 2

<div class="key-idea" style="margin-top:1rem;">
  <div class="key-idea-text" style="font-size:1.15rem;">
    La <strong>trama</strong> es la PDU de la capa 2: un «sobre» con <strong>MAC destino</strong> (¿para quién?), <strong>MAC origen</strong> (¿quién?), <strong>EtherType</strong> (¿qué lleva dentro?) y <strong>FCS</strong> (¿llegó entera?) — por cable o por el aire.
  </div>
</div>

<div class="diagram-frame diagram-medium" style="margin-top:0.6rem; height:240px;">
  <Excalidraw drawFilePath="/diagrams/ud03-par-trama-ethernet.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Los campos, campo a campo

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Campo</th><th>Tamaño</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><strong>Dest MAC</strong></td><td>6 B</td><td>¿Para quién es en la LAN?</td></tr>
        <tr><td><strong>Src MAC</strong></td><td>6 B</td><td>Quién la envió (el switch lo aprende)</td></tr>
        <tr><td><strong>EtherType</strong></td><td>2 B</td><td>0x0800 IPv4 · 0x86DD IPv6 · 0x0806 ARP</td></tr>
        <tr><td><strong>Payload</strong></td><td>46–1500 B</td><td>Los datos (MTU 1500)</td></tr>
        <tr><td><strong>FCS</strong></td><td>4 B</td><td>CRC: si no cuadra, trama fuera</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      Cobre y fibra (<strong>IEEE 802.3</strong>): cabecera de 14 B + FCS de 4 B.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>El MTU 1500</strong> no es magia de IP: es el techo del payload Ethernet. Si los datos de arriba pesan más, IP fragmenta.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <strong>Verlo de verdad:</strong> Wireshark, filtro <code>eth</code>, y en cada trama miras Destination/Source (las MACs) y Type (el EtherType).
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Un cable sucio o una interferencia → FCS malo → <strong>trama descartada</strong>. El receptor no «repara»: tira y listo.
    </div>
  </div>
</div>

---
class: compact-slide
---

## En el aire (802.11 vs 802.3)

<div class="two-cols">
  <div class="left">
    <div class="success">
      <strong>No cambia:</strong> capa 2 y entrega por MAC. El chip WiFi <strong>reconstruye una trama válida</strong> para la capa 3.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Cambia en el aire:</strong> hasta <strong>4 MACs</strong> por trama, cabecera más larga (Frame Control, duración…), radio compartida y el AP cifra (WPA2/WPA3).
    </div>
  </div>
</div>

<div class="two-cols">
  <div class="left">
    <div class="success">
      <strong>Lo que no cambia:</strong> sigue siendo <strong>capa 2</strong>, entrega local por MAC, y el mundo IP de arriba ni se entera de si venías de un RJ45 o de una antena.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Al otro lado, el chip WiFi <strong>reconstruye una trama válida</strong> para entregarla a la capa 3.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Lo que cambia en el aire (802.11):</strong> hasta <strong>4 MACs</strong> por trama, cabecera más larga (Frame Control, duración, secuencias…), canal de radio compartido con colisiones, y el AP cifra/descifra en el borde (WPA2/WPA3).
    </div>
  </div>
</div>

---
class: sparse-slide
---

## Mini-chequeo: la trama Ethernet

<div class="question-card">
  <span class="question-icon">🧠</span>
  Tres preguntas:
</div>

1. ¿Qué tres campos «de dirección o tipo» lleva siempre una trama Ethernet II?
2. Si Wireshark muestra EtherType 0x0806, ¿qué hay dentro (sin abrirlo)?
3. ¿Qué cambia y qué no pasa de cobre a WiFi en capa 2?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Dest MAC</strong> (para quién), <strong>Src MAC</strong> (quién), <strong>EtherType</strong> (qué lleva dentro)</li>
    <li><strong>ARP</strong> — la etiqueta lo dice; el detalle completo llega con la unidad de IP</li>
    <li><strong>Cambia:</strong> estándar, cabecera, nº de MACs, medio compartido · <strong>No cambia:</strong> capa 2 y entrega por MAC</li>
  </ul>
</div>

---
class: compact-slide
---

## Encapsulación
### Las muñecas rusas de la red

<div class="key-idea" style="margin-top:1rem;">
  <div class="key-idea-text" style="font-size:1.15rem;">
    Encapsular es que cada capa <strong>envuelva los datos de la de arriba con su cabecera</strong>: la 4 añade los <strong>puertos</strong>, la 3 la <strong>IP</strong> y la 2 las <strong>MACs</strong> — y al llegar, cada capa se quita su sobre.
  </div>
</div>

<div class="diagram-frame diagram-medium" style="margin-top:0.6rem; height:240px;">
  <Excalidraw drawFilePath="/diagrams/ud03-par-encapsulacion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## Un viaje de verdad: PC → router → servidor

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Tramo</th><th>MAC (trama)</th><th>IP (paquete)</th></tr></thead>
      <tbody>
        <tr><td><strong>PC → router</strong></td><td>tú ↔ router</td><td>tú ↔ servidor</td></tr>
        <tr><td><strong>Router → servidor</strong></td><td>router ↔ siguiente salto</td><td><strong>tú ↔ servidor (intacta)</strong></td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      <strong>Regla de oro del viaje:</strong> las <strong>MACs mueren en cada salto</strong> (tramo nuevo, trama nueva); la <strong>IP destino viaja intacta</strong> de principio a fin.
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Capa 2 al recibir:</strong> ¿la MAC destino es mía (o broadcast)? ¿FCS correcto? → quita la cabecera Ethernet y sube el paquete IP</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Capa 3:</strong> ¿la IP destino soy yo? → quita la cabecera IP y entrega el segmento a TCP/UDP</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Capa 4:</strong> el <strong>puerto destino</strong> decide a qué programa va (80 → navegador)</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      <strong>La cabecera solo la entiende su capa:</strong> el switch mira MACs y ni sabe que hay un puerto 80 dentro; el router mira la IP y le da igual quién mandó el cable o el WiFi.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: encapsulación

<div class="question-card">
  <span class="question-icon">🧠</span>
  Último chequeo de la unidad:
</div>

1. ¿Qué cabecera añade cada capa — la 4, la 3 y la 2? ¿Y qué PDU resulta en cada una?
2. En el viaje PC → router → servidor: ¿por qué la IP no cambia y las MAC sí?
3. Si el FCS de una trama no cuadra, ¿qué hace la capa 2?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>4:</strong> TCP/UDP (puertos) → segmento · <strong>3:</strong> IP → paquete · <strong>2:</strong> Ethernet (MACs) + FCS → trama</li>
    <li>Las <strong>MACs</strong> identifican los extremos de <em>cada enlace</em>; la <strong>IP</strong> identifica el destino <em>final</em> y debe aguantar todo el recorrido</li>
    <li><strong>La descarta</strong> (no la entrega). El reenvío lo decide el emisor: si es TCP, retransmite y nace una trama nueva</li>
  </ul>
</div>

---
class: sparse-slide
---

## Resumen de la unidad
### Cuatro frases para quedarte

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">🗼</span>
    <strong>Modelo OSI</strong>
    <p style="font-size:0.9rem;">Mapa de 7 capas; TCP/IP corre de verdad. Esta unidad vive en la capa 2 (con la 1 de la UD2 como suelo).</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🪪</span>
    <strong>MAC</strong>
    <p style="font-size:0.9rem;">48 bits, OUI de fábrica + serie. Unicast, multicast o broadcast (FF:FF:FF:FF:FF:FF). Identidad local de cada salto.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📦</span>
    <strong>Trama Ethernet</strong>
    <p style="font-size:0.9rem;">MACs + EtherType + FCS sobre 1500 B de payload. En el aire, 802.11 cambia la trama pero no la capa.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🪆</span>
    <strong>Encapsulación</strong>
    <p style="font-size:0.9rem;">Cada capa aporta su cabecera: segmento → paquete → trama → bits. Las MACs saltan, la IP viaja.</p>
  </div>
</div>

---
layout: closing
---
