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
  border-radius: 8px;
  padding: 1rem 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.alert.warning {
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.25);
  border-left: 3px solid #f59e0b;
  color: #f1f5f9;
}

.alert.danger {
  background: rgba(239,68,68,0.08);
  border: 1px solid rgba(239,68,68,0.25);
  border-left: 3px solid #ef4444;
  color: #f1f5f9;
}

.alert.info {
  background: rgba(6,182,212,0.08);
  border: 1px solid rgba(6,182,212,0.25);
  border-left: 3px solid #06b6d4;
  color: #f1f5f9;
}

.alert.tip {
  background: rgba(16,185,129,0.08);
  border: 1px solid rgba(16,185,129,0.25);
  border-left: 3px solid #10b981;
  color: #f1f5f9;
}
</style>
