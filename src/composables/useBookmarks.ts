import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { canReadRealBookmarks, readBrowserBookmarks } from '../data/browserData'
import { defaultBookmarks } from '../data/defaultBookmarks'
import type { BookmarkGroup } from '../data/types'

export function useBookmarks() {
  const bookmarkGroups = useStorage<BookmarkGroup[]>('arc-home-bookmarks', defaultBookmarks)
  const openedGroups = useStorage<string[]>('arc-home-opened-bookmark-groups', ['daily', 'design'])
  const loading = ref(false)
  const error = ref('')
  const source = ref<'browser' | 'demo'>(canReadRealBookmarks() ? 'browser' : 'demo')

  function toggleGroup(id: string) {
    openedGroups.value = openedGroups.value.includes(id)
      ? openedGroups.value.filter((groupId) => groupId !== id)
      : [...openedGroups.value, id]
  }

  async function refreshBookmarks() {
    if (!canReadRealBookmarks()) {
      source.value = 'demo'
      return
    }

    loading.value = true
    error.value = ''

    try {
      const groups = await readBrowserBookmarks()
      if (groups.length > 0) {
        bookmarkGroups.value = groups
        openedGroups.value = groups.slice(0, 2).map((group) => group.id)
      }
      source.value = 'browser'
    } catch (caught) {
      error.value = caught instanceof Error ? caught.message : 'Failed to read browser bookmarks'
      source.value = 'demo'
    } finally {
      loading.value = false
    }
  }

  onMounted(refreshBookmarks)

  return {
    bookmarkGroups,
    openedGroups,
    loading,
    error,
    source,
    toggleGroup,
    refreshBookmarks,
  }
}
