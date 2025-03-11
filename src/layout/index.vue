<template>
  <LayoutMix v-if="appStore.layout === 'mix'"></LayoutMix>
  <LayoutTop v-else-if="appStore.layout === 'top'"></LayoutTop>
  <LayoutDefault v-else></LayoutDefault>
</template>

<script setup lang="ts">
import LayoutDefault from './LayoutDefault.vue'
import LayoutMix from './LayoutMix.vue'
import LayoutTop from './LayoutTop.vue'
import { useAppStore } from '@/stores'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
