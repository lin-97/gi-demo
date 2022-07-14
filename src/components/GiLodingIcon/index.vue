<template>
  <component :is="iconMap[props.type]"></component>
</template>

<script setup lang="ts">
import { reactive, markRaw, type PropType } from 'vue'
import LoadingIcon1 from './LoadingIcon1.vue'
import LoadingIcon2 from './LoadingIcon2.vue'

type LoadingIconType = 'circle' | 'dot'

const props = defineProps({
  type: {
    type: String as PropType<LoadingIconType>,
    default: 'circle'
  }
})

const iconMap: any = reactive({
  circle: markRaw(LoadingIcon1),
  dot: markRaw(LoadingIcon2)
})
</script>

<style lang="scss" scoped></style>
