---
layout: cover
---

# Unidad 02 — Gestión de procesos<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Comunicación con procesos
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un proceso hijo puede <strong>leer de su stdin</strong> y <strong>escribir en su stdout</strong>; con <code>communicate()</code> le pasas datos por un tubo y lees su respuesta por el otro.
  </div>
</div>

Los procesos no comparten memoria, pero el sistema operativo les presta **pipes** (tuberías): el stdin, stdout y stderr de cada proceso pueden conectarse a Python. Así un proceso "pregunta" y el otro "responde".

---
---

## Conectar los tubos
### stdin=PIPE, stdout=PIPE

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">tubos.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
proceso = subprocess.Popen(
    ["python", "-c", "print(input().upper())"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    text=True
)</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>stdin=PIPE</code>: Python podrá <strong>escribir</strong> en el stdin del hijo</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>stdout=PIPE</code>: Python podrá <strong>leer</strong> el stdout del hijo</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>text=True</code>: los datos viajan como <strong>texto</strong>, no bytes</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      El hijo ejecuta <code>print(input().upper())</code>: lee una línea, la pasa a mayúsculas y la escribe en su stdout.
    </div>
  </div>
</div>

---
---

## Enviar y recibir con communicate()

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">comunica.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
proceso = subprocess.Popen(
    ["python", "-c", "print(input().upper())"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    text=True)
salida, error = proceso.communicate(
    input="hola mundo")
print(f"Respondió: {salida.strip()}")
# → "HOLA MUNDO"
print(f"Error: {error}")
# → None (todo bien)</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>communicate(input=...)</code> <strong>escribe</strong> en el stdin del hijo y cierra el tubo de entrada</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Espera</strong> a que el hijo termine</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Devuelve la tupla <strong>(stdout, stderr)</strong></div>
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      Después de communicate() el proceso ya terminó: <strong>no puedes volver a comunicarte</strong> con él.
    </div>
  </div>
</div>

---
---

## El flujo de datos y los deadlocks

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">🗣️ Flujo de datos</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">flujo</div>
        <div class="code-card-badge">Pipes</div>
      </div>
      <pre><code>Python ──stdin──► hijo
        ("hola mundo")
hijo ──stdout──► Python
        ("HOLA MUNDO")</code></pre>
    </div>
  </div>
  <div class="right">
    <h3 style="color:#DC2626;">⚠️ Cuidado con los deadlocks</h3>
    <p style="font-size:0.92rem;">Si el hijo escribe mucho en stdout y <strong>nadie lo lee</strong>, el pipe se llena y el hijo se bloquea esperando a que alguien lo vacíe.</p>
    <div class="success" style="margin-top:0.6rem;">
      <code>communicate()</code> lee todo y te evita ese problema. Por eso con run() se usa <code>capture_output=True</code> y con Popen, <code>communicate()</code>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## ¿Cuándo usar cada herramienta?

| Situación | Herramienta |
| :--- | :--- |
| Necesitas el resultado de un comando y puedes esperar | `subprocess.run(..., capture_output=True)` |
| El proceso vive en segundo plano y no necesitas sus datos | `subprocess.Popen(...)` + `wait()` |
| Necesitas enviarle datos y/o leer su respuesta | `Popen(..., stdin=PIPE, stdout=PIPE)` + `communicate()` |

<div class="question-card" style="margin-top:0.8rem;">
  <span class="question-icon">🧠</span>
  <strong>Mini-chequeo:</strong> ¿qué significa stdin=subprocess.PIPE y stdout=subprocess.PIPE? ¿Qué devuelve communicate(input="texto")?
  <div class="answer-card" style="margin-top:0.6rem;">
    Que Python podrá <strong>escribir</strong> en el stdin del hijo y <strong>leer</strong> su stdout · communicate() devuelve la tupla <strong>(stdout, stderr)</strong>.
  </div>
</div>

---
class: compact-slide
---

## El muro del aislamiento
### La burbuja de memoria, en acción

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">aislado.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.78rem;"><code>import multiprocessing
puntuacion = 10  # variable global
def sumar_puntos():
    global puntuacion
    puntuacion += 5
    print(f"Hijo: La puntuación es {puntuacion}")
if __name__ == "__main__":
    p1 = multiprocessing.Process(target=sumar_puntos)
    p1.start()
    p1.join()
    print(f"Padre: La puntuación es {puntuacion}")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <span class="prompt">$</span> python aislado.py<br>
      <span class="output">Hijo: La puntuación es 15<br>
Padre: La puntuación es 10</span>
    </div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Al hacer <code>start()</code>, el SO hace un <strong>clon</strong> de toda la memoria en ese instante</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">El hijo suma 5 sobre <strong>su clon</strong> (15); al morir, su burbuja de memoria se destruye</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">El padre imprime <strong>su variable original</strong>, que nunca fue modificada</div>
    </div>
    <div class="warning" style="margin-top:0.35rem;">
      Los procesos <strong>no comparten variables globales</strong>: el SO clona la RAM.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Rompiendo el muro: Manager
### Comunicación entre procesos (IPC)

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">servidor.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.7rem;"><code>import multiprocessing
def registrar_usuario(dic, nombre, edad):
    # Esto SÍ modifica la memoria que ven todos
    dic[nombre] = edad
    print(f"Hijo registró a {nombre}")
if __name__ == "__main__":
    with multiprocessing.Manager() as manager:
        # diccionario proxy que cruza la burbuja
        buzones = manager.dict()
        p1 = multiprocessing.Process(
            target=registrar_usuario,
            args=(buzones, "Alice", 25))
        p2 = multiprocessing.Process(
            target=registrar_usuario,
            args=(buzones, "Bob", 30))
        p1.start(); p2.start()
        p1.join(); p2.join()
        print(f"Diccionario final: {buzones}")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.85rem;"><code>multiprocessing.Manager()</code>: crea un <strong>proceso servidor invisible</strong> que gestiona la memoria compartida</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.85rem;"><code>manager.dict()</code>: un diccionario <strong>proxy</strong> que cruza la burbuja de memoria</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.85rem;">Los hijos lo reciben como <strong>argumento normal</strong>: <code>args=(buzones, "Alice", 25)</code></div>
    </div>
    <div class="success" style="margin-top:0.35rem;">
      Al terminar, el padre <strong>SÍ ve los cambios</strong>:<br>
      <code>{'Alice': 25, 'Bob': 30}</code>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Condición de carrera y Lock
### Solo un proceso en la sección crítica

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">contador.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.68rem;"><code>import multiprocessing, time
def incrementar(cont, candado):
    for _ in range(100):
        with candado:  # acquire() y release() automáticos
            valor = cont.value    # sección crítica:
            time.sleep(0.001)     # leer → calcular → escribir
            cont.value = valor + 1
if __name__ == "__main__":
    cont = multiprocessing.Value('i', 0)
    candado = multiprocessing.Lock()
    procesos = []
    for i in range(5):
        p = multiprocessing.Process(
            target=incrementar, args=(cont, candado))
        procesos.append(p); p.start()
    for p in procesos:
        p.join()
    print(f"Valor final: {cont.value}") # siempre 500</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      Una <strong>condición de carrera</strong> (race condition) ocurre cuando varios procesos modifican un dato a la vez: se machacan y el resultado es impredecible (143, 290…). Sin el <code>Lock</code>, el contador final no sería 500.
    </div>
    <div class="step" style="margin-top:0.35rem;">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.85rem;">El proceso <strong>pide el candado</strong>: <code>acquire()</code>; si otro lo tiene, se queda bloqueado esperando</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.85rem;">Modifica la variable compartida: es la <strong>sección crítica</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.85rem;">Suelta el candado: <code>release()</code>; con <code>with lock:</code>, acquire y release se hacen <strong>automáticamente</strong></div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Mini-chequeo: multiprocessing

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:-0.5rem;">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🧠</span>
      Las cuatro del muro:
    </div>
    <ol style="font-size:0.85rem;margin-top:0.3rem;">
      <li>¿Por qué usar <code>if __name__ == "__main__"</code> al crear procesos en Windows?</li>
      <li>Si un proceso hijo modifica una lista global estándar, ¿el padre verá la lista modificada?</li>
      <li>¿Qué hace <code>manager.dict()</code>?</li>
      <li>¿Para qué sirve un <code>Lock</code> en programación concurrente?</li>
    </ol>
  </div>
  <div class="right">
    <div class="answer-card" style="font-size:0.8rem;">
      <strong>🔄 Respuestas:</strong>
      <ul style="margin-top:0.3rem;">
        <li>En Windows no hay <strong>fork</strong>: sin el bloque, cada hijo reimporta el script completo y vuelve a crear procesos (bucle infinito)</li>
        <li>No: por el <strong>aislamiento</strong>, el hijo modifica su propio clon en su burbuja de RAM</li>
        <li>Crea un diccionario <strong>proxy</strong> del SO para compartir datos entre procesos de forma segura</li>
        <li>Evitar <strong>condiciones de carrera</strong>: solo un proceso a la vez entra en la <strong>sección crítica</strong></li>
      </ul>
    </div>
  </div>
</div>

---
---

## Compatibilidad Windows / Linux
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Los ejemplos están escritos para <strong>Windows</strong>, pero los conceptos (subprocess.run, Popen, PID, communicate) son <strong>idénticos en todos los sistemas</strong>: solo cambia el comando.
  </div>
</div>

<div class="info" style="margin-top:0.8rem;">
  <code>notepad.exe</code> no existe en Linux y <code>ls</code> no existe en Windows. Aprende a <strong>sustituir el comando</strong> y el código funciona igual.
</div>

---
class: compact-slide
---

## La tabla de comandos equivalentes

| Windows | Linux / macOS |
| :--- | :--- |
| `notepad.exe` | gedit, nano, xed |
| `calc.exe` | gnome-calculator, bc |
| `ping -n 5 8.8.8.8` | `ping -c 5 8.8.8.8` |
| `ipconfig` | `ip addr`, `ifconfig` |
| `where python` | `which python` |
| `cmd /c mkdir` | `mkdir` (es ejecutable real) |
| `start http://...` | `xdg-open http://...` |
| `dir` | `ls` |

<div class="success" style="margin-top:0.5rem;">
  <strong>Sustituye el comando correspondiente y el código funciona igual.</strong>
</div>

---
---

## El truco del shell: mkdir en Windows

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">🪟</div>
      <div class="step-content">En <strong>Windows</strong>, <code>mkdir</code> es un <strong>comando interno de cmd</strong>: no hay un mkdir.exe, hay que invocarlo con <code>cmd /c mkdir ...</code></div>
    </div>
    <div class="step">
      <div class="step-number">🐧</div>
      <div class="step-content">En <strong>Linux</strong>, <code>mkdir</code> es un <strong>ejecutable real</strong> (/usr/bin/mkdir): se lanza directamente</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>shell=True con cuidado:</strong> solo para comandos internos del shell (start, dir). Con texto del usuario, un atacante podría <strong>inyectar comandos</strong>. Pasa siempre la lista de argumentos.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">shell.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
# Windows: cmd /c ejecuta comandos internos
r = subprocess.run(
    ["cmd", "/c", "mkdir", "prueba_psp"],
    capture_output=True, text=True)
print(f"Creada con código: {r.returncode}")
# En Linux: ["mkdir", "prueba_psp"] directo</code></pre>
    </div>
  </div>
</div>

---
---

## Lo que nunca cambia

| Concepto | Windows | Linux |
| :--- | :---: | :---: |
| `subprocess.run([...])` | ✅ | ✅ |
| `subprocess.Popen([...])` | ✅ | ✅ |
| `capture_output=True`, `text=True` | ✅ | ✅ |
| `timeout`, `returncode` | ✅ | ✅ |
| `communicate(input=...)` | ✅ | ✅ |
| `wait()`, `poll()`, `terminate()`, `kill()` | ✅ | ✅ |
| `proceso.pid` | ✅ | ✅ |

<div class="success" style="margin-top:0.6rem;">
  Aprende los conceptos con notepad.exe y calc.exe y, cuando toques Linux, solo cambia la lista de comandos.
</div>

---
---

## Sé el código: dos aplicaciones a la vez
### Traza cada paso antes de ejecutar

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">doble.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import subprocess, time
print("🚀 Abriendo bloc de notas...")
notepad = subprocess.Popen(["notepad.exe"])
print(f"  → PID: {notepad.pid}")
print("🚀 Abriendo calculadora...")
calc = subprocess.Popen(["calc.exe"])
print(f"  → PID: {calc.pid}")
for i in range(5):
    print(f" Python haciendo cosas... ({i+1}/5)")
    time.sleep(1)
notepad.terminate()
calc.kill()
print("Hecho 🏁")</code></pre>
</div>

---
class: compact-slide
---

## La traza, paso a paso
### Tres procesos independientes conviviendo

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:-0.3rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Popen(["notepad.exe"])</code>: el SO busca el ejecutable, lo carga en memoria, asigna <strong>PID 12345</strong> y Python recibe el control al instante</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>Popen(["calc.exe"])</code>: lo mismo, <strong>PID 12346</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Python hace 5 cosas mientras ambos están abiertos: <strong>3 procesos independientes</strong> (Python, notepad, calc)</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>terminate()</code> cierra el bloc · <code>kill()</code> mata la calculadora</div>
    </div>
  </div>
  <div class="right">
    <div class="success" style="font-size:0.85rem;">
      <strong>Python no se bloquea.</strong> Mientras los dos programas están abiertos, Python sigue imprimiendo: cada uno con su PID, su memoria y su turno de CPU.
    </div>
    <h3 style="color:#3B82F6;margin-top:0.4rem;">🥊 run() vs Popen(): el ring</h3>
    <div class="info" style="font-size:0.85rem;">
      <strong>run():</strong> "¡Soy el rey de la simplicidad! Lanzas, esperas y ¡zas! tienes el resultado."
    </div>
    <div class="info" style="font-size:0.85rem;">
      <strong>Popen():</strong> "Mientras tú esperas, yo lanzo y sigo. ¿3 programas a la vez? Los lanzo, me voy a café y luego los mato."
    </div>
  </div>
</div>

<div class="warning" style="margin-top:0.4rem;font-size:0.85rem;">
  <strong>Moraleja:</strong> run() para comandos rápidos que necesitan respuesta. Popen() para procesos que deben vivir en segundo plano.
</div>

---
---

## Mini-chequeo: práctica

<div class="question-card">
  <span class="question-icon">🧠</span>
  Las tres del ring:
</div>

1. En el "Sé el código", ¿cuántos procesos hay vivos mientras Python imprime sus 5 mensajes?
2. ¿Cuándo usarías run() y cuándo Popen()?
3. ¿Qué devuelve <code>os.getppid()</code>?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>3</strong>: Python, el bloc de notas y la calculadora</li>
    <li>run() para respuestas inmediatas; Popen() para segundo plano</li>
    <li>El <strong>PID del proceso padre</strong> (el que lanzó tu programa)</li>
  </ul>
</div>

---
class: compact-slide
---

## Sé el proceso: eres el PID 12345
### Nace, vive y muere un proceso

<div class="info" style="margin-top:-0.6rem;">
  🎯 <em>Eres un proceso Python recién lanzado con <code>subprocess.Popen(["python", "calcula.py"])</code> y acaban de asignarte el PID 12345. ¿Qué te pasa?</em>
</div>

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:0.4rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El SO te crea: PID <strong>12345</strong> y burbuja de memoria reservada</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>NUEVO</strong> → <strong>LISTO</strong>: esperas turno en la cola del planificador</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">La CPU te toca: <strong>EJECUCIÓN</strong>, ejecutas calcula.py</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Llamas a <code>input()</code>: te bloqueas (<strong>BLOQUEADO</strong>) esperando al usuario</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">El usuario pulsa ENTER: la E/S termina y vuelves a <strong>LISTO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content">Última ronda de CPU: <strong>EJECUCIÓN</strong> → <strong>TERMINADO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">7</div>
      <div class="step-content">Tu padre recoge el retorno con <code>proceso.wait()</code>: código <strong>0</strong></div>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  💡 <strong>Ahora tú:</strong> ¿y si tu padre lanza a la vez otros dos procesos (calc.exe y notepad.exe)? Los tres avanzáis turnándose la CPU (<strong>concurrencia</strong>) y, si hay varios núcleos, alguno ejecutará de verdad a la vez (<strong>paralelismo</strong>).
</div>

---
class: compact-slide
---

## 🔥 Fireside chat: Proceso vs Hilo
### Quién es más ligero

<div class="two-cols">
  <div class="left">
    <div class="info">
      <strong>Proceso:</strong> — Yo soy la unidad completa: memoria propia, recursos, PID. Si me cuelgo, tú ni te enteras.
    </div>
    <div class="success">
      <strong>Hilo:</strong> — ¿Y para qué tanta burbuja? Yo vivo <strong>dentro</strong> de un proceso y comparto su memoria. Soy mucho más barato de crear.
    </div>
    <div class="info">
      <strong>Proceso:</strong> — Mis fallos no tumban a nadie. Tú, si se te va un puntero, te llevas por delante al proceso entero.
    </div>
  </div>
  <div class="right">
    <div class="success">
      <strong>Hilo:</strong> — Cierto, pero yo comparto variables directamente. Tú necesitas pipes y communicate() para hablar con tu vecino.
    </div>
    <div class="info">
      <strong>Proceso:</strong> — Y mi paralelismo con multiprocessing es real: los hilos comparten el <strong>GIL</strong>.
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>Moraleja:</strong> el proceso <strong>aisla y paraleliza de verdad</strong>; el hilo es <strong>ligero y comparte memoria</strong>. Los hilos los veremos más adelante en el temario.
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🕵️ ¿Quién soy?

<div class="question-card">
  <span class="question-icon">🕵️</span>
  Endevina qué concepto de la unidad soy:
</div>

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:0.2rem;">
  <div class="left">
    <ol style="font-size:0.88rem;">
      <li>Soy el identificador único que el SO asigna a cada proceso</li>
      <li>Soy el estado en el que el proceso espera un recurso (I/O, socket, sleep)</li>
      <li>Soy el mecanismo por el que una sola CPU parece ejecutar varios procesos a la vez</li>
      <li>Soy el módulo de Python que reparte tareas en procesos paralelos reales</li>
    </ol>
  </div>
  <div class="right">
    <ol start="5" style="font-size:0.88rem;">
      <li>Soy el tubo que conecta la salida de un proceso con la entrada de otro</li>
      <li>Soy la herramienta de sincronización que evita que dos procesos modifiquen la memoria compartida al mismo tiempo (condición de carrera)</li>
      <li>Soy el proceso que ya terminó pero que su padre no ha recogido todavía</li>
    </ol>
    <div class="answer-card" style="margin-top:0.4rem;font-size:0.8rem;">
      <strong>🔄 Respuestas:</strong> 1) <strong>PID</strong> · 2) <strong>BLOQUEADO</strong> · 3) El <strong>planificador</strong> con la concurrencia (time slices) · 4) <strong>multiprocessing</strong> · 5) El <strong>pipe</strong> · 6) El <strong>Lock</strong> (multiprocessing.Lock) · 7) El <strong>zombie</strong>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🤬 CONRAD vs el mundo: "maté el proceso y no volvió"

<div class="warning">
  <em>"He lanzado mi programa con subprocess.run y no me devuelve el control."</em> ¡Pues claro! <strong>run() espera</strong> a que el comando termine: si lanzas notepad.exe, no se cierra nunca. Si querías lanzar y seguir, eso es <strong>Popen</strong>, no run().
</div>

<div class="warning" style="margin-top:0.5rem;">
  <em>"Puse shell=True para abrir el navegador y ahora un comando borra mis archivos."</em> shell=True delega en el intérprete: con datos del usuario es un <strong>agujero de seguridad</strong>. Lista de argumentos, nunca strings concatenados. O <code>cmd /c</code>, que para eso está.
</div>

---
class: compact-slide
---

## 🤬 CONRAD vs el mundo (II): "el padre no ve mi cambio"

<div class="warning">
  <em>"Modifico una variable global en mi proceso hijo y en el padre vale 0."</em> ¡Bienvenido al <strong>aislamiento de memoria</strong>! Los procesos se ejecutan en burbujas separadas: el hijo clona la variable, la modifica en su burbuja y, al morir, se pierde. Si no usas un <strong>Manager</strong> (IPC), tus cambios mueren en la burbuja del hijo.
</div>

<div class="terminal" style="margin-top:0.6rem;">
  <span class="prompt">$</span> python aislado.py<br>
  <span class="output">Hijo: La puntuación es 15<br>
Padre: La puntuación es 10</span>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <em>"¿Será que mi proceso se ha convertido en zombie?"</em> Míralo con <code>proceso.poll()</code>: si devuelve el código de retorno, ya terminó y solo falta recogerlo con wait() o poll(). <strong>Zombie sin recoger = entrada ocupada</strong> en la tabla de procesos. A diagnosticar.
</div>

---
class: compact-slide
---

## 🧠 Atrévete a pensar

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:-0.5rem;">
  <div class="left">
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.88rem;">¿Por qué un proceso no puede compartir memoria directamente con otro?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.88rem;">¿Qué pasa si un hijo muere y su padre nunca llama a wait() ni poll()?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.88rem;">¿Cuándo usarías multiprocessing en lugar de subprocess?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">4</div>
      <div class="step-content" style="font-size:0.88rem;">¿Por qué shell=True es peligroso con datos del usuario?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">5</div>
      <div class="step-content" style="font-size:0.88rem;">¿Qué ventaja tiene Popen sobre run() para lanzar 3 aplicaciones a la vez?</div>
    </div>
  </div>
  <div class="right">
    <div class="answer-card" style="font-size:0.75rem;padding:0.7rem 0.9rem;">
      <strong>💡 Soluciones</strong>
      <ul style="margin-top:0.2rem;">
        <li><strong>1)</strong> Burbuja aislada: se comunican con mecanismos externos (pipes, sockets, archivos)</li>
        <li><strong>2)</strong> Queda <strong>zombie</strong>: su entrada sigue en la tabla de procesos</li>
        <li><strong>3)</strong> multiprocessing para <strong>paralelismo real</strong>; subprocess para <strong>lanzar programas</strong></li>
        <li><strong>4)</strong> Un dato con <code>;</code>, <code>&</code> o <code>|</code> ejecuta comandos extra (inyección)</li>
        <li><strong>5)</strong> Popen devuelve el control al instante</li>
      </ul>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🧠 Atrévete a pensar: multiprocessing

<div class="two-cols" style="gap:1rem;align-items:start;margin-top:-0.5rem;">
  <div class="left">
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.88rem;">¿Qué ocurre si ejecutas <code>multiprocessing.Process</code> en Windows sin incluir el bloque <code>if __name__ == "__main__"</code>?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.88rem;">¿Por qué un <code>manager.dict()</code> necesita un <code>Lock</code> si ya es un objeto especial de memoria compartida?</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.88rem;">¿Qué diferencia existe entre el método <code>wait()</code> de <code>Popen</code> y el método <code>join()</code> de <code>Process</code>?</div>
    </div>
  </div>
  <div class="right">
    <div class="answer-card" style="font-size:0.78rem;padding:0.7rem 0.9rem;">
      <strong>💡 Soluciones</strong>
      <ul style="margin-top:0.2rem;">
        <li><strong>1)</strong> En Windows no hay fork: el hijo reimporta el script completo y vuelve a crear procesos → <strong>bucle infinito</strong> hasta agotar la RAM</li>
        <li><strong>2)</strong> El Manager permite el acceso concurrente, pero no evita condiciones de carrera en operaciones compuestas (leer → calcular → escribir): el <strong>Lock</strong> garantiza la exclusión mutua</li>
        <li><strong>3)</strong> Conceptualmente lo mismo (bloquear al padre hasta que acabe el hijo), pero <code>wait()</code> es de <strong>subprocess</strong> (procesos del SO) y <code>join()</code> de <strong>multiprocessing</strong> (nativos de Python)</li>
      </ul>
    </div>
  </div>
</div>

---
class: compact-slide
---

## 🤷 No hay preguntas tontas

<div class="two-cols" style="gap:1rem;align-items:start;">
  <div class="left">
    <div class="info">
      <strong>❓ ¿Cuántos procesos puede tener mi sistema?</strong><br>
      Depende de la <strong>memoria RAM</strong>: cada proceso ocupa memoria. En Windows, el Administrador de tareas los muestra todos.
    </div>
    <div class="info" style="margin-top:0.5rem;">
      <strong>❓ ¿Y si el padre muere antes que los hijos?</strong><br>
      Son <strong>huérfanos</strong>. En Windows los gestiona el sistema; en Linux los adopta <strong>init</strong> (PID 1) o systemd, que recoge sus estados al terminar.
    </div>
  </div>
  <div class="right">
    <div class="info">
      <strong>❓ ¿Puedo lanzar cualquier programa?</strong><br>
      Sí, cualquier ejecutable. Pero debe estar en el <strong>PATH</strong> o dar la ruta completa.
    </div>
    <div class="info" style="margin-top:0.5rem;">
      <strong>❓ Si multiprocessing duplica la memoria al crear procesos, ¿es muy costoso?</strong><br>
      Sí: crear procesos es más pesado que crear hilos (<strong>overhead</strong> de RAM y CPU). Por eso en producción se usan <strong>pools de procesos</strong> (ProcessPoolExecutor) que los reutilizan.
    </div>
  </div>
</div>

---
---

## 💬 Preguntas de entrevista de trabajo

<div class="question-card">
  <span class="question-icon">💼</span>
  Preguntas reales de programador Python júnior:
</div>

1. ¿Qué es un proceso y en qué se diferencia de un programa?
2. Explica el ciclo de vida de un proceso
3. ¿Qué diferencia hay entre computación paralela y distribuida?
4. ¿Cómo lanzarías un programa externo desde Python y leerías su salida?
5. ¿Qué diferencia hay entre run() y Popen()? ¿Cuándo usarías cada uno?
6. ¿Cómo comunicarías dos procesos entre sí?

<div class="info" style="margin-top:0.6rem;">
  <strong>Las "preguntas reina" son la 4 y la 5:</strong> run([...], capture_output=True, text=True) → resultado.stdout · y la moraleja: run() para respuestas inmediatas, Popen() para segundo plano.
</div>

---
class: compact-slide
---

## 💬 Entrevista: multiprocessing

<div class="question-card">
  <span class="question-icon">💼</span>
  Las tres de memoria compartida:
</div>

1. "¿Por qué en Python el multiproceso permite <strong>paralelismo real</strong> mientras que los hilos sufren por el GIL?"
2. "¿Cómo comunicarías dos procesos de Python que necesitan <strong>compartir un diccionario</strong> de datos en tiempo real?"
3. "¿Qué es una <strong>condición de carrera</strong> (race condition) y cómo se previene en un entorno multiproceso?"

<div class="answer-card" style="margin-top:0.3rem;">
  <strong>💡 Cómo encararlas:</strong>
  <ul style="font-size:0.82rem;margin-top:0.3rem;">
    <li>Para la 1: cada proceso levanta su <strong>propio intérprete</strong> de Python (GIL independiente por núcleo)</li>
    <li>Para la 2: <code>multiprocessing.Manager()</code> y sus objetos <strong>proxy</strong> (<code>manager.dict()</code>)</li>
    <li>Para la 3: define la <strong>sección crítica</strong> y explica cómo <code>multiprocessing.Lock()</code> garantiza la exclusión mutua</li>
  </ul>
</div>

---
---

## Resumen — Bloque 02 completado
### Lo que hemos aprendido

<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-bottom:0.4rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:8px 12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:2px;">🔌 Comunicación</div>
    <p style="font-size:0.82rem;">stdin/stdout con PIPE · communicate(input=...) · deadlocks</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:8px 12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:2px;">🪟🐧 Windows / Linux</div>
    <p style="font-size:0.82rem;">Misma API, otro comando · cmd /c y shell=True con cuidado</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:8px 12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:2px;">🥊 Práctica</div>
    <p style="font-size:0.82rem;">Traza de procesos conviviendo · run() vs Popen() · zombie</p>
  </div>
  <div style="background:#FEE2E2;border:2px solid #EF4444;border-radius:12px;padding:8px 12px;">
    <div style="font-weight:700;color:#EF4444;margin-bottom:2px;">🧬 multiprocessing (IPC)</div>
    <p style="font-size:0.82rem;">Muro del aislamiento · Manager().dict() · Lock y condiciones de carrera</p>
  </div>
  <div style="background:#FFF7ED;border:2px solid #F59E0B;border-radius:12px;padding:8px 12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:2px;">💼 Cierre</div>
    <p style="font-size:0.82rem;">Proceso vs hilo · ¿quién soy? · preguntas de entrevista</p>
  </div>
</div>

<div class="success">
  <strong>Ya sabes lanzar, vigilar, alimentar y matar procesos, y compartir memoria entre ellos.</strong> Ahora: boletines de práctica. 🚀
</div>

---
layout: closing
---
