<template>
  <component :is="iconMap[props.type]"></component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import LoadingIcon1 from './LoadingIcon1.vue'
import LoadingIcon2 from './LoadingIcon2.vue'

type LoadingIconType = 'circle' | 'dot'

const props = defineProps({
  type: {
    type: String as PropType<LoadingIconType>,
    default: 'circle'
  }
})

const iconMap: any = {
  circle: LoadingIcon1,
  dot: LoadingIcon2
}
</script>

<style lang="scss" scoped></style>
