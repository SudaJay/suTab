export type SearchEngine = {
  id: string
  name: string
  shortcut: string
  url: string
  translateUrl: string
  color: string
  icon: string
}

export type Shortcut = {
  id: string
  title: string
  url: string
  description: string
  color: string
}

export type Bookmark = {
  id: string
  title: string
  url: string
  parentId?: string
  dateAdded?: number
}

export type BookmarkGroup = {
  id: string
  title: string
  items: Bookmark[]
}

export type RecentItem = {
  id: string
  title: string
  url: string
  visitedAt: string
  accent: string
  lastVisitTime?: number
  visitCount?: number
}
