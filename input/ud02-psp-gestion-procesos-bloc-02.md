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
---

## Sé el proceso: eres el PID 12345
### Nace, vive y muere un proceso

<div class="two-cols">
  <div class="left">
    <div class="question-card">
      <span class="question-icon">🎯</span>
      <em>Eres un proceso de Python recién lanzado con <code>subprocess.Popen(["python", "calcula.py"])</code>. Acaban de asignarte el PID 12345. ¿Qué te pasa?</em>
    </div>
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El SO crea tu proceso: PID <strong>12345</strong>, burbuja de memoria reservada</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>NUEVO</strong> → <strong>LISTO</strong>: esperas turno en la cola del planificador</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">La CPU te toca: <strong>EJECUCIÓN</strong>. Ejecutas calcula.py</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Llamas a <code>input()</code>: te bloqueas (<strong>BLOQUEADO</strong>) esperando al usuario</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">El usuario escribe y pulsa ENTER: la E/S termina y vuelves a <strong>LISTO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content">La CPU te toca otra vez (<strong>EJECUCIÓN</strong>) y terminas: <strong>TERMINADO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">7</div>
      <div class="step-content">Tu padre recoge tu código de retorno con wait()/poll(): <strong>0</strong></div>
    </div>
  </div>
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
---

## 🕵️ ¿Quién soy?

<div class="question-card">
  <span class="question-icon">🕵️</span>
  Endevina qué concepto de la unidad soy:
</div>

1. Soy el identificador único que el SO asigna a cada proceso
2. Soy el estado en el que el proceso espera un recurso (I/O, socket, sleep)
3. Soy el mecanismo por el que una sola CPU parece ejecutar varios procesos a la vez
4. Soy el módulo de Python que reparte tareas en procesos paralelos reales
5. Soy el tubo que conecta la salida de un proceso con la entrada de otro
6. Soy el proceso que ya terminó pero que su padre no ha recogido todavía

<div class="answer-card">
  <strong>🔄 Respuestas:</strong> 1) <strong>PID</strong> · 2) <strong>BLOQUEADO</strong> · 3) El <strong>planificador</strong> con la concurrencia (time slices) · 4) <strong>multiprocessing</strong> · 5) El <strong>pipe</strong> · 6) El <strong>zombie</strong>
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

<div class="warning" style="margin-top:0.5rem;">
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
---

## Resumen — Bloque 02 completado
### Lo que hemos aprendido

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">🔌 Comunicación</div>
    <p style="font-size:0.82rem;">stdin/stdout con PIPE · communicate(input=...) · deadlocks</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">🪟🐧 Windows / Linux</div>
    <p style="font-size:0.82rem;">Misma API, otro comando · cmd /c y shell=True con cuidado</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">🥊 Práctica</div>
    <p style="font-size:0.82rem;">Traza de procesos conviviendo · run() vs Popen() · zombie</p>
  </div>
  <div style="background:#FFF7ED;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">💼 Cierre</div>
    <p style="font-size:0.82rem;">Proceso vs hilo · ¿quién soy? · preguntas de entrevista</p>
  </div>
</div>

<div class="success">
  <strong>Ya sabes lanzar, vigilar, alimentar y matar procesos desde Python.</strong> Ahora: boletines de práctica. 🚀
</div>

---
layout: closing
---
