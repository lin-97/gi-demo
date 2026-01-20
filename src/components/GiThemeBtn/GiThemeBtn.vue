<template>
  <a-button size="mini" class="gi_hover_btn" @click="toggleTheme">
    <template #icon>
      <icon-sun-fill v-if="!isDark" :size="18" />
      <icon-moon-fill v-else :size="18" />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks'

defineOptions({ name: 'GiThemeBtn' })

const { isDark, toggleTheme } = useTheme()
</script>
