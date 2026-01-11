<!--
  @file GiSpace 组件 - 提供灵活的间距布局容器
  @description 用于处理组件之间的间距关系，支持水平/垂直排列、自动换行等特性
-->
<template>
  <div class="gi-space" :class="getClass" :style="getStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { SpaceProps as Props } from './type'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  size: 8,
  direction: 'horizontal',
  justify: 'start',
  align: 'center',
  wrap: true,
  fill: false
})

/** 间距大小预设值映射 */
const SIZE_MAP = {
  mini: 4,
  small: 8,
  medium: 16,
  large: 24
} as const

/** 计算组件的 class */
const getClass = computed(() => {
  const arr: string[] = []
  if (props.wrap) {
    arr.push('gi-space-wrap')
  }
  if (props.direction) {
    arr.push(`gi-space-direction-${props.direction}`)
  }
  if (props.fill) {
    arr.push('gi-space-fill')
  }
  return arr.join(' ')
})

/** 计算组件的样式 */
const getStyle = computed((): CSSProperties => {
  const style: CSSProperties = {
    'justify-content': props.justify,
    'align-items': props.align
  }

  // 处理间距
  if (Array.isArray(props.size)) {
    const [colGap = 0, rowGap = 0] = props.size
    style.gap = props.wrap ? `${rowGap}px ${colGap}px` : `0 ${colGap}px`
  } else {
    const size = typeof props.size === 'string' && props.size in SIZE_MAP
      ? SIZE_MAP[props.size as keyof typeof SIZE_MAP]
      : props.size
    style.gap = props.wrap ? `${size}px` : `0 ${size}px`
  }

  return style
})
</script>

<style lang="scss" scoped>
.gi-space {
  display: inline-flex;

  &.gi-space-wrap {
    flex-wrap: wrap;
  }

  &.gi-space-fill {
    display: flex;
  }

  &.gi-space-direction {
    &-horizontal {
      flex-direction: row;
    }

    &-vertical {
      flex-direction: column;
    }
  }
}
</style>
