<!--
  @file LayoutItem 组件
  @description 布局切换选项组件，支持左侧布局、顶部布局和混合布局三种模式
-->
<template>
  <a-badge>
    <!-- 选中状态标记 -->
    <template #content>
      <icon-check-circle-fill v-if="appStore.layout === props.mode" style="color: rgb(var(--success-6))"
        :size="16"></icon-check-circle-fill>
    </template>

    <!-- 布局预览 -->
    <div class="layout-mode-item" :class="`layout-mode-item__${props.mode}`" @click="emit('click')">
      <!-- 左侧布局 -->
      <template v-if="props.mode === 'left'">
        <div class="block-left"></div>
        <div class="block-right"></div>
      </template>

      <!-- 顶部布局 -->
      <template v-if="props.mode === 'top'">
        <div class="block-top"></div>
        <div class="block-bottom"></div>
      </template>

      <!-- 混合布局 -->
      <template v-if="props.mode === 'mix'">
        <div class="block-top"></div>
        <div class="block-main">
          <div class="block-left"></div>
          <div class="block-right"></div>
        </div>
      </template>
    </div>

    <!-- 布局名称 -->
    <p class="layout-mode-item__text">{{ props.name }}</p>
  </a-badge>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

defineOptions({
  name: 'LayoutModeItem'
})

/** Props 默认值 */
const props = withDefaults(defineProps<Props>(), {
  mode: 'left'
})

/** Emits 定义 */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/** 布局模式类型 */
type LayoutMode = 'left' | 'top' | 'mix'

/** Props 类型定义 */
interface Props {
  /** 布局模式 */
  mode: LayoutMode
  /** 布局名称 */
  name: string
}

/** 应用状态 */
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
// 布局项基础样式
.layout-mode-item {
  width: 70px;
  height: 50px;
  padding: 4px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: var(--color-bg-5);
  border: 1px solid var(--color-border-2);
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .08),
    0 3px 6px 0 rgba(0, 0, 0, .06),
    0 5px 12px 4px rgba(0, 0, 0, .04);

  &__text {
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
    color: var(--color-text-2);
  }
}

.block-left,
.block-right,
.block-top,
.block-bottom {
  border-radius: 2px;
}

// 左侧布局样式
.layout-mode-item__left {
  .block-left {
    width: 10px;
    background-color: $color-theme;
  }

  .block-right {
    flex: 1;
    margin-left: 4px;
    background-color: var(--color-fill-3);
  }
}

// 顶部布局样式
.layout-mode-item__top {
  flex-direction: column;

  .block-top {
    height: 8px;
    background-color: $color-theme;
  }

  .block-bottom {
    flex: 1;
    margin-top: 4px;
    background-color: var(--color-fill-3);
  }
}

// 混合布局样式
.layout-mode-item__mix {
  flex-direction: column;

  .block-top {
    height: 8px;
    margin-bottom: 3px;
    background-color: $color-theme;
  }

  .block-main {
    flex: 1;
    display: flex;

    .block-left {
      width: 10px;
      background-color: $color-theme;
    }

    .block-right {
      flex: 1;
      margin-left: 3px;
      background-color: var(--color-fill-3);
    }
  }
}
</style>
