---
layout: cover
---

# Unidad 04 — Sincronización<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.9rem;">
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🏎️</span><strong>Condición de carrera</strong><br>Dos hilos que se pisan la misma variable</div>
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🔒</span><strong>Lock</strong><br>Exclusión mutua: uno a la vez</div>
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🔁</span><strong>RLock</strong><br>El cerrojo reentrante</div>
</div>

<p style="margin-top:0.8rem;">Los hilos de la unidad pasada <strong>comparten memoria</strong>. Hoy aprendemos a turnarnos para no pisarnos.</p>

---
---

## Condición de carrera
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>condición de carrera</strong> ocurre cuando dos o más hilos acceden a la misma variable compartida a la vez y el resultado depende de qué hilo llegue primero: los incrementos se pierden y el resultado es incorrecto.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">⚠️</div>
  <div class="step-content">Es <strong>el bug más clásico</strong> de la programación concurrente: el programa <em>funciona casi siempre</em> y falla de forma intermitente, imposible de reproducir.</div>
</div>

<div class="warning">
  Por eso la sincronización se diseña <strong>desde el principio</strong>, no al final.
</div>

---
class: compact-slide
---

## El experimento: 4 hilos, un contador

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">carrera.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import threading, sys
contador = 0
sys.setswitchinterval(1e-6)  # ⚠️ cortes de hilo muy frecuentes
def sumar(c):
    return c + 1
def incrementar():
    global contador
    for _ in range(200_000):
        contador = sumar(contador)  # leer-sumar-escribir vía función
hilos = [threading.Thread(target=incrementar) for _ in range(4)]
for h in hilos: h.start()
for h in hilos: h.join()
print(f"Esperado: 800.000 | Obtenido: {contador}")</code></pre>
</div>

<div class="terminal">
  <div><span class="prompt">$</span> python carrera.py</div>
  <div class="output">Esperado: 800.000 | Obtenido: 346.564</div>
  <div class="output">Esperado: 800.000 | Obtenido: 375.671   ← ¡nunca 800.000!</div>
</div>

---
class: compact-slide
---

## ¿Por qué falla? El += no es atómico

<div class="two-cols">
  <div class="left">
    <p><code>contador += 1</code> parece una línea, pero por dentro hace <strong>3 operaciones</strong>:</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Leer</strong> <code>contador</code> de memoria</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Sumar</strong> 1</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Escribir</strong> el resultado</div>
    </div>
    <p>Si dos hilos leen el mismo valor antes de que ninguno escriba, <strong>ambos escriben lo mismo</strong> y se pierde un incremento.</p>
  </div>
  <div class="right">
    <div class="warning">
      En Python, el <strong>GIL</strong> evita que dos hilos ejecuten Python puro a la vez, pero <strong>no</strong> protege esta secuencia: el planificador puede interrumpir a un hilo entre el <em>leer</em> y el <em>escribir</em>.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      <code>sys.setswitchinterval(1e-6)</code> fuerza cortes muy frecuentes para <strong>hacer visible</strong> la carrera. La condición de carrera es real: solo hay que saber exponerla.
    </div>
  </div>
</div>

---
---

## La traza del desastre

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-condicion-carrera.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## La analogía: dos cajeros y una caja

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El cajero A mira la caja: hay <strong>100 €</strong> (leer)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Mientras A busca cambio, B también mira: <strong>100 €</strong> (leer)</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">A mete 50 €: escribe <strong>150 €</strong></div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">B mete 50 €: también escribe <strong>150 €</strong>... ¡pisando el ingreso de A!</div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Se cobraron <strong>200 €</strong>, pero en la caja solo hay <strong>150 €</strong>: los 50 € de A <strong>desaparecieron</strong>. Exactamente lo mismo le pasa a <code>contador</code>.
    </div>
    <div class="success" style="margin-top:0.6rem;">
      El remedio es la <strong>exclusión mutua</strong>: mientras un cajero toca la caja, el otro espera fuera. Ese es el <strong>Lock</strong>, el siguiente punto.
    </div>
  </div>
</div>

---
---

## Dónde aparece la condición de carrera

| Situación | Qué se pierde |
| :--- | :--- |
| Contador compartido (`contador += 1`) | Incrementos |
| Saldo de una cuenta bancaria | Ingresos / retiros |
| Cola de trabajos compartida | Elementos de la cola |
| Registro (log) con fecha y hora | Líneas de log |
| Caché con varios lectores/escritores | Datos actualizados |

<div class="warning" style="margin-top:0.8rem;">
  El programa <strong>funciona casi siempre</strong> y falla de forma intermitente e imposible de reproducir. Los tests no lo cazan: hay que <strong>prevenirla por diseño</strong>.
</div>

---
class: compact-slide
---

## Mini-chequeo: condición de carrera

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué es una condición de carrera?
2. ¿Qué tres operaciones esconde un `contador += 1`?
3. ¿Cómo lo explicarías con la analogía de los dos cajeros?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Dos hilos tocan la misma variable a la vez y el resultado depende de quién llega primero</li>
    <li><strong>Leer → sumar → escribir</strong>: si dos leen lo mismo, un incremento se pierde</li>
    <li>Dos cajeros leen 100 €, los dos escriben 150 € y el segundo ingreso desaparece</li>
  </ul>
</div>

---
---

## Lock
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>Lock</strong> (cerrojo) garantiza que solo un hilo entre en la <strong>sección crítica</strong> a la vez: el resto espera fuera hasta que el primero lo libera.
  </div>
</div>

<div class="step" style="margin-top:1.4rem;">
  <div class="step-number">🎯</div>
  <div class="step-content">En el contador compartido, la sección crítica es <code>contador += 1</code>. Protegida con un Lock, los 4 hilos se <strong>turnan</strong> y el resultado vuelve a ser el esperado.</div>
</div>

<div class="success">
  Con Lock, el contador pasa de resultados aleatorios a un <strong>400.000 exacto</strong> en cualquier ejecución.
</div>

---
class: compact-slide
---

## Lock: métodos y código

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">con_lock.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import threading
contador = 0
lock = threading.Lock()
def incrementar():
    global contador
    for _ in range(100_000):
        with lock:  # 🤝 solo un hilo aquí dentro
            contador += 1
hilos = [threading.Thread(target=incrementar)
         for _ in range(4)]
for h in hilos: h.start()
for h in hilos: h.join()
print(f"Con Lock: {contador}")  # ✅ 400.000</code></pre>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Método</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><code>lock.acquire()</code></td><td>Bloquea. Si otro hilo lo tiene, espera</td></tr>
        <tr><td><code>lock.release()</code></td><td>Libera. Otro hilo puede entrar</td></tr>
        <tr><td><code>lock.locked()</code></td><td>True si está bloqueado</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.6rem;">
      El lock se adquiere <strong>antes</strong> de tocar el contador y se libera al salir del bloque <code>with</code>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El cerrojo en acción

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-lock-seccion-critica.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
---

## Be the code: sin Lock vs con Lock

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p><strong>❌ Sin Lock — el caos</strong></p>
    <p><code>Hilo-A: lee contador = 0</code><br><code>Hilo-B: lee contador = 0</code> ← ¡mismo valor!</p>
    <p><code>Hilo-A: escribe contador = 1</code><br><code>Hilo-B: escribe contador = 1</code> ← ¡pisó el incremento!</p>
  </div>
  <div class="comparison-item good">
    <p><strong>✅ Con Lock — el orden</strong></p>
    <p><code>Hilo-A: acquire() → lee 0 → escribe 1 → release()</code></p>
    <p><code>Hilo-B: acquire() → lee 1 → escribe 2 → release()</code> ← esperó su turno</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Con el Lock, el <em>leer → sumar → escribir</em> de cada hilo ocurre <strong>de principio a fin sin que nadie se cuele</strong>. Los cajeros ya no se pisan.
</div>

---
---

## Siempre with lock:

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>✅ La forma segura</strong></p>
    <p><code>with lock:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;contador += 1</code></p>
    <p>El <code>release()</code> es automático, <strong>incluso si hay una excepción</strong>.</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>⚠️ La forma peligrosa</strong></p>
    <p><code>lock.acquire()</code><br><code>contador += 1</code><br><code># lock.release()</code> ← ¡si lo olvidas…!</p>
    <p>El hilo se queda el cerrojo puesto <strong>para siempre</strong>: <strong>deadlock</strong>.</p>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  💡 <strong>Regla de oro:</strong> el Lock protege la <strong>sección crítica</strong>, no el hilo. Todo el código que toque la variable compartida debe ir dentro del <strong>mismo lock</strong>.
</div>

---
---

## Mini-chequeo: Lock

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué garantiza un Lock exactamente?
2. ¿Qué pasa si dos hilos llaman a `acquire()` a la vez?
3. ¿Por qué `with lock:` es mejor que `acquire()`/`release()` manuales?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Que solo <strong>un hilo</strong> entre en la sección crítica a la vez: exclusión mutua</li>
    <li>El primero entra; el segundo se <strong>bloquea</strong> hasta que el primero hace <code>release()</code></li>
    <li>El <code>with</code> libera el lock solo al salir, <strong>aunque haya excepción</strong>; a mano es fácil olvidarlo y provocar un deadlock</li>
  </ul>
</div>

---
---

## RLock
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un Lock normal <strong>no es reentrante</strong>: si el mismo hilo intenta adquirirlo dos veces, se espera a sí mismo y se produce un <strong>deadlock</strong>. Un <strong>RLock</strong> (Reentrant Lock) sí permite que el mismo hilo lo adquiera varias veces.
  </div>
</div>

<div class="warning" style="margin-top:1.2rem;">
  El Lock no distingue entre <em>«otro hilo»</em> y <em>«yo mismo»</em>: la segunda <code>acquire()</code> espera a que se libere... un lock que <strong>él mismo tiene puesto</strong>.
</div>

---
class: compact-slide
---

## El problema: Lock normal vs RLock

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">reentrante.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import threading
# ❌ Lock normal -- DEADLOCK si el mismo hilo re-entra
lock = threading.Lock()
lock.acquire()
# lock.acquire()  # ⚠️ el hilo se espera a sí mismo → 💀
# ✅ RLock -- el mismo hilo puede adquirirlo varias veces
rlock = threading.RLock()
rlock.acquire()   # ok
rlock.acquire()   # ok (mismo hilo)
rlock.release()
rlock.release()   # liberado de verdad: el contador llega a 0</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  El RLock lleva un <strong>contador interno</strong>: cada <code>acquire()</code> lo sube y cada <code>release()</code> lo baja. El lock solo se libera de verdad <strong>cuando el contador llega a 0</strong>.
</div>

---
class: compact-slide
---

## El caso típico: funciones que se llaman entre sí

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud04-psp-rlock-reentrante.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Lock vs RLock

| Aspecto | Lock | RLock |
| :--- | :--- | :--- |
| ¿Otro hilo puede adquirirlo? | Sí, cuando se libera | Sí, cuando se libera |
| ¿El mismo hilo, dos veces? | ❌ Deadlock | ✅ Sí (contador interno) |
| ¿Cuándo se libera de verdad? | En el primer `release()` | Cuando los `release()` igualan a los `acquire()` |
| Uso típico | Sección crítica simple | Funciones que se llaman entre sí / recursión |
| Coste | Mínimo | Mínimo (algo más de contabilidad) |

<div class="warning" style="margin-top:0.7rem;">
  <strong>Regla:</strong> usa <strong>Lock por defecto</strong>. Cambia a RLock solo cuando de verdad el mismo hilo necesite re-entrar. Un RLock <strong>no</strong> evita que dos hilos distintos se pisen: para eso valen las mismas reglas del Lock.
</div>

---
---

## Mini-chequeo: RLock

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué le pasa a un Lock normal si el mismo hilo lo adquiere dos veces?
2. ¿Cómo evita el RLock ese problema?
3. ¿Cuándo cambiarías de Lock a RLock?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Deadlock</strong>: se espera a sí mismo, porque la 2ª <code>acquire()</code> espera un lock que él tiene puesto</li>
    <li>Con un <strong>contador interno</strong>: sube con cada <code>acquire()</code>, baja con cada <code>release()</code>; libera al llegar a 0</li>
    <li>Cuando una función con el lock llama a <strong>otra función que también lo quiere</strong> (o recursión)</li>
  </ul>
</div>

---
---

## Resumen del bloque 01

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.9rem;">
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🏎️</span><strong>Condición de carrera</strong><br>+= 1 son 3 pasos; el planificador corta entre ellos</div>
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🔒</span><strong>Lock</strong><br>Exclusión mutua; siempre <code>with lock:</code></div>
  <div class="feature-item" style="padding:0.9rem 0.7rem;font-size:0.95rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.15rem;">🔁</span><strong>RLock</strong><br>Reentrante por contador interno; para funciones encadenadas</div>
</div>

<div class="success" style="margin-top:0.8rem;">
  Bloque 02: ampliar el turno con <strong>Semaphore</strong>, coordinar <strong>fases</strong> con Barrier, avisar entre hilos con <strong>Condition</strong> y el patrón <strong>productor-consumidor</strong>.
</div>

---
layout: closing
---
