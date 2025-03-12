<!--
  @file Layout 组件
  @description 布局根组件，支持默认布局、混合布局和顶部布局三种模式
-->
<template>
  <component :is="currentLayout" />
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'
import LayoutTop from './LayoutTop.vue'
import { useAppStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'Layout' })

/** 状态管理 */
const appStore = useAppStore()

/** 布局组件映射 */
const layoutMap = {
  mix: LayoutMix,
  top: LayoutTop,
  default: LayoutDefault
} as const

/** 当前布局组件 */
const currentLayout = computed(() =>
  layoutMap[appStore.layout as keyof typeof layoutMap] || layoutMap.default
)
</script>

<style lang="scss" scoped></style>
