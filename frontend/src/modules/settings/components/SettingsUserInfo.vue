<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '../composables/useUser'

const { user, update } = useUser()

const name = ref(user.value.name)
const email = ref(user.value.email)
const editing = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

function startEdit() {
  name.value = user.value.name
  email.value = user.value.email
  editing.value = true
  error.value = null
  success.value = false
}

function cancel() {
  editing.value = false
  error.value = null
}

async function save() {
  error.value = null
  saving.value = true

  try {
    await update({ name: name.value, email: email.value })
    success.value = true
    editing.value = false
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al guardar los cambios'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="bg-surface rounded-2xl border border-border overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-border">
      <span class="text-sm font-medium text-foreground">Perfil</span>
      <button
        v-if="!editing"
        @click="startEdit"
        class="text-xs text-accent hover:text-accent-hover font-medium transition-colors"
      >
        Editar
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

    <p v-if="success && !editing" class="px-4 py-2 text-xs text-success">Perfil actualizado correctamente</p>
    <p v-if="error" class="px-4 py-2 text-xs text-danger">{{ error }}</p>

    <div class="flex flex-col divide-y divide-border">
      <div class="flex flex-col gap-0.5 px-4 py-3">
        <span class="text-xs text-muted-foreground">Nombre</span>
        <input
          v-if="editing"
          v-model="name"
          type="text"
          class="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Tu nombre"
        />
        <span v-else class="text-sm text-foreground">{{ user.name || '—' }}</span>
      </div>

      <div class="flex flex-col gap-0.5 px-4 py-3">
        <span class="text-xs text-muted-foreground">Correo</span>
        <input
          v-if="editing"
          v-model="email"
          type="email"
          class="bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="tu@correo.com"
        />
        <span v-else class="text-sm text-foreground">{{ user.email || '—' }}</span>
      </div>
    </div>
  </div>
</template>
