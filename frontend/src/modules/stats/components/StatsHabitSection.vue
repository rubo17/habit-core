<script setup lang="ts">
import StatsHabitRanking from './StatsHabitRanking.vue'
import InfoTooltip from '@/shared/components/InfoTooltip.vue'
import type { HabitStat } from '../types/stats.types'

defineProps<{ habits: HabitStat[] }>()
</script>

<template>
  <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-foreground">Consistencia de Hábitos</p>
      <InfoTooltip text="Ranking por consistencia en el período. La barra muestra qué % de días aplicables completaste cada hábito." />
    </div>
    <StatsHabitRanking :habits="habits" />
  </div>
</template>
