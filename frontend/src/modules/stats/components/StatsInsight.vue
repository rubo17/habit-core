<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>

<template>
  <div class="bg-surface-raised border-l-4 border-accent rounded-xl px-4 py-3">
    <p class="text-sm text-foreground">{{ message }}</p>
  </div>
</template>
