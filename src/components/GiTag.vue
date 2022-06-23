<template>
  <div class="gi-tag" :class="getClassName" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="GiTag">
import { computed } from 'vue'

const props = defineProps({
  // 标签类型 dark填充 light高亮 plain镂空
  type: {
    type: String,
    default: 'dark'
  },
  // 图标状态 primary success warning danger info
  status: {
    type: String,
    default: 'primary'
  }
})

const getClassName = computed<string>(() => {
  return `gi-tag-${props.type} gi-tag-${props.status}`
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.gi-tag {
  display: inline-flex;
  padding: 0 10px;
  padding-top: 1px;
  height: 20px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
}
.gi-tag-dark {
  &.gi-tag-primary {
    background: rgb(var(--primary-6));
  }
  &.gi-tag-success {
    background: rgb(var(--success-6));
  }
  &.gi-tag-warning {
    background: rgb(var(--warning-6));
  }
  &.gi-tag-danger {
    background: rgb(var(--danger-6));
  }
  &.gi-tag-info {
    background: rgb(var(--gray-6));
  }
}
.gi-tag-plain {
  background: none;
  box-sizing: border-box;
  &.gi-tag-primary {
    color: rgb(var(--primary-6));
    border: 1px solid rgb(var(--primary-6));
  }
  &.gi-tag-success {
    color: rgb(var(--success-6));
    border: 1px solid rgb(var(--success-6));
  }
  &.gi-tag-warning {
    color: rgb(var(--warning-6));
    border: 1px solid rgb(var(--warning-6));
  }
  &.gi-tag-danger {
    color: rgb(var(--danger-6));
    border: 1px solid rgb(var(--danger-6));
  }
  &.gi-tag-info {
    color: rgb(var(--gray-6));
    border: 1px solid rgb(var(--gray-6));
  }
}

.gi-tag-light {
  box-sizing: border-box;
  &.gi-tag-primary {
    color: rgb(var(--primary-6));
    background: rgb(var(--primary-1));
    border: 1px solid rgb(var(--primary-2));
  }
  &.gi-tag-success {
    color: rgb(var(--success-6));
    background: rgb(var(--success-1));
    border: 1px solid rgb(var(--success-2));
  }
  &.gi-tag-warning {
    color: rgb(var(--warning-6));
    background: rgb(var(--warning-1));
    border: 1px solid rgb(var(--warning-2));
  }
  &.gi-tag-danger {
    color: rgb(var(--danger-6));
    background: rgb(var(--danger-1));
    border: 1px solid rgb(var(--danger-2));
  }
  &.gi-tag-info {
    color: rgb(var(--gray-6));
    background: rgb(var(--gray-1));
    border: 1px solid rgb(var(--gray-4));
  }
}
</style>
