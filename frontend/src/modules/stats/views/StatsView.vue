<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BaseSection from '@/shared/components/BaseSection.vue'
import InfoTooltip from '@/shared/components/InfoTooltip.vue'
import StatsSummary from '../components/StatsSummary.vue'
import StatsDailyTrend from '../components/StatsDailyTrend.vue'
import StatsHabitRanking from '../components/StatsHabitRanking.vue'
import StatsInsight from '../components/StatsInsight.vue'
import { useStats } from '../composables/useStats'

const { stats, loading, period, fetchStats, insight } = useStats()

onMounted(() => fetchStats(30))

const topStreak = computed(() => {
  if (!stats.value || stats.value.habits.length === 0) return { current_streak: 0, name: '' }
  return stats.value.habits.reduce(
    (max, h) => (h.current_streak > max.current_streak ? h : max),
    stats.value.habits[0]!
  )
})

const periods: { label: string; value: 7 | 30 | 90 }[] = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
]
</script>

<template>
  <BaseSection>
    <div class="flex items-center justify-between">
      <h1 class="text-lg font-semibold text-foreground">Estadísticas</h1>
      <div class="flex gap-1 bg-surface-raised rounded-xl p-1">
        <button
          v-for="p in periods"
          :key="p.value"
          type="button"
          @click="fetchStats(p.value)"
          :class="[
            'px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-150',
            period === p.value
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <div v-if="loading && !stats" class="flex justify-center py-12">
      <div class="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>

    <template v-else-if="stats && stats.habits.length > 0">

      <!-- Resumen -->
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resumen</p>
        </div>
        <StatsSummary
          :completed="stats.today_progress.completed"
          :total="stats.today_progress.total"
          :top-streak="topStreak.current_streak"
          :top-streak-name="topStreak.name"
          :consistency-rate="stats.consistency_rate"
          :period="period"
        />
      </div>

      <StatsInsight v-if="insight" :message="insight" />

      <!-- Tendencia diaria -->
      <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-foreground">Tendencia diaria</p>
          <InfoTooltip text="Porcentaje de hábitos completados cada día. Verde ≥80%, amarillo ≥50%, rojo cualquier progreso, gris ninguno." />
        </div>
        <StatsDailyTrend :days="stats.daily_trend" />
        <div class="flex items-center gap-4 pt-1">
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-sm bg-emerald-500" />
            <span class="text-[10px] text-muted-foreground">≥80%</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-sm bg-yellow-400" />
            <span class="text-[10px] text-muted-foreground">≥50%</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-sm bg-red-400" />
            <span class="text-[10px] text-muted-foreground">&gt;0%</span>
          </div>
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 rounded-sm bg-border" />
            <span class="text-[10px] text-muted-foreground">0%</span>
          </div>
        </div>
      </div>

      <!-- Hábitos -->
      <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-foreground">Hábitos</p>
          <InfoTooltip text="Ranking por consistencia en el período. La barra muestra qué % de días aplicables completaste cada hábito." />
        </div>
        <StatsHabitRanking :habits="stats.habits" />
      </div>

      <!-- Por categoría -->
      <div v-if="stats.categories.length > 0" class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-foreground">Por categoría</p>
          <InfoTooltip text="Cumplimiento medio agrupado por categoría. Te ayuda a ver en qué áreas de tu vida eres más constante." />
        </div>
        <div class="flex flex-col gap-3">
          <div
            v-for="cat in stats.categories"
            :key="cat.id"
            class="flex items-center gap-3"
          >
            <span class="text-sm text-foreground w-28 truncate flex-shrink-0">{{ cat.name }}</span>
            <div class="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                class="h-full bg-accent rounded-full transition-all duration-500"
                :style="{ width: `${cat.rate}%` }"
              />
            </div>
            <span class="text-sm font-semibold text-foreground w-10 text-right flex-shrink-0">{{ cat.rate }}%</span>
          </div>
        </div>
      </div>

    </template>

    <div v-else-if="!loading" class="flex flex-col items-center gap-3 py-12 text-center">
      <p class="text-base font-medium text-foreground">Sin datos suficientes</p>
      <p class="text-sm text-muted-foreground">Completa algunos hábitos para ver tus estadísticas.</p>
    </div>
  </BaseSection>
</template>
