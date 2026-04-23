<script setup lang="ts">
import HabitIcon from '@/shared/components/icons/HabitIcon.vue';
import type { HabitCategory } from '../types/habit.types'
import DefaultCategoryIcon from './icons/DefaultCategoryIcon.vue';
import CloseIcon from '@/shared/components/icons/CloseIcon.vue';
import { onMounted } from 'vue';

const props = defineProps<{ category: HabitCategory; active: boolean }>()
defineEmits<{ select: []; remove: [] }>()

</script>

<template>
  <div class="relative inline-block group">
    <button
      @click="$emit('select')"
      class="cursor-pointer flex items-center gap-2 relative"
      :class="[
        'px-4 py-1.5 pr-8 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-150',
        active
          ? 'bg-foreground text-background'
          : 'bg-surface text-muted-foreground border border-border',
      ]"
    >
      <HabitIcon v-if="category.icon != null" :name="category.icon" :size="20" />
      <DefaultCategoryIcon v-else class="w-4 h-4" />
      <span>{{ category.name }}</span>
    </button>
    
    <!-- Botón de cerrar -->
    <button v-if="category.id !== 0"
      @click.stop="$emit('remove')"
      class="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-150 md:opacity-0 group-hover:opacity-100"
      :class="[
        active
          ? 'hover:bg-background/20 text-background'
          : 'hover:bg-muted text-muted-foreground hover:text-foreground',
      ]"
      aria-label="Eliminar categoría"
    >
      <CloseIcon class="w-3 h-3" />
    </button>
  </div>
</template>