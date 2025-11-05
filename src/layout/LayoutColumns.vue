<template>
  <div class="layout-columns">
    <div v-show="isDesktop" class="layout-columns__left">
      <!-- 左侧一级菜单区域 -->
      <OneLevelMenu :menus="oneLevelMenus" @menu-click="handleMenuClick"></OneLevelMenu>

      <!-- 左侧二级菜单区域 -->
      <Menu v-if="twoLevelMenus.length > 1" class="layout-columns__menu" :menus="twoLevelMenus"
        :menu-style="{ width: '200px' }" />
    </div>

    <!-- 右侧内容区域 -->
    <section class="layout-columns__content">
      <Header />
      <Tabs v-if="appStore.tabVisible" />
      <Main />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { findTree, mapTree } from 'xe-utils'
import { useDevice } from '@/hooks'
import { useAppStore, useRouteStore } from '@/stores'
import { filterTree } from '@/utils'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Menu from './components/Menu/index.vue'
import OneLevelMenu from './components/OneLevelMenu/index.vue'
import Tabs from './components/Tabs/index.vue'

defineOptions({ name: 'LayoutColumns' })

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { isDesktop } = useDevice()

// 处理菜单路由数据
const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]

// 一级菜单
const oneLevelMenus = ref<RouteRecordRaw[]>([])
function getOneLevelMenus() {
  const cloneList = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
  const formatList = mapTree(cloneList, (i) => {
    if (i?.children?.length === 1 && i?.meta?.alwaysShow !== true) {
      return i.children?.[0]
    }
    return i
  })
  const arr = formatList.filter((i) => i.meta?.hidden === false)
  return arr
}
oneLevelMenus.value = getOneLevelMenus()

// 二级菜单
const twoLevelMenus = computed(() => {
  const obj = findTree(showMenuList, (i) => i.path === route.path)
  return showMenuList?.[Number(obj.path[0])]?.children || []
})

function handleMenuClick(item: RouteRecordRaw) {
  if (item.redirect === 'noRedirect') {
    router.replace({ path: item.children?.[0]?.path })
    return
  }
  router.replace({ path: (item.redirect as string) || item.path })
}
</script>

<style lang="scss" scoped>
.layout-columns {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  &__left {
    height: 100%;
    background-color: var(--color-bg-1);
    overflow: hidden;
    display: flex;
  }

  &__menu {
    border-right: 1px solid var(--color-border-2);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
