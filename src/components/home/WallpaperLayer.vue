<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]">
    <div
      class="absolute -left-24 top-4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(227,198,255,.58),transparent_66%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(124,131,253,.24),transparent_66%)]"
      style="animation: drift 34s var(--ease-apple) infinite"
    />
    <div
      class="absolute right-[-9rem] top-24 h-[31rem] w-[31rem] rounded-full bg-[radial-gradient(circle,rgba(154,208,255,.52),transparent_66%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(136,215,255,.2),transparent_66%)]"
      style="animation: drift 42s var(--ease-apple) infinite reverse"
    />
    <div
      class="absolute bottom-[-10rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,247,224,.78),transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(200,163,255,.16),transparent_68%)]"
      style="animation: drift 48s var(--ease-apple) infinite"
    />
    <div class="noise absolute inset-0 opacity-[0.035] dark:opacity-[0.05]" />
    <div
      class="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.38),rgba(255,255,255,0)_36%,rgba(255,255,255,.26))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,0)_40%,rgba(255,255,255,.02))]"
    />
  </div>
</template>
