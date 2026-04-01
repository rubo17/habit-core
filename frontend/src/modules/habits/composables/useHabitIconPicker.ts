import { ref, computed } from 'vue'
import {
  habitIcons,
  habitIconCategories,
  type HabitIconCategory,
} from '@/constants/habitIcons'

export function useHabitIconPicker() {
  const search = ref('')
  const activeCategory = ref<HabitIconCategory | 'all'>('all')

  const filteredIcons = computed(() => {
    let result = habitIcons

    if (activeCategory.value !== 'all') {
      result = result.filter((i) => i.category === activeCategory.value)
    }

    const q = search.value.trim().toLowerCase()
    if (q) {
      result = result.filter((i) => i.label.toLowerCase().includes(q))
    }

    return result
  })

  const iconsByCategory = computed(() => {
    const map: Partial<Record<HabitIconCategory, typeof habitIcons>> = {}
    for (const cat of habitIconCategories) {
      const icons = filteredIcons.value.filter((i) => i.category === cat)
      if (icons.length) map[cat] = icons
    }
    return map
  })

  // Grouped view only when no filter is active
  const showGrouped = computed(
    () => activeCategory.value === 'all' && !search.value.trim(),
  )

  return {
    search,
    activeCategory,
    filteredIcons,
    iconsByCategory,
    showGrouped,
    habitIconCategories,
  }
}
