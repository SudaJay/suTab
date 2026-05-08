import { useStorage } from '@vueuse/core'
import { defaultShortcuts } from '../data/defaultShortcuts'
import type { Shortcut } from '../data/types'

function normalizeUrl(url: string) {
  const trimmed = url.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function useShortcuts() {
  const shortcuts = useStorage<Shortcut[]>('arc-home-shortcuts', defaultShortcuts)

  function addShortcut(input: Pick<Shortcut, 'title' | 'url'>) {
    const url = normalizeUrl(input.url)
    const shortcut: Shortcut = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      url,
      description: new URL(url).hostname.replace(/^www\./, ''),
      color: 'from-violet-200 to-sky-200',
    }

    shortcuts.value = [...shortcuts.value, shortcut]
  }

  function removeShortcut(id: string) {
    shortcuts.value = shortcuts.value.filter((shortcut) => shortcut.id !== id)
  }

  function openShortcut(shortcut: Shortcut) {
    window.open(shortcut.url, '_blank', 'noopener,noreferrer')
  }

  return {
    shortcuts,
    addShortcut,
    removeShortcut,
    openShortcut,
  }
}
