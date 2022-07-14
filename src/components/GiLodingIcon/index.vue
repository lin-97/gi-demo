<template>
  <component :is="loadingCom"></component>
</template>

<script setup lang="ts">
import { reactive, markRaw, type PropType } from 'vue'
import LoadingIcon1 from './LoadingIcon1.vue'
import LoadingIcon2 from './LoadingIcon2.vue'

type LoadingIconType = 'normal' | 'dot'

const props = defineProps({
  type: {
    type: String as PropType<LoadingIconType>,
    default: 'normal'
  }
})

const iconMap: any = reactive({
  normal: markRaw(LoadingIcon1),
  dot: markRaw(LoadingIcon2)
})

const loadingCom = iconMap[props.type]
</script>

<style lang="scss" scoped></style>
