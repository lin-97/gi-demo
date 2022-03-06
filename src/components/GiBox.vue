<template>
  <div class="gi-box" :style="getStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal'
  }
})

const getStyle = computed<object>(() => {
  const obj: any = {}
  if (props.direction === 'horizontal' || props.direction === 'h') {
    obj['flex-direction'] = 'row'
  }
  if (props.direction === 'vertical' || props.direction === 'v') {
    obj['flex-direction'] = 'row'
  }
  return obj
})
</script>

<style lang="scss" scoped>
.gi-box {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
