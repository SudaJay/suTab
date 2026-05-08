<script setup lang="ts">
import type { SearchEngine } from '../../data/types'

const props = defineProps<{
  suggestions: string[]
  query: string
  engine: SearchEngine
  loading?: boolean
}>()

const emit = defineEmits<{
  choose: [value: string]
  translate: []
}>()

function parts(value: string) {
  const query = props.query.trim()
  if (!query) return [{ value, matched: false }]

  const index = value.toLowerCase().indexOf(query.toLowerCase())
  if (index === -1) return [{ value, matched: false }]

  return [
    { value: value.slice(0, index), matched: false },
    { value: value.slice(index, index + query.length), matched: true },
    { value: value.slice(index + query.length), matched: false },
  ].filter((part) => part.value)
}
</script>

<template>
  <div class="glass absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 rounded-[22px] p-2">
    <button
      type="button"
      class="mb-1 flex w-full items-center gap-3 rounded-2xl bg-white/42 px-3 py-3 text-left transition hover:bg-white/60 dark:bg-white/8 dark:hover:bg-white/12"
      @mousedown.prevent="emit('translate')"
    >
      <span class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent2 text-white shadow-sm">
        <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 5h9M9 3v2M11 5c-.6 3.7-2.8 6.4-6 8" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5.5 8.5c1 1.7 2.4 3.1 4.2 4.1M13 21l4-9 4 9M14.5 18h5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="min-w-0 flex-1">
        <span class="block truncate text-sm font-semibold text-ink">翻译：{{ query }}</span>
        <span class="mt-0.5 block truncate text-xs text-muted">使用 {{ engine.name }} Translate</span>
      </span>
      <span class="rounded-full bg-white/45 px-2.5 py-1 text-xs font-medium text-muted dark:bg-white/8">
        ⌥ + Enter
      </span>
    </button>

    <div class="mb-1 flex items-center justify-between px-3 py-2 text-xs font-medium text-muted">
      <span>Search suggestions</span>
      <span v-if="loading">Loading...</span>
    </div>

    <button
      v-for="suggestion in suggestions"
      :key="suggestion"
      type="button"
      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-white/55 dark:hover:bg-white/10"
      @mousedown.prevent="emit('choose', suggestion)"
    >
      <span class="grid h-8 w-8 place-items-center rounded-xl bg-white/60 text-muted dark:bg-white/10">
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="11" cy="11" r="6" />
          <path d="m16 16 4 4" stroke-linecap="round" />
        </svg>
      </span>
      <span class="text-sm text-ink">
        <template v-for="part in parts(suggestion)" :key="part.value + String(part.matched)">
          <mark v-if="part.matched" class="rounded bg-accent/20 px-0.5 text-ink">{{ part.value }}</mark>
          <span v-else>{{ part.value }}</span>
        </template>
      </span>
    </button>

    <p v-if="suggestions.length === 0" class="px-3 py-4 text-sm text-muted">
      {{ loading ? '正在获取联想词...' : '暂无联想词，按 Enter 直接搜索。' }}
    </p>
  </div>
</template>
