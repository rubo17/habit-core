import { useLocalStorage } from '@/shared/composables/useLocalStorage'
import { categoryService } from '../services/category.service'
import type { HabitCategory } from '../types/habit.types'

export function useCategories() {
  const categories = useLocalStorage<HabitCategory[]>('categories', [])

  async function fetchCategories() {
    try {
      const response = await categoryService.getAll()
      const iconMap = Object.fromEntries(categories.value.map(c => [c.id, c.icon]))
      categories.value = response.data.map(c => ({ ...c, icon: iconMap[c.id] ?? null }))
    } catch {
      // keep localStorage as fallback
    }
  }

  async function createCategory(name: string, icon?: string | null): Promise<HabitCategory> {
    const { data: created } = await categoryService.create({ name, icon })
    const category = { ...created, icon: icon ?? null }
    categories.value = [...categories.value, category]
    return category
  }

  async function deleteCategory(id: number): Promise<void> {
    categories.value = categories.value.filter(c => c.id !== id)
    try {
      await categoryService.remove(id)
    } catch {
      await fetchCategories()
    }
  }

  return { categories, fetchCategories, createCategory, deleteCategory }
}
