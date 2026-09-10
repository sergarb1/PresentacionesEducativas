<script setup>
defineProps({
  steps: { type: Array, required: true }
})
</script>

<template>
  <div class="step-process">
    <div v-for="(step, i) in steps" :key="i" class="step">
      <div class="step-number">{{ i + 1 }}</div>
      <div class="step-content">
        <div class="step-title">
          <span v-if="step.icon" class="step-icon">{{ step.icon }}</span>
          {{ step.title }}
        </div>
        <div v-if="step.description" class="step-desc">{{ step.description }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-process {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
}

.step-number {
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.step-content {
  flex: 1;
  padding-top: 0.2rem;
}

.step-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.step-icon {
  margin-right: 0.4rem;
}

.step-desc {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 0.25rem;
  line-height: 1.5;
}
</style>
