<template>
  <a-menu
    :mode="mode"
    :selected-keys="activeMenu"
    :auto-open-selected="autoOpenSelected"
    :accordion="appStore.menuAccordion"
    :breakpoint="appStore.layout === 'mix' ? 'xl' : undefined"
    :trigger-props="{ animationName: 'slide-dynamic-origin' }"
    :collapsed="collapsed"
    @menu-item-click="onMenuItemClick"
    @collapse="onCollapse"
    :style="menuStyle"
  >
    <MenuItem v-for="(route, index) in sidebarRoutes" :key="route.path + index" :item="route"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/stores'
import MenuItem from './MenuItem.vue'
import { isExternal } from '@/utils/validate'
import { isMobile } from '@/utils'
import type { RouteRecordRaw } from 'vue-router'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'Menu' })

interface Props {
  menus?: RouteRecordRaw[]
  menuStyle?: CSSProperties
}

const props = withDefaults(defineProps<Props>(), {})

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const sidebarRoutes = computed(() => (props.menus ? props.menus : routeStore.routes))
// console.log('sidebarRoutes', sidebarRoutes.value)

// 菜单垂直模式/水平模式
const mode = computed(() => {
  if (!['left', 'mix'].includes(appStore.layout)) {
    return 'horizontal'
  } else {
    return 'vertical'
  }
})

// 是否默认展开选中的菜单
const autoOpenSelected = computed(() => {
  if (!['left', 'mix'].includes(appStore.layout)) {
    return false
  } else {
    return true
  }
})

// 是否折叠菜单
const collapsed = computed(() => {
  return isMobile() ? false : appStore.menuCollapse
})

// 当前页面激活菜单路径，先从路由里面找
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return [meta.activeMenu]
  }
  return [path]
})

// 菜单项点击事件
const onMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return
  }
  if (isMobile()) {
    appStore.menuCollapse = false
  }
  router.push({ path: key })
}

// 折叠状态改变时触发
const onCollapse = (collapsed: boolean) => {
  if (!isMobile()) {
    appStore.menuCollapse = collapsed
  }
}
</script>

<style lang="scss" scoped></style>
