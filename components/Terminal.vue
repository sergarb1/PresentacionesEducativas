<script setup>
defineProps({
  title: { type: String, default: 'Terminal' },
  lines: { type: Array, default: () => [] }
})
</script>

<template>
  <div class="terminal">
    <div class="terminal-header">
      <span class="terminal-dot red"></span>
      <span class="terminal-dot yellow"></span>
      <span class="terminal-dot green"></span>
      <span class="terminal-title">{{ title }}</span>
    </div>
    <div class="terminal-body">
      <div v-for="(line, i) in lines" :key="i" class="terminal-line">
        <span v-if="line.prompt" class="prompt">$ </span>
        <span :class="line.class || ''">{{ line.text }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: #0F172A;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: var(--text-code);
  box-shadow: var(--shadow-card);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #1E293B;
  border-bottom: 1px solid var(--border-default);
}

.terminal-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }

.terminal-title {
  margin-left: 8px;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.terminal-body {
  padding: 14px 18px;
  line-height: 1.7;
  color: #E2E8F0;
}

.terminal-line {
  white-space: pre-wrap;
  word-break: break-all;
}

.prompt {
  color: #10b981;
  user-select: none;
}

:deep(.highlight) { color: #06b6d4; }
:deep(.error) { color: #ef4444; }
:deep(.success) { color: #10b981; }
:deep(.warning) { color: #f59e0b; }
</style>
