<template>
  <a-menu
    :mode="mode"
    :selected-keys="activeMenu"
    :auto-open-selected="autoOpenSelected"
    :accordion="appStore.menuAccordion"
    :show-collapse-button="['mix'].includes(appStore.layout)"
    :breakpoint="appStore.layout === 'mix' ? 'xl' : undefined"
    :trigger-props="{ animationName: 'slide-dynamic-origin' }"
    :style="menuStyle"
    @menu-item-click="onMenuItemClick"
  >
    <MenuItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route"></MenuItem>
  </a-menu>
</template>

<script setup lang="tsx">
import { useAppStore, useRouteStore } from '@/stores'
import MenuItem from './MenuItem.vue'
import { isExternal } from '@/utils/validate'
import { isMobile } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
import type { CSSProperties } from 'vue'

interface Props {
  menus?: RouteRecordRaw[]
  menuStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {})

defineOptions({ name: 'Menu' })
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => (props.menus ? props.menus : routeStore.routes))
// console.log('sidebarRoutes', sidebarRoutes.value)

// 菜单垂直模式/水平模式
const mode = computed(() => {
  if (['left', 'mix'].includes(appStore.layout)) {
    return 'vertical'
  } else {
    return 'horizontal'
  }
})

const autoOpenSelected = computed(() => {
  return appStore.layout === 'left' ? true : false
})

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return [meta.activeMenu]
  }
  return [path]
})

const onMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return false
  }
  if (isMobile()) {
    appStore.menuCollapse = false
  }

  router.push({ path: key })
}
</script>

<style lang="scss" scoped></style>
