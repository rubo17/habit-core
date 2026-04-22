import { http } from '@/shared/utils/http'
import type { AuthUser } from '@/modules/auth/types/auth.types'

interface UserResponse {
  data: AuthUser
}

export const userService = {
  update(data: Pick<AuthUser, 'name' | 'email'>): Promise<UserResponse> {
    return http.patch<UserResponse>('/user', data)
  },

  updatePassword(data: { current_password: string; password: string; password_confirmation: string }): Promise<void> {
    return http.patch<void>('/user/password', data)
  }
}
