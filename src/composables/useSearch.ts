import { ref } from 'vue'
import type { SearchEngine } from '../data/types'

const fallbackSuffixes = ['怎么用', '是什么', '教程', '官网', '下载', '快捷键', '最佳实践']

function normalizeSuggestions(values: unknown[]) {
  return values
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0)
    .map((value) => value.trim())
    .filter((value, index, array) => array.indexOf(value) === index)
    .slice(0, 8)
}

async function fetchEngineSuggestions(engine: SearchEngine, term: string) {
  const query = encodeURIComponent(term)

  if (engine.id === 'google') {
    const response = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
    const data = (await response.json()) as [string, string[]]
    return normalizeSuggestions(data[1] ?? [])
  }

  if (engine.id === 'baidu') {
    const response = await fetch(`https://www.baidu.com/sugrec?ie=utf-8&prod=pc&wd=${query}`)
    const data = (await response.json()) as { g?: { q?: string }[] }
    return normalizeSuggestions(data.g?.map((item) => item.q) ?? [])
  }

  if (engine.id === 'bing') {
    const response = await fetch(`https://api.bing.com/osjson.aspx?query=${query}`)
    const data = (await response.json()) as [string, string[]]
    return normalizeSuggestions(data[1] ?? [])
  }

  const response = await fetch(`https://duckduckgo.com/ac/?q=${query}&type=list`)
  const data = (await response.json()) as { phrase?: string }[]
  return normalizeSuggestions(data.map((item) => item.phrase))
}

function createFallbackSuggestions(term: string) {
  return normalizeSuggestions([
    term,
    ...fallbackSuffixes.map((suffix) => `${term} ${suffix}`),
  ])
}

export function useSearch() {
  const query = ref('')
  const suggestions = ref<string[]>([])
  const suggestionsLoading = ref(false)

  function runSearch(engine: SearchEngine, term = query.value) {
    const value = term.trim()
    if (!value) return

    window.open(`${engine.url}${encodeURIComponent(value)}`, '_blank', 'noopener,noreferrer')
  }

  function runTranslate(engine: SearchEngine, term = query.value) {
    const value = term.trim()
    if (!value) return

    const url = engine.translateUrl.replace('{query}', encodeURIComponent(value))
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function loadSuggestions(engine: SearchEngine, term = query.value) {
    const value = term.trim()
    if (!value) {
      suggestions.value = []
      return
    }

    suggestionsLoading.value = true

    try {
      const remoteSuggestions = await fetchEngineSuggestions(engine, value)
      suggestions.value = remoteSuggestions.length > 0 ? remoteSuggestions : createFallbackSuggestions(value)
    } catch {
      suggestions.value = createFallbackSuggestions(value)
    } finally {
      suggestionsLoading.value = false
    }
  }

  return {
    query,
    suggestions,
    suggestionsLoading,
    loadSuggestions,
    runSearch,
    runTranslate,
  }
}
