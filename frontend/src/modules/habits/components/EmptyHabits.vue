<template>
  <div class="flex flex-col items-center justify-center gap-6 py-16 px-4 text-center">
    <div class="w-24 h-24 rounded-3xl bg-accent-subtle flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="32" rx="5" fill="currentColor" class="text-accent opacity-15" />
        <rect x="6" y="10" width="36" height="32" rx="5" stroke="currentColor" class="text-accent" stroke-width="2.5" />
        <line x1="6" y1="20" x2="42" y2="20" stroke="currentColor" class="text-accent" stroke-width="2.5" />
        <line x1="16" y1="6" x2="16" y2="14" stroke="currentColor" class="text-accent" stroke-width="2.5" stroke-linecap="round" />
        <line x1="32" y1="6" x2="32" y2="14" stroke="currentColor" class="text-accent" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="24" cy="34" r="6" fill="currentColor" class="text-accent" />
        <line x1="24" y1="30" x2="24" y2="38" stroke="white" stroke-width="2" stroke-linecap="round" />
        <line x1="20" y1="34" x2="28" y2="34" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>

    <div class="flex flex-col gap-1">
      <h2 class="text-foreground text-xl font-semibold">No hay hábitos aún</h2>
      <p class="text-muted-foreground text-sm max-w-xs">
        Crea tu primer hábito y empieza a construir una mejor versión de ti.
      </p>
    </div>

    <div class="flex items-center gap-2 text-muted-foreground text-xs">
      <div class="w-8 h-px bg-border" />
      <span>Presiona el</span>
      <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-accent-foreground">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
      <span>para comenzar</span>
      <div class="w-8 h-px bg-border" />
    </div>
    </div>
</template>
