<script setup lang="ts">
import GoogleIcon from './icons/GoogleIcon.vue'

defineProps({ text: String })

const BACKEND_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

function handleGoogleLogin() {
  window.location.href = `${BACKEND_URL}/auth/google/redirect`
}
</script>

<template>
  <button
    type="button"
    @click="handleGoogleLogin"
    class="w-full flex items-center justify-center gap-3 border border-border rounded-full py-3 hover:bg-surface-raised transition-colors"
  >
    <GoogleIcon />
    <span class="text-sm text-foreground font-medium">{{ text }}</span>
  </button>
</template>
