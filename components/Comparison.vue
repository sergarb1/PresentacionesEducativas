<script setup>
defineProps({
  title: { type: String, default: '' }
})
</script>

<template>
  <div class="comparison">
    <div v-if="title" class="comparison-title">{{ title }}</div>
    <div class="comparison-grid">
      <div class="comparison-col good">
        <div class="comparison-label good-label">Correcto</div>
        <slot name="good" />
      </div>
      <div class="comparison-col bad">
        <div class="comparison-label bad-label">Incorrecto</div>
        <slot name="bad" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.comparison-col {
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  background: var(--bg-card);
  border: 1px solid var(--border-default);
}

.comparison-col.good {
  border-color: rgba(16,185,129,0.4);
  background: rgba(16,185,129,0.05);
}

.comparison-col.bad {
  border-color: rgba(239,68,68,0.4);
  background: rgba(239,68,68,0.05);
}

.comparison-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.good-label { color: #10b981; }
.bad-label { color: #ef4444; }
</style>
