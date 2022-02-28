<template>
  <a-button class="toggle-theme-btn" size="mini" @click="toggleTheme">
    <template #icon>
      <component :size="18" :is="themeStore.theme === 'light' ? 'icon-sun-fill' : 'icon-moon-fill'"></component>
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {
    themeStore.toggleTheme(dark)
  }
})

// 切换主题
const toggleTheme = useToggle(isDark)
</script>

<style lang="scss" scoped>
.toggle-theme-btn {
  border: 0;
  &:hover {
    background: var(--color-secondary-hover);
  }
  &:active {
    background: var(--color-secondary-active);
  }
}
</style>
