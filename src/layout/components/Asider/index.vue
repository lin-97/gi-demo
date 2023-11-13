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
        <Menu class="menu w-full"></Menu>
      </a-drawer>
    </template>

    <template v-else>
      <Logo :collapsed="appStore.menuCollapse"></Logo>
      <a-layout-sider
        class="menu"
        collapsible
        breakpoint="xl"
        hide-trigger
        :width="220"
        :collapsed="appStore.menuCollapse"
        @collapse="handleCollapse"
      >
        <Menu></Menu>
      </a-layout-sider>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/stores'
import Menu from '../Menu/index.vue'
import Logo from '../Logo.vue'
import { isPhone } from '@/utils'

defineOptions({ name: 'Asider' })
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
