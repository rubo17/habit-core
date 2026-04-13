<script setup lang="ts">
import { ref, computed } from 'vue'
import HabitCard from '../components/HabitCard.vue'
import HabitCategoryCard from '../components/HabitCategoryCard.vue'
import { useHabitList } from '../composables/useHabitList'
import type { HabitCategory } from '../types/habit.types'

const { habits, completed, toggleHabit, deleteHabit } = useHabitList()

const ALL: HabitCategory = { id: 0, name: 'Todos' }
const selectedCategory = ref<HabitCategory>(ALL)

const categories = computed<HabitCategory[]>(() => {
  const seen = new Set<number>()
  const result: HabitCategory[] = []
  for (const habit of habits.value) {
    if (habit.category && !seen.has(habit.category.id)) {
      seen.add(habit.category.id)
      result.push(habit.category)
    }
  }
  return result
})

const filteredHabits = computed(() =>
  selectedCategory.value.id === 0
    ? habits.value
    : habits.value.filter(h => h.category_id === selectedCategory.value.id)
)
</script>

<template>
  <section class="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
    <div class="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      <HabitCategoryCard
        :category="ALL"
        :active="selectedCategory.id === 0"
        @select="selectedCategory = ALL"
      />
      <HabitCategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :active="selectedCategory.id === category.id"
        @select="selectedCategory = category"
      />
    </div>

    <div class="flex flex-col gap-3">
    <HabitCard
        v-for="habit in filteredHabits"
      :key="habit.id"
      :habit="habit"
      :completed="completed.has(habit.id)"
      @toggle="toggleHabit(habit.id)"
      @delete="deleteHabit(habit.id)"
    />
    </div>
  </section>
</template>
