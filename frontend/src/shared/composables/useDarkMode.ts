import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark'

export function useDarkMode() {
  const theme = ref<Theme>('light')

  // Aplicar tema al DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Cambiar tema
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  const toggleTheme = () => {
    console.log(theme.value)
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  // Inicializar
  onMounted(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null

    if (savedTheme) {
      theme.value = savedTheme
    } else {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }

    applyTheme(theme.value)
  })

  // Escuchar cambios de tema
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}