---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 1: IPv4, binario y clases

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## La capa 3: dirección IP
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    En la unidad anterior dimos con la <strong>MAC</strong> al destinatario dentro del cable. Ahora viene la pregunta global: <strong>¿en qué red vive?</strong> La capa 3 usa la <strong>dirección IP</strong> y los <strong>routers</strong> para llevar el paquete de punta a punta, aunque cruce medio planeta.
  </div>
</div>

En este bloque: la estructura IPv4, la cabecera del paquete, el binario y la operación AND, las clases de toda la vida, CIDR y el mapa privado/público.

---

## Anatomía de una IPv4: 32 bits, 4 octetos

```
 192        . 168        . 1          . 10
11000000 . 10101000 . 00000001 . 00001010
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Un <strong>octeto</strong> son 8 bits → <strong>2⁸ = 256</strong> combinaciones → vale de <strong>0 a 255</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Por eso <strong>192.168.1.256 es inválida</strong>: el 256 necesita 9 bits, y el octeto solo tiene 8.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Total: 32 bits → <strong>2³² ≈ 4.294 millones</strong> de direcciones. Enorme en 1981, insuficiente hoy.</div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Una IP por sí sola no dice nada: falta saber qué parte es <strong>red</strong> y qué parte es <strong>host</strong>. Eso lo decide la <strong>máscara</strong> (más abajo).
</div>

---

## La cabecera IPv4: el sobre del paquete

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Campo</th><th>Tamaño</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><strong>IP origen / destino</strong></td><td>32 + 32 bits</td><td>Quién envía y a quién</td></tr>
        <tr><td><strong>TTL</strong></td><td>8 bits</td><td>Contador de saltos; a 0 se descarta <em>(evita bucles)</em></td></tr>
        <tr><td><strong>Protocolo</strong></td><td>8 bits</td><td><strong>1</strong> = ICMP · <strong>6</strong> = TCP · <strong>17</strong> = UDP</td></tr>
        <tr><td><strong>ID + Flags + Offset</strong></td><td>16 bits</td><td>Campos de la <strong>fragmentación</strong></td></tr>
        <tr><td><strong>Checksum</strong></td><td>16 bits</td><td>Integridad de la <em>cabecera</em>, no de los datos</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-cabecera-ipv4.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Los routers <strong>no abren el contenido</strong>: leen el sobre, deciden por dónde y lo reenvían.
    </div>
  </div>
</div>

---

## Fragmentación y MTU

<div class="two-cols">
  <div class="left">
    <div class="key-idea">
      <div class="key-idea-text">
        Cada medio tiene un techo: el <strong>MTU</strong> (<strong>1500 B</strong> en Ethernet). Paquete mayor ⇒ <strong>se fragmenta</strong>.
      </div>
    </div>
    <div class="step" style="margin-top:0.4rem;">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Fragmenta (IPv4):</strong> el emisor o <em>cualquier router</em> con MTU menor.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Reensambla:</strong> solo el <strong>host destino</strong>; los routers no se molestan.</div>
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-fragmentacion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Un ping de 3000 B con MTU 1500 sale en <strong>3 fragmentos</strong>; los dos primeros llevan <strong>MF=1</strong> («vienen más»).
    </div>
  </div>
</div>

---

## Direcciones con manías

No todas las IPs sirven para asignar a un equipo normal:

<table>
  <thead><tr><th>Dirección</th><th>Significado</th></tr></thead>
  <tbody>
    <tr><td><strong>127.0.0.0/8</strong></td><td><strong>Loopback</strong> (<em>ping 127.0.0.1</em> = test de la pila TCP/IP)</td></tr>
    <tr><td><strong>169.254.0.0/16</strong></td><td><strong>APIPA</strong>: IP autoasignada cuando <strong>DHCP no responde</strong></td></tr>
    <tr><td><strong>224.0.0.0/4</strong></td><td><strong>Multicast</strong> (224.0.0.5 = OSPF, 224.0.0.1 = todos los hosts)</td></tr>
    <tr><td><strong>255.255.255.255</strong></td><td><strong>Broadcast limitado</strong>: llega a todos los hosts de la red</td></tr>
    <tr><td><strong>240.0.0.0/4</strong></td><td>Reservado / experimental: mejor no tocarlo</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  ¿Ves una <strong>169.254.x.x</strong> en un <code>ipconfig</code>? El servidor DHCP <strong>no respondió</strong>: el PC se apañó solo y queda sin salida a Internet.
</div>

---

## El binario: el idioma de las redes
### Pesos de cada bit y conversión

```
Bit:      1    1    0    0    0    0    0    0
Peso:   128   64   32   16    8    4    2    1
```

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Decimal → binario:</strong> restar pesos de mayor a menor. <em>192 → 128+64 → 11000000</em></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Binario → decimal:</strong> sumar los pesos de los bits a 1. <em>10101000 → 128+32+8 = 168</em></div>
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
    <div class="success" style="margin-top:0.5rem;">
      Los valores «redondos» de máscaras siempre son una racha de <strong>unos seguida de ceros</strong>.
    </div>
  </div>
</div>

---

## La operación AND: solo 1·1 = 1

```
1 AND 1 = 1
1 AND 0 = 0
0 AND 0 = 0
```

<div class="key-idea">
  <div class="key-idea-text">
    La máscara tiene <strong>1s en la porción de red</strong> y <strong>0s en la de host</strong>. El AND con 1 <strong>conserva</strong> el bit de la IP; el AND con 0 lo <strong>borra</strong>. Resultado: la <strong>dirección de red</strong>.
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Pregunta estrella de examen:</strong> ¿están 192.168.1.10 y 192.168.1.200 en la misma red? → calcula el AND de ambas con la máscara y compara.
</div>

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
  <div class="step-content">Los 24 unos de la máscara <strong>dejan pasar</strong> los bits de red.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Los 8 ceros finales <strong>borran</strong> la parte de host (<em>el .10 salta por la ventana</em>).</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Un equipo sabe así <strong>quién es vecino suyo</strong> (habla directo) y quién no (usa el <strong>gateway</strong>).</div>
</div>

---

## ARP: de la IP a la MAC

La IP dice <strong>a qué equipo</strong>; la trama necesita <strong>a qué MAC</strong>. El traductor es <strong>ARP</strong>:

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-arp.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Las clases: el antiguo régimen

<table>
  <thead><tr><th>Clase</th><th>Primeros bits</th><th>Rango</th><th>Máscara por defecto</th><th>Uso</th></tr></thead>
  <tbody>
    <tr><td><strong>A</strong></td><td><code>0</code></td><td>0–127</td><td>/8</td><td>Grandes redes (16.7M hosts)</td></tr>
    <tr><td><strong>B</strong></td><td><code>10</code></td><td>128–191</td><td>/16</td><td>Medianas (65.534 hosts)</td></tr>
    <tr><td><strong>C</strong></td><td><code>110</code></td><td>192–223</td><td>/24</td><td>Pequeñas (254 hosts)</td></tr>
    <tr><td><strong>D</strong></td><td><code>1110</code></td><td>224–239</td><td>—</td><td>Multicast</td></tr>
    <tr><td><strong>E</strong></td><td><code>1111</code></td><td>240–255</td><td>—</td><td>Experimental</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Su defecto:</strong> clasificaba por primeros bits con <strong>máscaras fijas</strong>: una clase A sobraba para casi todos y una C se quedaba corta. Ese desperdicio adelantó el agotamiento de IPv4.
</div>

---

## CIDR: manda la /n (1993)

**Classless Inter-Domain Routing**: se acaban las clases; cualquier máscara con cualquier red.

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">La IP se anota con <strong>máscara /n</strong>: <code>192.168.1.128/25</code> ya es legal.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Sumarización:</strong> agrupar rutas que comparten bits por la izquierda.</div>
    </div>
  </div>
  <div class="right">
    <pre><code>192.168.0.0/24  ┐
192.168.1.0/24  ├──→  192.168.0.0/22   (una sola ruta)
192.168.2.0/24  │      cubre .0 – .3.255
192.168.3.0/24  ┘</code></pre>
    <div class="success" style="margin-top:0.5rem;">
      Las 4 redes comparten los <strong> primeros 22 bits</strong>; el resumen es /22. Menos rutas = enrutamiento más ágil.
    </div>
  </div>
</div>

---

## Las IPs privadas (RFC 1918)

Tres rangos reservados <strong>solo para uso interno</strong>: no son enrutables en Internet.

<table>
  <thead><tr><th>Rango</th><th>CIDR</th><th>Nº de IPs</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td><strong>10.0.0.0 – 10.255.255.255</strong></td><td>/8</td><td>16.777.216</td><td>Grandes empresas</td></tr>
    <tr><td><strong>172.16.0.0 – 172.31.255.255</strong></td><td>/12</td><td>1.048.576</td><td>Empresas medianas</td></tr>
    <tr><td><strong>192.168.0.0 – 192.168.255.255</strong></td><td>/16</td><td>65.536</td><td>Hogar y pequeña oficina</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Ojo con el rango B:</strong> el bloque es <strong>172.16.0.0/12</strong>, no todo el 172.x: <code>172.32.5.5</code> ya es pública.
</div>

<div class="info" style="margin-top:0.5rem;">
  Se reutilizan en millones de redes a la vez: cada router las <strong>NAT-iza</strong> a su pública al salir a Internet.
</div>

---

## Públicas: únicas en el mundo

<div class="two-cols">
  <div class="left">
    <h3 style="font-size:1.05rem;">La pública que viaja por Internet</h3>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Únicas a nivel mundial</strong>: nadie más puede usar la misma.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Reparto en pirámide: <strong>IANA → RIR → ISP → tú</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">No se «compran»: <strong>se alquilan</strong>. Cambias de operador, cambia la IP.</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>Ejemplo:</strong> <code>8.8.8.8</code> es un DNS de Google: única, pública, y vivida en todo el mundo.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>El mapa mental:</strong> privada = RFC 1918, lo eliges tú · pública = la reparte un ISP · especial = loopback, APIPA, multicast, broadcast.
    </div>
  </div>
</div>

---

## Máscara de subred: la frontera

<div class="two-cols">
  <div class="left">
    <div class="key-idea">
      <div class="key-idea-text">
        También 32 bits, con una regla fija: <strong>primero unos, después ceros</strong>. Los 1s marcan la <strong>red</strong>; los 0s, el <strong>host</strong>.
      </div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Solo existen <strong>9 valores por octeto</strong>: 0, 128, 192, 224, 240, 248, 252, 254, 255. Otro (<em>172 como máscara</em>) ⇒ error.
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-small">
      <Excalidraw drawFilePath="/diagrams/ud04-mascara-bits.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="success" style="margin-top:0.2rem; font-size:1.05rem;">
      Sin máscara, una IP es una isla: no sabe quién es vecino suyo y quién necesita el gateway.
    </div>
  </div>
</div>

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

<div class="warning" style="margin-top:0.2rem; padding-top:0.3rem; padding-bottom:0.3rem; font-size:0.85rem;">
  Hosts útiles = <strong>2ʰ − 2</strong>: se descuentan <strong>red</strong> y <strong>broadcast</strong>; cada bit de host ganado <strong>duplica</strong> el tamaño.
</div>

---

## Mini-chequeo: IPv4 y máscaras

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Cuántos bits y octetos tiene una IPv4? ¿Por qué 192.168.1.256 es inválida?
2. ¿Qué dirección especial es `169.254.0.5`? ¿Y qué significa que la vea en un `ipconfig`?
3. ¿De qué clase es `172.20.30.40`? ¿Y `8.8.8.8`?
4. Con IP `10.0.0.5` y máscara /8, ¿cuál es la dirección de red (AND)?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> 32 bits, 4 octetos de 8 → 0-255; 256 necesitaría 9 bits. · <strong>2.</strong> APIPA: el DHCP no respondió. · <strong>3.</strong> Clase B (128-191) y clase A (0-127). · <strong>4.</strong> AND con 255.0.0.0 → <strong>10.0.0.0/8</strong>.
</div>

---
layout: closing
---
