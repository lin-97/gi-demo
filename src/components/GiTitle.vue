<template>
  <div class="gi-title" :class="getClassName">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="GiTitle">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'normal' | 'large'
  bold?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  bold: false
})

const getClassName = computed(() => {
  return props.bold ? `gi-title-${props.size} gi-title-${String(props.bold)}` : `gi-title-${props.size}`
})
</script>

<style lang="scss" scoped>
.gi-title {
  font-size: 16px;
  color: var(--color-text-1);
  &-small {
    font-size: 14px;
  }
  &-large {
    font-size: 18px;
  }
  &-bold {
    font-weight: 600;
  }
}
</style>
