export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  data: {
    user: AuthUser
    token: string
  }
}

export interface ForgotPasswordCredentials {
  email: string
}

export interface ResetPasswordCredentials {
  token: string
  email: string
  password: string
  password_confirmation: string
}
