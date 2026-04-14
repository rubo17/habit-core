<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">

    <!-- HEADER -->
    <Header />

    <!-- CONTENT -->
    <main class="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 md:px-8">
      <router-view />
    </main>

    <!-- BOTTOM NAV MOBILE -->
    <NavBar />

  </div>
</template>

<script setup lang="ts">
import NavBar from '@/shared/components/NavBar.vue'
import Header from '@/shared/components/Header.vue'

</script>
