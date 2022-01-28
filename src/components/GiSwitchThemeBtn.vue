<template>
  <a-button class="switch-theme-btn" size="mini" @click="changeTheme">
    <template #icon>
      <component :size="18" :is="app.ThemeMode === 'light' ? 'icon-sun-fill' : 'icon-moon-fill'"></component>
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
const app = useAppStore()

// 暗黑模式切换
const changeTheme = () => {
  if (app.ThemeMode === 'light') {
    app.setThemeMode('dark')
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    app.setThemeMode('light')
    document.body.removeAttribute('arco-theme')
  }
}

// 初始化主题
const initTheme = () => {
  if (app.ThemeMode === 'dark') {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}
initTheme()
</script>

<style lang="scss" scoped>
.switch-theme-btn {
  border: 0;
  &:hover {
    background: var(--color-secondary-hover);
  }
  &:active {
    background: var(--color-secondary-active);
  }
}
</style>
