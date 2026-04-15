<script setup lang="ts">
import { ref } from 'vue'
import { userService } from '../services/user.service'

const currentPassword = ref('')
const newPassword = ref('')
const confirmation = ref('')
const saving = ref(false)
const error = ref<string | null>(null)
const success = ref(false)
const editing = ref(false)

function startEdit() {
  editing.value = true
  error.value = null
  success.value = false
}

function cancel() {
  editing.value = false
  currentPassword.value = ''
  newPassword.value = ''
  confirmation.value = ''
  error.value = null
}

async function save() {
  error.value = null
  success.value = false

  if (newPassword.value !== confirmation.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  saving.value = true

  try {
    await userService.updatePassword({
      current_password: currentPassword.value,
      password: newPassword.value,
      password_confirmation: confirmation.value,
    })
    success.value = true
    cancel()
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al cambiar la contraseña'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border">
      <span class="text-sm font-medium text-foreground">Contraseña</span>
      <button
        v-if="!editing"
        @click="startEdit"
        class="text-xs text-accent hover:text-accent-hover font-medium transition-colors"
      >
        Cambiar
      </button>
      <div v-else class="flex gap-3">
        <button
          @click="cancel"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="save"
          :disabled="saving"
          class="text-xs text-accent hover:text-accent-hover font-medium transition-colors disabled:opacity-50"
        >
          {{ saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </div>

    <div v-if="!editing" class="px-4 py-3">
      <span v-if="success" class="text-xs text-success">Contraseña actualizada correctamente</span>
      <span v-else class="text-sm text-muted-foreground">••••••••</span>
    </div>

    <div v-else class="flex flex-col divide-y divide-border">
      <div class="flex flex-col gap-0.5 px-4 py-3">
        <span class="text-xs text-muted-foreground">Contraseña actual</span>
        <input
          v-model="currentPassword"
          type="password"
          class="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="••••••••"
        />
      </div>
      <div class="flex flex-col gap-0.5 px-4 py-3">
        <span class="text-xs text-muted-foreground">Nueva contraseña</span>
        <input
          v-model="newPassword"
          type="password"
          class="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Mínimo 8 caracteres"
        />
      </div>
      <div class="flex flex-col gap-0.5 px-4 py-3">
        <span class="text-xs text-muted-foreground">Confirmar contraseña</span>
        <input
          v-model="confirmation"
          type="password"
          class="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Repite la contraseña"
        />
      </div>
    </div>

    <p v-if="error" class="px-4 py-2 text-xs text-danger">{{ error }}</p>
  </div>
</template>
