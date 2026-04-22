import { ref } from 'vue'

export function useHabitCard() {
  const isExpanded = ref(false)

  function toggleExpand() {
    isExpanded.value = !isExpanded.value
  }

  return { isExpanded, toggleExpand }
}
