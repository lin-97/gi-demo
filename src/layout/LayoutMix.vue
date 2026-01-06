<!--
  @file LayoutMix 组件
  @description 混合布局组件，支持顶部导航和左侧菜单组合的布局方式
-->
<template>
  <div class="layout-mix">
    <!-- 左侧菜单区域 -->
    <section v-if="isDesktop" class="layout-mix-left asider" :class="{ 'app-menu-dark': appStore.menuDark }"
      :style="getMenuStyle">
      <a-layout-sider - sider class=" asider__menu" collapsible breakpoint="xl" hide-trigger :width="200"
        :collapsed="appStore.menuCollapse">
        <Logo :collapsed="appStore.menuCollapse" />
        <a-scrollbar outer-class="asider__menu-scroll-view" style="height: 100%; overflow: auto">
          <a-menu :theme="menuTheme" mode="vertical" auto-open-selected :collapsed="shouldCollapse"
            :selected-keys="[twoActivePath]" breakpoint="xl" :accordion="appStore.menuAccordion"
            @menu-item-click="handleTwoMenuItemClick">
            <MenuItem v-for="(item, index) in twoLevelMenus" :key="item.path + index" :item="item" />
          </a-menu>
        </a-scrollbar>
      </a-layout-sider>
    </section>

    <!-- 右侧内容区域 -->
    <section class="layout-mix-right">
      <header class="header" :class="{ 'app-menu-dark': appStore.menuDark }" :style="getMenuStyle">
        <MenuFoldBtn />
        <a-menu mode="horizontal" :theme="menuTheme" :selected-keys="[oneActivePath]"
          @menu-item-click="handleOneMenuItemClick">
          <MenuItem v-for="(item, index) in topMenus" :key="item.path + index" :item="item" />
        </a-menu>
        <HeaderRightBar />
      </header>
      <Tabs v-if="appStore.tabVisible" />
      <Main />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDevice } from '@/hooks'
import { useLevelMenu } from '@/layout/hooks/useLevelMenu'
import { useAppStore } from '@/stores'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import Main from './components/Main.vue'
import MenuItem from './components/Menu/MenuItem.vue'
import MenuFoldBtn from './components/MenuFoldBtn.vue'
import Tabs from './components/Tabs/index.vue'

/** 组件名称 */
defineOptions({ name: 'LayoutMix' })

const appStore = useAppStore()
const { isDesktop } = useDevice()

const { oneLevelMenus, twoLevelMenus, oneActivePath, twoActivePath, getOneLevelMenus, handleOneMenuItemClick, handleTwoMenuItemClick, getMenuStyle } = useLevelMenu()
getOneLevelMenus()

const topMenus = computed(() => {
  const arr = JSON.parse(JSON.stringify(oneLevelMenus.value))
  arr.forEach((i) => {
    delete i.children
  })
  return arr
})

// 是否折叠菜单
const shouldCollapse = computed(() =>
  !isDesktop.value ? false : appStore.menuCollapse
)

const menuTheme = computed(() => appStore.menuDark ? 'dark' : 'light')
</script>

<style lang="scss" scoped>
:deep(.arco-menu-pop) {
  white-space: nowrap;
}

:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {

  // Menu菜单组件修改
  .arco-menu-icon {
    padding: 10px 0;
    margin-right: 0;
  }

  .arco-menu-has-icon {
    justify-content: center;
    padding: 0;
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
  display: flex;
  align-items: stretch;
  height: 100%;
  overflow: hidden;

  &-left {
    overflow: hidden;
  }

  &-right {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 $padding;
  overflow: hidden;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  border-bottom: 1px solid var(--color-border);
}

.asider {
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  color: var(--color-text-1);
  background-color: var(--color-bg-1);
  border-right: 1px solid var(--color-border-2);

  :deep(.arco-layout-sider-children) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__menu {
    flex: 1;
    overflow: hidden;
    background-color: inherit;
  }

  &__menu-scroll-view {
    flex: 1;
    overflow: hidden;
  }
}
</style>
