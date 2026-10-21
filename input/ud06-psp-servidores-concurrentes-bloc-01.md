---
layout: cover
---

# Unidad 06 — Servidores concurrentes<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🐢</span><strong>Servidor secuencial</strong><br>Un cliente cada vez</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🥶</span><strong>La espera</strong><br>Un cliente lento congela la cola</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚀</span><strong>Hilo por cliente</strong><br>threading.Thread por conexión</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⚡</span><strong>ThreadPool</strong><br>max_workers + cola interna</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧭</span><strong>El camino</strong><br>Del límite lineal a la producción</div>
</div>

<p style="margin-top:0.7rem;">Partimos del servidor de la UD 05, que atiende <strong>de uno en uno</strong>. En el bloque 02: <strong>benchmark</strong>, <strong>Lock</strong> para el estado compartido, límites y el <strong>servidor concurrente completo</strong>.</p>

---
---

## Servidor secuencial
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un servidor <strong>secuencial</strong> atiende a un cliente cada vez: <code>accept()</code> recibe la conexión, la procesa hasta el final y solo entonces vuelve a aceptar. Los demás esperan en la <strong>cola del socket</strong>.
  </div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Los clientes ya conectados <strong>no ven ningún error</strong>: la conexión TCP la acepta el <strong>sistema operativo</strong>. Pero tu código no los atiende: están <strong>en cola</strong>, invisibles para el programa.
</div>

---
class: compact-slide
---

## El servidor secuencial
### El ejemplo clásico, con work pesado simulado

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_lento.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, time
def servidor_lento():
    with socket.socket() as srv:
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", 5000))
        srv.listen()
        print("🐢 Servidor SECUENCIAL: 1 cliente cada vez")
        while True:
            conn, addr = srv.accept()
            print(f"  Cliente {addr} conectado")
            time.sleep(3)  # simula trabajo pesado
            conn.sendall(b"Procesado\n")
            conn.close()
            print(f"  Cliente {addr} atendido")</code></pre>
</div>

<div class="info" style="margin-top:0.5rem;">
  El bucle hace: <strong>acepta → procesa (3s) → cierra → acepta de nuevo</strong>. Mientras procesa, el siguiente <code>accept()</code> no se ejecuta: <strong>nadie más entra</strong.
</div>

---
---

## La traza: 3 clientes a la vez
### Sé el servidor secuencial

| Cliente | Conecta | Es atendido | Total de espera |
| :--- | :--- | :--- | :--- |
| **Cliente-1** | t = 0 s | t = 3 s | 3 s |
| **Cliente-2** | t = 0,1 s | t = 6 s | ~6 s |
| **Cliente-3** | t = 0,2 s | t = 9 s | ~9 s |

<div class="two-cols" style="margin-top:0.7rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Los tres conectan a la vez: el SO los mete en la <strong>cola del socket</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>accept()</code> los va <strong>recogiendo de uno en uno</strong>, tras cerrar al anterior</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Resultado: el tiempo total crece <strong>linealmente</strong>: <strong>n × tiempo_por_cliente</strong></div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Con hilos, los tres terminarían a los <strong>3 s</strong>: eso lo construimos en el punto 3.
    </div>
  </div>
</div>

---
---

## El problema de la espera
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El problema del secuencial no es el número de clientes, sino el <strong>cliente lento</strong>: uno que tarde 3 segundos (o 30) congela a <strong>todos</strong> los que esperan detrás.
  </div>
</div>

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">El trabajo de cada cliente (cálculo pesado, base de datos lenta, una red de 56k…) <strong>bloquea el <code>accept()</code></strong></div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El cliente más rápido del mundo espera a que termine <strong>el más lento</strong></div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Una petición de 30s pone a <strong>toda la cola</strong> a esperar 30s… y al que llega detrás, otros 30s</div>
</div>

---
---

## La ventanilla única
### La analogía del banco

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p><strong>🏦 Ventanilla única (secuencial)</strong></p>
    <p>10 personas en fila: la 1 tarda 3 min y las otras 9 esperan. Ya están «en el banco» (conectadas al socket), pero su trámite <strong>no empieza</strong>.</p>
  </div>
  <div class="comparison-item good">
    <p><strong>🏢 Ventanillas múltiples (concurrente)</strong></p>
    <p>Cada persona tiene su ventanilla: <strong>todas avanzan a la vez</strong>. Diez ventanillas= diez clientes atendidos en paralelo.</p>
  </div>
</div>

| Situación | Secuencial | Concurrente |
| :--- | :--- | :--- |
| 10 clientes, 2s cada uno | ~20 segundos | ~2 segundos |
| 1 cliente lento de 30s | Todos esperan +30s | Solo el lento tarda 30s |
| Picos de conexiones | La cola crece sin límite visible | Se atienden en paralelo |

---
class: compact-slide
---

## Mini-chequeo: secuencial y espera

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Por qué los clientes 2 y 3 «se conectan» sin error pero no reciben respuesta?
2. Si 5 clientes conectan a la vez y cada uno tarda 2s, ¿cuánto espera el quinto?
3. ¿Qué línea del código es la que se «atasca» mientras se procesa un cliente?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>La conexión TCP la acepta el <strong>sistema operativo</strong> (cola del socket); el <code>accept()</code> del código no llega a ejecutarse</li>
    <li>Empieza a ser atendido a los <strong>8 s</strong> y termina a los <strong>10 s</strong>: n × tiempo_por_cliente</li>
    <li>La atención al cliente (<code>time.sleep(3)</code>): bloquea el bucle y el siguiente <code>accept()</code> no se ejecuta</li>
  </ul>
</div>

---
---

## Hilo por cliente
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    En lugar de atender al cliente dentro del bucle, el servidor <strong>lanza un hilo por cada cliente</strong> y vuelve inmediatamente a <code>accept()</code>. Cada conexión tiene su propia «ventanilla».
  </div>
</div>

<div class="two-cols" style="margin-top:0.7rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>No hay trabajo en el bucle</strong>: <code>accept()</code> → crear hilo → <code>start()</code> → vuelta a <code>accept()</code>. El bucle nunca se bloquea</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong><code>conn</code> se pasa como argumento</strong>: cada hilo recibe su socket y su dirección, y los libera con <code>with conn:</code></div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## El servidor multihilo
### Hilos en paralelo, del módulo de la U03

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_multihilo.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, threading, time
def atender(conn, addr):
    with conn:
        datos = conn.recv(1024)
        time.sleep(2)  # simular trabajo pesado
        conn.sendall(b"OK: " + datos)
        print(f"[-] Cliente {addr} atendido")
def servidor_multihilo():
    with socket.socket() as srv:
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", 5000))
        srv.listen()
        print("🚀 Servidor MULTIHILO: varios clientes a la vez")
        while True:
            conn, addr = srv.accept()
            hilo = threading.Thread(target=atender, args=(conn, addr))
            hilo.start()</code></pre>
</div>

<div class="success" style="margin-top:0.4rem;">
  🧵 Los hilos se nombran con <code>hilo.name = "hilo-" + str(n)</code> si necesitas trazarlos (convención del módulo).
</div>

---
---

## Be the code: multihilo en acción
### Sé el servidor. 3 clientes conectan a la vez

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>accept()</code> devuelve la <strong>conexión-1</strong> → nace <code>Thread(target=atender)</code> → <code>start()</code></div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El hilo-1 duerme en <code>time.sleep(2)</code>… y el hilo principal <strong>ya está de nuevo en <code>accept()</code></strong></div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Llegan las conexiones-2 y -3 → hilo-2 e hilo-3 arrancan <strong>en paralelo</strong> con el hilo-1</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">A los 2s, los tres clientes reciben su «OK» <strong>a la vez</strong>: nadie esperó en cola</div>
</div>

<div class="info" style="margin-top:0.6rem;">
  El hilo principal <strong>nunca se detiene</strong>. El trabajo pesado vive en los hilos secundarios, que corren en paralelo gracias al <strong>threading</strong> de la U03.
</div>

---
---

## Ventajas y el primer cuidado

| Ventaja | Explicación |
| :--- | :--- |
| ✅ Simple de escribir | Solo un `threading.Thread(target=atender, args=(conn, addr))` |
| ✅ Aprovecha la CPU | Varios clientes procesados de verdad en paralelo |
| ✅ El bucle no se bloquea | `accept()` vuelve al instante; nadie queda en cola |

<div class="warning" style="margin-top:0.6rem;">
  La letra pequeña: <strong>un hilo por cliente puede saturar el sistema con 10.000 conexiones</strong>. Cada hilo consume memoria (pila de ejecución) y el SO debe alternar entre todos. Ahí entra el <strong>ThreadPool</strong> (siguiente punto).
</div>

---
class: compact-slide
---

## Mini-chequeo: hilo por cliente

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué hace el hilo principal mientras un hilo secundario procesa a su cliente?
2. ¿Por qué NO hace falta `join()` en el bucle principal del servidor?
3. ¿Qué pasaría con este código si llegan 10.000 conexiones a la vez?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Vuelve a <strong>accept()</strong>: por eso el servidor nunca se bloquea y nadie espera en cola</li>
    <li>Un <code>join()</code> esperaría a que el hilo terminara… y <strong>volveríamos al secuencial</strong>. El <code>join()</code> solo se usa en el lanzador de clientes</li>
    <li>10.000 hilos: sin memoria o cambio de contexto degradado. La solución es el <strong>ThreadPool</strong></li>
  </ul>
</div>

---
class: compact-slide
---

## ThreadPoolExecutor
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>ThreadPoolExecutor</strong> reutiliza un <strong>número fijo de hilos</strong>: si llegan más clientes que hilos, esperan en una cola interna en lugar de multiplicar los hilos.
  </div>
</div>

<div class="info" style="margin-top:0.4rem;">
  El pool es un <strong>equipo de camareros limitado</strong>: 10 camareros para todas las mesas, no un camarero nuevo por cada mesa. «Si el pool se llena, los clientes esperan» suena a defecto, pero es la <strong>protección</strong> que buscamos.
</div>

<div class="warning" style="margin-top:0.5rem;">
  Con hilos ilimitados y 10.000 conexiones: cada hilo consume su <strong>pila de memoria</strong>, el SO pierde la vida en <strong>context switches</strong> y el proceso puede <strong>morir sin memoria</strong>.
</div>

---
class: compact-slide
---

## El servidor con pool
### El mismo servicio, con recursos bajo control

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_pool.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, concurrent.futures
MAX_HILOS = 10
def atender(conn, addr):
    with conn:
        datos = conn.recv(1024)
        conn.sendall(b"OK: " + datos)
def servidor_pool():
    with socket.socket() as srv:
        srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        srv.bind(("127.0.0.1", 5000))
        srv.listen()
        with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_HILOS) as pool:
            print(f"⚡ Servidor con Pool de {MAX_HILOS} hilos")
            while True:
                conn, addr = srv.accept()
                pool.submit(atender, conn, addr)</code></pre>
</div>

<p style="font-size:0.85rem;margin-top:0.3rem;">⚡ <code>submit()</code> devuelve un <strong>Future</strong>, pero en un servidor no lo usamos: solo nos interesa que la tarea se ejecute.</p>

---
---

## Dos piezas nuevas
### max_workers y submit()

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>ThreadPoolExecutor(max_workers=10)</code> crea el <strong>equipo de hilos</strong>. Se usa como contexto (<code>with ... as pool</code>) para que se cierre solo al salir</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Se crea <strong>una sola vez</strong>, fuera del bucle <code>while True</code>: es un recurso que vive toda la vida del servidor</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>pool.submit(atender, conn, addr)</code> sustituye a <code>Thread(...).start()</code>: entrega la tarea y el pool decide qué hilo libre la coge</div>
    </div>
    <div class="success" style="margin-top:0.5rem;">
      ¿El cliente-11 con todos los hilos ocupados? Su tarea <strong>espera en la cola interna</strong> del pool. No se crea ningún hilo nuevo.
    </div>
  </div>
</div>

---

## ¿Qué tamaño de pool elegir?
### Reglas de oro (mediremos de verdad en el bloque 02)

| Situación | Tamaño razonable |
| :--- | :--- |
| Servidor de prueba / clase | 5-10 hilos |
| **CPU intensivo** (cálculo puro) | Nº de núcleos de la CPU |
| **I/O intensivo** (red, discos, APIs) | Más hilos que núcleos: los hilos esperan mucho en I/O |

<div class="info" style="margin-top:0.7rem;">
  💡 En un servidor casi todo es <strong>espera de E/S</strong> (recv, discos, bases de datos): por eso en producción conviene <strong>más hilos que núcleos</strong>. Pero no infinitos: lo vemos en la unidad de límites.
</div>

---
class: compact-slide
---

## Mini-chequeo: ThreadPool

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué pasa con el cliente-11 si el pool tiene `max_workers=10` y todos están ocupados?
2. ¿Qué ventaja tiene reutilizar hilos frente a crear uno nuevo por cliente?
3. ¿Por qué el pool se crea fuera del bucle `while True`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>El <code>submit()</code> lo <strong>encola</strong>: espera a que se libere un hilo. No se satura el sistema</li>
    <li>Evita el coste de <strong>crear y destruir hilos</strong> constantemente: los mismos hilos se reutilizan una y otra vez</li>
    <li>Crearlo dentro del bucle significaría crear (y cerrar) un pool <strong>en cada conexión</strong>: un desperdicio enorme</li>
  </ul>
</div>

---
---

## Resumen del bloque 01

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🐢</span><strong>Secuencial</strong><br>Un cliente cada vez; n × tiempo_por_cliente</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🥶</span><strong>Espera</strong><br>El cliente lento bloquea el accept()</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚀</span><strong>Hilo por cliente</strong><br>Thread(target, args) + start(); paralelo real</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⚡</span><strong>ThreadPool</strong><br>max_workers fijos + cola interna; producción</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛡️</span><strong>Vocabulario</strong><br>accept() · cola del socket · context switch · submit()</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  Bloque 02: <strong>benchmark</strong> con lanzador masivo de clientes, <strong>Lock</strong> para el estado compartido, <strong>límites y buenas prácticas</strong> y el <strong>servidor concurrente completo</strong>.
</div>

---
layout: closing
---
