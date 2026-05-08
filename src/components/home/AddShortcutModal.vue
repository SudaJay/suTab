<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  add: [payload: { title: string; url: string }]
}>()

const form = reactive({
  title: '',
  url: '',
})

const normalizedUrl = computed(() => {
  const value = form.url.trim()
  if (!value) return ''
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
})

const isValid = computed(() => {
  if (!form.title.trim() || !normalizedUrl.value) return false
  try {
    new URL(normalizedUrl.value)
    return true
  } catch {
    return false
  }
})

function submit() {
  if (!isValid.value) return
  emit('add', { title: form.title, url: normalizedUrl.value })
  emit('close')
}

watch(
  () => props.open,
  (open) => {
    if (!open) {
      form.title = ''
      form.url = ''
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-up">
      <div
        v-if="open"
        class="fixed inset-0 z-50 grid place-items-center bg-black/10 p-5 backdrop-blur-sm dark:bg-black/35"
        @click.self="emit('close')"
      >
        <Transition name="modal" appear>
          <form class="glass w-full max-w-md rounded-[28px] p-6" @submit.prevent="submit">
            <div class="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 class="text-xl font-semibold tracking-[-0.02em] text-ink">Add shortcut</h2>
                <p class="mt-1 text-sm text-muted">Keep your most-used places one click away.</p>
              </div>
              <button
                type="button"
                class="grid h-9 w-9 place-items-center rounded-2xl text-muted transition hover:bg-white/50 hover:text-ink dark:hover:bg-white/10"
                aria-label="Close"
                @click="emit('close')"
              >
                <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="m7 7 10 10M17 7 7 17" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <label class="mb-4 block">
              <span class="mb-2 block text-sm font-medium text-muted">Name</span>
              <input
                v-model="form.title"
                class="w-full rounded-2xl border border-[var(--border)] bg-white/45 px-4 py-3 text-ink outline-none transition focus:soft-focus dark:bg-white/5"
                placeholder="Raycast"
                autofocus
              />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-muted">URL</span>
              <input
                v-model="form.url"
                class="w-full rounded-2xl border border-[var(--border)] bg-white/45 px-4 py-3 text-ink outline-none transition focus:soft-focus dark:bg-white/5"
                placeholder="raycast.com"
              />
            </label>

            <div class="mt-7 flex justify-end gap-3">
              <button
                type="button"
                class="rounded-2xl px-4 py-2.5 text-sm font-medium text-muted transition hover:bg-white/45 hover:text-ink dark:hover:bg-white/10"
                @click="emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-2xl bg-gradient-to-br from-accent to-accent2 px-5 py-2.5 text-sm font-semibold text-white shadow-lift transition disabled:cursor-not-allowed disabled:opacity-45"
                :disabled="!isValid"
              >
                Add
              </button>
            </div>
          </form>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
