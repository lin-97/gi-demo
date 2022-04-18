<template>
  <a-row justify="space-between" align="center" class="gi-navbar">
    <h3 class="title">{{ props.title }}</h3>
    <a-space>
      <slot></slot>
    </a-space>
  </a-row>
</template>

<script setup lang="ts" name="GiNavBar">
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.gi-navbar {
  height: 44px;
  background: var(--color-bg-3);
  padding: 0 $padding;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.08);
  z-index: 99;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: $title-color;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
