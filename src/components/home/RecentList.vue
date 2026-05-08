<script setup lang="ts">
import { useRecent } from '../../composables/useRecent'
import GlassCard from '../ui/GlassCard.vue'

const { recentItems, loading, error, source, visit, refreshRecent } = useRecent()

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}

function initial(title: string) {
  return title.trim().charAt(0).toUpperCase() || 'H'
}
</script>

<template>
  <GlassCard class="p-6 sm:p-7">
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold tracking-[-0.03em] text-ink">Recent</h2>
          <span
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            :class="source === 'browser' ? 'bg-emerald-400/12 text-emerald-600 dark:text-emerald-300' : 'bg-amber-400/12 text-amber-600 dark:text-amber-300'"
          >
            {{ source === 'browser' ? 'Live' : 'Demo' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-muted">
          {{ source === 'browser' ? 'Latest browser visits.' : 'Run as an extension to read real history.' }}
        </p>
      </div>

      <button
        type="button"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/45 text-muted transition hover:-translate-y-0.5 hover:bg-white/65 hover:text-ink dark:bg-white/8 dark:hover:bg-white/12"
        aria-label="Refresh recent history"
        @click="refreshRecent"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-4 w-4"
          :class="loading ? 'animate-[spin-soft_.7s_linear_infinite]' : ''"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M20 12a8 8 0 0 1-13.2 6.1M4 12A8 8 0 0 1 17.2 5.9" stroke-linecap="round" />
          <path d="M7 18H3v4M17 6h4V2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="grid gap-3">
      <button
        v-for="item in recentItems"
        :key="item.id"
        type="button"
        class="group relative flex w-full items-center gap-3 overflow-hidden rounded-[24px] border border-[var(--border)] bg-white/24 p-4 text-left transition duration-300 ease-apple hover:-translate-y-0.5 hover:bg-white/48 hover:shadow-lift dark:bg-white/5 dark:hover:bg-white/9"
        @click="visit(item)"
      >
        <span class="absolute inset-y-3 left-0 w-1 rounded-r-full" :class="item.accent" />
        <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/55 text-sm font-bold text-ink shadow-sm transition group-hover:scale-105 dark:bg-white/10">
          {{ initial(item.title) }}
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-semibold text-ink">{{ item.title }}</span>
          <span class="mt-0.5 flex items-center gap-2 text-xs text-muted">
            <span class="truncate">{{ hostname(item.url) }}</span>
            <span v-if="item.visitCount" class="shrink-0 rounded-full bg-white/45 px-2 py-0.5 dark:bg-white/8">
              {{ item.visitCount }} visits
            </span>
          </span>
        </span>
        <span class="shrink-0 rounded-full bg-white/35 px-2.5 py-1 text-xs font-medium text-muted dark:bg-white/8">
          {{ item.visitedAt }}
        </span>
      </button>
    </div>

    <p v-if="error" class="mt-4 rounded-2xl bg-amber-400/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
      {{ error }}
    </p>
  </GlassCard>
</template>
