<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g v-html="icon?.svg" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { habitIconMap } from '@/constants/habitIcons'

const props = withDefaults(defineProps<{ name: string; size?: number }>(), { size: 24 })

const icon = computed(() => habitIconMap[props.name])
</script>
