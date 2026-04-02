<template>
  <div class="w-full max-w-sm flex flex-col items-center gap-8">

    <!-- Logo -->
    <div class="flex flex-col items-center gap-3">
      <div class="relative">
        <div class="w-20 h-20 bg-foreground rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-background" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/>
          </svg>
        </div>
        <div class="absolute -top-1 -right-2 w-3 h-3 bg-accent rounded-full"></div>
        <div class="absolute -bottom-1 -right-4 w-5 h-5 bg-accent rounded-full opacity-60"></div>
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-foreground">Create account</h1>
        <p class="text-sm text-muted-foreground mt-1">Start building your habits today</p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleRegister" class="w-full flex flex-col gap-4">
      <AuthInput
        label="Name"
        placeholder="Jane Doe"
        type="text"
        v-model="form.name"
      />
      <AuthInput
        label="Email"
        placeholder="you@example.com"
        type="email"
        v-model="form.email"
      />
      <AuthInput
        label="Password"
        placeholder="••••••••"
        type="password"
        v-model="form.password"
      />
      <AuthInput
        label="Confirm password"
        placeholder="••••••••"
        type="password"
        v-model="form.confirmPassword"
      />

      <button
        type="submit"
        class="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-semibold tracking-widest rounded-full py-4 transition-colors mt-2 disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? '...' : 'REGISTRATE' }}
      </button>

      <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>
    </form>

    <!-- Google -->
    <div class="w-full flex flex-col items-center gap-4">
      <div class="flex items-center gap-3 w-full">
        <div class="flex-1 h-px bg-border"></div>
        <span class="text-xs text-muted-foreground">o continua con</span>
        <div class="flex-1 h-px bg-border"></div>
      </div>
    <GoogleButton text="Registrate con Google"/>
    </div>

    <!-- Login link -->
    <p class="text-sm text-muted-foreground">
      Already have an account?
      <RouterLink :to="{ name: 'login' }" class="text-accent font-medium hover:underline">Inicia sesión!</RouterLink>
    </p>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import AuthInput from '../components/AuthInput.vue'
import GoogleButton from '../components/GoogleButton.vue'
import { useAuth } from '../composables/useAuth'

const { register, loading, error } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function handleRegister() {
  register({
    name: form.name,
    email: form.email,
    password: form.password,
    password_confirmation: form.confirmPassword
  })
}
</script>
