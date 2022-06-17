<template>
  <a-layout-sider collapsible breakpoint="xl" class="aside">
    <a-menu
      :selected-keys="[appStore.activePath]"
      :default-open-keys="['/']"
      :style="{ width: '100%', height: '100%' }"
    >
      <MenuItem v-for="item in menuStore.list" :key="item.id" :data="item" @click="handleClickItem"></MenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore, useMenuStore } from '@/store'
import MenuItem from './MenuItem.vue'

const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()

const handleClickItem = (item: Menu.MenuItem) => {
  if (item.path) {
    appStore.setActivePath(item.path)
    router.push({ path: item.path })
  }
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
    padding: 10px 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    justify-content: center;
  }
  .arco-menu-title {
    display: none;
  }
}
.aside {
  z-index: 999;
}
</style>
