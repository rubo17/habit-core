import { computed } from 'vue'
import { useLocalStorage } from '@/shared/composables/useLocalStorage'
import { habitService } from '../services/habit.service'
import type { CreateHabitDto, Habit, SyncOperation, UpdateHabitDto } from '../types/habit.types'

export function useHabits() {
  const habits = useLocalStorage<Habit[]>('habits', [])
  const syncQueue = useLocalStorage<SyncOperation[]>('habits:sync-queue', [])

  const completed = computed(() => new Set(
    habits.value.filter(h => h.today_logged).map(h => h.id)
  ))

  async function fetchHabits() {
    try {
      const response = await habitService.getAll()
      habits.value = response.data.data
    } catch {
      // keep localStorage as fallback
    }
  }

  function toggleHabit(id: number) {
    const isCompleted = completed.value.has(id)
    const today = new Date().toISOString().split('T')[0]

    habits.value = habits.value.map(h =>
      h.id === id ? { ...h, today_logged: !isCompleted } : h
    )

    if (isCompleted) {
      habitService.unlog(id, today).catch(() => {
        habits.value = habits.value.map(h =>
          h.id === id ? { ...h, today_logged: true } : h
        )
        syncQueue.value = [...syncQueue.value, { type: 'unlog', id, date: today }]
      })
    } else {
      habitService.log(id).catch(() => {
        habits.value = habits.value.map(h =>
          h.id === id ? { ...h, today_logged: false } : h
        )
        syncQueue.value = [...syncQueue.value, { type: 'log', id }]
      })
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
      reminder_days: data.reminder_days ?? null,
      color: data.color ?? null,
      icon: data.icon ?? null,
      today_logged: false,
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

  async function updateHabit(id: number, data: UpdateHabitDto) {
    habits.value = habits.value.map(h => h.id === id ? { ...h, ...data } : h)

    try {
      const { data: updated } = await habitService.update(id, data)
      habits.value = habits.value.map(h => h.id === id ? updated : h)
    } catch {
      await fetchHabits()
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
        if (op.type === 'log') {
          await habitService.log(op.id)
        }
        if (op.type === 'unlog') {
          await habitService.unlog(op.id, op.date)
        }
      } catch {
        syncQueue.value = [...syncQueue.value, op]
      }
    }
  }

  window.addEventListener('online', flushQueue)

  return { habits, completed, fetchHabits, toggleHabit, createHabit, updateHabit, deleteHabit }
}
