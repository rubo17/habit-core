<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseSelect from '@/shared/components/BaseSelect.vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import HabitIconPicker from './HabitIconPicker.vue'
import CreateCategoryModal from './CreateCategoryModal.vue'
import { useHabits } from '../composables/useHabits'
import { useModal } from '@/shared/composables/useModal'
import type { Habit, HabitCategory, UpdateHabitDto } from '../types/habit.types'
import { HABIT_COLORS } from '@/constants/habitColors'
import { HABIT_DAYS, ALL_DAYS } from '@/constants/habitDays'

const props = defineProps<{ isOpen: boolean; habit: Habit; categories: HabitCategory[] }>()
const emit = defineEmits<{ close: []; categoryCreated: [category: HabitCategory] }>()

const { updateHabit } = useHabits()
const categoryModal = useModal()

const form = reactive<UpdateHabitDto>({})
const showIconPicker = ref(false)
const selectedDays = ref<number[]>([...ALL_DAYS])
const selectedTargetDays = ref<number[]>([])

watch(() => props.isOpen, (open) => {
  if (open) {
    Object.assign(form, {
      name: props.habit.name,
      category_id: props.habit.category_id,
      reminder_time: props.habit.reminder_time,
      reminder_days: props.habit.reminder_days,
      target_days: props.habit.target_days,
      color: props.habit.color ?? '#6366f1',
      icon: props.habit.icon ?? 'sparkles',
    })
    selectedDays.value = props.habit.reminder_days ?? [...ALL_DAYS]
    selectedTargetDays.value = props.habit.target_days ?? []
    showIconPicker.value = false
  }
}, { immediate: true })

watch(() => form.reminder_time, (val) => {
  if (!val) {
    selectedDays.value = [...ALL_DAYS]
    form.reminder_days = null
  }
})

function toggleDay(day: number) {
  if (selectedDays.value.includes(day)) {
    selectedDays.value = selectedDays.value.filter(d => d !== day)
  } else {
    selectedDays.value = [...selectedDays.value, day]
  }
}

function toggleTargetDay(day: number) {
  if (selectedTargetDays.value.includes(day)) {
    selectedTargetDays.value = selectedTargetDays.value.filter(d => d !== day)
  } else {
    selectedTargetDays.value = [...selectedTargetDays.value, day]
  }
}

function onCategoryCreated(category: HabitCategory) {
  form.category_id = category.id
  emit('categoryCreated', category)
}

function close() {
  showIconPicker.value = false
  emit('close')
}

async function submit() {
  if (!form.name?.trim()) return

  const days = selectedDays.value
  const reminderDays = form.reminder_time && days.length < 7 && days.length > 0
    ? days
    : null

  const targetDays = selectedTargetDays.value.length > 0 ? selectedTargetDays.value : null

  await updateHabit(props.habit.id, { ...form, reminder_days: reminderDays, target_days: targetDays })
  close()
}
</script>

<template>
  <BaseModal title="Editar hábito" :open="isOpen" size="xl" @close="close">
    <div class="flex flex-col gap-5 pt-1">

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="showIconPicker = !showIconPicker"
          :style="{ backgroundColor: form.color ?? '#6366f1' }"
          class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white transition-transform duration-150 active:scale-95"
        >
          <HabitIcon :name="form.icon ?? 'sparkles'" :size="22" />
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

      <div class="flex flex-col gap-3">
        <p class="text-xs font-medium text-muted-foreground">Recordatorio <span class="font-normal">(opcional)</span></p>
        <input
          v-model="form.reminder_time"
          type="time"
          class="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
        />

        <div v-if="form.reminder_time" class="flex flex-col gap-2">
          <p class="text-xs text-muted-foreground">Días</p>
          <div class="flex gap-2">
            <button
              v-for="day in HABIT_DAYS"
              :key="day.value"
              type="button"
              @click="toggleDay(day.value)"
              :class="[
                'w-9 h-9 rounded-full text-xs font-medium transition-colors duration-150',
                selectedDays.includes(day.value)
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-surface-raised text-muted-foreground',
              ]"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Días que aplica <span class="font-normal">(opcional, vacío = todos los días)</span></p>
        <div class="flex gap-2">
          <button
            v-for="day in HABIT_DAYS"
            :key="day.value"
            type="button"
            @click="toggleTargetDay(day.value)"
            :class="[
              'w-9 h-9 rounded-full text-xs font-medium transition-colors duration-150',
              selectedTargetDays.includes(day.value)
                ? 'bg-accent text-accent-foreground'
                : 'bg-surface-raised text-muted-foreground',
            ]"
          >
            {{ day.label }}
          </button>
        </div>
      </div>

      <button
        type="button"
        @click="submit"
        :disabled="!form.name?.trim()"
        class="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Guardar
      </button>

    </div>
  </BaseModal>

  <CreateCategoryModal
    :is-open="categoryModal.isOpen.value"
    @close="categoryModal.close()"
    @created="onCategoryCreated"
  />
</template>
