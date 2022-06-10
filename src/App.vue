<template>
  <a-config-provider size="small">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts" name="App">
import { useAppStore, useThemeStore } from '@/store'
const appStore = useAppStore()
const themeStore = useThemeStore()

appStore.initTime()
themeStore.initTheme()
</script>
