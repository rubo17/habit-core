<script setup lang="ts">
import GoogleIcon from './icons/GoogleIcon.vue';

defineProps({
    text:String
})
</script>
<template>
          <button
        type="button"
        class="w-full flex items-center justify-center gap-3 border border-border rounded-full py-3 hover:bg-surface-raised transition-colors"
      >
        <GoogleIcon/>
        <span class="text-sm text-foreground font-medium">{{ text }}</span>
      </button>
</template>