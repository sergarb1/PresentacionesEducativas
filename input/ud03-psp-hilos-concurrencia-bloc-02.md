---
layout: cover
---

# Unidad 03 — Hilos y concurrencia<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔒</span><strong>El GIL</strong><br>El candado de CPython</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⚡</span><strong>CPU vs I/O</strong><br>Cuándo aceleran de verdad</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔄</span><strong>Estados</strong><br>El ciclo de vida completo</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🕵️</span><strong>Práctica</strong><br>Trazas y el ring</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎓</span><strong>Cierre</strong><br>Errores y entrevista</div>
</div>

---
---

## El GIL
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>GIL</strong> = Global Interpreter Lock: un candado interno de CPython que evita que dos hilos ejecuten bytecode Python a la vez. Los hilos <strong>no</strong> aceleran el código de CPU… pero <strong>sí</strong> el de espera.
  </div>
</div>

¿Por qué existe? Para proteger la memoria interna del intérprete: sin el candado, dos hilos podrían corromper las estructuras de Python al tocarlas a la vez. Python paga la seguridad con un límite: **no hay paralelismo real de CPU** entre hilos del mismo proceso.

---
---

## El GIL en un dibujo

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud03-psp-gil.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame :deep(svg) { max-height: 380px; }
</style>

---
class: compact-slide
---

## CPU-bound: los hilos NO sirven de nada

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">cpu_bound.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def contar():
    total = 0
    for i in range(50_000_000):
        total += i
inicio = time.time()
hilos = [threading.Thread(target=contar)
         for _ in range(4)]
for h in hilos: h.start()
for h in hilos: h.join()
print(f"{time.time() - inicio:.2f}s")</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Una tarea <strong>CPU-bound</strong> usa la CPU a tope: sumar millones de números, procesar imágenes, comprimir. El GIL no deja ejecutar a más de un hilo, así que:</p>
    <div class="warning">
      4 hilos tardan <strong>lo mismo que 1</strong> (a veces ligeramente más, por el coste de turnarse el candado).
    </div>
  </div>
</div>

---
class: compact-slide
---

## I/O-bound: los hilos SÍ aceleran

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">io_bound.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def esperar():
    time.sleep(2)  # simula descarga
inicio = time.time()
hilos = [threading.Thread(target=esperar)
         for _ in range(4)]
for h in hilos: h.start()
for h in hilos: h.join()
print(f"{time.time() - inicio:.2f}s")
# → ~2 segundos, no 8</code></pre>
    </div>
  </div>
  <div class="right">
    <p>Una tarea <strong>I/O-bound</strong> espera por algo externo: red, disco, una API. Al esperar, el hilo <strong>libera el GIL</strong> y los demás pueden trabajar.</p>
    <div class="success">
      Cuatro hilos que esperan 2 segundos <strong>cada uno</strong> terminan en <strong>~2 segundos</strong>: todos esperan <em>a la vez</em>.
    </div>
  </div>
</div>

---
---

## La tabla que hay que saberse

| Tipo de tarea | ¿Hilos ayudan? | Motivo |
| :--- | :--- | :--- |
| **CPU-bound** (calcular, procesar) | ❌ No | El GIL solo deja ejecutar a uno |
| **I/O-bound** (esperar red, disco) | ✅ Sí | El GIL se libera durante la espera |

<div class="info" style="margin-top:0.6rem;">
  ¿Cómo distingo cada tipo? Si el programa gasta el tiempo <strong>calculando</strong> (contar, cifrar, procesar), es CPU-bound. Si lo gasta <strong>esperando</strong> (descargar, consultar una API, leer archivos), es I/O-bound. Los hilos brillan en el segundo caso.
</div>

---
---

## Cuándo sirven de verdad los hilos

<div class="features-grid">
  <div class="feature-item"><span class="feature-icon">🌐</span><strong>Red</strong><br>10 descargas con 10 hilos ≈ 10× más rápido</div>
  <div class="feature-item"><span class="feature-icon">💾</span><strong>Disco</strong><br>Lecturas y escrituras en paralelo</div>
  <div class="feature-item"><span class="feature-icon">🖥️</span><strong>Servidores</strong><br>Cada cliente espera; otros avanzan (UD 6)</div>
  <div class="feature-item"><span class="feature-icon">🧮</span><strong>Cálculo puro</strong><br>Hilos no: para eso multiprocessing</div>
</div>

<div class="info" style="margin-top:0.8rem;">
  Para CPU-bound en Python: <code>multiprocessing</code> lanza varios procesos, cada uno con su <strong>propio GIL</strong>: paralelismo real de CPU, al coste de crear procesos (UD 02).
</div>

---
---

## Mini-chequeo: el GIL

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué significa exactamente que "CPython solo ejecuta un hilo a la vez"?
2. Descargar 5 archivos de 2 segundos cada uno: ¿1 hilo o 5? ¿Cuánto tarda cada opción?
3. Sumar 50 millones de números con 4 hilos: ¿más rápido, igual o más lento que con 1?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Que los hilos se <strong>turnan</strong> el bytecode en fragmentos pequeños: parecen simultáneos, pero nunca ejecutan Python a la vez</li>
    <li><strong>5 hilos</strong>: ~2 segundos (los 5 esperan a la vez). Con 1 hilo: 5 × 2 = <strong>10 segundos</strong></li>
    <li><strong>Igual</strong> (a veces peor): el GIL impide calcular en paralelo; para eso, multiprocessing</li>
  </ul>
</div>

---
---

## Estados del hilo
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un hilo nace como objeto, se lanza con <code>start()</code>, espera su turno, se ejecuta, se bloquea cuando espera algo y termina cuando su función acaba: ese es su <strong>ciclo de vida</strong>.
  </div>
</div>

Saber en qué estado está un hilo (o cuándo lo estará) es la clave para entender por qué un programa multihilo se comporta como se comporta.

---
---

## El ciclo de vida en un dibujo

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud03-psp-estados-hilo.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame :deep(svg) { max-height: 420px; }
</style>

---
class: compact-slide
---

## Los estados, uno a uno

| Estado | Significado |
| :--- | :--- |
| **NUEVO** | El objeto Thread existe pero no se ha llamado a `start()` |
| **EJECUTABLE** | `start()` llamado: puede ejecutar en cualquier momento |
| **EJECUCIÓN** | El scheduler le ha dado la CPU: ejecuta ahora mismo |
| **BLOQUEADO** | Esperando (sleep, I/O, un lock) |
| **TERMINADO** | Su función ha acabado; no volverá a ejecutarse |

<div class="info" style="margin-top:0.5rem;">
  De <strong>BLOQUEADO</strong> siempre se vuelve a <strong>EJECUTABLE</strong> (nunca directo a EJECUCIÓN): al despertar, toca esperar de nuevo su turno.
</div>

---
---

## El estado BLOQUEADO, el más importante

<div class="two-cols">
  <div class="left">
    <p>En la práctica, el estado que más se ve es <strong>BLOQUEADO</strong>, casi siempre por:</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>time.sleep(n)</code> — pide "no me des CPU durante n segundos"</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Espera de <strong>I/O</strong> — descarga, lectura de archivo, un socket</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      Mientras un hilo está BLOQUEADO <strong>libera la CPU (y el GIL)</strong>: otro hilo puede ejecutar. Es exactamente el mecanismo que hace rápidas las tareas I/O-bound.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Curiosidad: <code>sleep(0)</code> cede la CPU <strong>voluntariamente</strong> sin esperar nada: buena práctica en hilos cooperativos.
    </div>
  </div>
</div>

---
class: compact-slide
---

## ¿Cuándo termina un hilo? is_alive()

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">is_alive.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def corto():
    time.sleep(1)
h = threading.Thread(target=corto)
print(h.is_alive())  # False (NUEVO)
h.start()
print(h.is_alive())  # True
h.join()
print(h.is_alive())  # False (TERMINADO)</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Un hilo llega a <strong>TERMINADO</strong> cuando su función acaba (o lanza una excepción no capturada)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Un <strong>no daemon</strong> terminado es requisito para que el programa pueda salir</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Un <strong>daemon</strong> puede ser cortado en seco por el final del programa, sin llegar "bien" a TERMINADO</div>
    </div>
  </div>
</div>

---
---

## Mini-chequeo: estados

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿En qué estado está un hilo recién creado, antes de `start()`?
2. ¿Qué ocurre cuando un hilo en EJECUCIÓN llama a `time.sleep(2)`?
3. ¿Puede un hilo pasar de BLOQUEADO a EJECUCIÓN sin pasar por EJECUTABLE?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>NUEVO</strong>: el objeto existe, pero sin start() no ha ejecutado nada</li>
    <li>Pasa a <strong>BLOQUEADO</strong> 2 segundos: libera CPU y GIL; al despertar vuelve a EJECUTABLE</li>
    <li><strong>No</strong>: siempre vuelve por EJECUTABLE y espera su turno del scheduler</li>
  </ul>
</div>

---
---

## Be the code, my friend
### El hilo viajero

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">viajeros.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def viajero(nombre, paradas):
    for i in range(paradas):
        print(f"{nombre} parada {i+1}")
        time.sleep(0.5)
    print(f"{nombre} 🏁 destino")
h1 = Thread(target=viajero, args=("Ana", 3))
h2 = Thread(target=viajero, args=("Bob", 2))
h1.start(); h2.start()
h1.join(); h2.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">Ana parada 1 · Bob parada 1</div>
      <div class="output">Bob parada 2 · Ana parada 2</div>
      <div class="output">Bob 🏁 llegó a su destino</div>
      <div class="output">Ana parada 3</div>
      <div class="output">Ana 🏁 llegó a su destino</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      Ambos arrancan a la vez; mientras uno duerme (BLOQUEADO), el otro avanza. <strong>Bob llega antes</strong>: solo tiene 2 paradas. Y el orden exacto lo decide el scheduler: <strong>no hay garantías</strong>.
    </div>
  </div>
</div>

---
---

## El ring: hilo vs proceso
### ¿Quién gana en cada asalto?

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>🧵 Hilo</strong></p>
    <ul>
      <li>Ligero y barato: nace en milisegundos</li>
      <li>Comunica al instante con variables compartidas</li>
      <li>Brilla <strong>esperando</strong>: red, disco, clientes</li>
    </ul>
  </div>
  <div class="comparison-item">
    <p><strong>📦 Proceso</strong></p>
    <ul>
      <li>Memoria aislada: un error no contagia a nadie</li>
      <li>Comunicación lenta: pipes, sockets, archivos</li>
      <li>Paralelismo <strong>real de CPU</strong>: cada uno con su GIL</li>
    </ul>
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  <strong>Moraleja:</strong> procesos para aislamiento y CPU de verdad (multiprocessing); hilos para esperas, servicios de fondo y todo lo ligero que comparte memoria.
</div>


---
---

## Entrevista de trabajo
### Las preguntas que te harán

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">1️⃣</span><strong>¿Qué es un hilo y en qué se diferencia de un proceso?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">2️⃣</span><strong>¿Cómo creas y lanzas varios hilos con argumentos y nombres?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">3️⃣</span><strong>¿Qué es un daemon? ¿Cuándo lo usarías?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">4️⃣</span><strong>¿Qué es el GIL y cómo afecta al rendimiento?</strong></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">5️⃣</span><strong>¿Cómo esperas a varios hilos a la vez?</strong></div>
</div>

<div class="success" style="margin-top:0.5rem;">
  Las <strong>reinas</strong> son la 1 y la 4. Para la 1: memoria, coste, comunicación y aislamiento (la tabla del bloque 01) y remata con la moraleja del ring. Para la 4: qué es el GIL, por qué no acelera CPU-bound, por qué sí I/O-bound, y cuándo toca multiprocessing.
</div>

---
---

## No hay preguntas tontas

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🤔</span><strong>¿Un hilo puede crear otro hilo?</strong><br>Sí, sin problema.</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🔢</span><strong>¿Cuántos puedo crear?</strong><br>Miles como máximo (~1 MB de pila cada uno).</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🔫</span><strong>¿Puedo matar un hilo desde fuera?</strong><br>No limpiamente: variable bandera que el hilo consulta.</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">😴</span><strong>¿sleep(0) sirve de algo?</strong><br>Sí: cede la CPU voluntariamente.</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🚦</span><strong>¿Los hilos tienen prioridad?</strong><br>En Python, no: decide el scheduler del SO.</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;text-align:left;"><span class="feature-icon" style="font-size:1.3rem;margin-bottom:0.1rem;">🚪</span><strong>¿Qué pasa si no llamo a join()?</strong><br>El hilo corre igual; pierdes orden y sincronización.</div>
</div>

---
---

## Resumen de la unidad

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧵</span><strong>Hilos</strong><br>Memoria compartida, baratos, sin aislamiento</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚀</span><strong>Ciclo básico</strong><br>Thread · start() · join()</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈⏰</span><strong>Daemon y Timer</strong><br>Fondo prescindible; aviso diferido</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔒</span><strong>GIL</strong><br>CPU no acelera; I/O sí</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔄</span><strong>Estados</strong><br>NUEVO → EJECUTABLE → EJECUCIÓN ⇄ BLOQUEADO → TERMINADO</div>
</div>


---
layout: closing
---
