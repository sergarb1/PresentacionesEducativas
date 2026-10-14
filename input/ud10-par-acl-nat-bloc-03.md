---
layout: cover
---

# Unidad 10 — ACL y NAT<br>Bloque 3: NAT y cierre de unidad

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## NAT: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    El <strong>NAT</strong> (Network Address Translation) reescribe las direcciones IP en el borde de tu red: tus equipos privados (192.168.x.x) comparten <strong>una sola IP pública</strong> para salir a Internet. El router lleva la contabilidad de quién habla con quién.
  </div>
</div>

Es el servicio que usas todos los días sin verlo: las direcciones privadas de UD04 (<strong>192.168.0.0/16, 172.16.0.0/12, 10.0.0.0/8</strong>) no se rutean por Internet — <strong>alguien tiene que traducirlas</strong>, y ese alguien es tu router de salida. En este bloque: configurarlo, verificarlo y cerrar la unidad con el laboratorio.

---
---

## Los tres tipos de NAT

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>Estático — 1 a 1 fijo</strong>
    <p><code>200.1.1.10 ↔ 192.168.30.10</code><br>para <strong>servidores expuestos</strong>: el mundo entra a tu web por la IP pública, el router la traduce a la privada: <strong>traducción permanente</strong>.</p>
  </div>
  <div class="comparison-item"></div>
  <div class="comparison-item">
    <strong>Dinámico — pool de públicas</strong>
    <p>Una <strong>cola de IPs públicas</strong> se asigna según va llegando quien necesita salir. Libre al inicio, escaso cuando acabas el pool.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  El tercero — y el que usará el 99 % de las redes — es <strong>PAT / NAT Overload</strong>: todos los equipos comparten <em>una</em> IP pública y el router los distingue por <strong>número de puerto</strong>. Vale con 1 pública para 500 equipos: es el «much-to-one».
</div>

---

## Cómo razona el PAT: tabla de traducción

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud10-par-pat-traduccion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Configurar PAT en el router de salida

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">R2 — el router que ve el ISP (203.0.113.0/30)</div>
  </div>
  <pre><code>R2(config)# ip access-list standard NAT-LAN
R2(config-std-nacl)# permit 192.168.0.0 0.0.255.255
R2(config-std-nacl)# exit
R2(config)# ip nat inside source list NAT-LAN interface Serial0/1/0 overload
R2(config)# interface g0/0
R2(config-if)# ip nat inside
R2(config)# interface s0/1/0
R2(config-if)# ip nat outside</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>ACL</strong>: qué tráfico se traduce — la fórmula clásica usa una <strong>estándar</strong> que lista tus redes privadas. <em>Otra vez la ACL como criba</em>, no como portero.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><code>overload</code>: activa <strong>PAT</strong> — todos los que den NAT-LAN salen por la <strong>misma IP</strong> (la de la interfaz externa) con puertos distintos.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><code>ip nat inside / outside</code>: etiquetas <strong>la interfaz interna</strong> (hacia tus LANs) y la externa (hacia el ISP) — sin esto el router no sabe por qué lado traducir.</div></div>

---

## El NAT estático: exponer un servidor

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">El mundo pide 203.0.113.2:80 → va a tu servidor interno</div>
  </div>
  <pre><code>R2(config)# ip nat inside source static tcp 192.168.30.10 80 203.0.113.2 80
R2(config)# ip nat inside source static tcp 192.168.30.10 443 203.0.113.2 443</code></pre>
</div>

<div class="info" style="margin-top:0.5rem;">
  La <strong>pareja de la ACL extendida</strong> del bloque 2: <strong>la ACL decide quién sale</strong> (privado → público) y el <strong>NAT estático decide quién entra</strong> (público → privado). Con dos herramientas cubres todo el perímetro del aula.
</div>

---
class: compact-slide
---

## Verificar el NAT: el ritual

| Comando | Qué te muestra |
|---|---|
| `show ip nat translations` | La <strong>tabla viva</strong>: interna↔externa por puerto (expira en segundos) |
| `show ip nat statistics` | Total, aciertos, fallos, qué interfaz es inside/outside |
| `debug ip nat` | Cada traducción <em>en directo</em> (en Packet Tracer) |
| `clear ip nat translation *` | Vaciar la tabla si te quedas sin puertos (con cuidado) |

<div class="warning" style="margin-top:0.6rem;">
  Diagnóstico de patrón: <strong>el ping de un PC interno a 8.8.8.8 falla</strong> pero el <code>show ip nat statistics</code> muestra activos → revisa la <strong>ACL del NAT</strong>; si la tabla está vacía y los paquetes sin traducir, revisa las etiquetas <strong>inside/outside</strong>.
</div>

---

## ⚡ Laboratorio: cierre — la red a examen completo

<div class="two-cols">
  <div class="left">
    <div class="info" style="padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;">
      <p><strong>Montaje</strong> (2 h, Packet Tracer): el escenario de UD09 (R1–R2–R3 + 3 LANs) + enlace R2 al ISP con IP pública.</p>
      <p><strong>Lo que cruzan la misma mesa:</strong></p>
      <p><strong>A.</strong> Rutas dinámicas para las LANs entre routers<br>
      <strong>B.</strong> ACL extendida: VLAN 20 solo DNS + web<br>
      <strong>C.</strong> PAT en R2 hacia el ISP + NAT estático para el web server</p>
    </div>
  </div>
  <div class="right">
    <div class="info" style="height:100%;padding:0.85rem 1rem;font-size:0.95rem;line-height:1.45;display:flex;flex-direction:column;justify-content:center;">
      <p><strong>Nivel 2 (opcional, para nota):</strong></p>
      <p>Protege todo el router con <code>access-class</code> en VTY y <code>transport input ssh</code>: el router solo accede por la LAN de gestión, en SSH cifrado.</p>
      <p><strong>Criterio de éxito:</strong> un PC de la VLAN 10 navega a <code>8.8.8.8</code>, la VLAN 20 alcanza el DNS pero no logra RDP a la LAN 30, el mundo pide el web server — y la tabla de <code>show ip nat translations</code> te lo cuadra todo.</p>
    </div>
  </div>
</div>

---

## Mini-chequeo: NAT y cierre

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué hace la palabra <code>overload</code>?
2. Un servidor web interno tiene que ser accesible — ¿qué NAT usas?
3. ¿Qué comando deja ver la tabla de traducciones en directo?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Activa PAT: muchos equipos privados comparten <em>una</em> IP pública, diferenciados por puerto. · <strong>2.</strong> <strong>NAT estático</strong> (1 a 1, permanente): la IP pública apunta siempre al privado. · <strong>3.</strong> <code>show ip nat translations</code>.
</div>

---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Traductor a su vez</strong> | PAT funcionando: VLANs completas saliendo por 1 IP pública |
| 🏅 <strong>Portero y traductor</strong> | ACL + NAT estático atravesando el perímetro en ambos sentidos |
| 🏅 <strong>Examen completo</strong> | El laboratorio final: routing + ACL + NAT coherentes y verificados |
| 🏅 <strong>Perímetro dominado</strong> | Explicar en 1 min cómo entra el mundo a tu web y cómo sales tú a Internet |

<div class="info" style="margin-top:0.6rem;">
  <strong>Cierre de PAR:</strong> con UD05–UD10 ya dominas el plano entero del administrador de red de aula: VLANs, enrutamiento, servicios y <strong>perímetro</strong>. Para practicar: boletines U10 en Packet Tracer.
</div>

---
layout: closing
---
