<template>
  <div class="layout-top">
    <a-row align="center" class="layout-top__header" :class="{ 'app-menu-dark': appStore.menuDark }"
      :style="getMenuStyle">
      <Logo></Logo>
      <a-menu class="layout-top__menu" mode="horizontal" :theme="menuTheme" :menu-trigger-props="menuTriggerProps"
        :selected-keys="selectedKeys" @menu-item-click="handleMenuItemClick">
        <MenuItem v-for="(item, index) in menuList" :key="item.path + index" :item="item" />
      </a-menu>
      <HeaderRightBar></HeaderRightBar>
    </a-row>
    <Tabs v-if="appStore.tabVisible"></Tabs>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/layout/hooks/useMenu'
import { useAppStore } from '@/stores'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import Main from './components/Main.vue'
import MenuItem from './components/Menu/MenuItem.vue'
import Tabs from './components/Tabs/index.vue'

defineOptions({ name: 'LayoutTop' })

const appStore = useAppStore()
const { menuTheme, menuList, menuTriggerProps, handleMenuItemClick, selectedKeys, getMenuStyle } = useMenu()
</script>

<style lang="scss" scoped>
.layout-top {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  &__header {
    box-sizing: border-box;
    width: 100%;
    padding-right: 16px;
    overflow: hidden;
    background-color: var(--color-bg-1);
    border-bottom: 1px solid var(--color-border);
  }

  &__menu {
    flex: 1;
    overflow: hidden;

    :deep(.arco-menu-inner) {
      padding-left: 0;
    }
  }
}
</style>
