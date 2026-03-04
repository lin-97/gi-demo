<!--
  @file LayoutItem 组件
  @description 布局切换选项组件，支持左侧布局、顶部布局和混合布局三种模式
-->
<template>
  <div class="layout-mode-item-wrapper w-full">
    <!-- 布局预览 -->
    <div class="layout-mode-item"
      :class="[{ 'is-active': appStore.layout === props.mode }, `layout-mode-item__${props.mode}`]"
      @click="emit('click')">
      <!-- 默认布局 -->
      <template v-if="props.mode === 'left'">
        <div class="preview-side preview-side--main">
          <span class="preview-line"></span>
          <span class="preview-line"></span>
          <span class="preview-line"></span>
          <span class="preview-line"></span>
        </div>
        <div class="preview-main">
          <div class="preview-header"></div>
          <div class="preview-content">
            <span class="preview-line"></span>
            <span class="preview-line is-short"></span>
            <span class="preview-line is-short"></span>
          </div>
        </div>
      </template>

      <!-- 顶部布局 -->
      <template v-if="props.mode === 'top'">
        <div class="preview-topbar">
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
        </div>
        <div class="preview-content">
          <span class="preview-line"></span>
          <span class="preview-line is-short"></span>
          <span class="preview-line is-short"></span>
        </div>
      </template>

      <!-- 混合布局 -->
      <template v-if="props.mode === 'mix'">
        <div class="preview-topbar">
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
          <span class="preview-pill"></span>
        </div>
        <div class="preview-main preview-main--row">
          <div class="preview-side preview-side--main">
            <span class="preview-line"></span>
            <span class="preview-line"></span>
            <span class="preview-line"></span>
          </div>
          <div class="preview-content">
            <span class="preview-line"></span>
            <span class="preview-line is-short"></span>
            <span class="preview-line is-short"></span>
          </div>
        </div>
      </template>

      <!-- 双列布局 -->
      <template v-if="props.mode === 'columns'">
        <div class="preview-side preview-side--ghost"></div>
        <div class="preview-side preview-side--main">
          <span class="preview-line"></span>
          <span class="preview-line"></span>
          <span class="preview-line"></span>
          <span class="preview-line"></span>
        </div>
        <div class="preview-main">
          <div class="preview-content">
            <span class="preview-line"></span>
            <span class="preview-line is-short"></span>
            <span class="preview-line is-short"></span>
            <span class="preview-line is-short"></span>
          </div>
        </div>
      </template>
    </div>

    <!-- 布局名称 -->
    <p class="layout-mode-item__text">{{ props.name }}</p>
  </div>
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
type LayoutMode = 'left' | 'top' | 'mix' | 'columns'

/** Props 类型定义 */
interface Props {
  /** 布局模式 */
  mode?: LayoutMode
  /** 布局名称 */
  name: string
}

/** 应用状态 */
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout-mode-item-wrapper {
  width: 100%;
}

.layout-mode-item {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 58px;
  padding: 6px;
  gap: 4px;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--color-bg-1);
  border: 2px solid var(--color-border-2);
  border-radius: 6px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &.is-active {
    border-color: rgb(var(--primary-6));
    box-shadow: 0 0 5px 3px rgb(var(--primary-2));
  }

  &__text {
    margin-top: 5px;
    font-size: 12px;
    color: var(--color-text-2);
    text-align: center;
  }
}

.preview-main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 4px;
}

.preview-side {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 12px;
  padding: 3px 2px;
  gap: 3px;
  background-color: var(--color-fill-3);
  border-radius: 2px;
  box-sizing: border-box;
}

.preview-side--main {
  background-color: var(--color-fill-4);
}

.preview-side--ghost {
  width: 11px;
  background-color: var(--color-fill-2);
}

.preview-header {
  width: 100%;
  height: 8px;
  background-color: var(--color-fill-3);
  border-radius: 2px;
}

.preview-topbar {
  display: flex;
  width: 100%;
  height: 10px;
  padding: 2px 3px;
  gap: 3px;
  background-color: var(--color-fill-3);
  border-radius: 2px;
  box-sizing: border-box;
}

.preview-pill {
  flex: 1;
  background-color: var(--color-bg-1);
  border-radius: 1px;
}

.preview-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
  min-width: 0;
  padding-right: 1px;
  box-sizing: border-box;

  .preview-line {
    height: 6px;
  }
}

.preview-line {
  display: block;
  height: 5px;
  width: 100%;
  background-color: var(--color-fill-2);
  border-radius: 1px;

  &.is-short {
    width: 70%;
  }
}

.layout-mode-item__top {
  flex-direction: column;

  .preview-content {
    padding-top: 2px;
  }
}

.layout-mode-item__mix {
  flex-direction: column;

  .preview-topbar {
    flex-shrink: 0;
  }

  .preview-main {
    flex: 1;
  }

  .preview-side {
    width: 12px;
  }
}

.preview-main--row {
  flex-direction: row;
  gap: 4px;
}

.layout-mode-item__columns {
  .preview-main .preview-content {
    justify-content: center;
    padding-top: 0;
  }
}
</style>
