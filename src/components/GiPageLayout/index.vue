<template>
  <div class="gi-page-layout" :class="{ 'gi-page-layout--margin': margin, 'gi-page-layout--gutter': !!rowGutter }">
    <a-row class="gi-page-layout__body" align="stretch" :gutter="rowGutter">
      <a-col v-if="slots.left" v-bind="props.leftColProps" class="gi-page-layout__body-left" :xs="0" :sm="8" :md="7"
        :lg="6" :xl="5" :xxl="4" flex="260px">
        <slot name="left"></slot>
      </a-col>
      <a-col class="gi-page-layout__body-right" :xs="24" :sm="16" :md="17" :lg="18" :xl="19" :xxl="20" flex="1"
        v-bind="props.rightColProps">
        <section v-if="slots.header" class="gi-page-layout__header">
          <slot name="header"></slot>
        </section>
        <div class="gi-page-layout__content">
          <slot></slot>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang='ts'>
import type { ColProps } from '@arco-design/web-vue'

defineOptions({ name: 'GiPageLayout' })

const props = withDefaults(defineProps<Props>(), {
  margin: true,
  gutter: false,
  leftColProps: () => ({}),
  rightColProps: () => ({})
})

/** 组件插槽定义 */
defineSlots<{
  header: () => void
  left: () => void
  default: () => void
}>()

const rowGutter = computed(() => {
  if (typeof props.gutter === 'boolean') {
    return props.gutter ? 14 : undefined
  }
  return props.gutter
})

/** 组件属性定义 */
interface Props {
  margin?: boolean
  gutter?: boolean | number
  leftColProps?: ColProps
  rightColProps?: ColProps
}

const slots = useSlots()
</script>

<style lang='scss' scoped>
.gi-page-layout {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  background-color: var(--color-bg-1);

  &--margin {
    margin: $margin;
  }

  &--gutter {
    .gi-page-layout__body-left {
      border-right: none;
    }
  }
}

.gi-page-layout__header {
  // padding: $padding;
  // padding-bottom: 0;
  border-bottom: 1px solid var(--color-border);
  box-sizing: border-box;
}

.gi-page-layout__content {
  // padding: $padding;
  // padding-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.gi-page-layout__body {
  flex: 1;
  display: flex;
  overflow: hidden;

  &-left,
  &-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-left {
    border-right: 1px solid var(--color-border);
  }
}
</style>
