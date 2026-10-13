---
layout: cover
---

# Unidad 05 — Switching y VLAN<br>Bloque 1: el switch, aprendiendo MACs

## 1r CFGS ASIR · Planificación y Administración de Redes

---
class: sparse-slide
---

## El switch: el cerebro de la red local
### La idea en una frase

<div class="key-idea">
  <div class="key-idea-text">
    Un <strong>switch</strong> es un dispositivo de <strong>capa 2</strong> que reenvía tramas Ethernet <strong>solo por el puerto adecuado</strong>, basándose en las <strong>direcciones MAC</strong>. Aprende quién vive en cada puerto y, a diferencia del hub, no repite el tráfico a todos.
  </div>
</div>

El hub es un altavoz en una asamblea (todo el mundo oye todo); el switch, una <strong>centralita</strong> que conecta exactamente a las dos personas que quieren hablar. En este bloque: cómo aprende, dónde guarda lo aprendido y a quién separa de quién.

---
class: compact-slide
---

## Switch vs hub: el salto de calidad

<div class="two-cols">
  <div class="left">
    <table>
      <thead><tr><th>Característica</th><th>Hub</th><th>Switch</th></tr></thead>
      <tbody>
        <tr><td>Capa</td><td>1 (Física)</td><td><strong>2 (Enlace)</strong></td></tr>
        <tr><td>¿Aprende MACs?</td><td>No</td><td><strong>Sí</strong></td></tr>
        <tr><td>Reenvío</td><td>A todos los puertos</td><td>Solo al destino</td></tr>
        <tr><td>Dominios de colisión</td><td>1 global</td><td><strong>1 por puerto</strong></td></tr>
        <tr><td>Uso actual</td><td>Museos, sniffing</td><td>Todo</td></tr>
      </tbody>
    </table>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium" style="height:225px;">
      <Excalidraw drawFilePath="/diagrams/ud05-hub-vs-switch.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
    <div class="info" style="margin-top:0.4rem;">
      <strong>El repartidor:</strong> el hub entrega cada carta a toda la manzana; el switch sabe en qué portal vive cada vecino y llama solo a la puerta correcta.
    </div>
  </div>
</div>

---

## ¿Qué hace con cada trama?

Todo el trabajo se reduce a una tabla mental y una pregunta: <strong>¿conozco la MAC destino?</strong>

<table>
  <thead><tr><th>Situación</th><th>Acción del switch</th></tr></thead>
  <tbody>
    <tr><td>MAC destino <strong>conocida</strong></td><td>Reenvía solo por el puerto correspondiente</td></tr>
    <tr><td>MAC destino <strong>desconocida</strong></td><td><strong>Inunda</strong>: todos los puertos menos el de origen</td></tr>
    <tr><td>MAC = broadcast (<code>FFFF.FFFF.FFFF</code>)</td><td>Inunda por todos los puertos</td></tr>
    <tr><td>MAC = multicast</td><td>Depende de IGMP snooping</td></tr>
  </tbody>
</table>

<div class="success" style="margin-top:0.6rem;">
  <strong>Inundar no es una chapuza</strong> (<em>flooding</em>): al inundar, el destino acaba respondiendo, y su respuesta permite al switch <strong>aprender</strong> dónde vive.
</div>

---
class: compact-slide
---

## Aprender de cada trama que pasa

Cuando una trama entra por un puerto, el switch registra la <strong>MAC origen</strong> y la asocia al <strong>puerto de entrada</strong>:

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Trama de A por Fa0/1: A es desconocida → inunda. Pero <strong>aprende</strong>: <code>A → Fa0/1</code>.</div>
</div>
<div class="step">
  <div class="step-number">2</div>
  <div class="step-content">Trama de B por Fa0/2 hacia A: ya sabe a dónde va → <strong>reenvía solo por Fa0/1</strong>. Y aprende <code>B → Fa0/2</code>.</div>
</div>

<div class="diagram-frame diagram-medium" style="margin-top:0.5rem; height:235px;">
  <Excalidraw drawFilePath="/diagrams/ud05-aprendizaje-mac.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<div class="warning" style="margin-top:0.4rem; font-size:0.95rem;">
  Con solo dos tramas ya sabe A→Fa0/1 y B→Fa0/2: la conversación fluye <strong>sin inundaciones</strong>.
</div>

---

## La tabla MAC en acción

```
Switch# show mac address-table
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    0050.7966.6800    DYNAMIC     Fa0/1
   1    0050.7966.6801    DYNAMIC     Fa0/2
   1    00D0.BC96.1A01    DYNAMIC     Fa0/3
```

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Dinámicas:</strong> aprendidas al vuelo, <strong>caducan</strong> (aging típico: 300 s). Si el equipo cambia de puerto, el switch lo reaprende.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Estáticas:</strong> configuradas a mano (p. ej. un servidor); <strong>no caducan</strong>.</div>
    </div>
  </div>
  <div class="right">
    <div class="info">
      Las entradas con puerto <strong>CPU</strong> son multicast de control que procesa el propio switch.
    </div>
    <div class="warning" style="margin-top:0.5rem;">
      El broadcast <code>FFFF.FFFF.FFFF</code> <strong>nunca se aprende</strong>: se inunda por definición.
    </div>
  </div>
</div>

---

## La memoria CAM: rápida pero finita

La tabla MAC vive en memoria <strong>CAM</strong> (<em>Content-Addressable Memory</em>): busca <strong>por contenido</strong>, no por índice.

```
Memoria normal:  índice → buscar → comparar (lento)
Memoria CAM:     MAC    → puerto al instante (rápido)
```

<div class="two-cols" style="margin-top:0.5rem;">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content">Búsqueda en <strong>una sola operación de hardware</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content">Capacidad <strong>limitada</strong> (p. ej. 8.000 entradas en switches pequeños).</div>
    </div>
  </div>
  <div class="right">
    <div class="warning">
      <strong>Si se llena, inunda.</strong> Un atacante que llena la tabla con MACs falsas (<em>CAM flooding</em>) convierte el switch en un <strong>hub gigante</strong> donde se puede esnifar todo. Defensa: <strong>Port Security</strong> (unidad de seguridad).
    </div>
  </div>
</div>

---

## Dominio de colisión: quién compite por el medio

Cuando dos equipos envían a la vez por el mismo medio, sus señales chocan: <strong>colisión</strong>. Todos los que comparten el medio forman un <strong>dominio de colisión</strong>.

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Hub:</strong> todos comparten el medio → <strong>1 dominio global</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Switch:</strong> cada puerto es un dominio independiente → 2 PCs en puertos distintos transmiten <strong>simultáneamente</strong>.</div>
    </div>
    <div class="info" style="margin-top:0.5rem;">
      Hoy casi todos los enlaces a switch son <strong>full-duplex</strong>: las colisiones ni siquiera existen (solo en half-duplex).
    </div>
  </div>
  <div class="right">
    <div class="diagram-frame diagram-medium">
      <Excalidraw drawFilePath="/diagrams/ud05-dominios-colision.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
    </div>
  </div>
</div>

---

## Dominio de broadcast: quién lo oye todo

Un broadcast va dirigido a <code>FFFF.FFFF.FFFF</code> y <strong>todos</strong> los equipos de la LAN deben procesarlo. ¿Quién separa a los oyentes?

<table>
  <thead><tr><th>Dispositivo</th><th>¿Segmenta colisiones?</th><th>¿Segmenta broadcasts?</th></tr></thead>
  <tbody>
    <tr><td><strong>Hub</strong></td><td>No</td><td>No</td></tr>
    <tr><td><strong>Switch</strong></td><td>Sí (1 por puerto)</td><td><strong>No</strong>: reenvía broadcasts a todos sus puertos</td></tr>
    <tr><td><strong>Router</strong></td><td>Sí</td><td><strong>Sí</strong>: detiene el broadcast en cada interfaz</td></tr>
  </tbody>
</table>

<div class="warning" style="margin-top:0.6rem;">
  Todos los switches interconectados forman <strong>un solo dominio de broadcast</strong>… y eso tiene consequencias: la <strong>tormenta de broadcast</strong> (siguiente bloque).
</div>

---

## Contar dominios: la pregunta estrella

<div class="two-cols">
  <div class="left">
    <div class="step">
      <div class="step-number">1</div>
      <div class="step-content"><strong>Colisión:</strong> hub = 1; switch = <strong>1 por puerto activo</strong>.</div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div class="step-content"><strong>Broadcast:</strong> 1 por cada «trozo» de LAN separado por <strong>routers</strong>.</div>
    </div>
  </div>
  <div class="right">
    <pre><code>1 switch 24 puertos (sin router):
  → 24 dominios de colisión
  → 1 dominio de broadcast
1 hub 4 puertos + 1 router con 2 redes:
  → 1 dominio de colisión
  → 2 dominios de broadcast</code></pre>
  </div>
</div>

<div class="warning" style="margin-top:0.5rem;">
  <strong>Trampa clásica:</strong> un switch conectado a otro switch <strong>no</strong> crea un dominio de broadcast nuevo. Solo el <strong>router</strong> (o un switch de capa 3) lo divide.
</div>

---

## Mini-chequeo: switch, CAM y dominios

<div class="question-card">
  <span class="question-icon">🧠</span>
  Responde rápido:
</div>

1. ¿En qué capa trabaja el switch y con qué dirección decide el reenvío?
2. ¿Qué hace el switch con una trama cuya MAC destino no conoce?
3. ¿Cuántos dominios de colisión tiene un hub de 8 puertos? ¿Y un switch de 8?
4. ¿Quién divide los dominios de broadcast y por qué el switch no?

<div class="answer-card" style="margin-top:0.8rem;">
  <strong>1.</strong> Capa 2 (Enlace), con la MAC destino. · <strong>2.</strong> La inunda por todos los puertos (menos origen): así aprende. · <strong>3.</strong> Hub: 1 → switch: 8. · <strong>4.</strong> El router; el switch propaga los broadcasts a todos sus puertos.
</div>

---
layout: closing
---
