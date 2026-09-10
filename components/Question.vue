<script setup>
defineProps({
  question: { type: String, required: true }
})
</script>

<template>
  <div class="question">
    <div class="question-icon">?</div>
    <div class="question-text">{{ question }}</div>
    <div class="question-answer">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.question {
  background: var(--bg-card);
  border: 1px solid rgba(139,92,246,0.25);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.question-icon {
  width: 2.2rem;
  height: 2.2rem;
  background: #8b5cf6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.question-text {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.question-answer {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
