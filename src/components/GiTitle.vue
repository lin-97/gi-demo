<template>
  <div class="gi-title">
    <a-row justify="space-between" align="center" class="wrapper" :style="{ 'border-bottom-style': borderStyle }">
      <h3 class="title">{{ props.title }}</h3>
      <a-space>
        <slot></slot>
      </a-space>
    </a-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 边框样式
  borderStyle: {
    type: String,
    default: 'dashed'
  }
})
</script>

<style lang="scss" scoped>
.gi-title {
  height: 44px;
  padding: 0 $padding;
  box-sizing: border-box;
  z-index: 99;
  flex-shrink: 0;
  > .wrapper {
    height: 100%;
    border-bottom-width: 1px;
    border-bottom-color: var(--color-border-3);
    box-sizing: border-box;
  }
  .title {
    font-size: 16px;
    font-weight: normal;
    color: $title-color;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
