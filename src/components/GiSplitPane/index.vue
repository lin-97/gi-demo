<!--
  @file GiSplitPane 组件
  @description 可折叠的分栏布局组件，支持左右布局，带有折叠按钮控制左侧面板的显示/隐藏
-->
<template>
  <div class="gi-split-pane">
    <!-- 左侧可折叠面板 -->
    <GiSplitPaneFlexibleBox v-model:visible="visible">
      <div class="gi-split-pane__left">
        <slot name="left"></slot>
      </div>
    </GiSplitPaneFlexibleBox>

    <!-- 分割线及控制按钮 -->
    <div class="gi-split-pane__line">
      <GiSplitButton :collapsed="!visible" @click="handleClick"></GiSplitButton>
    </div>

    <!-- 右侧内容区域 -->
    <div class="gi-split-pane__right">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

/** 组件名称 */
defineOptions({ name: 'GiSplitPane' })

/** 插槽类型定义 */
defineSlots<{
  /** 左侧面板内容插槽 */
  left: () => void
  /** 默认插槽（右侧内容） */
  default: () => void
}>()

/** 左侧面板显示状态 */
const visible = ref(true)

/** 处理折叠按钮点击事件 */
const handleClick = () => {
  visible.value = !visible.value
}
</script>

<style lang='scss' scoped>
.gi-split-pane {
  flex: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  &__left,
  &__right {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  &__left {
    padding-right: $padding;
  }

  &__right {
    flex: 1;
    padding-left: $padding;
  }

  &__line {
    width: 1px;
    height: auto;
    background-color: var(--color-border-2);
    position: relative;
  }
}
</style>
