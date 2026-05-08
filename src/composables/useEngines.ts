import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { searchEngines } from '../data/engines'

export function useEngines() {
  const selectedEngineId = useStorage('arc-home-search-engine', searchEngines[0].id)

  const selectedEngine = computed(
    () => searchEngines.find((engine) => engine.id === selectedEngineId.value) ?? searchEngines[0],
  )

  function selectEngine(id: string) {
    selectedEngineId.value = id
  }

  return {
    engines: searchEngines,
    selectedEngine,
    selectedEngineId,
    selectEngine,
  }
}
