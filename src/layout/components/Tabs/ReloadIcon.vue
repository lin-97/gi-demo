<!--
  @file ReloadIcon 组件
  @description 页面重载图标组件，支持加载动画效果
-->
<template>
  <svg width="17" height="17" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="reload-icon"
    @click="handleReload">
    <path d="M42 8V24" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="round" />
    <path d="M6 24L6 40" stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="round" />
    <path
      d="M42 24C42 14.0589 33.9411 6 24 6C18.9145 6 14.3216 8.10896 11.0481 11.5M6 24C6 33.9411 14.0589 42 24 42C28.8556 42 33.2622 40.0774 36.5 36.9519"
      stroke="currentColor" stroke-width="4" stroke-linecap="butt" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'ReloadIcon' })

/** 状态管理 */
const tabsStore = useTabsStore()

/** 处理重载操作 */
const handleReload = () => {
  tabsStore.reloadPage()
}
</script>

<style lang="scss" scoped>
.reload-icon {
  cursor: pointer;

  &:hover {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }
}
</style>
