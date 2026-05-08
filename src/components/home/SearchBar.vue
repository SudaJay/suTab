<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEngines } from '../../composables/useEngines'
import { useSearch } from '../../composables/useSearch'
import EnginePicker from './EnginePicker.vue'
import SuggestionList from './SuggestionList.vue'

const { engines, selectedEngine, selectEngine } = useEngines()
const { query, suggestions, suggestionsLoading, loadSuggestions, runSearch, runTranslate } = useSearch()

const focused = ref(false)
const showSuggestions = computed(() => focused.value && query.value.trim())
let suggestionTimer: number | undefined

function submit() {
  runSearch(selectedEngine.value)
}

function choose(value: string) {
  query.value = value
  runSearch(selectedEngine.value, value)
}

function translate() {
  runTranslate(selectedEngine.value)
}

watch(
  [query, selectedEngine],
  () => {
    window.clearTimeout(suggestionTimer)
    suggestionTimer = window.setTimeout(() => {
      void loadSuggestions(selectedEngine.value)
    }, 180)
  },
  { immediate: true },
)
</script>

<template>
  <form class="relative z-50 mx-auto mt-9 max-w-3xl" @submit.prevent="submit" @keydown.alt.enter.prevent="translate">
    <div
      class="glass flex min-h-16 items-center gap-2 rounded-[26px] px-3 py-2 transition-all duration-300 ease-apple"
      :class="focused ? 'scale-[1.01] soft-focus' : ''"
    >
      <EnginePicker :engines="engines" :selected="selectedEngine" @select="selectEngine" />
      <div class="h-8 w-px bg-[var(--border)]" />
      <input
        v-model="query"
        type="search"
        autocomplete="off"
        placeholder="Search softly, open boldly..."
        class="min-w-0 flex-1 bg-transparent px-2 text-base text-ink placeholder:text-muted/70 focus:outline-none sm:text-lg"
        @focus="focused = true"
        @blur="focused = false"
      />
      <button
        type="submit"
        class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent2 text-white shadow-lift transition duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-air active:translate-y-0"
        aria-label="Search"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <Transition name="fade-up">
      <SuggestionList
        v-if="showSuggestions"
        :suggestions="suggestions"
        :loading="suggestionsLoading"
        :query="query"
        :engine="selectedEngine"
        @choose="choose"
        @translate="translate"
      />
    </Transition>
  </form>
</template>
