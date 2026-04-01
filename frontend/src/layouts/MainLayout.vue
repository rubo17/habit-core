<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- HEADER -->
    <header class="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border">

      <!-- Brand -->
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-accent flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span class="font-bold text-lg tracking-tight">HabitCore</span>
      </div>

      <!-- Desktop Nav -->
      <NavBar variant="desktop" />

      <!-- Theme toggle -->
      <ThemeToggle />

    </header>

    <!-- CONTENT -->
    <main class="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 md:px-8">
      <div class="max-w-lg mx-auto py-6 flex flex-col gap-4">
        <p class="text-sm text-muted-foreground">
          Icono seleccionado: <span class="text-foreground font-medium">{{ selectedIcon || '—' }}</span>
        </p>
        <HabitIconPicker v-model="selectedIcon" />
      </div>
      <router-view />
    </main>

    <!-- BOTTOM NAV MOBILE -->
    <NavBar />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ThemeToggle from '@/shared/components/ThemeToggle.vue'
import NavBar from '@/shared/components/NavBar.vue'
import HabitIconPicker from '@/modules/habits/components/HabitIconPicker.vue'

const selectedIcon = ref('')
</script>
