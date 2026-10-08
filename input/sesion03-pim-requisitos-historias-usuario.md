---
layout: cover
author: "Autores: Sergi García, Guillermo Garrido y Alfredo Oltra"
---

# Sesión 03 — Análisis de requisitos e historias de usuario

## 2º CFGS DAW/DAM · Proyecto Intermodular II

---
---

## 🗺️ La sesión en un mapa

De las **necesidades del cliente** al trabajo del sprint: convertir requisitos en **historias de usuario** valiosas, bien escritas, estimadas y priorizadas.

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.7rem;">
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📋</span><strong>Fundamentos</strong><br>¿Qué es un requisito?</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📖</span><strong>Historias de usuario</strong><br>Estructura y ejemplos</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">✅</span><strong>Calidad</strong><br>Criterios, DoR y DoD</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🎲</span><strong>Estimación</strong><br>Planning Poker y story points</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">💎</span><strong>INVEST</strong><br>Buenas historias</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⚖️</span><strong>Priorización</strong><br>Valor vs. esfuerzo</div>
</div>

<div class="info">Hilo conductor: seguimos con el caso <strong>TaskFlow</strong> — el mismo producto visto desde DAW, DAM y ASIR.</div>

---
---

## 📋 ¿Qué es un requisito?

> Un requisito es **algo que el sistema debe hacer** o una **característica que debe tener**.

| El requisito… | Detalle |
| --- | --- |
| **Define la frontera** | Qué entra y qué queda fuera del producto |
| **Guía el diseño** | Base de la arquitectura y de las pruebas |
| **Alimenta el backlog** | Se convierte en historias de usuario |
| **Se negocia** | Se valida y se ajusta con el Product Owner |

<div class="warning">Requisito mal entendido = producto equivocado: es el error más caro de corregir, porque arrastra diseño, código y pruebas.</div>

---
---

## 🔀 Tipos de requisitos

<div class="comparison-grid">
  <div class="comparison-item"><strong>⚙️ Funcionales — QUÉ hace</strong><br><br>Funciones y comportamientos del sistema.<br><br><em>«El usuario puede registrarse con su email» · «El sistema notifica la asignación de una tarea».</em></div>
  <div class="comparison-item"><strong>🧪 No funcionales — CÓMO lo hace</strong><br><br>Calidad: rendimiento, seguridad, usabilidad, disponibilidad.<br><br><em>«La lista de tareas carga en menos de 2 s» · «Los backups se conservan 7 días».</em></div>
</div>

<div class="info">Los no funcionales también se escriben, negocian y prueban: «que vaya rápido» no es un requisito; «cargar en &lt; 2 s» sí.</div>

---
---

## 📖 Historias de usuario: la idea

> Explicación **informal y general** de una funcionalidad de software, contada desde la **perspectiva de quien la usa**.

<div class="features-grid">
  <div class="feature-item"><span class="feature-icon">👤</span><strong>Voz del usuario</strong><br>Lenguaje natural, sin tecnicismos</div>
  <div class="feature-item"><span class="feature-icon">🎯</span><strong>Centrada en valor</strong><br>El porqué, no el cómo técnico</div>
  <div class="feature-item"><span class="feature-icon">💬</span><strong>Invita a conversar</strong><br>El detalle se acuerda con el PO</div>
  <div class="feature-item"><span class="feature-icon">📦</span><strong>Unidad del backlog</strong><br>Se estima y se planifica</div>
</div>

<div class="info">La HU no sustituye a la especificación técnica: es el punto de partida de la conversación que la completa.</div>

---
---

## 🧩 La estructura de una historia

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud03-pim-anatomia-hu.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="warning">Si no puedes rellenar el «para…», la historia no aporta valor claro: reescríbela o descártala.</div>

---
---

## 📚 Tres perfiles, un mismo producto

| ID | Perfil | Historia de usuario |
| --- | --- | --- |
| **DAW-03** | Web | Como miembro del equipo, quiero asignar tareas a otros usuarios para distribuir el trabajo. |
| **DAM-02** | Móvil | Como usuario móvil, quiero ver mis tareas ordenadas por prioridad para no olvidar las urgentes. |
| **ASIR-03** | DevOps | Como devops, quiero configurar backups automáticos de la BD para garantizar la recuperación ante fallos. |

<div class="info">TaskFlow es un solo producto, pero cada perfil (web, móvil, infraestructura) escribe sus historias desde su rol y su tecnología.</div>

---
---

## ✅ Criterios de aceptación

Condiciones **claras y medibles** que confirman que la historia está hecha como el PO esperaba.

<div class="question-card"><span class="question-icon">?</span><strong>HU-01:</strong> Como nuevo usuario, quiero registrarme con mi email y contraseña para poder acceder a mi cuenta.</div>
<div class="answer-card"><strong>Criterios de aceptación</strong><br>✔ Los campos obligatorios se validan antes de crear la cuenta.<br>✔ Se comprueba el formato de email y contraseña; los errores se muestran con claridad.<br>✔ Tras el registro, el usuario accede a su cuenta automáticamente.</div>

<div class="warning">«Que funcione bien» no es un criterio: cada criterio debe poder verificarse con una prueba concreta.</div>

---
---

## 🚦 Definition of Ready (DoR)

Condiciones que una historia debe cumplir **antes de entrar al sprint**.

<div class="question-card"><span class="question-icon">HU</span><strong>Notificaciones:</strong> como usuario, quiero recibir notificaciones cuando se me asigne una tarea.</div>

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>Requisito validado con el PO</strong> — el valor queda claro para todos.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>Contratos definidos</strong> — endpoint <code>/api/notifications</code> acordado con los equipos.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Diseño listo</strong> — mockup del pop-up y comportamiento offline decididos.</div></div>

<div class="warning">Una historia que entra al sprint sin estar «ready» se convierte en bloqueos y sorpresas a mitad de semana.</div>

---
---

## 🏁 Definition of Done (DoD)

La **barra de calidad** común que toda historia debe superar antes de darse por terminada.

<div class="comparison-grid">
  <div class="comparison-item"><strong>🚦 DoR — antes del sprint</strong><br><br>Puerta de <strong>entrada</strong>: requisito validado, diseño y contratos listos, sin bloqueos técnicos.</div>
  <div class="comparison-item good"><strong>🏁 DoD — al cerrar la historia</strong><br><br>Barra de <strong>salida</strong>: código compila, pruebas superadas, revisado por QA y aprobado por el PO.</div>
</div>

<div class="success">DoD del proyecto: el código compila sin errores y supera las pruebas instrumentadas — y además, revisión por pares y validación del Product Owner.</div>

---
---

## 🎲 Estimación en equipo

Estimar es un **ejercicio colaborativo**: el debate descubre requisitos ocultos antes de comprometer el sprint.

<div class="features-grid" style="grid-template-columns:repeat(3,1fr);gap:0.8rem;">
  <div class="feature-item" style="padding:0.6rem 0.8rem;"><span class="feature-icon">🃏</span><strong>Planning Poker</strong><br>Cada persona revela su carta a la vez; las diferencias se discuten.</div>
  <div class="feature-item" style="padding:0.6rem 0.8rem;"><span class="feature-icon">👕</span><strong>T-shirt sizes</strong><br>XS · S · M · L · XL para estimaciones rápidas y gruesas.</div>
  <div class="feature-item" style="padding:0.6rem 0.8rem;"><span class="feature-icon">🗳️</span><strong>Dot Voting</strong><br>Votos repartidos para ordenar historias por complejidad o valor.</div>
</div>

<div class="info">El resultado se expresa en <strong>story points</strong>: complejidad y esfuerzo relativos, nunca horas. En TaskFlow: asignar tareas = 5 · lista móvil = 3 · backups = 5.</div>

---
class: compact-slide
---

## 🌶️ Story points y «tallas de camiseta»: cómo funciona de verdad

<div style="font-size:1.02rem;">Los <strong>story points</strong> miden el <strong>esfuerzo relativo</strong>: cuánto pesa una historia comparada con las demás, no cuánto dura. El equipo crea un <em>tamaño de referencia</em> (p. ej. «asignar tareas = 5») y el resto se compara con él.</div>

| Puntos | Carta | Qué significa | Ejemplo TaskFlow |
| --- | --- | --- | --- |
| 1 · XS | **1** | Trivial: un toque, una config | «Cambiar un texto de la interfaz» |
| 2 · S | **2** | Pequeña y clara: una tarde | «Validar el registro» |
| 3 · M | **3** | Media: varios archivos y algo de lógica | «Lista móvil por prioridad» |
| 5 · L | **5** | Compleja: backend + frontend + pruebas | «Asignar tareas con avisos» |
| 8 · XL | **8** | Muy grande: pista de que **hay que dividirla** | — |

<div class="warning" style="padding:0.5rem 1rem;">La escala usa la serie de Fibonacci (1, 2, 3, 5, 8…): a mayor tamaño, la <strong>incertidumbre crece más rápido</strong>; los saltos obligan a discutir «¿5 o 8?» — ahí está el valor del debate.</div>

<div class="success" style="padding:0.5rem 1rem;">Reglas de oro: no se re-estima a mitad del sprint · los puntos son del <strong>equipo</strong> · la <strong>velocidad</strong> sirve para planificar el siguiente sprint, no para comparar equipos.</div>

---
---

## 💎 INVEST: qué hace buena una historia

| Letra | Criterio | Significado |
| --- | --- | --- |
| **I** | Independent | Puede desarrollarse sin depender de otras |
| **N** | Negotiable | Se puede discutir y ajustar con el PO |
| **V** | Valuable | Aporta valor al usuario o al negocio |
| **E** | Estimable | El equipo puede estimar su esfuerzo |
| **S** | Small | Cabe en un solo sprint |
| **T** | Testable | Tiene criterios claros que permiten probarla |

<div class="info">Usa INVEST al revisar el backlog: si una historia falla varias letras, <strong>divídela</strong> o <strong>reescríbela</strong>.</div>

---
---

## ⚖️ Priorizar: valor frente a esfuerzo

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud03-pim-matriz-valor-esfuerzo.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="info">El PO ordena el backlog con estos criterios: se implementa por <strong>valor</strong>, no por facilidad técnica.</div>

---
class: compact-slide
---

## 🔬 Ejemplo completo — DAW-03: asignar tareas

> Como **miembro del equipo**, quiero **asignar tareas** a otros usuarios **para distribuir el trabajo** de manera eficiente.

<p><span class="badge badge-blue">ID: DAW-03</span> <span class="badge badge-purple">5 story points · complejidad media</span> <span class="badge badge-green">Prioridad: Alta (P1)</span> <span class="badge badge-orange">Depende de DAW-01 · DAW-02 · DAW-06</span></p>

<div class="two-cols">
  <div class="left">
    <h3>Criterios de aceptación</h3>
    <ul>
      <li>Asignan solo usuarios con <strong>permisos válidos</strong>; si no, mensaje de error claro.</li>
      <li><strong>Confirmación visual</strong> al asignar y notificación al asignado (panel y/o correo).</li>
      <li>Advertencia si el destinatario <strong>ya no pertenece</strong> al proyecto.</li>
      <li>Cambios visibles <strong>al instante</strong> para todo el equipo.</li>
    </ul>
  </div>
  <div class="right">
    <h3>DoD y notas técnicas</h3>
    <ul>
      <li>Tests unitarios y de integración <strong>superados</strong>; permisos validados.</li>
      <li>Campo <code>assigned_user_id</code> en el modelo de tareas.</li>
      <li>Endpoint REST de asignación integrado con notificaciones.</li>
      <li>Revisado por QA y <strong>aprobado por el PO</strong>.</li>
    </ul>
  </div>
</div>

---
class: compact-slide
---

## 🔬 Ejemplo completo — DAM-02: lista móvil priorizada

> Como **usuario móvil**, quiero **ver mis tareas ordenadas por prioridad** **para no olvidar** las más urgentes.

<p><span class="badge badge-blue">ID: DAM-02</span> <span class="badge badge-purple">3 story points · baja-media</span> <span class="badge badge-green">Prioridad: Alta (P1)</span> <span class="badge badge-orange">Depende de DAW-04 · DAM-01 · DAM-04</span></p>

<div class="two-cols">
  <div class="left">
    <h3>Criterios de aceptación</h3>
    <ul>
      <li>Lista ordenada de <strong>mayor a menor prioridad</strong>.</li>
      <li>Cada tarea muestra <strong>título, fecha límite, estado y color</strong> de prioridad.</li>
      <li>Filtros por estado: pendiente, en progreso, completada.</li>
      <li>Sin tareas: <em>«No tienes tareas pendientes. ¡Buen trabajo!»</em></li>
    </ul>
  </div>
  <div class="right">
    <h3>DoD y notas técnicas</h3>
    <ul>
      <li>Carga <strong>menos de 2 s</strong>, probado en Android e iOS.</li>
      <li>Endpoint <code>/api/tasks?order_by=priority desc</code>.</li>
      <li>RecyclerView / FlatList + <strong>caché local</strong>.</li>
      <li>Diseño según Figma (TaskFlow Mobile UI Kit).</li>
    </ul>
  </div>
</div>

---
class: compact-slide
---

## 🔬 Ejemplo completo — ASIR-03: backups automáticos

> Como **DevOps**, quiero **configurar backups automáticos** de la base de datos **para garantizar la recuperación** ante fallos.

<p><span class="badge badge-blue">ID: ASIR-03</span> <span class="badge badge-purple">5 story points · complejidad media</span> <span class="badge badge-green">Prioridad: Alta (P1)</span> <span class="badge badge-orange">Depende de ASIR-01 · ASIR-02</span></p>

<div class="two-cols">
  <div class="left">
    <h3>Criterios de aceptación</h3>
    <ul>
      <li>Backup <strong>diario y automático</strong> a ubicación externa segura (S3, NAS…).</li>
      <li>Nombre con <strong>timestamp</strong>: <code>taskflow_backup_20251015_2300.sql</code>.</li>
      <li><strong>Restauración</strong> posible desde cualquier copia; retención ≥ 7 días.</li>
      <li><strong>Log</strong> de cada copia y <strong>alerta</strong> si falla.</li>
    </ul>
  </div>
  <div class="right">
    <h3>DoD y notas técnicas</h3>
    <ul>
      <li>Cron o systemd timers + <code>pg_dump</code> / <code>mysqldump</code>.</li>
      <li>Subida segura con rclone o AWS CLI.</li>
      <li>Retención configurable: <code>BACKUP_RETENTION_DAYS=7</code>.</li>
      <li><strong>Pruebas de restauración</strong> periódicas.</li>
    </ul>
  </div>
</div>

---
---

## ✅ Resumen de la sesión

- Los **requisitos** (funcionales y no funcionales) fijan qué debe hacer el sistema y cómo debe comportarse.
- Las **historias de usuario** los traducen a valor: «como *usuario*, quiero *acción* para *beneficio*».
- La calidad se concreta en **criterios de aceptación**, **DoR** (antes del sprint) y **DoD** (barra común de salida).
- **INVEST** filtra las buenas historias; la **estimación colaborativa** las mide en story points.
- La **matriz valor/esfuerzo** ordena el backlog: primero lo valioso y barato; fuera lo costoso e intrascendente.
- En **TaskFlow**, tres perfiles (DAW, DAM, ASIR) escriben historias distintas para el mismo producto.

---
layout: closing
---

