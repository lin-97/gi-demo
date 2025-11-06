<template>
  <a-split v-model:size="size" class="gi-page-layout" :class="getClass" min="1px" max="600px" :disabled="!slots.left">
    <template #first>
      <div v-if="slots.left" class="gi-page-layout__left" :style="props.leftStyle">
        <slot name="left"></slot>
      </div>
    </template>
    <template #second>
      <div v-if="slots.header" class="gi-page-layout__header" :style="props.headerStyle">
        <slot name="header"></slot>
      </div>
      <div class="gi-page-layout__body" :style="props.bodyStyle">
        <slot></slot>
      </div>
    </template>
    <template v-if="props.collapsed || isMobile" #resize-trigger-icon>
      <SplitButton :collapsed="parseInt(size) < 20" @click="handleClick"></SplitButton>
    </template>
  </a-split>
</template>

<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { browse } from 'xe-utils'
import SplitButton from './SplitButton.vue'

defineOptions({ name: 'GiPageLayout' })

const props = withDefaults(defineProps<Props>(), {
  size: '270px',
  margin: false,
  inner: false,
  headerBordered: true,
  leftStyle: () => ({}),
  headerStyle: () => ({}),
  bodyStyle: () => ({}),
  collapsed: false
})

/** 组件插槽定义 */
defineSlots<{
  header: () => void
  left: () => void
  default: () => void
}>()

const slots = useSlots()
const isMobile = browse().isMobile ?? false
const size = ref(isMobile ? '0px' : props.size)
const collapsing = ref(false)

const getClass = computed(() => {
  return {
    'gi-page-layout--disabled': !slots.left,
    'gi-page-layout--margin': props.margin,
    'gi-page-layout--inner': props.inner,
    'gi-page-layout--has-header': slots.header,
    'gi-page-layout--header-bordered': props.headerBordered,
    'gi-page-layout--collapsing': collapsing.value
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
  collapsed?: boolean
}

function handleClick() {
  collapsing.value = true
  setTimeout(() => {
    collapsing.value = false
  }, 300)
  size.value = Number.parseInt(size.value) > 20 ? '0px' : props.size
}
</script>

<style lang='scss' scoped>
:deep(.arco-split-pane) {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

:deep(.arco-split-trigger) {
  position: relative;
}

:deep(.arco-split-trigger-icon-wrapper) {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 100%;
  user-select: none;
  background-color: transparent;
  transform: translate(-50%, -50%);

  .arco-split-trigger-icon {
    display: none;
  }

  &:hover,
  &:active {
    &::before {
      width: 2px;
      background-color: var(--color-primary-light-2);
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    content: '';
    background-color: var(--color-border-2);
    transform: translateX(-50%);
  }
}

.gi-page-layout {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: auto;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-bg-1);
}

.gi-page-layout--margin {
  margin: $margin;
}

.gi-page-layout--inner {
  .gi-page-layout__header {
    padding: 0;
  }

  .gi-page-layout__body {
    padding-right: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
}

.gi-page-layout--header-bordered {
  .gi-page-layout__header {
    border-bottom: 1px solid var(--color-border);
  }
}

.gi-page-layout--disabled {
  :deep(> .arco-split-pane-first) {
    display: none;
  }
}

.gi-page-layout--collapsing {
  :deep(> .arco-split-pane-first) {
    transition: flex-basis 0.3s;
  }
}

.gi-page-layout__left {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: $padding;
  overflow: hidden;
}

.gi-page-layout__header {
  box-sizing: border-box;
  padding: $padding;
  padding-bottom: 0;
}

.gi-page-layout__body {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: $padding;
  overflow: hidden;
}
</style>
