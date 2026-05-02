<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    @click="$emit('click')"
    class="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-foreground font-medium transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
