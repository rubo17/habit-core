<script setup lang="ts">
import { useAuth } from '@/modules/auth/composables/useAuth'

const { logout, loading } = useAuth()
</script>

<template>
  <section class="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
    <h1 class="text-foreground text-2xl font-semibold">Ajustes</h1>

    <div class="bg-surface rounded-2xl border border-border overflow-hidden">
      <button
        @click="logout"
        :disabled="loading"
        class="w-full flex items-center gap-3 px-4 py-4 text-danger hover:bg-danger-subtle transition-colors duration-150 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span class="font-medium">{{ loading ? 'Cerrando sesión...' : 'Cerrar sesión' }}</span>
      </button>
    </div>
  </section>
</template>
