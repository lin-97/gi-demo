<template>
  <div class="gi-title">
    <a-row justify="space-between" align="center" class="wrapper">
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
  }
})
</script>

<style lang="scss" scoped>
.gi-title {
  height: 44px;
  padding: 0 $padding;
  box-sizing: border-box;
  z-index: 99;
  > .wrapper {
    height: 100%;
    border-bottom: 1px solid $border-color;
    box-sizing: border-box;
  }
  .title {
    font-size: 14px;
    font-weight: normal;
    color: $title-color;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}
</style>
