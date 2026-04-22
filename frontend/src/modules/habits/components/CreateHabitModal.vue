<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import HabitIconPicker from './HabitIconPicker.vue'
import CreateCategoryModal from './CreateCategoryModal.vue'
import { useHabits } from '../composables/useHabits'
import { useCategories } from '../composables/useCategories'
import { useModal } from '@/shared/composables/useModal'
import type { CreateHabitDto, HabitCategory } from '../types/habit.types'
import DefaultCategoryIcon from './icons/DefaultCategoryIcon.vue'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { createHabit } = useHabits()
const { categories, fetchCategories } = useCategories()
const categoryModal = useModal()

onMounted(fetchCategories)

const COLORS = [
  '#6366f1', '#3b82f6', '#22c55e', '#f97316',
  '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b',
]

const DAYS = [
  { label: 'L', value: 1 },
  { label: 'M', value: 2 },
  { label: 'X', value: 3 },
  { label: 'J', value: 4 },
  { label: 'V', value: 5 },
  { label: 'S', value: 6 },
  { label: 'D', value: 0 },
]

const ALL_DAYS = DAYS.map(d => d.value)

const DEFAULT: CreateHabitDto = {
  name: '',
  frequency: 'daily',
  category_id: null,
  reminder_time: null,
  reminder_days: null,
  color: '#6366f1',
  icon: 'sparkles',
}

const form = reactive<CreateHabitDto>({ ...DEFAULT })
const showIconPicker = ref(false)
const selectedDays = ref<number[]>([...ALL_DAYS])

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

function onCategoryCreated(category: HabitCategory) {
  form.category_id = category.id
}

function resetForm() {
  Object.assign(form, DEFAULT)
  showIconPicker.value = false
  selectedDays.value = [...ALL_DAYS]
}

function close() {
  resetForm()
  emit('close')
}

async function submit() {
  if (!form.name.trim()) return

  const days = selectedDays.value
  const reminderDays = form.reminder_time && days.length < 7 && days.length > 0
    ? days
    : null

  await createHabit({ ...form, reminder_days: reminderDays })
  close()
}
</script>

<template>
  <BaseModal title="Nuevo hábito" :open="isOpen" size="xl" @close="close">
    <div class="flex flex-col gap-5 pt-1">

      <!-- Preview + nombre -->
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

      <!-- Icon picker -->
      <div v-show="showIconPicker" class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Icono</p>
        <div class="max-h-52 overflow-y-auto pr-1">
          <HabitIconPicker
            :model-value="form.icon ?? 'sparkles'"
            @update:model-value="(val) => { form.icon = val; showIconPicker = false }"
          />
        </div>
      </div>

      <!-- Categoría -->
      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Categoría</p>
        <select
          v-model="form.category_id"
          class="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
        >
          <option :value="null">Ninguna</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <button
          type="button"
          @click="categoryModal.open()"
          class="self-start text-xs text-accent font-medium hover:underline"
        >
          + Nueva categoría
        </button>
      </div>

      <!-- Colores -->
      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Color</p>
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="color in COLORS"
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

      <!-- Recordatorio -->
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
              v-for="day in DAYS"
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

      <!-- Acción -->
      <button
        type="button"
        @click="submit"
        :disabled="!form.name.trim()"
        class="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Crear hábito
      </button>

    </div>
  </BaseModal>

  <CreateCategoryModal
    :is-open="categoryModal.isOpen.value"
    @close="categoryModal.close()"
    @created="onCategoryCreated"
  />
</template>
