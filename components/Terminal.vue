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
  background: #0d1117;
  border: 1px solid rgba(148,163,184,0.1);
  border-radius: 10px;
  overflow: hidden;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #161b22;
  border-bottom: 1px solid rgba(148,163,184,0.1);
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
  color: #94a3b8;
  font-size: 0.75rem;
}

.terminal-body {
  padding: 14px 18px;
  line-height: 1.7;
  color: #f1f5f9;
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
