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
  color: #f1f5f9;
  margin-bottom: 1rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.comparison-col {
  border-radius: 10px;
  padding: 1.25rem;
  background: #1e293b;
  border: 1px solid rgba(148,163,184,0.1);
}

.comparison-col.good {
  border-color: rgba(16,185,129,0.3);
}

.comparison-col.bad {
  border-color: rgba(239,68,68,0.3);
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
