import { http } from '@/shared/utils/http'
import type { AuthResponse, AuthUser, ForgotPasswordCredentials, LoginCredentials, RegisterCredentials, ResetPasswordCredentials } from '../types/auth.types'

export const authService = {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return http.post<AuthResponse>('/auth/login', credentials)
  },

  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return http.post<AuthResponse>('/auth/register', credentials)
  },

  getCurrentUser(): Promise<{ data: AuthUser }> {
    return http.get<{ data: AuthUser }>('/user')
  },

  forgotPassword(credentials: ForgotPasswordCredentials): Promise<{ message: string }> {
    return http.post<{ message: string }>('/auth/forgot-password', credentials)
  },

  resetPassword(credentials: ResetPasswordCredentials): Promise<{ message: string }> {
    return http.post<{ message: string }>('/auth/reset-password', credentials)
  },
}
