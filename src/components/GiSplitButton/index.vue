<!--
  @file GiSplitButton 组件 - 分割面板切换按钮
  @description 提供可折叠面板的切换按钮，支持多种样式和交互效果
-->
<template>
  <div class="gi-split-button" :class="buttonClass" @click="handleClick">
    <icon-right v-if="collapsed" :size="iconSize" />
    <icon-left v-else :size="iconSize" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/** 按钮类型 */
type ButtonType = 'default' | 'circle'

/** 组件属性定义 */
interface Props {
  /** 是否折叠状态 */
  collapsed: boolean
  /** 按钮类型 */
  type?: ButtonType
  /** 图标大小 */
  iconSize?: number
  /** 是否禁用 */
  disabled?: boolean
}

/** 组件事件定义 */
interface Emits {
  (e: 'click'): void
  (e: 'update:collapsed', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  type: 'circle',
  iconSize: 14,
  disabled: false
})

const emit = defineEmits<Emits>()

/** 计算按钮类名 */
const buttonClass = computed(() => [
  `gi-split-button--${props.type}`,
  {
    'is-collapsed': props.collapsed,
    'is-disabled': props.disabled
  }
])

/** 处理点击事件 */
const handleClick = () => {
  if (props.disabled) return
  emit('click')
  emit('update:collapsed', !props.collapsed)
}
</script>

<style lang="scss" scoped>
.gi-split-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border: 1px solid var(--color-border-2);
  background-color: var(--color-bg-1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, border-color;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  &--default {
    width: 18px;
    height: 40px;
    left: 0;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  }

  &--circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: -12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
