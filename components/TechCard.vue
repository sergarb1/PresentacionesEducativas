<script setup>
defineProps({
  name: { type: String, required: true },
  icon: { type: String, default: '' },
  description: { type: String, default: '' },
  color: { type: String, default: 'cyan' }
})
</script>

<template>
  <div :class="['tech-card', color]">
    <div v-if="icon" class="tech-icon">{{ icon }}</div>
    <div class="tech-name">{{ name }}</div>
    <div v-if="description" class="tech-desc">{{ description }}</div>
    <div class="tech-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tech-card {
  background: var(--bg-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.tech-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-hover);
}

.tech-card.cyan { border-top: 3px solid #06b6d4; }
.tech-card.green { border-top: 3px solid #10b981; }
.tech-card.violet { border-top: 3px solid #8b5cf6; }
.tech-card.magenta { border-top: 3px solid #ec4899; }
.tech-card.blue { border-top: 3px solid #3b82f6; }

.tech-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.tech-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.tech-desc {
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.tech-body {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.5;
}
</style>
