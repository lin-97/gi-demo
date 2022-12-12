<template>
  <component :is="iconMap[props.type]"></component>
</template>

<script setup lang="ts">
import LoadingIcon1 from './LoadingIcon1.vue'
import LoadingIcon2 from './LoadingIcon2.vue'
import LoadingIcon3 from './LoadingIcon3.vue'
import type { LoadingIconType } from './type'

interface Props {
  type: LoadingIconType
}

const props = withDefaults(defineProps<Props>(), { type: 'dot' })

const iconMap: any = {
  circle: LoadingIcon1,
  dot: LoadingIcon2,
  round: LoadingIcon3
}
</script>

<style lang="scss" scoped></style>
