<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  url: string
  title: string
  color?: string
}>()

const failed = ref(false)

const domain = computed(() => {
  try {
    return new URL(props.url).hostname
  } catch {
    return props.url.replace(/^https?:\/\//, '').split('/')[0]
  }
})

const src = computed(() => `https://www.google.com/s2/favicons?domain=${domain.value}&sz=64`)
const fallback = computed(() => props.title.trim().charAt(0).toUpperCase() || '?')

watch(
  () => props.url,
  () => {
    failed.value = false
  },
)
</script>

<template>
  <span
    class="inline-flex h-full w-full items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br text-sm font-semibold text-ink shadow-inner"
    :class="color ?? 'from-violet-100 to-sky-100'"
  >
    <img
      v-if="!failed"
      :src="src"
      :alt="`${title} favicon`"
      class="h-8 w-8 rounded-lg"
      loading="lazy"
      @error="failed = true"
    />
    <span v-else>{{ fallback }}</span>
  </span>
</template>
