---
layout: cover
---

# Unidad 02 — Medios de transmisión y cableado<br>Bloque 02

## 1r CFGS ASIR · Planificación y Administración de Redes

---
---

## Topologías de red
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    La <strong>topología física</strong> es el esquema geométrico de cómo conectamos los equipos entre sí mediante los cables: según formes una <strong>línea</strong>, una <strong>estrella</strong> o una <strong>malla</strong>, la red será más barata de montar o más resistente a los fallos.
  </div>
</div>

Ya sabes qué cables usar y qué problemas físicos tienen. Ahora toca decidir <strong>cómo tirarlos</strong>: no es lo mismo unir todos los PCs a un mismo cable largo que llevar un cable individual desde cada PC al armario central.

---
class: compact-slide
---

## Las cuatro topologías clásicas
<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">➖</div>
      <div class="step-content"><strong>Punto a punto:</strong> un cable une A con B. Todo el ancho de banda para los dos, pero <strong>no escala</strong> (latiguillo cruzado PC↔PC, fibra entre edificios)</div>
    </div>
    <div class="step">
      <div class="step-number">🚌</div>
      <div class="step-content"><strong>Bus:</strong> todos cuelgan de un único cable troncal. Si se corta, <strong>toda la red cae</strong>; y solo uno habla a la vez (colisiones). Murió con el 10Base2</div>
    </div>
    <div class="step">
      <div class="step-number">⭕</div>
      <div class="step-content"><strong>Anillo:</strong> cada equipo conecta con el siguiente y el último con el primero. Un corte rompe el aro (FDDI lo paliaba con doble anillo); hoy vive en <strong>fibra de ISP</strong> a nivel metropolitano</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">⭐</div>
      <div class="step-content"><strong>Estrella:</strong> todos los equipos conectan a un <strong>switch central</strong> que hace de policía de tráfico. Si un cable se rompe, solo ese usuario cae; añadir equipos es trivial</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Su precio: <strong>una tirada por equipo</strong> (mucho cable) y una SPOF: si el switch central muere, <strong>se apaga todo</strong>.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Es el <strong>estándar absoluto</strong> del cableado estructurado: oficinas, casas y aulas.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Malla, híbrida y dónde vive cada una

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">🕸️</div>
      <div class="step-content"><strong>Malla:</strong> todos con todos. <strong>Indestructible</strong> (corte → otra ruta), pero carísima: 10 equipos = <strong>45 cables</strong>. Por cobre solo en cores de datacenter y routers críticos de Internet</div>
    </div>
    <div class="step">
      <div class="step-number">🧬</div>
      <div class="step-content"><strong>Híbrida / árbol</strong> (la de la vida real): un <strong>switch core</strong> recibe en estrella los switches de cada planta, y cada switch recibe en estrella sus PCs — <strong>estrella de estrellas</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      La malla es <strong>la topología de moda en WiFi Mesh</strong>: conectar «todo con todo» por el aire no cuesta dinero en cables.
    </div>
    <table style="margin-top:0.6rem;">
      <thead><tr><th>Topología</th><th>Fallo de cable</th></tr></thead>
      <tbody>
        <tr><td>Punto a punto</td><td>Solo cae ese enlace</td></tr>
        <tr><td>Bus</td><td><strong>Cae toda la red</strong></td></tr>
        <tr><td>Anillo</td><td><strong>Cae toda la red</strong></td></tr>
        <tr><td>Estrella</td><td>Solo cae ese puesto</td></tr>
        <tr><td>Malla (completa)</td><td>Nada: otra ruta</td></tr>
      </tbody>
    </table>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: topologías

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
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
  Último chequeo del bloque:
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
    <span class="feature-icon">🗄️</span>
    <strong>El rack</strong>
    <p style="font-size:0.9rem;">Switches, patch panels y SAI en unidades U. Cada horizontal termina en su puerto etiquetado y el switch lo alimenta con un latiguillo.</p>
  </div>
</div>

---
layout: closing
---
