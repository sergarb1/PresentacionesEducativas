<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  background: {
    default: '',
  },
})

function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}

const style = computed(() => {
  const bg = props.background
  if (!bg) return {}
  const isColor = ['#', 'rgb', 'hsl'].some(v => bg.indexOf(v) === 0)
  return {
    background: isColor ? bg : undefined,
    color: !isColor ? 'white' : undefined,
    backgroundImage: isColor
      ? undefined
      : `url("${resolveAssetUrl(bg)}")`,
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
