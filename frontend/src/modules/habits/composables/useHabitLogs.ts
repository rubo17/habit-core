import { onMounted, ref } from 'vue'
import { habitService } from '../services/habit.service'

export function useHabitLogs(habitId: number) {
  const loggedDates = ref<string[]>([])

  async function refresh() {
    const today = new Date()
    const currentYear = today.getFullYear()
    const startYear = new Date(today.getTime() - 364 * 86400000).getFullYear()
    const years = startYear < currentYear ? [startYear, currentYear] : [currentYear]
    const results = await Promise.all(years.map(y => habitService.getLogs(habitId, y)))
    loggedDates.value = results.flatMap(r => r.data)
  }

  onMounted(refresh)

  return { loggedDates, refresh }
}
