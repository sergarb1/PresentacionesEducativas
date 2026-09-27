---
layout: cover
---

# Unidad 02 — Gestión de procesos<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Qué es un proceso
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>proceso</strong> es un programa en ejecución con su propio espacio de memoria, recursos (archivos abiertos, sockets) y un identificador único llamado <strong>PID</strong>.
  </div>
</div>

Un programa en el disco duro es un **muerto viviente**: no hace nada. Un proceso es ese mismo programa **vivo**, ocupando memoria, consumiendo CPU y respondiendo al teclado, a la red o al ratón.

La diferencia no está en el código: está en que el sistema operativo lo ha cargado en memoria y lo está ejecutando.

---
---

## La burbuja de memoria
### Cada proceso vive en la suya

<div class="two-cols">
  <div class="left">
    <div class="diagram-frame diagram-medium">
      <Excalidraw drawFilePath="/diagrams/ud02-psp-burbuja-memoria.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Código</strong> — las instrucciones del programa</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Estado</strong> — los valores actuales de las variables</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Contador de programa</strong> — qué instrucción toca ejecutar ahora</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>PID</strong> — el carnet de identidad del proceso</div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Si un proceso se cuelga, los demás no se enteran: cada uno vive en su <strong>burbuja aislada</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El PID y las características
### El carnet de identidad del proceso

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">mipid.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import os
print(f"Mi PID es {os.getpid()}")</code></pre>
    </div>
    <h3 style="color:#3B82F6;margin-top:0.7rem;">Ver los procesos del sistema</h3>
    <ul style="font-size:0.92rem;">
      <li><strong>Windows</strong>: Administrador de tareas → "Detalles", o <code>tasklist</code></li>
      <li><strong>Linux / macOS</strong>: <code>ps aux</code> o <code>top</code></li>
    </ul>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Propiedad</th><th>Descripción</th></tr></thead>
      <tbody>
        <tr><td><strong>PID</strong></td><td>Identificador único numérico</td></tr>
        <tr><td><strong>Memoria propia</strong></td><td>Espacio de direcciones aislado</td></tr>
        <tr><td><strong>Recursos</strong></td><td>Archivos, sockets, manejadores</td></tr>
        <tr><td><strong>Contexto</strong></td><td>Estado de la CPU, registros, contador</td></tr>
        <tr><td><strong>Comunicación</strong></td><td>Necesita mecanismos externos (pipes, sockets, archivos)</td></tr>
      </tbody>
    </table>
    <div class="warning" style="margin-top:0.6rem;">
      La última fila es la clave: los procesos <strong>no comparten memoria por defecto</strong>.
    </div>
  </div>
</div>

---
---

## La analogía de la cocina
### Un proceso es una receta en marcha

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">📖</div>
      <div class="step-content">La receta escrita en el libro es el <strong>programa</strong>: código muerto en el disco</div>
    </div>
    <div class="step">
      <div class="step-number">🍳</div>
      <div class="step-content">El cocinero la coge, pone los ingredientes en <strong>su mesa</strong> (memoria) y empieza por el paso 1 (contador de programa)</div>
    </div>
    <div class="step">
      <div class="step-number">🎫</div>
      <div class="step-content">Cada cocinero recibe su propio <strong>número de pedido</strong> (PID)</div>
    </div>
  </div>
  <div class="right">
    <div class="success">
      Cada cocinero con su receta y su mesa: si uno se quema, los demás siguen cocinando sin enterarse. Eso es el <strong>aislamiento</strong> de la burbuja de memoria.
    </div>
    <div class="info" style="margin-top:0.6rem;">
      Más adelante verás qué pasa cuando hay varias cocinas (varias CPUs) o varios restaurantes (varias máquinas).
    </div>
  </div>
</div>

---
---

## Mini-chequeo: qué es un proceso

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué es el PID y para qué sirve?
2. ¿Qué contiene la burbuja de memoria de un proceso?
3. ¿Por qué dos procesos no pueden compartir una variable directamente?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>El <strong>identificador único numérico</strong> que el SO asigna a cada proceso para referirse a él</li>
    <li>El <strong>código</strong>, el <strong>estado</strong> de las variables, el <strong>contador de programa</strong> y el <strong>PID</strong></li>
    <li>Porque cada uno vive en su <strong>burbuja aislada</strong>; necesitan mecanismos externos (pipes, sockets, archivos)</li>
  </ul>
</div>

---
---

## Estados de un proceso
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un proceso no está siempre "ejecutándose": nace, espera su turno, usa la CPU, se bloquea esperando recursos y finalmente muere. Esos <strong>cinco estados</strong> forman su ciclo de vida.
  </div>
</div>

El sistema operativo gestiona decenas o cientos de procesos a la vez con una sola CPU (o pocas). Para que todo parezca simultáneo, **reparte la CPU en porciones de tiempo** y cada proceso va pasando de estado según lo que le toca.

---
---

## El ciclo de vida: las cinco estados

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-psp-gestion-procesos.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---
class: compact-slide
---

## Las transiciones, una a una

| Estado | Qué significa |
| :--- | :--- |
| **NUEVO** | El proceso acaba de ser creado |
| **LISTO** | Preparado para ejecutar, esperando que la CPU esté libre |
| **EJECUCIÓN** | La CPU está ejecutando sus instrucciones |
| **BLOQUEADO** | Esperando un recurso (I/O, socket, sleep) |
| **TERMINADO** | El proceso ha finalizado |

<div class="info" style="margin-top:0.5rem;">
  De <strong>LISTO</strong> solo se puede ir a <strong>EJECUCIÓN</strong> (la CPU toca) y volver · De <strong>BLOQUEADO</strong> se vuelve siempre a <strong>LISTO</strong> cuando la E/S termina.
</div>

---
---

## La cafetería: los estados en acción
### Un solo camarero (CPU), muchos clientes (procesos)

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Entras por la puerta → <strong>NUEVO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Te pones en la cola → <strong>LISTO</strong> (esperando al camarero)</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">El camarero te atiende → <strong>EJECUCIÓN</strong></div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Pides café y el camarero se va a la máquina → <strong>BLOQUEADO</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">El café está listo y vuelves a la cola → <strong>LISTO</strong></div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content">El camarero te lo entrega → <strong>EJECUCIÓN</strong></div>
    </div>
    <div class="step">
      <div class="step-number">7</div>
      <div class="step-content">Pagas y te vas → <strong>TERMINADO</strong></div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      El camarero alterna entre los clientes dando a cada uno unos segundos: por eso una sola CPU atiende a muchos procesos "a la vez".
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

1. ¿Qué diferencia hay entre LISTO y BLOQUEADO?
2. ¿Qué transición ocurre cuando un proceso llama a <code>time.sleep(2)</code>?
3. Un proceso está ejecutándose y el planificador le quita la CPU por prioridad. ¿A qué estado pasa?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>LISTO = "solo espero a que la CPU me toque" · BLOQUEADO = "no puedo ejecutar aunque me dieran la CPU: espero un recurso"</li>
    <li><strong>EJECUCIÓN → BLOQUEADO</strong>: pide una espera de E/S</li>
    <li>A <strong>LISTO</strong>: sigue preparado, solo perdió su turno</li>
  </ul>
</div>

---
class: compact-slide
---

## Paralela vs Distribuida
### La idea en una frase

<div class="key-idea" style="margin-top: 0.7rem; padding: 0.9rem 1.4rem 0.9rem 3.1rem;">
  <div class="key-idea-text" style="font-size: 1.15rem;">
    <strong>Paralela</strong> es ejecutar varias tareas <strong>a la vez</strong> en varias CPUs; <strong>distribuida</strong> es ejecutarlas en <strong>múltiples máquinas</strong> conectadas por red; <strong>concurrencia</strong> es que varias tareas <strong>avancen</strong>, aunque se turnen en una sola CPU.
  </div>
</div>

<div class="two-cols" style="margin-top:0.4rem;">
  <div class="left">
    <table>
      <thead><tr><th>Concepto</th><th>Qué significa</th></tr></thead>
      <tbody>
        <tr><td><strong>Paralela</strong></td><td>Varias tareas a la vez en múltiples CPUs/núcleos</td></tr>
        <tr><td><strong>Distribuida</strong></td><td>Varias tareas en múltiples máquinas por red</td></tr>
        <tr><td><strong>Concurrencia</strong></td><td>Varias tareas avanzando (pueden turnarse)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">🍳</div>
      <div class="step-content"><strong>Paralela</strong>: 4 sartenes, cada una friendo un huevo (4 CPUs)</div>
    </div>
    <div class="step">
      <div class="step-number">🏙️</div>
      <div class="step-content"><strong>Distribuida</strong>: 4 restaurantes en 4 ciudades, mismo menú</div>
    </div>
    <div class="step">
      <div class="step-number">🧑‍🍳</div>
      <div class="step-content"><strong>Concurrente</strong>: 1 cocinero alternando 3 pedidos</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Paralela en Python: multiprocessing.Pool
### Cuatro sartenes de verdad

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">paralelo.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code># Paralela con multiprocessing (varias CPUs)
from multiprocessing import Pool
def cuadrado(n):
    return n * n
if __name__ == "__main__":
    # obligatorio en Windows: protege el spawn
    with Pool(4) as p:  # 4 procesos en paralelo
        print(p.map(cuadrado, [1, 2, 3, 4]))
# Salida: [1, 4, 9, 16]</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Pool(4)</code> crea <strong>4 procesos reales</strong> que el SO reparte entre los núcleos</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>p.map(funcion, lista)</code> <strong>reparte la lista</strong> entre ellos</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Si tu máquina tiene 4 núcleos, los 4 se ejecutan <strong>a la vez</strong></div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      El <strong>GIL</strong> de Python limita los hilos; con <strong>procesos</strong> (multiprocessing) no existe ese límite: cada proceso tiene su propio intérprete.
    </div>
  </div>
</div>

---
---

## Paralela vs Distribuida: el duelo

| Pregunta | Paralela | Distribuida |
| :--- | :--- | :--- |
| **¿Dónde se ejecuta?** | Múltiples CPUs de una máquina | Múltiples máquinas por red |
| **¿Comparten memoria?** | No por defecto (burbujas aisladas) | No (cada máquina tiene la suya) |
| **¿Comunicación?** | Pipes, memoria compartida, locks | Sockets, HTTP, mensajería |
| **¿Escala?** | Hasta los núcleos de tu CPU | Hasta cientos de máquinas |
| **Ejemplo en Python** | `multiprocessing.Pool` | socket, APIs REST |

<div class="success" style="margin-top:0.6rem;">
  La paralela es <strong>interna a la máquina</strong>; la distribuida <strong>necesita red</strong> y comunicación por sockets/HTTP.
</div>

---
---

## Mini-chequeo: paralela vs distribuida

<div class="question-card">
  <span class="question-icon">🧠</span>
  Tres preguntas rápidas:
</div>

1. ¿Cuál es la diferencia clave entre paralela y distribuida?
2. ¿Por qué el "cocinero alternando" es concurrencia y no paralelismo?
3. ¿Qué función de <code>multiprocessing</code> reparte una tarea entre varios procesos?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Paralela = <strong>varias CPUs de una misma máquina</strong> · Distribuida = <strong>múltiples máquinas por red</strong></li>
    <li>Porque hay <strong>una sola CPU/sartén</strong>: las tareas avanzan turnándose, no a la vez</li>
    <li><code>Pool(4).map(funcion, lista)</code>: crea 4 procesos y reparte la lista</li>
  </ul>
</div>

---
---

## subprocess.run()
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>subprocess.run()</code> lanza un programa y <strong>espera</strong> a que termine, devolviéndote su salida y su código de retorno. Es la forma más sencilla de ejecutar otro programa desde Python.
  </div>
</div>

Cuando necesitas el resultado de un comando (¿qué versión hay? ¿responde el ping? ¿qué dice este comando?), **run() es tu herramienta**: lanza, espera y captura.

---
---

## El primer lanzamiento con run()

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">primer_run.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
# Comando simple
resultado = subprocess.run(
    ["python", "--version"],
    capture_output=True,
    text=True
)
print(f"Salida: {resultado.stdout}")
print(f"Código: {resultado.returncode}")
# Salida: Python 3.11.4
# Código: 0</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Una <strong>lista</strong> con el ejecutable y sus argumentos: cada elemento es un argumento aparte</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>capture_output=True</code> captura <strong>stdout y stderr</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>text=True</code> devuelve <strong>cadenas</strong>, no bytes</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>returncode</code>: <strong>0 = todo bien</strong>, distinto de 0 = algo falló</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Parámetros y resultado de run()

<div class="two-cols">
  <div class="left">
    <h3 style="color:#3B82F6;">Parámetros importantes</h3>
    <table>
      <thead><tr><th>Parámetro</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><code>capture_output=True</code></td><td>Captura stdout y stderr</td></tr>
        <tr><td><code>text=True</code></td><td>Devuelve strings en vez de bytes</td></tr>
        <tr><td><code>timeout=N</code></td><td>Excepción si tarda más de N segundos</td></tr>
        <tr><td><code>check=True</code></td><td>Excepción si returncode ≠ 0</td></tr>
      </tbody>
    </table>
    <h3 style="color:#3B82F6;margin-top:0.6rem;">El objeto resultado</h3>
    <ul style="font-size:0.9rem;">
      <li><code>resultado.stdout</code> — la salida estándar</li>
      <li><code>resultado.stderr</code> — la salida de errores</li>
      <li><code>resultado.returncode</code> — 0 si fue bien</li>
    </ul>
  </div>
  <div class="right">
    <h3 style="color:#F59E0B;">⏱️ Timeout: no esperes para siempre</h3>
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">timeout.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>try:
    r = subprocess.run(
        ["ping", "google.com", "-n", "3"],
        capture_output=True, text=True,
        timeout=10)
    print(r.stdout)
except subprocess.TimeoutExpired:
    print("❌ El ping tardó demasiado")
except subprocess.CalledProcessError:
    print("❌ Error en el comando")</code></pre>
    </div>
  </div>
</div>

---
---

## Un ejemplo con error controlado
### run() por defecto no lanza excepciones: devuelve

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">error.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
resultado = subprocess.run(
    ["python", "--versio"],
    capture_output=True, text=True)
print(f"Código: {resultado.returncode}")
print(f"Error: {resultado.stderr}")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal">
      <span class="prompt">$</span> python error.py<br>
      <span class="output">Código: 2<br>
Error: Unknown option: --versio</span>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      El código de retorno <strong>2</strong> (distinto de 0) te dice que el comando falló, y <strong>stderr</strong> te dice por qué. Sin excepciones: por defecto <code>run()</code> solo devuelve el resultado.
    </div>
  </div>
</div>

---
---

## Mini-chequeo: subprocess.run()

<div class="question-card">
  <span class="question-icon">🧠</span>
  Comprueba lo aprendido:
</div>

1. ¿Qué hacen <code>capture_output=True</code> y <code>text=True</code>?
2. ¿Qué significa un returncode distinto de 0?
3. ¿Qué excepción lanza <code>run()</code> si el comando tarda más de <code>timeout</code>?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><code>capture_output</code> captura stdout y stderr; <code>text=True</code> los devuelve como <strong>strings</strong></li>
    <li>Que el comando <strong>falló</strong> (0 = éxito, otro número = error)</li>
    <li><code>subprocess.TimeoutExpired</code></li>
  </ul>
</div>

---
---

## subprocess.Popen()
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <code>subprocess.Popen()</code> lanza un proceso en <strong>segundo plano</strong> y devuelve el control inmediatamente: no espera a que termine. Tú sigues haciendo cosas mientras él vive.
  </div>
</div>

<div class="warning" style="margin-top:0.8rem;">
  <strong>run() espera; Popen() no.</strong> Eso convierte a Popen en la herramienta para abrir aplicaciones, lanzar varios programas a la vez y gestionarlos después con sus métodos.
</div>

---
---

## El primer Popen: abrir el bloc de notas

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">popen.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
# Lanzar el bloc de notas (no espera)
proceso = subprocess.Popen(["notepad.exe"])
print(f"Lanzado con PID {proceso.pid}")
# Python sigue mientras el bloc está abierto
print("Haciendo otras cosas...")
# Cuando queramos, esperamos a que termine
proceso.wait()
print("El bloc de notas se cerró")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Popen([...])</code> lanza el bloc y <strong>vuelve al instante</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>proceso.pid</code> da el <strong>PID</strong> del proceso recién creado</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Python <strong>sigue ejecutando</strong> mientras el bloc está abierto</div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>proceso.wait()</code> <strong>bloquea</strong> hasta que se cierra</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los métodos de Popen

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Método</th><th>Qué hace</th></tr></thead>
      <tbody>
        <tr><td><code>proceso.wait()</code></td><td>Espera a que termine (bloqueante)</td></tr>
        <tr><td><code>proceso.poll()</code></td><td>Pregunta si ha terminado (no bloqueante)</td></tr>
        <tr><td><code>proceso.terminate()</code></td><td>Envía señal de terminación</td></tr>
        <tr><td><code>proceso.kill()</code></td><td>Mata el proceso forzosamente</td></tr>
        <tr><td><code>proceso.pid</code></td><td>PID del proceso hijo</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.6rem;">
      <strong>wait() vs poll()</strong>: wait() <strong>bloquea</strong> hasta que termina; poll() <strong>no bloquea</strong>: devuelve <code>None</code> si sigue vivo, o su código de retorno si ya terminó.
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">poll.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess, time
proceso = subprocess.Popen(["notepad.exe"])
while proceso.poll() is None:
    print("El bloc sigue abierto...")
    time.sleep(1)
print(f"Cerrado con código {proceso.poll()}")</code></pre>
    </div>
  </div>
</div>

---
---

## terminate() vs kill(): el cierre suave y el mazazo

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">🤝</div>
      <div class="step-content"><strong>terminate()</strong>: en Linux/macOS envía <strong>SIGTERM</strong>, un cierre <em>suave</em>: el proceso puede guardar y salir</div>
    </div>
    <div class="step">
      <div class="step-number">🔨</div>
      <div class="step-content"><strong>kill()</strong>: mata <strong>forzosamente</strong>, sin dar opción. Úsalo solo cuando terminate() no baste</div>
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      En <strong>Windows</strong> ambos son equivalentes: terminate() llama a TerminateProcess, una terminación <strong>forzosa</strong> igual que kill().
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">cierra.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import subprocess
proceso = subprocess.Popen(["calc.exe"])
print(f"Calculadora con PID {proceso.pid}")
proceso.terminate()  # cierre suave (Linux) o forzoso (Windows)
proceso.kill()       # solo si el anterior no funcionó</code></pre>
    </div>
  </div>
</div>

---
---

## Lanzar varios procesos a la vez
### La gran ventaja de Popen

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">varios.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import subprocess, time
notepad = subprocess.Popen(["notepad.exe"])
calc = subprocess.Popen(["calc.exe"])
mspaint = subprocess.Popen(["mspaint.exe"])
print(f"PIDs: {notepad.pid}, {calc.pid}, {mspaint.pid}")
time.sleep(5)  # les damos 5 segundos de vida
notepad.terminate()
calc.terminate()
mspaint.kill()
print("Todos cerrados 🏁")</code></pre>
</div>

<div class="success" style="margin-top:0.6rem;">
  Los 3 procesos viven <strong>a la vez</strong>, cada uno con su PID, mientras Python hace otras cosas. Eso es imposible con <code>run()</code>, que espera a cada uno antes de lanzar el siguiente.
</div>

---
---

## Mini-chequeo: Popen

<div class="question-card">
  <span class="question-icon">🧠</span>
  Las tres claves del segundo plano:
</div>

1. ¿Qué diferencia hay entre <code>wait()</code> y <code>poll()</code>?
2. ¿Qué devuelve <code>proceso.poll()</code> mientras el proceso sigue vivo?
3. ¿Cuándo usarías <code>kill()</code> en lugar de <code>terminate()</code>?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><code>wait()</code> <strong>bloquea</strong> hasta que termina; <code>poll()</code> <strong>pregunta</strong> sin bloquear</li>
    <li><code>None</code> (el proceso sigue ejecutándose)</li>
    <li>Cuando terminate() no consigue cerrarlo: kill() mata <strong>forzosamente</strong></li>
  </ul>
</div>

---
---

## Resumen — Bloque 01 completado
### Lo que hemos aprendido

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:0.8rem;">
  <div style="background:#EFF6FF;border:2px solid #3B82F6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#3B82F6;margin-bottom:4px;">📦 Sección 1</div>
    <p style="font-size:0.82rem;"><strong>Qué es un proceso</strong><br>Burbuja de memoria, PID, aislamiento, analogía de la cocina</p>
  </div>
  <div style="background:#F5F3FF;border:2px solid #8B5CF6;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#8B5CF6;margin-bottom:4px;">🔄 Sección 2</div>
    <p style="font-size:0.82rem;"><strong>Estados</strong><br>NUEVO, LISTO, EJECUCIÓN, BLOQUEADO, TERMINADO y el planificador</p>
  </div>
  <div style="background:#F0FDF4;border:2px solid #22C55E;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#22C55E;margin-bottom:4px;">🤹 Sección 3</div>
    <p style="font-size:0.82rem;"><strong>Paralela vs distribuida</strong><br>CPUs vs máquinas, concurrencia, multiprocessing.Pool</p>
  </div>
  <div style="background:#FFF7ED;border:2px solid #F59E0B;border-radius:12px;padding:12px;">
    <div style="font-weight:700;color:#F59E0B;margin-bottom:4px;">🚀 Secciones 4-5</div>
    <p style="font-size:0.82rem;"><strong>subprocess</strong><br>run() para esperar y capturar; Popen() para segundo plano</p>
  </div>
</div>

<div class="success">
  <strong>Ya sabes qué es un proceso, cómo vive y cómo lanzarlo desde Python.</strong> En el bloque 02: comunicación por pipes, Windows vs Linux y práctica real. 🚀
</div>

---
layout: closing
---
