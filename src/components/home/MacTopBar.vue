<script setup lang="ts">
const tabs = [
  { id: 'home', title: 'Home', active: true },
  { id: 'linear', title: 'Linear' },
  { id: 'notes', title: 'Notes' },
]
</script>

<template>
  <header class="sticky top-0 z-40 px-3 pt-3 sm:px-5">
    <div
      class="glass mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-[20px] px-4"
      role="banner"
    >
      <div class="group flex items-center gap-2" aria-label="Window controls">
        <span class="mac-dot bg-[#ff5f57]">×</span>
        <span class="mac-dot bg-[#ffbd2e]">−</span>
        <span class="mac-dot bg-[#28c840]">+</span>
      </div>

      <nav class="custom-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="group relative flex min-w-0 shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-sm transition-all duration-300 ease-apple"
          :class="
            tab.active
              ? 'bg-white/70 text-ink shadow-lift dark:bg-white/12'
              : 'text-muted hover:bg-white/40 hover:text-ink dark:hover:bg-white/8'
          "
        >
          <span
            class="h-2 w-2 rounded-full"
            :class="tab.active ? 'bg-gradient-to-br from-accent to-accent2' : 'bg-muted/35'"
          />
          <span class="max-w-24 truncate">{{ tab.title }}</span>
        </button>
      </nav>

      <button
        type="button"
        class="hidden h-9 w-9 items-center justify-center rounded-2xl text-muted transition hover:bg-white/45 hover:text-ink dark:hover:bg-white/10 sm:flex"
        aria-label="New tab"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 5v14M5 12h14" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.mac-dot {
  display: inline-flex;
  width: 0.75rem;
  height: 0.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: rgba(0, 0, 0, 0.44);
  font-size: 0.55rem;
  font-weight: 700;
  line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}

.group:not(:hover) .mac-dot {
  color: transparent;
}
</style>
