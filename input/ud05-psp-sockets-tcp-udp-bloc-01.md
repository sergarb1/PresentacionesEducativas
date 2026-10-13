---
layout: cover
---

# Unidad 05 — Sockets TCP y UDP<br>Bloque 01

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📬</span><strong>El socket</strong><br>IP, puerto y protocolo</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🖥️</span><strong>Cliente TCP</strong><br>connect · sendall · recv</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏙️</span><strong>Servidor TCP</strong><br>bind · listen · accept</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🤝</span><strong>Handshake</strong><br>SYN · ACK · FIN · TIME_WAIT</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛡️</span><strong>Errores</strong><br>Timeouts, excepciones y select</div>
</div>

<p style="margin-top:0.7rem;">Todo con <code>socket</code>: la librería estándar de Python para redes. En el bloque 02: <strong>UDP</strong>, <strong>HTTP y NTP</strong> y la <strong>práctica eco</strong>.</p>

---
---

## Qué es un socket
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>socket</strong> es el punto final de una conexión de red: la interfaz que tu programa usa para <strong>enviar y recibir datos</strong> a través de la red.
  </div>
</div>

Piensa en una llamada telefónica: marcas, esperas a que contesten, habláis y colgáis. Tu teléfono es el **socket**; el número que marcas, la **IP**; y la extensión a la que pides hablar, el **puerto**. Sin ese trío no hay conversación posible.

<div class="info" style="margin-top:0.6rem;">
  Según cómo hable el socket, será <strong>TCP</strong> (la carta certificada) o <strong>UDP</strong> (el avión de papel). Esa elección marca toda la unidad.
</div>

---
---

## IP y puerto
### El «quién» y el «dónde»

| Concepto | Qué identifica | Ejemplo |
| :--- | :--- | :--- |
| **IP** | La máquina en la red | `127.0.0.1` · `192.168.1.10` |
| **Puerto** | El programa dentro de la máquina | `80` (web) · `5000` · `9000` |

<div class="two-cols" style="margin-top:0.7rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">🏠</div>
      <div class="step-content"><code>127.0.0.1</code> es <strong>localhost</strong>: tu propia máquina. Perfecto para pruebas sin red real.</div>
    </div>
    <div class="step">
      <div class="step-number">🔢</div>
      <div class="step-content">Un puerto va del <strong>0 al 65535</strong>: el SO reserva los conocidos (80 web, 443 HTTPS); para tus programas usa <strong>puertos altos</strong> (5000, 9000).</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      La pareja <strong>(IP, puerto)</strong> se llama <em>dirección de socket</em> o <em>endpoint</em>, y en Python se pasa como una tupla: <code>("127.0.0.1", 5000)</code>.
    </div>
  </div>
</div>

---
---

## Crear un socket en Python
### Una línea que decide el protocolo

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">primer_socket.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket
# Crear un socket TCP
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)</code></pre>
</div>

| Parámetro | Significado |
| :--- | :--- |
| `AF_INET` | Familia de direcciones: **IPv4** (`AF_INET6` para IPv6) |
| `SOCK_STREAM` | Socket **TCP**: orientado a conexión, fiable |
| `SOCK_DGRAM` | Socket **UDP**: sin conexión, datagramas sueltos |

<div class="success" style="margin-top:0.5rem;">
  💡 Truco para no liarte: <strong>D</strong>GRAM = datagramas sueltos (<strong>UDP</strong>); <strong>S</strong>TREAM = flujo continuo (<strong>TCP</strong>).
</div>

---
---

## La analogía del bloque
### Carta certificada contra avión de papel

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>📜 TCP: la carta certificada</strong></p>
    <p>Pagas más, el cartero confirma la entrega y, si se pierde, <strong>se reenvía</strong>. Sabes que llegó… y en el orden correcto.</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>✈️ UDP: el avión de papel</strong></p>
    <p>Lo lanzas desde el balcón y lo olvidas. Si aterriza, bien; si el viento se lo lleva, también. Pero lanzas <strong>cien</strong> en lo que tardas una carta.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Esas dos filosofías definen el resto de la unidad: <strong>fiabilidad contra velocidad</strong>.
</div>

---
---

## TCP vs UDP cara a cara
### La tabla que hay que saberse

| Característica | TCP | UDP |
| :--- | :--- | :--- |
| **Conexión** | Sí (handshake) | No |
| **Entrega garantizada** | Sí | No |
| **Orden** | Sí | No |
| **Velocidad** | Más lento | Más rápido |
| **Uso típico** | Web, correo, FTP | Streaming, juegos, DNS |

<div class="info" style="margin-top:0.6rem;">
  Las tres filas de «No» son, paradójicamente, la razón de que <strong>UDP sea tan rápido</strong>: nada de confirmaciones ni reenvíos. Las hablaremos en el bloque 02.
</div>

---
class: compact-slide
---

## Mini-chequeo: el socket

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué identifica la **IP** y qué identifica el **puerto**?
2. ¿Qué representa `127.0.0.1` y para qué sirve?
3. ¿Qué constante de Python crea un socket **TCP** y cuál uno **UDP**?
4. ¿Qué garantiza TCP que UDP no garantiza? (tres cosas)

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>La IP identifica la <strong>máquina</strong>; el puerto, el <strong>programa</strong> dentro de ella</li>
    <li>Es <strong>localhost</strong>: tu propia máquina, para pruebas sin red real</li>
    <li><code>SOCK_STREAM</code> para TCP y <code>SOCK_DGRAM</code> para UDP, ambos con <code>AF_INET</code></li>
    <li><strong>Conexión</strong> (handshake), <strong>entrega garantizada</strong> y <strong>orden</strong></li>
  </ul>
</div>

---
---

## Cliente TCP
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El cliente TCP <strong>marca el número</strong>: crea el socket, se conecta con <code>connect()</code>, envía con <code>sendall()</code>, recibe con <code>recv()</code> y cierra.
  </div>
</div>

Es el lado que **inicia la conversación**: en la analogía del teléfono, eres tú marcando el número y esperando a que contesten. Sin cliente, el servidor esperaría en el puerto para siempre.

---
---

## El ciclo de vida del cliente
### Cuatro pasos, siempre en orden

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>socket()</code> → <strong>crear</strong> el punto final de la conexión</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>connect((HOST, PORT))</code> → <strong>conectar</strong>: dispara el three-way handshake</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>sendall()</code> / <code>recv()</code> → <strong>hablar</strong>: enviar y recibir bytes</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><code>close()</code> → <strong>cerrar</strong>. El <code>with</code> de Python lo hace solo al salir del bloque</div>
</div>

---
---

## El cliente TCP mínimo
### Resuelto, de arriba a abajo

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">cliente.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket
HOST, PORT = "127.0.0.1", 5000
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as cliente:
    cliente.connect((HOST, PORT))        # 1. conectar
    cliente.sendall(b"Hola servidor!")   # 2. enviar
    respuesta = cliente.recv(1024)       # 3. recibir
    print(f"Respuesta: {respuesta.decode()}")</code></pre>
</div>

<div class="terminal">
  <div><span class="prompt">$</span> python cliente.py</div>
  <div class="output">Respuesta: Recibido: Hola servidor!</div>
</div>

---
---

## Cada método, al detalle

| Método | Qué hace | ¿Cuándo? |
| :--- | :--- | :--- |
| `socket(AF_INET, SOCK_STREAM)` | Crea el socket TCP | Siempre, lo primero |
| `connect((HOST, PORT))` | Establece la conexión (handshake) | Antes de hablar |
| `sendall(datos)` | Envía **todos** los bytes | Cuando quieras mandar |
| `recv(1024)` | Recibe hasta 1024 bytes | Cuando esperes respuesta |
| `close()` / `with` | Libera la conexión | Al terminar |

<div class="warning" style="margin-top:0.6rem;">
  <code>connect()</code> lanza <strong>ConnectionRefusedError</strong> si no hay nadie escuchando en ese puerto. Y <code>recv(1024)</code> no es un límite absoluto: es el <strong>tamaño máximo del buffer</strong>; un mensaje mayor exige varios <code>recv()</code> y concatenar.
</div>

---
---

## Be the code: el cliente, paso a paso
### Sé el cliente. Cada paso, cada byte

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>socket(AF_INET, SOCK_STREAM)</code> → nace el socket <code>cli</code></div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>connect(("127.0.0.1", 5000))</code> → three-way handshake por la red</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>sendall(b"Hola servidor!")</code> → los bytes salen hacia el servidor</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><code>recv(1024)</code> → esperando respuesta... ⏳ (¡<strong>bloqueante</strong>!)</div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><code>print(...)</code> y <code>close()</code> → el <code>with</code> cuelga el teléfono</div>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <code>recv()</code> se queda esperando hasta que lleguen datos: si el servidor nunca responde, el programa queda colgado. La salida de emergencia son los <strong>timeouts</strong> (última parte de este bloque).
</div>

---
---

## Mini-chequeo: cliente TCP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué método establece la conexión y qué error lanza si no hay nadie escuchando?
2. ¿Por qué usar `sendall()` y no `send()`?
3. ¿Qué hace `recv(1024)` y por qué no es un límite absoluto?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><code>connect((HOST, PORT))</code>, que lanza <strong>ConnectionRefusedError</strong> sin servidor en ese puerto</li>
    <li><code>sendall()</code> garantiza el envío de <strong>todos los bytes</strong>; <code>send()</code> puede mandar solo una parte</li>
    <li>Recibe <strong>hasta 1024 bytes</strong> por llamada: es el máximo del buffer; mensajes mayores requieren varios <code>recv()</code> concatenados</li>
  </ul>
</div>

---
---

## Servidor TCP
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El servidor TCP <strong>descolgó primero</strong>: reserva un puerto con <code>bind()</code>, avisa con <code>listen()</code> y se queda esperando con <code>accept()</code> a que un cliente llame.
  </div>
</div>

Es la otra cara de la moneda del punto anterior: el que **escucha**. Sin `bind()` no tiene puerto; sin `listen()` no anuncia que espera llamadas; sin `accept()` no recibe a nadie.

---
---

## El ciclo de vida del servidor
### Seis pasos: descolgar y atender

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>socket()</code> → crear el socket</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>bind((HOST, PORT))</code> → <strong>reservar</strong> la dirección y el puerto</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>listen()</code> → <strong>anunciar</strong> que espera conexiones entrantes</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><code>accept()</code> → el «¿diga?»: espera a que suene el timbre (bloqueante)</div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><code>recv()</code> / <code>sendall()</code> → hablar con el cliente conectado</div>
</div>
<div class="step">
  <div class="step-number">6</div>
  <div class="step-content"><code>close()</code> / <code>with</code> → cerrar la conversación</div>
</div>

---
class: compact-slide
---

## El servidor TCP mínimo
### Con el with cerrando solo

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre style="font-size:0.7rem;"><code>import socket
HOST, PORT = "127.0.0.1", 5000   # localhost
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as servidor:
    servidor.bind((HOST, PORT))              # 1. reservar puerto
    servidor.listen()                        # 2. anunciar escucha
    print(f"Servidor escuchando en {HOST}:{PORT}")
    conexion, direccion = servidor.accept()  # 3. esperar cliente (BLOQUEANTE)
    with conexion:
        datos = conexion.recv(1024)          # 4. recibir
        print(f"Recibido: {datos.decode()}")
        conexion.sendall(b"Recibido: " + datos)  # 5. responder</code></pre>
</div>

<div class="terminal" style="padding:0.7rem 1rem;font-size:0.78rem;">
  <div><span class="prompt">$</span> python servidor.py</div>
  <div class="output">Servidor escuchando en 127.0.0.1:5000</div>
  <div class="output">Conectado con ('127.0.0.1', 54321)</div>
  <div class="output">Recibido: Hola servidor!</div>
</div>

---
---

## Cada método del servidor, al detalle

| Método | Qué hace | ¿Cuándo? |
| :--- | :--- | :--- |
| `bind((HOST, PORT))` | Reserva la dirección y el puerto | Antes de escuchar |
| `listen()` | Prepara el socket para conexiones | Tras el bind |
| `accept()` | Espera un cliente: devuelve `(conexion, direccion)` | En bucle |
| `recv(1024)` | Recibe datos del cliente conectado | Cuando llegan |
| `sendall(datos)` | Envía la respuesta | Cuando hay que contestar |

<div class="info" style="margin-top:0.6rem;">
  Fíjate: a partir de <code>accept()</code> todo se hace con <strong>conexion</strong>, no con <strong>servidor</strong>. El socket servidor solo escucha; <code>conexion</code> es el canal de esa llamada concreta.
</div>

---
---

## El bucle de atención
### Atender a más de un cliente

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_bucle.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>while True:
    conexion, direccion = servidor.accept()
    print(f"Conectado con {direccion}")
    with conexion:
        datos = conexion.recv(1024)
        print(f"Recibido: {datos.decode()}")
        conexion.sendall(b"Recibido: " + datos)</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Con este código básico el servidor atiende <strong>un cliente cada vez</strong>: si llega un segundo mientras el primero habla, se queda en la cola de <code>listen()</code>. Para atender varios a la vez hacen falta hilos o <code>select()</code>: eso es la <strong>UD 06 · Servidores concurrentes</strong>.
</div>

---
---

## Pool puzzle: ordena el servidor
### ¿Formas un servidor TCP funcional?

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">desordenado.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>a) with socket.socket() as srv:
b)     srv.listen()
c)     conn, addr = srv.accept()
d) import socket
e)     conn.sendall(b"Bienvenido\n")
f)     srv.bind(("127.0.0.1", 5000))
g)     with conn:
h)         datos = conn.recv(1024)</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="answer-card">
      <strong>🔓 Solución:</strong> d → a → f → b → c → g → h → e
    </div>
    <div class="warning" style="margin-top:0.6rem;">
      <strong>Errores típicos:</strong>
      <ul style="font-size:0.9rem;margin-top:0.3rem;">
        <li><code>listen()</code> antes de <code>bind()</code> → <code>OSError</code></li>
        <li><code>accept()</code> fuera del <code>with</code> → el socket se cierra</li>
        <li><code>sendall()</code> antes de <code>recv()</code> → no es el protocolo típico (el cliente habla primero)</li>
      </ul>
    </div>
  </div>
</div>

---
---

## Mini-chequeo: servidor TCP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué tres métodos preparan el servidor antes de atender a nadie?
2. ¿Qué devuelve `accept()` y por qué es bloqueante?
3. Tras `accept()`, ¿con qué objeto se recibe y envía: `servidor` o `conexion`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><code>socket()</code>, <code>bind((HOST, PORT))</code> y <code>listen()</code></li>
    <li>La tupla <strong>(conexion, direccion)</strong>: el canal de la conversación y la dirección del cliente. Bloqueante: espera a que un cliente llame</li>
    <li>Con <strong>conexion</strong>: <code>servidor</code> solo escucha; <code>conexion</code> es el canal de esa llamada</li>
  </ul>
</div>

---
---

## Three-way handshake
### El saludo que abre toda conexión TCP

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud05-psp-sockets-handshake.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame :deep(svg) { max-height: 340px; }
</style>

---
---

## El cierre de la conexión
### La despedida: FIN y ACK

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>FIN</strong>: quien quiere cerrar avisa: «no tengo más que enviar»</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>ACK</strong>: el otro lado confirma y, cuando termina, envía su propio FIN</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>ACK</strong>: el primero confirma y la conexión se libera</div>
</div>

<div class="info" style="margin-top:0.6rem;">
  En Python no gestionas el cierre a mano: el <code>with</code> (o <code>close()</code>) hace que el SO ejecute esta despedida. Pero <strong>no es instantáneo</strong>: el puerto queda retenido en estado <strong>TIME_WAIT</strong> durante un tiempo breve → siguiente diapositiva.
</div>

---
---

## TIME_WAIT y «Address already in use»
### El puerto que queda retenido

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">el_sorpresa.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code># 1ª ejecución del servidor: todo bien
srv.bind(("127.0.0.1", 5000))   # ✅ OK
# Matas el servidor con Ctrl+C y lo relanzas al instante...
srv.bind(("127.0.0.1", 5000))   # 💥 OSError: Address already in use</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Tras el cierre, la conexión entra en <strong>TIME_WAIT</strong> (típicamente 1-2 min): el SO mantiene reservado el par (IP, puerto) para que los últimos FIN/ACK no queden huérfanos. Es <strong>protección, no burocracia</strong>... pero para quien reinicia su servidor mil veces al día, un estorbo.
</div>

---
class: compact-slide
---

## SO_REUSEADDR
### Reinicia tu servidor sin esperar

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_reutiliza.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket
servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
servidor.bind(("127.0.0.1", 5000))
servidor.listen()</code></pre>
</div>

| Pieza | Significado |
| :--- | :--- |
| `SOL_SOCKET` | Nivel de opciones del propio socket |
| `SO_REUSEADDR` | La opción que permite reutilizar la dirección |
| `1` | Activa la opción (0 la desactivaría) |

<div class="success" style="margin-top:0.5rem;">
  El SO deja hacer <code>bind()</code> aunque queden conexiones en TIME_WAIT: mata y reinicia cuando quieras. <strong>Pon esto siempre</strong> en tus servidores: te ahorrará minutos de depuración.
</div>

---
class: compact-slide
---

## Las redes fallan
### try/except y timeouts: tu red de seguridad

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">conectar_seguro.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.7rem;line-height:1.35;"><code>import socket, time
def conectar_seguro(host, port, reintentos=3):
    for intento in range(reintentos):
        try:
            with socket.socket() as s:
                s.settimeout(5)
                s.connect((host, port))
                s.sendall(b"test")
                return s.recv(1024)
        except socket.timeout:
            print(f"⏱ Timeout (intento {intento+1})")
        except ConnectionRefusedError:
            print("🚫 ¿El servidor está encendido?")
            time.sleep(1)
        except ConnectionResetError:
            print("💥 Cerraron la conexión de golpe")
        except OSError as e:
            print(f"🔌 Error de red: {e}")
    return None</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">1</div>
      <div class="step-content" style="font-size:0.9rem;"><code>settimeout(5)</code>: si algo tarda más de 5s, lanza <code>socket.timeout</code> en vez de bloquearse para siempre</div>
    </div>
    <div class="step" style="margin-bottom:0.35rem;">
      <div class="step-number">2</div>
      <div class="step-content" style="font-size:0.9rem;">Un <code>except</code> por excepción: cada fallo tiene su propio tratamiento</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content" style="font-size:0.9rem;">Reintenta hasta 3 veces; si no, <code>return None</code>: el llamador sabe que falló</div>
    </div>
  </div>
</div>

---
---

## El mapa de excepciones
### Cada error, su tratamiento

| Excepción | Cuándo ocurre |
| :--- | :--- |
| `socket.timeout` | La operación excede el tiempo límite |
| `ConnectionRefusedError` | No hay nadie escuchando en ese puerto |
| `ConnectionResetError` | El otro lado cerró de golpe |
| `ConnectionAbortedError` | El SO local aborta la conexión |
| `BrokenPipeError` | Escribes en un socket que ya se cerró |
| `OSError` | Red caída, DNS que no resuelve, etc. |

<div class="info" style="margin-top:0.6rem;">
  💡 Regla práctica: captura primero las <strong>específicas</strong> (timeout, ConnectionReset, BrokenPipe) y deja <code>OSError</code> como última red de seguridad.
</div>

---
---

## Non-blocking y select
### Tres formas de controlar la espera

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">esperas.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, select
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(5.0)      # Opción 1: timeout fijo
s.setblocking(False)   # Opción 2: no bloqueante (excepción si no hay datos)
# Opción 3: select, esperar con timeout en varios sockets
lectura, _, _ = select.select([s], [], [], 1.0)
if lectura:
    datos = s.recv(1024)</code></pre>
</div>

<div class="info" style="margin-top:0.6rem;">
  <code>select.select()</code> espera en <strong>varios sockets a la vez sin hilos</strong>: le pasas la lista y te avisa cuáles están listos. Lo usarás a fondo en la <strong>UD 06 · Servidores concurrentes</strong>.
</div>

---
class: compact-slide
---

## Mini-chequeo: ciclo de vida y errores

<div class="question-card">
  <span class="question-icon">🧠</span>
  Las cuatro de la entrevista:
</div>

1. ¿Cuáles son los tres mensajes del handshake y en qué orden?
2. ¿Qué error lanza el SO al relanzar un servidor sin `SO_REUSEADDR` y qué estado lo causa?
3. ¿Qué excepción lanza `recv()` si se pasa el timeout y cuál si escribes en un socket ya cerrado?
4. ¿Diferencia entre `ConnectionRefusedError` y `ConnectionResetError`?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.85rem;margin-top:0.3rem;">
    <li><strong>SYN</strong> (cliente) → <strong>SYN+ACK</strong> (servidor) → <strong>ACK</strong> (cliente); luego fluyen los datos</li>
    <li><strong>OSError: Address already in use</strong>, por conexiones en estado <strong>TIME_WAIT</strong></li>
    <li><strong>socket.timeout</strong> al exceder el tiempo; <strong>BrokenPipeError</strong> al escribir en un socket cerrado</li>
    <li><strong>Refused</strong>: nadie escucha en el puerto (al conectar); <strong>Reset</strong>: el otro lado cerró de golpe (al hablar)</li>
  </ul>
</div>

---
---

## Resumen del bloque 01

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📬</span><strong>Socket</strong><br>Punto final; IP + puerto; STREAM = TCP</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🖥️</span><strong>Cliente</strong><br>socket → connect → sendall/recv → close</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏙️</span><strong>Servidor</strong><br>bind → listen → accept → recv/send con <em>conexion</em></div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🤝</span><strong>Ciclo</strong><br>SYN · SYN+ACK · ACK; FIN/ACK; TIME_WAIT → SO_REUSEADDR</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛡️</span><strong>Errores</strong><br>settimeout, except específicos, select</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  Bloque 02: <strong>UDP</strong> (sendto/recvfrom), <strong>HTTP y NTP</strong>, cuándo usar cada protocolo y la <strong>práctica eco</strong>.
</div>

---
layout: closing
---
