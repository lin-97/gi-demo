<template>
  <div class="asider">
    <Logo :collapsed="appStore.menuCollapse"></Logo>
    <a-layout-sider
      class="menu"
      collapsible
      breakpoint="xl"
      hide-trigger
      :width="232"
      :collapsed="appStore.menuCollapse"
      @collapse="handleCollapse"
    >
      <a-menu :selected-keys="[activeMenu]" :auto-open-selected="true" :style="{ width: '100%', height: '100%' }">
        <SidebarItem
          v-for="(route, index) in sidebarRoutes"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        ></SidebarItem>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts" name="Asider">
import { useAppStore, usePermissionStore } from '@/store'
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const sidebarRoutes = computed(() => permissionStore.sidebarRoutes)

const handleCollapse = (isCollapsed: boolean) => {
  appStore.menuCollapse = isCollapsed
}

console.log('sidebarRoutes', JSON.parse(JSON.stringify(sidebarRoutes.value)))

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})
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

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-2);
  .menu {
    flex: 1;
    overflow: hidden;
  }
}
</style>
