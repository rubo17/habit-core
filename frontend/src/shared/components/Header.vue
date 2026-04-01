<script setup lang="ts">
import NavBar from './NavBar.vue';
import ThemeToggle from './ThemeToggle.vue';

</script>

<template>
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
</template>