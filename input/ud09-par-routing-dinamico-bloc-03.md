---
layout: cover
---

# Unidad 09 — Routing dinámico<br>Bloque 3: elegir, diagnosticar, cerrar

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Elegir la herramienta: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Hasta el protocolo «mejor» falla si es el <strong>equivocado para el tamaño</strong>: estáticas en redes estables y pequeñas, <strong>OSPF</strong> en cuanto la red crece o cambia. Y al diagnosticar, <strong>el protocolo no se esconde</strong>: <code>show ip protocols</code> te confiesa todo lo que hace.
  </div>
</div>

Después de dos bloques con RIP y OSPF, el rol del administrador cambia: ahora ya no escribes rutas — <strong>eliges quién las escribe</strong> y <strong>verificas que las escriba bien</strong>. En este bloque: los criterios de elección, los ajustes finos y el laboratorio final con fallos escondidos.

---

## Cuándo usar cada uno

| Escenario | Elección | Por qué |
|---|---|---|
| Router de la sede que solo sale al ISP | <strong>Estática por defecto</strong> | Una sola fila y el resto camino; el ISP hace el resto |
| 2 routers + 2 LAN, nunca cambia | <strong>Estáticas a mano</strong> | Pocas filas, sin consumir CPU ni anuncios |
| Empresa con 5–10 routers y VLANs nuevas | <strong>RIP v2</strong> (o estáticas, si no crece) | Fácil, 16 saltos sobran |
| Red grande o que cambia cada mes | <strong>OSPF</strong> | Escala, converge rápido y es estándar abierto |

<div class="info" style="margin-top:0.5rem;">
  En la práctica las combinaciones conviven: <strong>OSPF intraempresa + ruta por defecto hacia arriba</strong>. La por defecto siempre queda al final de la tabla: el último recurso.
</div>

---

## EIGRP: la tercera puerta (solo Cisco)

No es el protagonista de esta unidad, pero con dos dinámicos a la vista conviene ponerlo en el tablero:

| Aspecto | EIGRP |
|---|---|
| Tipo | <strong>Avanzado</strong>: guarda rutas alternativas ya calculadas |
| Métrica | Compuesta (ancho de banda + retardo) |
| AD | <strong>90</strong> — más creíble que OSPF (110) y que RIP (120) |
| Código en la tabla | <strong>D</strong> |
| Licencia | <strong>Propiedad de Cisco</strong>: no interopera con RIP/OSPF entre fabricantes |

<div class="warning" style="margin-top:0.6rem;">
  El detalle práctico: <strong>AD 90 vs OSPF 110</strong> — si <strong>una misma red</strong> es aprendida por ambos, gana EIGRP. Si vas a mezclar EIGRP y OSPF con redes solapadas, decide qué protocolo manda y revisa el <code>show ip route</code>.
</div>

---
class: compact-slide
---

## Ajustes finos: passive-interface y coste

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Que anuncie, pero que no escuche por ahí</div>
  </div>
  <pre><code>R1(config-router)# passive-interface GigabitEthernet0/0
R1(config-router)# passive-interface default
R1(config-router)# no passive-interface GigabitEthernet0/1

R1(config-if)# ip ospf cost 50
R1(config-if)# ip ospf priority 200</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><code>passive-interface</code>: la interfaz <strong>anuncia la subred</strong> pero no manda hellos por ella — en las LAN de PCs y servidores (¿para qué escuchar rutas ahí?) es <strong>seguridad</strong>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><code>ip ospf cost</code>: <strong>guardián del camino</strong> — si quieres desviar el tráfico a otra ruta (una WAN cara), sube el coste del enlace que no quieres.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><code>ip ospf priority</code>: decide quién será <strong>DR</strong> en la multi-acceso — gana el de <strong>mayor prioridad</strong>, planificado, no por suerte de tiempos.</div></div>

---

## Verificación del dinámico: el ritual

<div class="step"><div class="step-number">1</div><div class="step-content"><code>show ip route</code> → ¿existen las rutas O/R? ¿Sus [AD/métrica] y <code>via</code> apuntan al vecino correcto?</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><code>show ip protocols</code> → el inventario del router: qué anuncia, con qué AD, qué vecinos…</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><code>show ip ospf neighbor</code> → ¿los vecinos están en <strong>FULL</strong>? ¿Hay DR/BDR donde toca?</div></div>
<div class="step"><div class="step-number">4</div><div class="step-content"><code>ping</code> y <code>traceroute</code> → la prueba final: por dónde <strong>de verdad</strong> sale el tráfico (comparar con la ruta preferida de la tabla).</div></div>

---

## El no-aparece: las tres causas del 90 %

Si la ruta dinámica no sale en <code>show ip route</code>, el culpable casi siempre es uno de estos tres:

| Causa | Cómo se detecta | Remedio |
|---|---|---|
| <strong>Red no anunciada</strong> | <code>show ip protocols</code> del vecino: falta el <code>network</code> | Añadirlo (y volver a mirar) |
| <strong>Área / proceso que no cuadra</strong> (OSPF) | Vecinos <em>INIT</em>/<em>ATTEMPT</em> o ausentes | Igualar <code>area</code> y wildcard en ambos |
| <strong>Interfaz down o mal asignada</strong> | <code>show ip interface brief</code> | <code>no shutdown</code> / revisar la IP |

<div class="warning" style="margin-top:0.6rem;">
  Mismo «ida y vuelta» de UD08, en versión dinámica: <strong>el anuncio faltante también es bidireccional</strong>. Si solo un router anuncia, la red «sabe salir» pero no «sabe volver»: pings con respuesta solo a medias.
</div>

---

## Acorralar el fallo: árbol de decisión

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud09-par-diagnostico-dinamico.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## ⚡ Laboratorio: dinámico con fallos escondidos

<div class="two-cols">
  <div class="left">
    <div class="info" style="padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;">
      <p><strong>Montaje</strong> (1,5–2 h, Packet Tracer): cadena de 3 routers (R1–R2–R3) con LAN 192.168.10.0/24, 192.168.30.0/24 y 192.168.40.0/24, enlaces 10.0.0.0/30 y 10.0.1.0/30.</p>
      <p><strong>Tus tres fallos:</strong></p>
      <p><strong>A.</strong> A R1 se le olvida <code>network 192.168.10.0</code> en OSPF<br>
      <strong>B.</strong> En R2, wildcard del enlace mal escrita (0.0.0.255 en una /30)<br>
      <strong>C.</strong> Router-id <strong>duplicado</strong> entre dos routers</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>Pistas:</strong></p>
      <p><em>A:</em> el ping va, el trace muere en R1… <code>show ip protocols</code> no lista la red de tu LAN.</p>
      <p><em>B:</em> los vecinos de R2 no aparecen (o aparecen a medias): <code>show ip ospf interface brief</code>, área camina, wildcard rompe.</p>
      <p><em>C:</em> mensajes duplicados en los logs al cargar, vecinos <em>EXSTART</em>/error — busca los <code>router-id</code> iguales.</p>
      <p>Documenta: síntoma → causa → comando que la delató.</p>
    </div>
  </div>
</div>

---

## ¿Quién soy? (4 adivinanzas)

1. Soy la ruta que <strong>nadie escribió</strong> y que aparece sola en la tabla: mi código no es ni C ni S.
2. Cuento saltos mientras mi <strong>competidor</strong> se dibuja el mapa… y en el 16 me rindo.
3. Yo señalo a otro router con la palabra <code>via</code>: él hace el próximo salto.
4. Si un enlace muere, <strong>yo ya lo sé sin tu ayuda</strong>: los vecinos avisan y las tablas se rehacen solas.

<div class="answer-card" style="margin-top:0.7rem;">
  1. La ruta aprendida (O, R, D) frente a la conectada (C, AD 0) · 2. RIP (máximo 15 saltos frente a OSPF por mapa) · 3. El next-hop · 4. La convergencia: la parte «dinámica» del dinámico
</div>

---
---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Consultor de redes</strong> | Elegir y justificar: cuándo estáticas, cuándo RIP, cuándo OSPF |
| 🏅 <strong>Maestro del coste</strong> | Subir el <code>ip ospf cost</code> y desviar el tráfico a la ruta que elijas |
| 🏅 <strong>Inmunólogo</strong> | Distinguir «no hay vecino» de «vecino FULL pero falta anuncio» |
| 🏅 <strong>Auditor de convergencia</strong> | Derribar un enlace y ver cómo la red se rehace sin que toques nada |

<div class="info" style="margin-top:0.6rem;">
  <strong>Siguiente unidad: seguridad en el router — listas de control de acceso (ACL) y NAT.</strong> Hasta ahora mueves tráfico; a partir de ahora decides <strong>quién puede moverlo</strong> y con qué dirección sale al mundo. Para practicar: boletines U09 en Packet Tracer.
</div>

---
layout: closing
---
