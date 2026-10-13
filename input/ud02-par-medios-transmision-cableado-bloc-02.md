---
layout: cover
---

# Unidad 02 — Medios de transmisión y cableado<br>Bloque 02

## 1r CFGS ASIR · Planificación y Administración de Redes

---
---

## Cableado estructurado
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>cableado estructurado</strong> es la forma profesional de cablear un edificio: sigue el estándar <strong>TIA/EIA-568</strong>, separa el cable empotrado (<strong>horizontal</strong>) de los <strong>latiguillos</strong> flexibles, y hace que el 90% de los cambios se resuelvan moviendo un latiguillo — no tocando obra.
  </div>
</div>

El estándar fija categorías y distancias certificables, <strong>topología en estrella</strong> (cada toma llega al rack) y componentes con interfaces comunes (RJ45).

---
class: compact-slide
---

## El recorrido de la señal
### Del PC al switch, sin tocar obra

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-cableado-estructurado.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Latiguillo</strong> (1–5 m, flexible): del PC a la roseta</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Keystone</strong>: la roseta RJ45 hembra donde termina el cable horizontal</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Cable horizontal</strong> (sólido, empotrado): atraviesa paredes y falsos techos hasta el rack</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Patch panel</strong>: concentra todos los horizontales (12–48 puertos)</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Latiguillo</strong> del panel al switch — cambiar de puerto = mover un latiguillo</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los cuatro elementos y sus ventajas

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Elemento</th><th>Dónde vive</th></tr></thead>
      <tbody>
        <tr><td><strong>Latiguillo</strong></td><td>Extremos: PC↔roseta y panel↔switch</td></tr>
        <tr><td><strong>Keystone</strong></td><td>La roseta de pared</td></tr>
        <tr><td><strong>Patch panel</strong></td><td>El rack</td></tr>
        <tr><td><strong>Cable horizontal</strong></td><td>Empotrado: no se toca nunca</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.5rem;">
      Horizontal <strong>sólido</strong> (mejor rendimiento, vive en la pared); latiguillo <strong>flexible</strong> (sobrevive al roce). Al revés: fallo de novato.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Lo que ganas:</strong> cada toma identificada, cambios sin obra, latiguillos que se sustituyen en segundos e instalación <strong>certificable</strong> por categoría.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>La chapuza se paga:</strong> cambiar un PC de mesa sin cableado estructurado = rehacer tramos; con él = mover un latiguillo en 2 minutos.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Etiquetado y documentación

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Cada puerto, etiqueta en ambos extremos:</strong> el keystone R-3-14 corresponde al puerto 14 del patch panel</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Esquema de racks actualizado:</strong> qué va en cada panel y qué switch lo alimenta</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Números, no colores improvisados:</strong> un criterio fijo planta-número</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      La documentación es el activo que se agradece <strong>a los tres años</strong>, no el primer día.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      <strong>La prueba del algodón:</strong> si para saber de dónde viene un cable tienes que conectar-desconectar a ciegas, tu cableado «estructurado» solo lo es de nombre.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: cableado estructurado

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. Enumera los componentes que separan un PC de un switch en cableado estructurado.
2. Un usuario cambia de mesa en la misma oficina. ¿Qué se toca físicamente?
3. ¿Por qué el estándar TIA/EIA-568 exige topología en estrella?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Latiguillo → keystone → cable horizontal → patch panel → latiguillo</strong> (dos latiguillos + un tramo fijo)</li>
    <li>Solo <strong>latiguillos</strong>: un latiguillo nuevo en la roseta y, si cambia el puerto, otro en el panel. La obra queda intacta</li>
    <li>En estrella cada toma llega directa al panel: <strong>fácil de etiquetar, diagnosticar y ampliar</strong>; las cadenas son un dolor para localizar fallos</li>
  </ul>
</div>

---
---

## Cómo planear una instalación de cero
### De decisión a decisión

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Inventario de puestos:</strong> cuenta tomas por planta y añade 20–30% de reserva (el edificio crece)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Ubica el rack</strong>: centro geométrico, ventilación y acceso. Todo horizontal nace de aquí</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Define la categoría</strong>: Cat6 como mínimo hoy (10 Gb a futuro → Cat6a); la categoría es el techo, no la garantía</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Calcula el material</strong>: 90 m máx por horizontal (regla de los 100 m con saltos incluidos)</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Elige canaletas y bandejas</strong>: el cable empotrado respeta curvas suaves y evita corriente y motores</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content"><strong>Etiqueta y documenta</strong> antes de cerrar techos: la obra se hace una vez, la documentación queda para siempre</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los números que hay que memorizar

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Límite</th><th>Valor</th></tr></thead>
      <tbody>
        <tr><td>Cable horizontal total (obligatorio)</td><td><strong>90 m</strong></td></tr>
        <tr><td>Latiguillos en los dos extremos</td><td><strong>5 + 5 m</strong></td></tr>
        <tr><td>Total de la ruta (el famoso 100 m)</td><td><strong>100 m</strong></td></tr>
        <tr><td>Puertos por patch panel típico</td><td>12 / 24 / 48</td></tr>
        <tr><td>Cat6: 10 Gbps solo hasta…</td><td>55 m</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="warning">
      <strong>La cuenta que se olvida:</strong> el cable horizontal no puede superar <strong>90 m</strong> porque se reserjan 10 m para el latiguillo del PC (5 m) y el del patch panel al switch (5 m). Si te pasas, la ruta entera supera los 100 m y la certificación se cae.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <strong>Regla del presupuesto de cable:</strong> mide la ruta más larga para decidir cuánto de bobina hay que comprar y suma 10% de margen (cortes, desvíos y sorpresas de obra).
    </div>
  </div>
</div>

---
class: compact-slide
---

## El rack: qué hay dentro y por qué

<div class="features-grid" style="margin-top:0.8rem;">
  <div class="feature-item">
    <span class="feature-icon">🗄️</span>
    <strong>Rack (10–42 U)</strong>
    <p style="font-size:0.9rem;">El armario estándar de 19 pulgadas. Todo lo medible sale en «unidades U» (1 U = 44,45 mm).</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔀</span>
    <strong>Switch de 24/48 puertos</strong>
    <p style="font-size:0.9rem;">Cada switch cabe en 1 U. Los latiguillos del panel alimentan sus puertos.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔌</span>
    <strong>Patch panel de 24/48</strong>
    <p style="font-size:0.9rem;">Uno por switch (o el 1:1 que prefieras). Cada horizontal termina en su puerto etiquetado.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔋</span>
    <strong>SAI (UPS)</strong>
    <p style="font-size:0.9rem;">Corta los picos y da 10–20 min para salvar el edificio cuándo la luz muere. Lo pone el que ha sufrido.</p>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: planear una instalación

<div class="question-card">
  <span class="question-icon">🧠</span>
  Último chequeo del cableado:
</div>

1. Edificio de 3 plantas con 24 puestos por planta. ¿Cuántas tomas estructuradas pides y por qué?
2. ¿Por qué el horizontal no puede medir 95 m si el límite total es de 100 m?
3. ¿Qué papel juega el SAI en el rack y por qué se considera parte del diseño de red?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>3 por puesto</strong> (1 dato + 2 reserva): 24 × 3 = 72 por planta → <strong>216 tomas</strong>. Las extra cuestan poco al cablear y mucho después</li>
    <li><strong>Horizontal + dos latiguillos</strong> deben caber en 100 m: 95 + 5 + 5 = 105 m y la certificación se cae</li>
    <li>Sostiene <strong>switch, router y servidores</strong> en cada microcorte: sin él, un apagón desconecta media empresa</li>
  </ul>
</div>

---
---

## Topologías de red
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    La <strong>topología de red</strong> es el <strong>plano</strong> de cómo se conectan los dispositivos entre sí: quién va pegado a quién, por dónde pasan los cables y qué pasa si se cae un tramo. No es el cable en sí (eso ya lo tienes): es el dibujo que decides <strong>antes</strong> de tender el primer cable.
  </div>
</div>

La misma longitud de cable, el mismo Cat6 y el mismo switch pueden darte una red que aguante una caída o una red que se caiga entera por un solo cable suelto. La diferencia está en el plano.

---
class: compact-slide
---

## Punto a punto
### Dos equipos, un solo enlace

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-punto-a-punto.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>Ventaja:</strong> máxima simplicidad y privacidad: todo el ancho de banda es del enlace (latiguillo cruzado PC↔PC, fibra entre edificios)</div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> si se cae el enlace, no hay alternativa; y un tercer dispositivo obliga a crear otro enlace nuevo</div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> PC ↔ switch, switch ↔ router… cualquier red grande es un montón de enlaces punto a punto unidos</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Bus
### Un cable troncal para todos

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-bus.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>Ventaja:</strong> pocos cables y barata: ideal para tender una red pequeña de prisa</div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> el cable central es <strong>punto único de fallo</strong> (se parte el bus y cae toda la red); todos compiten por el medio (colisiones, solo uno habla a la vez) y los extremos piden <strong>terminadores</strong></div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> redes de los 80-90 con coaxial (el 10Base2); hoy solo en museos</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Anillo
### Cada equipo con sus dos vecinos

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-anillo.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>Ventaja:</strong> camino previsible y ordenado; en anillos gestionados (Token Ring, FDDI) había prioridad y no colisiones</div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> un corte interrumpe el aro… salvo con <strong>redundancia</strong> (el doble anillo de FDDI)</div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> Token Ring (obsoleto), FDDI, y hoy en los <strong>anillos DWDM de operadores</strong> y los <em>rings</em> de los datacenters</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Estrella
### Todos al switch central

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-estrella.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>Ventaja:</strong> un cable roto solo deja tirado a <strong>un</strong> puesto; el resto sigue. Fácil de diagnosticar y ampliar (cada puerto, un puesto)</div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> mucho cable (una tirada por equipo) y el switch central como <strong>punto único de fallo</strong>: se cae y se cae la red (por eso luego se duplican)</div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> es <strong>la topología de las redes actuales</strong>: el cableado estructurado del edificio es una estrella en toda regla (cada roseta → panel → switch)</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Malla
### Todos (o casi) con todos

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-malla.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">➕</div>
      <div class="step-content"><strong>Ventaja:</strong> la más robusta: si cae un enlace, siempre hay <strong>otro camino</strong></div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> el número de enlaces se dispara (`n·(n−1)/2`): a 10 equipos, <strong>45 cables</strong>; a 100, 4.950. Nadie monta malla completa en una oficina</div>
    </div>
    <div class="step">
      <div class="step-number">✅</div>
      <div class="step-content"><strong>Malla parcial</strong> (la versión sensata): solo los enlaces <strong>justos</strong> para que quede siempre un camino alternativo</div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> núcleos de operadores y datacenters; la filosofía «todo con todo» sin coste de cables es el <strong>WiFi Mesh</strong></div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Híbrida / árbol
### La topología de la vida real

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame">
      <Excalidraw drawFilePath="/diagrams/ud02-par-topologia-hibrida.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">avicon-link</div>
      <div class="step-content"><strong>Qué es:</strong> se combinan topologías: una <strong>estrella de switches por planta</strong> (acceso), unida a una estrella superior (distribución) y otra arriba del todo (core): <strong>estrella de estrellas</strong></div>
    </div>
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Desventaja:</strong> más planificación y enlaces redundantes que hay que gestionar bien (ahí entra el <strong>STP</strong>, de la unidad de switching)</div>
    </div>
    <div class="step">
      <div class="step-number">🔎</div>
      <div class="step-content"><strong>Dónde la ves:</strong> casi todas las redes de empresa: estrellas de acceso, redundancia en distribución y un core que lo une todo</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Las seis topologías, en una tabla

| Topología | Ventaja clave | Punto débil | Dónde la ves |
|---|---|---|---|
| **Punto a punto** | Simple y privada | Sin alternativa si se cae | Enlaces de acceso, fibra entre edificios |
| **Bus** | Pocos cables | Cable central = red entera caída | Redes antiguas (coaxial) |
| **Anillo** | Orden y prioridad | Un corte puede parar el anillo | Operadores, datacenter, redes antiguas |
| **Estrella** | Fallo aislado a un puesto | El switch central es punto único | **Cableado actual de oficinas** |
| **Malla** | Caminos alternativos | Coste y cantidad de enlaces | Núcleos de operadores, datacenters |
| **Híbrida / árbol** | Escala por capas | Requiere planificación | Redes de empresa reales |

<div class="info" style="margin-top:0.7rem;">
  <strong>Estrella</strong> es la referencia de las redes actuales porque <strong>aisla los fallos por puesto</strong>; bus y anillo clásicos mueren por su punto único de fallo.
</div>

---
---

## Mini-chequeo: topologías

<div class="question-card">
  <span class="question-icon">🧠</span>
  Último chequeo del bloque:
</div>

1. ¿Qué topología física utiliza un switch para concentrar las conexiones de los usuarios?
2. Se corta el cable de un empleado en una estrella. ¿Qué ocurre con el resto de la red?
3. Tres routers principales nunca deben perder conectividad entre ellos aunque se rompa un enlace. ¿Qué topología usas?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>La <strong>estrella</strong>: el switch es el nodo central al que convergen todos los cables</li>
    <li><strong>Nada</strong>: esa es la gran ventaja — el fallo queda aislado a ese enlace; el empleado pierde la red, la empresa sigue</li>
    <li>Una <strong>malla</strong>: 3 enlaces directos entre ellos; si uno cae, el tráfico rodea por el tercero</li>
  </ul>
</div>

---
---

## Resumen del bloque 02
### Tres frases para quedarte

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">🏢</span>
    <strong>Cableado estructurado</strong>
    <p style="font-size:0.9rem;">TIA/EIA-568, estrella, cable horizontal sólido + latiguillos flexibles. Cambiar = mover un latiguillo, nunca tocar obra.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">📐</span>
    <strong>Planear la instalación</strong>
    <p style="font-size:0.9rem;">Inventario + 30% de reserva, rack centrado, Cat6 mínimo, horizontales ≤ 90 m y etiquetado antes de cerrar techos.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🕸️</span>
    <strong>Topologías</strong>
    <p style="font-size:0.9rem;">El plano de la red: estrella = estándar (fallo aislado por puesto), malla = caminos alternativos, y las redes reales son <strong>híbridas en árbol</strong>.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🗄️</span>
    <strong>El rack</strong>
    <p style="font-size:0.9rem;">Switches, patch panels y SAI en unidades U. Cada horizontal termina en su puerto etiquetado y el switch lo alimenta con un latiguillo.</p>
  </div>
</div>

---
layout: closing
---
