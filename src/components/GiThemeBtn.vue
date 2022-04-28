<template>
  <a-button size="mini" class="gi_hover_btn" @click="onToggleThemeDark">
    <template #icon>
      <icon-sun-fill :size="18" v-if="theme === 'light'"></icon-sun-fill>
      <icon-moon-fill :size="18" v-else></icon-moon-fill>
    </template>
  </a-button>
</template>

<script setup lang="ts" name="GiThemeBtn">
import { useThemeDark } from '@/hooks'
const { theme, onToggleThemeDark } = useThemeDark()
</script>
