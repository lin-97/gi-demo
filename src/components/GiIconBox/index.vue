<template>
  <div class="gi-icon-box" :class="getClass" :style="getStyle">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import type { CSSProperties } from 'vue'

interface Props {
  color?: string | 'primary' | 'success' | 'warning' | 'danger'
  size?: number
  shape?: 'square' | 'round'
}

const props = withDefaults(defineProps<Props>(), {
  color: '#165DFF',
  shape: 'square'
})

const getClass = computed(() => {
  const arr: string[] = []
  if (['primary', 'success', 'warning', 'danger'].includes(props.color)) {
    arr.push(`gi-icon-box--${props.color}`)
  }
  if (props.shape) {
    arr.push(`gi-icon-box__shape--${props.shape}`)
  }
  return arr.join(' ')
})

const getStyle = computed(() => {
  const obj: CSSProperties = {}
  if (!['primary', 'success', 'warning', 'danger'].includes(props.color)) {
    obj.backgroundColor = props.color
  }
  if (props.size) {
    obj.width = `${props.size}px`
    obj.height = `${props.size}px`
  }
  return obj
})
</script>

<style lang='scss' scoped>
.gi-icon-box {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: #fff;

  &--primary {
    background-color: rgba(var(--primary-6));
  }

  &--success {
    background-color: rgba(var(--success-6));
  }

  &--warning {
    background-color: rgba(var(--warning-6));
  }

  &--danger {
    background-color: rgba(var(--danger-6));
  }

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
