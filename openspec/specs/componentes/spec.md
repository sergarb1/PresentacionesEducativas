# Spec: Componentes Vue

## Descripción
Componentes Vue reutilizables para presentaciones Slidev.

## Componentes existentes

### Terminal.vue
- Simulador de terminal con header (dots rojo/amarillo/verde)
- Props: title, lines
- Slots para contenido personalizado

### CodeCard.vue
- Bloque de código con header y badge de lenguaje
- Props: title, lang
- Slots para código

### Question.vue
- Pregunta interactiva con icono
- Props: question
- Slot para respuesta

### Answer.vue
- Respuesta oculta (se muestra con v-click)
- Props: title
- Slot para contenido

### Warning.vue
- Aviso destacado (warning/danger/info/tip)
- Props: type
- Slot para contenido

### Comparison.vue
- Comparación correcto/incorrecto lado a lado
- Props: title
- Slots: good, bad

### StepProcess.vue
- Proceso numerado con pasos
- Props: steps (array de {title, description, icon})

### TechCard.vue
- Tarjeta de tecnología con color
- Props: name, icon, description, color
- Slot para contenido adicional

## Requisitos
- Estilos scoped en cada componente
- Usar tokens CSS de styles/variables.css
- Dark mode por defecto
- Accesible (contraste, tamaños)
