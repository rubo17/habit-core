<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../services/auth.service'
import { useUser } from '@/modules/settings/composables/useUser'

const route = useRoute()
const router = useRouter()
const { user } = useUser()

onMounted(async () => {
  const token = route.query.token as string | undefined

  if (!token) {
    router.replace({ name: 'login' })
    return
  }

  localStorage.setItem('token', token)
  const { data: fetchedUser } = await authService.getCurrentUser()
  user.value = fetchedUser
  router.replace({ name: 'habits' })
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <p class="text-muted-foreground text-sm">Autenticando...</p>
  </div>
</template>
