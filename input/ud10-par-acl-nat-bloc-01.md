---
layout: cover
---

# Unidad 10 — ACL y NAT<br>Bloque 1: quién pasa y quién no

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## Las ACL: la idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>ACL</strong> (Access Control List) es el <strong>portero del router</strong>: una lista ordenada de reglas que se lee <strong>de arriba abajo</strong> y que decide, paquete a paquete, si <strong>pasa o se descarta</strong>. Sin ACL, todo el tráfico entra — con ACL, tú escribes la puerta.
  </div>
</div>

Hasta UD09 movías tráfico con rutas — el router buscaba «a dónde va». Ahora controlas «<strong>quién tiene permitido ir</strong>». Es el salto de administrador a <strong>administrador con criterio de seguridad</strong>: la misma tabla de ruteo, pero filtrando por origen, destino, puerto o protocolo. En este bloque: cómo evalúa el router una lista, cómo se escriben las máscaras wildcard y qué tipos de ACL hay.

---
---

## Para qué sirve: tres usos protagonistas

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Filtrar tráfico</strong> — el uso estrella: «la VLAN de invitados no llega a la LAN corporativa».</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Clasificar</strong>: seleccionar qué tráfico merece otros servicios (NAT, QoS, route-maps). La ACL no filtra: <em>lista</em> qué paquetes cumplen.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Proteger el acceso</strong>: con <code>access-class</code> en las líneas VTY decides <strong>desde qué IPs se puede hacer Telnet/SSH al router</strong>.</div></div>

<div class="info" style="margin-top:0.5rem;">
  Aviso de nomenclatura: <strong>permit</strong> = pasa, <strong>deny</strong> = se descarta. Los usos 2 y 3 no «bloquean» nada — usan la lista como <strong>criba</strong>: lo que cumple, gana el servicio.
</div>

---

## La regla de oro: se lee en orden e implicit deny

<div class="step"><div class="step-number">1</div><div class="step-content">El router <strong>lee las reglas de arriba abajo</strong> y aplica la <strong>primera que case</strong>: no sigue leyendo. Cambiar el orden cambia el resultado.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Si <strong>ninguna regla casa</strong>, entra el <strong>deny implícito</strong>: la última regla invisible de toda ACL es <code>deny any</code>. <em>Una ACL vacía bloquearía internet entera</em>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Lectura mental: «¿Primera que aplique? Permito o deniego y <strong>termino</strong>. No hay segundas oportunidades».</div></div>

<div class="warning" style="margin-top:0.6rem;">
  <strong>Consecuencia operativa:</strong> las reglas <strong>más específicas van arriba</strong> y las genéricas abajo. Si pones <code>permit any</code> primero, ninguna regla que va debajo se leerá nunca.
</div>

---

## Wildcards: la máscara que conoces, al revés

| Máscara normal | Wildcard | Qué casa |
|---|---|---|
| `255.255.255.255` | `0.0.0.0` | Un host exacto (`host 192.168.10.5`) |
| `255.255.255.0` | `0.0.0.255` | Toda la red /24 |
| `255.255.0.0` | `0.0.255.255` | Todo un /16 |
| — | `255.255.255.255` | <code>any</code>: «cualquiera» |

<div class="info" style="margin-top:0.5rem;">
  Truco: <strong>wildcard = 255.255.255.255 − máscara</strong>. En OSPF en UD09 ya la usaste en el <code>network … 0.0.0.3 …</code> — aquí es exactamente la misma pieza.
</div>

---

## Los tipos: estándar y extendida

<div class="comparison-grid">
  <div class="comparison-item good">
    <strong>Estándar (1–99)</strong>
    <p>Filtra <strong>solo por origen</strong>: «los PCs de la VLAN 20 no pasan». Es la pregunta de «<strong>quién</strong>». Compacta pero torpe: no mira destino ni puerto.</p>
  </div>
  <div class="comparison-item bad">
    <strong>Extendida (100–199)</strong>
    <p>Filtra por <strong>origen + destino + protocolo + puerto</strong>: «la VLAN 20 puede navegar (TCP 80/443) a la web interna, pero no usar RDP». Precisión de cirujano.</p>
  </div>
</div>

<div class="info" style="margin-top:0.6rem;">
  También existen las <strong>named</strong> (con nombre en vez de número, se editan línea a línea) y el <strong>número</strong> solo es una convención de clasificación — el comportamiento lo define el contenido.
</div>

---

## La tabla de decisión del portero

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud10-par-acl-evaluacion.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

---

## Dónde colocarla: la regla de proximidad

| Tipo | Dónde aplicarla | Por qué |
|---|---|---|
| <strong>Estándar</strong> | <strong>Cerca del destino</strong> | Solo ve el origen: si la pones lejos, cortas de más |
| <strong>Extendida</strong> | <strong>Cerca del origen</strong> | Describe todo el viaje: filtra <em>antes</em> de recorrer la red en balde |

<div class="warning" style="margin-top:0.6rem;">
  Colocar es <strong>medio del trabajo</strong>: una ACL bien escrita en la interfaz equivocada protege… a nadie. Y <strong>dónde y en qué sentido</strong> filtra: <code>in</code> mira lo que entra a la interfaz, <code>out</code> lo que sale de ella.
</div>

---
class: compact-slide
---

## La sintaxis estándar de un vistazo

<div class="code-card">
  <div class="code-card-header">
    <div class="code-card-dots"><span></span><span></span><span></span></div>
    <div class="code-card-title">Router(config)# ACL estándar 10 en un /24</div>
  </div>
  <pre><code>Router(config)# access-list 10 permit 192.168.10.0 0.0.0.255
Router(config)# access-list 10 deny   192.168.20.0 0.0.0.255
Router(config)# access-list 10 permit any
Router(config-if)# ip access-group 10 in</code></pre>
</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><code>access-list 10</code>: es una estándar (1–99). Cada <code>access-list</code> <strong>añade una línea</strong> al final — no se edita en sitio.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><code>permit / deny</code> + origen <strong>con wildcard</strong>. <code>any</code> equivale a <code>0.0.0.0 255.255.255.255</code>.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">La última línea de la lista (implicit deny) <strong>no se ve</strong>, pero está: si te olvidas un <code>permit</code>, bloqueas.</div></div>

---

## Mini-chequeo: el portero

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué pasa si <strong>ninguna</strong> regla casa con un paquete?
2. Una ACL con <code>permit any</code> en la línea 1 y <code>deny host x</code> en la 2: ¿se aplica el deny?
3. ¿La wildcard de la máscara <code>255.255.252.0</code>?

<div class="answer-card" style="margin-top:0.7rem;">
  <strong>1.</strong> Se cae al <strong>deny implícito</strong>: el paquete se descarta. · <strong>2.</strong> No: la primera que casa <strong>termina la evaluación</strong> — el host queda permitido por la línea 1. El orden es todo. · <strong>3.</strong> <code>0.0.3.255</code> — máscara invertida (255.255.255.255 − máscara).
</div>

---

## Logros y siguientes pasos

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 <strong>Lector de evaluación</strong> | Decidir paquete a paquete si pasa o no, con el orden en la cabeza |
| 🏅 <strong>Domador de wildcards</strong> | Escribir la wildcard correcta para cualquier máscara, sin dudar |
| 🏅 <strong>Elección de tipo</strong> | Ante un requisito, decir si basta la estándar o hace falta extendida |
| 🏅 <strong>Ubicación correcta</strong> | Decidir interfaz y dirección (in/out) de una ACL nueva |

<div class="info" style="margin-top:0.6rem;">
  <strong>Bloque 2:</strong> ACLs named y extendidas a la obra, VTY protegida con <code>access-class</code> y verificación. Para practicar: boletines U10 en Packet Tracer.
</div>

---
layout: closing
---
