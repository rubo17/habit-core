import { ref } from 'vue'
import { dbGetAll, dbPutAll, dbPut, dbDelete, dbAdd, STORES } from '@/shared/utils/db'
import { categoryService } from '../services/category.service'
import type { CreateCategoryDto, HabitCategory, SyncOperation } from '../types/habit.types'

export const categories = ref<HabitCategory[]>([])

const ready = (async () => {
  categories.value = await dbGetAll<HabitCategory>(STORES.CATEGORIES)
})()

async function fetchCategories() {
  await ready
  try {
    const response = await categoryService.getAll()
    const iconMap = Object.fromEntries(categories.value.map(c => [c.id, c.icon]))
    categories.value = response.data.map(c => ({ ...c, icon: iconMap[c.id] ?? null }))
    await dbPutAll(STORES.CATEGORIES, categories.value)
  } catch {
    // cached data already loaded by ready
  }
}

async function createCategory(name: string, icon?: string | null): Promise<HabitCategory> {
  const tempId = Date.now()
  const tempCategory: HabitCategory = { id: tempId, name, icon: icon ?? null }

  categories.value = [...categories.value, tempCategory]
  await dbPut(STORES.CATEGORIES, tempCategory)

  try {
    const payload: CreateCategoryDto = { name, icon }
    const { data: created } = await categoryService.create(payload)
    const category = { ...created, icon: icon ?? null }
    categories.value = categories.value.map(c => c.id === tempId ? category : c)
    await dbDelete(STORES.CATEGORIES, tempId)
    await dbPut(STORES.CATEGORIES, category)
    return category
  } catch {
    const op: SyncOperation = { type: 'create-category', payload: { name, icon }, tempId }
    await dbAdd(STORES.SYNC_QUEUE, op)
    return tempCategory
  }
}

async function deleteCategory(id: number): Promise<void> {
  categories.value = categories.value.filter(c => c.id !== id)
  await dbDelete(STORES.CATEGORIES, id)

  try {
    await categoryService.remove(id)
  } catch {
    const op: SyncOperation = { type: 'delete-category', id }
    await dbAdd(STORES.SYNC_QUEUE, op)
  }
}

export function useCategories() {
  return { categories, fetchCategories, createCategory, deleteCategory }
}
