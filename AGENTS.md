# AGENTS.md — Presentaciones Educativas Slidev

## Configuración del proyecto

- **Framework**: Slidev 52.x (@slidev/cli)
- **Tema**: `bricks` (@slidev/theme-bricks, alegre, con bloques de colores) es el **tema por defecto** de todas las presentaciones; `default` (@slidev/theme-default, sobrio) queda disponible para sesiones que pidan un tono más formal
- **Estilo**: Flat Design / Swiss Modernism, light mode, limpio, profesional
- **Tipografía**: Inter (800/700/600/500/400) + JetBrains Mono para código
- **Idioma**: castellano por defecto, valencià para contenido educativo
- **FP**: priorizar procedimientos, herramientas, casos profesionales
- **Resolución**: 1920×1080 (Full HD, 16:9)
- **Selección de tema**: el tema se declara en la entrada de la raíz (`theme:` en el frontmatter), nunca dentro del Markdown de `input/`; si no, Slidev lo ignora. Los componentes compartidos de `styles/index.css` funcionan con cualquiera de los dos temas. Con `bricks` la paleta viva del tema puede prevalecer sobre las reglas de Diseño pensadas para `default` (acento único #2563EB, tablas con cabecera azul, etc.).

## Reglas permanentes

### Calidad de maquetación y desbordamientos
- Ninguna diapositiva de contenido puede cortar texto por abajo (el lienzo es 980×551 px internos).
- Verificación objetiva: `node measure.mjs <url>` con el dev server abierto (ej. `http://localhost:3030`). Detecta diapositivas cuyo contenido supera el alto de la página. La portada (slide 1) da siempre un falso positivo por el fondo a sangre completa: ignorarla.
- Si una diapositiva no cabe, compactarla **puntualmente** (padding/fuentes inline de esa diapositiva, o partir en dos). **No** compactar globalmente `styles/index.css`: encoger todo el deck degrada la presentación.
- Diapositivas con poco contenido (se ven vacías): añadir `class: sparse-slide` en su frontmatter. La clase centra verticalmente el contenido y agranda la tipografía (h2 2.35rem, párrafos 1.22rem). No aplicar a diapositivas densas.

### Imágenes corporativas
- `public/images/fondo.png` → **solo** fondo de la primera diapositiva (mediante `layout: cover` en `layouts/cover.vue`)
- `public/images/fondoFin.png` → **solo** fondo de la última diapositiva (mediante `layout: closing` en `layouts/closing.vue`)
- `public/images/logoCEEDCV.png` → Logo institucional en portada (position: absolute, top-left)
- `public/images/logoCCBYSA.png` → Logo Creative Commons en cierre (centrado)
- Las diapositivas intermedias **no** utilizan nunca estas imágenes como fondo

### Diseño
- Light mode por defecto (#FFFFFF, #F8F9FA)
- Contraste WCAG AAA: texto principal #1A1A2E sobre fondo claro
- Una idea por diapositiva (`---`)
- Combinar tipos: concepto, código, terminal, diagrama, actividad, tabla, etc.
- Un solo color acento por presentación (#2563EB por defecto)
- Escala tipográfica moderada: base de 18 px; título de portada de 2.6 rem. No aumentarla sin revisar la composición.
- Tablas con esquinas redondeadas (`border-radius: 12px`) y cabecera azul
- Ningún elemento puede superar el tamaño de la diapositiva (sin desbordamientos)
- **Contraste en bloques de código**: asegurar que todo el código dentro de bloques `<pre>` tenga contraste suficiente. Para fondos oscuros (#1E293B, #0F172A), usar colores claros (#E2E8F0, #F8F9FA). Para fondos claros, usar colores oscuros. Evitar colores intermedios como #94A3B8 sobre fondos oscuros. Priorizar el uso de `.code-card` o bloques markdown con Shiki en lugar de estilos inline.
- **Shiki dual-theme**: los bloques markdown (```python, ```java...) se renderizan con doble tema (vitesse-dark/vitesse-light). `styles/index.css` fuerza siempre la paleta dark (`.slidev-layout pre.shiki span { color: var(--shiki-dark) }`) sobre el fondo oscuro #1E293B, con overrides a equivalentes AA para los tonos con poco contraste (#666666, #758575, #4C9A91, #CB7676...). Sin esas reglas, en light mode el texto sale oscuro sobre oscuro e ilegible (pasó en las presentaciones de PSP). No eliminarlas.
- Verificación de contraste de código: `node check-contrast.mjs <url>` (dev server abierto). Calcula el ratio WCAG de cada token Shiki sobre su fondo real y avisa si alguno baja de 4.5:1.

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
- `.sparse-slide` — centrado vertical + tipografía mayor para diapositivas con poco contenido (se activa con `class: sparse-slide` en el frontmatter de la diapositiva)

### Contenido Markdown
- Los Markdown fuente viven en `input/`.
- Las entradas de la raíz importan el Markdown de `input/` para que Slidev cargue los estilos y layouts compartidos.
- Nomenclatura: la entrada de la raíz, su Markdown en `input/` y el PDF de `output/` deben compartir el mismo nombre base. Patrón actual: `sesionXX-modulo-tema.md` (p. ej. `sesion01-pim-bloc-01-02.md`, `sesion01-par-bloque-01.md`); los decks anteriores a este patrón mantienen `ud01-psp-...` y `ud01-prg-...`.
- No ejecutar Slidev directamente contra un archivo de `input/`: usa siempre la entrada de la raíz correspondiente.
- Los archivos Markdown de `input/` son material docente local y no se versionan.
- Separador de diapositivas: `---`.
- Frontmatter YAML para configuración general de la presentación o de cada diapositiva.
- Código con bloques cerrados de markdown (```java) o tarjetas `.code-card`.

## Comandos

```bash
npm run dev -- sesion01-pim-bloc-01-02.md
npm run build -- ud01-psp-python-basico-flujo-funciones.md --out dist/python-flujo
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pdf --output output/python.pdf
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format pptx --output output/python.pptx
npm run export -- ud01-psp-python-basico-tipos-colecciones.md --format png --output output/python
```

### Herramientas de verificación (scripts en la raíz del proyecto)

- `measure.mjs` — detecta diapositivas cuyo contenido desborda el lienzo (texto cortado por abajo). Uso: arranca el servidor de desarrollo (`npm run dev -- <entrada>.md`) y ejecuta `node measure.mjs http://localhost:3030` con el puerto que corresponda. La portada (diapositiva 1) da siempre un falso positivo por el fondo a sangre completa: hay que ignorarla.
- `check-contrast.mjs` — calcula el contraste WCAG de cada token de los bloques de código sobre su fondo real. Uso: `node check-contrast.mjs http://localhost:3030` con el servidor abierto. Avisa si algún token baja de 4.5:1 (nivel AA).
- Ambos necesitan Chromium vía `playwright-chromium` (ya está en las dependencias de desarrollo). Conviene pasarlos tras cambios de tema, de estilos globales o de diapositivas muy cargadas.

`npm run build` genera una web estática; `npm run export` admite los formatos `pdf`, `png`, `pptx` y `md`. Si Chromium no puede iniciarse dentro del sandbox, PDF, PNG y PPTX necesitan ejecutarse fuera de este.

Formato de entrega habitual: **solo PDF** en `output/`, con el mismo nombre base que la entrada (p. ej. `sesion01-pim-bloc-03-04.md` → `output/sesion01-pim-bloc-03-04.pdf`). El PPTX de Slidev son imágenes fijas por diapositiva, sin texto editable, y no aporta valor: no generar PPTX salvo petición explícita.

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
theme: bricks            # tema por defecto; default para un tono más formal
title: "Unidad XX — Título de la unidad"
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

# Unidad XX — Título de la unidad<br>Bloque XX

## 1r CFGS DAW · Programación

---
---

## Título de la diapositiva
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
