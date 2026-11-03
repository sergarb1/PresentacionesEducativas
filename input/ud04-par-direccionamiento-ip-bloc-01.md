---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 1: IPv4, binario y clases

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Dónde nos quedamos
### De la trama Ethernet a la dirección IP

<div class="key-idea">
  <div class="key-idea-text">
    En la unidad anterior aprendimos a entregar una trama <strong>dentro del cable</strong>: el switch mira la MAC y la manda por el puerto correcto. Pero la MAC solo identifica a un vecino. Si el destino está en otra ciudad, hace falta responder otra pregunta: <strong>¿en qué red vive ese equipo?</strong> Esa es la tarea de la <strong>capa 3</strong>, y su dirección es la <strong>IP</strong>.
  </div>
</div>

---
class: compact-slide
---

## MAC e IP: dos preguntas distintas

<table>
  <thead><tr><th></th><th>Dirección MAC</th><th>Dirección IP</th></tr></thead>
  <tbody>
    <tr><td><strong>Alcance</strong></td><td>Un enlace: el cable y los switches</td><td>Toda la red: atraviesa routers</td></tr>
    <tr><td><strong>Capa</strong></td><td>2 — enlace</td><td>3 — red</td></tr>
    <tr><td><strong>Formato</strong></td><td>48 bits: seis pares hexadecimales</td><td>32 bits: cuatro octetos decimales</td></tr>
    <tr><td><strong>Quién la asigna</strong></td><td>El fabricante, grabada en la tarjeta</td><td>El administrador o el DHCP</td></tr>
    <tr><td><strong>¿Cambia al viajar?</strong></td><td>No</td><td>Sí, si pasa por NAT o cambia de red</td></tr>
    <tr><td><strong>Pregunta que responde</strong></td><td>¿A qué tarjeta entrego la trama?</td><td>¿En qué red está el destino?</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Las dos son necesarias y se reparten el trabajo: el <strong>router</strong> decide la ruta mirando la IP; para el último salto, dentro del cable, <strong>ARP</strong> traduce la IP a la MAC del destinatario.
</div>

---
class: compact-slide
---

## El recorrido de la unidad 04

Todo el direccionamiento se puede resumir en tres preguntas. Este bloque responde a la primera.

<table>
  <thead><tr><th></th><th>La pregunta</th><th>Con qué se responde</th></tr></thead>
  <tbody>
    <tr><td><strong>Bloque 1</strong></td><td>¿Cómo se lee y se calcula una dirección?</td><td>Octetos, máscara, binario, AND, clases, CIDR, direcciones privadas y públicas, ARP</td></tr>
    <tr><td><strong>Bloque 2</strong></td><td>¿Cómo se reparte el espacio entre redes y equipos?</td><td>Subnetting, VLSM, DHCP</td></tr>
    <tr><td><strong>Bloque 3</strong></td><td>¿Y cuando no quedan direcciones?</td><td>IPv6, NDP, SLAAC, mecanismos de transición y CG-NAT</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Hoy, el bloque 1. Sin estas piezas no se entiende ni una máscara de subred ni una configuración de DHCP: todo lo demás se construye sobre ellas.
</div>

---
class: sparse-slide
---

## La capa 3: llevar el paquete de punta a punta

<div class="key-idea">
  <div class="key-idea-text">
    La capa 3 responde a una pregunta que la MAC no sabe contestar: <strong>¿en qué red está el destino?</strong> Cada equipo tiene una <strong>IP</strong>, cada router guarda una <strong>tabla de redes</strong> y, salto a salto, el paquete llega aunque cruce medio planeta. La IP es la <em>dirección postal</em>; el router, la <em>oficina de reparto</em> que decide por dónde seguir.
  </div>
</div>

---
class: compact-slide
---

## Anatomía de una IPv4: 32 bits, 4 octetos

```
 192        . 168        . 1          . 10
11000000 . 10101000 . 00000001 . 00001010
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Un <strong>octeto</strong> son 8 bits → <strong>2⁸ = 256</strong> combinaciones → cada octeto vale de <strong>0 a 255</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Cuatro octetos → <strong>32 bits</strong> → <strong>2³² = 4.294.967.296</strong> direcciones distintas. Enorme en 1981; insuficiente hoy.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Se escribe en <strong>decimal con puntos</strong> por comodidad: nadie teclea <code>11000000.10101000.00000001.00001010</code>.</div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>192.168.1.256 no existe:</strong> 256 necesita 9 bits y a un octeto solo le caben 8.
</div>

---
class: sparse-slide
---

## Por qué el octeto se detiene en 255

El valor máximo de un octeto es <code>11111111</code>: todos los bits encendidos.

```
128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255
```

Es el mismo mecanismo que un cuentakilómetros de dos cifras: cuando pasa de <code>99</code> a <code>100</code>, no cabe un tercer dígito y arrastra al siguiente. Aquí, sumar 1 a <code>11111111</code> desborda el octeto y pasa el acarreo al de la izquierda: <code>255.255.255.255 + 1 = 0.0.0.0</code>.

<div class="info" style="margin-top:0.6rem;">
  De ahí salen dos valores que aparecerán todo el rato: <code>255</code> = todos los bits a uno, y <code>0</code> = todos a cero.
</div>

---
class: compact-slide
---

## Una IP son dos direcciones a la vez

Una dirección IP no identifica un equipo suelto: identifica <strong>una red y un equipo dentro de ella</strong>. Es una dirección postal, con calle y número de portal.

```
192.168.1.10   →   192.168.1  .  10
                   └─ calle ─┘   └ portal ┘
                     la RED       el HOST
```

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">La parte de <strong>red</strong> es la que comparten todos los equipos del mismo cable: por ahí decide el router.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">La parte de <strong>host</strong> distingue a cada equipo dentro de esa red: por ahí entrega el switch.</div>
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  Mirando la IP no hay forma de saber dónde acaba la calle y empieza el portal: <strong>falta la máscara</strong>. Y sin ese dato, el equipo no sabe quién es vecino suyo.
</div>

---
class: compact-slide
---

## La máscara: la frontera entre red y host

<div class="two-cols">
  <div class="left">
    <div class="key-idea" style="margin-top:0;">
      <div class="key-idea-text">
        También son 32 bits, con una regla fija: <strong>primero unos, después ceros</strong>. Los <strong>1</strong> marcan la red; los <strong>0</strong>, el host.
      </div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Tiene que ser una racha continua de unos: <code>255.255.255.0</code> sí; <code>255.0.255.0</code> no existe.
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-mascara-bits.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
</div>

<div class="success" style="margin-top:0.4rem;">
  La máscara se escribe igual que una IP, pero <strong>no es una dirección</strong>: es una plantilla que dice qué bits de la IP se leen como red.
</div>

---
class: compact-slide
---

## Los nueve valores de un octeto de máscara

Como los bits van en bloque, un octeto de máscara solo puede tomar nueve valores. Cualquier otro número es un error de configuración.

<table>
  <thead><tr><th>Valor</th><th>Binario</th><th>Bits a 1</th><th>Valor</th><th>Binario</th><th>Bits a 1</th></tr></thead>
  <tbody>
    <tr><td><code>0</code></td><td><code>00000000</code></td><td>0</td><td><code>248</code></td><td><code>11111000</code></td><td>5</td></tr>
    <tr><td><code>128</code></td><td><code>10000000</code></td><td>1</td><td><code>252</code></td><td><code>11111100</code></td><td>6</td></tr>
    <tr><td><code>192</code></td><td><code>11000000</code></td><td>2</td><td><code>254</code></td><td><code>11111110</code></td><td>7</td></tr>
    <tr><td><code>224</code></td><td><code>11100000</code></td><td>3</td><td><code>255</code></td><td><code>11111111</code></td><td>8</td></tr>
    <tr><td><code>240</code></td><td><code>11110000</code></td><td>4</td><td colspan="3">—</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  Si alguien escribe <code>255.255.172.0</code>, no hay que calcular nada: <code>172</code> es <code>10101100</code>, no es una racha de unos y ese octeto es imposible como máscara.
</div>

---
class: compact-slide
---

## Contar en binario: los pesos de cada bit

```
Bit:      1    1    0    0    0    0    0    0
Peso:   128   64   32   16    8    4    2    1
```

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Decimal → binario:</strong> resta pesos de mayor a menor. <em>192 → 128 + 64 → <code>11000000</code></em></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Binario → decimal:</strong> suma los pesos de los bits a 1. <em><code>10101000</code> → 128 + 32 + 8 = 168</em></div>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Decimal</th><th>Binario</th><th>Decimal</th><th>Binario</th></tr></thead>
      <tbody>
        <tr><td>128</td><td><code>10000000</code></td><td>252</td><td><code>11111100</code></td></tr>
        <tr><td>192</td><td><code>11000000</code></td><td>254</td><td><code>11111110</code></td></tr>
        <tr><td>240</td><td><code>11110000</code></td><td>255</td><td><code>11111111</code></td></tr>
      </tbody>
    </table>
    <div class="success" style="margin-top:0.4rem;">
      Los valores de máscara siempre acaban en racha de unos seguida de ceros.
    </div>
  </div>
</div>

---
class: compact-slide
---

## La operación AND: solo 1 · 1 = 1

```
1 AND 1 = 1        1 AND 0 = 0        0 AND 0 = 0
```

<div class="key-idea" style="margin-top:0.2rem;">
  <div class="key-idea-text">
    El AND es la herramienta que hace el trabajo de la máscara: donde la máscara tiene un <strong>1</strong>, el bit de la IP <strong>pasa</strong>; donde tiene un <strong>0</strong>, el bit se <strong>borra</strong>. Lo que queda es la <strong>dirección de red</strong>.
  </div>
</div>

<div class="info" style="margin-top:0.3rem;">
  Es literal: <code>1</code> actúa como una ventana (deja pasar) y <code>0</code> como una persiana (tapa). Nada más que eso, repetido 32 veces.
</div>

---
class: compact-slide
---

## AND en la práctica: IP AND máscara = red

```
IP:      192.168.1.10  → 11000000.10101000.00000001.00001010
Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000
AND:                   → 11000000.10101000.00000001.00000000
Red:     192.168.1.0
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Los 24 unos de la máscara <strong>dejan pasar</strong> los 24 bits de red.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Los 8 ceros finales <strong>borran</strong> la parte de host: el <code>.10</code> desaparece del resultado.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Por eso todos los equipos de <code>192.168.1.0/24</code> dan la misma red: comparten esos 24 bits.</div>
</div>

---
class: compact-slide
---

## Para qué sirve saber la red: vecino o gateway

Con la dirección de red calculada, el equipo ya puede decidir a quién entregar el paquete. Solo hay dos casos.

<table>
  <thead><tr><th>Si el destino está…</th><th>Qué hace el emisor</th><th>Quién lo entrega</th></tr></thead>
  <tbody>
    <tr><td><strong>En mi misma red</strong></td><td>Pregunta por ARP la MAC del destino y monta la trama</td><td>El <strong>switch</strong>, puerto a puerto</td></tr>
    <tr><td><strong>En otra red</strong></td><td>Pregunta por ARP la MAC del <strong>gateway</strong> y le manda la trama a él</td><td>El <strong>router</strong>, que la reenvía</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  Una máscara mal puesta rompe la red <em>aunque la IP sea correcta</em>: el equipo cree que el destino está cerca (y no encuentra su MAC) o que está lejos (y manda al router algo que era del vecino).
</div>

---
class: compact-slide
---

## La cabecera IPv4: el sobre del paquete

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Campo</th><th>Tamaño</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><strong>IP origen / destino</strong></td><td>32 + 32 bits</td><td>Quién envía y a quién</td></tr>
        <tr><td><strong>TTL</strong></td><td>8 bits</td><td>Contador de saltos; a 0 se descarta</td></tr>
        <tr><td><strong>Protocolo</strong></td><td>8 bits</td><td><strong>1</strong> ICMP · <strong>6</strong> TCP · <strong>17</strong> UDP</td></tr>
        <tr><td><strong>ID + Flags + Offset</strong></td><td>16 bits</td><td>Campos de la <strong>fragmentación</strong></td></tr>
        <tr><td><strong>Checksum</strong></td><td>16 bits</td><td>Integridad de la <em>cabecera</em>, no de los datos</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-cabecera-ipv4.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.3rem;">
      Los routers <strong>no abren el contenido</strong>: leen el sobre, deciden por dónde y lo reenvían.
    </div>
  </div>
</div>

---
class: compact-slide
---

## TTL: cuántos routers aguanta un paquete

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Cada router que reenvía el paquete <strong>resta 1</strong> al TTL.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Si llega a <strong>0</strong>, el router lo <strong>descarta</strong> y responde un ICMP «time exceeded».</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Así una tabla de rutas mal configurada no puede tener un paquete dando vueltas para siempre.</div>
</div>

<div class="terminal" style="margin-top:0.4rem;">
<span class="prompt">C:\&gt;</span> tracert 8.8.8.8<br>
<span class="output">  1    &lt;1 ms   192.168.1.1     ← tu router, TTL 1<br>
  2     9 ms   10.64.0.1       ← el operador, TTL 2<br>
  3    12 ms   84.120.1.9      ← la red del ISP, TTL 3</span>
</div>

<div class="info" style="margin-top:0.3rem; font-size:0.9rem;">
  <code>tracert</code> saca partido del TTL: manda paquetes con 1, 2, 3… saltos y apunta quién contesta cada vez. El TTL inicial delata el sistema (<strong>64</strong> Linux, <strong>128</strong> Windows, <strong>255</strong> routers).
</div>

---
class: compact-slide
---

## Fragmentación y MTU

<div class="two-cols">
  <div class="left">
    <div class="key-idea" style="margin-top:0; padding:0.6rem 1.2rem 0.6rem 3.2rem;">
      <div class="key-idea-text">
        Cada medio tiene un techo: el <strong>MTU</strong> (<strong>1500 B</strong> en Ethernet). Un paquete mayor <strong>se fragmenta</strong>.
      </div>
    </div>
    <div class="step" style="margin-top:0.4rem;">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Fragmenta:</strong> el emisor o cualquier router con un MTU menor.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Reensambla:</strong> solo el <strong>host destino</strong>; los routers no se molestan.</div>
    </div>
    <div class="info" style="margin-top:0.3rem; font-size:0.85rem; padding:0.4rem 0.9rem;">
      Los primeros fragmentos llevan <strong>MF=1</strong> («vienen más»); el último, MF=0.
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-fragmentacion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.1rem; font-size:0.85rem; padding:0.4rem 0.9rem;">
  Fragmentar cuesta CPU y un trozo perdido obliga a repetir el paquete entero: IPv6 lo prohíbe en los routers.
</div>

---
class: compact-slide
---

## Direcciones que no se reparten

No todo valor dentro del rango sirve para asignárselo a un equipo normal.

<table>
  <thead><tr><th>Dirección</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td><strong>0.0.0.0/8</strong></td><td>«Esta red»: solo tiene sentido como origen mientras el equipo no tiene IP.</td></tr>
    <tr><td><strong>127.0.0.0/8</strong></td><td><strong>Loopback</strong>: <code>ping 127.0.0.1</code> prueba la pila TCP/IP sin tocar el cable.</td></tr>
    <tr><td><strong>169.254.0.0/16</strong></td><td><strong>APIPA</strong>: IP que se pone el propio equipo cuando el DHCP no responde.</td></tr>
    <tr><td><strong>224.0.0.0/4</strong></td><td><strong>Multicast</strong> (224.0.0.5 = OSPF, 224.0.0.1 = todos los hosts).</td></tr>
    <tr><td><strong>255.255.255.255</strong></td><td><strong>Broadcast limitado</strong>: llega a todos los hosts de la red local.</td></tr>
    <tr><td><strong>240.0.0.0/4</strong></td><td>Reservado y experimental: no se usa.</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.4rem;">
  Además, dentro de cada red hay dos direcciones que nunca se asignan: la <strong>dirección de red</strong> (todos los bits de host a 0) y la de <strong>broadcast</strong> (todos a 1).
</div>

---
class: compact-slide
---

## 169.254.x.x: la IP del que se quedó solo

```
C:\> ipconfig

   Dirección IPv4. . . : 169.254.23.14
   Máscara de subred . : 255.255.0.0
   Puerta de enlace .  : (vacía)
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El equipo <strong>pidió IP por DHCP y nadie contestó</strong>; se asignó una dirección del rango link-local y siguió adelante.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Habla con los compañeros del switch, pero <strong>no tiene gateway</strong>: no sale a Internet.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El fallo está en el servidor DHCP, en el cable/VLAN del equipo o en el <em>relay</em> que debía llevar la petición al servidor.</div>
</div>

<div class="info" style="margin-top:0.4rem;">
  En el bloque 2 veremos el intercambio completo de DHCP y qué revisar, en orden, cuando aparece esta dirección.
</div>

---
class: compact-slide
---

## Las clases: cómo se repartió el espacio al principio

Antes de 1993, el tamaño de la red venía <strong>implícito en los primeros bits</strong> de la dirección.

<table>
  <thead><tr><th>Clase</th><th>Primeros bits</th><th>Rango</th><th>Máscara</th><th>Hosts</th><th>Uso</th></tr></thead>
  <tbody>
    <tr><td><strong>A</strong></td><td><code>0</code></td><td>0–127</td><td>/8</td><td>16.777.214</td><td>Grandes redes</td></tr>
    <tr><td><strong>B</strong></td><td><code>10</code></td><td>128–191</td><td>/16</td><td>65.534</td><td>Redes medianas</td></tr>
    <tr><td><strong>C</strong></td><td><code>110</code></td><td>192–223</td><td>/24</td><td>254</td><td>Redes pequeñas</td></tr>
    <tr><td><strong>D</strong></td><td><code>1110</code></td><td>224–239</td><td>—</td><td>—</td><td>Multicast</td></tr>
    <tr><td><strong>E</strong></td><td><code>1111</code></td><td>240–255</td><td>—</td><td>—</td><td>Experimental</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Por eso, mirando el primer octeto, se sabía la máscara sin que nadie la escribiera: <code>10.x</code> era una /8 y <code>192.168.x</code> una /24. Hoy las clases están en desuso, pero el vocabulario sigue vivo en conversaciones y en la documentación.
</div>

---
class: compact-slide
---

## Por qué las clases se quedaron cortas

El problema era el tamaño fijo: cada clase ofrecía un único bloque, y había que gastarlo entero.

<div class="two-cols">
  <div class="left">
    <div class="comparison-grid" style="grid-template-columns:1fr;">
      <div class="comparison-item bad">
        <strong>Un instituto con 300 equipos</strong>
        <p style="margin:0.35rem 0 0;">No cabe en una clase C (254 hosts). Toca pedir una <strong>clase B</strong>: 65.534 direcciones para 300 equipos. Se desperdicia el <strong>99 %</strong> del bloque.</p>
      </div>
    </div>
  </div>
  <div class="right">
    <div class="comparison-grid" style="grid-template-columns:1fr;">
      <div class="comparison-item bad">
        <strong>Una empresa con 16 millones de equipos</strong>
        <p style="margin:0.35rem 0 0;">Es el único caso que aprovecha una <strong>clase A</strong> entera. Hay muy pocas organizaciones así, y las 126 clases A disponibles se agotaron enseguida.</p>
      </div>
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  Resultado: el espacio se agotó <strong>mucho antes</strong> de lo que decía la cuenta de 4.300 millones. En 2011 la IANA repartió los últimos bloques; la solución intermedia fue CIDR y la definitiva, IPv6.
</div>

---
class: compact-slide
---

## CIDR: manda la /n (1993)

<strong>Classless Inter-Domain Routing</strong>: la máscara deja de venir implícita en la dirección y <strong>se escribe siempre</strong>. Cualquier red puede tener cualquier longitud.

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">La IP se anota con su <strong>prefijo /n</strong>: <code>192.168.1.128/25</code> es una red perfectamente legal.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>n</strong> es cuántos bits van a uno en la máscara, y por tanto cuántos identifican la red.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Con eso, un bloque grande se puede <strong>trocear</strong> en trozos a medida en lugar de gastarlo entero.</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>Las dos notaciones son la misma cosa:</strong> <code>/26</code> = <code>255.255.255.192</code>. La barra se usa para escribir y la máscara para configurar.
    </div>
    <div class="success" style="margin-top:0.5rem;">
      CIDR no creó direcciones nuevas: hizo que se <strong>desperdiciaran muchas menos</strong>. Eso compró años, no décadas.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Notación CIDR y tabla rápida de máscaras

| CIDR | Máscara | IPs totales | Hosts útiles | Uso típico |
|---|---|---|---|---|
| /30 | 255.255.255.252 | 4 | **2** | Enlace punto a punto |
| /29 | 255.255.255.248 | 8 | **6** | Red muy pequeña |
| /28 | 255.255.255.240 | 16 | **14** | Grupo pequeño |
| /27 | 255.255.255.224 | 32 | **30** | Departamento pequeño |
| /26 | 255.255.255.192 | 64 | **62** | Departamento mediano |
| /25 | 255.255.255.128 | 128 | **126** | Departamento grande |
| /24 | 255.255.255.0 | 256 | **254** | Oficina estándar |
| /16 | 255.255.0.0 | 65.536 | **65.534** | Empresa mediana |

<div class="warning" style="margin-top:0.3rem;">
  Hosts útiles = <strong>2ʰ − 2</strong>: se descuentan la dirección de red y la de broadcast. Cada bit que se quita a la máscara <strong>duplica</strong> el tamaño del bloque.
</div>

---
class: compact-slide
---

## Sumarización: muchas rutas, una entrada

Un router no necesita guardar cada red por separado si comparten el principio. Se cuenta cuántos bits tienen <strong>en común por la izquierda</strong>: eso es el nuevo prefijo.

```
192.168.0.0/24  ┐
192.168.1.0/24  ├──→  192.168.0.0/22   (una sola ruta)
192.168.2.0/24  │      cubre .0.0 – .3.255
192.168.3.0/24  ┘
```

<div class="two-cols" style="margin-top:0.3rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Las cuatro redes comparten los <strong>22 primeros bits</strong>; el resto cambia.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Una ruta /22 sustituye a cuatro rutas /24: menos entradas, tabla más corta y convergencia más rápida.</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.3rem;">
  Es la misma idea que usar «Calle Mayor» en vez de enumerar los portales uno a uno. La sumarización es la base de Internet: la tabla de rutas global no tendría tamaño posible sin ella.
</div>

---
class: compact-slide
---

## Las IPs privadas (RFC 1918)

Tres rangos reservados <strong>solo para uso interno</strong>: no se enrutan en Internet.

<table>
  <thead><tr><th>Rango</th><th>CIDR</th><th>Nº de IPs</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td><strong>10.0.0.0 – 10.255.255.255</strong></td><td>/8</td><td>16.777.216</td><td>Grandes empresas</td></tr>
    <tr><td><strong>172.16.0.0 – 172.31.255.255</strong></td><td>/12</td><td>1.048.576</td><td>Empresas medianas</td></tr>
    <tr><td><strong>192.168.0.0 – 192.168.255.255</strong></td><td>/16</td><td>65.536</td><td>Hogar y pequeña oficina</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  <strong>Ojo con el rango mediano:</strong> es <code>172.16.0.0/12</code>, no todo el <code>172.x</code>. <code>172.32.5.5</code> ya es una dirección pública.
</div>

<div class="info" style="margin-top:0.4rem;">
  Millones de redes usan el mismo <code>192.168.1.0/24</code> a la vez sin chocar, porque esas direcciones <strong>nunca viajan tal cual</strong> por Internet.
</div>

---
class: compact-slide
---

## Públicas y privadas conviviendo: el NAT

<div class="two-cols">
  <div class="left">
    <h3 style="font-size:1.05rem;">La dirección pública</h3>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Única en el mundo</strong>: nadie más puede usar la misma.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Se reparte en pirámide: <strong>IANA → RIR → ISP → tú</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">No se compra: <strong>se alquila</strong>. Si cambias de operador, cambia.</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>Cómo se juntan:</strong> el router de casa sustituye la IP privada de origen por su pública y apunta la traducción en una tabla. Al volver la respuesta, hace el camino inverso.
    </div>
    <div class="success" style="margin-top:0.5rem;">
      Así, <strong>una sola pública</strong> sirve a decenas de equipos. Es el mecanismo que ha estirado IPv4 durante veinte años, y lo veremos a fondo en la unidad de NAT.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  <strong>El mapa rápido:</strong> privada = RFC 1918, la eliges tú · pública = la reparte un ISP · especial = loopback, APIPA, multicast, broadcast.
</div>

---
class: compact-slide
---

## ARP: de la IP a la MAC

La IP dice <strong>a qué equipo</strong> va el paquete; la trama necesita saber <strong>a qué tarjeta</strong>. El traductor es <strong>ARP</strong>, y su trabajo se reduce a una pregunta y una respuesta.

<div class="diagram-frame diagram-small" style="margin-top:0.3rem;">
  <Excalidraw drawFilePath="/diagrams/ud04-arp.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.2rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>ARP Request:</strong> en <strong>broadcast</strong> a todos: «¿quién tiene 192.168.1.1?».</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>ARP Reply:</strong> solo el interesado contesta, en <strong>unicast</strong>, con su MAC.</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## ARP en la práctica: la caché y sus peligros

Cada equipo guarda las respuestas aprendidas en una <strong>caché ARP</strong>, para no preguntar en cada paquete. Las entradas caducan y se refrescan solas.

```
C:\> arp -a

  192.168.1.1         00-1a-2b-3c-4d-5e     dinámico
  192.168.1.20        00-1a-2b-9f-11-02     dinámico
  192.168.1.254       f4-8e-38-aa-bb-cc     dinámico
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Si la caché tiene la MAC correcta, el paquete sale al instante; si no, el primer paquete espera la respuesta.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">ARP <strong>confía en quien contesta</strong>: nada comprueba que esa MAC sea de verdad. Ese es el punto débil.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Un equipo malicioso puede contestar por el gateway (<em>ARP spoofing</em>) y colocarse en medio. De ahí nacen técnicas de defensa como DHCP snooping y Dynamic ARP Inspection.</div>
</div>

<div class="info" style="margin-top:0.3rem;">
  En Linux el equivalente es <code>ip neigh</code>, y la caché se consulta con las mismas ideas: IP, MAC y estado de la entrada.
</div>

---
class: compact-slide
---

## Resumen del bloque 01: lo que ya sabemos hacer

| Ya sabemos… | Con qué pieza |
|---|---|
| Leer una IPv4 y comprobar si es válida | 32 bits, 4 octetos de 0 a 255 |
| Saber qué parte es red y qué parte es host | Máscara con unos seguidos de ceros |
| Calcular la dirección de red | AND entre IP y máscara |
| Decidir si el destino es vecino o está detrás del router | Comparar la red del destino con la propia |
| Escribir cualquier máscara sin depender de las clases | Notación CIDR /n |
| Elegir direcciones que no choquen con Internet | RFC 1918 y direcciones especiales |
| Entregar la trama al vecino correcto | ARP: IP → MAC |

<div class="warning" style="margin-top:0.4rem;">
  <strong>Lo que aún no sabemos:</strong> un <code>/24</code> da 254 hosts, y no siempre sobra. Si la red necesita cuatro departamentos separados, o 500 equipos, o entregar la configuración sin tocar cada PC, el bloque 1 no basta: hacen falta <strong>subnetting, VLSM y DHCP</strong>.
</div>

---
layout: closing
---
