<script setup lang="ts">
defineProps<{
  completed: number
  total: number
  topStreak: number
  topStreakName: string
  consistencyRate: number
  period: number
}>()
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-1">
      <span class="text-2xl font-bold text-foreground leading-none">
        {{ completed }}<span class="text-base font-medium text-muted-foreground">/{{ total }}</span>
      </span>
      <span class="text-xs text-muted-foreground">hábitos hoy</span>
    </div>

    <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-1">
      <span class="text-2xl font-bold text-foreground leading-none">{{ topStreak }} <span class="text-base font-medium text-muted-foreground">de racha</span></span>
      <span class="text-xs text-muted-foreground truncate">({{ topStreakName }})</span>
    </div>

    <div class="bg-surface-raised rounded-2xl p-4 flex flex-col gap-1">
      <span class="text-2xl font-bold text-foreground leading-none">{{ consistencyRate }}<span class="text-base font-medium text-muted-foreground">%</span></span>
      <span class="text-xs text-muted-foreground">en {{ period }} días</span>
    </div>
  </div>
</template>
