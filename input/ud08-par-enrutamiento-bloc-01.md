---
layout: cover
---

# Unidad 08 — Enrutamiento<br>Bloque 1: el router y su tabla

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## El enrutamiento: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>router es la frontera de la red</strong>: recibe un paquete, consulta su <strong>tabla de routing</strong> y decide por qué puerta física sale. Si ninguna ruta encaja con el destino, el paquete <strong>se descarta</strong> — no adivina.
  </div>
</div>

Ya has cruzado VLANs con un router (U06) y has dicho «por mi gateway y santas pascuas». Ahora abrimos la caja: cómo el router guarda sus rutas, cómo elige entre varias y qué cambia en el paquete a cada salto. En este bloque: la estructura de la tabla, las rutas conectadas, el <strong>longest prefix match</strong> y el reencapsulado.

---
---

## El trabajo interno del router

Cada paquete que llega pasa por la misma cirugía en cuatro tiempos:

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Recibir la trama</strong>: la MAC destino es la de una interfaz del router (el gateway). El router <em>abre el sobre</em>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Leer la IP destino</strong> de la capa 3: 192.168.30.7. ¿Es para mí? No — <strong>quiero reenviarla</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Consultar la tabla de routing</strong>: ¿qué ruta apunta a 192.168.30.0/24? Por interfaz G0/1, hacia el next-hop 10.0.0.2.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content"><strong>Reencapsular y reenviar</strong>: pega una nueva trama con MAC de la interfaz de salida y MAC del next hop. TTL −1.</div></div>

<div class="info" style="margin-top:0.5rem;">
  Los routers <strong>no reenvían tramas</strong>: reenvían <strong>paquetes</strong>. La trama se desmonta en cada salto y se reconstruye; el paquete IP viaja intacto de principio a fin.
</div>

---

## El viaje de un paquete por el router

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud08-par-consulta-ruta.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## Anatomía de la tabla de routing

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1# show ip route</div>
  </div>
  <pre><code>C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
L    10.10.10.1/32 is directly connected, GigabitEthernet0/0
C    10.0.0.0/30 is directly connected, GigabitEthernet0/1
S    192.168.30.0/24 [1/0] via 10.0.0.2
S*   0.0.0.0/0 [1/0] via 10.0.0.2</code></pre>
</div>

| Columna | Qué es |
|---|---|
| <strong>Código</strong> (C, L, S, S*…) | Cómo se aprendió la ruta: conectada, estática, aprendida… |
| <strong>Red destino</strong> | El rango que «cubre» la ruta (192.168.30.0/24) |
| <strong>[AD / métrica]</strong> | Qué tan creíble y qué tan buena es la ruta |
| <strong>via / interfaz</strong> | El <strong>next-hop</strong> (a quién dejarle el paquete) y por dónde sale |

---
---

## Los códigos de origen: por qué se le metió cada ruta

| Código | Significado | Cómo llegó ahí |
|---|---|---|
| <strong>C</strong> (connected) | La subred toca una interfaz del router | Por <strong>configurar la IP</strong> en la interfaz |
| <strong>L</strong> (local) | La propia IP + /32 del router | Automática con la C |
| <strong>S</strong> (static) | Una ruta la escribió el administrador | <code>ip route …</code> (bloque 2) |
| <strong>S*</strong> (default) | «Todo lo demás por aquí» | La <strong>por defecto</strong>: 0.0.0.0/0 |
| <strong>R, O, D…</strong> | Aprendidas de otros routers (RIP, OSPF, EIGRP) | Protocolos dinámicos — otra unidad |

<div class="info" style="margin-top:0.5rem;">
  Las C y las L <strong>no se configuran</strong>: nacen solas de las interfaces activas. El adivinador es el router; el administrador solo añade las S.
</div>

---
---

## Rutas conectadas: la reina de la tabla

<div class="step"><div class="step-number">1</div><div class="step-content">Le das IP y máscara a la interfaz, y la <strong>subred completa</strong> entra en la tabla como C.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El router también copia <strong>su propia dirección</strong> como L (/32): para qué la necesita, por ejemplo, en ARP.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Todo lo que está <strong>directamente conectado</strong>, lo conoce; lo que está tras otro router, <strong>hay que decírselo</strong>.</div></div>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1(config)# dos interfaces, dos rutas C</div>
  </div>
  <pre><code>R1(config)# interface GigabitEthernet0/0
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# interface GigabitEthernet0/1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# no shutdown</code></pre>
</div>

<div class="info" style="margin-top:0.4rem;">
  Nada de <code>ip route</code>: las C aparecen <strong>solas</strong> al levantar la interfaz. ¿El PC de 192.168.30.x? El router <strong>no lo sabe</strong>: para eso están las rutas estáticas (bloque 2).
</div>

---
class: compact-slide
---

## La decisión: longest prefix match

Si varias rutas sirven para el mismo destino, el router no se empeña con «la primera que salga» ni con la métrica:

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">El paquete lleva destino 172.16.2.14</div>
  </div>
  <pre><code>S    172.16.0.0/16 [1/0] via 10.0.0.2        ← sirve, pero…
S    172.16.2.0/24 [1/0] via 10.0.1.2        ← ¡más larga! GANA esta
S*   0.0.0.0/0     [1/0] via 10.0.2.2        ← el «todo lo demás» mundial</code></pre>
</div>

<div class="comparison-grid" style="margin-top:0.6rem;">
  <div class="comparison-item good">
    <strong>Gana la máscara más larga</strong>
    <p>Un /24 (24 bits que encajan) describe el destino con <strong>más precisión</strong> que un /16: siempre gana la <strong>más específica</strong>.</p>
  </div>
  <div class="comparison-item bad">
    <strong>No gana la más antigua ni la bonita</strong>
    <p>La métrica solo desempata entre rutas <strong>de la misma red</strong>. El orden de llegada no importa.</p>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  La <strong>por defecto</strong> (0.0.0.0/0) es la <strong>última apuesta</strong>: solo se usa cuando nada casa con el destino. Antes se puede caer otra cosa.
</div>

---
---

## El reencapsulado: MAC nueva, IP intacta

<div class="comparison-grid">
  <div class="comparison-item">
    <strong>Capa 2 — la trama, cambia cada salto</strong>
    <p>MAC origen = interfaz del router de salida.<br>MAC destino = MAC del <strong>next-hop</strong> (resuelta con ARP).</p>
  </div>
  <div class="comparison-item">
    <strong>Capa 3 — el paquete, no</strong>
    <p>IP origen e IP destino de extremo a extremo <strong>idénticas</strong>. Solo el TTL baja en 1.</p>
  </div>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content">El router no llega a cambiar «a quién va dirigido el paquete» — la IP <strong>es inamovible</strong>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Cada salto es un <strong>nuevo acta de envío</strong>: nueva MAC origen/destino, mismo destinario.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Es el espejo del inter-VLAN de U06: <strong>reencapsulado</strong>, no «reencaminado el paquete».</div></div>

---
---

## Mini-chequeo: la tabla

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Cuál es la diferencia entre una trama y un paquete a ojos del router?
2. ¿De dónde salen las rutas <code>C</code> y <code>L</code>? ¿Y las <code>S</code>?
3. Destino 172.16.2.14, con rutas /16, /24 y 0.0.0.0/0 disponibles — ¿cuál usa y por qué?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> La trama se desmonta y se reconstruye en cada salto ( capa 2 ); el paquete IP viaja íntegro de punta a punta. · <strong>2.</strong> C y L nacen de las interfaces activas con su IP; las S las escribe el administrador ( <code>ip route</code> ). · <strong>3.</strong> La /24: longest prefix match — la máscara más larga y más específica gana.
</div>

---
---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Forense de tabla</strong> | Leer <code>show ip route</code> línea a línea: código, destino, next-hop |
| 🏅 <strong>Juega con las C</strong> | Demostrar en Packet Tracer: <code>no shutdown</code> → aparecen las C y L |
| 🏅 <strong>Árbitro de máscaras</strong> | Ante tres rutas posibles, decidir sin dudar por longest prefix |
| 🏅 <strong>Desensamblador</strong> | Explicar ·MAC nueva, IP intacta· en menos de un minuto |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 2:</strong> rutas estáticas y por defecto — cómo se escriben a mano las rutas que el router no descubre solo. Para practicar: boletines U08 en Packet Tracer.
</div>

---
layout: closing
---
