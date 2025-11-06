<!--
  @file Layout 组件
  @description 布局根组件，支持默认布局、混合布局和顶部布局三种模式
-->
<template>
  <!-- 使用静态组件避免不必要的动态组件切换开销 -->
  <LayoutMix v-if="appStore.layout === 'mix'" />
  <LayoutTop v-else-if="appStore.layout === 'top'" />
  <LayoutColumns v-else-if="appStore.layout === 'columns'" />
  <LayoutDefault v-else />
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'Layout' })

// 优化异步组件加载：添加预加载注释，设置合理的加载策略
const LayoutDefault = defineAsyncComponent({
  loader: () => import('./LayoutDefault.vue'),
  delay: 0, // 立即显示加载状态
  timeout: 10000 // 避免加载超时
})

// 对于非默认布局，添加预加载
const LayoutColumns = defineAsyncComponent({
  loader: () => import('./LayoutColumns.vue'),
  delay: 0
})

const LayoutMix = defineAsyncComponent({
  loader: () => import('./LayoutMix.vue'),
  delay: 0
})

const LayoutTop = defineAsyncComponent({
  loader: () => import('./LayoutTop.vue'),
  delay: 0
})

const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
