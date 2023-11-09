<template>
  <a-menu :mode="mode" :selected-keys="activeMenu" :auto-open-selected="false">
    <MenuItem v-for="(route, index) in sidebarRoutes" :key="route.path" :item="route"></MenuItem>
  </a-menu>
</template>

<script setup lang="tsx">
import { useAppStore, useRouteStore } from '@/stores'
import MenuItem from './MenuItem.vue'

defineOptions({ name: 'Menu' })
const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => routeStore.routes)

// 菜单垂直模式/水平模式
const mode = computed(() => {
  if (appStore.layout === 'left') {
    return 'vertical'
  } else {
    return 'horizontal'
  }
})

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return [meta.activeMenu]
  }
  return [path]
})
</script>

<style lang="scss" scoped></style>
