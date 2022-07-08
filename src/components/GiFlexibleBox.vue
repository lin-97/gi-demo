<template>
  <div ref="boxRef" class="gi-flexible-box" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: 'right'
  }
})

const boxRef = ref()

const style = computed(() => {
  const obj: any = {}
  obj[`margin-${props.direction}`] =
    !props.modelValue && boxRef.value && boxRef.value.clientWidth ? `-${boxRef.value.clientWidth}px` : 0
  return obj
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.gi-flexible-box {
  transition: all 0.36s;
}
</style>
