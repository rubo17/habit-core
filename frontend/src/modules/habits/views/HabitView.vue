<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import HabitCard from '../components/HabitCard.vue'
import HabitCategoryCard from '../components/HabitCategoryCard.vue'
import AddHabitIcon from '../components/icons/AddHabitIcon.vue'
import CreateHabitModal from '../components/CreateHabitModal.vue'
import EditHabitModal from '../components/EditHabitModal.vue'
import { useHabits } from '../composables/useHabits'
import { useCategories } from '../composables/useCategories'
import { useModal } from '@/shared/composables/useModal'
import type { Habit, HabitCategory } from '../types/habit.types'
import EmptyHabits from '../components/EmptyHabits.vue'

const { habits, completed, fetchHabits, toggleHabit, deleteHabit } = useHabits()
const { categories, fetchCategories, deleteCategory } = useCategories()

onMounted(() => { fetchHabits(); fetchCategories() })
const createModal = useModal()
const editModal = useModal()
const habitToEdit = ref<Habit | null>(null)

const ALL: HabitCategory = { id: 0, name: 'Todos' }
const selectedCategory = ref<HabitCategory>(ALL)

function openEditModal(habit: Habit) {
  habitToEdit.value = habit
  editModal.open()
}

async function removeCategory(category: HabitCategory) {
  if (selectedCategory.value.id === category.id) selectedCategory.value = ALL
  await deleteCategory(category.id)
}

const filteredHabits = computed(() =>
  selectedCategory.value.id === 0
    ? habits.value
    : habits.value.filter(h => h.category_id === selectedCategory.value.id)
)
</script>

<template>
  <section class="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
    <div v-if="habits.length" class="flex gap-2 overflow-x-auto pb-1 scrollbar-hidden">
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
        @remove="removeCategory(category)"
      />
    </div>

    <div v-if="filteredHabits.length" class="flex flex-col gap-3">
      <HabitCard
        v-for="habit in filteredHabits"
        :key="habit.id"
        :habit="habit"
        :completed="completed.has(habit.id)"
        @toggle="toggleHabit(habit.id)"
        @delete="deleteHabit(habit.id)"
        @edit="openEditModal(habit)"
      />
    </div>

    <EmptyHabits v-else />
  </section>

  <button
    @click="createModal.open()"
    class="fixed bottom-20 right-4 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
  >
    <AddHabitIcon />
  </button>

  <CreateHabitModal :is-open="createModal.isOpen.value" @close="createModal.close()" />
  <EditHabitModal
    v-if="habitToEdit"
    :is-open="editModal.isOpen.value"
    :habit="habitToEdit"
    :categories="categories"
    @close="editModal.close()"
    @category-created="fetchCategories"
  />

</template>
