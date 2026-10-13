---
layout: cover
---

# Unidad 05 — Switching y VLAN<br>Bloque 2: bucles, STP y RSTP

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## La tormenta de broadcast
### Cuando los broadcasts rebotan sin fin

<div class="key-idea">
  <div class="key-idea-text">
    Si en una red conmutada hay un <strong>bucle</strong> (dos switches conectados por dos cables) y no existe protección, las tramas broadcast <strong>rebotan de switch en switch para siempre</strong>: cada copia se multiplica, el tráfico se dispara y la red colapsa en segundos.
  </div>
</div>

Los bucles nacen de la <strong>redundancia bienintencionada</strong>: conectamos por dos caminos para que la red no se caiga… y sin STP, eso es una bomba de relojería.

---
class: compact-slide
---

## El bucle, paso a paso

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>PC1</strong> envía un ARP broadcast («¿quién tiene esta IP?»).</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Switch A</strong> lo inunda por todos los puertos, incluido el segundo cable hacia B.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Switch B</strong> lo recibe y lo inunda por todos <em>incluido el otro cable hacia A</em>.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Switch A</strong> lo vuelve a recibir… ¡y lo inunda otra vez! Porque sí: <strong>eternamente</strong>.</div>
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium" style="height:230px;">
      <Excalidraw drawFilePath="/diagrams/ud05-tormenta-broadcast.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="warning" style="margin-top:0.4rem;">
      <strong>¿Por qué el broadcast?</strong> Porque se inunda siempre (MAC conocida o no): el bucle lo multiplica sin control. El unicast solo rebotaría mientras la MAC sea desconocida.
    </div>
  </div>
</div>

---

## Síntomas de una tormenta

<table>
  <thead><tr><th>Síntoma</th><th>Por qué</th></tr></thead>
  <tbody>
    <tr><td>LEDs del switch parpadeando sin parar</td><td>Saturación total de los puertos</td></tr>
    <tr><td>PCs que no responden al ping</td><td>La CPU está ocupada procesando millones de broadcasts</td></tr>
    <tr><td>Red lentísima o «muerta»</td><td>Ancho de banda consumido por copias duplicadas</td></tr>
    <tr><td>Ping que falla intermitentemente</td><td>Pérdidas por saturación</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Trampa de Packet Tracer:</strong> conectas dos switches con dos cables, todo funciona… hasta que alguien envía un ARP y la red se derrumba. El fallo no son los cables: es la <strong>topología con bucle sin protección</strong>.
</div>

---
class: compact-slide
---

## La solución: STP (IEEE 802.1D)

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Detecta</strong> bucles analizando la topología.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Bloquea</strong> los puertos que crearían el bucle (los pone «en espera»).</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Reacciona</strong>: si el enlace activo falla, desbloquea el de respaldo al instante.</div>
    </div>
    <div class="success" style="margin-top:0.5rem;">
      <strong>Redundancia bien hecha:</strong> dos caminos físicos, uno solo activo a la vez.
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium" style="height:250px;">
      <Excalidraw drawFilePath="/diagrams/ud05-stp-fisica-logica.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.4rem;">
      Como el metro: se deja activa <strong>una línea</strong> entre dos estaciones; las demás cerradas por si la principal se corta.
    </div>
  </div>
</div>

---

## Las BPDUs: el idioma de STP

Los switches intercambian <strong>BPDUs</strong> cada <strong>2 segundos</strong> (hello time): una tarjeta de presentación con datos de la topología.

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Campo BPDU</th><th>Qué contiene</th></tr></thead>
      <tbody>
        <tr><td><strong>Bridge ID</strong></td><td>Prioridad (2 B) + MAC (6 B) del emisor</td></tr>
        <tr><td><strong>Root Bridge ID</strong></td><td>El ID del switch que el emisor cree que es la raíz</td></tr>
        <tr><td><strong>Coste del camino</strong></td><td>Coste acumulado hasta el Root Bridge</td></tr>
        <tr><td><strong>Temporizadores</strong></td><td>Hello, Max Age y Forward Delay</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Velocidad</th><th>Coste</th></tr></thead>
      <tbody>
        <tr><td>10 Mbps</td><td>100</td></tr>
        <tr><td>100 Mbps (FastEt)</td><td><strong>19</strong></td></tr>
        <tr><td>1 Gbps</td><td><strong>4</strong></td></tr>
        <tr><td>10 Gbps</td><td>2</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      Con estos datos, todos los switches construyen la <strong>misma foto</strong> de la red y acuerdan quién manda.
    </div>
  </div>
</div>

---

## La elección del Root Bridge

Gana el <strong>Bridge ID más bajo</strong>: primero la <strong>prioridad</strong>; si empatan, la <strong>MAC más baja</strong>.

```
Bridge ID = Prioridad (2 B) + MAC (6 B)

Switch A: 32768.0011.2233.4400
Switch B: 28672.0011.2233.4401
        → ¡Gana B! (28672 < 32768)
```

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <pre><code>Switch(config)# spanning-tree vlan 1 priority 4096</code></pre>
  </div>
  <div class="right">
    <div class="warning">
      El Root Bridge no es el «más potente»: es el de <strong>Bridge ID más bajo</strong>. En una red bien diseñada, la raíz la elegimos <strong>nosotros</strong>, no el azar (por defecto todos valen 32768).
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los roles de puerto

<table>
  <thead><tr><th>Rol</th><th>Descripción</th></tr></thead>
  <tbody>
    <tr><td><strong>Root Port (RP)</strong></td><td>Mejor puerto <strong>hacia el Root</strong>. Uno por switch no-root.</td></tr>
    <tr><td><strong>Designated (DP)</strong></td><td>Mejor puerto <strong>de cada segmento</strong>. Uno por segmento.</td></tr>
    <tr><td><strong>Alternate (AP)</strong></td><td>Bloqueado; camino alternativo al Root (respaldo).</td></tr>
    <tr><td><strong>Backup (BP)</strong></td><td>Bloqueado <strong>dentro del mismo segmento</strong> (raro).</td></tr>
  </tbody>
</table>

---

## Los roles, a la vista

<div class="diagram-frame" style="height:280px;">
  <Excalidraw drawFilePath="/diagrams/ud05-roles-stp.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="success" style="margin-top:0.4rem;">
  <strong>Truco de examen:</strong> el Root Bridge tiene <strong>todos</strong> sus puertos Designated; los demás switches tienen <strong>1 Root Port</strong> y, si hay redundancia, Alternate bloqueados.
</div>

---
class: compact-slide
---

## Los estados de puerto

Un puerto no reenvía de golpe: pasa por estados para <strong>asegurarse de no crear un bucle</strong>.

<table>
  <thead><tr><th>Estado</th><th>¿Reenvía?</th><th>¿Aprende MACs?</th><th>Tiempo</th></tr></thead>
  <tbody>
    <tr><td><strong>Blocking</strong></td><td>No</td><td>No</td><td>20 s (Max Age)</td></tr>
    <tr><td><strong>Listening</strong></td><td>No</td><td>No</td><td>15 s</td></tr>
    <tr><td><strong>Learning</strong></td><td>No</td><td><strong>Sí</strong></td><td>15 s</td></tr>
    <tr><td><strong>Forwarding</strong></td><td><strong>Sí</strong></td><td>Sí</td><td>Indefinido</td></tr>
  </tbody>
</table>

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <div class="diagram-frame diagram-medium" style="height:215px;">
      <Excalidraw drawFilePath="/diagrams/ud05-estados-puerto.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Convergencia total: 30-50 s.</strong> Una eternidad: un PC conectado a un puerto sin protección tarda hasta 50 s en poder hablar. Por eso existen <strong>PortFast</strong> y <strong>RSTP</strong>.
    </div>
    <pre><code>Switch# show spanning-tree
  Fa0/1  Role Root       State FORWARDING
  Fa0/2  Role Alternate  State BLOCKING</code></pre>
  </div>
</div>

---

## RSTP: STP con prisa (802.1w)

STP era lento porque cada puerto esperaba sus temporizadores. RSTP hace que los puertos <strong>negocien</strong> con un handshake <strong>propuesta/acuerdo</strong>.

<table>
  <thead><tr><th>Característica</th><th>STP (802.1D)</th><th>RSTP (802.1w)</th></tr></thead>
  <tbody>
    <tr><td><strong>Convergencia</strong></td><td>30-50 s</td><td><strong>1-3 s</strong></td></tr>
    <tr><td><strong>Estados</strong></td><td>5</td><td><strong>3</strong>: Discarding, Learning, Forwarding</td></tr>
    <tr><td><strong>Roles</strong></td><td>Root, Designated, Blocked</td><td>+ Alternate y Backup</td></tr>
    <tr><td><strong>Tipos de enlace</strong></td><td>No distingue</td><td><strong>Edge</strong>, Point-to-Point, Shared</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Los tres estados de RSTP <strong>fusionan</strong> Blocking + Listening + Disabled en un único <strong>Discarding</strong>: menos estados, misma función, más velocidad.
</div>

---

## PortFast: el atajo para puertos de acceso

Un PC enchufado a un puerto normal espera <strong>hasta 50 s</strong> (Listening + Learning). En un puerto de acceso que solo conecta PCs, eso es puro desperdicio.

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>PortFast</strong> declara el puerto como <strong>edge</strong>: salta Listening y Learning → <strong>directamente a Forwarding</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El PC obtiene IP <strong>al instante</strong> (DHCP sin esperas).</div>
</div>

<pre><code>Switch(config)# interface fa0/24
Switch(config-if)# spanning-tree portfast
Switch(config-if)# spanning-tree bpduguard enable</code></pre>

<div class="warning" style="margin-top:0.5rem;">
  PortFast debe usarse <strong>solo</strong> en puertos de acceso: si conectas ahí un switch, entra en forwarding sin verificar y puedes crear un <strong>bucle silencioso</strong>. Contra eso existe <strong>BPDUGuard</strong>: si el puerto PortFast recibe una BPDU (¡hay un switch pirata!), lo deshabilita (<em>errdisable</em>). Recuperarlo: <code>shutdown</code> + <code>no shutdown</code>.
</div>

---

## Mini-chequeo: STP y convergencia

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué condición es imprescindible para que haya una tormenta de broadcast?
2. ¿Cuánto envían BPDUs los switches y cómo se calcula el Bridge ID?
3. ¿En qué estado aprende MACs pero no reenvía tráfico? ¿Cuánto tarda STP en converger?
4. ¿Qué hace PortFast y qué hace BPDUGuard en su contra?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> Un bucle sin protección + tráfico broadcast. · <strong>2.</strong> Cada 2 s; Bridge ID = prioridad + MAC (gana el más bajo). · <strong>3.</strong> Learning; 30-50 s (STP) o 1-3 s (RSTP). · <strong>4.</strong> PortFast salta a Forwarding en acceso; BPDUGuard deshabilita el puerto que recibe BPDUs.
</div>

---
layout: closing
---
