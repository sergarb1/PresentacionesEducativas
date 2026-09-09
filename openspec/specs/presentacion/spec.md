# Spec: Presentación Slidev

## Descripción
Una presentación educativa Slidev formateada como archivo Markdown con frontmatter YAML.

## Requisitos

### Estructura
- Archivo principal: `slides.md`
- Frontmatter con theme, layout, background según diapositiva
- Separación de diapositivas con `---`

### Imágenes corporativas
- `public/inicio.png` — SOLO en primera diapositiva (layout: cover)
- `public/final.png` — SOLO en última diapositiva (layout: end)
- Diapositivas intermedias NUNCA usan esas imágenes

### Contenido
- Una idea por diapositiva
- Mezcla de tipos: concepto, código, terminal, diagrama, actividad
- Animaciones con `v-click` / `v-clicks`
- Diagramas Mermaid cuando facilite la comprensión
- Código con syntax highlighting

### Localización
- Un solo idioma por presentación
- es-ES: ordenador, móvil, ratón, archivo, carpeta
- Valenciano: ordinador, mòbil, ratolí, fitxer, carpeta

### Validación
- `npm run dev` arranca sin errores
- Inicio.png solo en portada
- Final.png solo en cierre
- Sin placeholders
- Contraste y legibilidad correctos
