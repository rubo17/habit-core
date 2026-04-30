<script setup lang="ts">
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import type { HabitStat } from '../types/stats.types'
import StreakIcon from './icons/StreakIcon.vue';

defineProps<{
  habits: HabitStat[]
}>()
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="habit in habits"
      :key="habit.id"
      class="flex items-center gap-3"
    >
      <div
        class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        :style="{ backgroundColor: habit.color ?? '#6366f1' }"
      >
        <HabitIcon v-if="habit.icon" :name="habit.icon" :size="16" class="text-white" />
      </div>

      <div class="flex-1 min-w-0 flex flex-col gap-1">
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm font-medium text-foreground truncate">{{ habit.name }}</span>
          <div class="flex items-center gap-4 flex-shrink-0">
            <div v-if="habit.current_streak > 0" class="text-xs text-muted-foreground flex flex-row gap-1 items-center">
              <StreakIcon class="w-4 h-4" />
               <span>
                  {{ habit.current_streak }}
               </span>
            </div>
            <span class="text-sm font-semibold text-foreground">{{ habit.rate }}%</span>
          </div>
        </div>
        <div class="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :style="{ width: `${habit.rate}%`, backgroundColor: habit.color ?? '#6366f1' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
