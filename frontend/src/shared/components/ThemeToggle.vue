<template>
  <div class="theme-toggle cursor-pointer" title="Toggle theme" @click="toggleTheme">
    <!-- Sol: visible en dark mode para cambiar a light -->
    <svg
      v-if="theme === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
      stroke-linecap="round"
      viewBox="0 0 32 32"
    >
      <g stroke="currentColor" stroke-width="1.5">
        <circle cx="16" cy="16" r="9.34" fill="currentColor" stroke="none" />
        <path d="M16 5.5v-4" />
        <path d="M16 30.5v-4" />
        <path d="M1.5 16h4" />
        <path d="M26.5 16h4" />
        <path d="m23.4 8.6 2.8-2.8" />
        <path d="m5.7 26.3 2.9-2.9" />
        <path d="m5.8 5.8 2.8 2.8" />
        <path d="m23.4 23.4 2.9 2.9" />
      </g>
    </svg>

    <!-- Luna: visible en light mode para cambiar a dark -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M13.5 3a13 13 0 1 0 15.5 15.5A10 10 0 0 1 13.5 3z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/shared/composables/useDarkMode'

const { theme, toggleTheme } = useDarkMode()
</script>
