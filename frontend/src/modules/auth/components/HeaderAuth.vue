<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()

</script>

<template>
        <div class="flex flex-col items-center gap-3">
      <div class="relative">
        <div class="w-20 h-20  flex items-center justify-center">
          <img src="/logo.png" alt="">
        </div>
        <div class="absolute -top-1 -right-2 w-3 h-3 bg-accent rounded-full"></div>
        <div class="absolute -bottom-1 -right-4 w-5 h-5 bg-accent rounded-full opacity-60"></div>
      </div>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-foreground">{{ title }}</h1>
        <p class="text-sm text-muted-foreground mt-1">{{ description }}</p>
      </div>
    </div>
</template>