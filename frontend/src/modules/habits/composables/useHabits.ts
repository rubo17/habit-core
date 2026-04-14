import { computed } from 'vue'
import { useLocalStorage } from '@/shared/composables/useLocalStorage'
import { habitService } from '../services/habit.service'
import type { CreateHabitDto, Habit, SyncOperation } from '../types/habit.types'

export function useHabits() {
  const habits = useLocalStorage<Habit[]>('habits', [])
  const completedIds = useLocalStorage<number[]>('habits:completed', [])
  const syncQueue = useLocalStorage<SyncOperation[]>('habits:sync-queue', [])

  const completed = computed(() => new Set(completedIds.value))

  function toggleHabit(id: number) {
    if (completed.value.has(id)) {
      completedIds.value = completedIds.value.filter(c => c !== id)
    } else {
      completedIds.value = [...completedIds.value, id]
    }
  }

  async function createHabit(data: CreateHabitDto) {
    const tempId = Date.now()
    const tempHabit: Habit = {
      ...data,
      id: tempId,
      user_id: 0,
      category_id: data.category_id ?? null,
      reminder_time: data.reminder_time ?? null,
      color: data.color ?? null,
      icon: data.icon ?? null,
      deleted_at: null,
      created_at: '',
      updated_at: '',
    }

    habits.value = [...habits.value, tempHabit]

    try {
      const { data: created } = await habitService.create(data)
      habits.value = habits.value.map(h => h.id === tempId ? created : h)
    } catch {
      syncQueue.value = [...syncQueue.value, { type: 'create', payload: data, tempId }]
    }
  }

  async function deleteHabit(id: number) {
    habits.value = habits.value.filter(h => h.id !== id)

    try {
      await habitService.remove(id)
    } catch {
      syncQueue.value = [...syncQueue.value, { type: 'delete', id }]
    }
  }

  async function flushQueue() {
    if (!syncQueue.value.length) return

    const pending = [...syncQueue.value]
    syncQueue.value = []

    for (const op of pending) {
      try {
        if (op.type === 'create') {
          const { data: created } = await habitService.create(op.payload)
          habits.value = habits.value.map(h => h.id === op.tempId ? created : h)
        }
        if (op.type === 'delete') {
          await habitService.remove(op.id)
        }
      } catch {
        syncQueue.value = [...syncQueue.value, op]
      }
    }
  }

  window.addEventListener('online', flushQueue)

  return { habits, completed, toggleHabit, createHabit, deleteHabit }
}
