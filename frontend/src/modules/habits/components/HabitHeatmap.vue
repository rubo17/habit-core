<script setup lang="ts">
import { computed, watch } from 'vue'
import { useHabitLogs } from '../composables/useHabitLogs'

const props = defineProps<{
  color: string
  habitId: number
  todayLogged: boolean
}>()

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const DAY_LABELS = ['', 'L', '', 'X', '', 'V', '']

const { loggedDates, applyOptimisticToggle } = useHabitLogs(props.habitId)

watch(() => props.todayLogged, applyOptimisticToggle)

type Cell = {
  date: string | null
  level: number
  month: number
}

const weeks = computed<Cell[][]>(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const loggedSet = new Set(loggedDates.value)

  const start = new Date(today)
  start.setDate(start.getDate() - 364)
  start.setDate(start.getDate() - start.getDay())

  const result: Cell[][] = []
  const cursor = new Date(start)

  while (result.length < 53) {
    const week: Cell[] = []

    for (let d = 0; d < 7; d++) {
      const date = new Date(cursor)
      const isFuture = date > today

      const dateStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

      week.push({
        date: isFuture ? null : dateStr,
        level: isFuture ? 0 : loggedSet.has(dateStr) ? 4 : 0,
        month: date.getMonth(),
      })

      cursor.setDate(cursor.getDate() + 1)
    }

    result.push(week)
  }

  return result
})

const monthLabels = computed(() => {
  const labels: { label: string; col: number }[] = []
  let lastMonth = -1

  weeks.value.forEach((week, col) => {
    const first = week.find((d) => d.date)
    if (!first?.date) return

    const month = new Date(first.date).getMonth()

    if (month !== lastMonth) {
      labels.push({
        label: MONTHS[month]!,
        col,
      })
      lastMonth = month
    }
  })

  return labels
})

function cellColor(level: number): string {
  if (level === 0) return 'var(--color-surface-raised)'

  const opacities = [0, 0.25, 0.45, 0.7, 1]
  const hex = props.color

  return level === 4
    ? hex
    : `${hex}${Math.round(opacities[level]! * 255)
        .toString(16)
        .padStart(2, '0')}`
}
</script>

<template>
  <div class="w-full overflow-x-auto scrollbar-hidden">
    <div class="min-w-[700px] grid grid-cols-[auto_repeat(53,1fr)] gap-[3px]">

      <!-- Fila cabecera: meses -->
      <div class="h-4" />
      <div
        v-for="(week, wi) in weeks"
        :key="`m-${wi}`"
        class="h-4 relative"
      >
        <span
          v-if="monthLabels.find((m) => m.col === wi)"
          class="absolute text-[9px] text-muted-foreground whitespace-nowrap leading-none"
        >
          {{ monthLabels.find((m) => m.col === wi)?.label }}
        </span>
      </div>

      <!-- Filas de días -->
      <template v-for="(label, di) in DAY_LABELS" :key="`row-${di}`">
        <div class="flex items-center justify-end pr-1 text-[9px] text-muted-foreground leading-none">
          {{ label }}
        </div>
        <div
          v-for="(week, wi) in weeks"
          :key="`${wi}-${di}`"
          :title="week[di]?.date ?? ''"
          class="aspect-square rounded-[2px] transition-opacity duration-150 hover:opacity-80"
          :style="{ backgroundColor: cellColor(week[di]?.level ?? 0) }"
        />
      </template>

    </div>
  </div>
</template>