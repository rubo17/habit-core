<script setup lang="ts">
import { computed } from 'vue'
import type { DailyTrend } from '../types/stats.types'

const props = defineProps<{
  days: DailyTrend[]
}>()

const isHeatmap = computed(() => props.days.length > 31)

function cellColor(rate: number): string {
  if (rate >= 80) return 'bg-emerald-500'
  if (rate >= 50) return 'bg-yellow-400'
  if (rate > 0) return 'bg-red-400'
  return 'bg-border'
}

function shortDate(date: string): string {
  const d = new Date(date + 'T00:00:00')
  return `${d.getDate()}/${d.getMonth() + 1}`
}

const weeks = computed(() => {
  const firstDate = new Date(props.days[0]!.date + 'T00:00:00')
  const firstDow = (firstDate.getDay() + 6) % 7 // Mon=0 … Sun=6

  const padded: (DailyTrend | null)[] = [
    ...Array(firstDow).fill(null),
    ...props.days,
  ]

  const remainder = padded.length % 7
  if (remainder !== 0) padded.push(...Array(7 - remainder).fill(null))

  const result: (DailyTrend | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) {
    result.push(padded.slice(i, i + 7))
  }
  return result
})

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
</script>

<template>
  <!-- Bar chart for ≤31 days -->
  <div v-if="!isHeatmap" class="flex flex-col gap-2">
    <div class="flex items-end gap-0.5 h-20">
      <div
        v-for="day in days"
        :key="day.date"
        class="flex-1 rounded-t transition-all duration-300"
        :class="cellColor(day.rate)"
        :style="{ height: `${Math.max(day.rate, day.rate > 0 ? 8 : 4)}%` }"
        :title="`${shortDate(day.date)}: ${day.rate}%`"
      />
    </div>
    <div class="flex gap-0.5">
      <div
        v-for="(day, i) in days"
        :key="day.date"
        class="flex-1 text-center"
      >
        <span
          v-if="i === 0 || i === Math.floor(days.length / 2) || i === days.length - 1"
          class="text-[9px] text-muted-foreground"
        >
          {{ shortDate(day.date) }}
        </span>
      </div>
    </div>
  </div>

  <!-- Heatmap for 90 days -->
  <div v-else class="flex gap-2">
    <div class="flex flex-col justify-around shrink-0" style="height: 84px">
      <span
        v-for="label in DAY_LABELS"
        :key="label"
        class="text-[9px] text-muted-foreground leading-none"
      >
        {{ label }}
      </span>
    </div>

    <div class="flex gap-0.5 flex-1 min-w-0" style="height: 84px">
      <div
        v-for="(week, wi) in weeks"
        :key="wi"
        class="flex flex-col gap-0.5 flex-1 min-w-0"
      >
        <div
          v-for="(day, di) in week"
          :key="di"
          class="flex-1 rounded-sm"
          :class="day !== null ? cellColor(day.rate) : 'opacity-0'"
          :title="day ? `${shortDate(day.date)}: ${day.rate}%` : ''"
        />
      </div>
    </div>
  </div>
</template>
