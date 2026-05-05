<script setup lang="ts">
import { computed } from 'vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import { useSwipe } from '@/shared/composables/useSwipe'
import { useHabitCard } from '../composables/useHabitCard'
import type { Habit } from '../types/habit.types'
import DeleteHabitIcon from './icons/DeleteHabitIcon.vue'
import ExpandedCard from './ExpandedCard.vue'

const props = defineProps<{ habit: Habit; completed: boolean }>()
const emit = defineEmits<{ toggle: []; delete: []; edit: [] }>()

const DEFAULT_COLOR = '#6366f1'
const habitColor = computed(() => props.habit.color ?? DEFAULT_COLOR)
const habitIcon = computed(() => props.habit.icon ?? 'sparkles')

const { elementRef, offsetX, isAnimating, progress, onTouchStart, onTouchEnd } = useSwipe(() => emit('delete'))
const { isExpanded, toggleExpand } = useHabitCard()
</script>

<template>
  <div class="rounded-2xl overflow-hidden">

    <div class="relative overflow-hidden">
      <div v-show="offsetX < 0" class="absolute inset-0 bg-danger flex items-center justify-end pr-5">
        <DeleteHabitIcon
          class="text-white h-8 w-8"
          :style="{ opacity: progress, transform: `scale(${0.6 + progress * 0.4})` }"
        />
      </div>

      <div
        ref="elementRef"
        :style="{ transform: `translateX(${offsetX}px)` }"
        :class="['relative flex items-center gap-3 p-4 bg-surface cursor-pointer', { 'transition-transform duration-200': isAnimating, 'opacity-50': !habit.scheduled_for_today }]"
        @click="toggleExpand"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
      >
        <div
          v-if="completed"
          class="absolute inset-0 pointer-events-none"
          :style="{ backgroundColor: `${habitColor}20` }"
        />

        <div
          :style="{ backgroundColor: habitColor }"
          class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
        >
          <HabitIcon :name="habitIcon" :size="20" />
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-foreground font-medium truncate">{{ habit.name }}</p>
          <p v-if="habit.category || !habit.scheduled_for_today" class="text-muted-foreground text-xs flex items-center gap-2 mt-0.5">
            <span v-if="habit.category">{{ habit.category.name }}</span>
            <span v-if="habit.category && !habit.scheduled_for_today">·</span>
            <span class="py-2 px-3 rounded-full bg-danger/70 text-accent-foreground" v-if="!habit.scheduled_for_today">No programado hoy</span>
          </p>
        </div>

        <button
          @click.stop="emit('delete')"
          class="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-danger hover:bg-surface-raised transition-colors duration-150"
        >
          <DeleteHabitIcon />
        </button>

        <button
          @click.stop="emit('toggle')"
          :class="[
            'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-150',
            completed ? 'bg-success' : 'border-2 border-border',
          ]"
        >
          <svg v-if="completed" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </div>

    <ExpandedCard :is-expanded="isExpanded" :habit="habit" @edit="emit('edit')" />

  </div>
</template>
