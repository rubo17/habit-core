<script setup lang="ts">
import { onMounted } from 'vue'
import BaseSection from '@/shared/components/BaseSection.vue'
import StatsPeriodSelector from '../components/StatsPeriodSelector.vue'
import StatsResumenSection from '../components/StatsResumenSection.vue'
import StatsDailyTrendSection from '../components/StatsDailyTrendSection.vue'
import StatsHabitSection from '../components/StatsHabitSection.vue'
import StatsCategorySection from '../components/StatsCategorySection.vue'
import { useStats } from '../composables/useStats'

const { stats, loading, period, fetchStats, insight } = useStats()

const periods: { label: string; value: 7 | 30 | 90 }[] = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
]

onMounted(() => fetchStats(30))
</script>

<template>
  <BaseSection>
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold text-foreground">Estadísticas</h1>
      <StatsPeriodSelector :periods="periods" :period="period" @change="fetchStats" />
    </div>

    <div v-if="loading && !stats" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else-if="stats && stats.habits.length > 0">
      <StatsResumenSection :stats="stats" :insight="insight" :period="period" />
      <StatsDailyTrendSection :days="stats.daily_trend" />
      <StatsHabitSection :habits="stats.habits" />
      <StatsCategorySection v-if="stats.categories.length > 0" :categories="stats.categories" />
    </template>

    <div v-else-if="!loading" class="flex flex-col items-center gap-3 py-12 text-center">
      <p class="text-base font-medium text-foreground">Sin datos suficientes</p>
      <p class="text-sm text-muted-foreground">Completa algunos hábitos para ver tus estadísticas.</p>
    </div>
  </BaseSection>
</template>
