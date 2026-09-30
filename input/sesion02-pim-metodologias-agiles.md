---
layout: cover
author: "Autores: Sergi García, Guillermo Garrido y Alfredo Oltra"
---

# Sesión 02 — Metodologías Ágiles: de la teoría a la práctica

## 2º CFGS DAW/DAM · Proyecto Intermodular II

---
---

## 🗺️ La sesión en un mapa

Un recorrido completo por las metodologías de desarrollo: de los enfoques **tradicionales** a los **ágiles**, con especial atención a **Scrum** y su aplicación práctica con el caso **TaskFlow**.

<div class="features-grid" style="gap:0.6rem;">
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧭</span><strong>Fundamentos</strong><br>¿Qué es una metodología?</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">📏</span><strong>Tradicionales</strong><br>Cascada y modelo en V</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">⚡</span><strong>Ágiles</strong><br>Manifiesto y principios</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🏆</span><strong>Scrum</strong><br>Roles, ceremonias, artefactos</div>
  <div class="feature-item" style="padding:0.5rem 0.6rem;font-size:0.9rem;"><span class="feature-icon" style="font-size:1.4rem;margin-bottom:0.1rem;">🧪</span><strong>Práctica</strong><br>TaskFlow y tableros Kanban</div>
</div>

<div class="info">Hilo conductor: el caso práctico <strong>TaskFlow</strong> — la gestión ágil en equipos reales de DAW, DAM y ASIR.</div>

---
---

## 🧭 ¿Qué es una metodología?

> Conjunto organizado de **principios, procesos, técnicas y herramientas** que sirve como guía para **planificar, ejecutar, controlar y cerrar** un proyecto.

| Aporta | Detalle |
| --- | --- |
| **Estandarización** | Todo el equipo sabe qué pasos seguir |
| **Fases y roles** | Especifica qué se hace y quién lo hace |
| **Técnicas y herramientas** | Gantt, Kanban, dailies, entregables |
| **Gestión de riesgos** | Anticipa problemas antes de que ocurran |

<div class="info">Sin metodología: improvisación, caos y proyectos que nunca se entregan. Con ella: un camino estructurado de la idea al resultado.</div>

---
---

## 🗂️ Tipos de metodologías

<div class="diagram-frame diagram-medium">
  <Excalidraw drawFilePath="/diagrams/ud02-pim-tipos-metodologias.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame.diagram-medium { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="info">No hay una «buena» y una «mala»: el enfoque se elige según el proyecto. La industria actual está dominada por las **ágiles** y las **híbridas**.</div>

---
class: compact-slide
---

## 📏 Metodologías tradicionales

Características: **fuerte planificación inicial** y **ejecución lineal** de las fases — cada fase se cierra antes de empezar la siguiente.

| Modelo | Descripción breve |
| --- | --- |
| **Cascada** | Fases lineales; cada una depende de la anterior |
| **V** | Relaciona desarrollo y pruebas en paralelo |

<div class="comparison-grid">
  <div class="comparison-item good"><strong>✅ Ventajas</strong><br><br>Claridad, documentación exhaustiva, previsibilidad.</div>
  <div class="comparison-item bad"><strong>❌ Inconvenientes</strong><br><br>Rigidez, poca adaptación al cambio, feedback tardío.</div>
</div>

<div class="info">Ejemplo: una app de reservas de aulas siguiendo fases secuenciales — si en pruebas falla un requisito, se vuelve al principio.</div>

---
---

## 📏 El modelo en cascada, dibujado

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-pim-cascada.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="warning">El cliente solo ve el producto al final: corregir un malentendido de requisitos cuesta carísimo.</div>

---
---

## ⚡ Metodologías ágiles

Promueven el desarrollo **iterativo e incremental**, centrado en:

<div class="features-grid">
  <div class="feature-item"><span class="feature-icon">🎁</span><strong>Entrega continua de valor</strong><br>Software funcionando cada poco tiempo</div>
  <div class="feature-item"><span class="feature-icon">🤝</span><strong>Colaboración</strong><br>Cliente dentro del proceso</div>
  <div class="feature-item"><span class="feature-icon">🔀</span><strong>Adaptación al cambio</strong><br>Los requisitos evolucionan</div>
  <div class="feature-item"><span class="feature-icon">💬</span><strong>Retroalimentación</strong><br>Constante, del usuario real</div>
</div>

<div class="success">Ejemplos: **Scrum**, Kanban, XP (eXtreme Programming). Ventajas: flexibilidad y reducción de riesgos · Inconvenientes: requiere disciplina, menos documentación.</div>

---
---

## 📜 El Manifiesto Ágil (2001)

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-pim-manifiesto-agil.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="info">17 desarrolladores, montaña de Utah: «aunque valoramos lo de la derecha, **valoramos más lo de la izquierda**».</div>

---
---

## 🏆 Scrum: la metodología ágil de referencia

Un **marco de trabajo** (framework), no una receta: define roles, eventos y artefactos dentro de iteraciones llamadas **Sprints**.

<div class="features-grid">
  <div class="feature-item"><span class="feature-icon">👥</span><strong>Roles</strong><br>PO · SM · Developers</div>
  <div class="feature-item"><span class="feature-icon">📅</span><strong>Ceremonias</strong><br>Planning · Daily · Review · Retrospectiva</div>
  <div class="feature-item"><span class="feature-icon">📦</span><strong>Artefactos</strong><br>Product Backlog · Sprint Backlog · Incremento</div>
  <div class="feature-item"><span class="feature-icon">⏱️</span><strong>Sprint</strong><br>Ciclo fijo de 1–4 semanas</div>
</div>

<div class="info">Empírico: se basa en la **experiencia** (iterar) y la **transparencia** (inspeccionar y adaptar).</div>

---
---

## 👥 Roles de Scrum

| Rol | Función principal |
| --- | --- |
| 👑 **Product Owner** | Prioriza y define el producto; dueño del Product Backlog |
| 🧑‍🏫 **Scrum Master** | Facilita y protege el proceso; elimina impedimentos |
| 💻 **Equipo de Desarrollo** | Construye el producto; autoorganizado y multidisciplinar |

<div class="warning">El PO decide **qué** se construye y en qué orden; el equipo decide **cómo**; el Scrum Master no manda sobre nadie: sirve al proceso.</div>

---
---

## 🏗️ El marco Scrum, dibujado

<div class="diagram-frame">
  <Excalidraw drawFilePath="/diagrams/ud02-pim-marco-scrum.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />
</div>

<style>
.diagram-frame { height: 330px; }
.diagram-frame :deep(svg) { max-height: 300px; }
</style>

<div class="info">Todo gira alrededor del **Sprint**: los artefactos alimentan las ceremonias y cada ciclo entrega un incremento potencialmente entregable.</div>

---
---

## 📅 Ceremonias de Scrum

| Ceremonia | Qué es | Duración (Sprint 2 sem.) |
| --- | --- | --- |
| **Sprint Planning** | Planificación: objetivo y tareas del Sprint | 4 h máx. |
| **Daily Scrum** | Reunión diaria de seguimiento | 15 min |
| **Sprint Review** | Revisión del incremento con feedback | 2 h máx. |
| **Retrospectiva** | Mejora continua del proceso | 1,5 h máx. |

<div class="success">La Daily no es «rendir cuentas al jefe»: es el equipo **inspeccionando su plan** hacia el objetivo del Sprint.</div>

---
---

## 📦 Artefactos de Scrum

| Artefacto | Qué es | Lo cuida |
| --- | --- | --- |
| **Product Backlog** | Lista **priorizada** de requisitos del producto | Product Owner |
| **Sprint Backlog** | Tareas seleccionadas para el Sprint | Developers |
| **Incremento** | Resultado funcional del Sprint | Todo el equipo |

<div class="info">Los tres son **transparentes** por definición: cualquiera del equipo puede verlos en cualquier momento. Sin transparencia no hay inspección ni adaptación.</div>

---
---

## 🎬 Evolución de un Sprint (I): planificar

**Sprint Planning**: se define el **objetivo del Sprint** y se seleccionan tareas del Product Backlog.

<div class="step"><div class="step-number">1</div><div class="step-content"><strong>El PO trae el Backlog priorizado</strong> — las historias más importantes arriba.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content"><strong>El equipo estima y selecciona</strong> — cuánto cabe en este Sprint.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content"><strong>Se crea el Sprint Backlog</strong> — plan de trabajo **vivo y transparente**.</div></div>

<div class="info">El Sprint Backlog no es un contrato: puede ajustarse a medida que el equipo aprende durante el Sprint.</div>

---
---

## 🎬 Evolución de un Sprint (II): ejecutar y adaptar

<div class="step"><div class="step-number">4</div><div class="step-content"><strong>Daily Scrum</strong> — inspección y adaptación diaria: ¿qué hice? ¿qué haré? ¿qué me bloquea?</div></div>
<div class="step"><div class="step-number">5</div><div class="step-content"><strong>Sprint Review</strong> — se inspecciona el incremento y los stakeholders dan feedback.</div></div>
<div class="step"><div class="step-number">6</div><div class="step-content"><strong>Retrospectiva</strong> — análisis del proceso y acciones de mejora para el siguiente Sprint.</div></div>

<div class="comparison-grid">
  <div class="comparison-item"><strong>🔄 Refinamiento</strong><br><br>Pulir y detallar el Product Backlog continuamente: ni demasiado pronto ni demasiado tarde.</div>
  <div class="comparison-item good"><strong>🎯 Foco en una mejora</strong><br><br>La retrospectiva funciona con ambiente seguro y **una mejora clave** por Sprint.</div>
</div>

---
---

## 🧪 Caso práctico: TaskFlow

Aplicación real de Scrum en equipos de DAW, DAM y ASIR:

| Equipo | Nº integrantes | Roles principales |
| --- | --- | --- |
| **DAW** | 5 | Frontend, Backend, QA |
| **DAM** | 4 | Mobile Dev, Backend, QA |
| **ASIR** | 3 | DevOps, Sysadmin |

<div class="info">Evolución de artefactos: Product Backlog inicial con historias de usuario → Sprint Planning y selección de tareas → Daily Scrum y adaptación → Review y Retrospectiva conjunta.</div>

---
---

## 🧰 Herramientas para trabajar ágil

| Herramienta | Para qué |
| --- | --- |
| 📓 **Notion** | Gestión de proyectos y tableros Kanban |
| 📋 **Trello** | Visualización simple de tareas y sprints |
| 🎯 **Jira** | Seguimiento ágil profesional (sprints, burndown) |

<div class="warning">La herramienta no hace ágil al equipo: **el proceso sí**. Empieza simple (Trello) y evoluciona si lo necesitas.</div>

---
---

## 🎯 Actividad práctica

<div class="step"><div class="step-number">1</div><div class="step-content">Elige una herramienta y crea un **tablero Kanban** para tu proyecto.</div></div>
<div class="step"><div class="step-number">2</div><div class="step-content">Simula un **Sprint**: define tareas, realiza la Daily, la Review y la Retrospectiva.</div></div>
<div class="step"><div class="step-number">3</div><div class="step-content">Aplica una **mejora continua** en el siguiente Sprint.</div></div>

<div class="success">Entregable: enlace al tablero + breve documento con el objetivo del Sprint, el feedback de la Review y la mejora acordada en la Retrospectiva.</div>

---
---

## 🧠 Chequeo rápido de la sesión

1. ¿Qué cuatro elementos aporta una metodología a un proyecto?
2. Cascada: ¿cuál es su mayor ventaja y su mayor riesgo?
3. Nombra las 4 dualidades del Manifiesto Ágil.
4. ¿Quién prioriza el Product Backlog y quién protege el proceso?
5. ¿Qué artefacto se crea en el Sprint Planning y cuál es el resultado del Sprint?
6. ¿Qué diferencia hay entre Sprint Review y Retrospectiva?

---
---

## ✅ Resumen de la sesión

- Una **metodología** guía el proyecto con principios, procesos, técnicas y herramientas: **tradicionales** (cascada, V), **ágiles** e **híbridas**.
- Las **ágiles** entregan valor de forma iterativa e incremental; el **Manifiesto Ágil** prioriza individuos, software funcionando, colaboración y respuesta al cambio.
- **Scrum** organiza el trabajo en **Sprints** con 3 roles (PO, SM, Developers), 4+ ceremonias y 3 artefactos transparentes.
- El ciclo **Planning → Daily → Review → Retrospectiva** convierte el feedback en mejora continua del producto y del proceso.
- TaskFlow muestra cómo **equipos reales** (DAW, DAM, ASIR) aplican Scrum con herramientas como Notion, Trello o Jira.

---
layout: closing
---
