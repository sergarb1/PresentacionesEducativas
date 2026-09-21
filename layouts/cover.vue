<template>
  <div class="slidev-layout cover">
    <div class="cover-logo">
      <img src="/images/logoCEEDCV.png" alt="Logo Generalitat Valenciana / CEEDCV" />
    </div>
    <div class="cover-content">
      <slot />
    </div>
    <div class="cover-author">
      <p>{{ autorPortada }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client/context.ts'

const props = defineProps({
  author: {
    type: String,
    default: ''
  }
})

// $frontmatter contiene el frontmatter de la diapositiva actual
const { $frontmatter } = useSlideContext()

// Prioridad: prop explícito > frontmatter de la slide > default del proyecto
const autorPortada = computed(() =>
  props.author || $frontmatter?.value?.author || $frontmatter?.author || 'Sergi García Barea'
)
</script>
