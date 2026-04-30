<script setup lang="ts">
import SettingsUserInfo from '../components/SettingsUserInfo.vue'
import SettingsChangePassword from '../components/SettingsChangePassword.vue'
import SettingsNotifications from '../components/SettingsNotifications.vue'
import SettingsLogout from '../components/SettingsLogout.vue'
import BaseSection from '@/shared/components/BaseSection.vue';
</script>

<template>
    <BaseSection>
        <h1 class="text-foreground text-2xl font-semibold">Ajustes</h1>
        <SettingsUserInfo />
        <SettingsChangePassword />
        <SettingsNotifications />
        <SettingsLogout />
    </BaseSection>
</template>
