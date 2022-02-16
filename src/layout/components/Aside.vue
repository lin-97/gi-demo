<template>
  <a-layout-sider collapsible breakpoint="xl" class="aside">
    <a-menu :selected-keys="[appStore.activePath]" :style="{ width: '100%', height: '100%' }">
      <a-menu-item v-for="item in appStore.menuList" :key="item.path" @click="handleClickItem(item)">
        <template #icon><GiSvgIcon :size="24" :name="item.icon"></GiSvgIcon></template>
        {{ item.name }}
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
const router = useRouter()
const appStore = useAppStore()

const handleClickItem = (item: App.MenuItem) => {
  appStore.setActivePath(item.path)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arco-menu-title {
    display: none;
  }
}
.aside {
  z-index: 999;
}
</style>
