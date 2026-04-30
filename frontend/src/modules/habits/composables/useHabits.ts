import { ref, computed } from 'vue'
import { dbGetAll, dbPutAll, dbPut, dbDelete, dbAdd, dbClear, STORES } from '@/shared/utils/db'
import { habitService } from '../services/habit.service'
import { categoryService } from '../services/category.service'
import { categories } from './useCategories'
import type { CreateHabitDto, Habit, SyncOperation, UpdateHabitDto } from '../types/habit.types'

const habits = ref<Habit[]>([])
const syncQueue = ref<SyncOperation[]>([])
const completed = computed(() => new Set(
  habits.value.filter(h => h.today_logged).map(h => h.id)
))

const ready = (async () => {
  habits.value = await dbGetAll<Habit>(STORES.HABITS)
  syncQueue.value = await dbGetAll<SyncOperation>(STORES.SYNC_QUEUE)
})()

async function fetchHabits() {
  await ready
  try {
    const response = await habitService.getAll()
    habits.value = response.data.data
    await dbPutAll(STORES.HABITS, habits.value)
  } catch {
    // cached data already loaded by ready
  }
}

function toggleHabit(id: number) {
  const isCompleted = completed.value.has(id)
  const today = new Date().toISOString().split('T')[0]!

  habits.value = habits.value.map(h =>
    h.id === id ? { ...h, today_logged: !isCompleted } : h
  )
  dbPut(STORES.HABITS, habits.value.find(h => h.id === id)!)

  const apiCall = isCompleted
    ? habitService.unlog(id, today)
    : habitService.log(id)

  apiCall.catch(() => {
    const op: SyncOperation = isCompleted
      ? { type: 'unlog', id, date: today }
      : { type: 'log', id }
    syncQueue.value = [...syncQueue.value, op]
    dbAdd(STORES.SYNC_QUEUE, op)
  })
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
  await dbPut(STORES.HABITS, tempHabit)

  try {
    const { data: created } = await habitService.create(data)
    habits.value = habits.value.map(h => h.id === tempId ? created : h)
    await dbDelete(STORES.HABITS, tempId)
    await dbPut(STORES.HABITS, created)
  } catch {
    const op: SyncOperation = { type: 'create', payload: data, tempId }
    syncQueue.value = [...syncQueue.value, op]
    await dbAdd(STORES.SYNC_QUEUE, op)
  }
}

async function updateHabit(id: number, data: UpdateHabitDto) {
  habits.value = habits.value.map(h => h.id === id ? { ...h, ...data } : h)

  try {
    const { data: updated } = await habitService.update(id, data)
    habits.value = habits.value.map(h => h.id === id ? updated : h)
    await dbPut(STORES.HABITS, updated)
  } catch {
    await fetchHabits()
  }
}

async function deleteHabit(id: number) {
  habits.value = habits.value.filter(h => h.id !== id)
  await dbDelete(STORES.HABITS, id)

  try {
    await habitService.remove(id)
  } catch {
    const op: SyncOperation = { type: 'delete', id }
    syncQueue.value = [...syncQueue.value, op]
    await dbAdd(STORES.SYNC_QUEUE, op)
  }
}

async function flushQueue() {
  await ready
  const pending = await dbGetAll<SyncOperation>(STORES.SYNC_QUEUE)
  if (!pending.length) return

  syncQueue.value = []
  await dbClear(STORES.SYNC_QUEUE)

  const categoryIdMap = new Map<number, number>()

  for (const op of pending) {
    try {
      if (op.type === 'create-category') {
        const { data: created } = await categoryService.create(op.payload)
        const category = { ...created, icon: op.payload.icon ?? null }
        categoryIdMap.set(op.tempId, created.id)
        categories.value = categories.value.map(c => c.id === op.tempId ? category : c)
        await dbDelete(STORES.CATEGORIES, op.tempId)
        await dbPut(STORES.CATEGORIES, category)
      }
      if (op.type === 'delete-category') await categoryService.remove(op.id)
      if (op.type === 'create') {
        const resolvedCategoryId = op.payload.category_id != null && categoryIdMap.has(op.payload.category_id)
          ? categoryIdMap.get(op.payload.category_id)!
          : op.payload.category_id
        const payload = { ...op.payload, category_id: resolvedCategoryId }
        const { data: created } = await habitService.create(payload)
        habits.value = habits.value.map(h => h.id === op.tempId ? created : h)
        await dbDelete(STORES.HABITS, op.tempId)
        await dbPut(STORES.HABITS, created)
      }
      if (op.type === 'delete') await habitService.remove(op.id)
      if (op.type === 'log') await habitService.log(op.id)
      if (op.type === 'unlog') await habitService.unlog(op.id, op.date)
    } catch {
      syncQueue.value = [...syncQueue.value, op]
      await dbAdd(STORES.SYNC_QUEUE, op)
    }
  }

  await fetchHabits()
}

window.addEventListener('online', flushQueue)

export function useHabits() {
  return { habits, completed, fetchHabits, toggleHabit, createHabit, updateHabit, deleteHabit }
}
