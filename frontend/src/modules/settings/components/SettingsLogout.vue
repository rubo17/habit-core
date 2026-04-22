<script setup lang="ts">
import LogoutIcon from '@/shared/components/icons/LogoutIcon.vue'
import { useAuth } from '@/modules/auth/composables/useAuth'

const { logout, loading } = useAuth()
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border overflow-hidden">
    <button
      @click="logout"
      :disabled="loading"
      class="w-full flex items-center gap-3 px-4 py-4 text-danger hover:bg-danger-subtle transition-colors duration-150 disabled:opacity-50"
    >
      <LogoutIcon />
      <span class="font-medium">{{ loading ? 'Cerrando sesión...' : 'Cerrar sesión' }}</span>
    </button>
  </div>
</template>
