import { useLocalStorage } from '@/shared/composables/useLocalStorage'
import { dbGetAll, dbAdd, dbClear, STORES } from '@/shared/utils/db'
import { userService } from '../services/user.service'
import type { AuthUser } from '@/modules/auth/types/auth.types'

type UserUpdatePayload = Pick<AuthUser, 'name' | 'email'>

const DEFAULT_USER: AuthUser = { id: 0, name: '', email: '' }

const user = useLocalStorage<AuthUser>('user', DEFAULT_USER)

async function update(data: UserUpdatePayload) {
  user.value = { ...user.value, ...data }

  try {
    const response = await userService.update(data)
    user.value = response.data
    await dbClear(STORES.USER_SYNC_QUEUE)
  } catch {
    await dbClear(STORES.USER_SYNC_QUEUE)
    await dbAdd(STORES.USER_SYNC_QUEUE, data)
  }
}

async function flushQueue() {
  const pending = await dbGetAll<UserUpdatePayload>(STORES.USER_SYNC_QUEUE)
  if (!pending.length) return

  const lastUpdate = pending[pending.length - 1]!
  await dbClear(STORES.USER_SYNC_QUEUE)

  try {
    const response = await userService.update(lastUpdate)
    user.value = response.data
  } catch {
    await dbAdd(STORES.USER_SYNC_QUEUE, lastUpdate)
  }
}

window.addEventListener('online', flushQueue)

export function useUser() {
  return { user, update }
}
