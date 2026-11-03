---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 2: Subnetting, VLSM y DHCP

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Dónde estamos
### Ya sabemos leer una dirección; ahora toca repartirla

<div class="key-idea">
  <div class="key-idea-text">
    En el bloque 1 aprendimos a <strong>leer</strong> una dirección: octetos, máscara y AND. Falta lo que se hace en un instituto o una empresa real: <strong>repartir</strong> ese espacio. Un <code>192.168.1.0/24</code> da 254 hosts para todos los departamentos a la vez, y nadie va a configurar 400 equipos a mano.
  </div>
</div>

---
class: compact-slide
---

## El recorrido del bloque 02

Dos problemas distintos que se resuelven con tres herramientas.

<table>
  <thead><tr><th></th><th>La pregunta</th><th>La herramienta</th></tr></thead>
  <tbody>
    <tr><td><strong>1</strong></td><td>Una red es demasiado grande y todo el tráfico se mezcla: ¿la puedo partir en trozos iguales?</td><td><strong>Subnetting</strong> clásico (todas las subredes con la misma máscara)</td></tr>
    <tr><td><strong>2</strong></td><td>Los trozos no necesitan el mismo tamaño: uno tiene 100 equipos y otro 5</td><td><strong>VLSM</strong> (una máscara distinta por subred)</td></tr>
    <tr><td><strong>3</strong></td><td>Ya hay direcciones, pero ¿quién se las da a cada equipo?</td><td><strong>DHCP</strong> (reparto automático y con caducidad)</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Todo se apoya en el bloque 1: cada herramienta no es más que <strong>elegir un prefijo /n</strong> y aplicar el AND para saber dónde empieza y acaba cada red.
</div>

---
class: sparse-slide
---

## Subnetting: trocear la red

<div class="key-idea">
  <div class="key-idea-text">
    Cuando una red se queda pequeña —o demasiado «ruidosa» porque el broadcast llega a todos— no hace falta pedir otra: <strong>se divide</strong>. Subnetear es <strong>tomar bits prestados de la porción de host</strong> y añadirlos a la máscara para crear varias subredes más pequeñas.
  </div>
</div>

---
class: compact-slide
---

## Las dos fórmulas que lo son todo

```
Nº de subredes          = 2ⁿ    (n = bits prestados a la máscara)
Nº de hosts por subred  = 2ʰ−2  (h = bits de host que quedan)
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>n</strong> = bits que <strong>pasas</strong> de la parte de host a la parte de red.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>h</strong> = 32 − nuevo prefijo: los bits de host que <strong>quedan libres</strong> dentro de cada subred.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Y siempre se cumple: <strong>n + h</strong> es igual a los bits de host que tenía la red original.</div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  Las dos fórmulas están unidas: cada bit que prestas <strong>duplica</strong> el número de subredes y <strong>divide por dos</strong> el número de hosts de cada una. No se puede tener más de lo uno sin perder de lo otro.
</div>

---
class: compact-slide
---

## Por qué se restan dos direcciones

En cada subred, la primera y la última dirección del bloque tienen un significado reservado.

```
192.168.1.0/30   →  2² = 4 direcciones

  192.168.1.0    dirección de RED      (todos los bits de host a 0)
  192.168.1.1    host asignable
  192.168.1.2    host asignable
  192.168.1.3    BROADCAST             (todos los bits de host a 1)
```

<div class="two-cols" style="margin-top:0.3rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">La dirección de red <strong>identifica el bloque</strong>: no se pone en ninguna tarjeta.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">La de broadcast <strong>habla a todos</strong> los equipos del bloque: por eso tampoco es de nadie.</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.3rem;">
  Consecuencia práctica: cuanto más pequeña es la subred, más pesa ese descuento. En una /30 se pierden <strong>la mitad</strong> de las direcciones (4 → 2 útiles); en una /24, solo dos de 256.
</div>

---
class: compact-slide
---

## El plan mental: cuatro pasos

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>¿Cuántos bits presto?</strong> El <code>n</code> más pequeño tal que <code>2ⁿ ≥ nº de subredes</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Nueva máscara:</strong> la original más <code>n</code> bits. Ejemplo: /24 + 2 = /26.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Hosts restantes:</strong> <code>h = 32 − máscara nueva</code> → <code>2ʰ − 2</code> hosts por subred.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Saber dónde empieza cada una:</strong> el tamaño del bloque es <code>2ʰ</code>, o <code>256 − valor del octeto</code> de la máscara.</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Los pasos 1 y 2 deciden <strong>cuántas</strong> subredes hay; los pasos 3 y 4, <strong>dónde</strong> están. Con los cuatro se escribe la tabla entera sin adivinar nada.
</div>

---
class: compact-slide
---

## Ejemplo completo: cuatro subredes iguales

```
Paso 1:  2ⁿ ≥ 4  → n = 2            (2² = 4)
Paso 2:  /24 + 2 = /26 = 255.255.255.192
Paso 3:  32 − 26 = 6 bits → 2⁶ − 2 = 62 hosts por subred
Paso 4:  tamaño de bloque = 2⁶ = 64
```

<div class="diagram-frame diagram-small" style="margin-top:0.3rem;">
  <Excalidraw drawFilePath="/diagrams/ud04-subnetting-bloque.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning" style="margin-top:0.2rem;">
  El tamaño de bloque es <strong>64 direcciones</strong>: por eso las redes empiezan en .0, .64, .128 y .192. Nunca en .30 ni en .100.
</div>

---
class: compact-slide
---

## El resultado: cuatro subredes encadenadas

<table>
  <thead><tr><th>Subred</th><th>Dirección de red</th><th>Primer host</th><th>Último host</th><th>Broadcast</th></tr></thead>
  <tbody>
    <tr><td><strong>1</strong></td><td>192.168.1.0/26</td><td>.1</td><td>.62</td><td>.63</td></tr>
    <tr><td><strong>2</strong></td><td>192.168.1.64/26</td><td>.65</td><td>.126</td><td>.127</td></tr>
    <tr><td><strong>3</strong></td><td>192.168.1.128/26</td><td>.129</td><td>.190</td><td>.191</td></tr>
    <tr><td><strong>4</strong></td><td>192.168.1.192/26</td><td>.193</td><td>.254</td><td>.255</td></tr>
  </tbody>
</table>

<div class="step" style="margin-top:0.4rem;">
  <div class="step-number">1</div>
  <div class="step-content">Cada subred <strong>empieza donde acaba la anterior</strong>: la 2 arranca en <code>.64</code> porque la 1 se comió de <code>.0</code> a <code>.63</code>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Si el encadenado no cuadra, hay un error en la máscara o en la cuenta: es la mejor autocomprobación.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Se han perdido 8 direcciones (4 redes × 2) a cambio de <strong>cuatro dominios de broadcast separados</strong>.</div>
</div>

---
class: compact-slide
---

## Cómo comprobarlo sin calculadora

```
1. Mira el octeto de la máscara que no es 255:  192
2. Tamaño de bloque = 256 − 192 =              64
3. Las subredes empiezan en múltiplos de 64:   0, 64, 128, 192
4. La última acaba en 255: 192 + 64 − 1 =      255   ✓
```

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="info">
      <strong>Regla del múltiplo:</strong> cada subred empieza en un múltiplo del tamaño de bloque. Si una «red» empieza en <code>.70</code> con máscara /26, la cuenta está mal.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Regla del techo:</strong> la última subred siempre termina en <strong>.255</strong>. Si no llega, o sobran direcciones sin asignar (normal en VLSM) o falta una subred.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  La misma cuenta sirve para cualquier prefijo que caiga en el <strong>último octeto</strong>. Cuando la máscara entra en el tercer octeto (/17 a /23), el tamaño de bloque es <code>256 − octeto</code> en el tercero y afecta a bloques de direcciones enteros, no a octetos sueltos.
</div>

---
class: compact-slide
---

## Cada bit prestado parte la red en dos

Partiendo de un <code>/24</code>, esta es la escalera completa. Es la tabla que conviene tener en la cabeza.

<table>
  <thead><tr><th>Bits prestados</th><th>Nuevo prefijo</th><th>Máscara</th><th>Subredes</th><th>Bits de host</th><th>Hosts útiles</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>/24</td><td>255.255.255.0</td><td>1</td><td>8</td><td>254</td></tr>
    <tr><td>1</td><td>/25</td><td>255.255.255.128</td><td>2</td><td>7</td><td>126</td></tr>
    <tr><td>2</td><td>/26</td><td>255.255.255.192</td><td>4</td><td>6</td><td>62</td></tr>
    <tr><td>3</td><td>/27</td><td>255.255.255.224</td><td>8</td><td>5</td><td>30</td></tr>
    <tr><td>4</td><td>/28</td><td>255.255.255.240</td><td>16</td><td>4</td><td>14</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Se lee de un vistazo: al bajar una fila, las subredes se <strong>duplican</strong> y los hosts se <strong>reducen a la mitad</strong>. El total de direcciones siempre suma 256: no se crea ni se destruye espacio, solo se reparte.
</div>

---
class: compact-slide
---

## Qué se gana y qué se pierde al subnetear

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>✅ Se gana</strong>
    <p style="margin:0.4rem 0 0;">
      <strong>Menos broadcast:</strong> la megafonía solo llega ya a su subred.<br>
      <strong>Segmentación:</strong> contabilidad, ventas e IT en islas separadas.<br>
      <strong>Control:</strong> se pueden filtrar y limitar flujos entre subredes.<br>
      <strong>Diagnóstico:</strong> un problema se acota a un bloque pequeño.
    </p>
  </div>
  <div class="comparison-item bad">
    <strong>❌ Se pierde</strong>
    <p style="margin:0.4rem 0 0;">
      <strong>Dos direcciones por subred</strong> (red y broadcast).<br>
      <strong>Un router o un switch capa 3</strong> que una las subredes: sin él no se hablan.<br>
      <strong>Planificación</strong>: hay que decidir tamaños antes, no después.<br>
      <strong>Documentación</strong>: sin un plano, nadie sabe qué vive en cada bloque.
    </p>
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Subnetear no es «hacer la red más pequeña»: es <strong>organizarla</strong>. Y sin router entre las subredes, cada una es un mundo aislado.
</div>

---
class: sparse-slide
---

## VLSM: subredes a la medida

<div class="key-idea">
  <div class="key-idea-text">
    <strong>VLSM</strong> (<em>Variable Length Subnet Mask</em>) usa <strong>máscaras de distinta longitud</strong> para dar a cada subred el tamaño que necesita: el departamento grande recibe una /25 y el pequeño una /29. Es subnetting sin la obligación de que todos los trozos sean iguales.
  </div>
</div>

---
class: compact-slide
---

## Las dos reglas de oro del VLSM

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Ordenar de mayor a menor necesidad.</strong> Primero el que pide más hosts; al final, el que menos.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Empezar donde acaba el anterior.</strong> Cada subred se coloca justo detrás del bloque previo, sin huecos ni solapes.</div>
</div>

<table style="margin-top:0.5rem;">
  <thead><tr><th>/25</th><th>/26</th><th>/27</th><th>/28</th><th>/29</th><th>/30</th></tr></thead>
  <tbody>
    <tr><td>126</td><td>62</td><td>30</td><td>14</td><td>6</td><td>2</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.4rem;">
  Se elige la máscara <strong>menos generosa</strong> que aún cumpla <code>2ʰ − 2 ≥ hosts pedidos</code>. Dar una /24 a una red de 5 equipos es justo lo que VLSM evita.
</div>

---
class: compact-slide
---

## VLSM de ejemplo: 192.168.1.0/24, cuatro departamentos

<table>
  <thead><tr><th>Depto</th><th>Hosts</th><th>Máscara</th><th>Red</th><th>Rango</th><th>Broadcast</th></tr></thead>
  <tbody>
    <tr><td><strong>Ventas</strong></td><td>100</td><td>/25</td><td>192.168.1.0</td><td>.1 – .126</td><td>.127</td></tr>
    <tr><td><strong>RRHH</strong></td><td>30</td><td>/27</td><td>192.168.1.128</td><td>.129 – .158</td><td>.159</td></tr>
    <tr><td><strong>IT</strong></td><td>20</td><td>/27</td><td>192.168.1.160</td><td>.161 – .190</td><td>.191</td></tr>
    <tr><td><strong>Dirección</strong></td><td>5</td><td>/29</td><td>192.168.1.192</td><td>.193 – .198</td><td>.199</td></tr>
    <tr><td><em>Libre</em></td><td>—</td><td>/29</td><td>192.168.1.200</td><td>.201 – .206</td><td>.207</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.4rem;">
  <strong>La firma de un VLSM bien hecho es el encadenado:</strong> Ventas acaba en .127 y RRHH empieza en .128; IT acaba en .191 y Dirección empieza en .192. De <code>.200</code> en adelante queda <strong>espacio para crecer</strong>.
</div>

---
class: compact-slide
---

## Por qué el orden no es un capricho

Cada bloque solo puede empezar en una dirección <strong>alineada con su tamaño</strong>: una /25 únicamente cabe en .0 o en .128, y una /26 en .0, .64, .128 o .192.

```
Bien:   /25 en .0     → .0 – .127
        /26 en .128   → .128 – .191

Mal:    /29 en .0     → .0 – .7
        /25 en .8     ✗ no está alineada: .8 no es múltiplo de 128
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Si empiezas por el bloque pequeño, el grande ya no encuentra hueco alineado y el espacio se <strong>fragmenta</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Ordenando de mayor a menor, cada bloque grande se coloca primero y los pequeños rellenan el final sin problema.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Por eso «orden = ley»: no es una manía, es la <strong>única forma de que los bloques encajen</strong>.</div>
</div>

---
class: compact-slide
---

## /30 y /31: enlaces entre routers

Un enlace punto a punto solo necesita <strong>dos</strong> direcciones: una por extremo. Es el caso más típico de VLSM en una red real.

```
R1 .1 ──── .2 R2      red 10.0.0.0/30

  .0  red        .1  R1
  .2  R2         .3  broadcast     → 2 direcciones útiles
```

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="info">
      <strong>/30</strong> es la elección clásica: 4 direcciones, 2 útiles. Desperdicia la mitad, pero es un bloque mínimo y fácil de leer.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>/31</strong> (RFC 3021) se salta red y broadcast: las dos direcciones son útiles. Se usa en enlaces modernos, siempre que ambos extremos lo soporten.
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.3rem;">
  Una <strong>/32</strong> es una sola dirección: se usa en interfaces de loopback y en rutas hacia un host concreto.
</div>

---
class: compact-slide
---

## Subnetting o VLSM: la misma herramienta

No son dos técnicas rivales: VLSM es subnetting <strong>sin la restricción de tamaño único</strong>.

<table>
  <thead><tr><th>Situación</th><th>Qué usar</th><th>Por qué</th></tr></thead>
  <tbody>
    <tr><td>Departamentos de tamaño parecido</td><td>Subnetting clásico</td><td>Una sola máscara: simple de documentar y de explicar</td></tr>
    <tr><td>Tamaños muy distintos (100, 20, 5)</td><td>VLSM</td><td>Cada bloque paga solo lo que necesita</td></tr>
    <tr><td>Enlaces entre routers</td><td>/30 o /31</td><td>Dos extremos, dos direcciones</td></tr>
    <tr><td>Bloques libres para el futuro</td><td>VLSM</td><td>Se dejan alineados y sin trocear</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.4rem;">
  VLSM exige más planificación: hay que conocer los tamaños <strong>antes</strong> de asignar. A cambio, el desperdicio baja de forma drástica y la red sigue siendo ampliable.
</div>

---
class: compact-slide
---

## DHCP: qué reparte exactamente

<div class="key-idea" style="margin-top:0;">
  <div class="key-idea-text">
    <strong>DHCP</strong> entrega a cada equipo su configuración de red completa en un intercambio de cuatro mensajes llamado <strong>DORA</strong>. Y cuando el equipo se va, la dirección vuelve al cajón para el siguiente.
  </div>
</div>

<table style="margin-top:0.4rem;">
  <thead><tr><th>Qué entrega</th><th>Por qué importa</th></tr></thead>
  <tbody>
    <tr><td><strong>Dirección IP</strong></td><td>La identidad del equipo en la red</td></tr>
    <tr><td><strong>Máscara</strong></td><td>Dice qué parte es red y quién es vecino</td></tr>
    <tr><td><strong>Gateway</strong></td><td>Sin ella, el equipo no sale de su subred</td></tr>
    <tr><td><strong>DNS</strong></td><td>Resolver nombres, no solo IPs</td></tr>
    <tr><td><strong>Duración (lease)</strong></td><td>Cuánto vale la concesión antes de renovarla</td></tr>
  </tbody>
</table>

---
class: compact-slide
---

## El proceso DORA

<div class="diagram-frame diagram-small" style="margin-top:0;">
  <Excalidraw drawFilePath="/diagrams/ud04-dora.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.2rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">D</div>
      <div class="step-content"><strong>Discover:</strong> el equipo grita en broadcast buscando servidores DHCP.</div>
    </div>
    <div class="step">
      <div class="step-number">O</div>
      <div class="step-content"><strong>Offer:</strong> un servidor ofrece una IP libre, reservada mientras decide.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">R</div>
      <div class="step-content"><strong>Request:</strong> el equipo pide formalmente esa IP (y descarta las demás ofertas).</div>
    </div>
    <div class="step">
      <div class="step-number">A</div>
      <div class="step-content"><strong>Ack:</strong> el servidor confirma y entrega el resto de parámetros.</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Después del Ack: el contrato de alquiler

La IP no es para siempre: se concede con una <strong>duración</strong> (8 días es lo habitual). El equipo se encarga de renovarla a tiempo.

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>T1 (50 % del tiempo):</strong> el equipo pide renovación en <strong>unicast</strong> al mismo servidor.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>T2 (87,5 %):</strong> si no obtuvo respuesta, repite en <strong>broadcast</strong> por si hay otro servidor disponible.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Si la concesión caduca sin renovarse, el equipo <strong>abandona la IP</strong> y vuelve a empezar con un Discover.</div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  El servidor también puede decir <strong>Nak</strong>: «esa IP que me pides no es de esta red». Es lo que pasa al mover un portátil a otra subred: pide la vieja dirección, el servidor la rechaza y el equipo reinicia el proceso.
</div>

---
class: compact-slide
---

## Configuración en un router Cisco

```text
ip dhcp pool VENTAS
 network 192.168.1.0 255.255.255.128
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 8

ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>network</code>: el rango que se reparte (aquí una subred /25).</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>default-router</code>: el gateway que se anuncia a los clientes.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>dns-server</code> y <code>lease</code>: DNS repartido y duración en días.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>excluded-address</code>: las IPs que <strong>nunca</strong> se entregan.</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Excluir y reservar: no todo se reparte

<table>
  <thead><tr><th>Necesidad</th><th>Mecanismo</th><th>Efecto</th></tr></thead>
  <tbody>
    <tr><td>IPs fijas que no gestiona el DHCP (gateway, switches, servidores)</td><td><code>ip dhcp excluded-address</code></td><td>Se sacan del rango: el servidor no las ofrece nunca</td></tr>
    <tr><td>Un equipo concreto que debe recibir siempre la misma IP</td><td>Reserva por MAC en el pool (<code>host</code> + <code>hardware-address</code>)</td><td>La IP se entrega siempre a ese equipo, pero se gestiona en el servidor</td></tr>
    <tr><td>Configuración de red del servidor</td><td>IP estática fuera del rango del pool</td><td>No depende de que el DHCP esté vivo</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.4rem;">
  La regla que evita disgustos: <strong>ninguna IP configurada a mano puede estar dentro del rango que reparte el DHCP</strong>. Si el gateway es <code>.1</code> y el pool empieza en <code>.1</code>, tarde o temprano hay dos equipos con la misma dirección.
</div>

<div class="info" style="margin-top:0.3rem;">
  Un síntoma clásico de IP duplicada: la conexión funciona a ratos, o Windows avisa de «conflicto de dirección IP». Muchas veces es exactamente esto.
</div>

---
class: compact-slide
---

## DHCP no cruza el router: el relay

El Discover va en <strong>broadcast</strong>, y un router no reenvía broadcast. Si el servidor está en otra subred, sin ayuda no se enteraría nunca.

```
PC 192.168.1.10/24
        │  Discover (broadcast 255.255.255.255)
        ▼
Router 192.168.1.1  ← ip helper-address 10.0.0.10
        │  lo reenvía en unicast, añadiendo la subred de origen
        ▼
Servidor DHCP 10.0.0.10  → elige el pool por esa subred
```

<div class="two-cols" style="margin-top:0.2rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>ip helper-address</code> se configura en la <strong>interfaz del cliente</strong>, la que mira a la subred que pide IP.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">El servidor deduce qué pool usar por la <strong>subred de origen</strong> que añade el router, no por la IP del cliente.</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.3rem;">
  Así un solo servidor puede atender decenas de subredes, que es como se monta en la práctica: DHCP centralizado y relays repartidos.
</div>

---
class: compact-slide
---

## Cuando el DHCP falla: diagnóstico en orden

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>ipconfig /all</code> → ¿hay <strong>169.254.x.x</strong>? ¿Falta el gateway? Eso ya dice que no hubo respuesta.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Comprobar el <strong>puerto y la VLAN</strong>: un equipo en la VLAN equivocada pide IP al pool que no le toca (o a ninguno).</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Revisar el <strong>pool</strong>: direcciones agotadas, <code>excluded-address</code> mal calculado, red del pool que no coincide con la subred.</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">Si el servidor está en otra subred, comprobar el <strong>relay</strong>: sin <code>ip helper-address</code> el Discover muere en el router.</div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content">Si aún no se ve, una captura con Wireshark (puertos <strong>67 y 68</strong>) muestra hasta dónde llega el DORA.</div>
</div>

---
class: compact-slide
---

## Resumen del bloque 02

| Ya sabemos… | Con qué pieza |
|---|---|
| Partir una red en trozos iguales | 2ⁿ subredes, 2ʰ − 2 hosts |
| Saber dónde empieza cada trozo | Tamaño de bloque = 256 − octeto de la máscara |
| Dar a cada subred su tamaño | VLSM, ordenado de mayor a menor |
| Dimensionar enlaces entre routers | /30, o /31 si los extremos lo soportan |
| Entregar la configuración sin tocar cada PC | DHCP y el intercambio DORA |
| Evitar direcciones duplicadas | Excluir el rango estático del pool |
| Atender varias subredes con un servidor | <code>ip helper-address</code> |

<div class="warning" style="margin-top:0.4rem;">
  <strong>Lo que sigue sin resolverse:</strong> con subnetting y VLSM hemos estirado al máximo un espacio de <strong>4.300 millones</strong> de direcciones... que a nivel mundial ya está repartido. El bloque 3 explica qué se hizo en su lugar: <strong>IPv6</strong>, y los parches que sostienen IPv4 mientras llega.
</div>

---
layout: closing
---
