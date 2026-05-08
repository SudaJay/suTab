<script setup lang="ts">
import { ref } from 'vue'
import type { SearchEngine } from '../../data/types'

defineProps<{
  engines: SearchEngine[]
  selected: SearchEngine
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

const open = ref(false)

function choose(id: string) {
  emit('select', id)
  open.value = false
}
</script>

<template>
  <div class="relative z-[80]">
    <button
      type="button"
      class="flex h-11 items-center gap-2 rounded-2xl px-3 text-sm font-semibold text-ink transition hover:bg-white/50 dark:hover:bg-white/10"
      aria-label="Choose search engine"
      @click="open = !open"
    >
      <span
        class="grid h-7 w-7 place-items-center rounded-xl bg-gradient-to-br text-xs text-white shadow-sm"
        :class="selected.color"
      >
        {{ selected.icon }}
      </span>
      <span class="hidden sm:inline">{{ selected.name }}</span>
      <svg viewBox="0 0 24 24" class="h-4 w-4 text-muted" fill="none" stroke="currentColor" stroke-width="1.8">
        <path d="m7 10 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <Transition name="fade-up">
      <div
        v-if="open"
        class="glass absolute left-0 top-14 z-[90] w-64 rounded-[24px] p-2 shadow-air"
      >
        <button
          v-for="engine in engines"
          :key="engine.id"
          type="button"
          class="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition hover:bg-white/50 dark:hover:bg-white/10"
          @click="choose(engine.id)"
        >
          <span
            class="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br text-xs font-bold text-white"
            :class="engine.color"
          >
            {{ engine.icon }}
          </span>
          <span class="flex-1">
            <span class="block font-medium text-ink">{{ engine.name }}</span>
            <span class="text-xs text-muted">{{ engine.shortcut }} Search</span>
          </span>
          <span v-if="engine.id === selected.id" class="h-2 w-2 rounded-full bg-accent" />
        </button>
      </div>
    </Transition>
  </div>
</template>
