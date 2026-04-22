import { ref, watch, type Ref } from 'vue'

const cache = new Map<string, Ref>()

export function clearCache(keys: string[]) {
  keys.forEach(key => cache.delete(key))
}

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  if (cache.has(key)) {
    return cache.get(key) as Ref<T>
  }

  const stored = localStorage.getItem(key)
  const state = ref(stored ? (JSON.parse(stored) as T) : defaultValue) as Ref<T>

  watch(state, (value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, { deep: true })

  cache.set(key, state)
  return state
}
