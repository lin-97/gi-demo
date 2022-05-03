<template>
  <a-config-provider size="small">
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts" name="App">
import { useTimeStore } from '@/store'
const timeStore = useTimeStore()

timeStore.initTime()
</script>
