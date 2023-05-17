<template>
  <a-layout-sider collapsible breakpoint="xl" :width="232" class="asider">
    <a-menu :selected-keys="[activeMenu]" :auto-open-selected="true" :style="{ width: '100%', height: '100%' }">
      <SidebarItem
        v-for="(route, index) in sidebarRouters"
        :key="route.path + index"
        :item="route"
        :base-path="route.path"
      ></SidebarItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts" name="Asider">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStore } from '@/store'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const router = useRouter()

const permissionStore = usePermissionStore()
const sidebarRouters = computed(() => permissionStore.sidebarRouters)

console.log('sidebarRouters', sidebarRouters.value)

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
}
</style>
