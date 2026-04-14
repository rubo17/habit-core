import { http } from '@/shared/utils/http'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types'

export const authService = {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return http.post<AuthResponse>('/auth/login', credentials)
  },

  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return http.post<AuthResponse>('/auth/register', credentials)
  },

}
