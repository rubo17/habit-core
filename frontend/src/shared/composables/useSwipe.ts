import { ref, computed, onMounted, onUnmounted } from 'vue'

const SWIPE_MAX = 80
const SWIPE_THRESHOLD = 60

export function useSwipe(onComplete: () => void) {
  const elementRef = ref<HTMLElement | null>(null)
  const offsetX = ref(0)
  const isAnimating = ref(false)

  const progress = computed(() => Math.min(Math.abs(offsetX.value) / SWIPE_MAX, 1))

  let startX = 0
  let startY = 0
  let isHorizontal: boolean | null = null

  function onTouchStart(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return
    startX = touch.clientX
    startY = touch.clientY
    isHorizontal = null
    isAnimating.value = false
  }

  function onTouchMove(e: TouchEvent) {
    const touch = e.touches[0]
    if (!touch) return
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY

    if (isHorizontal === null) {
      isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)
    }

    if (!isHorizontal) return

    e.preventDefault()

    if (deltaX < 0) {
      offsetX.value = Math.max(deltaX, -SWIPE_MAX)
    }
  }

  function onTouchEnd() {
    isAnimating.value = true
    if (offsetX.value < -SWIPE_THRESHOLD) {
      const width = elementRef.value?.offsetWidth ?? 400
      offsetX.value = -width
      setTimeout(() => {
      onComplete()
      offsetX.value = 0
    }, 220)
    } else {
      offsetX.value = 0
    }
  }

  onMounted(() => {
    elementRef.value?.addEventListener('touchmove', onTouchMove, { passive: false })
  })

  onUnmounted(() => {
    elementRef.value?.removeEventListener('touchmove', onTouchMove)
  })

  return { elementRef, offsetX, isAnimating, progress, onTouchStart, onTouchEnd }
}
