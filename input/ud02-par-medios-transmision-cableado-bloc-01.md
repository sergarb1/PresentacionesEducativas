---
layout: cover
---

# Unidad 02 — Ethernet, medios de transmisión y cableado<br>Bloque 01

## 1r CFGS ASIR · Planificación y Administración de Redes

---
---

## La capa física
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Antes de cualquier IP o VLAN, hay alguien que convierte un <strong>1 binario</strong> en un pulso eléctrico, un destello de luz o una onda de radio — y garantiza que ese 1 llegue entero a su destino. Ese alguien es la <strong>capa física</strong>, y <strong>Ethernet es su idioma</strong>.
  </div>
</div>

En esta unidad: los medios de transmisión, el cable UTP y su crimpado, el cableado estructurado del edificio y, de regalo, el modelo OSI y la trama Ethernet.

---
class: compact-slide
---

## Los tres medios de transmisión
### Vista de pájaro

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-par-medios-transmision.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## El cobre: el rey de las LAN

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">Sus cartas</h3>
    <div class="step">
      <div class="step-number">💰</div>
      <div class="step-content"><strong>Barato</strong> y fácil de conseguir, metro a metro</div>
    </div>
    <div class="step">
      <div class="step-number">🔧</div>
      <div class="step-content"><strong>Crimpable por cualquiera</strong>: una crimpadora y diez minutos</div>
    </div>
    <div class="step">
      <div class="step-number">📏</div>
      <div class="step-content"><strong>Límite de 100 m</strong>: a partir de ahí, la atenuación dispara los errores</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>¿Cuándo elegirlo?</strong> Puestos de trabajo, impresoras y switches dentro del mismo edificio: distancias cortas, presupuesto ajustado, mantenimiento sencillo.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      El cobre es el <strong>pan de cada día</strong> del cableado horizontal.
    </div>
  </div>
</div>

---
class: compact-slide
---

## La fibra y el aire

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">💡 Fibra óptica: luz con superpoderes</h3>
    <ul style="font-size:0.92rem;">
      <li><strong>Velocidad brutal:</strong> hasta 400 Gbps (el cobre se asfixia en 10)</li>
      <li><strong>Kilómetros</strong> sin repetidor</li>
      <li><strong>Inmune</strong> a motores, fluorescentes y cables de corriente</li>
      <li><strong>Segura:</strong> interceptar luz sin ser detectado es muy difícil</li>
    </ul>
  </div>
  <div class="right">
    <h3 style="color:#3B82F6;">📶 Aire (WiFi): cuando el cable no llega</h3>
    <ul style="font-size:0.92rem;">
      <li><strong>Movilidad</strong> sin instalar nada</li>
      <li><strong>Velocidad engañosa:</strong> en la práctica, 30–50% de la teórica</li>
      <li><strong>El canal se comparte:</strong> más dispositivos, menos caudal para cada uno</li>
      <li><strong>Paredes y vecinos</strong> degradan la señal</li>
    </ul>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  El WiFi <strong>complementa al cable, no lo sustituye</strong>: puestos fijos y de alta demanda van por cobre.
</div>

---
class: compact-slide
---

## Cómo decidir el medio

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>¿Qué distancia hay?</strong> &lt; 100 m → cobre o WiFi · kilómetros → fibra</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>¿Velocidad continuada?</strong> Copias gordas siempre → cobre gigabit o fibra · navegar y correo → WiFi</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>¿El usuario se mueve?</strong> Sí → WiFi · No → cobre · ¿Motores e interferencias? → fibra</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Regla de oro:</strong> el cable es la base de todo; el WiFi es la comodidad que se sube encima.
    </div>
    <table style="margin-top:0.6rem;">
      <thead><tr><th>Fallo típico</th><th>Su medio</th></tr></thead>
      <tbody>
        <tr><td>Atenuación, diafonía</td><td>Cobre</td></tr>
        <tr><td>Roturas, conectores sucios</td><td>Fibra</td></tr>
        <tr><td>Interferencias, cobertura</td><td>Aire</td></tr>
      </tbody>
    </table>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: medios de transmisión

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. Ordena los tres medios de mayor a menor distancia máxima.
2. Dos racks del mismo edificio, separados 150 m por un pasillo lleno de motores eléctricos. ¿Qué medio eliges y por qué?
3. ¿Cuál es la desventaja principal del aire frente al cobre?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Fibra (40+ km)</strong> → <strong>cobre (100 m)</strong> → <strong>aire (10–100 m variable)</strong></li>
    <li><strong>Fibra óptica:</strong> 150 m supera el límite del cobre y las interferencias de los motores le dan igual (transmite luz, no electricidad)</li>
    <li>El <strong>canal compartido y la imprevisibilidad</strong>: cae al 30–50% de la velocidad teórica; el cable tendido es estable</li>
  </ul>
</div>

---
---

## El cable UTP
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El UTP (<em>Unshielded Twisted Pair</em>, par trenzado sin apantallar) es el estándar de facto de las LAN: <strong>8 hilos de cobre en 4 pares trenzados</strong>, cada uno con su color, y el trenzado existe para <strong>combatir interferencias y diafonía</strong>.
  </div>
</div>

Lo has pisado, enrollado y maldito mil veces. Hoy vas a entender por qué es como es: la anatomía del cable que sostiene casi todas las oficinas del planeta.

---
class: compact-slide
---

## ¿Por qué se trenzan los pares?

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Cancelación electromagnética.</strong> El ruido externo (motores, fluorescentes) afecta por igual a ambos hilos; el receptor <strong>resta</strong> las señales y el ruido común se cancela</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Menos diafonía entre pares.</strong> Cada par se trenza con un <strong>paso distinto</strong> (vueltas por metro): la señal de un par no se acopla de forma regular sobre el vecino</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      Los pares cancelativos usan pines adyacentes: <strong>1-2, 3-6, 4-5 y 7-8</strong>.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      Es la misma idea del <strong>modo común</strong>: si el ruido se mete igual en los dos hilos, al restar desaparece y queda la señal original.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Categorías: Cat5e → Cat8

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Cat</th><th>Velocidad</th><th>Uso</th></tr></thead>
      <tbody>
        <tr><td><strong>Cat5e</strong></td><td>1 Gbps</td><td>Oficinas antiguas</td></tr>
        <tr><td><strong>Cat6</strong></td><td>1 Gbps (10 hasta 55 m)</td><td>Estándar actual</td></tr>
        <tr><td><strong>Cat6a</strong></td><td>10 Gbps</td><td>10 G a 100 m</td></tr>
        <tr><td><strong>Cat7</strong></td><td>10 Gbps</td><td>STP, alta interferencia</td></tr>
        <tr><td><strong>Cat8</strong></td><td>25–40 Gbps</td><td>Solo 30 m, el rack</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Cat6 llega a 10 Gbps solo hasta 55 m</strong>; para 10 Gbps a 100 m necesitas Cat6a. Y la Cat8 vive en el rack: 30 metros.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <strong>¿Qué compro?</strong> Oficina a 1 Gbps → Cat6 · datacenter a 10 Gbps → Cat6a · interferencias fuertes → STP o fibra.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: el cable UTP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Cuántos hilos y pares tiene un UTP? ¿Qué relación tienen los pares con los pines?
2. ¿Qué dos problemas físicos resuelve el trenzado?
3. ¿Qué categoría necesitas para 10 Gbps a 100 m? ¿Y qué pasa con Cat6?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>8 hilos en 4 pares</strong>, asignados a los pines 1-2, 3-6, 4-5 y 7-8 para que la cancelación funcione</li>
    <li><strong>Cancelación electromagnética</strong> y <strong>reducción de diafonía</strong> (pasos de trenzado distintos por par)</li>
    <li><strong>Cat6a</strong> (o Cat7); Cat6 garantiza 10 Gbps solo hasta 55 m — a 100 m se queda en 1 Gbps</li>
  </ul>
</div>

---
class: compact-slide
---

## Directo, cruzado y consola
### El pinout decide quién habla con quién

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-par-tipos-cable.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Los tres cables, en detalle

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Tipo</th><th>Extremo A</th><th>Extremo B</th><th>Conecta</th></tr></thead>
      <tbody>
        <tr><td><strong>Directo</strong></td><td>T568B</td><td>T568B</td><td>PC ↔ Switch</td></tr>
        <tr><td><strong>Cruzado</strong></td><td>T568A</td><td>T568B</td><td>PC ↔ PC, Sw ↔ Sw</td></tr>
        <tr><td><strong>Consola</strong></td><td>1→8</td><td>8→1</td><td>PC ↔ puerto consola</td></tr>
      </tbody>
    </table>
    <div class="success" style="margin-top:0.5rem;">
      Si solo vas a crimpar un tipo en la vida: practica el <strong>directo</strong>. Es el que compra y fabrica todo el mundo.
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>El fallo clásico:</strong> «PC y switch no conectan con cable cruzado». En el 95% de los casos <strong>Auto MDI-X</strong> lo resolvió hace años: los puertos modernos detectan el tipo de cable y ajustan. Sigue siendo necesario en equipos antiguos y simuladores estrictos.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      El cable de consola va al <strong>puerto serie/USB</strong> del PC: ahí no hay IP ni Ethernet, es consola a bajo nivel.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: los tres cables

<div class="question-card">
  <span class="question-icon">🧠</span>
  Repaso rápido:
</div>

1. ¿Qué diferencia los pinouts T568A y T568B?
2. Switch a switch con cable directo en un simulador antiguo sin Auto MDI-X. ¿Funciona? ¿Qué usarías?
3. ¿Para qué sirve el cable de consola y a qué puerto va?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Intercambian los pares 2 y 3</strong> (naranja y verde); azul y marrón ocupan los mismos pines en ambas</li>
    <li><strong>No funciona de forma fiable</strong>: son dispositivos del mismo tipo → cable <strong>cruzado</strong> (A en un extremo, B en el otro)</li>
    <li>Para la <strong>configuración inicial</strong> del switch/router: puerto serie/USB del PC al <strong>puerto de consola</strong>, sin IP ni Ethernet</li>
  </ul>
</div>

---
---

## Crimpado: los 6 pasos (T568B)

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Pelar:</strong> 2 cm de funda, sin cortar los hilos</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Ordenar:</strong> según T568B, aplanando y alineando los hilos</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Cortar:</strong> recto y a escuadra, dejando ~1 cm de hilos</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Insertar:</strong> hasta asomar las puntas; la funda <strong>dentro del conector</strong></div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Crimpar:</strong> aprieta hasta oír el clic</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content"><strong>Comprobar:</strong> tester de continuidad — siempre</div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>El error más repetido:</strong> insertar los hilos <em>sin</em> meter la funda en el conector. El pasador no agarra nada y a la primera tirada el cable se suelta. La funda es el anclaje.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Material: crimpadora con pelacables, conectores RJ45 compatibles con el diámetro del cable, cable Cat5e/Cat6 y <strong>tester</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El tester: leer sus LEDs

| Qué ves | Significado |
| ----- | ----- |
| LEDs 1-8 en orden en ambos módulos | Cable correcto |
| Un LED apagado (en uno o ambos lados) | Hilo sin conectar |
| Dos LEDs intercambiados (ej. 1 y 2) | Pares invertidos |
| LEDs 8-1 en el módulo destino | Cable de consola (rollover) |
| LEDs 1-6 pero no 7-8 | Solo 3 pares → negociará a 100 Mbps |

<div class="warning" style="margin-top:0.6rem;">
  <strong>El split pair es el fallo traicionero:</strong> hay continuidad (el tester da OK) pero los pares no son cancelativos → errores intermitentes y enlace lento. El tester básico <strong>no mide diafonía</strong>: para eso hacen falta certificadores.
</div>

---
class: compact-slide
---

## La prueba del algodón: en red de verdad

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Velocidad negociada:</strong> un latiguillo de 4 pares bien crimpado negocia <strong>1 Gbps</strong>; si cae a 100 Mbps, faltan pares o hay split pair</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Transferencia real:</strong> copia un archivo grande (o iperf); errores CRC y velocidad baja delatan cables enfermos</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Movimiento físico:</strong> mueve el conector mientras haces ping; si cae, hay <strong>mal contacto</strong> (crimpado flojo o funda sin anclar)</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Regla del profesional:</strong> el tester es para fabricar bien; la prueba en red es para certificar que funciona. Nunca entregues un latiguillo sin los dos pasos.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Si «funciona a 100 en vez de a 1000»: sospecha de <strong>pares muertos (7-8)</strong> o <strong>split pair</strong>.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: crimpado

<div class="question-card">
  <span class="question-icon">🧠</span>
  Último chequeo del bloque:
</div>

1. Enuncia los 6 pasos del crimpado.
2. El tester da los 8 LEDs en orden pero el cable da errores intermitentes. ¿Qué sospechas?
3. LEDs 7 y 8 apagados en el extremo B. ¿Qué pasa?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Pelar, ordenar (T568B), cortar, insertar, crimpar y comprobar</strong> con el tester</li>
    <li><strong>Split pair</strong>: hay continuidad pero los pares no son cancelativos → repasa el orden pin a pin (1-2, 3-6, 4-5, 7-8)</li>
    <li>El <strong>par marrón no está conectado</strong>: solo 3 pares operativos → el enlace nunca superará 100 Mbps</li>
  </ul>
</div>

---
---

## Resumen del bloque 01
### Tres frases para quedarte

<div class="features-grid" style="margin-top:1rem;">
  <div class="feature-item">
    <span class="feature-icon">🧵</span>
    <strong>Medios y UTP</strong>
    <p style="font-size:0.9rem;">Cobre (100 m, barato), fibra (km, inmune) y aire (flexible). 8 hilos en 4 pares trenzados contra interferencias y diafonía.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🔌</span>
    <strong>Pinout y cables</strong>
    <p style="font-size:0.9rem;">T568A/B difieren solo en los pares 2-3. Directo = distinto tipo, cruzado = mismo tipo, consola = pines invertidos.</p>
  </div>
  <div class="feature-item">
    <span class="feature-icon">🛠️</span>
    <strong>Crimpado</strong>
    <p style="font-size:0.9rem;">6 pasos que terminan siempre en tester. Cuidado con el split pair y con la funda sin anclar.</p>
  </div>
</div>

---
layout: closing
---
