# AGENTS.md — Presentaciones Educativas Slidev

## Configuración del proyecto

- **Framework**: Slidev 52.x (@slidev/cli)
- **Tema**: `seriph` (@slidev/theme-seriph, serif elegante en títulos: serio pero con más carácter) es el **tema por defecto** usado en las presentaciones. Alternativas instaladas: `default` (@slidev/theme-default, sobrio de referencia) y `bricks` (@slidev/theme-bricks, bloques de colores, tono divulgativo). El tema se elige por entrada y no se mezclan estilos entre decks.
- **Estilo**: Flat Design / Swiss Modernism, light mode, limpio, profesional
- **Tipografía**: Inter (800/700/600/500/400) + JetBrains Mono para código
- **Idioma**: castellano por defecto, valencià para contenido educativo
- **FP**: priorizar procedimientos, herramientas, casos profesionales
- **Resolución**: 1920×1080 (Full HD, 16:9)
- **Selección de tema**: el tema se declara en la entrada de la raíz (`theme:` en el frontmatter), nunca dentro del Markdown de `input/`; si no, Slidev lo ignora. Los componentes compartidos de `styles/index.css` funcionan con cualquiera de los tres temas (verificado con `measure.mjs` y `check-contrast.mjs`): nuestro CSS redefine tipografía, tablas y componentes por encima del del tema. Con `bricks` la paleta viva del tema puede prevalecer sobre las reglas de Diseño pensadas para `default` (acento único #2563EB, tablas con cabecera azul, etc.).

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
- Escala tipográfica moderada: base de 18 px; título de portada de 2.2 rem, para que «Unitat XX — Tema» quepa en una línea (o el bloque en una segunda).
- Tablas con esquinas redondeadas (`border-radius: 12px`) y cabecera azul
- Ningún elemento puede superar el tamaño de la diapositiva (sin desbordamientos)
- **Contraste en bloques de código**: asegurar que todo el código dentro de bloques `<pre>` tenga contraste suficiente. Para fondos oscuros (#1E293B, #0F172A), usar colores claros (#E2E8F0, #F8F9FA). Para fondos claros, usar colores oscuros. Evitar colores intermedios como #94A3B8 sobre fondos oscuros. Priorizar el uso de `.code-card` o bloques markdown con Shiki en lugar de estilos inline.
- **Shiki dual-theme**: los bloques markdown (```python, ```java...) se renderizan con doble tema (vitesse-dark/vitesse-light). `styles/index.css` fuerza siempre la paleta dark (`.slidev-layout pre.shiki span { color: var(--shiki-dark) }`) sobre el fondo oscuro #1E293B, con overrides a equivalentes AA para los tonos con poco contraste (#666666, #758575, #4C9A91, #CB7676...). Sin esas reglas, en light mode el texto sale oscuro sobre oscuro e ilegible (pasó en las presentaciones de PSP). No eliminarlas.
- Verificación de contraste de código: `node check-contrast.mjs <url>` (dev server abierto). Calcula el ratio WCAG de cada token Shiki sobre su fondo real y avisa si alguno baja de 4.5:1.
- Barrido de diapositivas vacías: `node check-empty.mjs <url> <nº diapositivas>` (dev server abierto). Marca las diapositivas sin contenido visible, excluyendo portada y cierre corporativos. Tras **insertar o borrar diapositivas**, comprobar siempre: un separador duplicado (`---\n---\n--- …`) crea una diapositiva vacía en medio del deck.
- **Estilos inline en HTML de diapositivas**: usar solo para compactación puntual de esa diapositiva. Los estilos de lista (`.step`, `.code-card`, `.terminal`, etc.) van en `styles/index.css`, no inline.

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
- `.two-cols` — maquetación en 2 columnas (`.left` / `.right`, contenido siempre alineado a la izquierda)
- `.sparse-slide` — centrado vertical + tipografía mayor para diapositivas con poco contenido (se activa con `class: sparse-slide` en el frontmatter de la diapositiva)
- `.diagram-frame` (+ variante `.diagram-medium`, 360px) — marco centrado para incrustar diagramas Excalidraw; alto fijo para que el deck no desborde

### Contenido Markdown
- Los Markdown fuente viven en `input/`.
- Las entradas de la raíz importan el Markdown de `input/` para que Slidev cargue los estilos y layouts compartidos.
- Nomenclatura: la entrada de la raíz, su Markdown en `input/` y el PDF de `output/` deben compartir el mismo nombre base. Patrón por módulo: PIM usa `sesionXX-pim-…` (p. ej. `sesion01-pim-bloc-01-02.md`); el resto de módulos usan `udXX-modul-tema.md` con el módulo en minúsculas (`ud01-psp-...`, `ud01-prg-...`, `ud01-par-...`). Si una unidad se divide en bloques, el sufijo `-bloc-XX` va siempre tras el tema (p. ej. `ud02-prg-introduccio-java-bloc-01.md`), nunca en solitario.
- No ejecutar Slidev directamente contra un archivo de `input/`: usa siempre la entrada de la raíz correspondiente.
- Los archivos Markdown de `input/` son material docente local y no se versionan.
- Separador de diapositivas: `---`.
- Frontmatter YAML para configuración general de la presentación o de cada diapositiva.
- Código con bloques cerrados de markdown (```java) o tarjetas `.code-card`.
- **Nunca dejes líneas en blanco dentro de un `<pre><code>` HTML**: el parser de markdown inserta un `<p>` en medio, rompe el bloque y el export falla (error "Element is missing end tag"). Compacta el código o divide la diapositiva.
- **Todo `<pre><code>` debe quedar indentado en el render**: los bloques empiezan sin sangría en la columna del `pre` y su contenido se indenta dentro (4 espacios en Java). Un cuerpo a columna 0 dentro de la tarjeta se ve mal maquetado. Tras crear diapositivas con código, verifícalo (vuelca el `innerText` de los `pre` o haz captura).
- **Diapositiva de cierre**: con `layout: closing` no escribas título ni texto: el layout ya pinta fondo `fondoFin.png` y los logos centrados. Déjala vacía (`---\nlayout: closing\n---` al final del archivo).
- Los pasos `.step` llevan el número en una caja y el texto justo al lado (gap 0.55rem en `styles/index.css`): no sitúes el texto lejos del número ni redefinas el componente en las diapositivas.

### Commits

- **Nunca pongas el nombre de nadie en los commits**: ni como autor, ni como coautor (`Co-Authored-By`), ni mencionado en el mensaje. El autor es quien ejecuta el commit con su propia configuración de Git.
- **Sin marcas de herramienta**: nada de pies tipo «Generated with …» ni firmas de agentes (Codebuff u otras). El commit queda con el mensaje limpio: título conciso y, si hace falta, cuerpo explicando el porqué.

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
- `check-empty.mjs` — recorre todas las diapositivas del deck y marca las que quedan sin contenido visible (excluye portada y cierre corporativos). Uso: `node check-empty.mjs http://localhost:3030 <nº diapositivas>`. **Pasar siempre tras insertar o borrar diapositivas**: un separador duplicado crea páginas en blanco.
- `debug-overflow.mjs` y `screenshot.mjs` — auxiliares de diagnóstico puntual (detalle de qué desborda una diapositiva concreta; captura PNG de una diapositiva).
- Todos necesitan Chromium vía `playwright-chromium` (ya está en las dependencias de desarrollo). Conviene pasarlos tras cambios de tema, de estilos globales, de diapositivas muy cargadas o al insertar/borrar diapositivas.

`npm run build` genera una web estática; `npm run export` admite los formatos `pdf`, `png`, `pptx` y `md`. Si Chromium no puede iniciarse dentro del sandbox, PDF, PNG y PPTX necesitan ejecutarse fuera de este.

Formato de entrega habitual: **solo PDF** en `output/`, con el mismo nombre base que la entrada (p. ej. `sesion01-pim-bloc-03-04.md` → `output/sesion01-pim-bloc-03-04.pdf`). El PPTX de Slidev son imágenes fijas por diapositiva, sin texto editable, y no aporta valor: no generar PPTX salvo petición explícita.

### Diagramas con Excalidraw

- Los diagramas se crean con `mcp-excalidraw-server` (devDependency). El archivo `.excalidraw` canónico vive en `input/diagrams/` (con el resto del material docente local, fácil de copiar de respaldo) y **siempre** se deja una copia en `public/diagrams/` (versionada), que es la ruta que sirve el addon. Nombres alineados con la entrada: `udXX-prg-<tema>.excalidraw`.
- Tres interfaces equivalentes: la skill del agente (`.agents/skills/excalidraw-skill/`, preferente: carga `excalidraw-skill` y sigue su flujo `add → screenshot → ajustar → export`), el CLI (`npx mcp-excalidraw-server <comando>`) y el servidor MCP declarado en `.mcp.json` (stdio). El lienzo vive en `http://127.0.0.1:3000` y se auto-arranca; capturas y conversión `mermaid` requieren una pestaña del navegador abierta.
- Para incrustar en una diapositiva: declara `addons: [slidev-addon-excalidraw]` en el frontmatter de la entrada raíz y usa `<Excalidraw drawFilePath="/diagrams/x.excalidraw" class="diagram-svg" :darkMode="false" :background="false" />` dentro de un `<div class="diagram-frame">` (estilos en `styles/index.css`). La ruta es relativa a `public/`. Para diapositivas que combinan el diagrama con más contenido, añade `diagram-medium` al frame (360px).
- **Los ajustes del `<div>` van con clase CSS, nunca con `style="..."` inline**: el pipeline los pierde y el marco vuelve a su alto por defecto.
- Formato apaisado: el lienzo interno es 980×551 px, así que diseña filas de 2–3 cajas o árboles poco profundos; si el diagrama no cabe, partir en dos diapositivas. Tras insertar, pasar `measure.mjs` (los diagramas sin marco de alto fijo pueden empujar el contenido).

## Estructura

```
PresentacionesEducativas/
├── styles/
│   └── index.css               # Estilos compartidos (variables + componentes + layouts)
│                               #   incluye .error-inline (marcar errores sobre código, claro y sobre fondo oscuro)
├── layouts/
│   ├── cover.vue               # Layout de portada (fondo fondo.png + logo CEEDCV + autor)
│   └── closing.vue             # Layout de cierre (fondo fondoFin.png + logos centrados)
├── public/
│   ├── images/
│   │   ├── fondo.png           # Fondo de portada
│   │   ├── fondoFin.png        # Fondo de cierre
│   │   ├── logoCCBYSA.png      # Logo Creative Commons
│   │   └── logoCEEDCV.png      # Logo Generalitat Valenciana / CEEDCV
│   └── diagrams/               # Copia servible de los diagramas (versionada)
├── input/                      # Markdown fuente local (ignorado por Git)
│   ├── udXX-modul-tema.md
│   └── diagrams/               # Diagramas .excalidraw canónicos (con el material docente)
├── udXX-modul-tema.md          # Entrada Slidev que importa input/udXX-modul-tema.md
├── output/                     # Exportaciones generadas (ignorado por Git)
├── measure.mjs                 # Scripts de verificación (ver sección Herramientas):
├── check-contrast.mjs          #   desbordamientos, contraste AA, barrido de vacías
├── check-empty.mjs             #   y auxiliares de diagnóstico (debug-overflow, screenshot)
├── package.json
├── .mcp.json                   # Servidor MCP de Excalidraw (stdio)
├── .agents/skills/             # Skills del agente (excalidraw-skill)
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
theme: seriph            # tema por defecto; default (sobrio) o bricks (divulgativo) como alternativas
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
