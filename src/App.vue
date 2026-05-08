<script setup lang="ts">
import { useDarkMode } from './composables/useDarkMode'
import { useTime } from './composables/useTime'
import BookmarkPanel from './components/home/BookmarkPanel.vue'
import GreetingPanel from './components/home/GreetingPanel.vue'
import RecentList from './components/home/RecentList.vue'
import SearchBar from './components/home/SearchBar.vue'
import ShortcutGrid from './components/home/ShortcutGrid.vue'
import WallpaperLayer from './components/home/WallpaperLayer.vue'
import IconButton from './components/ui/IconButton.vue'

const { time, date, greeting } = useTime()
const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <WallpaperLayer />

  <main class="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
    <section class="relative">
      <!-- 先隐藏天气 -->
      <GreetingPanel :time="time" :date="date" :greeting="greeting" />

      <!-- <div class="pointer-events-auto mx-auto mt-6 max-w-[17rem] xl:absolute xl:right-0 xl:top-1/2 xl:mt-0 xl:-translate-y-1/2">
        <WeatherCard />
      </div> -->
    </section>

    <div class="mt-8 flex-1">
      <section class="min-w-0">
        <SearchBar class="mt-0" />
        <ShortcutGrid />
      </section>
    </div>

    <section class="mt-8 grid gap-5 lg:grid-cols-2">
      <BookmarkPanel />
      <RecentList />
    </section>
  </main>

  <div class="fixed bottom-5 right-5 z-40">
    <IconButton :label="isDark ? 'Switch to light mode' : 'Switch to dark mode'" :active="isDark" @click="toggleDark()">
      <Transition name="fade-up" mode="out-in">
        <svg
          v-if="isDark"
          key="moon"
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M21 15.2A8.5 8.5 0 0 1 8.8 3a7 7 0 1 0 12.2 12.2Z" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg
          v-else
          key="sun"
          viewBox="0 0 24 24"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
        >
          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" stroke-linecap="round" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      </Transition>
    </IconButton>
  </div>
</template>
