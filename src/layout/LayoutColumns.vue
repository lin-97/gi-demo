<template>
  <div class="layout-columns">
    <div v-show="isDesktop" class="layout-columns__left">
      <!-- 左侧一级菜单区域 -->
      <OneLevelMenu :data="oneLevelMenus" :active-path="oneActivePath"
        @menu-click="handleOneMenuItemClick($event.path)"></OneLevelMenu>

      <!-- 左侧二级菜单区域 -->
      <a-menu v-if="twoLevelMenus.length > 1 || oneActiveRoute?.meta?.alwaysShow === true" class="layout-columns__menu"
        :selected-keys="[twoActivePath]" :accordion="appStore.menuAccordion" :collapsed="appStore.menuCollapse"
        :style="{ width: '180px' }" @menu-item-click="handleTwoMenuItemClick">
        <MenuItem v-for="(item, index) in twoLevelMenus" :key="item.path + index" :item="item" />
      </a-menu>
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
import { useDevice } from '@/hooks'
import { useLevelMenu } from '@/layout/hooks/useLevelMenu'
import { useAppStore } from '@/stores'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import MenuItem from './components/Menu/MenuItem.vue'
import OneLevelMenu from './components/OneLevelMenu/index.vue'
import Tabs from './components/Tabs/index.vue'

defineOptions({ name: 'LayoutColumns' })

const appStore = useAppStore()
const { isDesktop } = useDevice()

const { oneLevelMenus, twoLevelMenus, oneActiveRoute, oneActivePath, twoActivePath, getOneLevelMenus, handleOneMenuItemClick, handleTwoMenuItemClick } = useLevelMenu()
getOneLevelMenus()
</script>

<style lang="scss" scoped>
.layout-columns {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__left {
    display: flex;
    height: 100%;
    overflow: hidden;
    background-color: var(--color-bg-1);
  }

  &__menu {
    border-right: 1px solid var(--color-border-2);
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
