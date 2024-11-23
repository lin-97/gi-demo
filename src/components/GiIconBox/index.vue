<template>
  <div class="gi-icon-box" :class="getClass" :style="getStyle">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import type { CSSProperties } from 'vue'

interface Props {
  color?: string | 'primary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  color: '#165DFF'
})

const getClass = computed(() => {
  if (['primary', 'success', 'warning', 'danger'].includes(props.color)) {
    return `gi-icon-box--${props.color}`
  } else {
    return ''
  }
})

const getStyle = computed(() => {
  const obj: CSSProperties = {}
  if (!['primary', 'success', 'warning', 'danger'].includes(props.color)) {
    obj.backgroundColor = props.color
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
  border-radius: 4px;

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
}
</style>
