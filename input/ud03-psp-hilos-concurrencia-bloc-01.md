---
layout: cover
---

# Unidad 03 — Hilos y concurrencia<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧵</span><strong>De proceso a hilo</strong><br>Habitaciones de la misma casa</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚀</span><strong>Tu primer hilo</strong><br>Thread, start y join</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎒</span><strong>Con argumentos</strong><br>args, kwargs y nombres</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</span><strong>Daemon</strong><br>Fondo que muere con el programa</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⏰</span><strong>Timer</strong><br>Aviso diferido en un hilo</div>
</div>

<p style="margin-top:0.7rem;">Todo con <code>threading</code>: la librería estándar de Python para hilos.</p>

---
---

## De proceso a hilo
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>hilo</strong> es la unidad más pequeña de ejecución: una tarea que vive <em>dentro</em> de un proceso y <strong>comparte su memoria</strong> con los demás hilos de ese proceso.
  </div>
</div>

En la unidad pasada lanzaste **procesos**: programas completos con su propia memoria, su propio PID y su propio estado. Ahora bajamos un nivel: un solo proceso puede tener **varios hilos ejecutándose a la vez**, todos con la misma memoria.

Es como pasar de abrir varias casas (procesos) a repartir habitaciones dentro de una sola (hilos).

---
---

## Un proceso, varios hilos

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud03-psp-hilos-proceso.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame :deep(svg) { max-height: 350px; }
</style>

---
class: compact-slide
---

## Hilos vs Procesos
### La tabla que hay que saberse

| Característica | Proceso | Hilo |
| :--- | :--- | :--- |
| **Memoria** | Aislada (cada uno la suya) | Compartida (todos en la misma) |
| **Creación** | Lenta (el SO copia recursos) | Rápida |
| **Comunicación** | Pipes, sockets, archivos | Variables compartidas |
| **Aislamiento** | Alto (uno no afecta a otro) | Bajo (uno puede romper a todos) |
| **Coste** | Alto | Bajo |

<div class="warning" style="margin-top:0.6rem;">
  La memoria compartida es a la vez su gran ventaja (comunicación instantánea) y su gran riesgo: si un hilo corrompe una variable, <strong>afecta a todo el proceso</strong>. Ese peligro se llama <strong>condición de carrera</strong>.
</div>

---
---

## Crear y lanzar un hilo
### Las tres líneas mágicas

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">primer_hilo.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import threading
def saludar():
    print("¡Hola desde un hilo!")
hilo = threading.Thread(target=saludar)  # 1. crea el hilo
hilo.start()                             # 2. lo lanza
hilo.join()                              # 3. espera a que termine</code></pre>
</div>

<div class="terminal">
  <div><span class="prompt">$</span> python primer_hilo.py</div>
  <div class="output">¡Hola desde un hilo!</div>
</div>

---
---

## Hilos vs Procesos
### La analogía de los chefs

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">🏠</div>
      <div class="step-content"><strong>Procesos</strong> = cocinas de restaurantes diferentes: fogones e ingredientes propios. Si uno se quema, el de al lado ni se entera. Pero abrir un restaurante nuevo es caro y lento.</div>
    </div>
    <div class="step">
      <div class="step-number">👨‍🍳</div>
      <div class="step-content"><strong>Hilos</strong> = cocineros dentro de la <strong>misma</strong> cocina: comparten encimera, nevera e ingredientes (memoria). Contratar a uno más es barato y rápido.</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      Si un cocinero tira el aceite caliente, <strong>todos lo sufren</strong>: ese es el bajo aislamiento de los hilos. Ese reparto de la misma nevera hace la comunicación instantánea… y peligrosa si dos tocan el mismo ingrediente a la vez.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      En Python, además, los hilos están <strong>limitados por el GIL</strong> para código de cálculo: lo veremos en el bloque 02.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: qué es un hilo

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Dónde vive un hilo: dentro de un proceso o junto a él?
2. ¿Por qué un hilo es más barato de crear que un proceso?
3. ¿Cuál es el precio de compartir memoria entre hilos?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>Dentro</strong> de un proceso: varios hilos a la vez, todos con la misma memoria</li>
    <li>Porque <strong>no hay que copiar recursos</strong>: reutiliza la memoria del proceso que ya existe</li>
    <li>El <strong>aislamiento bajo</strong>: si un hilo corrompe una variable compartida, afecta a todos</li>
  </ul>
</div>

---
---

## Tu primer hilo
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Crear un hilo es escribir <code>threading.Thread(target=funcion)</code>, lanzarlo con <code>.start()</code> y esperarlo con <code>.join()</code>.
  </div>
</div>

Tres líneas. Eso es todo lo que necesitas para que una función se ejecute en paralelo con el resto del programa. La gracia (y la complicación) está en *cuándo* se ejecuta cada pieza.

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>threading.Thread(target=saludar)</code> → <strong>crea</strong> el hilo: existe, pero aún no hace nada (NUEVO)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>hilo.start()</code> → <strong>lo lanza</strong>: pasa a ejecutable y el SO decide cuándo ejecutar <code>saludar()</code></div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>hilo.join()</code> → <strong>espera</strong> a que el hilo termine antes de seguir</div>
</div>

---
---

## Tu primer hilo
### El error típico de principiante

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p>❌ <code>Thread(target=saludar())</code></p>
    <p>Con paréntesis la función <strong>se ejecuta ahora</strong>, en el hilo principal, y al hilo no le queda nada que hacer: no lanza nada en paralelo.</p>
  </div>
  <div class="comparison-item good">
    <p>✅ <code>Thread(target=saludar)</code></p>
    <p>Sin paréntesis pasas la <strong>referencia</strong> a la función: será el hilo quien la ejecute cuando arranque.</p>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Y recuerda: <code>start()</code> solo se puede llamar <strong>una vez</strong> por hilo. Una segunda llamada lanza <code>RuntimeError: threads can only be started once</code>. Para repetir el trabajo, crea otro <code>Thread</code>.
</div>

---
---

## El hilo principal vs los secundarios

<div class="two-cols">
  <div class="left">
    <p>Al ejecutar <code>python programa.py</code>, tu código corre en el <strong>hilo principal</strong> (main thread). Todo lo que lanzas con <code>Thread()</code> son <strong>hilos secundarios</strong> del mismo proceso.</p>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El principal crea el hilo secundario con <code>Thread(target=fn)</code></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>start()</code> lo pone en marcha: ambos avanzan <strong>a la vez</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      El hilo principal <strong>no espera</strong> a los secundarios por arte de magia: hay que decírselo con <code>join()</code>. Sin ella, el último <code>print</code> del principal puede salir antes que el de los secundarios.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Matiz importante: el intérprete <strong>sí espera</strong> a los hilos <strong>no-daemon</strong> antes de salir. Lo que pierdes sin <code>join()</code> es el <strong>orden</strong> de la salida, no la espera.
    </div>
  </div>
</div>

---
---

## join(): esperar a que termine

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">con_join.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import threading, time
def trabajador(segundos):
    print(f"Trabajando durante {segundos}s...")
    time.sleep(segundos)
    print("Terminado")
h = threading.Thread(target=trabajador, args=(3,))
h.start()
print("Esperando al hilo...")
h.join()  # bloquea el principal hasta que el hilo acaba
print("El hilo terminó, continuamos")</code></pre>
</div>

<div class="terminal">
  <div class="output">Trabajando durante 3s...</div>
  <div class="output">Esperando al hilo...</div>
  <div class="output">Terminado</div>
  <div class="output">El hilo terminó, continuamos</div>
</div>

---
---

## Propiedades de un hilo

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">propiedades.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>hilo = threading.Thread(target=fn, name="hilo-1")
hilo.start()
hilo.join()
print(hilo.name)      # "hilo-1"
print(hilo.ident)     # ID numérico del hilo
print(hilo.daemon)    # True/False
print(hilo.is_alive())</code></pre>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Propiedad</th><th>Qué devuelve</th></tr></thead>
      <tbody>
        <tr><td><strong>.name</strong></td><td>Nombre del hilo (por defecto "Thread-1")</td></tr>
        <tr><td><strong>.ident</strong></td><td>ID numérico único mientras vive</td></tr>
        <tr><td><strong>.daemon</strong></td><td>True si es hilo daemon</td></tr>
        <tr><td><strong>.is_alive()</strong></td><td>True si aún se está ejecutando</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.6rem;">
      Desde dentro: <code>threading.current_thread()</code> devuelve el objeto Thread del hilo que se está ejecutando.
    </div>
  </div>
</div>

---
---

## Hilos con argumentos
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Para que un hilo trabaje con datos propios le pasas argumentos en <code>args=</code> (tupla) o <code>kwargs=</code> (diccionario), y para distinguirlo le pones nombre con <code>.name</code>.
  </div>
</div>

Sin argumentos, todos los hilos harían exactamente lo mismo. Con <code>args</code> y <code>kwargs</code>, cada hilo hace su versión del trabajo. Y con <code>.name</code>, sabes en cada momento *quién* hace qué.

---
---

## Pasar argumentos: args y kwargs

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">args_kwargs.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def trabajar(nombre, tarea):
    print(f"{nombre}: {tarea}")
# tupla posicional
h1 = threading.Thread(
    target=trabajar,
    args=("Ana", "lavar platos"))
# diccionario con nombre
h2 = threading.Thread(
    target=trabajar,
    kwargs={"nombre": "Bob",
    "tarea": "fregar suelo"})</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">args</div>
      <div class="step-content"><strong>Tupla</strong> con los posicionales, en el orden que espera la función</div>
    </div>
    <div class="step">
      <div class="step-number">kwargs</div>
      <div class="step-content"><strong>Diccionario</strong> con los argumentos por nombre</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>Truco de la coma:</strong> una tupla de un elemento lleva coma final: <code>args=("Ana",)</code>. Sin ella, Python itera el string y pasa <code>'A', 'n', 'a'</code> como tres argumentos → <code>TypeError</code>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Nombrar hilos y lanzar varios a la vez

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">varios_hilos.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def tarea(n):
    nombre = threading.current_thread().name
    print(f"{nombre} → tarea {n}")
hilos = [
    threading.Thread(
        target=tarea, args=(i,),
        name="hilo-" + str(i))
    for i in range(1, 5)
]
for h in hilos: h.start()
for h in hilos: h.join()
print("Todas las tareas terminadas")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">📇</div>
      <div class="step-content"><code>name="hilo-" + str(i)</code> da un <strong>nombre único</strong> a cada hilo, legible desde dentro con <code>current_thread().name</code></div>
    </div>
    <div class="step">
      <div class="step-number">🚀</div>
      <div class="step-content">Primer bucle: <strong>lanza todos</strong>. Segundo bucle: <strong>espera todos</strong></div>
    </div>
    <div class="terminal" style="margin-top:0.6rem;">
      <div class="output">hilo-1 → tarea 1</div>
      <div class="output">hilo-3 → tarea 3</div>
      <div class="output">hilo-2 → tarea 2</div>
      <div class="output">hilo-4 → tarea 4</div>
      <div class="output">Todas las tareas terminadas</div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  El orden de los <code>print</code> lo decide el <strong>scheduler del SO</strong>: no hay garantía. El mensaje final, en cambio, <strong>siempre</strong> es el último: lo avalan los <code>join()</code>.
</div>

---
---

## Mini-chequeo: argumentos

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué le pasas a <code>args=</code>? ¿Y a <code>kwargs=</code>?
2. ¿Por qué hace falta la coma en <code>args=("Ana",)</code>?
3. ¿Cómo sabes, dentro de la función del hilo, qué hilo te está ejecutando?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>A <code>args=</code> una <strong>tupla</strong> de posicionales; a <code>kwargs=</code> un <strong>diccionario</strong> de argumentos con nombre</li>
    <li>Porque <code>("Ana")</code> es solo un string: con la coma, Python entiende que es una <strong>tupla de un elemento</strong></li>
    <li>Con <code>threading.current_thread().name</code>: el objeto Thread que te está ejecutando, y su nombre</li>
  </ul>
</div>

---
---

## Hilos daemon
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un hilo <strong>daemon</strong> se ejecuta en segundo plano y <strong>se mata automáticamente</strong> cuando el programa principal termina. Los no-daemon, en cambio, impiden que el programa salga hasta terminar.
  </div>
</div>

Imagina una alarma de incendios: la quieres encendida mientras el edificio está vivo, pero si el edificio desaparece, la alarma no tiene sentido y muere con él. Esa es la filosofía del daemon: tareas auxiliares de fondo (monitorizar, limpiar, un reloj, un heartbeat).

---
---

## Daemon en acción
### El mismo trabajador, con y sin daemon

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>SIN daemon — el programa espera</strong></p>
    <p><code>h1 = threading.Thread(target=trabajador)</code></p>
    <p><code>h1.start() · h1.join()</code></p>
    <p>El hilo completa sus 5 pasos y <strong>después</strong> termina el programa.</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>CON daemon — el hilo muere al salir</strong></p>
    <p><code>h2 = threading.Thread(target=trabajador, daemon=True)</code></p>
    <p><code>h2.start() · time.sleep(1.2)</code></p>
    <p>El daemon solo llegó al paso 3: el principal terminó y <strong>lo mató en seco</strong>.</p>
  </div>
</div>

<div class="info" style="margin-top:0.5rem;">
  Aquí no hay <code>join()</code> en la versión daemon: no queremos esperarlo, justo lo contrario. Para esperas limitadas existe <code>h.join(timeout=3)</code>: espera como mucho 3 segundos y sigue.
</div>

---
---

## Hilos daemon
### Cada uno tiene su sitio

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>✅ Hilo normal + join()</strong></p>
    <ul>
      <li>Tareas <strong>críticas</strong> que deben completarse sí o sí</li>
      <li>Escribir datos, cerrar una operación, un cálculo que no puede quedarse a medias</li>
    </ul>
  </div>
  <div class="comparison-item">
    <p><strong>😈 Hilo daemon</strong></p>
    <ul>
      <li>Servicios de fondo <strong>prescindibles</strong>: monitorización, limpieza, heartbeat, un reloj</li>
      <li>Da igual que se corten: el programa puede salir sin ellos</li>
    </ul>
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Un daemon cortado <strong>en seco</strong> puede dejar datos a medias: si un archivo debe quedar bien escrito, no lo escribas desde un daemon.
</div>

---
---

## Timer: avisos diferidos
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>threading.Timer(retardo, funcion)</code> ejecuta <code>funcion</code> <strong>una sola vez</strong> después de <code>retardo</code> segundos, sin bloquear el resto del programa.
  </div>
</div>

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">timer.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>def aviso():
    print("⏰ ¡Tiempo cumplido!")
t = threading.Timer(5.0, aviso)
t.start()
time.sleep(2)
t.cancel()  # cancela antes de disparar</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>No bloquea</strong>: el Timer es un hilo más</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Dispara la función <strong>una sola vez</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>t.cancel()</code> anula el disparo si aún no ha ocurrido</div>
    </div>
  </div>
</div>

---
---

## Usos típicos del Timer

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⏰</span><strong>Aviso</strong><br>"¡Despierta!" a los 3s</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📌</span><strong>Recordatorio</strong><br>Mensaje tras un rato</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛑</span><strong>Timeout</strong><br>Cortar lo que tarda</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔒</span><strong>Sesión</strong><br>Logout por inactividad</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧹</span><strong>Limpieza</strong><br>Borrar temporales</div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  El Timer <strong>hereda el daemon</strong> del hilo que lo crea: por defecto el intérprete <strong>espera al disparo</strong> antes de salir. Para no alargar el programa: <code>t.daemon = True</code> antes de <code>start()</code>.
</div>

---
---

## Mini-chequeo: daemons y Timer

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Un hilo daemon impide que el programa termine?
2. ¿Qué hace <code>join(timeout=2)</code> si el hilo tarda 5 segundos?
3. ¿Cuántas veces ejecuta el Timer la función?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>No</strong>: se mata al terminar el principal. Quien impide la salida es el hilo <strong>no daemon</strong></li>
    <li>Espera 2 segundos como máximo y <strong>continúa</strong>, aunque el hilo siga vivo (<code>is_alive()</code> lo confirmaría)</li>
    <li><strong>Una sola vez</strong>, tras el retardo. Para repetir, la función debe reprogramarse a sí misma</li>
  </ul>
</div>

---
---

## Resumen del bloque 01

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧵</span><strong>Hilo</strong><br>Vive en un proceso; memoria compartida, sin aislamiento</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚀</span><strong>Ciclo básico</strong><br>Thread · start() · join()</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎒</span><strong>args / kwargs</strong><br>Tupla y diccionario; .name</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">😈</span><strong>Daemon</strong><br>Fondo prescindible; crítico → join()</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⏰</span><strong>Timer</strong><br>Un disparo diferido</div>
</div>

<div class="success" style="margin-top:0.5rem;">
  Bloque 02: <strong>GIL</strong>, <strong>estados</strong> del hilo y taller de trazas.
</div>

---
layout: closing
---
