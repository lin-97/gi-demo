<template>
  <component :is="iconMap[type]"></component>
</template>

<script setup lang="ts">
import { reactive, type PropType } from 'vue'
import LoadingIcon1 from './LoadingIcon1.vue'
import LoadingIcon2 from './LoadingIcon2.vue'

type LoadingIconType = 'normal' | 'dot'

defineProps({
  type: {
    type: String as PropType<LoadingIconType>,
    default: 'normal'
  }
})

const iconMap: any = reactive({
  normal: LoadingIcon1,
  dot: LoadingIcon2
})
</script>

<style lang="scss" scoped></style>
