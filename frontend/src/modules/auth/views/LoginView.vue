<template>
  <div class="w-full max-w-sm flex flex-col items-center gap-8">

    <HeaderAuth
      title="Inicia sesión"
      description="Construye hábitos, sigue tu progreso y alcanza tus metas"
    />

    <form @submit.prevent="handleLogin" class="w-full flex flex-col gap-4">
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

      <AuthSubmitButton :title="'INICIAR SESIÓN'" :loading="loading" />

      <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>

      <div class="text-center">
        <a href="#" class="text-sm text-accent hover:underline">Olvidaste la contraseña?</a>
      </div>
    </form>

    <div class="w-full flex flex-col items-center gap-4">
      <div class="flex items-center gap-3 w-full">
        <div class="flex-1 h-px bg-border"></div>
        <span class="text-xs text-muted-foreground">o continua con</span>
        <div class="flex-1 h-px bg-border"></div>
      </div>
      <GoogleButton text="Iniciar sesión con Google"/>
    </div>

    <p class="text-sm text-muted-foreground">
      No tienes una cuenta?
      <RouterLink :to="{ name: 'register' }" class="text-accent font-medium hover:underline">Registrate!</RouterLink>
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

const { login, loading, error } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

function handleLogin() {
  login({ email: form.email, password: form.password })
}
</script>
