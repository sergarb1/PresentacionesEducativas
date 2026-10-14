---
layout: cover
---

# Unidad 10 — ACL y NAT<br>Bloque 2: ACLs a la obra

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## ACLs named: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Las ACL modernas se escriben <strong>con nombre</strong> y <strong>se editan línea a línea</strong>: ya no reescribes la lista entera para cambiar una regla. Y las <strong>extendidas</strong> te dejan decidir por origen, destino, protocolo y puerto — el filtro fino de verdad.
  </div>
</div>

La estándar numerada del bloque 1 sirve para empezar, pero en la vida real quieres listas legibles (<code>VLAN20-WEB-SOLO</code>) y editables sin recrearlas. En este bloque: named y extendidas en el escenario de UD09 (3 routers + 3 LANs), el acceso al propio router y la verificación completa.

---
---

## Named: el formato nuevo, el mismo portero

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">ACL estándar named para bloquear la VLAN 20</div>
  </div>
  <pre><code>R1(config)# ip access-list standard BLOQUEA-VLAN20
R1(config-std-nacl)# deny   192.168.20.0 0.0.0.255
R1(config-std-nacl)# permit any
R1(config-std-nacl)# exit
R1(config)# interface g0/0
R1(config-if)# ip access-group BLOQUEA-VLAN20 in</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><code>ip access-list standard</code>: entras al <strong>modo de edición</strong> de la lista. Cada línea que escribes <strong>entra donde la escribes</strong>, no al final.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Inserción quirúrgica: <code>15 deny host 192.168.20.9</code> — el <strong>número de secuencia</strong> la coloca en su sitio, sin borrar la lista.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Se aplica igual que siempre: <code>ip access-group</code> en la interfaz, con el sentido <strong>in / out</strong>.</div></div>

---

## Extendida: el diseño fino

| # | Requisito | Regla (extendida) |
|---|---|---|
| 1 | VLAN 20 navega a la web externa | `permit tcp 192.168.20.0 0.0.0.255 any eq 80` y `…443` |
| 2 | VLAN 20 consulta DNS del servidor LAN 30 | `permit udp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 53` |
| 3 | VLAN 20 no llega a nada más de la LAN 30 | `deny ip 192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255` |
| 4 | Todo lo demás pasa | `permit ip any any` |

<div class="info" style="margin-top:0.6rem;">
  El orden aquí es la <strong>lección de cirugía</strong>: la regla fina del DNS (2) debe ir <strong>antes</strong> del deny genérico (3) — si no, nunca se leerá. Y el <code>permit ip any any</code> final evita que el deny implícito coma lo que no miraste.
</div>

---
class: compact-slide
---

## Extendida: la sintaxis completa

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R2# ip access-list extended VLAN20-POLICY</div>
  </div>
  <pre><code>R2(config)# ip access-list extended VLAN20-POLICY
R2(config-ext-nacl)# permit udp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 53
R2(config-ext-nacl)# permit tcp 192.168.20.0 0.0.0.255 any eq 80
R2(config-ext-nacl)# permit tcp 192.168.20.0 0.0.0.255 any eq 443
R2(config-ext-nacl)# deny   ip  192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255
R2(config-ext-nacl)# permit ip  192.168.20.0 0.0.0.255 any
R2(config-if)# ip access-group VLAN20-POLICY in</code></pre>
</div>

| Pieza | Qué dice |
|---|---|
| `extended` | Activa el modo fino: <strong>proto + origen + destino + puerto</strong> |
| `tcp / udp / icmp / ip` | El <strong>protocolo</strong> a filtrar (ip = todos) |
| `eq 80 / eq 443 / eq 53` | El <strong>puerto destino</strong> (o nombre de servicio: `eq www`, `eq domain`) |
| `host x / any` | Un equipo concreto (<strong>wildcard 0.0.0.0</strong>) o cualquiera |

---

## El mapa de colocación del escenario

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud10-par-colocacion-acl.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Proteger el router: access-class en VTY

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Solo la LAN de administración puede entrar por SSH</div>
  </div>
  <pre><code>R1(config)# ip access-list standard MGMT-SOLO
R1(config-std-nacl)# permit 192.168.10.0 0.0.0.255
R1(config-std-nacl)# exit
R1(config)# line vty 0 4
R1(config-line)# access-class MGMT-SOLO in
R1(config-line)# transport input ssh</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content">Las líneas <strong>VTY</strong> son las «puertas de gestión» del router (Telnet/SSH). Un ACL en una interfaz <strong>no</strong> las protege: portero distinto.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><code>access-class … in</code> aplica la ACL <strong>a las conexiones de gestión</strong>: solo IPs <code>permit</code> abren sesión; el resto ni ve el prompt.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><code>transport input ssh</code> remata: cierra Telnet (texto claro) y solo acepta <strong>SSH cifrado</strong>. Es administración + ACL, el dúo clásico.</div></div>

---

## Verificación: el ritual ACL

| Comando | Qué te muestra |
|---|---|
| `show access-lists` | La lista <strong>con sus contadores</strong>: cuántos paquetes han casado cada regla |
| `show ip interface g0/0` | Qué ACL tiene aplicada la interfaz y en qué sentido |
| `show ip access-lists` | Solo las de IP (más rápido) |
| `show running-config \| section access` | Las reglas tal y como están configuradas |

<div class="info" style="margin-top:0.6rem;">
  Los <strong>match</strong> de <code>show access-lists</code> son tu verdad: si una regla acumula 0 matches, o no pasa el tráfico que creías o la mandaste a la interfaz equivocada — <strong>la colocación manda</strong>.
</div>

---

## El fallo clásico: la regla que nunca se lee

<div class="step"><div class="step-number">1</div><div class="step-content">Quitas Telnet con <code>deny tcp … eq 23</code>, pero te olvidas de que <strong>SSH usa otro puerto</strong>: 22. El router sigue entrando.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">O pones <code>deny ip …</code> <strong>después</strong> del <code>permit ip any any</code>: la primera regla casa <strong>siempre</strong> — el deny jamás se ejecuta.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Diagnóstico: <code>show access-lists</code> y fijate en los <strong>matches 0</strong> — una regla sin contadores es sospechosa de estar mal colocada o mal escrita.</div></div>

<div class="warning" style="margin-top:0.6rem;">
  Regla de oro para el examen: <strong>lo más específico arriba, lo genérico abajo</strong>, verifica con matches y prueba <em>desde el equipo afectado</em>, no desde el router.
</div>

---

## Mini-chequeo: named y extendidas

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué ventaja tiene una ACL named sobre una numerada?
2. Ordena estas reglas: deny ip a LAN 30 · permit udp → DNS · permit ip any
3. ¿Qué comando te dice qué ACL tiene una interfaz aplicada y en qué sentido?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Se edita línea a línea con secuencias (sin recreatearla) y tiene nombre legible que explica su función. · <strong>2.</strong> DNS primero (más específico), luego deny a LAN 30, y <code>permit ip any</code> al final — el deny implícito ya cubre si falta algo. · <strong>3.</strong> <code>show ip interface &lt;interfaz&gt;</code> — lista ACL aplicada in/out.
</div>

---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Editor fino</strong> | Insertar una regla por número de secuencia sin borrar la lista |
| 🏅 <strong>Político extensionado</strong> | Una Política VLAN20-POLICY funcionando: DNS + web, nada más |
| 🏅 <strong>Router blindado</strong> | VTY con <code>access-class</code> + SSH only y Telnet muerto |
| 🏅 <strong>Lector de matches</strong> | Diagnosticar una regla muerta con <code>show access-lists</code> |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 3:</strong> NAT y PAT — cómo sale tu red privada a Internet con una sola IP pública, la pieza que completa el escenario. Para practicar: boletines U10 en Packet Tracer.
</div>

---
layout: closing
---
