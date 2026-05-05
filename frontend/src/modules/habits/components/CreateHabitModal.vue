<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseSelect from '@/shared/components/BaseSelect.vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import HabitIconPicker from './HabitIconPicker.vue'
import HabitScheduleModal from './HabitScheduleModal.vue'
import CreateCategoryModal from './CreateCategoryModal.vue'
import { useHabits } from '../composables/useHabits'
import { useCategories } from '../composables/useCategories'
import { useModal } from '@/shared/composables/useModal'
import type { CreateHabitDto, HabitCategory } from '../types/habit.types'
import DefaultCategoryIcon from './icons/DefaultCategoryIcon.vue'
import { HABIT_COLORS } from '@/constants/habitColors'
import { HABIT_DAY_NAMES } from '@/constants/habitDays'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { createHabit } = useHabits()
const { categories, fetchCategories } = useCategories()
const categoryModal = useModal()
const scheduleModal = useModal()

onMounted(fetchCategories)

const DEFAULT: CreateHabitDto = {
  name: '',
  frequency: 'daily',
  category_id: null,
  reminder_times: null,
  target_days: null,
  color: '#6366f1',
  icon: 'sparkles',
}

const form = reactive<CreateHabitDto>({ ...DEFAULT })
const showIconPicker = ref(false)

const scheduleSummary = computed(() => {
  const preset = !form.target_days || form.target_days.length === 0
    ? 'Diario'
    : form.target_days.length === 5 ? 'Entre semana'
    : form.target_days.length === 2 ? 'Fin de semana'
    : 'Personalizado'

  if (!form.reminder_times || Object.keys(form.reminder_times).length === 0) return preset

  const days = Object.keys(form.reminder_times)
    .map(Number)
    .sort((a, b) => a - b)
    .map(d => HABIT_DAY_NAMES[d]!.slice(0, 3))
    .join(', ')
  return `${preset} · 🔔 ${days}`
})

function onScheduleSave({ targetDays, reminderTimes }: { targetDays: number[] | null; reminderTimes: Record<string, string> | null }) {
  form.target_days = targetDays
  form.reminder_times = reminderTimes
  scheduleModal.close()
}

function onCategoryCreated(category: HabitCategory) {
  form.category_id = category.id
}

function resetForm() {
  Object.assign(form, DEFAULT)
  showIconPicker.value = false
}

function close() {
  resetForm()
  emit('close')
}

import { toRaw } from 'vue'
import { ALL_DAYS } from '@/constants/habitDays'
import SchedulePicker from './SchedulePicker.vue'

async function submit() {
  if (!form.name.trim()) return

  const payload = structuredClone(toRaw(form))
  payload.target_days = payload.target_days ?? ALL_DAYS

  await createHabit(payload)
  close()
}
</script>

<template>
  <BaseModal title="Nuevo hábito" :open="isOpen" size="xl" @close="close">
    <div class="flex flex-col gap-5 pt-1">

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="showIconPicker = !showIconPicker"
          :style="{ backgroundColor: form.color ?? '#6366f1' }"
          class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white transition-transform duration-150 active:scale-95"
        >
          <HabitIcon v-if="form.icon" :name="form.icon" :size="22" />
          <DefaultCategoryIcon v-else :size="22" />
        </button>

        <input
          v-model="form.name"
          type="text"
          placeholder="Nombre del hábito"
          maxlength="60"
          class="flex-1 bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
        />
      </div>

      <div v-show="showIconPicker" class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Icono</p>
        <div class="max-h-52 overflow-y-auto pr-1">
          <HabitIconPicker
            :model-value="form.icon ?? 'sparkles'"
            @update:model-value="(val) => { form.icon = val; showIconPicker = false }"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Categoría</p>
        <BaseSelect
          v-model="form.category_id"
          :options="[{ value: null, label: 'Ninguna' }, ...categories.map(c => ({ value: c.id, label: c.name }))]"
        />
        <button
          type="button"
          @click="categoryModal.open()"
          class="self-start text-xs text-accent font-medium hover:underline"
        >
          + Nueva categoría
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Color</p>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="color in HABIT_COLORS"
            :key="color"
            type="button"
            @click="form.color = color"
            :style="{
              backgroundColor: color,
              outline: form.color === color ? `3px solid ${color}` : 'none',
              outlineOffset: '3px',
              transform: form.color === color ? 'scale(1.1)' : 'scale(1)',
            }"
            class="w-8 h-8 rounded-full transition-all duration-150 active:scale-95"
          />
        </div>
      </div>

      <SchedulePicker
        :scheduleSummary="scheduleSummary"
        @click="scheduleModal.open()"
      />

      <BaseButton :disabled="!form.name.trim()" @click="submit">
        Crear hábito
      </BaseButton>

    </div>
  </BaseModal>

  <CreateCategoryModal
    :is-open="categoryModal.isOpen.value"
    @close="categoryModal.close()"
    @created="onCategoryCreated"
  />

  <HabitScheduleModal
    :open="scheduleModal.isOpen.value"
    :target-days="form.target_days ?? null"
    :reminder-times="form.reminder_times ?? null"
    @close="scheduleModal.close()"
    @save="onScheduleSave"
  />
</template>
