<script setup>
defineProps({
  title: { type: String, default: '' },
  lang: { type: String, default: '' }
})
</script>

<template>
  <div class="code-card">
    <div v-if="title" class="code-card-header">
      <span class="code-card-lang" v-if="lang">{{ lang }}</span>
      <span class="code-card-title">{{ title }}</span>
    </div>
    <div class="code-card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.code-card {
  background: #0F172A;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.code-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #1E293B;
  border-bottom: 1px solid var(--border-default);
}

.code-card-lang {
  background: rgba(6,182,212,0.15);
  color: #06b6d4;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.code-card-title {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.code-card-body {
  padding: 0;
}

.code-card-body :deep(pre) {
  margin: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
}
</style>
