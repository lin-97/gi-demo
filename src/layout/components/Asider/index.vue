<template>
  <div class="asider" :class="{ 'asider-h5': isPhone() }">
    <template v-if="isPhone()">
      <a-drawer
        v-model:visible="appStore.menuCollapse"
        placement="left"
        :header="false"
        :footer="false"
        :render-to-body="false"
        :drawer-style="{ 'border-right': '1px solid var(--color-border-2)', 'box-sizing': 'border-box' }"
      >
        <Logo :collapsed="false"></Logo>
        <a-menu class="menu w-full" :selected-keys="[activeMenu]" :auto-open-selected="true">
          <SidebarItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route"></SidebarItem>
        </a-menu>
      </a-drawer>
    </template>

    <template v-else>
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
          <SidebarItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route"></SidebarItem>
        </a-menu>
      </a-layout-sider>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/stores'
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import { isPhone } from '@/utils/common'

defineOptions({ name: 'Asider' })
const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => routeStore.routes)

if (isPhone()) {
  appStore.menuCollapse = false
}

const handleCollapse = (isCollapsed: boolean) => {
  if (!isPhone()) {
    appStore.menuCollapse = isCollapsed
  }
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

:deep(.arco-drawer-body) {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.asider {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-2);
  box-sizing: border-box;
  .menu {
    flex: 1;
    overflow: hidden;
  }
}

.asider-h5 {
  border-right: none;
}
</style>
