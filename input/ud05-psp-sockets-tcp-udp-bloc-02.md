---
layout: cover
---

# Unidad 05 — Sockets TCP y UDP<br>Bloque 02

## 2º CFGS DAM · Programación de Servicios y Procesos

---
---

## Lo que veremos en este bloque

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">✈️</span><strong>UDP</strong><br>sendto · recvfrom · datagramas</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🌐</span><strong>HTTP</strong><br>El protocolo que mueve la web</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⏰</span><strong>NTP</strong><br>La hora de Internet sobre UDP</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧭</span><strong>¿TCP o UDP?</strong><br>La regla de decisión</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛠️</span><strong>Práctica eco</strong><br>Dos servidores, dos protocolos</div>
</div>

<p style="margin-top:0.7rem;">Partimos de lo construido en el bloque 01: <code>socket</code>, cliente y servidor TCP, handshake, <code>SO_REUSEADDR</code> y timeouts.</p>

---
---

## Cliente y servidor UDP
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    UDP <strong>no se conecta</strong>: el cliente manda un datagrama con <code>sendto()</code> y espera con <code>recvfrom()</code>; el servidor solo hace <code>bind()</code> y escucha. <strong>Sin connect(), sin accept(), sin listen()</strong>... y sin garantía de que el mensaje llegue.
  </div>
</div>

Aquí compruebas en la API las tres filas de «No» de la tabla del bloque 01: construimos el cliente y el servidor UDP, y aterrizamos las consecuencias de lanzar aviones de papel.

---
class: compact-slide
---

## El cliente UDP
### sendto() y recvfrom()

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">cliente_udp.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket
HOST, PORT = "127.0.0.1", 5001
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    cliente.sendto(b"Hola UDP!", (HOST, PORT))
    datos, _ = cliente.recvfrom(1024)
    print(f"Respuesta: {datos.decode()}")</code></pre>
</div>

| Línea | Qué hace |
| :--- | :--- |
| `socket(AF_INET, SOCK_DGRAM)` | Crea el socket UDP (`SOCK_DGRAM`) |
| `sendto(b"Hola UDP!", (HOST, PORT))` | Envía el datagrama: **la dirección viaja en la llamada** |
| `recvfrom(1024)` | Devuelve la tupla `(datos, dirección)`; aquí la dirección se descarta con `_` |

---
---

## Sendto contra send
### La diferencia visual con TCP

| Cliente TCP (bloque 01) | Cliente UDP (aquí) |
| :--- | :--- |
| `s.connect((HOST, PORT))` | — (no existe) |
| `s.sendall(datos)` | `s.sendto(datos, (HOST, PORT))` |
| `s.recv(1024)` | `s.recvfrom(1024)` |

<div class="info" style="margin-top:0.6rem;">
  En TCP primero te conectas y luego envías; en UDP el «a quién» va <strong>dentro del envío</strong>.
</div>

<div class="warning" style="margin-top:0.5rem;">
  ⚠️ Cada <code>sendto()</code> es un datagrama independiente: pueden llegar <strong>desordenados, duplicados o no llegar</strong>. Si el servidor no escucha, el datagrama se pierde y <code>recvfrom()</code> espera <strong>para siempre</strong> (salvo <code>settimeout()</code>).
</div>

---
class: compact-slide
---

## El servidor UDP
### bind() y recvfrom(): nada más

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">servidor_udp.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre style="font-size:0.7rem;"><code>import socket
HOST, PORT = "127.0.0.1", 5001
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as servidor:
    servidor.bind((HOST, PORT))
    print(f"Servidor UDP en {HOST}:{PORT}")
    datos, direccion = servidor.recvfrom(1024)
    print(f"Recibido de {direccion}: {datos.decode()}")
    servidor.sendto(b"Recibido!", direccion)</code></pre>
</div>

<div class="two-cols" style="margin-top:0.25rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>bind()</code> reserva el puerto: todo datagrama que llegue a 5001 es para este proceso</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>recvfrom()</code> bloquea hasta que llega un datagrama y devuelve <strong>contenido + dirección</strong></div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>sendto(respuesta, direccion)</code>: la única forma de «devolver la pelota», porque no hay conexión que recuerde quién eras</div>
    </div>
    <div class="success" style="margin-top:0.4rem;">
      Consecuencia: un solo servidor UDP atiende a <strong>cualquier número de clientes</strong> sin accept() ni hilos.
    </div>
  </div>
</div>

---
---

## Sin accept(), sin listen()
### Servidor TCP contra servidor UDP

| Servidor TCP (bloque 01) | Servidor UDP (aquí) |
| :--- | :--- |
| `bind()` | `bind()` |
| `listen()` | — (no existe) |
| `accept()` → devuelve `conn` | — (no existe) |
| `conn.recv(1024)` | `servidor.recvfrom(1024)` |
| La conexión sabe quién es el cliente | `recvfrom()` devuelve la dirección |

<div class="info" style="margin-top:0.6rem;">
  💡 En localhost (127.0.0.1) los datagramas casi nunca se pierden ni desordenan: loopback, misma máquina. El desorden y la pérdida se ven en <strong>redes reales</strong>, con routers y congestión.
</div>

---
class: compact-slide
---

## Datagramas: cada envío es un mundo aparte

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">cinco_aviones.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket, time
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    for i in range(1, 6):
        cliente.sendto(f"Mensaje #{i}".encode(), ("127.0.0.1", 5001))
        time.sleep(0.2)</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Los males de UDP:</strong>
  <ul style="font-size:0.95rem;margin-top:0.3rem;">
    <li><strong>Pérdida</strong>: sin confirmación, si un paquete se pierde, se pierde para siempre</li>
    <li><strong>Desorden</strong>: sin números de secuencia, nadie reordena los datagramas</li>
    <li><strong>Duplicados</strong>: el mismo datagrama puede llegar dos veces, sin detección</li>
    <li><strong>Tamaño</strong>: máx. 65.535 − 8 (UDP) − 20 (IPv4) ≈ <strong>65.507 bytes</strong>; más → <code>OSError</code></li>
  </ul>
</div>

<div class="info" style="margin-top:0.5rem;">
  ¿Por qué alguien elegiría esto? Porque esos males son el <strong>precio de la velocidad</strong>: sin handshake ni reenvíos, cada paquete cuesta el mínimo.
</div>

---
class: compact-slide
---

## Mini-chequeo: UDP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué dos métodos usa el cliente UDP y qué devuelve cada uno?
2. ¿Por qué el servidor UDP no necesita `accept()`?
3. ¿Qué tres cosas pueden pasarle a un datagrama en la red y qué pasa si se pierde?
4. ¿Cuál es el tamaño máximo de un datagrama UDP?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.2rem;">
    <li><code>sendto(datos, dirección)</code> envía; <code>recvfrom(1024)</code> devuelve <strong>(datos, dirección)</strong></li>
    <li>Porque UDP <strong>no tiene conexiones</strong>: cada datagrama llega independiente y <code>recvfrom()</code> dice de quién viene</li>
    <li>Puede <strong>perderse</strong>, <strong>llegar desordenado</strong> o <strong>duplicarse</strong>; si se pierde, para siempre</li>
    <li>Unos <strong>65.507 bytes</strong> de carga útil (65.535 menos cabeceras UDP e IPv4)</li>
  </ul>
</div>

---
class: compact-slide
---

## HTTP: el protocolo que mueve la web

<div class="key-idea">
  <div class="key-idea-text">
    TCP y UDP son solo la <strong>tubería</strong>; los protocolos de aplicación deciden <strong>qué</strong> se escribe dentro. <strong>HTTP</strong> es un protocolo de <strong>texto sobre TCP</strong>: petición y respuesta son texto claro.
  </div>
</div>

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">petición GET</div>
    <div class="code-card-badge">HTTP</div>
  </div>
  <pre style="font-size:0.7rem;"><code>GET /ruta HTTP/1.1\r\n
Host: ejemplo.com\r\n
User-Agent: MiNavegador\r\n
Accept: text/html\r\n
\r\n</code></pre>
</div>

<p style="font-size:0.88rem;margin-top:0.4rem;">La línea en blanco <code>\r\n\r\n</code> marca el final de las cabeceras: «ya estaba todo». <code>Host:</code> es obligatoria en HTTP/1.1.</p>

---
---

## Verbos y respuesta HTTP

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Verbo</th><th>Qué pide</th></tr></thead>
      <tbody>
        <tr><td><strong>GET</strong></td><td>Leer un recurso</td></tr>
        <tr><td><strong>POST</strong></td><td>Enviar datos (un formulario)</td></tr>
        <tr><td><strong>PUT</strong></td><td>Guardar/reemplazar un recurso</td></tr>
        <tr><td><strong>DELETE</strong></td><td>Borrar un recurso</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">respuesta</div>
        <div class="code-card-badge">HTTP</div>
      </div>
      <pre><code>HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
Content-Length: 1234\r\n
\r\n
&lt;html&gt;...cuerpo...&lt;/html&gt;</code></pre>
    </div>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  <strong>200</strong> todo bien; también verás <strong>404 Not Found</strong> y <strong>500 Internal Server Error</strong>. <code>Content-Length</code> dice cuántos bytes mide el cuerpo: así sabes cuándo se acabó.
</div>

---
---

## El cliente HTTP manual

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">http_manual.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code>import socket
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect(("www.example.com", 80))
    s.sendall(b"GET / HTTP/1.1\r\nHost: www.example.com\r\n"
              b"Connection: close\r\n\r\n")
    respuesta = b""
    while True:
        datos = s.recv(4096)
        if not datos:
            break
        respuesta += datos
print(respuesta.decode()[:500])</code></pre>
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>Connection: close</code>: HTTP/1.1 mantiene la conexión abierta (<em>keep-alive</em>); así forzas al servidor a cerrarla al terminar</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">La respuesta llega <strong>en trozos</strong>: el bucle acumula bytes hasta que <code>recv()</code> devuelve <code>b""</code></div>
    </div>
  </div>
</div>

---
class: compact-slide
---

## El orden de los bytes (network byte order)

<div class="key-idea">
  <div class="key-idea-text">
    Cuando envías números por la red, sus bytes van en un orden acordado: <strong>big-endian</strong>, también llamado <strong>network byte order</strong>. En Python se fuerza con el prefijo <code>!</code> de <code>struct</code>.
  </div>
</div>

<div class="two-cols">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">byte_order.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.7rem;"><code>import struct
# '!' = big-endian
datos = struct.pack("!I", 5000)
print(datos)            # b'\x00\x00\x13\x88'
puerto = struct.unpack("!I", datos)[0]
print(puerto)           # 5000</code></pre>
    </div>
  </div>
  <div class="right">
    <table>
      <thead><tr><th>Código</th><th>Significado</th></tr></thead>
      <tbody>
        <tr><td><code>!</code></td><td>Network byte order (big-endian)</td></tr>
        <tr><td><code>I</code></td><td>Entero sin signo de 4 bytes</td></tr>
        <tr><td><code>H</code></td><td>Entero sin signo de 2 bytes</td></tr>
      </tbody>
    </table>
    <div class="info" style="margin-top:0.3rem;">
      <code>!I</code> y <code>!H</code> aparecen en todos los protocolos que hablan números. Es el truco que necesitas para el NTP que viene ahora.
    </div>
  </div>
</div>

---
---

## NTP: sincronizar relojes con UDP
### El reloj de Internet

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Tu ordenador manda un datagrama UDP al <strong>puerto 123</strong> de <code>pool.ntp.org</code>, un grupo mundial de servidores de tiempo</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">NTP manda <strong>múltiples peticiones</strong> y cruza respuestas para descontar la latencia</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Un datagrama perdido es <strong>irrelevante</strong>: se promedia estadísticamente. Por eso puede permitirse UDP</div>
    </div>
  </div>
  <div class="right">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">hora_ntp.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import socket, struct, time
def hora_ntp():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.settimeout(5)
        # 48 bytes, modo cliente
        paquete = b"\x1b" + 47 * b"\0"
        s.sendto(paquete, ("pool.ntp.org", 123))
        datos, _ = s.recvfrom(1024)
    # Timestamp en los bytes 40-43
    t = struct.unpack("!I", datos[40:44])[0]
    # Época NTP (1900) → Unix (1970)
    return t - 2208988800
print(time.ctime(hora_ntp()))</code></pre>
    </div>
  </div>
</div>

---
---

## Cómo funciona el cliente NTP
### Tres detalles que importan

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><code>b"\x1b" + 47*b"\0"</code>: el primer byte <code>00011011</code> activa el <strong>modo cliente</strong> y la versión 3; los 47 bytes restantes son relleno del formato de 48 bytes</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><code>settimeout(5)</code>: imprescindible en UDP; si la respuesta no llega, excepción en vez de bloqueo eterno</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><code>struct.unpack("!I", datos[40:44])</code>: el servidor escribe su hora como entero de 4 bytes en <strong>network byte order</strong> en las posiciones 40-43</div>
</div>

<div class="info" style="margin-top:0.6rem;">
  <strong>SNTP</strong> (Simple NTP) es la versión ligera para routers, móviles e IoT: para el 99% de las aplicaciones, más que suficiente.
</div>

---
---

## Mini-chequeo: HTTP, bytes y NTP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué significa la línea en blanco `\r\n\r\n` en una petición HTTP y qué indica el código 200?
2. ¿Qué código de `struct` usa big-endian y por qué lo necesita el cliente NTP?
3. ¿Por qué NTP usa UDP si la hora debe ser exacta?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Que la petición <strong>ha terminado</strong> (fin de cabeceras); <strong>200 OK</strong> = procesada correctamente</li>
    <li>El prefijo <strong>!</strong> (ej: <code>!I</code>): el servidor NTP escribe su timestamp en network byte order, hay que leerlo igual</li>
    <li>Manda <strong>muchas peticiones</strong> y calcula la hora estadísticamente: un paquete perdido no cambia nada</li>
  </ul>
</div>

---
class: compact-slide
---

## ¿TCP o UDP?
### La pregunta correcta

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud05-psp-sockets-tcpudp.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<p style="text-align:center;font-size:0.9rem;margin-top:0.3rem;">¿Ambas cosas? <strong>QUIC</strong> (la base de HTTP/3) construye fiabilidad tipo TCP <strong>encima de UDP</strong>: confirmaciones, control de congestión y cifrado.</p>

<style>
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

---
class: compact-slide
---

## Casos reales
### La tabla que se repite en las entrevistas

| Aplicación | Protocolo | Por qué |
| :--- | :--- | :--- |
| Web (HTTP) | **TCP** | La página debe llegar completa y en orden |
| Correo (SMTP, POP3, IMAP) | **TCP** | Un mensaje a medias es inútil |
| Transferencia de archivos (FTP) | **TCP** | Un byte perdido corrompe el archivo |
| DNS | **UDP** | La consulta es diminuta; si se pierde, se repite |
| VoIP / videollamadas | **UDP** | Debe ir fluida; un frame perdido se tolera |
| Juegos online | **UDP** | Cientos de paquetes por segundo; la latencia manda |
| NTP (hora) | **UDP** | Manda muchas peticiones y promedia |

<div class="warning" style="margin-top:0.5rem;">
  Ojo: el <em>streaming web</em> moderno (Twitch, YouTube) usa <strong>HTTP sobre TCP</strong> (segmentación HLS/DASH), no UDP: busca llegar a todo el mundo por infraestructura web.
</div>

---
---

## Mini-chequeo: criterio de decisión

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué criterio usarías para elegir entre TCP y UDP en una app nueva?
2. ¿Por qué DNS usa UDP si «perder» la respuesta de un dominio parece grave?
3. Pon dos ejemplos de TCP y dos de UDP distintos de los de la tabla.

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>¿Puedes permitirte perder datos? Dato <strong>intacto y completo</strong> → TCP; <strong>fluidez tolerando pérdidas</strong> → UDP</li>
    <li>La consulta es <strong>diminuta</strong> y repetirla cuesta casi nada: la fiabilidad sale de <strong>re-preguntar</strong></li>
    <li>TCP: descargas de actualizaciones, pago online. UDP: retransmisión en vivo, chat de voz de un juego, telemetría de sensores</li>
  </ul>
</div>

---
---

## Práctica eco
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>servidor eco</strong> devuelve al cliente exactamente lo que recibe. Lo montas <strong>dos veces</strong> —TCP y UDP— para notar con tus manos la diferencia entre canal fiable y datagramas sueltos.
  </div>
</div>

Juntas todo lo aprendido: cliente y servidor TCP, `SO_REUSEADDR`, timeouts y datagramas. Con <strong>dos terminales</strong> verás cada protocolo completo en acción.

---
class: compact-slide
---

## Eco en TCP

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">eco_tcp.py</div>
    <div class="code-card-badge">Python</div>
  </div>      <pre style="font-size:0.7rem;line-height:1.35;"><code>import socket
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000)); srv.listen()
    print("Servidor eco TCP escuchando en 127.0.0.1:9000")
    conn, addr = srv.accept()
    with conn:
        datos = conn.recv(1024)
        print(f"Recibido de {addr}: {datos.decode()}")
        conn.sendall(datos)  # Eco</code></pre>
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">cliente_tcp.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre style="font-size:0.7rem;"><code>import socket
with socket.socket() as cli:
    cli.connect(("127.0.0.1", 9000))
    cli.sendall(b"Prueba")
    print(cli.recv(1024).decode())</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal" style="padding:0.8rem 1rem;font-size:0.78rem;">
      <div><span class="prompt">$</span> python cliente_tcp.py</div>
      <div class="output">Prueba</div>
    </div>
    <p style="font-size:0.88rem;margin-top:0.5rem;">El truco está en <code>conn.sendall(datos)</code>: devuelve los <strong>mismos bytes</strong> que llegaron. Eco, literalmente.</p>
  </div>
</div>

---
class: compact-slide
---

## Eco en UDP

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">eco_udp.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre style="font-size:0.7rem;line-height:1.4;"><code>import socket
HOST, PORT = "127.0.0.1", 9001
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as servidor:
    servidor.bind((HOST, PORT))
    print(f"Servidor eco UDP en {HOST}:{PORT}")
    datos, direccion = servidor.recvfrom(1024)
    print(f"Recibido de {direccion}: {datos.decode()}")
    servidor.sendto(datos, direccion)  # Eco</code></pre>
</div>

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="code-card">
      <div class="code-card-header">
        <div class="code-card-dots"><span></span><span></span><span></span></div>
        <div class="code-card-title">cliente_udp.py</div>
        <div class="code-card-badge">Python</div>
      </div>
      <pre><code>import socket
HOST, PORT = "127.0.0.1", 9001
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as cliente:
    mensaje = "Hola UDP, devuélveme esto"
    cliente.sendto(mensaje.encode(), (HOST, PORT))
    datos, _ = cliente.recvfrom(1024)
    print(f"El servidor me devolvió: {datos.decode()}")</code></pre>
    </div>
  </div>
  <div class="right">
    <div class="terminal" style="padding:0.8rem 1rem;font-size:0.78rem;">
      <div><span class="prompt">$</span> python cliente_udp.py</div>
      <div class="output">El servidor me devolvió: Hola UDP, devuélveme esto</div>
    </div>
    <p style="font-size:0.88rem;margin-top:0.5rem;"><code>sendto(datos, direccion)</code> devuelve los mismos bytes <strong>a la dirección de la que vinieron</strong>.</p>
  </div>
</div>

---
---

## Las dos versiones, cara a cara

| | Eco TCP (puerto 9000) | Eco UDP (puerto 9001) |
| :--- | :--- | :--- |
| El servidor espera con | `accept()` + `recv()` | `recvfrom()` |
| Devuelve con | `conn.sendall(datos)` | `servidor.sendto(datos, direccion)` |
| ¿Quién es el cliente? | La conexión lo sabe | `recvfrom()` entrega la dirección |
| ¿Varios a la vez? | De uno en uno (o con hilos) | Cualquiera, sin hilos |

<div class="info" style="margin-top:0.6rem;">
  <code>accept()</code>, <code>recv()</code> y <code>recvfrom()</code> son <strong>bloqueantes</strong>: el programa espera hasta que algo ocurre. El servidor en una terminal, el cliente en otra: cada protocolo completo funcionando.
</div>

---
---

## Aprieta el lápiz
### Seis retos sobre lo aprendido

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Eco TCP</strong>: servidor que devuelve exactamente lo que recibe</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Eco UDP</strong>: lo mismo, con datagramas</div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><strong>Contador de letras</strong>: el cliente envía una frase, el servidor responde cuántas letras tiene</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><strong>Servidor hora</strong>: el cliente se conecta y recibe la hora actual</div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content"><strong>Cliente con timeout</strong>: si no hay respuesta en 3s, «Servidor no disponible»</div>
    </div>
    <div class="step">
      <div class="step-number">6</div>
      <div class="step-content"><strong>Comparativa velocidad</strong>: ¿cuánto tardan TCP y UDP en enviar 100 mensajes pequeños?</div>
    </div>
  </div>
</div>

---
---

## Soluciones de los retos 1-3
### Eco TCP, eco UDP y contador

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">retos_1_2_3.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code># 1. Eco TCP
with socket.socket() as srv:
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("127.0.0.1", 9000)); srv.listen()
    conn, addr = srv.accept()
    with conn:
        datos = conn.recv(1024)
        conn.sendall(datos)
#
# 2. Eco UDP
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as srv:
    srv.bind(("127.0.0.1", 9001))
    datos, direccion = srv.recvfrom(1024)
    srv.sendto(datos, direccion)
#
# 3. Contador de letras (dentro del with conn)
    texto = conn.recv(1024).decode()
    conn.sendall(str(len(texto)).encode())</code></pre>
</div>

---
---

## Soluciones de los retos 4-6
### Hora, timeout y comparativa

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">retos_4_5_6.py</div>
    <div class="code-card-badge">Python</div>
  </div>
  <pre><code># 4. Servidor hora (dentro del with conn)
    hora = time.strftime("%H:%M:%S")
    conn.sendall(hora.encode())
#
# 5. Cliente con timeout
with socket.socket() as cli:
    cli.settimeout(3)
    try:
        cli.connect(("127.0.0.1", 9000))
        cli.sendall(b"hola")
        print(cli.recv(1024).decode())
    except (socket.timeout, ConnectionRefusedError):
        print("Servidor no disponible")
#
# 6. Velocidad: cronometrar 100 envíos TCP vs UDP
#    con test_tcp() y test_udp() por separado
print(f"TCP: {test_tcp():.3f}s")
print(f"UDP: {test_udp():.3f}s")   # UDP suele ganar</code></pre>
</div>

<div class="warning" style="margin-top:0.6rem;">
  Para el benchmark necesitas un servidor <strong>TCP en el 9000</strong> y uno <strong>UDP en el 9001</strong> (los retos 1 y 2) en marcha. Sin ellos: <code>ConnectionRefusedError</code> en TCP y <code>recvfrom()</code> bloqueado para siempre en UDP.
</div>

---
---

## Sé el socket
### Consolida lo aprendido

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>bind(("127.0.0.1", 9000))</code>: reservas el puerto. <strong>Ya eres la centralita</strong></div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><code>listen()</code>: el SO ya sabe que esperas llamadas. Te quedas en <code>accept()</code>... <strong>esperas</strong></div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content">Un cliente hace <code>connect()</code>: el handshake (SYN → SYN+ACK → ACK) suena como el timbre. <code>accept()</code> despierta y devuelve el <strong>nuevo socket</strong> de esa conversación</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">4</div>
      <div class="step-content"><code>recv(1024)</code>: <strong>esperas otra vez</strong>. Cuando el cliente manda <code>b"Hola!"</code>, despiertas y contestas con <code>sendall()</code></div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div class="step-content">Al salir del <code>with</code>, la despedida FIN/ACK cierra la conversación... y tú vuelves a tu <code>accept()</code>: <strong>esperando al siguiente cliente</strong></div>
    </div>
    <div class="info" style="margin-top:0.6rem;">
      ¿Y si otro cliente llama mientras atiendes a uno? Queda en la <strong>cola</strong> del <code>listen()</code> (el <em>backlog</em>): un solo hilo atiende a un cliente cada vez.
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
      <li>Soy el punto final de una conexión de red</li>
      <li>Soy el método del cliente TCP que estrecha la mano antes de hablar</li>
      <li>Soy el método del servidor UDP que dice de quién vienen los datagramas</li>
      <li>Soy el estado que retiene el puerto tras cerrar</li>
      <li>Soy la opción que evita el «Address already in use»</li>
    </ol>
  </div>
  <div class="right">
    <ol start="6" style="font-size:0.95rem;">
      <li>Soy el protocolo de texto sobre TCP que mueve la web</li>
      <li>Soy el grupo de servidores de tiempo del puerto 123</li>
      <li>Soy el protocolo fiable sobre UDP de HTTP/3</li>
      <li>Soy la llamada que espera en varios sockets a la vez sin hilos</li>
      <li>Soy la tupla que devuelve <code>recvfrom()</code></li>
    </ol>
  </div>
</div>

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <span style="font-size:0.9rem;">1. El socket · 2. <code>connect()</code> · 3. <code>recvfrom()</code> · 4. TIME_WAIT · 5. <code>SO_REUSEADDR</code> · 6. HTTP · 7. <code>pool.ntp.org</code> (NTP) · 8. QUIC · 9. <code>select()</code> · 10. <code>(datos, direccion)</code></span>
</div>

---
---

## Entrevista de trabajo
### Las seis preguntas que te harán

<div class="two-cols">
  <div class="left">
    <ol style="font-size:0.95rem;">
      <li>¿Qué diferencia hay entre TCP y UDP? ¿Cuándo usarías cada uno?</li>
      <li>Escribe un servidor TCP que reciba un mensaje y lo devuelva</li>
      <li>¿Cómo funciona el three-way handshake? Explícalo con un diagrama</li>
    </ol>
  </div>
  <div class="right">
    <ol start="4" style="font-size:0.95rem;">
      <li>¿Qué errores pueden ocurrir al comunicar por sockets y cómo los gestionas?</li>
      <li>¿Qué es SO_REUSEADDR y cuándo lo necesitas?</li>
      <li>¿Cómo funciona HTTP a nivel de socket? Descríbeme una petición y su respuesta</li>
    </ol>
  </div>
</div>

<div class="success" style="margin-top:0.6rem;">
  💡 La 1 y la 2 son las «preguntas reina»: para la 1, la moraleja <strong>fiabilidad contra velocidad</strong> con los casos reales; para la 2, escribe el servidor sin pensarlo: <code>socket() + bind() + listen() + accept() + recv() + sendall()</code>. Si lo cuentas fluido, ya eres medio desarrollador de redes.
</div>

---
---

## Resumen del bloque 02

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">✈️</span><strong>UDP</strong><br>sendto/recvfrom; sin accept; datagramas de ~65.507 B</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🌐</span><strong>HTTP</strong><br>Texto sobre TCP; verbos y códigos; recv en bucle</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🔢</span><strong>Bytes</strong><br>Network byte order con struct "!</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⏰</span><strong>NTP</strong><br>48 bytes al puerto 123; promedia; settimeout</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛠️</span><strong>Eco</strong><br>TCP 9000 · UDP 9001; dos terminales</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  Siguiente parada: <strong>UD 06 · Servidores concurrentes</strong> — hilos y <code>select()</code> para atender a muchos clientes a la vez.
</div>

---
layout: closing
---
