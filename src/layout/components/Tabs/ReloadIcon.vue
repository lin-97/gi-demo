<template>
  <icon-refresh class="reload-icon" :class="{ 'reload-icon--spin': loading }" :size="18" @click="reload" />
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const loading = ref(false)
// 重载页面
const reload = () => {
  if (loading.value) return
  loading.value = true
  appStore.reloadPage()
  setTimeout(() => {
    loading.value = false
  }, 600)
}
</script>

<style lang="scss" scoped>
.reload-icon {
  cursor: pointer;
  &--spin {
    animation-name: arco-loading-circle;
    animation-duration: 0.6s;
  }
}
</style>
