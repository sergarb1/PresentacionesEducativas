---
layout: cover
---

# Unidad 09 — Routing dinámico<br>Bloque 2: RIP y OSPF a la obra

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## RIP y OSPF: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>RIP</strong> cuenta <strong>saltos</strong>: pregunta «¿cuántos routers tengo que atravesar?» y no mira el ancho de banda. <strong>OSPF</strong> se dibuja el <strong>mapa completo</strong> de la red y calcula el mejor <strong>camino por coste</strong>. Uno es un cuaderno de notas; el otro, un plano de obra.
  </div>
</div>

Ambos hacen el mismo trabajo — llenar la tabla sin <code>ip route</code> — pero por dentro son muy diferentes. Conocer los dos te da el criterio para elegir en cada red real. En este bloque: configurar RIP y OSPF en una cadena de 3 routers, verificar su vecindad y contraste cuándo usar cada uno.

---

## RIP: la distancia vector de toda la vida

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Cada 30 segundos</strong>, RIP vacía toda su tabla a sus vecinos por <strong>UDP 520</strong>. Simple y generoso.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Métrica: saltos</strong>. Un enlace gigabit y uno de 56 kb/s valen lo mismo si saltan lo mismo: RIP <strong>no ve</strong> la velocidad.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Máximo 15 saltos</strong>. En el 16, la red se declara <em>infinita</em>: se descarta. Diseñado para redes pequeñas.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content">En el código marca la ruta con <strong>R</strong> y [120/saltos]: AD 120 — la menos <strong>creíble</strong> de las dinámicas.</div></div>

---
class: compact-slide
---

## RIP: configurarlo (la lista de redes)

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1 — router rip, versión 2</div>
  </div>
  <pre><code>R1(config)# router rip
R1(config-router)# version 2
R1(config-router)# network 192.168.10.0
R1(config-router)# network 10.0.0.0
R1(config-router)# no auto-summary</code></pre>
</div>

| Comando | Qué aporta |
|---|---|
| <code>network</code> | Declara la red <strong>mayor</strong> que toca (sin máscara); sus interfaces <strong>anuncian y escuchan</strong> |
| <code>version 2</code> | RIPv2: <strong>máscaras enviadas</strong>+multicast (RIPv1 es viejo: sin máscara) |
| <code>no auto-summary</code> | No resume en límite de red de clase — imprescindible con subredes y VLSM |

<div class="info" style="margin-top:0.4rem;">
  Cada router repite su propia pareja: R2 con <code>network 10.0.0.0</code> y <code>192.168.30.0</code>; R3 con <code>10.0.0.0</code> y <code>192.168.40.0</code>. Nada más: eso es todo el RIP.
</div>

---

## OSPF: mapa por escrito, camino por coste

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Hellos</strong> periódicos: los vecinos se identifican y se sincronizan — a partir de ahí <strong>ya no hablan «rutas»</strong>, hablan de <em>enlaces</em>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>LSA</strong> (Link State Advertisements): cada router describe sus enlaces con su coste. Se comparte <strong>a todos</strong> dentro del área.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Cada router monta la <strong>visión completa</strong> (LSDB idéntica entre vecinos) y ejecuta el <strong>Dijkstra/SPF</strong>: elige a cada red el <strong>camino de menor coste total</strong>.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content">El camino elegido entra con <strong>O</strong> [110/coste]. Converge <strong>rápido</strong> frente a los 30 s de RIP y escala a redes grandes.</div></div>

---

## OSPF: configurarlo (single area = 1)

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1 — router ospf 1, área 0</div>
  </div>
  <pre><code>R1(config)# router ospf 1
R1(config-router)# router-id 1.1.1.1
R1(config-router)# network 192.168.10.0 0.0.0.255 area 0
R1(config-router)# network 10.0.0.0 0.0.0.3 area 0</code></pre>
</div>

| Pieza | Qué es |
|---|---|
| <code>ospf 1</code> | Process ID local: solo importa <strong>dentro</strong> de este router (puede diferir entre routers) |
| <code>router-id 1.1.1.1</code> | La <strong>identidad</strong> del router en el protocolo: debe ser <strong>única</strong> en toda la red |
| <code>network … 0.0.0.3 …</code> | La wildcard dice <strong>qué bits se redondean</strong>: 0.0.0.3 = coincide solo 10.0.0.0/30 |
| <code>area 0</code> | Con una sola área (0) el OSPF se comporta directo; las áreas múltiples son otra unidad |

---
class: compact-slide
---

## Wildcards: la máscara al revés

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Regla: wildcard = máscara invertida</div>
  </div>
  <pre><code>255.255.255.255  (máscara /32) ↔ 0.0.0.0       (uno exacto)
255.255.255.0    (máscara /24) ↔ 0.0.0.255     (una red /24)
255.255.252.0    (máscara /22) ↔ 0.0.3.255
Red 0.0.0.0 con wildcard 255.255.255.255  →  «cualquiera» (any)</code></pre>
</div>

<div class="comparison-grid" style="margin-top:0.6rem;">
  <div class="comparison-item good">
    <strong>Bit a 0</strong>
    <p>«Compara este octeto exactamente» — es la parte fija de la red.</p>
  </div>
  <div class="comparison-item bad">
    <strong>Bit a 1</strong>
    <p>«Da igual este bit» — marca el rango variable. Por eso 0.0.0.3 (bits sueltos) se usa en enlaces /30.</p>
  </div>
</div>

<div class="info" style="margin-top:0.5rem;">
  Es la misma idea que la máscara wildcard de las ACL en la UD10: <code>0.0.0.255</code> casa con <code>192.168.10.0 – 192.168.10.255</code>, todo el /24.
</div>

---

## Verificar la vecindad OSPF

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1# show ip ospf neighbor</div>
  </div>
  <pre><code>Neighbor ID     Pri   State        Dead Time   Address       Interface
2.2.2.2          1   FULL/BDR      00:00:35    10.0.0.2      GigabitEthernet0/1
3.3.3.3          1   FULL/DR       00:00:31    10.0.0.6      GigabitEthernet0/2</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>FULL</strong> = sincronización perfecta: la base de datos está <em>idéntica</em> entre vecinos. Es el estado objetivo y no cambia aunque se recalcule el SPF.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>DR/BDR</strong>: en una red multi-acceso (varios routers en la misma VLAN) se eligen un <strong>router designado</strong> y su backup para no duplicar intercambios.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Si no ves <strong>FULL</strong>, no habrá ruta O: revisa que la interfaz esté <em>up/up</em> (<code>show ip ospf interface brief</code>), que la <strong>área</strong> coincida en ambos extremos y que el <strong>enlace</strong> esté anunciado en ambos routers (<code>show ip protocols</code>).</div></div>

---

## RIP vs OSPF: cara a cara

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud09-par-rip-vs-ospf.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## El fallo clásico: falta un network

<div class="warning">
  Si R2 no declara <code>network 192.168.30.0</code>, R1 <strong>nunca</strong> aprenderá la red del servidor: el enlace estará arriba, los hellos cantando, y el destino seguirá «desconocido».
</div>

<div class="step"><div class="step-number">1</div><div class="step-content">Síntoma: el ping <strong>atraviesa un salto y calla</strong>; en <code>show ip route</code> de R1 no hay ruta O hacia la subred remota.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El vecino perfecto (FULL via 10.0.0.2) confirma que el protocolo funciona — el problema <strong>no es la vecindad</strong>, es el <strong>anuncio</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Solución: abajo, en <code>show ip protocols</code> de R2, mira qué redes declara; añade la que falta y las rutas <strong>aparecen en segundos</strong>.</div></div>

---

## Mini-chequeo: RIP vs OSPF

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Por qué una red MÁS lejana de 15 saltos ni entra en RIP?
2. ¿Qué significa <strong>FULL/BDR</strong> en <code>show ip ospf neighbor</code>?
3. Un 100 Mb/s en OSPF y uno de 10 Mb/s al mismo destino: ¿qué elige el protocolo y por qué?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> La métrica de saltos no llega: el 16 significa «infinito», así que a la 16ª saltos RIP da por imposible la red. · <strong>2.</strong> Vecino sincronizado (FULL) y, en una red multi-acceso, designado de backup (BDR). · <strong>3.</strong> OSPF elige por coste: 100 Mb/s cuesta 10⁸/10⁸ = 1 y 10 Mb/s cuesta 10⁸/10⁷ = 10 — gana el gigabit por su menor coste.
</div>

---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Doble agente</strong> | La misma topología funcionando una vez con RIP y otra con OSPF |
| 🏅 <strong>Domador de wildcards</strong> | Elegir la wildcard correcta por red y por enlace /30 |
| 🏅 <strong>Ingeniero de FULL</strong> | Ver <code>show ip ospf neighbor</code> en FULL y explicar DR/BDR |
| 🏅 <strong>Terapeuta de redes</strong> | Curar una tabla vacía detectando el <code>network</code> que faltaba |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 3:</strong> elegir entre estáticas y dinámico, diagnósticos y laboratorio final con fallos escondidos. Para practicar: boletines U09 en Packet Tracer.
</div>

---
layout: closing
---
