# AGENTS.md — Presentaciones Educativas Slidev

## Configuración del proyecto

- **Framework**: Slidev + Vue 3 + Markdown
- **Estilo**: Minimalism / Swiss Modernism, light mode, limpio, profesional
- **Tipografía**: Inter Bold (800/700) + JetBrains Mono para código
- **Idioma**: español de España (es-ES) o valenciano según petición
- **FP**: priorizar procedimientos, herramientas, casos profesionales

## Reglas permanentes

### Imágenes corporativas
- `public/inicio.png` → SOLO fondo de la primera diapositiva (layout: cover)
- `public/final.png` → SOLO fondo de la última diapositiva (layout: end)
- Las diapositivas intermedias NUNCA usan esas imágenes como fondo
- No deformar las imágenes. No tapar elementos corporativos importantes

### Diseño
- Light mode por defecto (#FFFFFF, #F8F9FA)
- Contraste WCAG AAA: texto principal #1A1A2E sobre fondo claro
- **Una idea por diapositiva** pero con profundidad suficiente
- **Mínimo 30-40 diapositivas** por presentación de unidad (más si el contenido lo requiere)
- Combinar tipos: concepto, código, terminal, diagrama, actividad, etc.
- Usar `v-click` / `v-clicks` para animaciones pedagógicas
- Mermaid para diagramas cuando facilite la comprensión
- Un solo color accent por presentación (#2563EB por defecto)
- **Cada sección del temario** debe tener: introducción, desarrollo (múltiples diapositivas), resumen, y actividad/mini-comprobación
- **No resumir en exceso**: desarrollo amplio con ejemplos, tablas, código, analogías

### Componentes
- Usar componentes Vue de `components/` cuando reutilicen
- No crear componentes innecesarios
- Estilos en `styles/`

### Localización
- **es-ES**: ordenador, móvil, ratón, archivo, carpeta, pantalla, red
- **Valenciano**: ordinador, mòbil, ratolí, fitxer, carpeta, pantalla, xarxa
- No mezclar idiomas en la misma presentación

### Validación
- Ejecutar `npm run dev` y comprobar que arranca
- Verificar inicio.png solo en portada
- Verificar final.png solo en cierre
- Eliminar placeholders (TODO, Lorem ipsum, etc.)
- Comprobar contraste, legibilidad de código, diagramas

### Skill
- Consultar skill `presentaciones-slidev` para conocimiento especializado
- La skill contiene arquitectura, diseño, pedagogía, componentes, validación

## Comandos

```bash
npm run dev         # Desarrollo (slides.md principal)
npm run build       # Build producción
npm run export      # Exportar PDF
npm run import      # Importar PPTX → output/slides.md
npm run import:dev  # Importar y abrir en desarrollo
```

### Importar PPTX

```bash
# PPTX por defecto: input/entrada.pptx
npm run import

# Ruta personalizada
npm run import -- ruta/al/archivo.pptx
```

**Flujo de importación:**
1. Coloca el PPTX en `input/` (o pasa la ruta como argumento)
2. El script extrae texto → markdown e imágenes → `public/images/`
3. Genera `output/slides.md` con cover (inicio.png) y cierre (final.png)
4. **Genera los 3 formatos automáticamente:**
   - `output/<nombre>/` — web offline (HTML estático)
   - `output/<nombre>.pdf` — PDF
   - `output/<nombre>.pptx` — PPTX
5. Edita `output/slides.md` para pulir, ampliar o reorganizar

### Exportar a PDF

```bash
# Requisitos: npm install -D playwright-chromium (solo la primera vez)
npx slidev export                          # Exporta a PDF
npx slidev export --output mi-presentacion.pdf  # Nombre personalizado
npx slidev export --dark                   # Exportar en modo oscuro
```

**Notas sobre exportación:**
- La exportación usa Playwright (Chromium) para renderizar cada diapositiva
- Las diapositivas con `v-click` se exportan mostrando todo el contenido
- Las animaciones NO se reproducen en PDF (es estático)
- El resultado se guarda en la raíz del proyecto como `<exportFilename>.pdf`
- Para cambiar el nombre: editar `exportFilename` en el frontmatter de `slides.md`

### Carpeta output/

Las presentaciones generadas (importadas o exportadas) se guardan en `output/`.
Esta carpeta está en `.gitignore` y NO se sube a git.

## OpenSpec

Gestión de especificaciones del proyecto.

```bash
/opsx-explore    # Explorar una idea antes de proponer
/opsx-propose    # Proponer un cambio (diapositiva, componente, etc.)
/opsx-apply      # Implementar un cambio planificado
/opsx-sync       # Sincronizar specs con el cambio
/opsx-archive    # Archivar cambio completado
/opsx-update     # actualizar cambios pendientes
```

### Specs del proyecto
- `openspec/specs/` — fuente de verdad del comportamiento
- `openspec/changes/` — cambios en progreso
- `openspec/config.yaml` — configuración y contexto
