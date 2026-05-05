<script setup lang="ts">
import InfoTooltip from '@/shared/components/InfoTooltip.vue'
import type { CategoryStat } from '../types/stats.types'

defineProps<{ categories: CategoryStat[] }>()
</script>

<template>
  <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-foreground">Por categoría</p>
      <InfoTooltip text="Cumplimiento medio agrupado por categoría. Te ayuda a ver en qué áreas de tu vida eres más constante." />
    </div>
    <div class="flex flex-col gap-3">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="flex items-center gap-3"
      >
        <span class="text-sm text-foreground w-17 truncate flex-shrink-0">{{ cat.name }}</span>
        <div class="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            class="h-full bg-accent rounded-full transition-all duration-500"
            :style="{ width: `${cat.rate}%` }"
          />
        </div>
        <span class="text-sm font-semibold text-foreground w-10 text-right flex-shrink-0">{{ cat.rate }}%</span>
      </div>
    </div>
  </div>
</template>
