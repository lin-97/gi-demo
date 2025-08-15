<template>
  <ElSplitter class="gi-page-layout" :class="getClass">
    <ElSplitterPanel v-if="slots.left" min="1px" max="600px" :size="props.size">
      <div class="gi-page-layout__left" :style="props.leftStyle">
        <slot name="left"></slot>
      </div>
    </ElSplitterPanel>
    <ElSplitterPanel class="gi-page-layout__right-panel">
      <div v-if="slots.header" class="gi-page-layout__header" :style="props.headerStyle">
        <slot name="header"></slot>
      </div>
      <div class="gi-page-layout__body" :style="props.bodyStyle">
        <slot></slot>
      </div>
    </ElSplitterPanel>
  </ElSplitter>
</template>

<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { ElSplitter, ElSplitterPanel } from 'element-plus'
import 'element-plus/theme-chalk/el-splitter.css'
import 'element-plus/theme-chalk/el-splitter-panel.css'

defineOptions({ name: 'GiPageLayout' })

const props = withDefaults(defineProps<Props>(), {
  size: '270px',
  margin: false,
  inner: false,
  headerBordered: true,
  leftStyle: () => ({}),
  headerStyle: () => ({}),
  bodyStyle: () => ({})
})

/** 组件插槽定义 */
defineSlots<{
  header: () => void
  left: () => void
  default: () => void
}>()

const slots = useSlots()

const getClass = computed(() => {
  return {
    'gi-page-layout--margin': props.margin,
    'gi-page-layout--inner': props.inner,
    'gi-page-layout--has-header': slots.header,
    'gi-page-layout--header-bordered': props.headerBordered
  }
})

/** 组件属性定义 */
interface Props {
  size?: string
  margin?: boolean
  inner?: boolean
  headerBordered?: boolean
  leftStyle?: CSSProperties
  headerStyle?: CSSProperties
  bodyStyle?: CSSProperties
}
</script>

<style lang='scss' scoped>
:deep(.el-splitter-bar__dragger) {
  &:before {
    width: 0.5px;
    background-color: var(--color-border);
  }

  &:hover,
  &:active {
    &:before {
      width: 2px;
      background-color: var(--color-primary-light-2);
    }
  }
}

.gi-page-layout {
  flex: 1;
  width: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
}

.gi-page-layout--margin {
  margin: $margin;
}

.gi-page-layout--has-header {
  .gi-page-layout__body {
    padding-top: 8px;
  }
}

.gi-page-layout--inner {
  .gi-page-layout__header {
    padding: 0;
  }

  .gi-page-layout__body {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
}

.gi-page-layout--header-bordered {
  .gi-page-layout__header {
    border-bottom: 1px solid var(--color-border);
  }
}

.gi-page-layout__left {
  height: 100%;
  padding: $padding;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

:deep(.gi-page-layout__right-panel) {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.gi-page-layout__header {
  box-sizing: border-box;
  padding: $padding;
  padding-bottom: 0;
}

.gi-page-layout__body {
  padding: $padding;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
