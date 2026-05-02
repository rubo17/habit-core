<script setup lang="ts">
import { watch, onUnmounted, computed } from 'vue'
import { useBreakpoint } from '../composables/useBreakpoint'
import CloseIcon from './icons/CloseIcon.vue';

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  level?: 1 | 2
}>(), { size: 'md', level: 1 })

const zBackdrop  = computed(() => props.level === 2 ? 'z-60' : 'z-40')
const zContent   = computed(() => props.level === 2 ? 'z-70' : 'z-50')
const backdropBg = computed(() => props.level === 2 ? 'bg-black/60 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm')

const emit = defineEmits<{ close: [] }>()

const { isMobile } = useBreakpoint()

const sizeClass: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.open, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        :class="['fixed inset-0', backdropBg, zBackdrop]"
        @click="emit('close')"
      />
    </Transition>

    <!-- Mobile: bottom sheet -->
    <Transition
      v-if="isMobile"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="open"
        :class="['fixed inset-x-0 bottom-0 bg-surface rounded-t-2xl shadow-xl', zContent]"
      >
        <div class="flex justify-center pt-3 pb-1">
          <div class="w-10 h-1 rounded-full bg-border" />
        </div>

        <div v-if="title" class="flex items-center justify-between px-5 pt-2 pb-3">
          <h2 class="text-foreground font-semibold text-lg">{{ title }}</h2>
          <button
            @click="emit('close')"
            class="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors duration-150"
          >
            <CloseIcon /> 
          </button>
        </div>

        <div class="px-5 pb-8">
          <slot />
        </div>
      </div>
    </Transition>

    <!-- Desktop: popup central -->
    <Transition
      v-else
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        :class="['fixed inset-0 flex items-center justify-center px-4', zContent]"
        @click.self="emit('close')"
      >
        <div :class="['w-full bg-surface rounded-2xl shadow-xl overflow-hidden', sizeClass[size]]">
          <div v-if="title" class="flex items-center justify-between px-5 pt-5 pb-3">
            <h2 class="text-foreground font-semibold text-lg">{{ title }}</h2>
            <button
              @click="emit('close')"
              class="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors duration-150"
            >
              <CloseIcon />
            </button>
          </div>

          <div class="px-5 pb-5">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
