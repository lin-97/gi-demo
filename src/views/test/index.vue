<template>
  <div class="test">
    <a-menu
      v-model:selected-keys="selectedKeys"
      :style="{ width: '200px', borderRadius: '4px' }"
      @menu-item-click="menuItemClick"
    >
      <a-menu-item>自定义组件</a-menu-item>
      <a-divider style="margin-top: 0" />
      <a-menu-item v-for="item in menuList" :key="item.value">{{ item.name }}</a-menu-item>
    </a-menu>

    <div class="content">
      <component :is="selectedKeys[0]"></component>
    </div>
  </div>
</template>

<script lang="ts" setup name="Test">
import { ref } from 'vue'
import TextRadio from './components/TextRadio.vue'
import TextSwitch from './components/TextSwitch.vue'
import Tag from './components/Tag.vue'
import NavBar from './components/NavBar.vue'
import Title from './components/Title.vue'

const selectedKeys = ref([TextRadio])

const menuList = ref([
  { name: 'GiTextRadio', value: TextRadio },
  { name: 'GiTextSwitch', value: TextSwitch },
  { name: 'GiTag', value: Tag },
  { name: 'GiNavBar', value: NavBar },
  { name: 'GiTitle', value: Title }
])

const menuItemClick = () => {
  console.log(selectedKeys.value)
}
</script>

<style lang="scss" scoped>
.test {
  flex: 1;
  padding: $padding;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  .content {
    flex: 1;
    height: 100%;
    padding: $padding;
    background: var(--color-bg-3);
    margin-left: $margin;
    border-radius: $box-radius;
    box-sizing: border-box;
  }
}
</style>
