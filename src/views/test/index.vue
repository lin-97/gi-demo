<template>
  <div class="test">
    <!-- <a-menu
      v-model:selected-keys="selectedKeys"
      :style="{ width: '200px', borderRadius: '4px', flexShrink: 0 }"
      @menu-item-click="menuItemClick"
    >
      
      <a-menu-item v-for="item in menuList" :key="item.value">{{ item.name }}</a-menu-item>
    </a-menu> -->

    <section class="left">
      <GiTitle title="组件示例" style="margin-bottom: 14px; padding: 0"></GiTitle>
      <a-tabs position="left" hide-content v-model:active-key="selectedKey">
        <a-tab-pane :title="item.name" v-for="(item, index) in menuList" :key="index"></a-tab-pane>
      </a-tabs>
    </section>

    <section class="content">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="menuList[selectedKey].value"></component>
      </transition>
    </section>
  </div>
</template>

<script lang="ts" setup name="Test">
import { ref } from 'vue'
import Button from './components/Button.vue'
import GiTitle from '@/components/GiTitle.vue'
import TextRadio from './components/TextRadio.vue'
import TextSwitch from './components/TextSwitch.vue'
import Tag from './components/Tag.vue'
import NavBar from './components/NavBar.vue'
import Title from './components/Title.vue'
import IconSelector from './components/IconSelector.vue'

const selectedKey = ref(0)

const menuList = ref([
  { name: '按钮', value: Button },
  { name: 'GiTextRadio', value: TextRadio },
  { name: 'GiTextSwitch', value: TextSwitch },
  { name: 'GiTag', value: Tag },
  { name: 'GiNavBar', value: NavBar },
  { name: 'GiTitle', value: Title },
  { name: 'GiIconSelector', value: IconSelector }
])
</script>

<style lang="scss" scoped>
::v-deep .arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab {
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
::v-deep .arco-tabs-nav-vertical::before {
  left: 0;
  display: none;
}
::v-deep .arco-tabs-nav-vertical .arco-tabs-nav-ink {
  left: 0;
}
::v-deep .arco-tabs-nav-vertical {
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
    width: 180px;
    padding: $padding;
    padding-top: 0;
    background: var(--color-bg-2);
    box-sizing: border-box;
    border-radius: 2px;
  }
  .content {
    flex: 1;
    height: 100%;
    padding: $padding;
    background: var(--color-bg-2);
    margin-left: $margin;
    border-radius: $box-radius;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
