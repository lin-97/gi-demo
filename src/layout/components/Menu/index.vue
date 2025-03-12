<!--
  @file Menu 组件
  @description 系统菜单组件，支持垂直和水平布局、手风琴模式、响应式折叠等功能
-->
<template>
  <a-menu :mode="menuMode" :selected-keys="activeMenu" :auto-open-selected="autoOpenSelected"
    :accordion="appStore.menuAccordion" :breakpoint="isBreakpointEnabled ? 'xl' : undefined"
    :trigger-props="menuTriggerProps" :collapsed="shouldCollapse" :style="menuStyle"
    @menu-item-click="handleMenuItemClick" @collapse="handleCollapse">
    <MenuItem v-for="(item, index) in sidebarRoutes" :key="item.path + index" :item="item" />
  </a-menu>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import type { CSSProperties } from 'vue'
import MenuItem from './MenuItem.vue'
import { useAppStore, useRouteStore } from '@/stores'
import { isExternal } from '@/utils/validate'
import { useDevice } from '@/hooks'

/** 组件名称 */
defineOptions({ name: 'AppMenu' })

/** Props 定义 */
const props = defineProps<Props>()

/** Emits 定义 */
const emit = defineEmits<{
  (e: 'menu-item-click-after'): void
}>()

/** Props 类型定义 */
interface Props {
  /** 菜单项配置 */
  menus?: RouteRecordRaw[]
  /** 菜单样式 */
  menuStyle?: CSSProperties
}

/** Hooks */
const { isDesktop } = useDevice()
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()

/** 计算属性 */
// 侧边栏路由
const sidebarRoutes = computed(() => props.menus ?? routeStore.routes)

// 菜单模式
const menuMode = computed(() =>
  ['left', 'mix'].includes(appStore.layout) ? 'vertical' : 'horizontal'
)

// 是否自动展开选中菜单
const autoOpenSelected = computed(() =>
  ['left', 'mix'].includes(appStore.layout)
)

// 是否启用断点
const isBreakpointEnabled = computed(() =>
  appStore.layout === 'mix'
)

// 菜单触发器配置
const menuTriggerProps = {
  animationName: 'slide-dynamic-origin'
}

// 是否折叠菜单
const shouldCollapse = computed(() =>
  !isDesktop.value ? false : appStore.menuCollapse
)

// 当前激活的菜单路径
const activeMenu = computed(() => {
  const { meta, path } = route
  return meta?.activeMenu ? [meta.activeMenu] : [path]
})

/** 事件处理 */
// 处理菜单项点击
const handleMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return
  }
  router.push({ path: key })
  emit('menu-item-click-after')
}

// 处理折叠状态变化
const handleCollapse = (collapsed: boolean) => {
  if (appStore.layout === 'mix') {
    appStore.menuCollapse = collapsed
  }
}
</script>

<style lang="scss" scoped></style>
