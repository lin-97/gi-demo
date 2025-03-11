<!--
  @file GiLeftRightPane 组件 - 左右布局面板
  @description 用于左树右表等布局场景的响应式布局组件
-->
<template>
  <a-row class="gi-left-right-pane" align="stretch" :gutter="14">
    <a-col class="h-full overflow-hidden" :xs="0" :sm="8" :md="7" :lg="6" :xl="5" :xxl="4" flex="260px"
      v-bind="props.leftColProps">
      <div class="gi-left-right-pane__left">
        <slot name="left" />
      </div>
    </a-col>

    <a-col class="h-full overflow-hidden" :xs="24" :sm="16" :md="17" :lg="18" :xl="19" :xxl="20" flex="1"
      v-bind="props.rightColProps">
      <div class="gi-left-right-pane__right">
        <slot />
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import type { ColProps } from '@arco-design/web-vue'

/** 组件属性定义 */
interface Props {
  /** 左侧列配置 */
  leftColProps?: ColProps
  /** 右侧列配置 */
  rightColProps?: ColProps
}

defineOptions({ name: 'GiLeftRightPane' })

const props = withDefaults(defineProps<Props>(), {
  leftColProps: () => ({}),
  rightColProps: () => ({})
})

/** 组件插槽定义 */
defineSlots<{
  /** 左侧面板内容 */
  left: () => void
  /** 默认插槽（右侧面板内容） */
  default: () => void
}>()
</script>

<style lang="scss" scoped>
.gi-left-right-pane {
  flex: 1;
  overflow: hidden;
  padding: $margin;
  box-sizing: border-box;

  &__left,
  &__right {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
