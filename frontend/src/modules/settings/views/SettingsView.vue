<script setup lang="ts">
import SettingsUserInfo from '../components/SettingsUserInfo.vue'
import SettingsChangePassword from '../components/SettingsChangePassword.vue'
import SettingsNotifications from '../components/SettingsNotifications.vue'
import SettingsLogout from '../components/SettingsLogout.vue'
</script>

<template>
  <section class="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4">
    <h1 class="text-foreground text-2xl font-semibold">Ajustes</h1>

    <SettingsUserInfo />
    <SettingsChangePassword />
    <SettingsNotifications />
    <SettingsLogout />
  </section>
</template>
