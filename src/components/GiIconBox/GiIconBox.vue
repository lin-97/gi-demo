<!--
  @file GiIconBox 组件 - 图标容器
  @description 提供可自定义的图标容器，支持不同颜色、尺寸和形状
-->
<template>
  <div class="gi-icon-box" :class="getClass" :style="getStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { IconBoxProps as Props } from './type'
import { computed } from 'vue'

const props = withDefaults(defineProps<Props>(), {
  color: '#165DFF',
  size: 20,
  shape: 'square'
})

/** 预设状态颜色 */
const STATUS_COLORS = ['primary', 'success', 'warning', 'danger'] as const

/** 计算容器的 class */
const getClass = computed(() => {
  const classes = [
    STATUS_COLORS.includes(props.color as typeof STATUS_COLORS[number])
    && `gi-icon-box--${props.color}`,
    props.shape && `gi-icon-box__shape--${props.shape}`
  ].filter(Boolean)

  return classes.join(' ')
})

/** 计算容器的样式 */
const getStyle = computed((): CSSProperties => {
  const style: CSSProperties = {}

  // 处理自定义颜色
  if (!STATUS_COLORS.includes(props.color as typeof STATUS_COLORS[number])) {
    style.backgroundColor = props.color
  }

  // 处理自定义尺寸
  if (props.size !== 20) {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
  }

  return style
})
</script>

<style lang="scss" scoped>
.gi-icon-box {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #fff;
  transition: all 0.2s ease;

  // 状态颜色
  &--primary {
    background-color: rgb(var(--primary-6));
  }

  &--success {
    background-color: rgb(var(--success-6));
  }

  &--warning {
    background-color: rgb(var(--warning-6));
  }

  &--danger {
    background-color: rgb(var(--danger-6));
  }

  // 形状样式
  &__shape {
    &--square {
      border-radius: 4px;
    }

    &--round {
      border-radius: 50%;
    }
  }
}
</style>
