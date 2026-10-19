---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 2: Subnetting, VLSM y DHCP

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Subnetting: trocear la red
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Cuando <code>192.168.1.0/24</code> se queda pequeña (o demasiado «ruidosa» con el broadcast), no necesitas otra red: <strong>la divides</strong>. Subnetear es <strong>tomar bits prestados de la porción de host</strong> para crear subredes más pequeñas.
  </div>
</div>

Con dos fórmulas se juega TODO el subnetting clásico: <code>nº de subredes = 2ⁿ</code> y <code>nº de hosts = 2ʰ − 2</code>.

---

## Las dos fórmulas que lo son todo

```
Nº de subredes          = 2ⁿ    (n = bits prestados a la máscara)
Nº de hosts por subred  = 2ʰ−2  (h = bits de host restantes)
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>n</strong> = bits que <strong>prestas</strong> de la porción de host y añades a la máscara.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>h</strong> = 32 − nueva máscara: los bits de host que <strong>quedan</strong> en cada subred.</div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Se restan <strong>2</strong> porque la primera IP es la <strong>dirección de red</strong> y la última el <strong>broadcast</strong>: ni una ni otra se asignan a un dispositivo.
</div>

---

## El plan mental: 4 pasos

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>¿Cuántos bits presto?</strong> El n mínimo tal que <code>2ⁿ ≥ nº de subredes</code>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Nueva máscara:</strong> máscara original + n. Ej. /24 + 2 = /26.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Hosts restantes:</strong> h = 32 − máscara nueva → <code>2ʰ−2</code> hosts por subred.</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Calcular subredes:</strong> incremento = <code>2ʰ</code> (o 256 − valor del octeto mágico); de ahí red → primer host → último host → broadcast.</div>
    </div>
  </div>
</div>

---

## Ejemplo completo: los cuatro pasos

```
Paso 1:  2ⁿ ≥ 4  → n = 2            (2² = 4)
Paso 2:  /24 + 2 = /26 = 255.255.255.192
Paso 3:  32 − 26 = 6 bits → 2⁶−2 = 62 hosts por subred
Paso 4:  incremento = 2⁶ = 64
```
	
<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud04-subnetting-bloque.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## El resultado: 4 subredes encadenadas

<table>
  <thead><tr><th>Subred</th><th>Dirección de red</th><th>Primer host</th><th>Último host</th><th>Broadcast</th></tr></thead>
  <tbody>
    <tr><td><strong>1</strong></td><td>192.168.1.0/26</td><td>.1</td><td>.62</td><td>.63</td></tr>
    <tr><td><strong>2</strong></td><td>192.168.1.64/26</td><td>.65</td><td>.126</td><td>.127</td></tr>
    <tr><td><strong>3</strong></td><td>192.168.1.128/26</td><td>.129</td><td>.190</td><td>.191</td></tr>
    <tr><td><strong>4</strong></td><td>192.168.1.192/26</td><td>.193</td><td>.254</td><td>.255</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.5rem;">
  Con n = 2 bits se pierden la mitad de direcciones (<code>192.168.1.256</code> no existe); la compensación es <strong>4 departamentos aislados</strong> en vez de 1 mezclado.
</div>

---

## Comprobar a ojo + para qué sirve

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Comprueba encadenado:</strong> cada subred empieza donde acaba la anterior + 1. La 2 arranca en <code>.64</code> porque la 1 se comió de <code>.0</code> a <code>.63</code>. Siempre cuadra.
    </div>
    <div class="success" style="margin-top:0.5rem;">
      <strong>Ahorra IPs:</strong> una /24 con cuatro /26 sirve a 4 departamentos en vez de a 1.
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Menos dominio de broadcast:</strong> la megafonía ya no llega a todos, solo a la subred.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Segmenta por funciones:</strong> contabilidad, ventas e IT en islas separadas, con filtros entre ellas.</div>
    </div>
  </div>
</div>

---

## Trampa de examen: ¿subnetting o VLSM?

<div class="key-idea">
  <div class="key-idea-text">
    «4 subredes con <strong>50 hosts</strong> cada una» → subnetting clásico: una /26 cumple de sobra (62 hosts). Pero si piden <strong>200, 50 y 10 hosts</strong>, los tamaños son distintos: ahí cada subred pide su máscara y toca <strong>VLSM</strong>.
  </div>
</div>

<div class="two-cols" style="margin-top:0.7rem;">
  <div class="left">
    <div class="comparison-grid">
      <div class="comparison-item good">
        <strong>Tamaños iguales</strong> → subnetting clásico (misma tijera para todos)
      </div>
    </div>
  </div>
  <div class="right">
    <div class="comparison-grid">
      <div class="comparison-item bad">
        <strong>Tamaños distintos</strong> → VLSM (una tijera por subred)
      </div>
    </div>
  </div>
</div>

---
class: sparse-slide
---

## VLSM: subredes a la medida
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>VLSM</strong> (<em>Variable Length Subnet Mask</em>) usa <strong>máscaras de longitud variable</strong> para dar a cada subred exactamente el tamaño que necesita: el departamento grande recibe un /25 y el pequeño un /29. Cero desperdicio.
  </div>
</div>

---

## Las dos reglas de oro del VLSM

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Ordenar de mayor a menor necesidad.</strong> Primero el que pide más hosts; al final, el que menos.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Empezar donde acaba el anterior.</strong> Cada subred termina exactamente donde empezó: no se saltan bloques ni se reordena luego.</div>
</div>

<table style="margin-top:0.6rem;">
  <thead><tr><th>/25</th><th>/26</th><th>/27</th><th>/28</th><th>/29</th><th>/30</th></tr></thead>
  <tbody>
    <tr><td>126</td><td>62</td><td>30</td><td>14</td><td>6</td><td>2</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  Elegir la máscara mínima en la que <strong>2ʰ − 2 ≥ hosts pedidos</strong>. <strong>Orden = ley.</strong>
</div>

---

## VLSM ejemplo: 192.168.1.0/24, cuatro departamentos

<table>
  <thead><tr><th>Depto</th><th>Hosts</th><th>h necesaria</th><th>Máscara</th><th>Red</th><th>Rango</th><th>Bcast</th></tr></thead>
  <tbody>
    <tr><td><strong>Ventas</strong></td><td>100</td><td>2⁷−2 = 126</td><td>/25</td><td>192.168.1.0</td><td>.1 – .126</td><td>.127</td></tr>
    <tr><td><strong>RRHH</strong></td><td>30</td><td>2⁵−2 = 30</td><td>/27</td><td>192.168.1.128</td><td>.129 – .158</td><td>.159</td></tr>
    <tr><td><strong>IT</strong></td><td>20</td><td><em>cabe en 30</em></td><td>/27</td><td>192.168.1.160</td><td>.161 – .190</td><td>.191</td></tr>
    <tr><td><strong>Dirección</strong></td><td>5</td><td>2³−2 = 6</td><td>/29</td><td>192.168.1.192</td><td>.193 – .198</td><td>.199</td></tr>
    <tr><td><em>Libre</em></td><td>—</td><td>—</td><td>/29</td><td>192.168.1.200</td><td>.201 – .206</td><td>.207</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.5rem;">
  <strong>Firma de un VLSM bien hecho:</strong> el encadenado — Ventas acaba en .127, RRHH arranca en .128; IT acaba en .191, Dirección en .192; y de <code>.200</code> arriba queda <strong>bloque libre</strong> para el futuro.
</div>

---

## ¿Cuándo cada uno?

<table>
  <thead><tr><th>Situación</th><th>Usa</th></tr></thead>
  <tbody>
    <tr><td>Todos los departamentos con el mismo tamaño</td><td><strong>Subnetting clásico</strong> (más simple)</td></tr>
    <tr><td>Tamaños muy distintos (50, 5, 300…)</td><td><strong>VLSM</strong></td></tr>
    <tr><td>Enlaces entre routers (2 IPs por lado)</td><td><strong>/30</strong> siempre, típico de VLSM</td></tr>
    <tr><td>«Hosts por subred» distintos en el examen</td><td><strong>VLSM</strong>, sin dudar</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Trampa común:</strong> hacer VLSM <em>sin ordenar</em>. Si asignas primero el pequeño, el grande ya no cabe de corrido y la red se rompe sola.
</div>

---
class: sparse-slide
---

## DHCP: el conserje de la red
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>DHCP</strong> asigna automáticamente a cada dispositivo su <strong>IP, máscara, gateway y DNS</strong> con un intercambio de 4 mensajes llamado <strong>DORA</strong>. Y si el equipo se va, la llave vuelve al cajón para el siguiente.
  </div>
</div>

---
class: compact-slide
---

## El proceso DORA

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud04-dora.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">D</div>
      <div class="step-content"><strong>Discover:</strong> el PC grita a la red (broadcast) buscando servidores DHCP.</div>
    </div>
    <div class="step">
      <div class="step-number">O</div>
      <div class="step-content"><strong>Offer:</strong> el servidor ofrece una IP «reservada en la caja» + extras.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">R</div>
      <div class="step-content"><strong>Request:</strong> el PC acepta formalmente esa IP.</div>
    </div>
    <div class="step">
      <div class="step-number">A</div>
      <div class="step-content"><strong>Ack:</strong> el servidor confirma. Configuración aplicada.</div>
    </div>
  </div>
</div>

---

## Configuración en un router Cisco

```
ip dhcp pool VENTAS
 network 192.168.1.0 255.255.255.128
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 8

ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>network</code> → el rango que reparte (aquí una subred /25).</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>default-router</code> → el gateway que anuncia a los clientes.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>dns-server</code> + <code>lease</code> → DNS repartido y duración del contrato (8 días).</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>excluded-address</code> → <strong>saca las IPs fijas del pool</strong> antes de repartir.</div>
    </div>
  </div>
</div>

---

## Excluir siempre las IPs estáticas

<div class="key-idea">
  <div class="key-idea-text">
    <strong>Regla de oro:</strong> si DHCP entrega <code>192.168.1.1</code> —que ya es el gateway—, dos equipos acaban con la misma IP y <strong>la semana es muy larga</strong>. Aparta servidores, routers e impresoras con <code>ip dhcp excluded-address</code>.
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  ¿Y si el DHCP <strong>no responde</strong>? El PC se asigna él mismo una <strong>APIPA (169.254.0.0/16)</strong>: habla con la red local pero <strong>no sale a Internet</strong>. El dolor de cabeza más típico del diagnóstico.
</div>

---

## DHCPv6: SLAAC y DHCP no son enemigos

En IPv6 la dirección puede salir sola (SLAAC), pero el resto se reparte según los <strong>flags M y O del Router Advertisement</strong>:

<table>
  <thead><tr><th>Modo</th><th>¿Quién da la dirección?</th><th>¿Quién da el resto?</th><th>Flag</th></tr></thead>
  <tbody>
    <tr><td><strong>SLAAC</strong> (solo)</td><td>El propio host (EUI-64)</td><td>El router (RA)</td><td>A</td></tr>
    <tr><td><strong>Stateless DHCPv6</strong></td><td>El host (SLAAC)</td><td>El servidor DHCPv6</td><td><strong>O</strong> (Other)</td></tr>
    <tr><td><strong>Stateful DHCPv6</strong></td><td>El servidor DHCPv6</td><td>El servidor DHCPv6</td><td><strong>M</strong> (Managed)</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.6rem;">
  DHCPv6 usa <strong>UDP sobre IPv6</strong> y descubre servidores por <strong>multicast</strong>: en IPv6 no hay broadcast.
</div>

---

## Mini-chequeo: subnetting, VLSM y DHCP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. Divide `192.168.1.0/24` en **2 subredes**: ¿qué máscara usas y cuántos hosts útiles tiene cada una?
2. Dos departamentos de 40 y 20 hosts en 192.168.1.0/24: ¿qué máscaras y qué redes les tocan?
3. ¿Qué significa la sigla DORA y qué aparta `ip dhcp excluded-address`?
4. Un PC enciende y muestra `169.254.x.x`: ¿qué ha pasado?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> n=1 → /25 (255.255.255.128); h=7 → 126 hosts: 192.168.1.0/25 y 192.168.1.128/25. · <strong>2.</strong> 40 → /26: 192.168.1.0/26; 20 → /27: 192.168.1.64/27 (empieza donde acaba la anterior). · <strong>3.</strong> Discover-Offer-Request-ACK; excluded-address aparta las IPs fijas del pool. · <strong>4.</strong> El DHCP no respondió: APIPA.
</div>

---
layout: closing
---
