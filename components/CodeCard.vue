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
  background: #0d1117;
  border: 1px solid rgba(148,163,184,0.1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}

.code-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #161b22;
  border-bottom: 1px solid rgba(148,163,184,0.1);
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
  color: #94a3b8;
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
