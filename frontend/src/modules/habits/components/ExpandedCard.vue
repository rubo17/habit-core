<script setup lang="ts">
import type { Habit } from '../types/habit.types'
import HabitHeatmap from './HabitHeatmap.vue'
import EditHabitIcon from './icons/EditHabitIcon.vue'

const props = defineProps<{
    isExpanded: boolean                                     
    habit: Habit
  }>() 
  
defineEmits<{ edit: [] }>()

const habitColor = props.habit.color ?? '#6366f1'
</script>

<template>
        <div
      :class="[
        'grid bg-surface transition-all duration-300 ease-in-out',
        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      ]"
    >
      <div class="overflow-hidden">
      <div class="px-4 pt-3 pb-4 border-t border-border flex flex-col gap-3">

        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-muted-foreground">Registro del año</span>
          <button
            @click.stop="$emit('edit')"
            class="flex items-center justify-center w-7 h-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors duration-150"
          >
            <EditHabitIcon />
          </button>
        </div>

        <HabitHeatmap
          :habit-id="habit.id"
          :color="habitColor"
          :today-logged="habit.today_logged"
        />

        </div>
      </div>
    </div>
</template>
