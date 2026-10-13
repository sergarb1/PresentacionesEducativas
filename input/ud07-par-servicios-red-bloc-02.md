---
layout: cover
---

# Unidad 07 — Servicios de red<br>Bloque 2: DNS y NTP, nombres y hora

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## DNS: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>DNS</strong> es la <strong>agenda de la red</strong>: traduce nombres (<code>www.ceedcv.es</code>) a direcciones IP que los equipos entienden, en una <strong>jerarquía mundial</strong> repartida entre millones de servidores. Sin DNS, Internet sigue ahí pero habría que memorizar direcciones IP.
  </div>
</div>

Nadie sabe «dónde está» la web del instituto: escriben su nombre y el DNS, por delegación de autoridad, va encontrando a quién responder cada trozo. En este bloque: cómo se resuelve esa pregunta paso a paso, qué registros existen, cómo diagnosticar con nslookup y, de propina, el otro servicio discreto pero imprescindible: la <strong>hora sincronizada</strong> (NTP).

---

## La jerarquía: delegar hasta encontrar al dueño

El nombre se lee «al revés», de lo más general a lo más específico:

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Raíz</strong> (<code>.</code>): satélites de etiquetas de nivel superior. Te manda al servidor que lleva el <strong>.es</strong>.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>TLD</strong> (<code>.es</code>): el administrador del país o del genérico. Te responde con los DNS de <strong>ceedcv.es</strong>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Autoritativo</strong>: el servidor del propio centro (<code>dns.ceedcv.es</code>). Es el <strong>dueño de la verdad</strong>: contesta la IP de <code>www.ceedcv.es</code>.</div></div>

<div class="info" style="margin-top:0.5rem;">
  Cada eslabón solo contesta «para eso pregúntale a X». <strong>Nadie sabe todo</strong>: si lo supiera, sería el único cuello de botella del mundo.
</div>

---

## El intercambio completo: resolver un nombre

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud07-par-dns-resolucion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Dos modos de preguntar: recursivo e iterativo

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>Recursivo ✅ (el cliente)</strong>
    <p>“Respóndeme tú y <strong>no me regreses hasta que la tengas</strong>». El puff (resolver local) se encarga del peregrinaje: visita raíz, TLD y autoritativo por él mismo.</p>
  </div>
  <div class="comparison-item bad">
    <strong>Iterativo (los servidores)</strong>
    <p>“No lo sé, pero <strong>pregúntale a ese</strong>…». La raíz, el TLD y el autoritativo no se ponen a investigar: solo devuelven la <strong>siguiente dirección por preguntar</strong>.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  Es el patrón de <strong>agencia de viajes</strong>: tú le encargas el viaje completo (recursivo); ella llama a la aerolínea, al hotel… que solo «pasan el teléfono» (iterativo).
</div>

---

## Los registros de la agenda: qué puede responder DNS

| Registro | Guarda | Para qué sirve |
|---|---|---|
| <strong>A</strong> | `www.ceedcv.es → 93.176.134.6` | Nombre → IPv4 |
| <strong>AAAA</strong> | `www.ceedcv.es → 2001:db8::6` | Nombre → IPv6 |
| <strong>CNAME</strong> | `web → www.ceedcv.es` | Apodo de otro nombre |
| <strong>MX</strong> | `ceedcv.es → mail.ceedcv.es` | A qué servidor va el correo |
| <strong>NS</strong> | `ceedcv.es → dns.ceedcv.es` | <strong>Quién es autoritativo</strong> de la zona |
| <strong>PTR</strong> | `6.134.176.93.in-addr.arpa → www` | La <strong>marcha atrás</strong>: IP → nombre |

<div class="warning" style="margin-top:0.5rem;">
  <strong>MX y PTR se olvidan y se ingresan mal:</strong> sin MX el correo de dominio se pierde; sin PTR, los servidores de correo de los demás te tratan como spam.
</div>

---
class: compact-slide
---

## La caché: preguntar lo menos posible

<div class="step"><div class="step-number">1</div><div class="step-content">Cada respuesta llega con un <strong>TTL</strong>: los segundos durante los que debe considerarse fiable (p. ej. `3600` = 1 hora).</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El resolver local (y también tu SO) <strong>apunta la respuesta</strong> hasta que caduca el TTL.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Si el mismo equipo vuelve a preguntar por el mismo nombre, la respuesta sale de <strong>caché</strong> sin salir de la LAN: la segunda visita es instantánea.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  La caché también guarda <strong>errores</strong> (respuestas negativas). Cambias un registro en el servidor, el mundo sigue viendo el antiguo hasta que muere el TTL: por eso los registros «antes de la mudanza» se suben con TTL corto (60–300 s).
</div>

---

## Kit de diagnóstico DNS: nslookup y amigos

| Comando | Dónde | Qué te dice |
|---|---|---|
| `nslookup www.ceedcv.es` | Cualquier equipo | Qué IP responde y <strong>quién respondió</strong> |
| `nslookup www 192.168.10.2` | Cliente | Fuerza a preguntar <strong>a un DNS concreto</strong> |
| `nslookup -type=MX ceedcv.es` | Cliente | Al registro concreto que buscas (MX, NS, TXT…) |
| `ping www.ceedcv.es` | Cliente | Resolución + conectividad en un paso |
| `ipconfig /displaydns` \| `flushdns` | Windows | Ver/vaciar caché DNS local |

<div class="info" style="margin-top:0.5rem;">
  Los dos diagnósticos de apertura: <strong>① abre por IP</strong> (p. ej. `ping 93.176.134.6`) y <strong>② abre por nombre</strong>. Si el IP sale y el nombre no: cable y router bien — <strong>es culpa del DNS</strong>.
</div>

---

## El fallo típico: habla por IP, no por nombre

<div class="step"><div class="step-number">1</div><div class="step-content">El cliente <strong>no consulta el DNS correcto</strong>: le llegó un DNS muerto, lo recibió vacío del DHCP… o se quedó sin servidores tras pasar a la VLAN de invitados.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">El navegador espera; el usuario entra por IP <strong>«y en IP sí funciona»</strong> — pista fiable de <strong>fallo DNS</strong>, no de cable roto.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Solución: verificar en el cliente el <strong>DNS entregado por DHCP</strong> (`ipconfig /all`) y comparar qué responde <strong>nslookup</strong>.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  Es el espejo del APIPA del bloque 1: ahí el síntoma era <strong>169.254.x.x</strong>; aquí es <strong>«por IP va, por nombre no»</strong>. Aprende a oler la diferencia y el diagnóstico es instantáneo.
</div>

---

## Laboratorio: DNS local en Packet Tracer

<div class="two-cols">
  <div class="left">
    <div class="info">
      <p><strong>Montaje</strong> (45 min): la red de 2 VLANs del bloque 1 + un servidor (Server-PT) en la VLAN 30 con el servicio <strong>DNS</strong> activado.</p>
      <p><strong>Tareas:</strong></p>
      <p>A. Crea las entradas A: <code>web.ceedcv.local</code>, <code>correo.ceedcv.local</code>.<br>
      B. Apunta a los PCs por DHCP (`ip name-server` del pool).<br>
      C. Comprueba: <code>nslookup web.ceedcv.local</code> desde VLAN 10 y VLAN 20.</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>El giro final</strong></p>
      <p>Baja el TTL de la entrada a 60 s, cámbiale la IP al servidor web y vigila:</p>
      <p><code>ipconfig /flushdns</code> ⇒ la nueva IP de inmediato;<br>
      sin flush, el PC insiste en la vieja <strong>hasta que muere el TTL</strong>.</p>
      <p>Esto replica a escala de aula lo que pasa en los cambios reales de DNS.</p>
    </div>
  </div>
</div>

---

## Mini-chequeo: DNS

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué tres niveles pregunta el resolver local y qué responde cada uno?
2. Diferencian recursivo e iterativo en una frase.
3. Web accesible `93.176.134.6` pero no `www.ceedcv.es`: ¿dónde está el problema y qué comando lo confirma?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Raíz (→ quién lleva el <code>.es</code>), TLD (→ los DNS del centro), autoritativo (→ la IP final). · <strong>2.</strong> El recursivo hace el peregrinaje entero; los servidores solo devuelven «la siguiente parada». · <strong>3.</strong> Falta DNS (no la red): `nslookup www.ceedcv.es` y revisar el DNS entregado por DHCP.
</div>

---
class: sparse-slide
---

## NTP: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    <strong>NTP</strong> sincroniza el reloj de los equipos con una fuente autorizada por <strong>UDP 123</strong>, midiendo el <strong>retardo del viaje</strong> para corregir con precisión de <strong>milisegundos</strong>. Sin hora fiable: logs incoherentes, sesiones que caducan antes de tiempo y certificados que dan error.
  </div>
</div>

Toda seguridad empieza por la hora: un log que no cuadra con el del PC de al lado, un Kerberos que rechaza tickets o un TLS con certificado «aún no vencido» — <strong>el reloj va desfasado</strong>. Casi siempre es un reloj mal sincronizado.

---
class: compact-slide
---

## La cadena de estratos: cómo llega la hora a tu PC

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud07-par-ntp-sync.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Los estratos de la hora

| Estratum | Quién | Nota |
|---|---|---|
| <strong>0</strong> | GPS, reloj atómico | La fuente (no habla NTP por sí misma) |
| <strong>1</strong> | Servidores oficiales (<code>es.pool.ntp.org</code>, ROA) | Directo a la fuente |
| <strong>2</strong> | Espejos de ISP, nubes | Se sincronizan con varios Stratum 1 |
| <strong>3+</strong> | <strong>El NTP de tu empresa</strong> | Del que beben <strong>todos tus equipos</strong> |
| … | Hasta 15 | Cada salto cuesta algo de precisión |

<div class="warning" style="margin-top:0.6rem;">
  Regla de aula: <strong>ningún PC pregunta directamente a Internet</strong>. Un servidor interno (Stratum 3) sincroniza con la nube — por firewalls controlados — y tus PCs con él. Caché, oro y auditoría centralizada.
</div>

---

## Configurar NTP en IOS y en Windows

En el router/servidor NTP (el Stratum 3 del aula):

```
Router(config)# ntp server es.pool.ntp.org
Router(config)# ntp master 3
Router(config)# ntp access-group restricted
```

Y los clientes (Cisco puro o Windows):

```
Router(config)# ntp server 192.168.30.2
```

```
C:\> w32tm /config /syncfromflags:manual /manualpeerlist:"192.168.30.2"
C:\> w32tm /resync
```

<div class="info" style="margin-top:0.5rem;">
  <code>ntp master 3</code> declara el propio router como fuente; <code>access-group</code> evita que sirvas hora al público: <strong>tu NTP es para tu red</strong>.
</div>

---
class: compact-slide
---

## Verificar hora y sincronización

| Comando | Dónde | Qué te dice |
|---|---|---|
| `show ntp status` | Router | Si está sincronizado y con qué estrato |
| `show ntp associations` | Router | Sus fuentes de hora y el detalle del offset |
| `w32tm /query /status` | Windows | Stratum, último resync, desfase |
| `show clock detail` | Router | La hora vigente y su fuente |

<div class="info" style="margin-top:0.5rem;">
  En <code>associations</code> buscas la palabra <strong><em>symm. active</em></strong> o <em>reach</em> con 377 (contacto estable) y un <em>offset</em> pequeño — típico pocos ms.
</div>

---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Conserje de direcciones</strong> | Monta un pool DHCP por VLAN y reserva la IP de una impresora por client-identifier |
| 🏅 <strong>Olfato de APIPA</strong> | Diagnosticar un `169.254.x.x` hasta la causa con solo `ipconfig` y `binding` |
| 🏅 <strong>Bibliotecario</strong> | Zona DNS local con A, CNAME y MX; demostrado con nslookup por registros |
| 🏅 <strong>Reloj de aula</strong> | Router como Stratum 3 y los PCs del lab cada uno se resincroniza con `w32tm /resync` |

<div class="info" style="margin-top:0.6rem;">
  <strong>Para practicar:</strong> boletines U07 en Packet Tracer. Con DHCP, DNS y NTP funcionando, tu red de prácticas ya tiene <strong>direcciones que se reparten solas, nombres que se resuelven y hora que se sostiene</strong>: la mecánica de cualquier empresa que contratará una red.
</div>

---
layout: closing
---
