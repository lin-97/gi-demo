<!--
  @file GiThemeBtn 组件 - 主题切换按钮
  @description 提供明暗主题切换功能，支持本地存储和自动同步状态
-->
<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <template #icon>
      <icon-sun-fill v-if="appStore.theme === 'light'" :size="18" />
      <icon-moon-fill v-else :size="18" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/stores'

defineOptions({ name: 'GiThemeBtn' })
const appStore = useAppStore()

/**
 * 暗色主题状态管理
 * @description 使用 vueuse 的 useDark 来管理主题状态
 * 通过监听主题变化同步到 appStore
 */
const isDark = useDark({
  // 主题切换目标元素
  selector: 'body',
  // 主题属性名
  attribute: 'arco-theme',
  // 暗色主题值
  valueDark: 'dark',
  // 亮色主题值
  valueLight: 'light',
  // 本地存储键名
  storageKey: 'arco-theme',
  // 主题变化回调
  onChanged(dark: boolean) {
    // 同步主题状态到 store
    appStore.toggleTheme(dark)
  }
})

/** 主题切换函数 */
const toggleTheme = useToggle(isDark)

/**
 * 处理主题切换事件
 * @description 点击按钮时触发主题切换
 */
const handleToggleTheme = () => {
  toggleTheme()
}
</script>
