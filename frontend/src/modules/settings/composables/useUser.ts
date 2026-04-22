import { ref } from 'vue'
import { useLocalStorage } from '@/shared/composables/useLocalStorage'
import { userService } from '../services/user.service'
import type { AuthUser } from '@/modules/auth/types/auth.types'

const DEFAULT_USER: AuthUser = { id: 0, name: '', email: '' }

export function useUser() {
  const user = useLocalStorage<AuthUser>('user', DEFAULT_USER)
  const saving = ref(false)
  const error = ref<string | null>(null)

  async function update(data: Pick<AuthUser, 'name' | 'email'>) {
    saving.value = true
    error.value = null

    user.value = { ...user.value, ...data }

    try {
      const response = await userService.update(data)
      user.value = response.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error al guardar'
    } finally {
      saving.value = false
    }
  }

  return { user, saving, error, update }
}
