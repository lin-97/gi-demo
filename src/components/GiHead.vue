<template>
  <div class="gi-head" :class="{ 'is-fill': fill, shadow: shadow }">
    <a-row justify="space-between" align="center" class="wrapper" :style="{ 'border-bottom-style': borderType }">
      <slot name="title">
        <GiTitle>{{ props.title }}</GiTitle>
      </slot>
      <a-space>
        <slot></slot>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts" name="GiHead">
interface Props {
  title?: string
  borderType?: 'dashed' | 'solid' | 'dotted' | 'double'
  fill?: boolean
  shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  borderType: 'dashed',
  fill: false, // 是否撑满
  shadow: false // 是否显示阴影
})
</script>

<style lang="scss" scoped>
.gi-head {
  height: 44px;
  padding: 0 $padding;
  box-sizing: border-box;
  z-index: 99;
  flex-shrink: 0;
  &.is-fill {
    padding: 0;
    > .wrapper {
      padding: 0 $padding;
    }
  }
  &.shadow {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
    > .wrapper {
      border: 0;
    }
  }
  > .wrapper {
    height: 100%;
    border-bottom-width: 1px;
    border-bottom-color: var(--color-neutral-3);
    box-sizing: border-box;
  }
}
</style>
