---
layout: cover
---

# Unidad 09 — Routing dinámico<br>Bloque 1: los routers se cuentan

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Routing dinámico: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    En el routing <strong>dinámico</strong> los routers se cuentan las rutas entre vecinos y <strong>actualizan la tabla solos</strong>: cuando la red crece o un enlace muere, nadie tiene que escribir 200 comandos — el protocolo lo reparte.
  </div>
</div>

Con las estáticas de UD08 montaste 2 routers: era manejable. Imagina ahora 30 routers y 150 subredes: cada <code>ip route</code> a mano, y si un enlace cae, la red queda a la espera de que <strong>tú</strong> reescribas las tablas. Para eso existen RIP, OSPF y EIGRP: protocolos que <strong>aprenden, calculan y se curan</strong> sin ti. En este bloque: cómo se cuentan las rutas y cómo elige el router entre sus fuentes.

---
---

## Estático vs dinámico: el contraste

| Criterio | Rutas estáticas | Routing dinámico |
|---|---|---|
| Quién las escribe | El administrador, <strong>a mano</strong> | Los routers, <strong>protocolo</strong> |
| Escala | Bien con pocas redes (2–5) | Con 20 routers y redes remotas |
| Enlace caído | La ruta muere y <strong>nadie la rehace</strong> | Se recalcula y convergen |
| Recursos | Ninguno extra | CPU, memoria, tráfico de anuncios |
| Cuándo usar | Stub, conexiones puntuales, ISP | Redes multipoint y «vivas» |

<div class="info" style="margin-top:0.5rem;">
  No es «el dinámico reemplaza al estático»: en la vida real <strong>se combinan</strong> — estáticas hacia el ISP (por defecto) y dinámico dentro del territorio administrado.
</div>

---

## Cómo se cuentan las rutas

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Descubrir vecinos</strong> — todos los routers con un protocolo igual en las mismas interfaces se presentan.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Intercambiar información</strong>: cada uno anuncia las redes que conoce (las conectadas y las aprendidas) con su métrica.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Poblar la tabla</strong>: cada ruta aprendida entra con su código — <strong>R</strong> (RIP), <strong>O</strong> (OSPF), <strong>D</strong> (EIGRP) — en vez de <strong>S</strong>.</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content"><strong>Vigilar la red</strong>: se envían <em>hellos</em> y actualizaciones periódicas; si un vecino muere, sus rutas se limpian y <strong>se recalculan</strong>.</div></div>

<div class="info" style="margin-top:0.5rem;">
  El protocolo nunca toca las <strong>C</strong>: lo conectado es sagrado. Anuncia a otros lo que sabe, y para sí <strong>nunca se aprende lo ya conectado</strong>.
</div>

---

## Los vecinos intercambiando redes

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud09-par-vecinos-intercambio.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Métrica: cómo mide cada protocolo

Cuando varios dinámicos aprenden rutas, estas compiten entre sí por <strong>igual destino</strong> — esa comparación la resuelve la <strong>métrica</strong> del protocolo:

| Protocolo | Métrica | Cómo cuenta |
|---|---|---|
| RIP | <strong>saltos</strong> | 1 por router atraviesado; <strong>máx 15</strong> (16 = infinito) |
| OSPF | <strong>coste</strong> (ancho de banda) | 10⁸ / BW del enlace; menor coste = mejor |
| EIGRP | compuesta | Ancho de banda + retardo (las K de Cisco) |

<div class="info" style="margin-top:0.5rem;">
  La métrica <strong>no compara entre protocolos</strong>: solo elige dentro del <strong>mismo protocolo</strong>. Para comparar <strong>fuentes distintas</strong> está la AD.
</div>

---

## Distancia administrativa: quién te manda

Cuando dos <strong>fuentes distintas</strong> ofrecen rutas para la misma red, el router no se lo/piensa: confía en la de <strong>menor AD</strong>:

| Fuente | AD por defecto | Confianza |
|---|---|---|
| C / L (conectada, local) | <strong>0</strong> | La máxima — nadie mejor |
| Estática (S) | <strong>1</strong> | Tú la escribiste |
| EIGRP (D) | 90 | Cisco nativo, rápido |
| OSPF (O) | 110 | Estado de enlace |
| RIP (R) | 120 | Distancia vector, sencilla |

<div class="warning" style="margin-top:0.6rem;">
  Consecuencia práctica: si escribes una <strong>estática</strong> hacia la misma red que ya aprende OSPF, la ganadora será la <strong>estática</strong>. Es el truco de la <strong>ruta flotante</strong> de UD08, pero con AD <em>mayor</em> para que el dinámico sea el plan principal.
</div>

---
class: compact-slide
---

## show ip route: los códigos dinámicos

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1# show ip route</div>
  </div>
  <pre><code>C    192.168.10.0/24 is directly connected, GigabitEthernet0/0
L    192.168.10.1/32 is directly connected, GigabitEthernet0/0
O    192.168.40.0/24 [110/2] via 10.0.0.2, 00:12:47, GigabitEthernet0/1
O    10.0.1.0/30     [110/2] via 10.0.0.2, 00:12:47, GigabitEthernet0/1
R    192.168.50.0/24 [120/1] via 10.0.0.2, 00:00:23, GigabitEthernet0/1</code></pre>
</div>

| Código | Fuente | [AD / métrica] |
|---|---|---|
| <strong>O</strong> | OSPF | 110 / <strong>coste</strong> |
| <strong>R</strong> | RIP | 120 / <strong>saltos</strong> |
| <strong>D</strong> | EIGRP | 90 / métrica compuesta |

<div class="info" style="margin-top:0.4rem;">
  El <code>via</code> señala el próximo router (next-hop); el tiempo 00:12:47 = <strong>hace 12 min 47 s</strong> que se actualizó esa ruta. Y <strong>consecuencia del AD</strong>: si la misma red la ofrecen RIP y OSPF, solo aparecerá la <strong>O</strong>.
</div>

---
class: compact-slide
---

## Verificar el protocolo: show ip protocols

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R1# show ip protocols</div>
  </div>
  <pre><code>Routing Protocol is "ospf 1"
  Router ID 1.1.1.1
  Number of areas: 1 normal, 0 stub, 0 nssa
  Area 0 interfaces: GigabitEthernet0/0, GigabitEthernet0/1
  Routing for Networks:
    192.168.10.0 0.0.0.255 area 0
    10.0.0.0      0.0.0.3 area 0
  Routing Information Sources:
    2.2.2.2    Distance: 110  Last update: 00:01:59</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content">¿Qué protocolo corre <em>en este</em> router y con qué <strong>router-id</strong>? Primera línea.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">  ¿Qué redes <strong>anuncia</strong>? El bloque de <code>Routing for Networks</code> — si falta una, ese es el fallo: nunca la saldrá en la tabla de los demás.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">  ¿Con quién habla? En la sección de fuentes: vecinos (sus router-id), AD y tiempo de la última actualización.</div></div>

---
---

## Mini-chequeo: cómo se aprende

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué no puede hacer el protocolo con las rutas conectadas (C)?
2. R1 tiene OSPF (AD 110) y una estática (AD 1) hacia la misma red — ¿cuál se instala en la tabla?
3. ¿Qué mide cada métrica: RIP, OSPF?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Aprenderlas ya conectadas: las puede anunciar al resto, pero en su propia tabla nunca reemplaza una C — es de fábrica. · <strong>2.</strong> La estática — menor AD = mayor confianza, aunque la métrica se mide en otra unidad. · <strong>3.</strong> RIP cuenta <em>saltos</em> (máx 15); OSPF suma el <em>coste</em> de cada enlace (mejor BW = menos coste).
</div>

---
---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Lector de códigos</strong> | Distinguir C, S, O, R y D a primera vista y explicar [AD/métrica] |
| 🏅 <strong>Árbitro de fuentes</strong> | Ante dos propuestas para una misma red, decidir la ganadora por AD |
| 🏅 <strong>Voluntario del vecino</strong> | Explicar en 1 minuto qué comparten dos routers al ser vecinos |
| 🏅 <strong>Caza-métricas</strong> | Calcular a mano el coste OSPF de un enlace 100 Mb/s y de uno 1 Gb/s |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 2:</strong> RIP y OSPF a la obra — configuras ambos en tres routers y los pruebas. Para practicar: boletines U09 en Packet Tracer.
</div>

---
layout: closing
---
