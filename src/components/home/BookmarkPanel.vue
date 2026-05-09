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

function previewItems(items: { title: string; url: string }[]) {
  return items
    .slice(0, 4)
    .map((item) => item.title || hostname(item.url))
    .join(' / ')
}

</script>

<template>
  <GlassCard :padded="false" class="bg-white/[.54] p-5 shadow-[0_1px_2px_rgba(0,0,0,.035),0_8px_24px_rgba(0,0,0,.025)] sm:p-6">
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5">
          <h2 class="text-base font-semibold tracking-[-0.03em] text-ink">Workspace</h2>
          <span
            class="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium text-muted"
            :class="source === 'browser' ? 'bg-emerald-400/8' : 'bg-amber-400/10'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="source === 'browser' ? 'bg-emerald-400' : 'bg-amber-300'" />
            {{ source === 'browser' ? 'Live' : 'Demo' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-muted/75">
          {{ source === 'browser' ? 'Quick paths into your browser workspace.' : 'Preview workspace folders.' }}
        </p>
      </div>
      <button
        type="button"
        class="grid h-9 w-9 shrink-0 place-items-center rounded-2xl text-muted/70 transition-all duration-200 ease-apple hover:-translate-y-px hover:bg-white/45 hover:text-ink hover:shadow-lift dark:hover:bg-white/10"
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

    <div class="custom-scrollbar max-h-[34rem] space-y-1.5 overflow-y-auto pr-1">
      <section
        v-for="group in bookmarkGroups"
        :key="group.id"
        class="group rounded-[20px] transition-all duration-200 ease-apple hover:-translate-y-px hover:bg-white/42 hover:shadow-[0_8px_24px_rgba(0,0,0,.035)] dark:hover:bg-white/8"
      >
        <button
          type="button"
          class="flex min-h-16 w-full items-center justify-between gap-4 rounded-[20px] px-3 py-2.5 text-left"
          @click="toggleGroup(group.id)"
        >
          <span class="flex min-w-0 items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent2/12 text-accent/75">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6">
                <path d="M3.5 7.5a2 2 0 0 1 2-2h4.1l1.8 2H18.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-ink">{{ group.title }}</span>
              <span class="mt-0.5 block truncate text-xs text-muted/70">{{ previewItems(group.items) }}</span>
            </span>
          </span>
          <span class="flex shrink-0 items-center gap-2">
            <span class="rounded-full bg-white/28 px-2 py-0.5 text-[11px] font-medium text-muted/70 dark:bg-white/6">
              {{ group.items.length }} links
            </span>
            <svg
              viewBox="0 0 24 24"
              class="h-3.5 w-3.5 text-muted/45 opacity-0 transition-all duration-200 group-hover:opacity-100"
              :class="openedGroups.includes(group.id) ? 'rotate-180' : ''"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
            >
              <path d="m7 10 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>

        <Transition name="fade-up">
          <div v-if="openedGroups.includes(group.id)" class="flex max-w-full flex-wrap gap-2 overflow-hidden px-3 pb-3 pt-1">
            <button
              v-for="item in group.items"
              :key="item.id"
              type="button"
              class="inline-flex max-w-[min(100%,18rem)] items-center rounded-full bg-white/30 px-3 py-1.5 text-xs font-medium text-ink/75 transition-all duration-200 hover:-translate-y-px hover:bg-white/60 hover:text-ink hover:shadow-sm dark:bg-white/6 dark:hover:bg-white/10"
              @click="open(item.url)"
            >
              <span class="mr-1 shrink-0 text-accent/60">{{ initial(item.title) }}</span>
              <span class="min-w-0 truncate">{{ item.title || hostname(item.url) }}</span>
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
