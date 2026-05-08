<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useShortcuts } from '../../composables/useShortcuts'
import AddShortcutModal from './AddShortcutModal.vue'
import ShortcutItem from './ShortcutItem.vue'

const { shortcuts, addShortcut, removeShortcut, openShortcut } = useShortcuts()
const modalOpen = ref(false)
</script>

<template>
  <section class="mx-auto mt-8 max-w-3xl">
    <div class="mb-4 flex items-center justify-between px-2">
      <div>
        <h2 class="text-sm font-semibold uppercase tracking-[0.24em] text-muted/80">Shortcuts</h2>
        <p class="mt-1 text-sm text-muted">Drag to reorder your daily launchpad.</p>
      </div>
      <button
        type="button"
        class="rounded-2xl border border-[var(--border)] bg-white/35 px-4 py-2 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-lift dark:bg-white/5 dark:hover:bg-white/10"
        @click="modalOpen = true"
      >
        Add
      </button>
    </div>

    <VueDraggable
      v-model="shortcuts"
      :animation="220"
      ghost-class="shortcut-ghost"
      class="grid grid-cols-4 gap-2 rounded-[28px] p-2 sm:grid-cols-6 md:grid-cols-8"
    >
      <ShortcutItem
        v-for="shortcut in shortcuts"
        :key="shortcut.id"
        :shortcut="shortcut"
        @open="openShortcut"
        @remove="removeShortcut"
      />

      <!-- <button
        type="button"
        class="flex min-h-[118px] flex-col items-center justify-center gap-3 rounded-[22px] border border-dashed border-[var(--border)] bg-white/20 text-muted transition duration-300 ease-apple hover:-translate-y-1 hover:bg-white/40 hover:text-ink hover:shadow-lift dark:bg-white/5 dark:hover:bg-white/10"
        @click="modalOpen = true"
      >
        <span class="grid h-16 w-16 place-items-center rounded-[20px] bg-white/45 dark:bg-white/8">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M12 5v14M5 12h14" stroke-linecap="round" />
          </svg>
        </span>
        <span class="text-sm font-semibold">Add</span>
      </button> -->
    </VueDraggable>

    <AddShortcutModal :open="modalOpen" @close="modalOpen = false" @add="addShortcut" />
  </section>
</template>
