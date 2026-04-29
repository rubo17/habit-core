import { onMounted, onUnmounted, ref } from 'vue'
import { habitService } from '../services/habit.service'
import { dbGet, dbPut, STORES } from '@/shared/utils/db'

type LogCache = { id: string; dates: string[] }

export function useHabitLogs(habitId: number) {
  const loggedDates = ref<string[]>([])

  function getYears(): number[] {
    const today = new Date()
    const startYear = new Date(today.getTime() - 364 * 86400000).getFullYear()
    return startYear < today.getFullYear() ? [startYear, today.getFullYear()] : [today.getFullYear()]
  }

  async function loadFromCache(): Promise<string[]> {
    const years = getYears()
    const cached = await Promise.all(
      years.map(y => dbGet<LogCache>(STORES.HABIT_LOGS, `${habitId}_${y}`))
    )
    return cached.flatMap(entry => entry?.dates ?? [])
  }

  async function refresh() {
    const years = getYears()
    try {
      const results = await Promise.all(years.map(y => habitService.getLogs(habitId, y)))
      const dates = results.flatMap(r => r.data)
      loggedDates.value = dates
      await Promise.all(
        years.map((y, i) => dbPut<LogCache>(STORES.HABIT_LOGS, { id: `${habitId}_${y}`, dates: results[i]!.data }))
      )
    } catch {
      loggedDates.value = await loadFromCache()
    }
  }

  async function applyOptimisticToggle(todayLogged: boolean) {
    const today = new Date().toISOString().split('T')[0]!
    const year = today.slice(0, 4)

    if (todayLogged) {
      if (!loggedDates.value.includes(today)) {
        loggedDates.value = [...loggedDates.value, today]
      }
    } else {
      loggedDates.value = loggedDates.value.filter(d => d !== today)
    }

    const yearDates = loggedDates.value.filter(d => d.startsWith(year))
    await dbPut<LogCache>(STORES.HABIT_LOGS, { id: `${habitId}_${year}`, dates: yearDates })

    if (navigator.onLine) refresh()
  }

  onMounted(refresh)
  window.addEventListener('online', refresh)
  onUnmounted(() => window.removeEventListener('online', refresh))

  return { loggedDates, refresh, applyOptimisticToggle }
}
