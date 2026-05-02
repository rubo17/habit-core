<script setup lang="ts">
defineProps<{
  periods: { label: string; value: 7 | 30 | 90 }[]
  period: 7 | 30 | 90
}>()

defineEmits<{ change: [value: 7 | 30 | 90] }>()
</script>

<template>
  <div class="flex gap-1 bg-surface-raised rounded-xl p-1">
    <button
      v-for="p in periods"
      :key="p.value"
      type="button"
      @click="$emit('change', p.value)"
      :class="[
        'px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-150',
        period === p.value
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground',
      ]"
    >
      {{ p.label }}
    </button>
  </div>
</template>
