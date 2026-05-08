import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { canReadRealHistory, readBrowserHistory } from '../data/browserData'
import { defaultRecent } from '../data/defaultBookmarks'
import type { RecentItem } from '../data/types'

export function useRecent() {
  const recentItems = useStorage<RecentItem[]>('arc-home-recent', defaultRecent)
  const loading = ref(false)
  const error = ref('')
  const source = ref<'browser' | 'demo'>(canReadRealHistory() ? 'browser' : 'demo')

  function visit(item: RecentItem) {
    window.open(item.url, '_blank', 'noopener,noreferrer')
  }

  async function refreshRecent() {
    if (!canReadRealHistory()) {
      source.value = 'demo'
      return
    }

    loading.value = true
    error.value = ''

    try {
      const items = await readBrowserHistory()
      if (items.length > 0) recentItems.value = items
      source.value = 'browser'
    } catch (caught) {
      error.value = caught instanceof Error ? caught.message : 'Failed to read browser history'
      source.value = 'demo'
    } finally {
      loading.value = false
    }
  }

  onMounted(refreshRecent)

  return {
    recentItems,
    loading,
    error,
    source,
    visit,
    refreshRecent,
  }
}
