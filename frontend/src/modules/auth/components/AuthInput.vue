<template>
  <div class="flex flex-col gap-1">
    <div class="relative flex items-center bg-surface-raised rounded-2xl px-4 py-3">
      <div class="flex flex-col flex-1 min-w-0">
        <label class="text-xs text-muted-foreground">{{ label }}</label>
        <input
          :type="inputType"
          :placeholder="placeholder"
          :value="modelValue"
          :autocomplete="autocomplete"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          class="bg-transparent text-foreground text-sm outline-none w-full placeholder:text-muted-foreground"
        />
      </div>
      <button
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="ml-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  label: string
  placeholder?: string
  type?: string
  modelValue: string
  autocomplete?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') return showPassword.value ? 'text' : 'password'
  return props.type ?? 'text'
})
</script>
