<script setup lang="ts">
    defineProps<{
        title: string     
        loading: boolean
    }>()
</script>
<template>
          <button
        type="submit"
        class="w-full bg-accent hover:bg-accent-hover text-accent-foreground font-semibold tracking-widest rounded-full py-4 transition-colors mt-2 disabled:opacity-50"
        :disabled="loading"
      >
        {{ loading ? '...' : title }}
      </button>
</template>