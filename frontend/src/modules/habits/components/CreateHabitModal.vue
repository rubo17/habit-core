<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import HabitIconPicker from './HabitIconPicker.vue'
import { useHabits } from '../composables/useHabits'
import type { CreateHabitDto } from '../types/habit.types'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { createHabit } = useHabits()

const COLORS = [
  '#6366f1', '#3b82f6', '#22c55e', '#f97316',
  '#ef4444', '#8b5cf6', '#ec4899', '#f59e0b',
]

const DEFAULT: CreateHabitDto = {
  name: '',
  frequency: 'daily',
  category_id: null,
  reminder_time: null,
  color: '#6366f1',
  icon: 'sparkles',
}

const form = reactive<CreateHabitDto>({ ...DEFAULT })
const showIconPicker = ref(false)

function resetForm() {
  Object.assign(form, DEFAULT)
  showIconPicker.value = false
}

function close() {
  resetForm()
  emit('close')
}

async function submit() {
  if (!form.name.trim()) return
  await createHabit({ ...form })
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
      <div class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Recordatorio <span class="font-normal">(opcional)</span></p>
        <input
          v-model="form.reminder_time"
          type="time"
          class="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
        />
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
</template>
