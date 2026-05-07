<script setup lang="ts">
import NavBar from './NavBar.vue';
import ThemeToggle from './ThemeToggle.vue';

</script>

<template>
    <header class="sticky top-0 z-50 h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="relative flex items-center justify-center w-9 h-9">
          <img 
            src="/logo.png" 
            alt="HabitCore Logo" 
            class="w-full h-full  group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        <span class="font-bold text-xl tracking-tight text-foreground bg-clip-text">
          Habit<span class="text-accent">Core</span>
        </span>
      </div>

        <NavBar variant="desktop" />

        <ThemeToggle />

    </header>
</template>