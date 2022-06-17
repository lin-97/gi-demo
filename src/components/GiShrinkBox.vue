<template>
  <div ref="boxRef" class="gi-shrink-box" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const boxRef = ref()

const style = computed(() => {
  const obj: any = {}
  obj['margin-right'] =
    !props.modelValue && boxRef.value && boxRef.value.clientWidth ? `-${boxRef.value.clientWidth}px` : 0
  return obj
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.gi-shrink-box {
  transition: all 0.3s;
}
</style>
