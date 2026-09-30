---
layout: cover
---

# Unidad 02 — Ethernet, medios de transmisión y cableado<br>Bloque 02

## 1r CFGS ASIR · Planificación y Administración de Redes

---
---

## Cableado estructurado
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>cableado estructurado</strong> es la forma profesional de cablear un edificio: sigue el estándar <strong>TIA/EIA-568</strong>, separa el cable empotrado (<strong>horizontal</strong>) de los <strong>latiguillos</strong> flexibles, y hace que el 90% de los cambios se resuelvan moviendo un latiguillo — no tocando obra.
  </div>
</div>

El estándar fija categorías y distancias certificables, <strong>topología en estrella</strong> (cada toma llega al rack) y componentes con interfaces comunes (RJ45).

---
class: compact-slide
---

## El recorrido de la señal
### Del PC al switch, sin tocar obra

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-cableado-estructurado.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Latiguillo</strong> (1–5 m, flexible): del PC a la roseta</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Keystone</strong>: la roseta RJ45 hembra donde termina el cable horizontal</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Cable horizontal</strong> (sólido, empotrado): atraviesa paredes y falsos techos hasta el rack</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Patch panel</strong>: concentra todos los horizontales (12–48 puertos)</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Latiguillo</strong> del panel al switch — cambiar de puerto = mover un latiguillo</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los cuatro elementos y sus ventajas

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Elemento</th><th>Dónde vive</th></tr></thead>
      <tbody>
        <tr><td><strong>Latiguillo</strong></td><td>Extremos: PC↔roseta y panel↔switch</td></tr>
        <tr><td><strong>Keystone</strong></td><td>La roseta de pared</td></tr>
        <tr><td><strong>Patch panel</strong></td><td>El rack</td></tr>
        <tr><td><strong>Cable horizontal</strong></td><td>Empotrado: no se toca nunca</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      Horizontal <strong>sólido</strong> (mejor rendimiento, vive en la pared); latiguillo <strong>flexible</strong> (sobrevive al roce). Al revés: fallo de novato.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Lo que ganas:</strong> cada toma identificada, cambios sin obra, latiguillos que se sustituyen en segundos e instalación <strong>certificable</strong> por categoría.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>La chapuza se paga:</strong> cambiar un PC de mesa sin cableado estructurado = rehacer tramos; con él = mover un latiguillo en 2 minutos.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Etiquetado y documentación

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Cada puerto, etiqueta en ambos extremos:</strong> el keystone R-3-14 corresponde al puerto 14 del patch panel</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Esquema de racks actualizado:</strong> qué va en cada panel y qué switch lo alimenta</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Números, no colores improvisados:</strong> un criterio fijo planta-número</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      La documentación es el activo que se agradece <strong>a los tres años</strong>, no el primer día.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>La prueba del algodón:</strong> si para saber de dónde viene un cable tienes que conectar-desconectar a ciegas, tu cableado «estructurado» solo lo es de nombre.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: cableado estructurado

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. Enumera los componentes que separan un PC de un switch en cableado estructurado.
2. Un usuario cambia de mesa en la misma oficina. ¿Qué se toca físicamente?
3. ¿Por qué el estándar TIA/EIA-568 exige topología en estrella?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Latiguillo → keystone → cable horizontal → patch panel → latiguillo</strong> (dos latiguillos + un tramo fijo)</li>
    <li>Solo <strong>latiguillos</strong>: un latiguillo nuevo en la roseta y, si cambia el puerto, otro en el panel. La obra queda intacta</li>
    <li>En estrella cada toma llega directa al panel: <strong>fácil de etiquetar, diagnosticar y ampliar</strong>; las cadenas son un dolor para localizar fallos</li>
  </ul>
</div>

---
---

## El modelo OSI
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>modelo OSI</strong> es un <strong>mapa teórico de 7 capas</strong> que reparte el trabajo de la red; en la práctica el mundo usa <strong>TCP/IP</strong>, pero seguimos usando el mapa OSI para <strong>hablar el mismo idioma</strong> — y esta unidad vive en las <strong>capas 1 y 2</strong>.
  </div>
</div>

---
---

## Las 7 capas, en el mapa

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-par-modelo-osi.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Regla de oro y truco de memoria

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">OSI no es un protocolo que se instale: es un <strong>vocabulario compartido</strong> definido por la ISO en los años 80</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Cada capa solo habla con su vecina</strong>: si la 2 no sabe mover bits, no le importa — se los pide a la 1</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">En TCP/IP real: aplicación + presentación + sesión → <strong>una sola capa de aplicación</strong>; enlace + física → <strong>acceso a red</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>El truco de los tres de abajo:</strong> capa 1 = <strong>bits</strong>, capa 2 = <strong>trama</strong>, capa 3 = <strong>paquete</strong>. Con esa escalera sitúas cualquier fallo.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Cuando un profe dice «capa 2» o «capa 3» usa <strong>OSI como mapa</strong>, aunque el equipo corra TCP/IP. Nadie instala «la capa 6»: sí existen Ethernet, IP y TCP.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: modelo OSI

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué PDU viaja en las capas 1, 2 y 3?
2. ¿En qué capas vive esta unidad y por qué?
3. ¿OSI y TCP/IP son protocolos o modelos? ¿Cuál corre de verdad en Internet?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>1 → bits · 2 → trama · 3 → paquete</strong></li>
    <li>En las <strong>capas 1 y 2</strong>: medios y cableado (1), trama Ethernet con MACs (2). La capa 3 (IP) llega en la UD3</li>
    <li>Son <strong>modelos</strong> (mapas). En Internet manda <strong>TCP/IP</strong>; OSI se usa para nombrar y diagnosticar</li>
  </ul>
</div>

---
---

## La trama Ethernet
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    La <strong>trama</strong> (<em>frame</em>) es la <strong>PDU de la capa 2</strong>: un «sobre» con <strong>MACs de origen y destino</strong>, un <strong>EtherType</strong> que dice qué lleva dentro y un <strong>FCS</strong> que comprueba que llegó entera — por cable o por el aire.
  </div>
</div>

Capa 1 convierte la trama en bits (tensión, luz u onda); capa 2 la empaqueta para que otro equipo de la <strong>misma red local</strong> sepa: ¿es para mí? ¿de quién viene? ¿llegó entera?

---
class: compact-slide
---

## Los campos de la trama

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame diagram-medium">
      <Excalidraw drawFilePath="/diagrams/ud02-par-trama-ethernet.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Campo</th><th>Tamaño</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><strong>Dest MAC</strong></td><td>6 B</td><td>¿Para quién es en la LAN?</td></tr>
        <tr><td><strong>Src MAC</strong></td><td>6 B</td><td>Quién la envió</td></tr>
        <tr><td><strong>EtherType</strong></td><td>2 B</td><td>0x0800 IPv4 · 0x0806 ARP</td></tr>
        <tr><td><strong>Payload</strong></td><td>46–1500 B</td><td>Los datos (MTU 1500)</td></tr>
        <tr><td><strong>FCS</strong></td><td>4 B</td><td>CRC: si no cuadra, fuera</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      El <strong>MTU 1500</strong> es el techo del payload Ethernet: si los datos de arriba son más grandes, IP fragmenta.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Ethernet y WiFi: misma capa, distinta trama

<div class="two-cols">
  <div class="left">
    <div class="success">
      <strong>Lo que no cambia:</strong> sigue siendo <strong>capa 2</strong>, entrega local por MAC, y las capas superiores ven «una trama» y ni se enteran del medio.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Al otro lado, la tarjeta (o el chip WiFi) <strong>reconstruye una trama válida</strong> para entregarla a la capa 3.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Lo que cambia en el aire (802.11):</strong> hasta <strong>4 MACs</strong> por trama, cabecera más larga (Frame Control, duración…), canal de radio compartido con colisiones e interferencias, y el AP cifra/descifra en el borde (WPA2/WPA3).
    </div>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: trama Ethernet

<div class="question-card">
  <span class="question-icon">🧠</span>
  Tres preguntas y a casa:
</div>

1. ¿Qué tres campos «de dirección o tipo» lleva siempre una trama Ethernet II?
2. Si Wireshark muestra EtherType 0x0806, ¿qué hay dentro (sin abrirlo)?
3. ¿Qué cambia y qué no pasa de cobre a WiFi en capa 2?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Dest MAC</strong> (para quién), <strong>Src MAC</strong> (quién), <strong>EtherType</strong> (qué lleva dentro)</li>
    <li><strong>ARP</strong> — la etiqueta lo dice; el detalle llega en la UD3</li>
    <li><strong>Cambia:</strong> estándar (802.3 vs 802.11), cabecera, nº de MACs, medio compartido · <strong>No cambia:</strong> capa 2, entrega por MAC</li>
  </ul>
</div>

---
---

## Resumen del bloque 02
### Tres frases para quedarte

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">🏢</span>
    <strong>Cableado estructurado</strong>
    <p style="font-size:0.9rem;">TIA/EIA-568, estrella, cable horizontal sólido + latiguillos flexibles. Cambiar = mover un latiguillo, nunca tocar obra.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🗼</span>
    <strong>Modelo OSI</strong>
    <p style="font-size:0.9rem;">Mapa de 7 capas; TCP/IP corre de verdad. Esta unidad vive en la 1 (bits y medios) y la 2 (trama y MACs).</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📦</span>
    <strong>Trama Ethernet</strong>
    <p style="font-size:0.9rem;">MACs + EtherType + FCS sobre un payload de 1500 B. En el aire, 802.11 cambia la trama pero no la capa.</p>
  </div>
</div>

---
layout: closing
---
