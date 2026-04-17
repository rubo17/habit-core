import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import { clearCache } from '@/shared/composables/useLocalStorage'
import type { LoginCredentials, RegisterCredentials } from '../types/auth.types'

const USER_KEYS = ['token', 'user', 'habits', 'habits:sync-queue']

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(credentials: LoginCredentials) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      router.push({ name: 'habits' })
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al iniciar sesión'
    } finally {
      loading.value = false
    }
  }

  async function register(credentials: RegisterCredentials) {
    loading.value = true
    error.value = null

    try {
      const response = await authService.register(credentials)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      router.push({ name: 'habits' })
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al registrarse'
    } finally {
      loading.value = false
    }
  }

  function logout() {
    USER_KEYS.forEach(key => localStorage.removeItem(key))
    clearCache(USER_KEYS)
    router.push({ name: 'login' })
  }

  return { login, register, logout, loading, error }
}
