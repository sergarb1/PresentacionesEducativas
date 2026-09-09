<script setup>
defineProps({
  title: { type: String, default: 'Respuesta' }
})
</script>

<template>
  <div class="answer">
    <div class="answer-label">{{ title }}</div>
    <slot />
  </div>
</template>

<style scoped>
.answer {
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  border-left: 3px solid #10b981;
  border-radius: 8px;
  padding: 1rem 1.25rem;
}

.answer-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}
</style>
