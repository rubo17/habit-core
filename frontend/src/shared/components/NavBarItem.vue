<template>
  <!-- Desktop -->
  <RouterLink
    v-if="variant === 'desktop'"
    :to="to"
    class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
    :class="isActive
      ? 'bg-accent text-accent-foreground shadow-sm'
      : 'text-muted-foreground hover:text-foreground hover:bg-background'"
  >
    <AppIcon :name="icon" :size="16" />
    <span>{{ label }}</span>
  </RouterLink>

  <!-- Mobile -->
  <button
    v-else
    @click="$router.push(to)"
    class="flex flex-col items-center gap-1 px-5 py-2 transition-colors duration-200"
    :class="isActive ? 'text-accent' : 'text-muted-foreground'"
  >
    <AppIcon :name="icon" :size="22" />
    <span class="text-[10px] font-medium">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppIcon, { type IconName } from './icons/AppIcon.vue'

const props = defineProps<{
  to: string
  icon: IconName
  label: string
  variant?: 'desktop' | 'mobile'
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>
