---
layout: cover
---

# Unidad 07 — HTTP y APIs REST

## 2º CFGS DAM · Programación de Servicios y Procesos

---
class: compact-slide
---

## Lo que veremos en esta unidad

<div class="features-grid" style="grid-template-columns:repeat(4,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🌍</span><strong>Web y HTTP</strong><br>URL, petición y respuesta</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>Métodos</strong><br>GET, POST, PUT, PATCH, DELETE</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏛️</span><strong>REST</strong><br>Recursos, URLs y sin estado</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚨</span><strong>Códigos</strong><br>2xx, 3xx, 4xx y 5xx</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📦</span><strong>JSON</strong><br>El idioma de las APIs</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📥</span><strong>requests GET</strong><br>params, headers y respuesta</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📤</span><strong>POST y CIA</strong><br>POST, PUT, PATCH, DELETE</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🛠️</span><strong>Práctica</strong><br>Mini cliente contra APIs reales</div>
</div>

<p style="margin-top:0.7rem;font-size:0.95rem;">RA4a-b: <strong>utilizar APIs REST</strong> para obtener datos externos y <strong>gestionar peticiones HTTP</strong> procesando respuestas JSON. Todo se practica contra GitHub API y JSONPlaceholder.</p>

---
class: sparse-slide
---

## 01 · Web y HTTP
### La conversación entre tu código y el servidor

<div class="key-idea">
  <p class="key-idea-text">Una <strong>API</strong> es un conjunto de reglas para que dos programas se comuniquen, y <strong>HTTP</strong> es el idioma que usan en la web: tu programa manda una <strong>petición</strong> y el servidor responde.</p>
</div>

No necesitas saber cómo está implementado el sistema por dentro: solo le pides algo y te lo devuelve.

---
class: compact-slide
---

## ¿Qué es una API?
### Application Programming Interface: reglas, no implementación

```python
# ❌ Sin API: hablas directo con la base de datos
import sqlite3
conn = sqlite3.connect("usuarios.db")
conn.execute("SELECT * FROM usuarios")
# ✅ Con API: pides datos a un servicio
import requests
resp = requests.get("https://miapi.com/usuarios")
datos = resp.json()
```

<div class="info">
  En la segunda versión no sabes qué motor de base de datos hay detrás, ni en qué lenguaje está el servidor, ni cuántos servidores son. Solo conoces la regla: <em>si pido <code>GET /usuarios</code>, me llega una lista</em>.
</div>

---
---

## La web en tres piezas
### Cliente, servidor y protocolo

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.7rem;"><span class="feature-icon" style="font-size:1.6rem;">🙋</span><strong>Cliente</strong><br>Quien pide: tu navegador o tu código</div>
  <div class="feature-item" style="padding:0.7rem;"><span class="feature-icon" style="font-size:1.6rem;">🖥️</span><strong>Servidor</strong><br>Quien responde con los datos</div>
  <div class="feature-item" style="padding:0.7rem;"><span class="feature-icon" style="font-size:1.6rem;">📜</span><strong>HTTP</strong><br>Las reglas de la conversación</div>
</div>

| Parte de la URL | Ejemplo | Qué es |
| :--- | :--- | :--- |
| `scheme` | `https` | Protocolo de transporte (cifrado en HTTPS) |
| `host` | `api.github.com` | El servidor al que hablas |
| `path` | `/users/python` | El recurso concreto que pides |
| `query` | `?per_page=10` | Parámetros extra de la petición |

---
class: compact-slide
---

## Petición y respuesta
### Los dos mensajes de HTTP

### 📤 Petición (cliente → servidor)

```http
GET /users/python HTTP/1.1
Host: api.github.com
User-Agent: python-requests/2.31.0
Accept: */*
```

### 📥 Respuesta (servidor → cliente)

```http
HTTP/1.1 200 OK
Content-Type: application/json
{"login": "python", "public_repos": 42}
```

---
class: compact-slide
---

## La analogía del pedido a domicilio

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Buscas el restaurante (<strong>URL</strong>) que vende lo que quieres.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Le mandas tu pedido (<strong>petición HTTP</strong>): «una pizza margarita» es un <code>GET</code>; «apúntame este plato en la carta» es un <code>POST</code>.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">El restaurante (servidor) lo cocina y te lo entrega (<strong>respuesta HTTP</strong>).</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content">La entrega llega con un estado: «✅ todo bien» (<strong>200</strong>), «❌ ese plato no existe» (<strong>404</strong>), «🔒 sin reserva no te atiendo» (<strong>401</strong>).</div>
</div>

<div class="success">
  No te hace falta saber cómo cocina la cocina: solo la dirección y el menú. Esa es la filosofía de las APIs.
</div>

---
class: compact-slide
---

## Mini-chequeo: web y HTTP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué es una API y qué problema resuelve?
2. Identifica las cuatro partes de `https://api.openweathermap.org/data/2.5/weather?q=Valencia`.
3. ¿Qué dos mensajes intercambian cliente y servidor en HTTP?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Reglas para que dos programas se comuniquen: resuelve la <strong>abstracción</strong> de no conocer la implementación interna</li>
    <li><code>scheme</code> = <code>https</code> · <code>host</code> = <code>api.openweathermap.org</code> · <code>path</code> = <code>/data/2.5/weather</code> · <code>query</code> = <code>?q=Valencia</code></li>
    <li>Una <strong>petición</strong> (método, URL y cabeceras) y una <strong>respuesta</strong> (código de estado y cuerpo)</li>
  </ul>
</div>

---
class: compact-slide
---

## 02 · Métodos HTTP
### Los verbos de la web

| Método | CRUD | Uso | ¿Cuerpo? |
| :--- | :--- | :--- | :--- |
| `GET` | Read | Obtener datos | ❌ No |
| `POST` | Create | Crear recurso | ✅ Sí |
| `PUT` | Update | Reemplazar completo | ✅ Sí |
| `PATCH` | Update | Actualizar parcial | ✅ Sí |
| `DELETE` | Delete | Borrar recurso | ❌ No |

<div class="info">
  Elegir el verbo correcto es la <strong>primera decisión</strong> de una API bien hecha: los métodos se corresponden con las operaciones CRUD de cualquier base de datos.
</div>

---
---

## El mismo recurso, cinco verbos
### La URL no cambia: cambia el método

```http
GET    /usuarios        → Listar usuarios
GET    /usuarios/5      → Obtener el usuario 5
POST   /usuarios        → Crear un usuario
PUT    /usuarios/5      → Actualizar el usuario 5
DELETE /usuarios/5      → Borrar el usuario 5
```

<div class="success">
  La URL <strong>nombra la cosa</strong> y el método <strong>dice qué hacer</strong> con ella: cinco operaciones distintas sobre un único endpoint.
</div>

---
class: compact-slide
---

## ¿Qué es la idempotencia?
### Repetir la llamada no cambia el resultado

| Método | ¿Idempotente? | Por qué |
| :--- | :--- | :--- |
| `GET` | ✅ | Leer cinco veces devuelve lo mismo |
| `PUT` | ✅ | Reemplazar el recurso completo deja el mismo estado final |
| `DELETE` | ✅ | Borrar algo ya borrado sigue borrado |
| `POST` | ❌ | Cada llamada crea un recurso **nuevo**: dos llamadas, dos recursos |
| `PATCH` | ⚠️ | Depende de la operación parcial que apliques |

<div class="warning">
  Si un cliente reenvía una petición por un <strong>timeout</strong>, un método idempotente (PUT) es seguro de repetir; un POST podría <strong>duplicar</strong> el recurso.
</div>

---
class: compact-slide
---

## Métodos en Python
### Cada verbo es una función de requests

```python
import requests

nuevo_usuario = {"nombre": "Ana", "email": "ana@x.com"}
resp = requests.post("https://miapi.com/usuarios", json=nuevo_usuario)
print(resp.status_code)      # 201 Created

resp = requests.delete("https://miapi.com/usuarios/5")
print(resp.status_code)      # 204 No Content
```

<div class="info">
  El <code>json=</code> convierte el diccionario de Python a JSON automáticamente y lo coloca en el <strong>cuerpo</strong> de la petición.
</div>

---
class: compact-slide
---

## Mini-chequeo: métodos HTTP

<div class="question-card">
  <span class="question-icon">🧠</span>
  Sin mirar la tabla:
</div>

1. ¿Qué método usarías para ver un artículo, crearlo, cambiarlo entero y borrarlo?
2. ¿Por qué POST no es idempotente y PUT sí?
3. ¿GET lleva cuerpo en la petición? ¿Y POST?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><strong>GET</strong> para leer, <strong>POST</strong> para crear, <strong>PUT</strong> (o PATCH para un campo) para cambiar, <strong>DELETE</strong> para borrar</li>
    <li>Porque cada POST crea un <strong>recurso nuevo</strong> (dos llamadas, dos recursos) y PUT reemplaza el completo: el estado final es el mismo</li>
    <li><strong>GET no</strong> lleva cuerpo (solo URL y cabeceras); <strong>POST sí</strong>: el cuerpo es el recurso a crear</li>
  </ul>
</div>

---
class: sparse-slide
---

## 03 · Principios REST
### Recursos, URLs semánticas y sin estado

<div class="key-idea">
  <p class="key-idea-text"><strong>REST</strong> (<em>Representational State Transfer</em>) es el estándar de las APIs modernas: trata las cosas del sistema como <strong>recursos</strong>, da una <strong>URL</strong> a cada recurso y lo manipula con los <strong>verbos HTTP</strong>.</p>
</div>

REST no es una tecnología ni una librería: es un conjunto de **convenciones**. Si las sigues, cualquiera usa tu API sin leer un manual de 100 páginas.

---
class: compact-slide
---

## Recursos: las cosas, no las acciones
### Modela sustantivos, no verbos

| ❌ Acciones (no REST) | ✅ Recursos (REST) |
| :--- | :--- |
| `GET /getUsuario?id=5` | `GET /usuarios/5` |
| `POST /crearUsuario` | `POST /usuarios` |
| `DELETE /borrarUsuario?id=5` | `DELETE /usuarios/5` |

```http
/productos       → todos los productos
/productos/123   → el producto 123
```

<div class="info">
  La URL es un <strong>nombre</strong> (qué cosa) y el método HTTP es el <strong>verbo</strong> (qué hacer). Se separan los dos conceptos en lugar de mezclarlos en la URL.
</div>

---
class: compact-slide
---

## Los cuatro pilares de REST

<div class="features-grid" style="grid-template-columns:repeat(4,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.6rem;">🧱</span><strong>Recursos</strong><br>Cada entidad tiene su URL</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.6rem;">🚦</span><strong>Verbos</strong><br>GET, POST, PUT, DELETE</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.6rem;">🕊️</span><strong>Sin estado</strong><br>Cada petición se basta sola</div>
  <div class="feature-item" style="padding:0.7rem 0.5rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.6rem;">📦</span><strong>JSON</strong><br>El formato de intercambio</div>
</div>

```http
GET    /usuarios      → Listar usuarios
GET    /usuarios/5    → Obtener el usuario 5
POST   /usuarios      → Crear un usuario
PUT    /usuarios/5    → Actualizar el usuario 5
DELETE /usuarios/5    → Borrar el usuario 5
```

<div class="success">
  Con estos cuatro pilares una API REST es <strong>predecible</strong>: si sabes usar una, sabes usar todas.
</div>

---
class: compact-slide
---

## Sin estado (stateless)

<div class="info">
  El servidor <strong>no guarda contexto entre peticiones</strong>: cada petición lleva toda la información necesaria para ser entendida por sí sola.
</div>

Piénsalo como un camarero que **no recuerda tu cara**: cada vez que pides algo se lo tienes que decir todo de nuevo. No puedes decir «lo mismo de antes».

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Si la petición necesita autenticación, el token viaja en <strong>cada</strong> petición (cabecera <code>Authorization</code>)</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">El servidor no tiene que recordar quién eres entre llamadas</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content">Consecuencia: escala fácil, porque ningún servidor guarda «tu sesión»</div>
</div>

---
---

## ¿Qué significa RESTful?
### Dos APIs, dos filosofías

<div class="comparison-grid">
  <div class="comparison-item good">
    <p><strong>✅ RESTful</strong></p>
    <p><code>GET https://api.github.com/users/python</code></p>
    <p>«Dame el recurso del usuario <em>python</em>»: URL limpia y método con intención.</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>❌ No RESTful</strong></p>
    <p><code>GET https://miapi.com/obtenerUsuario?id=5&amp;accion=leer</code></p>
    <p>La acción va dentro de la URL y se abusa del GET.</p>
  </div>
</div>

<div class="info">
  GitHub API, GitHub Search y JSONPlaceholder son RESTful: fíjate en cómo sus URLs son limpias y su método dice la intención.
</div>

---
class: compact-slide
---

## Mini-chequeo: REST

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿Qué es un recurso en REST? Pon dos ejemplos de URL.
2. ¿Por qué `GET /getUsuario?id=5` no es RESTful?
3. ¿Qué significa que una API sea «sin estado»?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Una «cosa» del sistema (usuario, producto, pedido): <code>/usuarios</code>, <code>/productos/123</code></li>
    <li>Porque mete la <strong>acción</strong> en la URL en lugar de usar el verbo HTTP: lo RESTful es <code>GET /usuarios/5</code></li>
    <li>Que el servidor no guarda contexto entre peticiones: cada una lleva todo lo necesario para entenderse sola</li>
  </ul>
</div>

---
class: compact-slide
---

## 04 · Códigos de estado
### La señal de humo del servidor

<div class="features-grid" style="grid-template-columns:repeat(4,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.4rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.1rem;">✅</span><strong>2xx</strong><br>Éxito</div>
  <div class="feature-item" style="padding:0.6rem 0.4rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.1rem;">➡️</span><strong>3xx</strong><br>Redirección</div>
  <div class="feature-item" style="padding:0.6rem 0.4rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.1rem;">🙋</span><strong>4xx</strong><br>Error del cliente</div>
  <div class="feature-item" style="padding:0.6rem 0.4rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.5rem;margin-bottom:0.1rem;">🔥</span><strong>5xx</strong><br>Error del servidor</div>
</div>

<div class="info" style="margin-top:0.8rem;">
  En tres dígitos el servidor te dice qué ha pasado <strong>sin leer el cuerpo</strong>. Cuando veas un <strong>4xx</strong>, revisa tu petición; con un <strong>5xx</strong>, la culpa es de la otra parte.
</div>

---
class: compact-slide
---

## La tabla de códigos

| Código | Significado | Situación típica |
| :--- | :--- | :--- |
| **200** | OK | GET exitoso |
| **201** | Created | POST exitoso (recurso creado) |
| **204** | No Content | DELETE exitoso |
| **301** | Moved Permanently | La URL cambió |
| **400** | Bad Request | Enviaste datos incorrectos |
| **401** | Unauthorized | Falta autenticación |
| **403** | Forbidden | No tienes permiso |
| **404** | Not Found | El recurso no existe |
| **429** | Too Many Requests | Te pasaste del límite |
| **500** | Internal Server Error | Error del servidor |
| **503** | Service Unavailable | El servicio está caído |

---
---

## Los cuatro pares que se confunden

<div class="comparison-grid">
  <div class="comparison-item bad">
    <p><strong>400 vs 404</strong></p>
    <p><strong>400</strong>: «tu petición está mal formada».</p>
    <p><strong>404</strong>: «lo que pides no existe».</p>
  </div>
  <div class="comparison-item bad">
    <p><strong>401 vs 403</strong></p>
    <p><strong>401</strong>: «no te has identificado».</p>
    <p><strong>403</strong>: «te has identificado, pero no tienes permiso».</p>
  </div>
</div>

<div class="warning">
  Si el servidor estuviera caído verías <strong>500</strong> o <strong>503</strong>, nunca un 404. Un 404 es tuyo: la red está bien y lo que pediste está mal.
</div>

---
class: compact-slide
---

## Códigos en Python
### status_code y resp.ok

```python
import requests

resp = requests.get("https://api.github.com/users/python")
if resp.status_code == 200:
    print("✅ Todo bien:", resp.json()["login"])
elif resp.status_code == 404:
    print("❌ Usuario no encontrado")
else:
    print(f"⚠️ Código inesperado: {resp.status_code}")
```

<div class="warning">
  <code>requests</code> <strong>no lanza excepción</strong> ante un 404 o un 500: devuelve la respuesta con su <code>status_code</code> y <code>resp.ok</code> a <code>False</code>. Decidir qué hacer es tu responsabilidad.
</div>

---
class: compact-slide
---

## Mini-chequeo: códigos de estado

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué familia indica un error del servidor? ¿Y un error tuyo?
2. ¿Qué código devuelve un POST exitoso? ¿Y un DELETE exitoso?
3. Diferencias entre 401 y 403, y entre 400 y 404.

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Servidor → <strong>5xx</strong> (500, 503). Tuyo → <strong>4xx</strong> (400, 401, 403, 404, 429)</li>
    <li>POST exitoso → <strong>201 Created</strong>. DELETE exitoso → <strong>204 No Content</strong></li>
    <li><strong>401</strong> = falta autenticación · <strong>403</strong> = sin permiso · <strong>400</strong> = petición mal formada · <strong>404</strong> = el recurso no existe</li>
  </ul>
</div>

---
class: compact-slide
---

## 05 · JSON
### El idioma de las APIs

```json
{
  "nombre": "Ana",
  "edad": 25,
  "email": "ana@x.com",
  "activo": true,
  "intereses": ["Python", "redes", "cripto"]
}
```

<div class="info">
  Claves y textos entre <strong>comillas dobles</strong>, booleanos <code>true</code>/<code>false</code> en minúscula y listas entre corchetes. Python lo convierte directamente a <strong>diccionarios</strong> y <strong>listas</strong>.
</div>

---
class: compact-slide
---

## De JSON a Python y viceversa

```python
import json

texto = '{"nombre": "Ana", "edad": 25, "activo": true}'
datos = json.loads(texto)              # texto JSON → dict
print(datos["nombre"])                 # "Ana"

python_dict = {"nombre": "Ana", "edad": 25, "activo": True}
texto_json = json.dumps(python_dict, ensure_ascii=False, indent=2)
print(texto_json)                      # dict → texto JSON
```

| JSON | Python |
| :--- | :--- |
| `{ ... }` | `dict` |
| `[ ... ]` | `list` |
| `"texto"` | `str` |
| `42` | `int` / `float` |
| `true` / `false` | `True` / `False` |
| `null` | `None` |

<div class="success">
  <code>ensure_ascii=False</code> conserva las tildes e <code>indent=2</code> formatea legible.
</div>

---
class: compact-slide
---

## JSON dentro de requests

```python
import requests

resp = requests.get("https://api.github.com/users/python")
datos = resp.json()                  # parsea el cuerpo a dict
print(datos["login"])                # "python"
print(datos["public_repos"])         # el número real (cambia con el tiempo)

resp = requests.get("https://jsonplaceholder.typicode.com/posts")
posts = resp.json()                  # lista de diccionarios
print(f"Hay {len(posts)} posts")     # 100
print(posts[0]["title"])             # el título del primer post
```

<div class="warning">
  <code>resp.json()</code> <strong>lanza excepción</strong> si el cuerpo no es JSON (por ejemplo, un HTML de error). Por eso se comprueba <code>status_code</code> <strong>antes</strong> de parsear.
</div>

---
class: compact-slide
---

## Mini-chequeo: JSON

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde sin mirar:
</div>

1. ¿A qué tipo de Python se convierte `[1, 2, 3]`? ¿Y `{"a": true}`?
2. ¿Qué hace `json.loads` y qué hace `json.dumps`?
3. ¿Qué pasa si llamas a `resp.json()` sobre una respuesta que no es JSON?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li><code>[1, 2, 3]</code> → <strong>lista</strong>; <code>{"a": true}</code> → <strong>dict</strong> (con <code>True</code>)</li>
    <li><code>loads</code>: texto JSON → Python. <code>dumps</code>: Python → texto JSON</li>
    <li>Lanza <code>json.JSONDecodeError</code>: conviene comprobar el <code>status_code</code> antes de parsear</li>
  </ul>
</div>

---
class: compact-slide
---

## 06 · requests: el GET
### La librería de facto para hablar HTTP

```python
import requests

resp = requests.get("https://api.github.com")
print(resp.status_code)   # 200
print(resp.headers)       # cabeceras de respuesta
print(resp.elapsed)       # tiempo que tardó
```

<div class="info">
  <code>requests.get</code> hace todo lo que en la UD 05 montabas a mano con sockets: resolver el <strong>DNS</strong>, abrir la conexión <strong>TCP</strong>, el <strong>handshake TLS</strong> en HTTPS, construir la petición y leer la respuesta.
</div>

---
class: compact-slide
---

## La respuesta y sus propiedades

| Propiedad | Qué devuelve |
| :--- | :--- |
| `resp.status_code` | Código HTTP (int) |
| `resp.ok` | `True` si el código está entre 200 y 399 |
| `resp.text` | Cuerpo como string |
| `resp.json()` | Cuerpo como dict (**lanza excepción** si no es JSON) |
| `resp.headers` | Diccionario con las cabeceras |
| `resp.elapsed` | Tiempo transcurrido (timedelta) |

<div class="success">
  Orden de uso habitual: primero <code>status_code</code> (o <code>resp.ok</code>), después <code>resp.json()</code>. Si solo quieres ver el cuerpo en bruto, <code>resp.text</code>.
</div>

---
class: compact-slide
---

## Parámetros de consulta
### params= construye la query string por ti

```python
import requests

params = {"q": "python", "page": 1, "per_page": 10}
resp = requests.get(
    "https://api.github.com/search/repositories",
    params=params,
)
# URL final: .../search/repositories?q=python&page=1&per_page=10
print(resp.json()["total_count"])
```

<div class="success">
  Frente a concatenar con <code>f"..."</code>, <code>params=</code> <strong>escapa los caracteres especiales</strong> (espacios, <code>&amp;</code>, <code>#</code>) y te ahorra el clásico «se me olvidó el <code>?</code>».
</div>

---
class: compact-slide
---

## Cabeceras personalizadas
### headers= para token, formato y User-Agent

```python
import requests

cabeceras = {
    "Authorization": "Bearer mi-token-secreto",
    "Accept": "application/json",
    "User-Agent": "MiApp/1.0",
}
resp = requests.get("https://api.github.com/user", headers=cabeceras)
print(resp.status_code)   # 200 con token válido, 401 sin él
```

<div class="warning">
  <strong>Seguridad</strong>: un token en <code>Authorization</code> nunca va en claro en el código ni se sube a GitHub. En la <strong>UD 08</strong> lo guardarás en variables de entorno con <code>python-dotenv</code>.
</div>

---
class: compact-slide
---

## Mini-chequeo: el GET

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde en 30 segundos:
</div>

1. ¿Qué devuelve `requests.get` exactamente?
2. ¿Para qué sirve `params=` y qué construye por ti?
3. ¿Qué propiedad te dice si el código está entre 200 y 399?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Un <strong>objeto respuesta</strong> con <code>status_code</code>, <code>headers</code>, <code>text</code>, <code>json()</code>, <code>ok</code> y <code>elapsed</code></li>
    <li>Construye la <strong>query string</strong> de la URL (con <code>?</code> y <code>&amp;</code>) y escapa los caracteres especiales</li>
    <li><code>resp.ok</code> → <code>True</code> si el código está entre 200 y 399</li>
  </ul>
</div>

---
class: compact-slide
---

## 07 · POST, PUT y DELETE
### Enviar datos a la API

```python
import requests

resp = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json={"title": "foo", "body": "bar", "userId": 1},
)
print(resp.status_code)   # 201 Created
print(resp.json()["id"])  # 101: el ID del recurso creado
```

<div class="info">
  El <code>json=</code> convierte tu diccionario a JSON y lo pone en el <strong>cuerpo</strong>. JSONPlaceholder es una API de pruebas: cada POST devuelve el recurso creado con un ID nuevo.
</div>

---
class: compact-slide
---

## PUT y PATCH: actualizar
### Reemplazo completo frente a retoque parcial

```python
import requests

# PUT — reemplaza el recurso completo (idempotente)
resp = requests.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    json={"title": "nuevo titulo", "body": "nuevo cuerpo", "userId": 1},
)
print(resp.status_code)              # 200 OK
print(resp.json()["title"])          # "nuevo titulo"

# PATCH — solo el campo que cambia
resp = requests.patch(
    "https://jsonplaceholder.typicode.com/posts/1",
    json={"title": "solo el titulo"},
)
```

---
class: compact-slide
---

## DELETE: borrar

```python
import requests

resp = requests.delete("https://jsonplaceholder.typicode.com/posts/1")
print(resp.status_code)   # 200 en JSONPlaceholder
# En REST puro, un borrado exitoso devuelve 204 No Content
```

<div class="info">
  El código de estado <strong>confirma el resultado</strong>. Un DELETE exitoso en REST canónico es <strong>204 No Content</strong>: no hay cuerpo que leer.
</div>

---
class: compact-slide
---

## Gestión de errores
### status_code a mano o raise_for_status()

```python
import requests

# Opción 1: comprobar el código
resp = requests.post(url, json={"title": "x", "body": "y"})
if resp.status_code == 201:
    print("✅ Creado con ID", resp.json()["id"])
else:
    print("❌ Algo falló:", resp.status_code)

# Opción 2: que lance excepción si es 4xx/5xx
try:
    resp = requests.get("https://httpbin.org/status/404")
    resp.raise_for_status()
    datos = resp.json()
except requests.exceptions.HTTPError as e:
    print("⚠️ Error HTTP:", e)
```

---
class: compact-slide
---

## Pool Puzzle: petición con errores
### ¿En qué orden van estas líneas?

<div class="question-card">
  <span class="question-icon">🧩</span>
  <code>b) import requests</code> · <code>h) try:</code> · <code>d) respuesta = requests.get(...)</code> · <code>a) if status_code == 200:</code> · <code>e) datos = respuesta.json()</code> · <code>g) print(datos["login"])</code> · <code>f) else:</code> · <code>c) print("Error:", status_code)</code>
</div>

<div class="answer-card">
  <strong>🔓 Solución:</strong> <strong>b → h → d → a → e → g → f → c</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>El <code>try</code> rodea toda la operación de red</li>
    <li>Primero se comprueba el código HTTP, después se parsea</li>
    <li>Sin el <code>if</code> de estado podrías intentar parsear un 404</li>
  </ul>
</div>

---
class: compact-slide
---

## Mini-chequeo: POST, PUT y DELETE

<div class="question-card">
  <span class="question-icon">🧠</span>
  Sin mirar el código:
</div>

1. ¿Qué hace `json=` en `requests.post`?
2. ¿Qué código devuelve un POST exitoso y qué devuelve un DELETE exitoso?
3. ¿Qué lanza `raise_for_status()` y cuándo lo usarías?

<div class="answer-card">
  <strong>🔄 Respuestas:</strong>
  <ul style="font-size:0.9rem;margin-top:0.4rem;">
    <li>Convierte el <strong>diccionario</strong> a JSON y lo pone en el <strong>cuerpo</strong> de la petición</li>
    <li>POST → <strong>201 Created</strong>; DELETE → <strong>204 No Content</strong> (JSONPlaceholder responde 200)</li>
    <li>Lanza <code>HTTPError</code> si el código es 4xx/5xx: úsalo para abortar sin parsear una respuesta mala</li>
  </ul>
</div>

---
class: compact-slide
---

## 08 · Práctica: mini cliente de API
### Petición, estado y datos: el esqueleto de todo cliente

```python
import requests

def obtener_usuario(nombre):
    """Devuelve un dict con los datos del usuario o None si no existe."""
    resp = requests.get(f"https://api.github.com/users/{nombre}")
    if resp.status_code == 200:
        return resp.json()
    if resp.status_code == 404:
        print(f"❌ El usuario '{nombre}' no existe.")
    else:
        print(f"⚠️ Código inesperado: {resp.status_code}")
    return None

def resumen_usuario(datos):
    print(f"👤 Login:      {datos['login']}")
    print(f"📛 Nombre:     {datos['name']}")
    print(f"📦 Repos:      {datos['public_repos']}")
    print(f"🧑‍🤝‍🧑 Seguidores: {datos['followers']}")

if __name__ == "__main__":
    datos = obtener_usuario("python")
    if datos:
        resumen_usuario(datos)
```

---
class: compact-slide
---

## Sé el código: una petición GET
### Milisegundo a milisegundo

```
1. requests.get("https://api.github.com/users/python")
2. Construye la URL → scheme: https · host: api.github.com · path: /users/python
3. DNS lookup: api.github.com → 140.82.121.5
4. Three-way handshake TCP + handshake TLS (cifrado)
5. Envía: GET /users/python HTTP/1.1 + Host + User-Agent + Accept
6. ⏳ Espera respuesta (~150 ms)
7. Recibe: HTTP/1.1 200 OK · Content-Type: application/json
8. requests parsea el JSON → dict · datos["login"] → "python"
```

<div class="info">
  Todo lo que en la UD 05 hacías a mano —DNS, TCP, TLS, construir la petición— lo hace <code>requests</code> en una línea. Tu única tarea es <strong>leer la respuesta</strong>.
</div>

---
class: compact-slide
---

## Aprieta el lápiz
### Cuatro ejercicios contra APIs reales

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>GET a GitHub API</strong>: del usuario «python», muestra nombre real, repos públicos y seguidores.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Parámetros de búsqueda</strong>: repos de Python con más de 1000 estrellas en <code>/search/repositories</code>, ordenados por estrellas.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>POST a JSONPlaceholder</strong>: crea un post en <code>/posts</code> y muestra el ID devuelto.</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>Gestión de errores</strong>: pide una URL de 404 y otra de 500 y muestra mensajes adecuados sin que el programa reviente.</div>
</div>

<div class="warning">
  El patrón que se repite en todos: <code>requests.get</code> → comprobar <code>status_code</code> → <code>resp.json()</code> → usar los datos.
</div>

---
class: compact-slide
---

## Soluciones clave

```python
import requests

# 1. GET a GitHub API
datos = requests.get("https://api.github.com/users/python").json()
print(datos["name"], datos["public_repos"], datos["followers"])

# 2. Búsqueda con params
params = {"q": "python stars:>1000", "sort": "stars", "per_page": 5}
resp = requests.get("https://api.github.com/search/repositories", params=params)
for repo in resp.json()["items"]:
    print(repo["full_name"], "★", repo["stargazers_count"])

# 3. POST: crear y leer el ID
resp = requests.post("https://jsonplaceholder.typicode.com/posts",
                     json={"title": "foo", "body": "bar", "userId": 1})
print(resp.status_code, resp.json()["id"])   # 201 101
```

---
class: compact-slide
---

## 09 · Cierre: laboratorio de tortura

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content"><strong>GET básico</strong>: de <code>/users/python</code>, muestra <code>login</code>, <code>name</code>, <code>public_repos</code> y <code>followers</code>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content"><strong>Búsqueda con params</strong>: <code>{"q": "python stars:>1000", "sort": "stars", "per_page": 5}</code>.</div>
</div>
<div class="step">
  <div class="step-number">3</div>
  <div class="step-content"><strong>POST</strong> en JSONPlaceholder y muestra el ID devuelto.</div>
</div>
<div class="step">
  <div class="step-number">4</div>
  <div class="step-content"><strong>PUT</strong> del post 1: comprueba que el título cambió.</div>
</div>
<div class="step">
  <div class="step-number">5</div>
  <div class="step-content"><strong>DELETE</strong> del post 1: muestra el código de estado.</div>
</div>
<div class="step">
  <div class="step-number">6</div>
  <div class="step-content"><strong>Errores</strong>: pide <code>/users/usuarioquenoexiste123</code> y muestra «no encontrado» sin reventar.</div>
</div>

<div class="warning">
  <strong>Fallo intencionado:</strong> cambia el POST por un <code>GET</code> a <code>https://api.github.com/user/repos</code> sin token. GitHub responde <strong>404</strong> y, si llamas a <code>resp.json()</code> sin comprobar el estado, el programa revienta: los métodos no son intercambiables.
</div>

---
---

## Logros de esta unidad

| Logro | Cómo conseguirlo |
| :--- | :--- |
| 🏅 **HTTP Rider** | Explicar de memoria la anatomía de una petición y una respuesta HTTP |
| 🏅 **Verb Master** | Elegir GET, POST, PUT, PATCH o DELETE para cada operación CRUD |
| 🏅 **Status Whisperer** | Interpretar 200, 201, 400, 401, 404 y 500 sin mirar la tabla |
| 🏅 **JSON Parsel** | Parsear una respuesta JSON a dict y extraer campos con seguridad |
| 🏅 **API Client** | Construir un mini cliente con GET, POST y gestión de errores |

---
class: compact-slide
---

## Atrévete a pensar

<div class="question-card">
  <span class="question-icon">🧠</span>
  1. ¿Por qué POST no es idempotente y PUT sí? · 2. ¿Qué diferencia hay entre 401 y 403? · 3. ¿Por qué REST prefiere <code>/usuarios/5</code> a <code>getUsuario?id=5</code>? · 4. ¿Qué consecuencias tiene «sin estado» para el servidor? · 5. ¿Cuándo usarías <code>resp.text</code> en lugar de <code>resp.json()</code>?
</div>

<div class="answer-card">
  <strong>💡 Soluciones:</strong>
  <ul style="font-size:0.88rem;margin-top:0.4rem;">
    <li>POST crea un recurso nuevo en cada llamada; PUT reemplaza el completo, así que repetirlo deja el mismo estado</li>
    <li>401 = no te has autenticado; 403 = autenticado pero sin permiso</li>
    <li>La URL nombra la cosa y el método dice qué hacer: la API se vuelve predecible</li>
    <li>El servidor no guarda contexto: no le pesa «recordar» a nadie y escala fácil</li>
    <li>Para ver el cuerpo en bruto: inspeccionar un error, comprobar que devuelve HTML o depurar</li>
  </ul>
</div>

---
class: compact-slide
---

## Entrevista de trabajo

1. «¿Qué es una API REST? Explícala como si fuera un camarero.»
2. «¿Qué diferencia hay entre GET y POST? ¿Y entre PUT y PATCH?»
3. «Explica los códigos de estado: 200, 201, 400, 401, 404 y 500.»
4. «Escribe en Python una petición GET con parámetros y procesa la respuesta JSON.»
5. «¿Cómo gestionarías los errores de una petición HTTP en tu código?»

<div class="info">
  La 1 y la 4 son las «preguntas reina»: recorre los cuatro pilares de REST con la analogía del camarero, y escribe el esqueleto <code>params=</code> → <code>status_code</code> → <code>resp.json()</code>.
</div>

---
class: compact-slide
---

## Resumen de la unidad

<div class="features-grid" style="grid-template-columns:repeat(5,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🌍</span><strong>HTTP</strong><br>Petición y respuesta; URL con scheme, host, path y query</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚦</span><strong>Verbos</strong><br>GET lee, POST crea, PUT reemplaza, PATCH retoca, DELETE borra</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏛️</span><strong>REST</strong><br>Recursos con URL, verbos, sin estado y JSON</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🚨</span><strong>Códigos</strong><br>2xx éxito · 3xx redirección · 4xx tuyo · 5xx del servidor</div>
  <div class="feature-item" style="padding:0.6rem 0.5rem;font-size:0.85rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🐍</span><strong>requests</strong><br>params, headers, json= y raise_for_status()</div>
</div>

<div class="success" style="margin-top:0.6rem;">
  Siguiente parada, <strong>UD 08 · APIs comerciales</strong>: OpenWeatherMap, OpenAI y las API keys que nunca, jamás, se suben a GitHub.
</div>

---
layout: closing
---
