<template>
  <div class="w-full max-w-sm flex flex-col items-center gap-8">

    <HeaderAuth
      title="Recuperar contraseña"
      description="Te enviaremos un enlace para restablecer tu contraseña"
    />

    <div v-if="sent" class="w-full text-center flex flex-col gap-4">
      <p class="text-sm text-muted-foreground">
        Si el correo está registrado recibirás un enlace en tu bandeja de entrada.
      </p>
      <RouterLink :to="{ name: 'login' }" class="text-sm text-accent font-medium hover:underline">
        Volver al inicio de sesión
      </RouterLink>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
      <AuthInput
        label="Email"
        placeholder="you@example.com"
        type="email"
        v-model="email"
      />

      <AuthSubmitButton title="ENVIAR ENLACE" :loading="loading" />

      <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>

      <div class="text-center">
        <RouterLink :to="{ name: 'login' }" class="text-sm text-accent hover:underline">
          Volver al inicio de sesión
        </RouterLink>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthInput from '../components/AuthInput.vue'
import AuthSubmitButton from '../components/AuthSubmitButton.vue'
import HeaderAuth from '../components/HeaderAuth.vue'
import { authService } from '../services/auth.service'

const email = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const sent = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = null

  try {
    await authService.forgotPassword({ email: email.value })
    sent.value = true
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al enviar el enlace'
  } finally {
    loading.value = false
  }
}
</script>
