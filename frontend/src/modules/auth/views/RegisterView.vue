<template>
  <div class="w-full max-w-sm flex flex-col items-center gap-8">

    <HeaderAuth
      title="Crea tu cuenta"
      description="Empieza a construir tus hábitos hoy mismo"
    />

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

      <AuthSubmitButton :title="'REGISTRARSE'" :loading="loading" />


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
import HeaderAuth from '../components/HeaderAuth.vue'
import AuthSubmitButton from '../components/AuthSubmitButton.vue'

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
