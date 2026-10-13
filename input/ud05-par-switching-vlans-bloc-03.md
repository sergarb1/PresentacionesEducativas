---
layout: cover
---

# Unidad 05 — Switching y VLAN<br>Bloque 3: VLANs

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## ¿Qué es una VLAN?
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Una <strong>VLAN</strong> (<em>Virtual LAN</em>) es una <strong>red lógica</strong> creada dentro de un switch físico: los dispositivos de la misma VLAN se comportan como si estuvieran conectados al <strong>mismo switch</strong>, aunque compartan hardware con otras VLANs que «no ven».
  </div>
</div>

Comprar un switch por departamento es caro: partimos uno solo en varios «pedazos» lógicos. Como un edificio de oficinas: luz y escaleras comunes, pero los departamentos <strong>no oyen</strong> a los vecinos.

---

## El problema que resuelve

Tres departamentos (Ventas, RRHH, Dirección) en un solo switch de 48 puertos, sin VLANs: todo comparte <strong>el mismo dominio de broadcast</strong>.

<table>
  <thead><tr><th>Problema</th><th>Sin VLANs</th><th>Con VLANs</th></tr></thead>
  <tbody>
    <tr><td><strong>Broadcast</strong></td><td>Un broadcast llega a todos los puertos</td><td>Cada VLAN: dominio de broadcast propio</td></tr>
    <tr><td><strong>Seguridad</strong></td><td>Cualquiera olfatea el tráfico ajeno</td><td>Los unicasts no se reenvían entre VLANs</td></tr>
    <tr><td><strong>Flexibilidad</strong></td><td>Reorganizar = mover cables o comprar switches</td><td>Cambiar la VLAN de un puerto = una línea</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.5rem;">
  <strong>El truco mental:</strong> cada VLAN es un <strong>switch virtual independiente</strong> con su propia tabla MAC. El switch no reenvía tramas entre VLANs: a nivel de capa 2 es como si no existieran entre sí.
</div>

---
class: compact-slide
---

## Dónde terminan los dominios de broadcast

En un switch plano, todos los puertos pertenecen a un único dominio de broadcast. Al crear VLANs, decides <strong>dónde terminan los dominios</strong>:

<div class="diagram-frame" style="height:310px;">
  <Excalidraw drawFilePath="/diagrams/ud05-vlan-dominios.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>Dos VLANs que comparten switch no se ven:</strong> y «no verse» es exactamente lo que quieres entre departamentos. Para que se hablen, hace falta <strong>router</strong> o switch de capa 3 (unidad 06).
</div>

---

## VLAN 1: la que viene de fábrica

Todos los switches Cisco traen la <strong>VLAN 1</strong> creada y todos los puertos arrancan en ella.

<table>
  <thead><tr><th>Dato</th><th>Valor</th></tr></thead>
  <tbody>
    <tr><td>VLAN por defecto</td><td>VLAN 1 (siempre existe, no se puede borrar)</td></tr>
    <tr><td>Puertos por defecto</td><td>Todos en <code>access</code> sobre VLAN 1</td></tr>
    <tr><td>Native VLAN por defecto</td><td>VLAN 1 (trunking: unidad 06)</td></tr>
    <tr><td>Buena práctica</td><td><strong>No usar VLAN 1 para datos</strong></td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  VLAN 1 es la <strong>puerta de entrada</strong> de todo el que no ha configurado nada: clientes, intrusos y novatos comparten VLAN sin saberlo. Cambia la native, apaga DTP y usa VLANs numeradas (10/20/30…).
</div>

---

## Crear una VLAN en tres líneas

```
Switch(config)# vlan 10
Switch(config-vlan)# name Ventas
Switch(config)# interface range fa0/1-5
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
```

<div class="two-cols" style="margin-top:0.6rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><code>vlan 10</code> + <code>name</code>: la VLAN existe con nombre.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Los puertos van en <code>access</code> (conectan end devices, nunca switches).</div>
    </div>
  </div>
  <div class="right">
    <div class="step">
      <div class="step-number">3</div>
      <div class="step-content"><code>switchport access vlan 10</code> es <strong>la línea que no puede faltar</strong>: sin ella, el puerto se queda en la VLAN 1.</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Verificación: <code>show vlan brief</code> lista las VLANs y sus puertos.
    </div>
  </div>
</div>

---
class: compact-slide
---

## Los cuatro tipos de VLAN

Cada tipo tiene su trabajo; esta tabla es la que cae en la entrevista:

<table>
  <thead><tr><th>Tipo</th><th>Función</th><th>Ejemplo</th><th>Obsesión del admin</th></tr></thead>
  <tbody>
    <tr><td><strong>Datos</strong></td><td>Tráfico normal de usuario</td><td>VLAN 10 Ventas, VLAN 20 RRHH</td><td>Que cada depto tenga su número</td></tr>
    <tr><td><strong>Nativa</strong></td><td>La única <strong>sin etiquetar</strong> en el trunk</td><td>VLAN 1 por defecto (o 999)</td><td>Igual en los dos extremos</td></tr>
    <tr><td><strong>Voz</strong></td><td>Teléfonos IP, prioridad QoS<br>(802.1p)</td><td>VLAN 100 voz</td><td>PC + teléfono en el mismo puerto</td></tr>
    <tr><td><strong>Gestión</strong></td><td>SSH, SNMP, web del switch</td><td>VLAN 999 gestión</td><td>Que NO se alcance desde todas</td></tr>
  </tbody>
</table>

<div class="info" style="margin-top:0.5rem;">
  <strong>Voz por qué:</strong> el audio debe priorizarse (una descarga no te puede cortar la llamada) y el teléfono no debe compartir red con el PC. La prioridad la marca el campo <strong>802.1p (PRI)</strong> de la etiqueta 802.1Q.
</div>

---

## Estática vs dinámica: ¿quién decide la VLAN del puerto?

<table>
  <thead><tr><th>Característica</th><th>Estática (puerto→VLAN)</th><th>Dinámica (MAC→VLAN)</th></tr></thead>
  <tbody>
    <tr><td>Asignación</td><td>Manual, puerto a puerto</td><td>Automática vía <strong>VMPS</strong>, por la MAC</td></tr>
    <tr><td>Flexibilidad</td><td>Baja: cambiar = reconfigurar</td><td>Alta: el equipo «arrastra» su VLAN</td></tr>
    <tr><td>Administración</td><td>Simple, ideal para redes pequeñas</td><td>Compleja: servidor VMPS y mantenimiento</td></tr>
    <tr><td>Riesgo</td><td>Cambiar de puerto cambia de VLAN</td><td>Tarjeta nueva = MAC nueva = se pierde</td></tr>
    <tr><td>Uso típico</td><td><strong>El 90% de las redes</strong></td><td>Campus enormes con movilidad extrema</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.5rem;">
  ¿Cuándo dinámica? <strong>Casi nunca.</strong> El coste del VMPS y depender de las MACs solo compensa en entornos enormes (hospitales, campus). Puerto 5 = VLAN fija, sin sorpresas.
</div>

---

## Planificar la numeración

El esquema habitual en oficinas (y el que piden en los exámenes):

<table>
  <thead><tr><th>VLAN</th><th>Nombre</th><th>Puertos</th><th>Motivo</th></tr></thead>
  <tbody>
    <tr><td><strong>10</strong></td><td>Ventas</td><td>1-12</td><td>Datos de un departamento</td></tr>
    <tr><td><strong>20</strong></td><td>RRHH</td><td>13-24</td><td>Datos sensibles, aislados</td></tr>
    <tr><td><strong>30</strong></td><td>IT</td><td>25-32</td><td>Datos + acceso a gestión</td></tr>
    <tr><td><strong>100</strong></td><td>Voz</td><td>—</td><td>Teléfonos IP de todos</td></tr>
    <tr><td><strong>999</strong></td><td>Gestión</td><td>—</td><td>Administración del switch</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.5rem;">
  <strong>Regla de oro:</strong> deja huecos entre VLANs (10, 20, 30…), usa un número «redondo» para voz y uno alto (999) para gestión. Más fácil de operar y auditar que números consecutivos sin criterio.
</div>

---

## Mini-chequeo: VLANs

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿Qué es una VLAN y qué relación tiene con el dominio de broadcast?
2. ¿Por qué es mala idea usar VLAN 1 para datos?
3. Dos PCs en VLAN 10 y VLAN 20 comparten el mismo switch: ¿pueden hablarse directamente?
4. ¿Cuál es la diferencia entre la VLAN de datos y la nativa?
5. ¿Cuándo merece la pena una VLAN dinámica?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> Red lógica dentro del switch: cada VLAN es un dominio de broadcast y una tabla MAC propios. · <strong>2.</strong> Es la de fábrica: concentra el tráfico mal etiquetado y a los intrusos. · <strong>3.</strong> No: aisladas en capa 2; hace falta router o switch capa 3. · <strong>4.</strong> La nativa es la única que viaja <em>sin etiquetar</em> por el trunk. · <strong>5.</strong> Casi nunca: solo con VMPS y movilidad extrema.
</div>

---
layout: closing
---
