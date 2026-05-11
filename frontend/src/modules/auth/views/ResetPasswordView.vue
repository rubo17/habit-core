<template>
  <div class="w-full max-w-sm flex flex-col items-center gap-8">

    <HeaderAuth
      title="Nueva contraseña"
      description="Introduce tu nueva contraseña"
    />

    <div v-if="done" class="w-full text-center flex flex-col gap-4">
      <p class="text-sm text-muted-foreground">
        Contraseña actualizada correctamente.
      </p>
      <RouterLink :to="{ name: 'login' }" class="text-sm text-accent font-medium hover:underline">
        Iniciar sesión
      </RouterLink>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="w-full flex flex-col gap-4">
      <AuthInput
        label="Nueva contraseña"
        placeholder="••••••••"
        type="password"
        autocomplete="new-password"
        v-model="form.password"
      />
      <AuthInput
        label="Confirmar contraseña"
        placeholder="••••••••"
        type="password"
        autocomplete="new-password"
        v-model="form.password_confirmation"
      />

      <AuthSubmitButton title="RESTABLECER CONTRASEÑA" :loading="loading" />

      <p v-if="error" class="text-sm text-danger text-center">{{ error }}</p>
    </form>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AuthInput from '../components/AuthInput.vue'
import AuthSubmitButton from '../components/AuthSubmitButton.vue'
import HeaderAuth from '../components/HeaderAuth.vue'
import { authService } from '../services/auth.service'

const route = useRoute()
const router = useRouter()

const token = route.query.token as string
const email = route.query.email as string

if (!token || !email) {
  router.replace({ name: 'login' })
}

const form = reactive({
  password: '',
  password_confirmation: '',
})

const loading = ref(false)
const error = ref<string | null>(null)
const done = ref(false)

async function handleSubmit() {
  loading.value = true
  error.value = null

  try {
    await authService.resetPassword({
      token,
      email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })
    done.value = true
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al restablecer la contraseña'
  } finally {
    loading.value = false
  }
}
</script>
