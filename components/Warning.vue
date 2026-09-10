<script setup>
defineProps({
  type: { type: String, default: 'warning' }
})
</script>

<template>
  <div :class="['alert', type]">
    <slot />
  </div>
</template>

<style scoped>
.alert {
  border-radius: var(--radius-md);
  padding: var(--space-md) var(--space-lg);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-primary);
}

.alert.warning {
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.25);
  border-left: 3px solid #f59e0b;
}

.alert.danger {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-left: 3px solid #ef4444;
}

.alert.info {
  background: rgba(6,182,212,0.08);
  border: 1px solid rgba(6,182,212,0.25);
  border-left: 3px solid #06b6d4;
}

.alert.tip {
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  border-left: 3px solid #10b981;
}
</style>
