<script setup lang="ts">
import { computed } from 'vue'
import StatsSummary from './StatsSummary.vue'
import StatsInsight from './StatsInsight.vue'
import type { UserStats } from '../types/stats.types'

const props = defineProps<{
  stats: UserStats
  insight: string | null
  period: number
}>()

const topStreak = computed(() => {
  if (props.stats.habits.length === 0) return { current_streak: 0, name: '' }
  return props.stats.habits.reduce(
    (max, h) => (h.current_streak > max.current_streak ? h : max),
    props.stats.habits[0]!
  )
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resumen</p>
    <StatsSummary
      :completed="stats.today_progress.completed"
      :total="stats.today_progress.total"
      :top-streak="topStreak.current_streak"
      :top-streak-name="topStreak.name"
      :consistency-rate="stats.consistency_rate"
      :period="period"
    />
    <StatsInsight v-if="insight" :message="insight" />
  </div>
</template>
