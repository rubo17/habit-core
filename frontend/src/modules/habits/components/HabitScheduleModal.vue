<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import { HABIT_DAYS, HABIT_DAY_NAMES, ALL_DAYS, WEEKDAYS, WEEKEND_DAYS } from '@/constants/habitDays'
import BaseButton from '@/shared/components/BaseButton.vue';

const props = defineProps<{
  open: boolean
  targetDays: number[] | null
  reminderTimes: Record<string, string> | null
}>()

const emit = defineEmits<{
  close: []
  save: [{ targetDays: number[] | null; reminderTimes: Record<string, string> | null }]
}>()

type Preset = 'daily' | 'weekdays' | 'weekends' | 'custom'

const PRESETS: { key: Preset; label: string; days: number[] | null }[] = [
  { key: 'daily',    label: 'Diario',        days: null },
  { key: 'weekdays', label: 'Entre semana',   days: WEEKDAYS },
  { key: 'weekends', label: 'Fin de semana',  days: WEEKEND_DAYS },
  { key: 'custom',   label: 'Personalizado',  days: [] },
]

function detectPreset(days: number[] | null): Preset {
  if (!days || days.length === 0) return 'daily'
  const sorted = [...days].sort((a, b) => a - b)
  if (sorted.join() === [...WEEKDAYS].sort((a, b) => a - b).join()) return 'weekdays'
  if (sorted.join() === [...WEEKEND_DAYS].sort((a, b) => a - b).join()) return 'weekends'
  return 'custom'
}

const activePreset = ref<Preset>('daily')
const customDays = ref<number[]>([])
const times = ref<Record<string, string>>({})

watch(() => props.open, (val) => {
  if (val) {
    activePreset.value = detectPreset(props.targetDays)
    customDays.value = props.targetDays ? [...props.targetDays] : []
    times.value = props.reminderTimes ? { ...props.reminderTimes } : {}
  }
})

const visibleDays = computed(() => {
  if (activePreset.value === 'daily') return ALL_DAYS
  if (activePreset.value === 'weekdays') return WEEKDAYS
  if (activePreset.value === 'weekends') return WEEKEND_DAYS
  return customDays.value
})

const sortedVisibleDays = computed(() =>
  HABIT_DAYS.map(d => d.value).filter(d => visibleDays.value.includes(d))
)

function selectPreset(preset: Preset) {
  activePreset.value = preset
  if (preset === 'weekdays') customDays.value = [...WEEKDAYS]
  else if (preset === 'weekends') customDays.value = [...WEEKEND_DAYS]
  else if (preset === 'daily') customDays.value = []
}

function toggleCustomDay(day: number) {
  customDays.value = customDays.value.includes(day)
    ? customDays.value.filter(d => d !== day)
    : [...customDays.value, day]
}

function setTime(day: number, value: string) {
  const copy = { ...times.value }
  if (value) copy[String(day)] = value
  else delete copy[String(day)]
  times.value = copy
}

function save() {
  const targetDays = activePreset.value === 'daily' ? null : customDays.value.length > 0 ? customDays.value : null

  const reminderTimes: Record<string, string> = {}
  for (const day of visibleDays.value) {
    if (times.value[String(day)]) reminderTimes[String(day)] = times.value[String(day)]
  }

  emit('save', {
    targetDays,
    reminderTimes: Object.keys(reminderTimes).length > 0 ? reminderTimes : null,
  })
}
</script>

<template>
  <BaseModal title="Horarios y notificaciones" :open="open" size="xl" :level="2" @close="emit('close')">
    <div class="flex flex-col gap-4 pt-1">

      <!-- Presets -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="preset in PRESETS"
          :key="preset.key"
          type="button"
          @click="selectPreset(preset.key)"
          :class="[
            'px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150',
            activePreset === preset.key
              ? 'bg-accent text-accent-foreground'
              : 'bg-surface-raised text-muted-foreground hover:text-foreground',
          ]"
        >
          {{ preset.label }}
        </button>
      </div>

      <!-- Custom day toggles -->
      <div v-if="activePreset === 'custom'" class="flex gap-2">
        <button
          v-for="day in HABIT_DAYS"
          :key="day.value"
          type="button"
          @click="toggleCustomDay(day.value)"
          :class="[
            'flex-1 h-9 rounded-full text-xs font-medium transition-colors duration-150',
            customDays.includes(day.value)
              ? 'bg-accent text-accent-foreground'
              : 'bg-surface-raised text-muted-foreground',
          ]"
        >
          {{ day.label }}
        </button>
      </div>

      <!-- Day cards: days + notification time -->
      <div v-if="sortedVisibleDays.length" class="flex flex-col gap-2">
        <p class="text-xs text-muted-foreground">Notificación <span class="font-normal">(opcional)</span></p>
        <div
          v-for="day in sortedVisibleDays"
          :key="day"
          class="flex items-center justify-between bg-surface-raised rounded-xl px-4 py-3"
        >
          <span class="text-sm font-medium text-foreground">{{ HABIT_DAY_NAMES[day] }}</span>
          <input
            type="time"
            :value="times[String(day)] ?? ''"
            @change="setTime(day, ($event.target as HTMLInputElement).value)"
            class="text-sm text-foreground bg-surface border border-border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
          />
        </div>
      </div>

    <BaseButton @click="save">
      Guardar
    </BaseButton>

    </div>
  </BaseModal>
</template>
