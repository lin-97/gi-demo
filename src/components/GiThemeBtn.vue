<template>
  <a-button size="mini" class="gi_hover_btn" @click="handleToggleTheme">
    <template #icon>
      <icon-sun-fill :size="18" v-if="themeStore.theme === 'light'"></icon-sun-fill>
      <icon-moon-fill :size="18" v-else></icon-moon-fill>
    </template>
  </a-button>
</template>

<script setup lang="ts" name="GiThemeBtn">
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
const toggleTheme = useToggle(isDark)

const handleToggleTheme = () => {
  toggleTheme()
}
</script>
