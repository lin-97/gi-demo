<template>
  <template v-if="appStore.layout === 'left'">
    <LayoutDefault></LayoutDefault>
  </template>
  <template v-if="appStore.layout === 'top'">
    <LayoutTop></LayoutTop>
  </template>
  <template v-else>
    <LayoutDefault></LayoutDefault>
  </template>
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import LayoutTop from './LayoutTop.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
