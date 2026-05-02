<script setup lang="ts">
import StatsDailyTrend from './StatsDailyTrend.vue'
import InfoTooltip from '@/shared/components/InfoTooltip.vue'
import type { DailyTrend } from '../types/stats.types'

defineProps<{ days: DailyTrend[] }>()
</script>

<template>
  <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-foreground">Tendencia diaria</p>
      <InfoTooltip text="Porcentaje de hábitos completados cada día. Verde ≥80%, amarillo ≥50%, rojo cualquier progreso, gris ninguno." />
    </div>

    <StatsDailyTrend :days="days" />

    <div class="flex items-center gap-4 pt-1">
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-sm bg-success" />
        <span class="text-[10px] text-muted-foreground">≥80%</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-sm bg-warning" />
        <span class="text-[10px] text-muted-foreground">≥50%</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-sm bg-danger" />
        <span class="text-[10px] text-muted-foreground">&gt;0%</span>
      </div>
      <div class="flex items-center gap-1.5">
        <div class="w-2 h-2 rounded-sm bg-border" />
        <span class="text-[10px] text-muted-foreground">0%</span>
      </div>
    </div>
  </div>
</template>
