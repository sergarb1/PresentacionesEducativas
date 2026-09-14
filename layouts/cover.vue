<template>
  <div class="slidev-layout cover">
    <div class="cover-logo">
      <img src="/images/logoCEEDCV.png" alt="Logo Generalitat Valenciana / CEEDCV" />
    </div>
    <div class="cover-content">
      <slot />
    </div>
    <div class="cover-author">
      <p>{{ author || 'Sergi García Barea' }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: String,
    default: 'Sergi García Barea'
  }
})
</script>
