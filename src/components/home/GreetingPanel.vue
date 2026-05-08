<script setup lang="ts">
defineProps<{
  time: string
  date: string
  greeting: string
}>()
</script>

<template>
  <div class="mx-auto max-w-4xl overflow-visible px-3 text-center">
    <div
      class="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/35 px-4 py-2 text-xs font-semibold tracking-[0.26em] text-muted/85 shadow-sm backdrop-blur-xl dark:bg-white/6"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-accent2" />
      <span>{{ date }}</span>
    </div>

    <h1
      class="time-display mx-auto select-none overflow-visible whitespace-nowrap bg-[linear-gradient(135deg,#19191d_0%,#565969_52%,#7c83fd_100%)] bg-clip-text font-semibold text-transparent drop-shadow-[0_22px_40px_rgba(60,63,90,0.14)] dark:bg-[linear-gradient(135deg,#ffffff_0%,#cfd3ff_48%,#88d7ff_100%)]"
      aria-label="Current time"
    >
      {{ time }}
    </h1>

    <p class="mx-auto mt-5 max-w-xl text-balance text-lg leading-8 text-muted sm:text-xl">{{ greeting }}</p>
  </div>
</template>

<style scoped lang="scss">
.time-display {
  display: block;
  width: min(100%, 48rem);
  padding: 0 0.08em 0.12em;
  font-size: clamp(4.25rem, 13.5vw, 8rem);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.035em;
  line-height: 1.08;
  text-align: center;
}
</style>
