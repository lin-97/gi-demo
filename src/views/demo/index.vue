<template>
  <div class="demo">
    <div class="demo__left">
      <a-tabs v-model:active-key="selectedKey" position="left" hide-content>
        <a-tab-pane v-for="(item, index) in menuList" :key="index" :title="item.name"></a-tab-pane>
      </a-tabs>
    </div>

    <section class="demo__content">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="menuList[selectedKey].value"></component>
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ApiTest from './examples/api-test/index.vue'
import Button from './examples/button/index.vue'
import GiTagDemo from './examples/gi-tag-demo/index.vue'
import GiSpaceDemo from './examples/gi-space-demo/index.vue'
import GiDotDemo from './examples/gi-dot-demo/index.vue'
import GiIconBoxDemo from './examples/gi-icon-box-demo/index.vue'
import GiIconSelectorDemo from './examples/gi-icon-selector-demo/index.vue'
// 其他示例
import Area from './examples/area-demo/index.vue'
import Editor from './examples/editor/index.vue'
import RowTreeTable from './examples/row-tree-table/index.vue'
import Map from './examples/map/index.vue'
import JSModal from './examples/js-modal/index.vue'
import FnComponent from './examples/fn-component/index.vue'
import Mitt from './examples/mitt/index.vue'

defineOptions({ name: 'DemoIndex' })

const selectedKey = ref(0)

const menuList = [
  { name: '接口测试', value: ApiTest },
  { name: '按钮', value: Button },
  { name: 'GiTag', value: GiTagDemo },
  { name: 'GiSpace', value: GiSpaceDemo },
  { name: 'GiIconBox', value: GiIconBoxDemo },
  { name: 'GiDot', value: GiDotDemo },
  { name: 'GiIconSelector', value: GiIconSelectorDemo },
  { name: '函数调用模态框', value: JSModal },
  { name: '横向树表格', value: RowTreeTable },
  { name: '省市区', value: Area },
  { name: '富文本', value: Editor },
  { name: '地图', value: Map },
  { name: 'Mitt中央通信', value: Mitt },
  { name: '函数式组件', value: FnComponent }

]
</script>

<style lang="scss" scoped>
:deep(.arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab) {
  padding: 0;
  margin: 0;
  padding: 8px 16px;

  &:hover {
    background: var(--color-fill-1);

    .arco-tabs-tab-title {
      &::before {
        display: none !important;
      }
    }
  }

  &.arco-tabs-tab-active {
    background: rgba(var(--primary-6), 0.08);
  }
}

:deep(.arco-tabs-nav-vertical::before) {
  left: 0;
  display: none;
}

:deep(.arco-tabs-nav-vertical .arco-tabs-nav-ink) {
  left: 0;
}

:deep(.arco-tabs-nav-vertical) {
  float: none;
  flex-direction: row;
}

.demo {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;

  &__left {
    width: 200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--color-bg-1);
  }

  &__content {
    flex: 1;
    height: 100%;
    background: var(--color-bg-1);
    margin-left: $margin;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
