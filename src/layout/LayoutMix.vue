<!--
  @file LayoutMix 组件
  @description 混合布局组件，支持顶部导航和左侧菜单组合的布局方式
-->
<template>
  <div class="layout-mix">
    <!-- 左侧菜单区域 -->
    <section v-if="isDesktop" class="layout-mix-left" :class="{ 'app-menu-dark': appStore.menuDark }"
      :style="appStore.menuDark ? appStore.themeCSSVar : undefined">
      <Logo :collapsed="appStore.menuCollapse" />
      <Menu :menus="leftMenus" :menu-style="{ width: '200px', flex: 1 }" />
    </section>

    <!-- 右侧内容区域 -->
    <section class="layout-mix-right">
      <header class="header">
        <MenuFoldBtn />
        <a-menu v-if="isDesktop" mode="horizontal" :selected-keys="activeMenu" :auto-open-selected="false"
          :trigger-props="menuTriggerProps" @menu-item-click="handleMenuItemClick">
          <a-menu-item v-for="item in topMenus" :key="item.path">
            <template #icon>
              <GiSvgIcon v-if="getMenuIcon(item, 'svgIcon')" :name="getMenuIcon(item, 'svgIcon') || ''" :size="24" />
              <component :is="getMenuIcon(item, 'icon')" v-else-if="getMenuIcon(item, 'icon')" />
            </template>
            <span>{{ item.meta?.title || item.children?.[0]?.meta?.title || '' }}</span>
          </a-menu-item>
        </a-menu>
        <HeaderRightBar />
      </header>
      <Tabs />
      <Main />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { searchTree } from 'xe-utils'
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import Menu from './components/Menu/index.vue'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import MenuFoldBtn from './components/MenuFoldBtn.vue'
import { useAppStore, useRouteStore } from '@/stores'
import { isExternal } from '@/utils/validate'
import { filterTree } from '@/utils'
import { useDevice, useRouteListener } from '@/hooks'

/** 组件名称 */
defineOptions({ name: 'LayoutMix' })

const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { listenerRouteChange } = useRouteListener()
const { isDesktop } = useDevice()

/** 菜单配置 */
const menuTriggerProps = {
  animationName: 'slide-dynamic-origin'
}

/** 菜单数据处理 */
// 过滤菜单路由
const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
const menuRoutes = filterTree(cloneRoutes, (i) => i.meta?.hidden === false)

// 顶部一级菜单
const topMenus = ref<RouteRecordRaw[]>(JSON.parse(JSON.stringify(menuRoutes)))

// 克隆菜单路由
const cloneMenuRoutes: RouteRecordRaw[] = JSON.parse(JSON.stringify(menuRoutes))
const activeMenu = ref<string[]>([])
const leftMenus = ref<RouteRecordRaw[]>([])

/** 获取左侧菜单 */
const getLeftMenus = (key: string) => {
  const foundItems = searchTree(cloneMenuRoutes, (item) => item.path === key, { children: 'children' })
  const rootPath = foundItems.length ? foundItems[0].path : ''
  const targetMenu = cloneMenuRoutes.find((item) => item.path === rootPath)

  activeMenu.value = targetMenu ? [targetMenu.path] : ['']
  leftMenus.value = targetMenu ? (targetMenu.children as RouteRecordRaw[]) : []
}

/** 工具函数 */
const getMenuIcon = (item: RouteRecordRaw, key: 'svgIcon' | 'icon') => {
  return item.meta?.[key] || item.children?.[0]?.meta?.[key]
}

/** 事件处理 */
const handleMenuItemClick = (key: string) => {
  if (isExternal(key)) {
    window.open(key)
    return
  }

  setTimeout(() => getLeftMenus(key))
  const targetMenu = topMenus.value.find((item) => item.path === key)
  if (targetMenu?.redirect === 'noRedirect') return

  router.push({ path: key })
}

/** 监听路由变化 */
listenerRouteChange(({ to }) => {
  getLeftMenus(to.path)
})
</script>

<style lang="scss" scoped>
:deep(.arco-menu-pop) {
  white-space: nowrap;
}

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

:deep(.arco-menu-horizontal) {
  flex: 1;
  overflow: hidden;

  .arco-menu-inner {
    padding-left: 0;

    .arco-menu-overflow-wrap {
      white-space: nowrap;
    }
  }
}

.layout-mix {
  height: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;

  &-left {
    border-right: 1px solid var(--color-border);
    background-color: var(--color-bg-1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

.header {
  padding: 0 $padding;
  height: 56px;
  color: var(--color-text-1);
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
</style>
