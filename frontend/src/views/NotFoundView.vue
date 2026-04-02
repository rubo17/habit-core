<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 gap-6">

    <div class="text-center">
      <p class="text-8xl font-bold text-accent">404</p>
      <h1 class="text-2xl font-semibold mt-2">Página no encontrada</h1>
      <p class="text-muted-foreground mt-1 text-sm">La ruta que buscas no existe.</p>
    </div>

    <RouterLink
      :to="{ name: 'habits' }"
      class="bg-accent hover:bg-accent-hover text-accent-foreground font-semibold rounded-full px-8 py-3 transition-colors"
    >
      Volver al inicio
    </RouterLink>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
