<script setup lang="ts">
import { useRecent } from '../../composables/useRecent'
import GlassCard from '../ui/GlassCard.vue'
import Favicon from '../ui/Favicon.vue'

const { recentItems, loading, error, source, visit, refreshRecent } = useRecent()

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}

function initial(title: string) {
  return title.trim().charAt(0).toUpperCase() || 'H'
}

function flowLabel(url: string) {
  const domain = hostname(url).toLowerCase()
  if (domain.includes('github')) return 'Continue coding'
  if (domain.includes('figma') || domain.includes('dribbble') || domain.includes('mobbin')) return 'Continue designing'
  if (domain.includes('notion') || domain.includes('docs') || domain.includes('medium')) return 'Continue writing'
  if (domain.includes('linear') || domain.includes('vercel')) return 'Continue planning'
  if (domain.includes('youtube') || domain.includes('bilibili')) return 'Continue watching'
  return 'Continue browsing'
}
</script>

<template>
  <GlassCard :padded="false" class="bg-white/[.54] p-5 shadow-[0_1px_2px_rgba(0,0,0,.035),0_8px_24px_rgba(0,0,0,.025)] sm:p-6">
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5">
          <h2 class="text-base font-semibold tracking-[-0.03em] text-ink">Continue</h2>
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium text-muted"
            :class="source === 'browser' ? 'bg-emerald-400/8' : 'bg-amber-400/10'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="source === 'browser' ? 'bg-emerald-400' : 'bg-amber-300'" />
            {{ source === 'browser' ? 'Live' : 'Demo' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-muted/75">
          {{ source === 'browser' ? 'Pick up where you left off.' : 'Preview your recent workflow.' }}
        </p>
      </div>

      <button
        type="button"
        class="grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-muted/70 transition-all duration-200 ease-apple hover:-translate-y-px hover:bg-white/45 hover:text-ink hover:shadow-lift dark:hover:bg-white/10"
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

    <div class="space-y-1.5">
      <article
        v-for="item in recentItems"
        :key="item.id"
        role="button"
        tabindex="0"
        class="group flex min-h-16 w-full items-center gap-3 rounded-[20px] px-3 py-2.5 text-left transition-all duration-200 ease-apple hover:-translate-y-px hover:bg-white/42 hover:shadow-[0_8px_24px_rgba(0,0,0,.035)] dark:hover:bg-white/8"
        @click="visit(item)"
        @keydown.enter.prevent="visit(item)"
      >
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/38 p-1.5 shadow-sm transition group-hover:scale-[1.03] dark:bg-white/8">
          <Favicon :url="item.url" :title="item.title || initial(item.title)" color="from-white/80 to-accent2/20" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-semibold text-ink">{{ item.title || hostname(item.url) }}</span>
          <span class="mt-0.5 block truncate text-xs text-muted/70">
            {{ flowLabel(item.url) }} · {{ hostname(item.url) }}
          </span>
        </span>
        <span class="flex shrink-0 items-center gap-1.5">
          <span class="hidden rounded-full bg-white/24 px-2 py-0.5 text-[11px] font-medium text-muted/65 sm:inline-flex dark:bg-white/6">
            {{ item.visitedAt }}
          </span>
          <span
            class="flex translate-x-1 items-center gap-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            @click.stop
          >
            <button
              type="button"
              class="grid h-7 w-7 place-items-center rounded-xl text-muted/65 transition hover:bg-white/55 hover:text-ink dark:hover:bg-white/10"
              aria-label="Pin recent item"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.7">
                <path d="m14 4 6 6-3 1-4 4v4l-2 2-2-6-6-2 2-2h4l4-4 1-3Z" stroke-linejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              class="grid h-7 w-7 place-items-center rounded-xl text-muted/65 transition hover:bg-white/55 hover:text-ink dark:hover:bg-white/10"
              aria-label="Favorite recent item"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.7">
                <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8L12 4Z" stroke-linejoin="round" />
              </svg>
            </button>
          </span>
        </span>
      </article>
    </div>

    <p v-if="error" class="mt-4 rounded-2xl bg-amber-400/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
      {{ error }}
    </p>
  </GlassCard>
</template>
