<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { DailyTrend } from '../types/stats.types'

const props = defineProps<{
  days: DailyTrend[]
}>()

// Estado para el día seleccionado
const selectedDay = ref<DailyTrend | null>(null)
const todayStr = new Date().toISOString().split('T00:00:00')[0]

// Inicializar con el último día disponible
watch(() => props.days, (newDays) => {
  if (newDays.length > 0 && !selectedDay.value) {
    selectedDay.value = newDays[newDays.length - 1] ?? null
  }
}, { immediate: true })

const isHeatmap = computed(() => props.days.length > 31)

function cellColor(rate: number): string {
  if (rate >= 80) return 'bg-success'
  if (rate >= 50) return 'bg-warning'
  if (rate > 0) return 'bg-danger'
  return 'bg-border'
}

function getStatusLabel(rate: number): string {
  if (rate >= 80) return 'Completado'
  if (rate >= 50) return 'Medio'
  if (rate > 0) return 'Bajo'
  return 'Sin actividad'
}

function formatFullDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  })
}

// Lógica para Heatmap (90 días)
const weeks = computed(() => {
  if (!props.days.length) return []
  const firstDate = new Date(props.days[0]!.date + 'T00:00:00')
  const firstDow = (firstDate.getDay() + 6) % 7
  const padded: (DailyTrend | null)[] = [...Array(firstDow).fill(null), ...props.days]
  const remainder = padded.length % 7
  if (remainder !== 0) padded.push(...Array(7 - remainder).fill(null))

  const result = []
  for (let i = 0; i < padded.length; i += 7) {
    result.push(padded.slice(i, i + 7))
  }
  return result
})

const DAY_LABELS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
</script>

<template>
  <div class="w-full bg-surface rounded-2xl border border-border flex flex-col overflow-hidden shadow-sm">
    
    <!-- INFO CARD: Se actualiza al tocar cualquier barra o celda -->
    <div class="p-4 border-b border-border bg-surface-raised/20">
      <div v-if="selectedDay" class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {{ selectedDay.date === todayStr ? 'Hoy' : 'Progreso' }}
          </span>
          <span class="text-sm font-semibold text-foreground capitalize">
            {{ formatFullDate(selectedDay.date) }}
          </span>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex flex-col items-end">
            <span class="text-lg font-black text-foreground leading-none">{{ selectedDay.rate }}%</span>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 uppercase" 
                  :class="[cellColor(selectedDay.rate), 'bg-opacity-20 text-foreground']">
              {{ getStatusLabel(selectedDay.rate) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4">
      <!-- MODO BARRAS (≤31 días) -->
      <div v-if="!isHeatmap" class="space-y-4">
        <div class="flex items-end gap-1 h-28">
          <button
            v-for="day in days"
            :key="day.date"
            @click="selectedDay = day"
            class="flex-1 rounded-t-sm transition-all duration-200 relative group"
            :class="[
              cellColor(day.rate),
              selectedDay?.date === day.date ? 'ring-2 ring-ring ring-offset-2 ring-offset-surface scale-x-110 z-10' : 'opacity-90 hover:opacity-100'
            ]"
            :style="{ height: `${Math.max(day.rate, 10)}%` }"
          >
            <!-- Indicador sutil de "hoy" en barras -->
            <div v-if="day.date === todayStr" class="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent">
              •
            </div>
          </button>
        </div>
        <div class="flex justify-between text-[10px] font-bold text-muted-foreground uppercase px-1">
          <span>{{ days[0]?.date.split('-').reverse().slice(0,2).join('/') }}</span>
          <span>{{ days[days.length-1]?.date.split('-').reverse().slice(0,2).join('/') }}</span>
        </div>
      </div>

<!-- MODO HEATMAP (>31 días) -->
<div v-else class="w-full flex flex-col gap-2">
  <div class="w-full overflow-x-auto no-scrollbar py-2">
    <div class="flex w-full gap-2 min-w-[700px]">

      <!-- Etiquetas días -->
      <div class="flex flex-col justify-between py-1 shrink-0">
        <span
          v-for="label in DAY_LABELS"
          :key="label"
          class="text-[10px] font-bold text-muted-foreground/30 min-h-[28px] flex items-center"
        >
          {{ label }}
        </span>
      </div>

      <!-- Grid -->
      <div class="flex flex-1 gap-1.5">
        <div
          v-for="(week, wi) in weeks"
          :key="wi"
          class="flex flex-col flex-1 min-w-[28px] gap-1.5"
        >
          <button
            v-for="(day, di) in week"
            :key="di"
            @click="day && (selectedDay = day)"
            :disabled="!day"
            class="relative w-full aspect-square rounded-md transition-all duration-150"
            :class="[
              day ? cellColor(day.rate) : 'bg-transparent',
              selectedDay?.date === day?.date
                ? 'ring-2 ring-ring ring-offset-1 ring-offset-surface z-10 scale-110 shadow-lg'
                : '',
              day?.date === todayStr
                ? 'border-2 border-foreground/30'
                : ''
            ]"
          >
            <!-- punto hoy -->
            <span
              v-if="day?.date === todayStr && selectedDay?.date !== day!.date"
              class="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border border-surface"
            />

            <!-- número día -->
            <span
              v-if="day && (day.date.endsWith('01') || selectedDay?.date === day.date)"
              class="text-[8px] font-black"
              :class="day.rate > 50 ? 'text-white' : 'text-foreground/60'"
            >
              {{ day.date.split('-')[2] }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>

    <!-- Guía de uso en móvil -->
    <div class="px-4 py-2 bg-surface-raised/5 border-t border-border/50">
      <p class="text-[9px] text-muted-foreground text-center font-medium uppercase tracking-tighter">
        Toca una {{ isHeatmap ? 'celda' : 'barra' }} para ver detalles
      </p>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

button {
  -webkit-tap-highlight-color: transparent;
}
</style>