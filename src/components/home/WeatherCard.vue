<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useWeather } from '../../composables/useWeather'

const { weather, loading, error, cityConfig, refresh, setCity } = useWeather()
const cityPanelOpen = ref(false)
const cityForm = reactive({
  name: cityConfig.value.name,
})

const weatherTone = computed(() => {
  const text = weather.value.condition.toLowerCase()
  if (text.includes('rain') || text.includes('雨')) return 'from-sky-300/70 to-indigo-300/50'
  if (text.includes('sun') || text.includes('晴')) return 'from-amber-200/80 to-orange-200/60'
  if (text.includes('snow') || text.includes('雪')) return 'from-cyan-100/80 to-slate-200/70'
  return 'from-violet-200/75 to-sky-200/60'
})

watch(
  cityConfig,
  (city) => {
    cityForm.name = city.name
  },
  { deep: true },
)

function submitCity() {
  setCity({
    name: cityForm.name,
  })
  cityPanelOpen.value = false
}
</script>

<template>
  <section
    class="glass relative isolate w-full overflow-hidden rounded-[28px] p-5 transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-air"
  >
    <div class="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl" :class="weatherTone" />
    <div class="absolute -bottom-14 left-8 h-28 w-28 rounded-full bg-accent2/20 blur-3xl" />

    <div class="relative flex items-start justify-between gap-4">
      <div class="min-w-0">
        <button
          type="button"
          class="flex max-w-full items-center gap-2 rounded-xl pr-2 text-left transition hover:bg-white/30 dark:hover:bg-white/8"
          aria-label="Change weather city"
          @click="cityPanelOpen = !cityPanelOpen"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-400" />
          <p class="truncate text-sm font-semibold text-ink">{{ weather.city }}</p>
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 shrink-0 text-muted" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="m7 10 5 5 5-5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <p class="mt-1 text-xs text-muted">
          {{ weather.source === 'open-meteo' ? 'Open-Meteo' : 'Demo Weather' }} · {{ weather.updatedAt }}
        </p>
      </div>

      <button
        type="button"
        class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/50 text-accent transition hover:-translate-y-0.5 hover:bg-white/70 dark:bg-white/10 dark:hover:bg-white/15"
        aria-label="Refresh weather"
        @click="refresh"
      >
        <svg
          viewBox="0 0 24 24"
          class="h-5 w-5"
          :class="loading ? 'animate-[spin-soft_.7s_linear_infinite]' : ''"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
        >
          <path d="M20 12a8 8 0 0 1-13.2 6.1" stroke-linecap="round" />
          <path d="M4 12A8 8 0 0 1 17.2 5.9" stroke-linecap="round" />
          <path d="M7 18H3v4M17 6h4V2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <Transition name="fade-up">
      <form
        v-if="cityPanelOpen"
        class="glass absolute left-4 right-4 top-16 z-20 rounded-[22px] p-4 shadow-air"
        @submit.prevent="submitCity"
      >
        <div class="mb-3 flex items-start justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-ink">切换城市</p>
            <p class="mt-0.5 text-xs text-muted">
              输入城市名称，使用 Open-Meteo 免费天气数据。
            </p>
          </div>
          <button
            type="button"
            class="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-muted transition hover:bg-white/45 hover:text-ink dark:hover:bg-white/10"
            aria-label="Close city picker"
            @click="cityPanelOpen = false"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="m7 7 10 10M17 7 7 17" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <label class="block">
          <span class="mb-1.5 block text-xs font-medium text-muted">城市名称</span>
          <input
            v-model="cityForm.name"
            class="w-full rounded-2xl border border-[var(--border)] bg-white/45 px-3 py-2.5 text-sm text-ink outline-none transition focus:soft-focus dark:bg-white/6"
            placeholder="Hangzhou"
          />
        </label>

        <div class="mt-4 flex justify-end gap-2">
          <button
            type="button"
            class="rounded-2xl px-3 py-2 text-xs font-semibold text-muted transition hover:bg-white/45 hover:text-ink dark:hover:bg-white/10"
            @click="cityPanelOpen = false"
          >
            取消
          </button>
          <button
            type="submit"
            class="rounded-2xl bg-gradient-to-br from-accent to-accent2 px-4 py-2 text-xs font-semibold text-white shadow-lift transition hover:-translate-y-0.5"
          >
            保存
          </button>
        </div>
      </form>
    </Transition>

    <div class="relative mt-5 flex items-end justify-between">
      <div class="flex items-start">
        <span class="text-6xl font-semibold leading-none tracking-[-0.08em] text-ink">{{ Math.round(weather.temp) }}</span>
        <span class="ml-1 mt-2 text-lg font-medium text-muted">°C</span>
      </div>

      <div class="grid h-16 w-16 place-items-center rounded-[22px] bg-white/45 text-accent shadow-inner dark:bg-white/10">
        <svg viewBox="0 0 48 48" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 33h18a8 8 0 0 0 .4-16A13 13 0 0 0 10 20.5 6.5 6.5 0 0 0 17 33Z" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M18 39h18" stroke-linecap="round" opacity=".45" />
        </svg>
      </div>
    </div>

    <div class="relative mt-4 rounded-2xl bg-white/32 p-3 dark:bg-white/8">
      <p class="text-sm font-medium text-ink">{{ weather.condition }}</p>
      <div class="mt-2 grid grid-cols-2 gap-2 text-xs text-muted">
        <span>Humidity {{ weather.humidity ?? '--' }}%</span>
        <span>Feels {{ weather.feelsLike ?? Math.round(weather.temp) }}°</span>
      </div>
      <p v-if="error" class="mt-2 text-xs text-amber-600 dark:text-amber-300">
        使用演示天气。请检查城市名称或网络连接。
      </p>
    </div>
  </section>
</template>
