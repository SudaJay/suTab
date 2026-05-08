<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
}>()
</script>

<template>
  <button
    type="button"
    :aria-label="label"
    :title="label"
    class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-white/50 hover:shadow-lift active:translate-y-0 dark:hover:bg-white/10"
    :class="active ? 'bg-white/65 text-accent shadow-lift dark:bg-white/10' : 'bg-white/30 text-ink/80 dark:bg-white/5'"
  >
    <slot />
  </button>
</template>
