import { computed, ref } from 'vue'
import { statsService } from '../services/stats.service'
import type { UserStats } from '../types/stats.types'

export function useStats() {
  const stats = ref<UserStats | null>(null)
  const loading = ref(false)
  const period = ref<7 | 30 | 90>(30)

  async function fetchStats(p: 7 | 30 | 90 = period.value) {
    period.value = p
    loading.value = true
    try {
      const res = await statsService.get(p)
      stats.value = res.data
    } finally {
      loading.value = false
    }
  }

  const insight = computed((): string => {
    if (!stats.value || stats.value.habits.length === 0) return ''

    const { habits, today_progress, consistency_rate, daily_trend } = stats.value

    const topStreak = habits.reduce(
      (max, h) => (h.current_streak > max.current_streak ? h : max),
      habits[0]!
    )
    if (topStreak.current_streak >= 7) {
      return `Llevas ${topStreak.current_streak} días seguidos con ${topStreak.name}. ¡No pares!`
    }

    if (today_progress.total > 0 && today_progress.completed === today_progress.total) {
      return '¡Día perfecto! Todos los hábitos completados.'
    }

    if (daily_trend.length >= 14) {
      const mid = Math.floor(daily_trend.length / 2)
      const firstAvg = daily_trend.slice(0, mid).reduce((s, d) => s + d.rate, 0) / mid
      const secondAvg = daily_trend.slice(mid).reduce((s, d) => s + d.rate, 0) / (daily_trend.length - mid)
      const diff = Math.round(secondAvg - firstAvg)
      if (diff >= 10) {
        return `Esta semana vas +${diff}% mejor que antes. ¡Sigue así!`
      }
    }

    const atRisk = habits.find(h => h.current_streak === 0 && h.eligible_days >= 3)
    if (atRisk) {
      return `${atRisk.name} lleva varios días sin completarse.`
    }

    if (consistency_rate < 50) {
      return `Solo un ${consistency_rate}% de días completados. Pequeños pasos cuentan.`
    }

    return `Tu consistencia promedio es ${consistency_rate}%. ¡Sigue adelante!`
  })

  return { stats, loading, period, fetchStats, insight }
}
