<script setup lang="ts">
import type { Shortcut } from '../../data/types'
import Favicon from '../ui/Favicon.vue'

defineProps<{
  shortcut: Shortcut
}>()

const emit = defineEmits<{
  open: [shortcut: Shortcut]
  remove: [id: string]
}>()
</script>

<template>
  <article class="group relative">
    <button
      type="button"
      class="flex w-full flex-col items-center gap-3 rounded-[22px] p-3 transition-all duration-300 ease-apple hover:-translate-y-1 hover:bg-white/35 hover:shadow-lift dark:hover:bg-white/8"
      @click="emit('open', shortcut)"
    >
      <span class="grid h-16 w-16 place-items-center rounded-[20px] bg-white/55 p-2 shadow-air dark:bg-white/8">
        <Favicon :url="shortcut.url" :title="shortcut.title" :color="shortcut.color" />
      </span>
      <span class="w-full min-w-0 text-center">
        <span class="block truncate text-sm font-semibold text-ink">{{ shortcut.title }}</span>
        <span class="block truncate text-xs text-muted">{{ shortcut.description }}</span>
      </span>
    </button>

    <button
      type="button"
      class="absolute right-1 top-1 grid h-6 w-6 scale-90 place-items-center rounded-full bg-white/80 text-muted opacity-0 shadow-sm transition duration-200 hover:bg-white hover:text-ink group-hover:scale-100 group-hover:opacity-100 dark:bg-black/40 dark:hover:bg-white/10"
      :aria-label="`Remove ${shortcut.title}`"
      @click.stop="emit('remove', shortcut.id)"
    >
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m7 7 10 10M17 7 7 17" stroke-linecap="round" />
      </svg>
    </button>
  </article>
</template>
