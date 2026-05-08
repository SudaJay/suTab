<script setup lang="ts">
import { useBookmarks } from '../../composables/useBookmarks'
import GlassCard from '../ui/GlassCard.vue'

const { bookmarkGroups, openedGroups, loading, error, source, toggleGroup, refreshBookmarks } = useBookmarks()

function open(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, '')
}

function initial(title: string) {
  return title.trim().charAt(0).toUpperCase() || 'B'
}
</script>

<template>
  <GlassCard class="p-6 sm:p-7">
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-semibold tracking-[-0.03em] text-ink">Bookmarks</h2>
          <span
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            :class="source === 'browser' ? 'bg-emerald-400/12 text-emerald-600 dark:text-emerald-300' : 'bg-amber-400/12 text-amber-600 dark:text-amber-300'"
          >
            {{ source === 'browser' ? 'Live' : 'Demo' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-muted">
          {{ source === 'browser' ? 'Synced from browser bookmarks.' : 'Run as an extension to read real bookmarks.' }}
        </p>
      </div>
      <button
        type="button"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/45 text-muted transition hover:-translate-y-0.5 hover:bg-white/65 hover:text-ink dark:bg-white/8 dark:hover:bg-white/12"
        aria-label="Refresh bookmarks"
        @click="refreshBookmarks"
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

    <div class="space-y-4">
      <section
        v-for="group in bookmarkGroups"
        :key="group.id"
        class="rounded-[24px] border border-[var(--border)] bg-white/24 p-3 transition hover:bg-white/34 dark:bg-white/5 dark:hover:bg-white/8 sm:p-4"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-2xl px-2 py-2 text-left sm:px-3"
          @click="toggleGroup(group.id)"
        >
          <span class="flex items-center gap-3">
            <span class="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent2/20 text-sm font-bold text-accent">
              {{ group.items.length }}
            </span>
            <span>
              <span class="block font-semibold text-ink">{{ group.title }}</span>
              <span class="text-xs text-muted">{{ group.items.length }} saved links</span>
            </span>
          </span>
          <span class="grid h-8 w-8 place-items-center rounded-xl bg-white/35 dark:bg-white/8">
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4 text-muted transition-transform duration-300"
              :class="openedGroups.includes(group.id) ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path d="m7 10 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <Transition name="fade-up">
          <div v-if="openedGroups.includes(group.id)" class="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              v-for="item in group.items"
              :key="item.id"
              type="button"
              class="group flex min-w-0 items-center gap-3 rounded-2xl bg-white/28 px-3 py-3 text-left transition duration-300 ease-apple hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-lift dark:bg-white/6 dark:hover:bg-white/10"
              @click="open(item.url)"
            >
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white/80 to-accent2/20 text-sm font-bold text-accent shadow-sm dark:from-white/10 dark:to-accent/15">
                {{ initial(item.title) }}
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-sm font-semibold text-ink">{{ item.title }}</span>
                <span class="block truncate text-xs text-muted">{{ hostname(item.url) }}</span>
              </span>
            </button>
          </div>
        </Transition>
      </section>
    </div>

    <p v-if="error" class="mt-4 rounded-2xl bg-amber-400/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-300">
      {{ error }}
    </p>
  </GlassCard>
</template>
