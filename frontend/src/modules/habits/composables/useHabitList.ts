import { ref } from 'vue'
import type { Habit } from '../types/habit.types'

const MOCK_HABITS: Habit[] = [
  {
    id: 1,
    user_id: 1,
    category_id: 1,
    category: { id: 1, name: 'Salud' },
    name: 'Beber agua',
    frequency: 'daily',
    reminder_time: '09:00',
    color: '#3b82f6',
    icon: 'droplet',
    deleted_at: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 2,
    user_id: 1,
    category_id: 2,
    category: { id: 2, name: 'Fitness' },
    name: 'Entrenar en el gym',
    frequency: 'daily',
    reminder_time: '07:00',
    color: '#f97316',
    icon: 'dumbbell',
    deleted_at: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 3,
    user_id: 1,
    category_id: null,
    name: 'Meditar',
    frequency: 'daily',
    reminder_time: '08:00',
    color: '#8b5cf6',
    icon: 'brain',
    deleted_at: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 4,
    user_id: 1,
    category_id: 3,
    category: { id: 3, name: 'Nutrición' },
    name: 'Comer fruta',
    frequency: 'daily',
    reminder_time: null,
    color: '#22c55e',
    icon: 'apple',
    deleted_at: null,
    created_at: '',
    updated_at: '',
  },
]

export function useHabitList() {
  const habits = ref<Habit[]>(MOCK_HABITS)
  const completed = ref(new Set<number>([3]))

  function toggleHabit(id: number) {
    if (completed.value.has(id)) {
      completed.value.delete(id)
    } else {
      completed.value.add(id)
    }
  }

  function deleteHabit(id: number) {
    habits.value = habits.value.filter(h => h.id !== id)
  }

  return { habits, completed, toggleHabit, deleteHabit }
}
