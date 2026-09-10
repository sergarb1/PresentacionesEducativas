<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '@slidev/theme-default/layoutHelper'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background, false))
</script>

<template>
  <div class="slidev-layout end" :style="style">
    <div />
  </div>
</template>
