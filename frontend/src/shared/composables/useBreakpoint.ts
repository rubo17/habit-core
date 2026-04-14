import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoint() {
  const isMobile = ref(false)

  const mql = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 767px)')
    : null

  function update(e: MediaQueryListEvent | MediaQueryList) {
    isMobile.value = e.matches
  }

  onMounted(() => {
    if (!mql) return
    isMobile.value = mql.matches
    mql.addEventListener('change', update)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', update)
  })

  return { isMobile }
}
