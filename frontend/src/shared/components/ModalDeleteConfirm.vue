<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  open: boolean
  title?: string
  description?: string
  confirmLabel?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <BaseModal
    :open="open"
    :title="title ?? 'Eliminar'"
    size="sm"
    @close="emit('close')"
  >
    <div class="flex flex-col gap-5 pt-1">
      <p class="text-sm text-muted-foreground">
        {{ description ?? '¿Estás seguro de que quieres eliminar esto? Esta acción no se puede deshacer.' }}
      </p>

      <div class="flex gap-3">
        <button
          type="button"
          :disabled="loading"
          @click="emit('close')"
          class="flex-1 py-3 rounded-xl bg-surface-raised text-foreground font-medium hover:bg-border transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cancelar
        </button>

        <button
          type="button"
          :disabled="loading"
          @click="emit('confirm')"
          class="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {{ confirmLabel ?? 'Eliminar' }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>
