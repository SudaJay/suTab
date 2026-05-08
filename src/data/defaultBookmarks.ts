import type { BookmarkGroup, RecentItem } from './types'

export const defaultBookmarks: BookmarkGroup[] = [
  {
    id: 'daily',
    title: 'Daily Flow',
    items: [
      { id: 'calendar', title: 'Calendar', url: 'https://calendar.google.com' },
      { id: 'mail', title: 'Gmail', url: 'https://mail.google.com' },
      { id: 'docs', title: 'Docs', url: 'https://docs.google.com' },
    ],
  },
  {
    id: 'design',
    title: 'Design Shelf',
    items: [
      { id: 'awwwards', title: 'Awwwards', url: 'https://www.awwwards.com' },
      { id: 'mobbin', title: 'Mobbin', url: 'https://mobbin.com' },
      { id: 'landbook', title: 'Land-book', url: 'https://land-book.com' },
    ],
  },
  {
    id: 'reading',
    title: 'Slow Reading',
    items: [
      { id: 'medium', title: 'Medium', url: 'https://medium.com' },
      { id: 'substack', title: 'Substack', url: 'https://substack.com' },
      { id: 'readwise', title: 'Readwise', url: 'https://readwise.io' },
    ],
  },
]

export const defaultRecent: RecentItem[] = [
  {
    id: 'arc-updates',
    title: 'Arc Browser Release Notes',
    url: 'https://arc.net/release-notes',
    visitedAt: '10 min ago',
    accent: 'bg-violet-300',
  },
  {
    id: 'linear-method',
    title: 'Linear Method',
    url: 'https://linear.app/method',
    visitedAt: '38 min ago',
    accent: 'bg-indigo-300',
  },
  {
    id: 'apple-hig',
    title: 'Apple Human Interface Guidelines',
    url: 'https://developer.apple.com/design/human-interface-guidelines',
    visitedAt: '1 hr ago',
    accent: 'bg-sky-300',
  },
  {
    id: 'vue',
    title: 'Vue Composition API',
    url: 'https://vuejs.org/guide/extras/composition-api-faq.html',
    visitedAt: 'Yesterday',
    accent: 'bg-emerald-300',
  },
]
