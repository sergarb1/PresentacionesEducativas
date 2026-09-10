<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => {
  const bg = props.background
  if (!bg) return {}
  return {
    backgroundImage: `url("${bg}")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
})
</script>

<template>
  <div class="slidev-layout cover" :style="style">
    <div class="my-auto w-full">
      <slot />
    </div>
  </div>
</template>
