---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 3: IPv6

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## ¿Por qué existe IPv6?
### El agotamiento de IPv4

<div class="key-idea">
  <div class="key-idea-text">
    IPv4 tiene <strong>32 bits = 4.300 millones</strong> de direcciones, y el mundo conecta mucho más que ordenadores: teléfonos, relojes, bombillas, coches… <strong>2011:</strong> la IANA reparte los últimos bloques; <strong>2019:</strong> Europa se queda sin los suyos. IPv6 no es un parche: es la solución estructural.
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  <strong>Cifra que cae en toda entrevista:</strong> IPv4 = 32 bits = 4,3 × 10⁹ · IPv6 = <strong>128 bits = 3,4 × 10³⁸</strong>. Unos 340 sextillones.
</div>

---

## Anatomía de una IPv6: 8 grupos hexadecimales

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
 |     |    |    |    |    |    |    |
 8 grupos de 4 dígitos hex cada uno
 = 8 × 16 bits = 128 bits por dirección
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Cada <strong>dígito hex</strong> = 4 bits (un nibble) → cada grupo de 4 dígitos = <strong>16 bits</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La separación es siempre con <strong>dos puntos</strong>, nunca puntos. Mayúsculas o minúsculas: indistinto.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Solo contienen dígitos <code>0-9</code> y letras <code>A-F</code>: si ves una «G», no es hex.</div>
</div>

---

## Compresión: dos reglas para escribir menos

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Omite ceros a la izquierda</strong> de cada grupo. Del medio o del final, nunca: <code>0DB8</code> → <code>DB8</code>, jamás <code>D8</code>.</div>
    </div>
    <pre><code>2001:0DB8:0000:0000:0000:FF00:0042:8329
2001:DB8:0:0:0:FF00:42:8329</code></pre>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>La cadena más larga de grupos cero → <code>::</code></strong>, <strong>una sola vez</strong> por dirección.</div>
    </div>
    <pre><code>2001:DB8::FF00:42:8329
::1   → loopback (equivale a 127.0.0.1)
::    → no especificada (origen al encender)</code></pre>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Descomprimir:</strong> cuenta los grupos escritos y rellena el <code>::</code> hasta 8. Y <code>2001:DB8::ABCD::1</code> es inválida: dos <code>::</code> no se saben cuántos grupos oculta cada uno.
</div>

---

## Prefijos: /32, /48 y /64

Lo mismo que CIDR en IPv4: dirección + <code>/n</code> con los <strong>bits de red</strong>.

<table>
  <thead><tr><th>Prefijo</th><th>Tamaño</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td>/32</td><td>2⁹⁶ direcciones</td><td>Prefijo asignado a un ISP</td></tr>
    <tr><td>/48</td><td>2⁸⁰</td><td>Organización (65.536 subredes /64 por sede)</td></tr>
    <tr><td>/56</td><td>2⁷²</td><td>Hogares y pequeñas oficinas</td></tr>
    <tr><td><strong>/64</strong></td><td>2⁶⁴</td><td><strong>Estándar para una subred LAN</strong></td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.6rem;">
  <strong>¿Por qué /64?</strong> Los 64 bits inferiores quedan para el identificador de interfaz (EUI-64) y eso habilita <strong>SLAAC sin servidor</strong>.
</div>

---

## Los tipos de direcciones: léelas por el prefijo

<table>
  <thead><tr><th>Tipo</th><th>Prefijo</th><th>Ámbito</th><th>¿Para qué?</th></tr></thead>
  <tbody>
    <tr><td><strong>Global Unicast (GUA)</strong></td><td><code>2000::/3</code></td><td>Internet</td><td>Equivalente a las públicas IPv4. Enrutable.</td></tr>
    <tr><td><strong>Link-Local (LLA)</strong></td><td><code>FE80::/10</code></td><td>Enlace local</td><td><strong>Automática en cada interfaz.</strong> No enrutable: NDP, SLAAC.</td></tr>
    <tr><td><strong>Unique Local (ULA)</strong></td><td><code>FC00::/7</code></td><td>Privada</td><td>Las «RFC 1918 de IPv6».</td></tr>
    <tr><td><strong>Loopback</strong></td><td><code>::1/128</code></td><td>Este nodo</td><td>Como 127.0.0.1.</td></tr>
  </tbody>
</table>

<pre><code>2001:DB8:1:2:21A:2BFF:FE3C:4D5E   → GUA
FE80::2AA:FF:FE9A:4CA2            → LLA
FC00::1                           → ULA</code></pre>

<div class="warning" style="margin-top:0.5rem;">
  Los prefijos van por <strong>rangos de bits</strong>: <code>2000::/3</code> cubre desde <code>2000::</code> hasta <code>3FFF::</code>; <code>FE80::/10</code>, de <code>FE80::</code> a <code>FEBF::</code>.
</div>

---

## Tener varias a la vez es normal

```
IPv6 Address......: 2001:db8:1:2:21a:2bff:fe3c:4d5e   ← GUA (global)
Link-local IPv6..: fe80::21a:2bff:fe3c:4d5e%12        ← LLA automática
Default Gateway..: fe80::1%12                          ← el router, en LLA
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">La <strong>Link-Local</strong> aparece siempre, la configures o no: dos PCs en el mismo switch pueden hablarse sin que nadie configure nada.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">No se puede enrutar: los routers <strong>nunca la reenvían fuera del enlace</strong>.</div>
</div>

<div class="info" style="margin-top:0.5rem;">
  El <code>%12</code> es el <strong>Zone ID</strong>: la misma <code>fe80::1</code> puede existir en varias interfaces a la vez (<em>en Linux: %eth0</em>).
</div>

---

## Multicast: uno para muchos

Formato: <code>FF00::/8</code> — el primer byte es <strong>FF</strong>. Sustituye al broadcast de IPv4 por grupos quirúrgicos.

<table>
  <thead><tr><th>Dirección</th><th>Grupo</th></tr></thead>
  <tbody>
    <tr><td><strong>FF02::1</strong></td><td><strong>Todos los nodos</strong> del enlace (≈ el broadcast de IPv4)</td></tr>
    <tr><td><strong>FF02::2</strong></td><td><strong>Todos los routers</strong> del enlace</td></tr>
    <tr><td><strong>FF02::5</strong></td><td>Todos los routers OSPF</td></tr>
    <tr><td><strong>FF02::1:FFxx:xxxx</strong></td><td><strong>Solicited-node</strong>: grupo derivado de la propia IP, usado por NDP</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  El <code>02</code> de <code>FF02::</code> indica el <strong>ámbito</strong>: 02 = enlace local. <code>FF02::1</code> solo afecta al cable: no viaja.
</div>

---

## Anycast: el más cercano gana

<div class="key-idea">
  <div class="key-idea-text">
    Una dirección <strong>anycast</strong> se asigna a <strong>varias interfaces</strong>, pero el tráfico va a la <strong>más cercana según la métrica</strong>. Es «la farmacia 24 h»: te atiende la sucursal que te pilla mejor.
  </div>
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="info">
      Se usa con réplicas: <strong>DNS anycast</strong> (servidores raíz), CDNs, balanceo. Si una sede cae, el tráfico se desvía solo.
    </div>
  </div>
  <div class="right">
    <div class="success">
      Su formato es el de una unicast cualquiera: el <strong>enrutamiento</strong> decide quién responde.
    </div>
  </div>
</div>

---
class: compact-slide
---

## NDP: NS y NA, el «ARP» nuevo

<div class="diagram-frame diagram-medium" style="height:240px;">
  <Excalidraw drawFilePath="/diagrams/ud04-ndp-ns-na.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">NS</div>
      <div class="step-content"><strong>Neighbor Solicitation:</strong> «¿quién tiene X?». Va a la solicited-node multicast <code>FF02::1:FFxx:xxxx</code>.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">NA</div>
      <div class="step-content"><strong>Neighbor Advertisement:</strong> «yo la tengo y mi MAC es…». Va en <strong>unicast</strong>.</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## NDP también reemplaza al «gateway a mano»

<div class="diagram-frame diagram-medium" style="height:250px;">
  <Excalidraw drawFilePath="/diagrams/ud04-ndp-rs-ra.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">RS</div>
      <div class="step-content"><strong>Router Solicitation:</strong> al encender, «¿hay routers aquí?» → <code>FF02::2</code>.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">RA</div>
      <div class="step-content"><strong>Router Advertisement:</strong> el router responde con el <strong>prefijo</strong>, los flags M/O y el DNS (RDNSS).</div>
    </div>
  </div>
</div>

---

## IPv4 → IPv6: qué cambia

<table>
  <thead><tr><th>Función</th><th>IPv4</th><th>IPv6</th></tr></thead>
  <tbody>
    <tr><td>Resolver IP → MAC</td><td><strong>ARP</strong></td><td><strong>NDP</strong> (NS/NA)</td></tr>
    <tr><td>Gateway y prefijo</td><td>A mano, en el SO</td><td><strong>RS/RA</strong> automático</td></tr>
    <tr><td>Multicast de listeners</td><td>IGMP</td><td><strong>MLD</strong></td></tr>
    <tr><td>Dirigirse a todos</td><td>Broadcast</td><td><strong>Multicast</strong> (no existe broadcast)</td></tr>
    <tr><td>Duplicados al encender</td><td>—</td><td>NDP (<em>DAD</em>: preguntas por su propia IP)</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.5rem;">
  <strong>Por qué gana el multicast:</strong> el broadcast lo procesa <em>toda</em> la red; la solicited-node solo despierta a los equipos de su grupo. Menos CPU y menos ruido de fondo.
</div>

---

## EUI-64: de la MAC al identificador

```
MAC:      00:1A:2B : 3C:4D:5E        (48 bits)

Paso 1    partir en dos mitades
Paso 2    insertar FF:FE en medio
          00:1A:2B:FF:FE:3C:4D:5E
Paso 3    invertir el bit 7 del primer byte (bit U/L)
          00 → 02       (00000000 → 00000010)

IID:      021A:2BFF:FE3C:4D5E             (64 bits)
```

<div class="key-idea">
  <div class="key-idea-text">
    El IID se pega a los últimos 64 bits del prefijo: <code>2001:DB8:1:2::/64</code> + <code>021A:2BFF:FE3C:4D5E</code> = <strong>dirección completa, sin configurar nada</strong>.
  </div>
</div>

---

## El defecto de EUI-64: es rastrable

La misma MAC genera <strong>siempre la misma IP</strong>: quien te vea en dos redes puede unir los puntos.

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Solución: Privacy Extensions (RFC 4941).</strong> El SO genera además un <strong>IID aleatorio temporal</strong> que cambia cada cierto tiempo.
    </div>
    <div class="success" style="margin-top:0.5rem;">
      Temporal para <strong>salir</strong>, estable para <strong>servicios entrantes</strong>.
    </div>
  </div>
  <div class="right">
    <pre><code>ipconfig (Windows):
  IPv6 Address....: 2001:DB8:1:2:6dfa:c41a:
                    9b3e:7721  ← temporal
  IPv6 Address....: 2001:DB8:1:2:021a:2bff:
                    fe3c:4d5e  ← estable</code></pre>
  </div>
</div>

---

## SLAAC: la autoconfiguración sin servidor

Divide, inserción FF:FE y flip del bit 7… y para la IP completa hace falta el <strong>prefijo</strong>. SLAAC lo trae el router:

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El equipo manda un <strong>RS</strong> («¿hay alguien que me dé un prefijo?»).</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El router contesta con un <strong>RA</strong> que incluye el prefijo (<code>2001:DB8:1:2::/64</code>) y los flags M/O.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El equipo combina <strong>prefijo + su IID</strong> (EUI-64 o temporal) y ya tiene IP. Sin ningún servidor.</div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>Matices:</strong> el gateway se aprende del <em>origen LLA del RA</em> (por eso es <code>fe80::1</code>), y SLAAC «puro» <strong>no asigna DNS</strong> (el RA puede anunciarlo con RDNSS; o entra DHCPv6 stateless, flag O).
</div>

---

## Dual Stack: los dos protocolos a la vez

IPv4 no desaparece de golpe. Estrategia recomendada con IPv6 nativo del ISP:

```
PC con Dual Stack:  IPv4 192.168.1.10
                    IPv6 2001:DB8:1:2:21A:2BFF:FE3C:4D5E

"¿google.com?" → ¿registro AAAA? (IPv6) → usamos IPv6
              → ¿solo registro A? (IPv4) → usamos IPv4
```

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <div class="comparison-grid">
      <div class="comparison-item good">✅ Funciona con todo; si una pila falla, la otra sigue</div>
    </div>
  </div>
  <div class="right">
    <div class="comparison-grid">
      <div class="comparison-item bad">❌ Configurar y mantener el doble (routing, DNS, firewalls)</div>
    </div>
  </div>
</div>

---

## Túneles: IPv6 dentro de IPv4

Cuando *el camino* intermedio solo habla IPv4, se encapsula el paquete IPv6 dentro de uno IPv4:

```
[IPv6] → encapsular → [IPv4 header | IPv6] → desencapsular → [IPv6]
  sede A             red solo-IPv4                        sede B
```

<table>
  <thead><tr><th>Túnel</th><th>Cómo</th><th>Cuándo</th></tr></thead>
  <tbody>
    <tr><td><strong>6to4</strong></td><td>Automático, prefijo <code>2002::/16</code></td><td>ISP sin IPv6 (en desuso)</td></tr>
    <tr><td><strong>Teredo</strong></td><td>IPv6 en UDP, atraviesa NAT</td><td>Último recurso, cliente tras NAT</td></tr>
    <tr><td><strong>GRE</strong></td><td>Punto a punto configurado a mano</td><td>Redes corporativas</td></tr>
    <tr><td><strong>ISATAP</strong></td><td>Sobre la LAN IPv4 interna</td><td>Dentro del campus/empresa</td></tr>
  </tbody>
</table>

---

## Los tres mecanismos de transición, a la vista

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-transicion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## NAT64 + DNS64: el puente solo-IPv6

<div class="two-cols">
  <div class="left">
    <div class="key-idea">
      <div class="key-idea-text">
        Tu red es <strong>solo IPv6</strong> pero el servicio es <strong>solo IPv4</strong>: <strong>DNS64</strong> inventa una IPv6 sintética para el registro A y <strong>NAT64</strong> traduce el tráfico <strong>IPv6 ↔ IPv4</strong>.
      </div>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
PC:  "¿example.com?" → DNS64: 64:FF9B::C000:0201
PC:  paquete a esa IPv6
NAT64 → la traduce a 192.0.2.1 y la emite</div>
  </div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>Distinción que siempre preguntan:</strong> el <strong>túnel encapsula</strong> (el interior sigue siendo IPv6); <strong>NAT64 traduce</strong> (cambia las cabeceras entre familias).
</div>

---

## Mini-chequeo: IPv6

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Cuántos bits tiene un grupo IPv6? ¿Cuántos grupos hay y a cuántos bits totales suman?
2. Clasifica: `FE80::1`, `FC00::1`, `FF02::1`, `2001:DB8::1`.
3. Con la MAC `00:1A:2B:3C:4D:5E`, calcula el EUI-64 paso a paso.
4. ¿Qué mensajes sustituyen a ARP y qué grupo multicast usa el NS?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> 16 bits por grupo, 8 grupos = 128 bits. · <strong>2.</strong> LLA, ULA, multicast (todos los nodos), GUA. · <strong>3.</strong> Partir, FF:FE, invertir bit 7 → <strong>021A:2BFF:FE3C:4D5E</strong>. · <strong>4.</strong> NDP con NS/NA; el NS va a <code>FF02::1:FFxx:xxxx</code>.
</div>

---
layout: closing
---
