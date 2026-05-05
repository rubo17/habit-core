<script setup lang="ts">
defineProps<{
  scheduleSummary: string
}>()

</script>

<template>
    <button
        type="button"
        class="flex items-center justify-between w-full bg-surface-raised rounded-xl px-4 py-3 transition-colors duration-150 hover:bg-border"
      >
        <span class="text-sm font-medium text-foreground">Horarios y notificaciones</span>
        <div class="flex items-center gap-2">
          <span class="text-sm text-muted-foreground truncate max-w-36">{{ scheduleSummary }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-muted-foreground shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z" clip-rule="evenodd" />
          </svg>
        </div>
      </button>
</template>