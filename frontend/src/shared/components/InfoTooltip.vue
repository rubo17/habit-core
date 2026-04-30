<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ text: string }>()

const visible = ref(false)
</script>

<template>
  <div class="relative">
    <button
      type="button"
      @click.stop="visible = !visible"
      class="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-150"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="visible" class="fixed inset-0 z-10" @click="visible = false" />

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="visible"
        class="absolute right-0 top-6 z-20 w-56 bg-surface border border-border rounded-xl px-3 py-2.5 shadow-xl"
      >
        <p class="text-xs text-muted-foreground leading-relaxed">{{ text }}</p>
      </div>
    </Transition>
  </div>
</template>
