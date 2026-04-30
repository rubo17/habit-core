<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: number | null | undefined
  options: { value: number | null; label: string }[]
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number | null] }>()

const isOpen = ref(false)

function select(value: number | null) {
  emit('update:modelValue', value)
  isOpen.value = false
}
</script>

<template>
  <div class="flex flex-col">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150 flex items-center justify-between"
      :class="isOpen ? 'rounded-b-none border-b-0' : ''"
    >
      <span :class="modelValue == null ? 'text-muted-foreground' : ''">
        {{ options.find(o => o.value === modelValue)?.label ?? placeholder ?? 'Seleccionar' }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16" height="16"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        class="text-muted-foreground transition-transform duration-150 flex-shrink-0"
        :class="isOpen ? 'rotate-180' : ''"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="border border-t-0 border-border rounded-b-xl overflow-hidden bg-surface-raised"
    >
      <button
        v-for="option in options"
        :key="String(option.value)"
        type="button"
        @click="select(option.value)"
        class="w-full px-4 py-3 text-left text-sm transition-colors duration-100 hover:bg-surface"
        :class="option.value === modelValue ? 'text-accent font-medium' : 'text-foreground'"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
