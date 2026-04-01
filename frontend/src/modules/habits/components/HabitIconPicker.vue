<template>
  <div class="flex flex-col gap-3">

    <!-- Search -->
    <input
      v-model="search"
      type="text"
      placeholder="Buscar icono..."
      class="w-full rounded-xl bg-surface-raised border border-border px-3 py-2 text-sm
             placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring
             transition-shadow duration-150"
    />

    <!-- Category tabs -->
    <div class="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      <button
        @click="activeCategory = 'all'"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150"
        :class="activeCategory === 'all'
          ? 'bg-accent text-accent-foreground'
          : 'bg-surface-raised text-muted-foreground hover:text-foreground'"
      >
        Todos
      </button>
      <button
        v-for="cat in habitIconCategories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150"
        :class="activeCategory === cat
          ? 'bg-accent text-accent-foreground'
          : 'bg-surface-raised text-muted-foreground hover:text-foreground'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Flat grid (filtered / search active) -->
    <div v-if="!showGrouped" class="grid grid-cols-6 sm:grid-cols-8 gap-2">
      <button
        v-for="icon in filteredIcons"
        :key="icon.name"
        @click="selectIcon(icon.name)"
        :title="icon.label"
        class="rounded-xl p-2.5 flex items-center justify-center transition-colors duration-150
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        :class="modelValue === icon.name
          ? 'bg-accent text-accent-foreground ring-2 ring-ring'
          : 'bg-surface-raised text-muted-foreground hover:bg-surface hover:text-foreground'"
      >
        <HabitIcon :name="icon.name" :size="20" />
      </button>
    </div>

    <!-- Grouped view (default "all" with no search) -->
    <template v-else>
      <section
        v-for="(icons, cat) in iconsByCategory"
        :key="cat"
        class="flex flex-col gap-2"
      >
        <p class="text-xs font-medium text-muted-foreground">{{ cat }}</p>
        <div class="grid grid-cols-6 sm:grid-cols-8 gap-2">
          <button
            v-for="icon in icons"
            :key="icon.name"
            @click="selectIcon(icon.name)"
            :title="icon.label"
            class="rounded-xl p-2.5 flex items-center justify-center transition-colors duration-150
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :class="modelValue === icon.name
              ? 'bg-accent text-accent-foreground ring-2 ring-ring'
              : 'bg-surface-raised text-muted-foreground hover:bg-surface hover:text-foreground'"
          >
            <HabitIcon :name="icon.name" :size="20" />
          </button>
        </div>
      </section>
    </template>

    <!-- Empty state -->
    <p v-if="filteredIcons.length === 0" class="text-sm text-muted-foreground text-center py-6">
      No se encontraron iconos para "{{ search }}"
    </p>

  </div>
</template>

<script setup lang="ts">
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import { useHabitIconPicker } from '../composables/useHabitIconPicker'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const { search, activeCategory, filteredIcons, iconsByCategory, showGrouped, habitIconCategories } =
  useHabitIconPicker()

function selectIcon(name: string) {
  emit('update:modelValue', name)
}
</script>
