<template>
  <div class="gi-flex" :class="getClass" :style="getStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { FlexProps as Props } from './type'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  column: false,
  justify: 'start',
  align: 'center',
  wrap: true,
  gap: 0
})

/** 计算组件的 class */
const getClass = computed(() => {
  const arr: string[] = []
  if (props.wrap) {
    arr.push('gi-flex__wrap')
  }
  if (props.column) {
    arr.push('gi-flex__column')
  }
  return arr.join(' ')
})

/** 计算组件的样式 */
const getStyle = computed((): CSSProperties => {
  const style: CSSProperties = {
    'justify-content': props.justify,
    'align-items': props.align
  }
  if (typeof props.gap === 'number') {
    style.gap = `${props.gap}px`
  } else {
    style.gap = props.gap
  }
  style.flex = props.flex
  return style
})
</script>

<style lang="scss" scoped>
.gi-flex {
  display: flex;

  &.gi-flex__wrap {
    flex-wrap: wrap;
  }

  &.gi-flex__column {
    flex-direction: column;
  }
}
</style>
