---
layout: cover
---

# Unidad 06 — Servidores concurrentes<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧪</span><strong>Benchmark</strong><br>Lanzador masivo de clientes</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔒</span><strong>Sincronización</strong><br>Lock para el estado compartido</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔢</span><strong>Límites</strong><br>Context switch y fugas de recursos</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏗️</span><strong>Servidor completo</strong><br>servidor.py + lanzaclientes.py</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⭐</span><strong>Cierre</strong><br>Sé el servidor y buenas prácticas</div>
</div>

<p style="margin-top:0.7rem;">Partimos del bloque 01: secuencial, hilo por cliente y <code>ThreadPoolExecutor</code>. Aquí <strong>medimos de verdad</strong>, protegemos el estado y montamos el servidor de producción.</p>

---
---

## Benchmark
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>benchmark</strong> lanza N clientes a la vez contra tu servidor y cronometra cuánto tardan todos en recibir respuesta. Es la prueba objetiva de que la concurrencia funciona… o de que tu servidor sigue siendo secuencial.
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Hasta ahora habíamos <strong>razonado</strong> sobre tiempos («el secuencial tarda n × tiempo»). Aquí lo <strong>medimos de verdad</strong>: <code>time.time()</code> antes de lanzar y después de terminar.
</div>

---
class: compact-slide
---

## El experimento
### 10 clientes en paralelo con un pool

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">benchmark.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre style="font-size:0.72rem;line-height:1.3;"><code>import socket, time, concurrent.futures
def cliente(id):
    """Conecta, envia 'ping', recibe 'pong'."""
    with socket.socket() as s:
        s.connect(("127.0.0.1", 5000))
        s.sendall(b"ping")
        s.recv(1024)
def prueba(tipo_servidor, n=10):
    """Lanza n clientes en paralelo y cronometra."""
    inicio = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=n) as lanzador:
        futuros = [lanzador.submit(cliente, i) for i in range(n)]
        concurrent.futures.wait(futuros)
    return time.time() - inicio</code></pre>
</div>

<div class="warning" style="margin-top:0.4rem;">
  Detalle: el propio lanzador usa un <code>ThreadPoolExecutor</code> con n hilos. Sin <code>wait(futuros)</code>, el hilo principal terminaría antes que los clientes y mediríamos mal.
</div>

---
---

## Los resultados
### 10 clientes, 2 segundos por cliente

| Enfoque | 10 clientes (2s c/u) | Fórmula |
| :--- | :--- | :--- |
| 🐢 Secuencial | ~20 segundos | n × tiempo_por_cliente |
| 🚀 Hilos | ~2 segundos | max(tiempo_por_cliente) |
| ⚡ ThreadPool (5 hilos) | ~4 segundos | ceil(n/workers) × tiempo_por_cliente |

<div class="two-cols" style="margin-top:0.7rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">El pool de 5 hilos atiende <strong>2 tandas</strong> de 5: ceil(10/5) = 2 → ~4s</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Tarda el doble que hilos ilimitados, pero <strong>no ahoga el sistema</strong>: con 1000 clientes, los hilos ilimitados matarían el PC</div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## Cómo interpretar los resultados

| Lo que ves | Qué significa |
| :--- | :--- |
| Tiempo ≈ n × tiempo_por_cliente | Tu servidor es **secuencial** (o el pool tiene 1 hilo) |
| Tiempo ≈ max(tiempo_por_cliente) | Tu servidor es **concurrente** (hilos o pool con suficientes workers) |
| Tiempo ≈ ceil(n/workers) × t | Tu pool trabaja en **tandas** |
| ❌ ConnectionRefused | El servidor no está arrancado o el puerto es otro |

<div class="success" style="margin-top:0.6rem;">
  💡 El benchmark también sirve para <strong>elegir el tamaño del pool</strong>: sube <code>max_workers</code> y mira dónde deja de mejorar el tiempo. Más hilos no siempre es más rápido.
</div>

---
class: compact-slide
---

## Mini-chequeo: benchmark

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Por qué el lanzador espera a todos los hilos/pool antes de cronometrar?
2. ¿Tiempo total con un pool de 3 hilos y 9 clientes que tardan 1s cada uno?
3. ¿La salida «Procesado» de uno en uno contra el servidor de qué delata?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.2rem;">
    <li>Sin esperar a que terminen todos, mediríamos <strong>antes de la última respuesta</strong>: total erróneo</li>
    <li><strong>~3 s</strong>: ceil(9/3) = 3 tandas de 3 clientes, 1s cada tanda</li>
    <li>Que es <strong>secuencial</strong>: total ≈ 9s en lugar de ~1-3s. El lanzador es la prueba del algodón</li>
  </ul>
</div>

---
---

## Sincronización en servidores
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Cuando varios hilos tocan la <strong>misma variable global</strong> (un contador de conexiones, un total de bytes), hay <strong>condición de carrera</strong>: dos hilos pueden leer y escribir a la vez y perder actualizaciones. La solución es el <strong>Lock</strong> de la U04.
  </div>
</div>

<div class="info" style="margin-top:0.7rem;">
  Un servidor real lleva <strong>estado</strong>: «¿cuántos clientes he atendido?», «¿cuántos bytes he recibido?». Ese estado es <strong>compartido</strong> entre todos los hilos… y eso es un problema.
</div>

---
class: compact-slide
---

## La condición de carrera del contador

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">contador_peligroso.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, threading
contador = 0  # variable global compartida
def atender(conn, addr):
    global contador
    contador += 1  # ¡NO es atomica!
    print(f"Total atendidos: {contador}")
    with conn:
        conn.recv(1024)
        conn.sendall(b"OK")</code></pre>
</div>

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>+= 1</code> se ejecuta en <strong>tres pasos</strong>: leer → sumar → guardar</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Hilo-A y Hilo-B <strong>leen el mismo valor</strong> (7) a la vez: los dos guardan 8</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">El contador debía ser <strong>9</strong> y quedó en <strong>8</strong>: <strong>una conexión perdida</strong> 💥</div>
    </div>
    <div class="warning" style="margin-top:0.4rem;">
      Regla de oro: si dos hilos modifican la misma variable, usa <strong>Lock</strong>. Mejor aún: <strong>evita compartir estado</strong>.
    </div>
  </div>
</div>

---
class: compact-slide
---

## El Lock en acción
### with lock: de la U04, en el servidor

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">contador_seguro.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.62rem;line-height:1.25;"><code>import socket, threading
contador = 0
lock = threading.Lock()
def atender(conn, addr):
    global contador
    with lock:  # nadie mas entra aqui
        contador += 1
        print(f"Total: {contador}")
    with conn:
        conn.recv(1024)
        conn.sendall(b"OK")
def servidor():
    with socket.socket() as srv:
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", 5000))
        srv.listen()
        while True:
            conn, addr = srv.accept()
            threading.Thread(target=atender, args=(conn, addr)).start()</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>with lock:</code> adquiere el lock al entrar y lo libera al salir, <strong>aunque haya una excepción</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Entre esas líneas <strong>un solo hilo a la vez</strong>: leer + sumar + guardar son ya individibles</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      Es el mismo patrón <code>with lock:</code> de la U04 · Sincronización: misma herramienta, distinto escenario.
    </div>
  </div>
</div>

---
---

## ¿Y el contador de bytes?
### Solo la variable compartida lleva Lock

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">total_bytes.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, threading
total_bytes = 0
lock = threading.Lock()
def atender(conn, addr):
    global total_bytes
    with conn:
        datos = conn.recv(1024)
    with lock:
        total_bytes += len(datos)  # actualizacion atomica
        print(f"{addr} envio {len(datos)} B -- Total: {total_bytes}")</code></pre>
</div>

<div class="warning" style="margin-top:0.5rem;">
  El <code>recv()</code> y el <code>sendall()</code> <strong>no</strong> necesitan lock (cada conexión es un socket distinto). Proteger de más — meter el <code>recv()</code> dentro del lock — convertiría el servidor en <strong>secuencial sin querer</strong>.
</div>

---
class: compact-slide
---

## Mini-chequeo: sincronización

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Por qué `contador += 1` no es una operación segura entre hilos?
2. ¿Qué necesita Lock en el servidor: el `recv()` del socket o la variable global?
3. ¿Qué pasaría si metes el `recv()` dentro del `with lock:`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.2rem;">
    <li>Se ejecuta en <strong>tres pasos</strong> (leer, sumar, guardar) que los hilos pueden entrelazar: se pierden actualizaciones</li>
    <li>La <strong>variable global</strong>: cada socket es independiente y no compite con otros</li>
    <li>Un hilo con el lock <strong>bloquearía a todos</strong> mientras espera datos: serializaríamos la concurrencia sin querer</li>
  </ul>
</div>

---
---

## ¿Cuántos hilos puede tener un servidor?
### Más allá de ~100, el context switch penaliza

| Nº de hilos | Efecto esperado |
| :--- | :--- |
| 1-10 | Sencillo, bajo consumo, poco paralelismo |
| ~100 | Punto de equilibrio razonable en un servidor de clase |
| Miles | Riesgo de agotar memoria y coste de context switch alto |

<div class="info" style="margin-top:0.6rem;">
  Cada vez que la CPU alterna entre hilos pierde tiempo en <strong>guardar y restaurar el estado</strong> (context switch). El rendimiento sube con los hilos… <strong>hasta un punto, y luego baja</strong>. Por eso el pool limita <code>max_workers</code>.
</div>

---
---

## Hilos colgados y fugas de recursos
### El hilo muerto no tumba el servidor… de golpe

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Un hilo colgado queda <strong>bloqueado</strong>, pero los demás <strong>siguen funcionando</strong>: la concurrencia te salva de un colapso total</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">El problema real: si no libera el socket, cada conexión abierta ocupa un <strong>file descriptor</strong> y memoria: <strong>fuga de recursos</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Con suficientes fugas, el servidor agota los descriptores y <strong>deja de aceptar</strong> conexiones</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      🛡️ Solución: <code>with conn:</code> cierra el socket sí o sí, aunque haya excepción. Y <code>conn.settimeout()</code> libera a los hilos que esperan datos que nunca llegan.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Hilo por cliente o ThreadPool
### En producción: ThreadPool siempre

| Criterio | Hilo por cliente | ThreadPool |
| :--- | :--- | :--- |
| Control de recursos | ❌ Ninguno | ✅ max_workers fijo |
| Escala a miles de conexiones | ❌ Satura el sistema | ✅ Encola y sirve de a N |
| Complejidad | ✅ Simple | ✅ Igual de simple (submit()) |
| Uso recomendado | Prototipos, clase | **Producción** |

<div class="info" style="margin-top:0.5rem;">
  🌊 ¿10.000 conexiones? Con <strong>hilo por cliente</strong> el sistema colapsa; con un <strong>pool de ~100 hilos + cola</strong> el servidor sobrevive. La alternativa que escala todavía mejor es <strong>asyncio</strong> (UD 10).
</div>

---
---

## Buenas prácticas
### El atender() a prueba de clientes que se caen

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">atender_blindado.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>def atender(conn, addr):
    with conn:
        try:
            datos = conn.recv(1024)
            conn.sendall(b"OK: " + datos)
        except (ConnectionResetError, BrokenPipeError):
            print(f"Cliente {addr} se desconecto a mitad")
        except OSError:
            print(f"Error de red con {addr}")</code></pre>
</div>

<div class="warning" style="margin-top:0.5rem;">
  Sin el <code>try/except</code>, un cliente que muere a mitad de conversación mata el hilo con un traceback: el servidor sobrevive, pero <strong>ensucia la consola</strong>. Lista rápida: <strong>limita hilos (pool) · cierra con <code>with conn:</code> · protege el estado (Lock) · usa timeouts · mide con el benchmark</strong>.
</div>

---
class: compact-slide
---

## Mini-chequeo: límites y prácticas

<div class="question-card">
  <span class="question-icon">🧠</span>
  Las tres de la entrevista:
</div>

1. ¿Por qué «miles de hilos» puede ser <em>peor</em> que «100 hilos»?
2. Un hilo se cuelga sin liberar su socket: ¿qué les pasa a los demás? ¿Y al servidor a largo plazo?
3. ¿Recibes 10.000 conexiones simultáneas: hilo por cliente, pool o qué?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li>Por el <strong>coste del context switch</strong> y la memoria de la pila de cada hilo: el rendimiento empeora a partir de cierto punto</li>
    <li>Los demás hilos <strong>siguen trabajando</strong>, pero la fuga de sockets agota descriptores: el servidor acabará <strong>dejando de aceptar</strong></li>
    <li><strong>ThreadPool de ~100 hilos con cola</strong>, o <strong>asyncio</strong> (UD 10). Nunca 10.000 hilos</li>
  </ul>
</div>

---
class: compact-slide
---

## Servidor concurrente completo
### servidor.py: bloque 01 + Lock + limpieza

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre style="font-size:0.5rem;line-height:1.15;"><code>import socket, threading
contador = 0
lock = threading.Lock()
def atender(conn, addr):
    global contador
    with lock:
        contador += 1
        print(f"[+] Cliente {addr} conectado -- total: {contador}")
    with conn:
        try:
            datos = conn.recv(1024)
            datos = datos.decode().strip()
            print(f"    Recibido: {datos}")
            conn.sendall(b"OK: " + datos.encode())
        except (ConnectionResetError, BrokenPipeError, OSError):
            print(f"    Cliente {addr} se desconecto a mitad")
    with lock:
        contador -= 1
        print(f"[-] Cliente {addr} desconectado -- total: {contador}")</code></pre>
</div>

---
---

## ¿Qué demuestra servidor.py?

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>Concurrencia</strong>: <code>accept()</code> → crear hilo → <code>start()</code> → volver a aceptar (bloque 01, punto 3)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Sincronización</strong>: el contador global solo se toca dentro de <code>with lock:</code> (punto 6)</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>Limpieza</strong>: <code>with conn:</code> cierra el socket sí o sí (buenas prácticas)</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Robustez</strong>: el <code>try/except</code> aguanta clientes que se caen a mitad de conversación</div>
</div>

<div class="info" style="margin-top:0.5rem;">
  Los hilos se nombran con <code>hilo.name = "hilo-" + str(n)</code> para trazarlos, y el punto de entrada usa la convención <code>if __name__ == "__main__":</code>.
</div>

---
class: compact-slide
---

## El bucle principal de servidor.py
### Listo para ejecutar

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor.py (final)</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>def servidor_concurrente():
    with socket.socket() as srv:
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", 5000))
        srv.listen()
        print("Servidor CONCURRENTE escuchando en 127.0.0.1:5000")
        while True:
            conn, addr = srv.accept()
            threading.Thread(
                target=atender, args=(conn, addr)
            ).start()
if __name__ == "__main__":
    servidor_concurrente()
# (el atender() con lock y try/except de la diapo anterior
#  va arriba del todo, junto a contador y lock)</code></pre>
</div>

---
---

## Cómo probarlos juntos
### Dos terminales, y el servidor en marcha

<div class="terminal" style="padding:0.8rem 1rem;font-size:0.8rem;">
  <div style="color:#94A3B8;font-size:0.75rem;">TERMINAL 1 (servidor)</div>
  <div><span class="prompt">$</span> python servidor.py</div>
  <div class="output">Servidor CONCURRENTE escuchando en 127.0.0.1:5000</div>
  <div class="output">[+] Cliente ('127.0.0.1', 52001) conectado -- total: 1</div>
  <div class="output">[+] Cliente ('127.0.0.1', 52002) conectado -- total: 2</div>
  <div class="output">...</div>
</div>

---
class: compact-slide
---

## El lanzador de clientes
### Terminal 2: 10 clientes a la vez + benchmark

<div class="two-cols" style="margin-top:0.25rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">lanzaclientes.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.62rem;line-height:1.28;"><code>import socket, threading, time
def cliente(id):
    try:
        with socket.socket() as s:
            s.connect(("127.0.0.1", 5000))
            s.sendall(f"Cliente-{id}\n".encode())
            resp = s.recv(1024)
            print(f"OK Cliente-{id}: {resp.decode().strip()}")
    except Exception as e:
        print(f"Fallo Cliente-{id}: {e}")
inicio = time.time()
hilos = []
for i in range(10):
    t = threading.Thread(target=cliente, args=(i,))
    t.start()
    hilos.append(t)
for t in hilos:
    t.join()
print(f"Tiempo total: {time.time() - inicio:.2f}s")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal" style="padding:0.7rem 1rem;font-size:0.75rem;">
      <div style="color:#94A3B8;font-size:0.72rem;">TERMINAL 2 (lanzador)</div>
      <div><span class="prompt">$</span> python lanzaclientes.py</div>
      <div class="output">OK Cliente-0: OK: Cliente-0</div>
      <div class="output">OK Cliente-1: OK: Cliente-1</div>
      <div class="output">...</div>
      <div class="output">Tiempo total: 2.01s</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      Si el servidor fuera secuencial, el tiempo sería <strong>10 × t</strong> y las respuestas llegarían de una en una. Kill: <strong>Ctrl+C</strong>.
    </div>
  </div>
</div>

---
---

## Sé el servidor
### Pool de 5 hilos. Llegan 10 clientes a la vez

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Tu <code>accept()</code> recibe las conexiones 1-5: cada tarea ocupa un <strong>hilo libre</strong> (hilo-1 a hilo-5)</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Llega la conexión-6: los 5 hilos están ocupados → <code>submit()</code> la <strong>encola</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Hilo-1 termina con la conexión-1 (responde, cierra con <code>with conn:</code>) → el pool lo <strong>reutiliza</strong> para la conexión-6</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content">Así hasta la conexión-10: <strong>dos tandas de 5</strong> → el ceil(10/5) del benchmark</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      Nunca se crea un hilo nuevo: 5 hilos + cola. El sistema <strong>no se ahoga</strong>.
    </div>
    <div class="info" style="margin-top:0.5rem;">
      ¿10.000 conexiones? El pool encola y sirve de a 5: tardan más, pero el servidor <strong>sobrevive</strong>. Para esa escala, asyncio (UD 10) es aún más ligero.
    </div>
  </div>
</div>

---
---

## ¿Quién soy?
### Adivina el concepto

<div class="two-cols">
  <div class="left">
    <ol style="font-size:0.95rem;">
      <li>Soy el <code>accept()</code> que se atasca mientras se procesa al cliente anterior</li>
      <li>Soy la llamada que entrega la tarea al pool y devuelve un Future</li>
      <li>Soy la analogía del servidor secuencial: una sola ventanilla para toda la cola</li>
    </ol>
  </div>
  <div class="right">
    <ol style="font-size:0.95rem;" start="4">
      <li>Soy la fórmula del benchmark: te digo en cuántas tandas se atienden N clientes con W hilos</li>
      <li>Soy la variable global que dos hilos pueden pisar sin Lock</li>
      <li>Soy lo que mide cuánto tarda en responder un servidor con N clientes a la vez</li>
    </ol>
  </div>
</div>

<div class="answer-card" style="margin-top:0.6rem;">
  <strong>🔄 Respuestas:</strong> 1. el bucle secuencial · 2. <code>pool.submit()</code> · 3. la ventanilla única · 4. <code>ceil(N/W)</code> · 5. el contador sin Lock (condición de carrera) · 6. el benchmark
</div>

---
---

## Resumen del bloque 02

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧪</span><strong>Benchmark</strong><br>n × t · max(t) · ceil(n/w) × t</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔒</span><strong>Lock</strong><br>with lock: en lo compartido; sockets sin lock</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔢</span><strong>Límites</strong><br>~100 hilos razonables; fugas de sockets</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏗️</span><strong>Completo</strong><br>servidor.py + lanzaclientes.py + Lock</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⭐</span><strong>Regla</strong><br>Pool + with conn: + Lock + timeout + benchmark</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  Unidad cerrada. Para la entrevista: recorre la cadena <strong>secuencial → cliente lento → hilo por cliente → ThreadPool → Lock → benchmark</strong>.
</div>

---
layout: closing
---
