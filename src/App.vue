<template>
  <a-config-provider size="small">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts" name="App">
import { useAppStore } from '@/store'
const appStore = useAppStore()

appStore.initTime()
</script>
