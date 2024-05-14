<template>
  <div class="test">
    <a-card title="组件示例" :bordered="false" class="gi_card left">
      <div class="tab-box">
        <a-tabs v-model:active-key="selectedKey" position="left" hide-content>
          <a-tab-pane v-for="(item, index) in menuList" :key="index" :title="item.name"></a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    <section class="content">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="menuList[selectedKey].value"></component>
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Button from './examples/button/index.vue'
import Tag from './examples/tag/index.vue'
import IconSelector from './examples/icon-selector/index.vue'
import Dot from './examples/dot/index.vue'
import Area from './examples/area-demo/index.vue'
import Editor from './examples/editor/index.vue'
import RowTreeTable from './examples/row-tree-table/index.vue'
import Map from './examples/map/index.vue'
import JSModal from './examples/js-modal/index.vue'
import FnComponent from './examples/fn-component/index.vue'
import Mitt from './examples/mitt/index.vue'
import ApiTest from './examples/api-test/index.vue'

defineOptions({ name: 'DemoIndex' })

const selectedKey = ref(0)

const menuList = [
  { name: '接口测试', value: ApiTest },
  { name: '按钮', value: Button },
  { name: 'GiTag', value: Tag },
  { name: 'GiIconSelector', value: IconSelector },
  { name: 'GiDot', value: Dot },
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

.test {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;

  .left {
    width: 200px;
    .tab-box {
      flex: 1;
      overflow-y: auto;
    }
  }

  .content {
    flex: 1;
    height: 100%;
    padding: $padding;
    background: var(--color-bg-1);
    margin-left: $margin;
    border-radius: $radius-box;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
