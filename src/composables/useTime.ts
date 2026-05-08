import { computed, onBeforeUnmount, ref } from 'vue'

export function useTime() {
  const now = ref(new Date())
  const timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  const time = computed(() =>
    new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now.value),
  )

  const date = computed(() =>
    new Intl.DateTimeFormat('zh-CN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(now.value),
  )

  const greeting = computed(() => {
    const hour = now.value.getHours()
    if (hour < 6) return '夜深了，保持轻盈'
    if (hour < 12) return '早上好，开始一段清爽浏览'
    if (hour < 18) return '下午好，继续专注前进'
    return '晚上好，把节奏慢下来'
  })

  onBeforeUnmount(() => {
    window.clearInterval(timer)
  })

  return {
    now,
    time,
    date,
    greeting,
  }
}
