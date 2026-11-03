---
layout: cover
---

# Unidad 04 — Direccionamiento IP<br>Bloque 3: IPv6, transición y CG-NAT

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Dónde estamos
### Estiramos IPv4 todo lo posible; aun así, se acabó

<div class="key-idea">
  <div class="key-idea-text">
    En el bloque 2 aprendimos a <strong>exprimir</strong> el espacio: subnetting, VLSM y DHCP. Pero ese espacio es finito y mundial: <strong>en 2011</strong> la IANA repartió los últimos bloques y <strong>en 2019</strong> Europa se quedó sin los suyos. Cuando un operador no puede dar una IP pública a cada cliente, recurre a CG-NAT. La solución de verdad es otra: <strong>IPv6</strong>.
  </div>
</div>

---
class: compact-slide
---

## El recorrido del bloque 03

<table>
  <thead><tr><th></th><th>La pregunta</th><th>Lo que veremos</th></tr></thead>
  <tbody>
    <tr><td><strong>1</strong></td><td>¿Cómo es una dirección IPv6 y cómo se escribe?</td><td>128 bits, hexadecimal, compresión, prefijos</td></tr>
    <tr><td><strong>2</strong></td><td>¿Qué tipos hay y cómo se configura sola?</td><td>GUA, link-local, ULA, multicast, anycast, NDP, SLAAC, DHCPv6</td></tr>
    <tr><td><strong>3</strong></td><td>¿Cómo se pasa de una Internet a otra?</td><td>Dual stack, túneles, NAT64 + DNS64</td></tr>
    <tr><td><strong>4</strong></td><td>¿Y mientras tanto?</td><td>CG-NAT y sus límites</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  Los cuatro puntos son el mismo problema visto desde ángulos distintos: <strong>no quedan direcciones IPv4</strong>. IPv6 las multiplica; la transición evita romper lo que ya funciona; CG-NAT es el parche que sostiene el resto.
</div>

---
class: sparse-slide
---

## ¿Por qué existe IPv6?

<div class="key-idea">
  <div class="key-idea-text">
    IPv4 tiene <strong>32 bits = 4.300 millones</strong> de direcciones, y el mundo conecta mucho más que ordenadores: teléfonos, cámaras, sensores, coches, bombillas. IPv6 no es una mejora incremental: es un <strong>espacio nuevo</strong> de <strong>128 bits = 3,4 × 10³⁸</strong> direcciones.
  </div>
</div>

<div class="success" style="margin-top:0.5rem;">
  La comparación que ayuda: IPv6 tiene direcciones suficientes para dar <strong>miles de millones por cada persona del planeta</strong>. El problema deja de ser el número y pasa a ser la migración.
</div>

---
class: compact-slide
---

## Qué cambia, y no solo el tamaño

IPv6 nació sabiendo qué había salido mal en IPv4. Por eso cambia también el mecanismo.

<table>
  <thead><tr><th></th><th>IPv4</th><th>IPv6</th></tr></thead>
  <tbody>
    <tr><td><strong>Dirección</strong></td><td>32 bits</td><td><strong>128 bits</strong></td></tr>
    <tr><td><strong>Cabecera</strong></td><td>Variable, con checksum</td><td>Fija de 40 B, <strong>sin checksum</strong></td></tr>
    <tr><td><strong>Broadcast</strong></td><td>Sí</td><td><strong>No existe</strong>: se usa multicast</td></tr>
    <tr><td><strong>Fragmentación</strong></td><td>Cualquier router</td><td>Solo el <strong>origen</strong></td></tr>
    <tr><td><strong>Configuración</strong></td><td>Manual o DHCP</td><td><strong>SLAAC</strong> (RS/RA) o DHCPv6</td></tr>
    <tr><td><strong>Resolver vecinos</strong></td><td>ARP (broadcast)</td><td><strong>NDP</strong> (multicast)</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.4rem;">
  La cabecera fija y sin checksum hace que los routers trabajen menos: no recalculan integridad en cada salto, porque las capas de abajo y de arriba ya la comprueban. Es una decisión de rendimiento, no un olvido.
</div>

---
class: compact-slide
---

## Anatomía de una IPv6: ocho grupos hexadecimales

```
2001:0DB8:0000:0000:0000:FF00:0042:8329
 |     |    |    |    |    |    |    |
 8 grupos de 4 dígitos hex = 8 × 16 bits = 128 bits
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Cada <strong>dígito hexadecimal</strong> son 4 bits (un <em>nibble</em>); un grupo de 4 dígitos, <strong>16 bits</strong>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El separador son <strong>dos puntos</strong>, nunca puntos. Mayúsculas o minúsculas dan igual.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Solo hay dígitos <code>0-9</code> y letras <code>A-F</code>: si aparece una «G», no es hexadecimal.</div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Hay una diferencia de fondo con IPv4: los bits altos identifican la <strong>red</strong> y los 64 bajos, la <strong>interfaz</strong>. Esa división fija es la que permite que la autoconfiguración funcione.
</div>

---
class: compact-slide
---

## Compresión: dos reglas para escribir menos

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Quitar ceros a la izquierda</strong> de cada grupo. Del medio o del final, nunca: <code>0DB8</code> → <code>DB8</code>, jamás <code>D8</code>.</div>
    </div>
    <pre><code>2001:0DB8:0000:0000:0000:FF00:0042:8329
2001:DB8:0:0:0:FF00:42:8329</code></pre>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>La racha más larga de grupos cero</strong> se sustituye por <code>::</code>, y solo <strong>una vez</strong> por dirección.</div>
    </div>
    <pre><code>2001:DB8::FF00:42:8329
::1   → loopback (como 127.0.0.1)
::    → no especificada (origen al arrancar)</code></pre>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  <strong>Dos <code>::</code> no valen:</strong> <code>2001:DB8::ABCD::1</code> es inválida porque no se puede saber cuántos grupos oculta cada uno.
</div>

---
class: compact-slide
---

## Descomprimir: contar los grupos escritos y rellenar

Para pasar de la forma corta a la completa solo hay que contar.

```
::1                      → 0:0:0:0:0:0:0:1
2001:DB8::FF00:42:8329   → 2001:0DB8:0000:0000:0000:FF00:0042:8329
                            └── 5 grupos escritos → faltan 3 ceros ──┘
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Cuenta los grupos que <strong>sí</strong> aparecen: en el segundo ejemplo son cinco.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Rellena con ceros hasta llegar a <strong>ocho</strong>: faltan tres grupos.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Cada grupo, de nuevo, a cuatro dígitos: <code>DB8</code> → <code>0DB8</code>.</div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Con práctica se lee directamente: <code>::1</code> solo puede ser «siete grupos de ceros y un uno», porque si hubiera más grupos escritos no cabrían en 128 bits.
</div>

---
class: compact-slide
---

## Prefijos: /32, /48, /64 y /56

Igual que CIDR en IPv4: la dirección más <code>/n</code>, que indica cuántos bits son de <strong>red</strong>.

<table>
  <thead><tr><th>Prefijo</th><th>Tamaño</th><th>Uso típico</th></tr></thead>
  <tbody>
    <tr><td>/32</td><td>2⁹⁶ direcciones</td><td>Prefijo asignado a un ISP</td></tr>
    <tr><td>/48</td><td>2⁸⁰</td><td>Una organización: permite 65.536 subredes /64, una por sede o por VLAN</td></tr>
    <tr><td>/56</td><td>2⁷²</td><td>Hogares y pequeñas oficinas</td></tr>
    <tr><td><strong>/64</strong></td><td>2⁶⁴</td><td><strong>El estándar de una LAN</strong></td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.4rem;">
  <strong>¿Por qué /64 y no /48 en la LAN?</strong> Los 64 bits bajos quedan libres para el identificador de interfaz (EUI-64 o aleatorio) y eso es lo que habilita <strong>SLAAC</strong> sin servidor.
</div>

<div class="warning" style="margin-top:0.3rem;">
  Con 2⁶⁴ direcciones por subred, subnetear «por escasez» deja de tener sentido: se subnetea por <strong>organización</strong> (una VLAN, una subred), no para ahorrar.
</div>

---
class: compact-slide
---

## Los tipos de dirección: se reconocen por el prefijo

<table>
  <thead><tr><th>Tipo</th><th>Prefijo</th><th>Ámbito</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td><strong>Global Unicast (GUA)</strong></td><td><code>2000::/3</code></td><td>Internet</td><td>Equivalente a las públicas IPv4: enrutable.</td></tr>
    <tr><td><strong>Link-Local (LLA)</strong></td><td><code>FE80::/10</code></td><td>Enlace local</td><td>Automática en cada interfaz; no enrutable. Base de NDP y SLAAC.</td></tr>
    <tr><td><strong>Unique Local (ULA)</strong></td><td><code>FC00::/7</code></td><td>Privada</td><td>Las «RFC 1918» de IPv6: uso interno.</td></tr>
    <tr><td><strong>Loopback</strong></td><td><code>::1/128</code></td><td>Este nodo</td><td>Como 127.0.0.1.</td></tr>
  </tbody>
</table>

<pre><code>2001:DB8:1:2:21A:2BFF:FE3C:4D5E   → GUA
FE80::2AA:FF:FE9A:4CA2            → LLA
FC00::1                           → ULA</code></pre>

<div class="info" style="margin-top:0.3rem;">
  Los prefijos son rangos de bits: <code>2000::/3</code> cubre de <code>2000::</code> a <code>3FFF::</code>; <code>FE80::/10</code>, de <code>FE80::</code> a <code>FEBF::</code>.
</div>

---
class: compact-slide
---

## Varias direcciones a la vez es lo normal

```
IPv6 Address......: 2001:db8:1:2:21a:2bff:fe3c:4d5e   ← GUA (global)
Link-local IPv6...: fe80::21a:2bff:fe3c:4d5e%12        ← LLA automática
Default Gateway...: fe80::1%12                          ← el router, en LLA
```

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">La <strong>link-local</strong> aparece siempre, la configures o no: dos equipos del mismo switch se hablan sin que nadie toque nada.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">La <strong>GUA</strong> es la que sale a Internet; la <strong>ULA</strong>, si existe, es para el tráfico interno.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Una interfaz puede tener <strong>varias direcciones del mismo tipo</strong> a la vez (una estable y una temporal, por ejemplo).</div>
</div>

<div class="info" style="margin-top:0.4rem;">
  El <code>%12</code> es el <strong>Zone ID</strong>: indica por qué interfaz sale esa dirección. Es necesario porque <code>fe80::1</code> puede existir en varias interfaces del mismo equipo (en Linux se escribe <code>%eth0</code>).
</div>

---
class: compact-slide
---

## Link-local: la dirección que siempre está

<div class="key-idea" style="margin-top:0;">
  <div class="key-idea-text">
    Toda interfaz con IPv6 tiene una <strong>FE80::/10</strong> aunque nadie le asigne nada. Solo vive en su enlace, y por eso los routers la usan como <strong>dirección de siguiente salto</strong>.
  </div>
</div>

<div class="step" style="margin-top:0.4rem;">
  <div class="step-number">1</div>
  <div class="step-content">Se genera en el arranque, con la MAC (EUI-64) o con un identificador aleatorio.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Los routers <strong>nunca la reenvían</strong> fuera del enlace: el prefijo se descarta en el router.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El gateway que aprende un equipo es la <strong>link-local del router que mandó el RA</strong>. De ahí que la puerta de enlace se vea como <code>fe80::1</code>.</div>
</div>

<div class="success" style="margin-top:0.3rem;">
  Si la GUA de un router cambia (porque el ISP cambia el prefijo), la link-local sigue siendo la misma: las rutas por defecto de los equipos no se rompen.
</div>

---
class: compact-slide
---

## Multicast: uno para muchos, sin broadcast

Formato <code>FF00::/8</code>: el primer byte es <strong>FF</strong>. Sustituye al broadcast por grupos concretos.

<table>
  <thead><tr><th>Dirección</th><th>Grupo</th><th>Quién la usa</th></tr></thead>
  <tbody>
    <tr><td><strong>FF02::1</strong></td><td>Todos los nodos del enlace</td><td>Lo más parecido al broadcast de IPv4</td></tr>
    <tr><td><strong>FF02::2</strong></td><td>Todos los routers del enlace</td><td>Destino de los RS</td></tr>
    <tr><td><strong>FF02::1:2</strong></td><td>Todos los servidores DHCPv6</td><td>Descubrimiento de servidores DHCPv6</td></tr>
    <tr><td><strong>FF02::5</strong></td><td>Todos los routers OSPF</td><td>OSPFv3</td></tr>
    <tr><td><strong>FF02::1:FFxx:xxxx</strong></td><td>Solicited-node</td><td>NDP: los últimos 24 bits salen de la propia IP</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.4rem;">
  El segundo byte indica el <strong>ámbito</strong>: <code>1</code> interfaz, <code>2</code> enlace, <code>5</code> sitio, <code>E</code> global. <code>FF02::1</code> solo llega al cable; no viaja.
</div>

---
class: compact-slide
---

## Anycast: el más cercano gana

<div class="key-idea" style="margin-top:0;">
  <div class="key-idea-text">
    Una dirección <strong>anycast</strong> se asigna a <strong>varias interfaces</strong> a la vez, pero el tráfico va solo a la <strong>más cercana</strong> según la métrica del router. El emisor no elige: el enrutamiento decide.
  </div>
</div>

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <div class="info">
      <strong>Dónde se usa:</strong> servidores DNS raíz, CDNs y servicios replicados. Si una sede cae, el tráfico se desvía a la siguiente sin cambiar ninguna configuración.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Formato:</strong> el de cualquier unicast. La diferencia no está en la dirección, sino en que <strong>varias máquinas la anuncian</strong>.
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.3rem;">
  No confundir con multicast: <strong>anycast entrega a uno</strong> (el más cercano); <strong>multicast entrega a todos</strong> los del grupo.
</div>

---
class: compact-slide
---

## NDP: NS y NA, el «ARP» de IPv6

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud04-ndp-ns-na.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.2rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">NS</div>
      <div class="step-content"><strong>Neighbor Solicitation:</strong> «¿quién tiene X?». Va a la <strong>solicited-node multicast</strong> <code>FF02::1:FFxx:xxxx</code>.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">NA</div>
      <div class="step-content"><strong>Neighbor Advertisement:</strong> «yo la tengo, y mi MAC es…». Va en <strong>unicast</strong> al que preguntó.</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.2rem;">
  Frente a ARP, el destino es un grupo pequeño (los que comparten los últimos 24 bits), no toda la red.
</div>

---
class: compact-slide
---

## NDP también sustituye al «gateway a mano»

<div class="diagram-frame diagram-small">
  <Excalidraw drawFilePath="/diagrams/ud04-ndp-rs-ra.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="two-cols" style="margin-top:0.2rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">RS</div>
      <div class="step-content"><strong>Router Solicitation:</strong> al arrancar, «¿hay routers aquí?» → <code>FF02::2</code>.</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">RA</div>
      <div class="step-content"><strong>Router Advertisement:</strong> el router anuncia <strong>prefijo</strong>, flags M/O, gateway y DNS (RDNSS): el equipo ya sabe su red sin que nadie configure nada.</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## DAD: comprobar que la dirección está libre

Antes de usar una dirección, el equipo comprueba que nadie más la tiene. Ese proceso se llama <strong>DAD</strong> (<em>Duplicate Address Detection</em>) y usa NDP.

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Manda un <strong>NS preguntando por su propia dirección</strong>, desde el origen no especificado (<code>::</code>).</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Si alguien responde con un NA, la dirección está <strong>duplicada</strong> y no se usa.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Si nadie contesta, la dirección se marca como válida y ya se puede usar.</div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Es el motivo de esa pausa de un segundo que se nota al arrancar un equipo con IPv6. En IPv4 existía el mismo riesgo (IP duplicada), pero no se comprobaba: se descubría cuando algo dejaba de funcionar.
</div>

---
class: compact-slide
---

## IPv4 → IPv6: qué reemplaza a qué

<table>
  <thead><tr><th>Función</th><th>IPv4</th><th>IPv6</th></tr></thead>
  <tbody>
    <tr><td>Resolver IP → MAC</td><td><strong>ARP</strong></td><td><strong>NDP</strong> (NS/NA)</td></tr>
    <tr><td>Gateway y prefijo</td><td>A mano en el sistema</td><td><strong>RS/RA</strong> automático</td></tr>
    <tr><td>Dirigirse a todos</td><td>Broadcast</td><td><strong>Multicast</strong> (no hay broadcast)</td></tr>
    <tr><td>Grupos de multicast</td><td>IGMP</td><td><strong>MLD</strong></td></tr>
    <tr><td>Duplicados al arrancar</td><td>Sin comprobación previa</td><td><strong>DAD</strong> (NDP)</td></tr>
    <tr><td>Configuración automática</td><td>DHCP</td><td><strong>SLAAC</strong> y DHCPv6</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.4rem;">
  La tabla sirve para leer documentación: cuando un manual antiguo dice «ARP», en IPv6 hay que buscar «NDP»; cuando dice «broadcast», buscar «multicast» o «todos los nodos».
</div>

---
class: compact-slide
---

## EUI-64: de la MAC al identificador de interfaz

```
MAC:      00:1A:2B : 3C:4D:5E        (48 bits)

Paso 1    partir en dos mitades
Paso 2    insertar FF:FE en medio
          00:1A:2B:FF:FE:3C:4D:5E
Paso 3    invertir el bit 7 del primer byte (bit U/L)
          00 → 02       (00000000 → 00000010)

IID:      021A:2BFF:FE3C:4D5E        (64 bits)
```

<div class="key-idea" style="margin-top:0.3rem;">
  <div class="key-idea-text">
    Ese IID se pega a los 64 bits del prefijo: <code>2001:DB8:1:2::/64</code> + <code>021A:2BFF:FE3C:4D5E</code> = <strong>dirección completa sin configurar nada</strong>.
  </div>
</div>

---
class: compact-slide
---

## El defecto de EUI-64: es rastreable

La misma MAC genera siempre el mismo identificador: quien te vea en dos redes distintas puede <strong>unir los puntos</strong> y saber que eres el mismo equipo.

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Solución: Privacy Extensions (RFC 4941).</strong> El sistema genera además un <strong>IID aleatorio temporal</strong>, que cambia cada cierto tiempo.
    </div>
    <div class="success" style="margin-top:0.4rem;">
      Temporal para <strong>salir</strong> a Internet, estable para los <strong>servicios que reciben</strong> conexiones.
    </div>
  </div>
  <div class="right">
    <pre><code>ipconfig (Windows):
  IPv6 Address....: 2001:DB8:1:2:6dfa:c41a:
                    9b3e:7721   ← temporal
  IPv6 Address....: 2001:DB8:1:2:021a:2bff:
                    fe3c:4d5e   ← estable</code></pre>
  </div>
</div>

<div class="warning" style="margin-top:0.3rem;">
  Windows y Android usan direcciones aleatorias por defecto; Linux las activa según distribución. Que una IPv6 «no parezca derivada de la MAC» es lo normal hoy, no un error.
</div>

---
class: compact-slide
---

## SLAAC: configurarse sin ningún servidor

Ya tenemos las piezas: dividir, insertar <code>FF:FE</code>, invertir el bit 7. Solo falta el <strong>prefijo</strong>, y eso lo trae el router.

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El equipo manda un <strong>RS</strong>: «¿hay alguien que me dé un prefijo?».</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El router responde con un <strong>RA</strong> que lleva el prefijo (<code>2001:DB8:1:2::/64</code>) y los flags M/O.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El equipo combina <strong>prefijo + su IID</strong> (EUI-64 o aleatorio) y ya tiene dirección global.</div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  Dos matices que explican lo que se ve en la práctica: el <strong>gateway</strong> es la link-local del router que envió el RA (de ahí <code>fe80::1</code>), y SLAAC <strong>no reparte DNS</strong> por sí solo: se anuncia con RDNSS en el RA o se recurre a DHCPv6 en modo <em>stateless</em>.
</div>

---
class: compact-slide
---

## DHCPv6: quién asigna la dirección, los flags M y O

En IPv6 la dirección puede salir sola (SLAAC). DHCPv6 se usa sobre todo para el resto de parámetros, y los <strong>flags del RA</strong> deciden el reparto.

<table>
  <thead><tr><th>Modo</th><th>¿Quién da la dirección?</th><th>¿Quién da el resto?</th><th>Flag</th></tr></thead>
  <tbody>
    <tr><td><strong>SLAAC solo</strong></td><td>El propio host</td><td>El router (RA + RDNSS)</td><td><strong>A</strong></td></tr>
    <tr><td><strong>Stateless DHCPv6</strong></td><td>El host (SLAAC)</td><td>El servidor DHCPv6</td><td><strong>O</strong> (Other)</td></tr>
    <tr><td><strong>Stateful DHCPv6</strong></td><td>El servidor DHCPv6</td><td>El servidor DHCPv6</td><td><strong>M</strong> (Managed)</td></tr>
  </tbody>
</table>

<div class="step" style="margin-top:0.4rem;">
  <div class="step-number">1</div>
  <div class="step-content">El flag <strong>A</strong> permite SLAAC; si está a 0, el equipo no se autoconfigura y necesita DHCPv6.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El flag <strong>M</strong> dice «pide también la dirección al servidor»; el <strong>O</strong>, «pide solo los otros datos».</div>
</div>

<div class="info" style="margin-top:0.3rem;">
  DHCPv6 usa <strong>UDP 546/547</strong> y descubre servidores por multicast <code>FF02::1:2</code>: en IPv6 no hay broadcast que enviar.
</div>

---
class: compact-slide
---

## Transición: no hay un interruptor

<div class="key-idea" style="margin-top:0;">
  <div class="key-idea-text">
    Nadie va a apagar IPv4 un día concreto. La migración se apoya en tres piezas que <strong>conviven</strong>: <strong>Dual Stack</strong> (las dos pilas a la vez), <strong>túneles</strong> (IPv6 dentro de IPv4 cuando el camino no lo soporta) y <strong>traducción</strong> (NAT64 + DNS64 para hablar desde una red solo-IPv6 con servidores solo-IPv4).
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  Cada pieza resuelve un caso distinto: qué equipo, qué camino, qué destino. Y mientras todo eso se despliega, los operadores siguen exprimiendo IPv4 con <strong>CG-NAT</strong>.
</div>

---
class: compact-slide
---

## Dual Stack: las dos pilas al mismo tiempo

Es la estrategia preferente cuando el ISP ofrece IPv6 nativo. El equipo tiene <strong>las dos direcciones</strong> y elige según lo que pregunte el DNS.

```
PC con Dual Stack:  IPv4 192.168.1.10
                    IPv6 2001:DB8:1:2:21A:2BFF:FE3C:4D5E

"¿google.com?" → ¿registro AAAA? (IPv6) → usamos IPv6
                → ¿solo registro A? (IPv4) → usamos IPv4
```

<div class="comparison-grid" style="margin-top:0.3rem;">
  <div class="comparison-item good">
    <strong>✅ Ventaja</strong>
    <p style="margin:0.35rem 0 0;">Sin encapsular ni traducir: cada extremo habla el protocolo nativo. Si una pila falla, la otra sigue funcionando.</p>
  </div>
  <div class="comparison-item bad">
    <strong>❌ Coste</strong>
    <p style="margin:0.35rem 0 0;">Hay que configurar y mantener <strong>las dos</strong>: rutas, DNS, firewalls y monitorización por duplicado.</p>
  </div>
</div>

<div class="success" style="margin-top:0.3rem;">
  <strong>Regla práctica:</strong> si hay IPv6 nativo del operador, Dual Stack. Todo lo demás son soluciones para cuando no lo hay.
</div>

---
class: compact-slide
---

## Túneles: IPv6 dentro de IPv4

Cuando <em>el camino intermedio</em> solo habla IPv4, se encapsula el paquete IPv6 dentro de uno IPv4. Los extremos hablan IPv6; el trayecto, no.

```
[IPv6] → encapsular → [IPv4 | IPv6] → desencapsular → [IPv6]
 sede A            red solo-IPv4                     sede B
```

<table>
  <thead><tr><th>Túnel</th><th>Cómo</th><th>Cuándo</th></tr></thead>
  <tbody>
    <tr><td><strong>6to4</strong></td><td>Automático, prefijo <code>2002::/16</code></td><td>ISP sin IPv6 (en desuso)</td></tr>
    <tr><td><strong>Teredo</strong></td><td>IPv6 dentro de UDP, atraviesa NAT</td><td>Cliente detrás de NAT, último recurso</td></tr>
    <tr><td><strong>GRE</strong></td><td>Punto a punto configurado a mano</td><td>Redes corporativas</td></tr>
    <tr><td><strong>ISATAP</strong></td><td>Sobre la LAN IPv4 interna</td><td>Dentro del campus o la empresa</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.3rem;">
  Los túneles <em>automáticos</em> (6to4, Teredo) cayeron en desuso por <strong>seguridad y fiabilidad</strong>: hoy se prefiere Dual Stack, o GRE manual cuando no hay alternativa.
</div>

---
class: compact-slide
---

## Los tres mecanismos, a la vista

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-transicion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="info" style="margin-top:0;">
  Dual Stack lo deja <strong>como está</strong>, el túnel lo <strong>envuelve</strong> y NAT64 le <strong>cambia la cabecera</strong>.
</div>

---
class: compact-slide
---

## NAT64 + DNS64: el puente desde una red solo-IPv6

<div class="two-cols">
  <div class="left">
    <div class="key-idea" style="margin-top:0;">
      <div class="key-idea-text">
        Tu red es <strong>solo IPv6</strong> y el servicio es <strong>solo IPv4</strong>: <strong>DNS64</strong> fabrica una IPv6 sintética desde el registro A y <strong>NAT64</strong> traduce el tráfico.
      </div>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
PC:  "¿example.com?" → DNS64: 64:FF9B::C000:0201<br>
PC:  paquete IPv6 a esa dirección<br>
NAT64 → lo traduce a 192.0.2.1 y lo envía</div>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;">
  <strong>La distinción clave:</strong> el <strong>túnel encapsula</strong> (dentro sigue habiendo IPv6); <strong>NAT64 traduce</strong> entre familias. Como todo NAT, solo funciona si <strong>el cliente inicia</strong> la conexión.
</div>

---
class: compact-slide
---

## CG-NAT: el parche que sostiene IPv4

<div class="key-idea" style="margin-top:0;">
  <div class="key-idea-text">
    El ISP <strong>no tiene IPv4 públicas para dar una a cada cliente</strong>. Mientras despliega IPv6, hace lo mismo que un router de casa pero a escala de operador: <strong>CG-NAT</strong> (<em>Carrier-Grade NAT</em>, también <strong>NAT444</strong>).
  </div>
</div>

<div class="step" style="margin-top:0.4rem;">
  <div class="step-number">1</div>
  <div class="step-content">Tu router recibe en la WAN una <strong>IP privada del operador</strong>: rango <code>100.64.0.0/10</code> (RFC 6598).</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">En la central, un equipo CG-NAT traduce <strong>miles de usuarios hacia un pool mínimo</strong> de públicas, usando puertos (PAT).</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Resultado: <strong>triple traducción</strong> — tu LAN privada → la WAN privada del operador → una pública compartida.</div>
</div>

---
class: compact-slide
---

## El rango exclusivo del operador: 100.64.0.0/10

| | IPs privadas de casa | IPs privadas de operador |
|---|---|---|
| **Rango** | 10.0.0.0/8 · 172.16.0.0/12 · 192.168.0.0/16 | **100.64.0.0/10** (100.64.0.0 – 100.127.255.255) |
| **Estándar** | RFC 1918 | **RFC 6598** (2012) |
| **Para quién** | Redes locales de usuarios | Solo la red interna del ISP: tampoco se enruta en Internet |

<div class="warning" style="margin-top:0.4rem;">
  <strong>Identificación rápida:</strong> si la IP WAN de tu router cae entre <strong>100.64.x.x y 100.127.x.x</strong>, estás detrás de un CG-NAT. Ese rango no es una privada de casa: es un bloque reservado a operadores, y verlo en tu WAN es la <strong>firma inequívoca</strong> del parche.
</div>

---
class: compact-slide
---

## CG-NAT en la vida real: qué se rompe

<div class="comparison-grid">
  <div class="comparison-item bad">
    <strong>❌ Lo que se rompe</strong>
    <p style="margin:0.4rem 0 0;">
      <strong>Redirección de puertos</strong> (<em>port forwarding</em>)<br>
      <strong>Servidores autoalojados</strong>: web, VPN en casa<br>
      <strong>Consolas</strong>: NAT estricta / «Tipo 3»<br>
      <strong>Cámaras IP</strong> sin nube, sin acceso desde fuera
    </p>
  </div>
  <div class="comparison-item good">
    <strong>✅ Lo que sigue funcionando</strong>
    <p style="margin:0.4rem 0 0;">
      Navegación, streaming y <strong>videollamadas</strong><br>
      Juegos online <em>hacia servidores</em> del estudio<br>
      La conexión <strong>IPv6</strong>, si el operador la da: sin NAT de ningún tipo
    </p>
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  El problema no es <em>salir</em>, es que <strong>el mundo entre</strong>: el CG-NAT solo mantiene la sesión que tú iniciaste. Nadie de fuera puede abrir una conexión hacia ti, y no hay configuración en tu router que lo arregle.
</div>

---
class: compact-slide
---

## CG-NAT, dibujado: el NAT444

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-cg-nat.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Resumen de la unidad 04

<table>
  <thead><tr><th>Bloque</th><th>Lo que queda claro</th></tr></thead>
  <tbody>
    <tr><td><strong>1</strong></td><td>Una IP se lee en binario y se interpreta con la máscara: los bits a 1 son red, los 0 son host. El AND da la dirección de red y eso decide si el paquete va al vecino o al router.</td></tr>
    <tr><td><strong>2</strong></td><td>Subnetting y VLSM reparten el espacio tomando bits de host; DHCP lo entrega automáticamente y lo recupera cuando el equipo se va.</td></tr>
    <tr><td><strong>3</strong></td><td>IPv6 resuelve la escasez con 128 bits, autoconfiguración y NDP sin broadcast; la transición usa Dual Stack, túneles y NAT64; CG-NAT es el parche mientras llega.</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.4rem;">
  <strong>La idea que une la unidad:</strong> direccionar es <strong>decidir dónde está cada cosa y quién puede hablar con quién</strong>. La máscara define la frontera, el router la cruza, el DHCP la reparte y IPv6 amplía el mapa.
</div>

<div class="info" style="margin-top:0.3rem;">
  Lo que viene después: enrutamiento (cómo se aprende el mapa completo), ACL y NAT (cómo se filtra y se traduce a fondo).
</div>

---
layout: closing
---
