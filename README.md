# Presentaciones Educativas

Presentaciones educativas para FP creadas con **Slidev 52**, en castellano y valencià, con un diseño Flat / Swiss Modernism claro, profesional y accesible.

La primera diapositiva utiliza la imagen corporativa `fondo.png`; la última utiliza `fondoFin.png`. El resto mantiene un fondo claro y una jerarquía tipográfica pensada para la proyección en 16:9.

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- `npm` (incluido con Node.js)

## Inicio rápido

```bash
git clone https://github.com/sergarb1/PresentacionesEducativas.git
cd PresentacionesEducativas
npm install
```

Los materiales docentes (`input/` y las entradas de la raíz) no se versionan: en un clon nuevo no habrá presentaciones hasta que crees la tuya (ver [Crear o editar diapositivas](#crear-o-editar-diapositivas)).

Todos los scripts son genéricos: después de `--` indica siempre la entrada de la raíz que quieres procesar.

```bash
npm run dev -- ud01-psp-python-basico-tipos-colecciones.md
npm run build -- ud01-psp-python-basico-flujo-funciones.md --out dist/python-flujo
```

## Temas disponibles

Puedes elegir el tema declarándolo en la entrada raíz (`theme:` en el frontmatter). El tema debe declararse en la entrada de la raíz, no en el Markdown de `input/`, para que Slidev lo cargue.

| Tema | Paquete | Estilo | Uso recomendado |
| --- | --- | --- | --- |
| `seriph` | `@slidev/theme-seriph` | Serif elegante en títulos, serio pero con carácter | **Tema por defecto** de las presentaciones |
| `default` | `@slidev/theme-default` | Flat / Swiss Modernism, sobrio | Presentaciones de tono formal de referencia |
| `bricks` | `@slidev/theme-bricks` | Bloques de colores vivos, alegre | Charlas divulgativas y actividades |

Los componentes compartidos (`.step`, `.info`, `.comparison-grid`, etc.) de `styles/index.css` funcionan con los tres temas: el CSS del proyecto redefine tipografía, tablas y componentes por encima del del tema.

## Estructura

```text
.
├── sesion01-pim-*.md       # Entradas Slidev de Proyecto Intermodular (no versionadas)
├── ud01-prg-*.md           # Entradas Slidev de Programación (no versionadas)
├── ud01-psp-*.md           # Entradas Slidev de Servicios y Procesos (no versionadas)
├── ud01-par-*.md           # Entradas Slidev de Redes (no versionadas)
├── input/                  # Markdown fuente local (no versionado)
│   ├── sesion01-pim-*.md
│   ├── ud01-prg-*.md
│   ├── ud01-psp-*.md
│   └── ud01-par-*.md
├── layouts/
│   ├── cover.vue           # Portada con fondo.png y logo CEEDCV
│   └── closing.vue         # Cierre con fondoFin.png y logos
├── styles/index.css        # Tema y componentes compartidos
├── public/images/          # Imágenes corporativas
└── output/                 # Exportaciones generadas (no versionadas)
```

Las entradas de la raíz importan el contenido local de `input/`. Es importante usarlas en los scripts de Slidev para que el framework cargue `styles/` y `layouts/`. Tanto `input/` como `output/` están excluidos de Git para mantener privados los materiales docentes y las exportaciones.

## Crear o editar diapositivas

Los archivos Markdown de `input/` son el contenido editable local. Cada diapositiva se separa con `---`.

```markdown
---

## Título de la diapositiva
### Subtítulo o contexto

<div class="info">
  Mensaje relevante para el alumnado.
</div>
```

Para una presentación nueva, usa el patrón `udXX-modul-tema.md` con el módulo en minúsculas: por ejemplo, `ud01-prg-estructures-control.md` (Proyecto Intermodular usa `sesionXX-pim-…`). Crea el contenido en `input/` y una entrada con el mismo nombre en la raíz, donde se declara el tema:

```markdown
---
theme: seriph
src: ./input/ud01-prg-estructures-control.md
---
```

El contenido debe usar `layout: cover` solo en portada y `layout: closing` solo al final.

## Componentes disponibles

| Finalidad | Clases |
| --- | --- |
| Avisos | `.warning`, `.info`, `.success` |
| Procesos | `.step`, `.step-number`, `.step-content` |
| Rejillas | `.features-grid`, `.feature-item`, `.feature-icon` |
| Comparaciones | `.comparison-grid`, `.comparison-item`, `.good`, `.bad` |
| Código | `.code-card`, `.terminal` |
| Marcar errores en código | `.error-inline` |
| Actividades | `.question-card`, `.answer-card` |
| Dos columnas | `.two-cols` |

Todos los estilos están centralizados en `styles/index.css`.

### Reglas para bloques de código y cierre

- Los bloques HTML `<pre><code>` no deben contener líneas en blanco: el parser de markdown las convierte en `<p>` y rompe el bloque (el export falla con "Element is missing end tag"). Compacta el código o divide la diapositiva.
- Indenta el contenido de los `<pre><code>` (en Java, 4 espacios): el bloque empieza en la columna del `pre` y el código se sangra dentro. Un cuerpo pegado a columna 0 dentro de una `.code-card` se ve mal maquetado.
- La diapositiva de cierre (`layout: closing`) va vacía: el layout ya compone el fondo `fondoFin.png` con los logos centrados, así que no añadas títulos ni texto.
- Los componentes (`.step`, `.info`, `.terminal`…) se usan tal cual están definidos en `styles/index.css`; si un número de paso queda lejos de su texto, se ajusta el componente en el CSS compartido, no en la diapositiva.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev -- entrada.md` | Abre una presentación en desarrollo |
| `npm run build -- entrada.md --out dist/nombre` | Genera una web estática para publicar o servir offline |
| `npm run export -- entrada.md --format pdf --output output/nombre.pdf` | Exporta a PDF |
| `npm run export -- entrada.md --format pptx --output output/nombre.pptx` | Exporta a PowerPoint |
| `npm run export -- entrada.md --format png --output output/nombre` | Exporta una imagen PNG por diapositiva |
| `npm run export -- entrada.md --format md --output output/nombre.md` | Exporta a Markdown |
| `npm run format -- entrada.md` | Formatea el Markdown de Slidev |

Para PDF, PNG y PPTX, Slidev usa Chromium mediante Playwright. Si es la primera instalación, `npm install` descarga el navegador necesario. La compilación HTML crea una carpeta estática; para abrirla sin internet, conserva toda la carpeta y sírvela con un servidor local.

El formato de entrega habitual es **solo PDF** en `output/`, con el mismo nombre base que la entrada. El PPTX de Slidev son imágenes fijas por diapositiva, sin texto editable, así que solo se genera bajo petición explícita.

## Verificación de maquetación y contraste

Dos scripts en la raíz del proyecto comprueban la calidad visual de una presentación con el servidor de desarrollo abierto:

```bash
npm run dev -- ud01-psp-python-basico-tipos-colecciones.md
# en otra terminal:
node measure.mjs http://localhost:3030          # detecta diapositivas con contenido cortado
node check-contrast.mjs http://localhost:3030   # contraste WCAG de los tokens de código (AA: 4.5:1)
```

`measure.mjs` avisa de diapositivas cuyo contenido supera el alto del lienzo (la portada da siempre un falso positivo por el fondo a sangre completa). `check-contrast.mjs` calcula el ratio WCAG de cada token de los bloques de código sobre su fondo real. Conviene pasarlos tras cambios de tema, de estilos globales o de diapositivas muy cargadas. Ambos necesitan Chromium vía `playwright-chromium`.

## Diseño e imágenes corporativas

- Resolución: 1920×1080, formato 16:9.
- Tipografías: Inter para el texto y JetBrains Mono para el código.
- Tema por defecto: `seriph`, con `default` y `bricks` como alternativas.
- Color acento: azul `#2563EB`.
- Escala tipográfica: 18 px de base; portada con título de 2.6 rem para no saturar la composición.
- `public/images/fondo.png`: solo portada.
- `public/images/fondoFin.png`: solo cierre.
- No uses las imágenes corporativas como fondo en diapositivas intermedias.
- **Contraste en bloques de código**: fondos oscuros (#1E293B) con texto claro (#E2E8F0). Evitar colores intermedios. Usa `.code-card` o bloques markdown con Shiki.

## Licencia

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
