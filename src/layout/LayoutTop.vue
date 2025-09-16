<template>
  <div class="layout-top">
    <a-row align="center" class="layout-top__header">
      <Logo></Logo>
      <Menu class="layout-top__menu"></Menu>
      <HeaderRightBar></HeaderRightBar>
    </a-row>
    <Tabs v-if="appStore.tabVisible"></Tabs>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import Main from './components/Main.vue'
import Menu from './components/Menu/index.vue'
import Tabs from './components/Tabs/index.vue'

defineOptions({ name: 'LayoutTop' })

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout-top {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-1);
    padding-right: 16px;
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
