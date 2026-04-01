<template>
  <component :is="icons[name]" :size="size" />
</template>

<script setup lang="ts">
import IconHome from './IconHome.vue'
import IconChart from './IconChart.vue'
import IconSettings from './IconSettings.vue'

const icons = {
  home: IconHome,
  chart: IconChart,
  settings: IconSettings,
} as const

export type IconName = keyof typeof icons

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 24 })
</script>
