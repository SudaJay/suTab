import type { Bookmark, BookmarkGroup, RecentItem } from './types'

type ChromeBookmarkTreeNode = {
  id: string
  parentId?: string
  title: string
  url?: string
  dateAdded?: number
  children?: ChromeBookmarkTreeNode[]
}

type ChromeHistoryItem = {
  id: string
  url?: string
  title?: string
  lastVisitTime?: number
  visitCount?: number
}

type ChromeLike = {
  bookmarks?: {
    getTree(callback: (nodes: ChromeBookmarkTreeNode[]) => void): void
  }
  history?: {
    search(
      query: { text: string; startTime: number; maxResults: number },
      callback: (results: ChromeHistoryItem[]) => void,
    ): void
  }
  runtime?: {
    lastError?: { message?: string }
  }
}

declare global {
  interface Window {
    chrome?: ChromeLike
    browser?: ChromeLike
  }
}

function getBrowserApi() {
  return window.chrome ?? window.browser
}

export function canReadRealBookmarks() {
  return Boolean(getBrowserApi()?.bookmarks?.getTree)
}

export function canReadRealHistory() {
  return Boolean(getBrowserApi()?.history?.search)
}

function flattenBookmarkFolder(node: ChromeBookmarkTreeNode): Bookmark[] {
  const items: Bookmark[] = []

  for (const child of node.children ?? []) {
    if (child.url) {
      items.push({
        id: child.id,
        parentId: child.parentId,
        title: child.title || child.url,
        url: child.url,
        dateAdded: child.dateAdded,
      })
    } else {
      items.push(...flattenBookmarkFolder(child))
    }
  }

  return items
}

function findBookmarksBar(nodes: ChromeBookmarkTreeNode[]) {
  const rootChildren = nodes.flatMap((node) => node.children ?? [])
  return (
    rootChildren.find((node) => node.id === '1') ??
    rootChildren.find((node) => /bookmarks bar|书签栏|favorites bar/i.test(node.title)) ??
    rootChildren.find((node) => node.children?.length)
  )
}

function collectBookmarkGroups(nodes: ChromeBookmarkTreeNode[]) {
  const bookmarksBar = findBookmarksBar(nodes)
  if (!bookmarksBar) return []

  return (bookmarksBar.children ?? [])
    .filter((child) => !child.url)
    .map((folder) => ({
      id: folder.id,
      title: folder.title || 'Bookmarks',
      items: flattenBookmarkFolder(folder),
    }))
    .filter((group) => group.items.length > 0)
}

export function readBrowserBookmarks() {
  return new Promise<BookmarkGroup[]>((resolve, reject) => {
    const api = getBrowserApi()
    if (!api?.bookmarks?.getTree) {
      reject(new Error('Browser bookmarks API is unavailable'))
      return
    }

    api.bookmarks.getTree((nodes) => {
      const message = api.runtime?.lastError?.message
      if (message) {
        reject(new Error(message))
        return
      }

      resolve(collectBookmarkGroups(nodes))
    })
  })
}

function formatRelativeTime(timestamp?: number) {
  if (!timestamp) return 'Recently'

  const diff = Date.now() - timestamp
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return 'Just now'
  if (diff < hour) return `${Math.round(diff / minute)} min ago`
  if (diff < day) return `${Math.round(diff / hour)} hr ago`
  if (diff < 7 * day) return `${Math.round(diff / day)} days ago`
  return new Intl.DateTimeFormat('zh-CN', { month: 'short', day: 'numeric' }).format(new Date(timestamp))
}

const accents = ['bg-violet-300', 'bg-indigo-300', 'bg-sky-300', 'bg-emerald-300', 'bg-rose-300']

export function readBrowserHistory() {
  return new Promise<RecentItem[]>((resolve, reject) => {
    const api = getBrowserApi()
    if (!api?.history?.search) {
      reject(new Error('Browser history API is unavailable'))
      return
    }

    api.history.search(
      {
        text: '',
        startTime: Date.now() - 1000 * 60 * 60 * 24 * 30,
        maxResults: 8,
      },
      (results) => {
        const message = api.runtime?.lastError?.message
        if (message) {
          reject(new Error(message))
          return
        }

        resolve(
          results
            .filter((item) => item.url)
            .map((item, index) => ({
              id: item.id,
              title: item.title || item.url || 'Untitled',
              url: item.url ?? '',
              visitedAt: formatRelativeTime(item.lastVisitTime),
              lastVisitTime: item.lastVisitTime,
              visitCount: item.visitCount,
              accent: accents[index % accents.length],
            })),
        )
      },
    )
  })
}
