<!--
  @file ReloadIcon 组件
  @description 页面重载图标组件，支持加载动画效果
-->
<template>
  <icon-refresh class="reload-icon" :class="{ 'reload-icon--loading': isLoading }" :size="ICON_SIZE"
    @click="handleReload" />
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'ReloadIcon' })

/** 常量定义 */
const ICON_SIZE = 18
const RELOAD_DURATION = 600

/** 状态管理 */
const tabsStore = useTabsStore()
const isLoading = ref(false)

/** 处理重载操作 */
const handleReload = () => {
  if (isLoading.value) return

  isLoading.value = true
  tabsStore.reloadPage()

  setTimeout(() => {
    isLoading.value = false
  }, RELOAD_DURATION)
}
</script>

<style lang="scss" scoped>
.reload-icon {
  cursor: pointer;

  &--loading {
    animation-name: arco-loading-circle;
    animation-duration: 0.6s;
  }
}
</style>
