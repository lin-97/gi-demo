<template>
  <div class="test">
    <a-menu
      v-model:selected-keys="selectedKeys"
      :style="{ width: '200px', borderRadius: '4px', flexShrink: 0 }"
      @menu-item-click="menuItemClick"
    >
      <GiTitle title="组件示例" style="margin-bottom: 14px; padding: 0"></GiTitle>
      <a-menu-item v-for="item in menuList" :key="item.value">{{ item.name }}</a-menu-item>
    </a-menu>

    <div class="content">
      <transition name="fade-slide" mode="out-in" appear>
        <component :is="selectedKeys[0]"></component>
      </transition>
    </div>
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

const selectedKeys = ref([Button])

const menuList = ref([
  { name: '按钮', value: Button },
  { name: 'GiTextRadio', value: TextRadio },
  { name: 'GiTextSwitch', value: TextSwitch },
  { name: 'GiTag', value: Tag },
  { name: 'GiNavBar', value: NavBar },
  { name: 'GiTitle', value: Title },
  { name: 'GiIconSelector', value: IconSelector }
])

const menuItemClick = () => {
  console.log(selectedKeys.value)
}
</script>

<style lang="scss" scoped>
.test {
  flex: 1;
  padding: $margin;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
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
