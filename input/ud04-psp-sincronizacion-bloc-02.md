---
layout: cover
---

# Unidad 04 — Sincronización<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>Semaphore</strong><br>Aforo: hasta N hilos a la vez</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚩</span><strong>Barrier</strong><br>Fases: nadie empieza hasta que llegan todos</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔔</span><strong>Condition</strong><br>Avisos: wait() y notify()</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📦</span><strong>Productor-Consumidor</strong><br>El patrón más usado del mundo real</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">💀</span><strong>Deadlock</strong><br>El abrazo mortal y cómo evitarlo</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🥊</span><strong>El ring final</strong><br>¿Qué mecanismo uso en cada caso?</div>
</div>

---
---

## Semaphore
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>Semaphore</strong> permite que hasta <strong>N hilos</strong> accedan al recurso a la vez: es como el <strong>aforo máximo</strong> de un local. Cuando se libera un puesto, entra el siguiente.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🔑</div>
  <div class="step-content">El Lock deja pasar a <strong>uno</strong> a la vez. El <code>Semaphore(2)</code> deja pasar a <strong>dos</strong>; <code>Semaphore(3)</code>, a tres... hasta el número que le pases al constructor.</div>
</div>

<div class="info">
  Un <strong>portero con contador</strong>: <code>acquire()</code> lo baja, <code>release()</code> lo sube. Mientras queden puestos, se entra.
</div>

---
class: compact-slide
---

## Semaphore(2) en acción

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">semaforo.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
semaforo = threading.Semaphore(2)  # máx. 2 dentro
def entrar(id):
    print(f"Hilo-{id} esperando...")
    with semaforo:
        print(f"  → Hilo-{id} DENTRO")
        time.sleep(2)
    print(f"  ← Hilo-{id} SALE")
hilos = [threading.Thread(target=entrar,
         args=(i,)) for i in range(5)]
for h in hilos: h.start()
for h in hilos: h.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">→ Hilo-0 DENTRO</div>
      <div class="output">→ Hilo-1 DENTRO</div>
      <div class="output">← Hilo-0 SALE</div>
      <div class="output">← Hilo-1 SALE</div>
      <div class="output">→ Hilo-2 DENTRO</div>
      <div class="output">→ Hilo-3 DENTRO</div>
      <div class="output">← Hilo-2 SALE</div>
      <div class="output">← Hilo-3 SALE</div>
      <div class="output">→ Hilo-4 DENTRO</div>
      <div class="output">← Hilo-4 SALE</div>
    </div>
    <p>Los 5 hilos esperan, pero dentro solo hay <strong>2 a la vez</strong>: salen de 2 en 2.</p>
  </div>
</div>

---
class: compact-slide
---

## El portero con contador

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-semaforo-aforo.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Semáforo con timeout

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">timeout.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
semaforo = threading.Semaphore(1)  # solo 1
def entrar(id):
    if semaforo.acquire(timeout=1):
        print(f"Hilo-{id} entró")
        time.sleep(2)
        semaforo.release()
    else:
        print(f"Hilo-{id} TIMEOUT: se va")
hilos = [threading.Thread(target=entrar,
         args=(i,)) for i in range(3)]
for h in hilos: h.start()
for h in hilos: h.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> python timeout.py</div>
      <div class="output">Hilo-0 entró</div>
      <div class="output">Hilo-1 TIMEOUT: se va</div>
      <div class="output">Hilo-2 TIMEOUT: se va</div>
    </div>
    <div class="step" style="margin-top:0.6rem;">
      <div class="step-number">⏱️</div>
      <div class="step-content"><code>acquire(timeout=N)</code> devuelve <strong>True</strong> si consiguió el recurso y <strong>False</strong> si pasaron los N segundos</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      A veces no quieres esperar eternamente: con el <strong>False</strong>, el hilo decide <strong>rendirse</strong> en lugar de bloquearse para siempre.
    </div>
  </div>
</div>

---
---

## ¿Para qué sirve un semáforo?

| Situación | ¿Por qué un semáforo? |
| :--- | :--- |
| Limitar conexiones a una base de datos | No saturar el servidor de BD |
| Descargas simultáneas | Máximo N descargas a la vez |
| Acceso a una API con rate limit | No superar las peticiones permitidas |
| Impresoras compartidas | Solo las N impresoras disponibles |
| Aforo de un recurso físico | Como el aforo máximo de un local |

<div class="info" style="margin-top:0.8rem;">
  💡 <strong>Diferencia con Lock:</strong> el Lock es <code>Semaphore(1)</code>. Para <strong>exclusión mutua</strong> usa Lock (más simple y rápido); para <strong>limitar acceso concurrente</strong> a N recursos, Semaphore.
</div>

---
---

## Mini-chequeo: Semaphore

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Cuántos hilos dejan entrar `Semaphore(3)` a la vez?
2. ¿Qué devuelve `acquire(timeout=2)` cuando el recurso se libera y cuando no?
3. ¿Cuándo elegirías Semaphore en lugar de Lock?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>3 hilos a la vez</strong>: cuando uno sale, el cuarto puede entrar</li>
    <li><strong>True</strong> si consiguió el recurso dentro de los 2 segundos; <strong>False</strong> si expiró esperando</li>
    <li>Para <strong>limitar acceso concurrente</strong> a N recursos (aforo): conexiones a BD, descargas, rate limit</li>
  </ul>
</div>

---

## Barrier
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>Barrier</strong> obliga a todos los hilos a esperar hasta que el último llegue. Entonces todos continúan <strong>a la vez</strong>: perfecta para sincronizar <strong>fases</strong> de un trabajo en paralelo.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">⚖️</div>
  <div class="step-content">Lock y Semaphore controlan <strong>cuántos</strong> pasan. La Barrier controla <strong>cuándo</strong>: nadie cruza la meta hasta que el grupo completo está listo.</div>
</div>

---
---

## La carrera de relevos

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">barrera.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
barrera = threading.Barrier(3)
def corredor(id):
    print(f"Corredor-{id} preparándose...")
    time.sleep(id * 0.5)  # cada uno tarda distinto
    print(f"  → Corredor-{id} en la salida")
    barrera.wait()  # espera a los demás
    print(f"  🏁 Corredor-{id} SALIÓ!")
hilos = [threading.Thread(target=corredor,
         args=(i,)) for i in range(3)]
for h in hilos: h.start()
for h in hilos: h.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">→ Corredor-0 en la salida</div>
      <div class="output">→ Corredor-1 en la salida</div>
      <div class="output">→ Corredor-2 en la salida</div>
      <div class="output">🏁 Corredor-0 SALIÓ!</div>
      <div class="output">🏁 Corredor-1 SALIÓ!</div>
      <div class="output">🏁 Corredor-2 SALIÓ!</div>
    </div>
    <p>Llegan en momentos distintos, pero <strong>los 3 cruzan a la vez</strong>: <code>barrera.wait()</code> devuelve solo cuando el último llega.</p>
    <div class="warning" style="margin-top:0.5rem;">
      Si un hilo no llega, los demás esperan para siempre: <strong>el número de hilos debe coincidir</strong> con el de la barrera.
    </div>
  </div>
</div>

---
class: compact-slide
---

## La barrera de salida

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-barrera-fases.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Sincronizar fases de un trabajo

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">fases.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
barrera = threading.Barrier(3)
def tarea(id):
    print(f"  📥 Descargando archivo-{id}...")
    time.sleep(1 + id)  # duraciones distintas
    barrera.wait()  # 🏁 espera a los 3
    print(f"  🧮 Procesando archivo-{id} (fase 2)")
hilos = [threading.Thread(target=tarea,
         args=(i,)) for i in range(3)]
for h in hilos: h.start()
for h in hilos: h.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div class="output">📥 Descargando archivo-0...</div>
      <div class="output">📥 Descargando archivo-1...</div>
      <div class="output">📥 Descargando archivo-2...</div>
      <div class="output">🧮 Procesando archivo-0 (fase 2)</div>
      <div class="output">🧮 Procesando archivo-1 (fase 2)</div>
      <div class="output">🧮 Procesando archivo-2 (fase 2)</div>
    </div>
    <div class="success" style="margin-top:0.5rem;">
      Ningún archivo se procesa hasta que <strong>los 3 están descargados</strong>: la barrera convierte el «cada uno a lo suyo» en «todos juntos en cada fase».
    </div>
  </div>
</div>

---
---

## Lock vs Semaphore vs Barrier

| Mecanismo | Pregunta que responde |
| :--- | :--- |
| **Lock** | ¿Quién toca el recurso? (solo uno) |
| **Semaphore** | ¿Cuántos a la vez? (hasta N) |
| **Barrier** | ¿Cuándo empieza la siguiente fase? (cuando todos llegan) |

<div class="info" style="margin-top:0.8rem;">
  Los tres se pueden <strong>combinar</strong>: una Barrier para coordinar fases, un Semaphore para limitar el acceso al recurso en cada fase y un Lock para las secciones críticas dentro de cada fase.
</div>

---
---

## Mini-chequeo: Barrier

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué hace exactamente `barrera.wait()`?
2. ¿Qué ocurre si solo llegan 2 de los 3 hilos esperados por `Barrier(3)`?
3. ¿Para qué tipo de problema es la herramienta ideal?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Bloquea al hilo hasta que <strong>todos</strong> han llegado a su <code>wait()</code>; entonces todos continúan a la vez</li>
    <li>Los 2 esperan <strong>para siempre</strong>: la barrera nunca se levanta sin el tercero</li>
    <li>Sincronizar <strong>fases</strong>: nadie empieza la fase N+1 hasta que todos terminan la fase N</li>
  </ul>
</div>

---

## Condition
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>Condition</strong> permite que un hilo se duerma esperando a que otro le <strong>notifique</strong> que algo ocurrió: <code>wait()</code> duerme y libera el lock, <code>notify()</code> despierta a un hilo dormido.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🔔</div>
  <div class="step-content">Lock, Semaphore y Barrier sincronizan <strong>acceso</strong>. La Condition sincroniza <strong>eventos</strong>: espera a que «hay un elemento en la cola» y otro hilo te lo avisa.</div>
</div>

<div class="info">
  Es la pieza que convierte «comprobar sin parar» (quemando CPU) en «<strong>dormir y que me despierten</strong>».
</div>

---
class: compact-slide
---

## Métodos de Condition

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Método</th><th>Idea general</th></tr></thead>
      <tbody>
        <tr><td><code>wait()</code></td><td>Libera el lock y espera una notificación</td></tr>
        <tr><td><code>notify()</code></td><td>Despierta a un hilo que está esperando</td></tr>
        <tr><td><code>notify_all()</code></td><td>Despierta a todos los hilos que esperan</td></tr>
      </tbody>
    </table>
    <div class="warning" style="margin-top:0.6rem;">
      ⚠️ <strong>Siempre dentro de <code>with condition:</code></strong>. Los tres métodos exigen tener el lock de la condición adquirido.
    </div>
  </div>
  <div class="right">
    <p>El Condition lleva asociado un <strong>lock interno</strong>: al entrar en <code>with condition:</code> se adquiere...</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>wait()</code> <strong>libera el lock</strong> mientras duerme, para que otro hilo pueda entrar y producir</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>notify()</code> despierta al durmiente, que <strong>recomprueba</strong> la condición al salir</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Sin esa liberación al dormir, el productor nunca podría entrar: <strong>deadlock</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Condition en acción: productor y consumidor

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">condition.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time, random
cola = []
condition = threading.Condition()
def productor():
    for i in range(5):
        with condition:
            cola.append(random.randint(1, 100))
            print(f"📦 Producido: {cola[-1]}")
            condition.notify()   # avisa al consumidor
def consumidor():
    for _ in range(5):
        with condition:
            while not cola:      # ⭐ while, no if
                condition.wait() # libera el lock
            print(f"  🍽️ Consumido: {cola.pop(0)}")
# h_prod.start() · h_cons.start() · join() de ambos</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <div><span class="prompt">$</span> python condition.py</div>
      <div class="output">📦 Producido: 73</div>
      <div class="output">🍽️ Consumido: 73</div>
      <div class="output">📦 Producido: 41</div>
      <div class="output">🍽️ Consumido: 41</div>
      <div class="output">...</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      El ritmo lo marcan los <code>sleep()</code>: a veces el consumidor se adelanta y <strong>espera</strong>; a veces el productor deja varios y el consumidor los come de golpe.
    </div>
  </div>
</div>

---
---

## La regla de oro: while, no if

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>✅ CORRECTO</strong></p>
    <p><code>while not cola:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;condition.wait()</code></p>
    <p>Tras despertar, <strong>recomprueba</strong> la condición; si sigue sin cumplirse, <strong>vuelve a dormir</strong>.</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>❌ INCORRECTO</strong></p>
    <p><code>if not cola:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;condition.wait()</code></p>
    <p>Despierta y <strong>asume</strong> que la condición se cumple... pero puede que ya no.</p>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  ¿Por qué? <strong>Falsas activaciones</strong> (spurious wakeups) o que otro hilo haya consumido el elemento mientras esperábamos. 💡 Esta regla separa al novato del profesional: <strong>siempre while después de wait()</strong>.
</div>

---
class: compact-slide
---

## Otro uso: esperar una señal

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">señal.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
condition = threading.Condition()
listo = False
def trabajador():
    global listo
    with condition:
        while not listo:
            condition.wait()  # espera la señal
    print("🛠️ Trabajador: ¡a la obra!")
def jefa():
    global listo
    time.sleep(1)
    with condition:
        listo = True
        condition.notify()  # ¡despierta!
    print("👩‍💼 Jefa: ¡podéis empezar!")
t = threading.Thread(target=trabajador); j = threading.Thread(target=jefa)
t.start(); j.start(); t.join(); j.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="success">
      Sin la condición, el trabajador tendría que comprobar <code>listo</code> <strong>en bucle</strong>, gastando CPU. Con <code>wait()</code>/<code>notify()</code>, duerme hasta que la jefa le avisa.
    </div>
    <table style="margin-top:0.7rem;">
      <thead><tr><th>Situación</th><th>¿Por qué Condition?</th></tr></thead>
      <tbody>
        <tr><td>Cola productor-consumidor</td><td>Esperar hasta que haya producto</td></tr>
        <tr><td>Recurso que se llena/vacía</td><td>Notificar cuando cambia el estado</td></tr>
        <tr><td>Turnos entre hilos</td><td><code>notify()</code> al que le toca</td></tr>
      </tbody>
    </table>
  </div>
</div>

---
---

## Mini-chequeo: Condition

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué hace `wait()` exactamente con el lock de la condición?
2. ¿Por qué hay que usar `while` en lugar de `if` después de `wait()`?
3. ¿Qué diferencia hay entre `notify()` y `notify_all()`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Libera el lock</strong> mientras espera (otros hilos pueden entrar) y se queda dormido hasta la notificación</li>
    <li>Por las <strong>falsas activaciones</strong> y porque otro hilo pudo consumir el recurso: con while se recomprueba y, si no se cumple, se vuelve a dormir</li>
    <li><code>notify()</code> despierta a <strong>uno</strong>; <code>notify_all()</code> a <strong>todos</strong>: evita consumidores dormidos para siempre</li>
  </ul>
</div>

---

## Productor-Consumidor
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El patrón <strong>productor-consumidor</strong> separa a quien <strong>crea</strong> datos (productor) de quien los <strong>procesa</strong> (consumidor): comparten una cola y una Condition para que el consumidor espere cuando la cola está vacía y el productor le avise cuando añade algo.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🌍</div>
  <div class="step-content">Es el patrón de sincronización <strong>más usado en el mundo real</strong>: un hilo llena una cola de tareas y otros hilos las procesan. La Condition es el <strong>pegamento</strong> que los coordina.</div>
</div>

---
---

## La cadena de producción

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-productor-consumidor.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## Paso a paso: el baile wait / notify

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El consumidor arranca, la cola está vacía → <code>with condition:</code> adquiere el lock → <code>while not cola:</code> es True → <code>wait()</code>: <strong>libera el lock y se duerme 💤</strong></div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El productor entra (lock libre) → <code>cola.append(73)</code> → <code>notify()</code> <strong>despierta al consumidor 😃</strong> → sale del with y libera</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El consumidor despierta → recomprueba <code>while not cola:</code> → False (¡hay un item!) → <code>cola.pop(0)</code> y procesa el 73</div>
</div>

<div class="warning" style="margin-top:0.7rem;">
  La magia de <code>wait()</code>: mientras el consumidor duerme, <strong>libera el lock</strong> para que el productor pueda entrar. Sin esa liberación, nadie produciría y el consumidor esperaría eternamente (<strong>deadlock</strong>).
</div>

---
class: compact-slide
---

## Con varios consumidores: notify_all()

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">varios_consumidores.py</div>
        <div class="code-card-badge">Python</div>
      </div>      <pre><code>def productor():
    for _ in range(6):  # 6 items: 2×3 consumos
        with condition:
            cola.append(random.randint(1, 10))
            print(f"📦 Producido: {cola[-1]}")
            condition.notify_all()  # ¡a TODOS!
        time.sleep(1)
# consumidor igual que antes:
# while not cola: condition.wait() → pop(0)
hilos = [threading.Thread(
    target=consumidor, args=(i,))
    for i in range(2)]
hilos.append(threading.Thread(target=productor))
for h in hilos: h.start()
for h in hilos: h.join()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Con <code>notify()</code>, si varios consumidores esperan solo se despierta a <strong>uno</strong>: los demás se quedan dormidos <strong>aunque haya trabajo</strong>. Con <code>notify_all()</code>, todos recomprueban y el que pueda, consume.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      💡 ¿Cola con tope de tamaño? El <strong>semáforo</strong> o la clase <code>queue.Queue(maxsize=N)</code> (thread-safe, sin locks a mano) te dan el control: los productores llaman a <code>put()</code> y los consumidores a <code>get()</code>.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: Productor-Consumidor

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué papel juega cada hilo en el patrón?
2. ¿Por qué `wait()` tiene que liberar el lock mientras el consumidor duerme?
3. ¿Por qué con varios consumidores conviene `notify_all()`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>El <strong>productor</strong> crea datos y los mete en la cola; el <strong>consumidor</strong> los saca y los procesa. Comparten cola y Condition</li>
    <li>Si durmiera <strong>con</strong> el lock puesto, el productor nunca entraría a producir: deadlock. Liberar el lock permite que el ciclo avance</li>
    <li><code>notify()</code> despierta a <strong>uno solo</strong>: los demás pueden quedarse dormidos con trabajo pendiente</li>
  </ul>
</div>

---

## Buenas prácticas
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Ya tienes Lock, RLock, Semaphore, Barrier y Condition. Este cierre es el enemigo más temido —el <strong>deadlock</strong>—, las reglas para evitarlo y el «ring» para decidir <strong>qué mecanismo usar en cada caso</strong>.
  </div>
</div>

<div class="warning" style="margin-top:1.2rem;">
  Un <strong>deadlock</strong> es la situación en la que dos o más hilos se esperan <strong>mutuamente para siempre</strong>: cada uno tiene un recurso y espera el que tiene el otro.
</div>

---
class: compact-slide
---

## El abrazo mortal

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-deadlock.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Deadlock en vivo

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">deadlock.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading, time
lock1 = threading.Lock()
lock2 = threading.Lock()
def hilo_a():
    with lock1:
        time.sleep(0.1)  # da tiempo a B
        with lock2:      # B tiene lock2 💀
            print("A: ¡trabajando!")
def hilo_b():
    with lock2:          # ❌ orden invertido
        time.sleep(0.1)
        with lock1:      # A tiene lock1 💀
            print("B: ¡trabajando!")
h1 = threading.Thread(target=hilo_a)
h2 = threading.Thread(target=hilo_b)
h1.start(); h2.start()
h1.join(); h2.join()  # ← nunca termina</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Los <code>sleep(0.1)</code> fuerzan el escenario: A coge <code>lock1</code>, B coge <code>lock2</code> y después <strong>cada uno intenta coger el del otro</strong>. El programa <strong>se queda colgado</strong> y ni A ni B imprimen su mensaje.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      ¿El arreglo? Que <code>hilo_b</code> adquiera <code>lock1</code> primero y <code>lock2</code> después: <strong>el mismo orden que A</strong>. Nadie puede tener lock2 sin haber pasado por lock1, y el abrazo mortal no ocurre.
    </div>
  </div>
</div>

---
---

## Cómo evitar deadlocks: las 3 reglas

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Adquirir los locks siempre en el mismo orden.</strong> Si todos piden primero Lock-1 y luego Lock-2, el abrazo mortal no puede darse</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Usar <code>with lock:</code></strong> (nunca olvidar <code>release()</code>). Un release olvidado deja el cerrojo puesto para siempre</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Usar RLock si el mismo hilo necesita adquirirlo varias veces</strong>: evita que un hilo se espere a sí mismo</div>
</div>

<div class="info" style="margin-top:0.7rem;">
  ¿Y si necesito sincronización <strong>entre procesos</strong> en vez de entre hilos? Usa <code>multiprocessing.Lock</code>, <code>multiprocessing.Semaphore</code>...: equivalentes, pero los procesos <strong>no comparten memoria</strong>.
</div>

---
---

## El ring de los mecanismos

| Mecanismo | Se define por... | Pregunta que responde |
| :--- | :--- | :--- |
| **Lock** | «Soy el portero: solo dejo pasar a <strong>uno</strong> cada vez» | ¿Quién toca el recurso? |
| **Semaphore(3)** | «Soy el guardia de una sala con <strong>3 sillas</strong>: cuando se libera una, entra el siguiente» | ¿Cuántos a la vez? |
| **Barrier(3)** | «Soy el juez de salida: <strong>nadie corre</strong> hasta que los 3 estén en la línea» | ¿Cuándo empieza la fase? |
| **Condition** | «Soy el <strong>aviso</strong>: duerme con wait() y te despierto con notify()» | ¿Qué esperas que ocurra? |

<div class="success" style="margin-top:0.7rem;">
  <strong>Moraleja del ring:</strong> cada mecanismo responde a una pregunta distinta — ¿quién? (Lock), ¿cuántos? (Semaphore), ¿cuándo? (Barrier), ¿qué aviso? (Condition).
</div>

---
class: compact-slide
---

## ✏️ Aprieta el lápiz

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Condición de carrera:</strong> 2 hilos incrementan un contador 1M veces cada uno. Compara con y sin Lock</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Semáforo descargas:</strong> 10 hilos simulan descargas (sleep 2s) con <code>Semaphore(3)</code>. Mide el tiempo total</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Barrera de fases:</strong> 4 hilos trabajan en 2 fases; la fase 2 no empieza hasta que todos terminan la fase 1</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Productor-Consumidor:</strong> 1 productor crea números cada 0.5s; 2 consumidores los procesan con Condition</div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>Deadlock provocado:</strong> provócalo con 2 hilos y 2 locks... y luego arréglalo con el mismo orden</div>
</div>

---
---

## ¿Quién soy? (repaso)

<div class="question-card">
  <span class="question-icon">🕵️</span>
  Adivina el mecanismo:
</div>

1. Dejo pasar a <strong>un solo</strong> hilo a la sección crítica.
2. El mismo hilo puede adquirirme varias veces sin bloquearse.
3. Guardo una sala con <strong>3 sillas</strong>: cuando se libera una, entra el siguiente.
4. No dejo correr a nadie hasta que los 3 corredores están en la línea.
5. Duermo con `wait()` hasta que otro me despierta con `notify()`.
6. Soy el bug de dos hilos que se pisan la misma variable.

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <span style="font-size:0.95rem;">1 → <strong>Lock</strong> · 2 → <strong>RLock</strong> · 3 → <strong>Semaphore(3)</strong> · 4 → <strong>Barrier(3)</strong> · 5 → <strong>Condition</strong> · 6 → <strong>condición de carrera</strong></span>
</div>

---
---

## Resumen del bloque 02

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>Semaphore(N)</strong><br>Aforo: contador interno; timeout opcional</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚩</span><strong>Barrier(N)</strong><br>Fases: nadie cruza hasta que llegan todos</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔔</span><strong>Condition</strong><br>wait() / notify(); siempre <code>while</code>, no <code>if</code></div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📦</span><strong>Productor-Consumidor</strong><br>Cola compartida + notify_all() con varios</div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">💀</span><strong>Deadlock</strong><br>Mismo orden de locks + <code>with lock:</code></div>
  <div class="feature-item" style="padding:0.8rem 0.6rem;font-size:0.92rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🥊</span><strong>El ring</strong><br>¿quién? · ¿cuántos? · ¿cuándo? · ¿qué aviso?</div>
</div>

<div class="success" style="margin-top:0.7rem;">
  Con esto ya sabes <strong>turnarte, limitar, coordinar y avisar</strong>: la caja de herramientas completa de la concurrencia con <code>threading</code>.
</div>

---
layout: closing
---
