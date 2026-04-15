<script setup lang="ts">
import { useLocalStorage } from '@/shared/composables/useLocalStorage'

const notificationsEnabled = useLocalStorage('notifications_enabled', true)
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border overflow-hidden">
    <div class="px-4 py-3 border-b border-border">
      <span class="text-sm font-medium text-foreground">Opciones</span>
    </div>

    <div class="flex items-center justify-between px-4 py-4">
      <div class="flex flex-col gap-0.5">
        <span class="text-sm text-foreground">Notificaciones</span>
        <span class="text-xs text-muted-foreground">Recibir recordatorios de hábitos</span>
      </div>

      <button
        @click="notificationsEnabled = !notificationsEnabled"
        :class="[
          'relative w-11 h-6 rounded-full transition-colors duration-200',
          notificationsEnabled ? 'bg-accent' : 'bg-border'
        ]"
      >
        <span
          :class="[
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
            notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
          ]"
        />
      </button>
    </div>
  </div>
</template>
