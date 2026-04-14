<script setup lang="ts">
import type { HabitCategory } from '../types/habit.types'

defineProps<{ category: HabitCategory; active: boolean }>()
defineEmits<{ select: [] }>()
</script>

<template>
  <button
    @click="$emit('select')"
    class="cursor-pointer"
    :class="[
      'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150',
      active
        ? 'bg-foreground text-background'
        : 'bg-surface text-muted-foreground border border-border',
    ]"
  >
    {{ category.name }}
  </button>
</template>
