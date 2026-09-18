# AGENTS.md — Presentaciones Educativas Slidev

## Configuración del proyecto

- **Framework**: Slidev 52.x (@slidev/cli)
- **Temas**: `default` (@slidev/theme-default, sobrio) y `bricks` (@slidev/theme-bricks, alegre, bloques de colores)
- **Estilo**: Flat Design / Swiss Modernism, light mode, limpio, profesional
- **Tipografía**: Inter (800/700/600/500/400) + JetBrains Mono para código
- **Idioma**: castellano por defecto, valencià para contenido educativo
- **FP**: priorizar procedimientos, herramientas, casos profesionales
- **Resolución**: 1920×1080 (Full HD, 16:9)
- **Selección de tema**: el tema se declara en la entrada de la raíz (`theme:` en el frontmatter), nunca dentro del Markdown de `input/`; si no, Slidev lo ignora. Los componentes compartidos de `styles/index.css` funcionan con cualquiera de los dos temas. Las reglas de Diseño (acento único #2563EB, tablas con cabecera azul, etc.) son obligatorias con `default`; con `bricks` (uso divulgativo) la paleta viva del tema puede prevalecer.

## Reglas permanentes

### Imágenes corporativas
- `public/images/fondo.png` → SOLO fondo de la primera diapositiva (mediante `layout: cover` en `layouts/cover.vue`)
- `public/images/fondoFin.png` → SOLO fondo de la última diapositiva (mediante `layout: closing` en `layouts/closing.vue`)
- `public/images/logoCEEDCV.png` → Logo institucional en portada (position: absolute, top-left)
- `public/images/logoCCBYSA.png` → Logo Creative Commons en cierre (centrado)
- Las diapositivas intermedias NUNCA utilizan estas imágenes como fondo

### Diseño
- Light mode por defecto (#FFFFFF, #F8F9FA)
- Contraste WCAG AAA: texto principal #1A1A2E sobre fondo claro
- Una idea por diapositiva (`---`)
- Combinar tipos: concepto, código, terminal, diagrama, actividad, tabla, etc.
- Un solo color acento por presentación (#2563EB por defecto)
- Escala tipográfica moderada: base de 18 px; título de portada de 2.6 rem. No aumentarla sin revisar la composición.
- Tablas con esquinas redondeadas (`border-radius: 12px`) y cabecera azul
- Ningún elemento puede superar el tamaño de la diapositiva (sin desbordamientos)
- **Contraste en bloques de código**: Asegurar que todo el código dentro de bloques `<pre>` tenga contraste suficiente. Para fondos oscuros (#1E293B, #0F172A), usar colores claros (#E2E8F0, #F8F9FA). Para fondos claros, usar colores oscuros. Evitar colores intermedios como #94A3B8 sobre fondos oscuros. Priorizar el uso de `.code-card` o bloques markdown con Shiki en lugar de estilos inline.

### Componentes y Estilos
Todos los estilos compartidos se definen en `styles/index.css`:
- `.warning` / `.info` / `.success` — cajas de aviso
- `.step` / `.step-number` / `.step-content` — procesos numerados
- `.features-grid` / `.feature-item` / `.feature-icon` — rejilla de características
- `.comparison-grid` / `.comparison-item` (.good / .bad) — comparación correcto/incorrecto
- `.code-card` — bloque de código estilo tarjeta con cabecera y botones
- `.terminal` — simulación de terminal con prompts
- `.question-card` / `.question-icon` / `.answer-card` — tarjetas de preguntas y soluciones
- `.badge` (`.badge-blue`, `.badge-purple`, `.badge-teal`, `.badge-orange`, `.badge-pink`, `.badge-green`)
- `.two-cols` — maquetación en 2 columnas

### Contenido Markdown
- Los Markdown fuente viven en `input/`.
- Las entradas de la raíz importan el Markdown de `input/` para que Slidev cargue los estilos y layouts compartidos.
- Nomenclatura obligatoria: `udXX-modul-tema.md`, con el módulo en minúsculas (`ud01-prg-...`, `ud01-psp-...`). La entrada de la raíz y el Markdown de `input/` deben compartir el mismo nombre.
- No ejecutar Slidev directamente contra un archivo de `input/`: usa siempre la entrada de la raíz correspondiente.
- Los archivos Markdown de `input/` son material docente local y no se versionan.
- Separador de diapositivas: `---`.
- Frontmatter YAML para configuración general de la presentación o de cada diapositiva.
- Código con bloques cerrados de markdown (```java) o tarjetas `.code-card`.

## Comandos

```bash
npm run dev -- ud01-prg-pensament-computacional-bloc-01.md
npm run build -- ud01-psp-python-basico-flujo-funciones.md --out dist/python-flujo
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pdf --output output/python.pdf
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pptx --output output/python.pptx
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format png --output output/python
```

`npm run build` genera una web estática; `npm run export` admite los formatos `pdf`, `png`, `pptx` y `md`. Si Chromium no puede iniciarse dentro del sandbox, PDF, PNG y PPTX necesitan ejecutarse fuera de este.

## Estructura

```
PresentacionesEducativas/
├── styles/
│   └── index.css               # Estilos compartidos (variables + componentes + layouts)
├── layouts/
│   ├── cover.vue               # Layout de portada (fondo fondo.png + logo CEEDCV + autor)
│   └── closing.vue             # Layout de cierre (fondo fondoFin.png + logos centrados)
├── public/
│   └── images/
│       ├── fondo.png           # Fondo de portada
│       ├── fondoFin.png        # Fondo de cierre
│       ├── logoCCBYSA.png      # Logo Creative Commons
│       └── logoCEEDCV.png      # Logo Generalitat Valenciana / CEEDCV
├── input/                      # Markdown fuente local (ignorado por Git)
│   └── udXX-modul-tema.md
├── udXX-modul-tema.md          # Entrada Slidev que importa input/udXX-modul-tema.md
├── output/                     # Exportaciones generadas (ignorado por Git)
├── package.json
├── .gitignore
├── AGENTS.md                   # Este archivo
├── README.md
└── LICENSE
```

## Nueva Presentación (estructura de dos archivos)

1. Contenido en `input/udXX-modul-tema.md`, sin `theme:` en el frontmatter (Slidev lo tomaría como tema de slide y fallaría). Sí van los `layout:` de cada diapositiva.
2. Entrada en la raíz `udXX-modul-tema.md` con el mismo nombre, donde se declara el `theme:` y `src:`:

```markdown
# ── udXX-modul-tema.md (entrada raíz) ──────────────
---
theme: default            # o bricks para sesiones divulgativas
title: "Unidad XX — Título Unidad"
author: Sergi García Barea
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
drawings:
  persist: false
transition: slide-left
mdc: false
src: ./input/udXX-modul-tema.md
---
```

```markdown
# ── input/udXX-modul-tema.md (contenido) ────────────
---
layout: cover
---

# Unidad XX — Título Unidad<br>Bloque XX

## 1r CFGS DAW · Programación

---
---

## Título Diapositiva
### Subtítulo o contexto

<div class="step">
  <div class="step-number">1</div>
  <div class="step-content">Primer paso del proceso.</div>
</div>

<div class="info">
  Caja de información destacada.
</div>

---
layout: closing
---
```
