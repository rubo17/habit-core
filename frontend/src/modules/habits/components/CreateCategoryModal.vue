<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import HabitIcon from '@/shared/components/icons/HabitIcon.vue'
import HabitIconPicker from './HabitIconPicker.vue'
import { useCategories } from '../composables/useCategories'
import type { HabitCategory } from '../types/habit.types'
import DefaultCategoryIcon from './icons/DefaultCategoryIcon.vue'

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: []; created: [category: HabitCategory] }>()

const { createCategory } = useCategories()

const name = ref('')
const selectedIcon = ref<string | null>(null)
const showIconPicker = ref(false)
const loading = ref(false)

function close() {
  name.value = ''
  selectedIcon.value = null
  showIconPicker.value = false
  emit('close')
}

async function submit() {
  if (!name.value.trim()) return
  loading.value = true
  try {
    const category = await createCategory(name.value.trim(), selectedIcon.value)
    emit('created', category)
    close()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <BaseModal title="Nueva categoría" :open="isOpen" size="sm" :level="2" @close="close">
    <div class="flex flex-col gap-4 pt-1">

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="showIconPicker = !showIconPicker"
          class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-accent text-accent-foreground transition-transform duration-150 active:scale-95"
        >
          <HabitIcon v-if="selectedIcon" :name="selectedIcon" :size="22" />
          <DefaultCategoryIcon v-else class="w-8 h-8" />
        </button>

        <input
          v-model="name"
          type="text"
          placeholder="Nombre de la categoría"
          maxlength="60"
          autofocus
          @keydown.enter="submit"
          class="flex-1 bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow duration-150"
        />
      </div>

      <div v-show="showIconPicker" class="flex flex-col gap-2">
        <p class="text-xs font-medium text-muted-foreground">Icono</p>
        <div class="max-h-52 overflow-y-auto pr-1">
          <HabitIconPicker
            :model-value="selectedIcon!"
            @update:model-value="(val) => { selectedIcon = val; showIconPicker = false }"
          />
        </div>
      </div>

      <BaseButton :disabled="!name.trim() || loading" @click="submit">
        Crear
      </BaseButton>

    </div>
  </BaseModal>
</template>
