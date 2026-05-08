import type { SearchEngine } from './types'

export const searchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    shortcut: 'G',
    url: 'https://www.google.com/search?q=',
    translateUrl: 'https://translate.google.com/?sl=auto&tl=en&text={query}&op=translate',
    color: 'from-blue-400 to-emerald-300',
    icon: 'G',
  },
  {
    id: 'bing',
    name: 'Bing',
    shortcut: 'B',
    url: 'https://www.bing.com/search?q=',
    translateUrl: 'https://www.bing.com/translator?text={query}&from=auto&to=en',
    color: 'from-cyan-400 to-blue-500',
    icon: 'B',
  },
  {
    id: 'baidu',
    name: 'Baidu',
    shortcut: '度',
    url: 'https://www.baidu.com/s?wd=',
    translateUrl: 'https://fanyi.baidu.com/mtpe-individual/transText?query={query}#/',
    color: 'from-blue-500 to-indigo-500',
    icon: '百',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    shortcut: 'D',
    url: 'https://duckduckgo.com/?q=',
    translateUrl: 'https://translate.google.com/?sl=auto&tl=en&text={query}&op=translate',
    color: 'from-orange-300 to-rose-400',
    icon: 'D',
  },
]
