<template>
  <!-- Desktop -->
  <nav v-if="variant === 'desktop'" class="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-surface-raised border border-border">
    <NavBarItem
      v-for="link in links"
      :key="link.to"
      v-bind="link"
      variant="desktop"
    />
  </nav>

  <!-- Mobile: bottom nav -->
  <nav v-else class="md:hidden fixed bottom-0 left-0 right-0 h-16
              bg-surface/90 backdrop-blur-md
              border-t border-border
              flex justify-around items-center">
    <NavBarItem
      v-for="link in links"
      :key="link.to"
      v-bind="link"
      variant="mobile"
    />
  </nav>
</template>

<script setup lang="ts">
import NavBarItem from './NavBarItem.vue'
import type { IconName } from './icons/AppIcon.vue'

defineProps<{
  variant?: 'desktop' | 'mobile'
}>()

const links: { to: string; icon: IconName; label: string }[] = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '#', icon: 'chart', label: 'Stats' },
  { to: '#', icon: 'settings', label: 'Settings' },
]
</script>
