<template>
  <div class="layout-mix">
    <header class="header">
      <a-menu
        mode="horizontal"
        :selected-keys="activeMenu"
        :auto-open-selected="false"
        @menu-item-click="onMenuItemClick"
      >
        <template v-for="item in menuRoutes" :key="item.path">
          <a-menu-item v-if="item.meta?.hidden === false" :key="item.path">{{ item.meta?.title }}</a-menu-item>
        </template>
      </a-menu>
      <HeaderRightBar></HeaderRightBar>
    </header>
    <div class="layout-mix-wrapper">
      <section class="left"></section>
      <section class="right">
        <Tabs></Tabs>
        <Main></Main>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import { useAppStore, useRouteStore } from '@/stores'

defineOptions({ name: 'LayoutMix' })
const routeStore = useRouteStore()
const menuRoutes = computed(() => routeStore.routes.map((i) => ({ ...i, children: null })))

watch(
  () => menuRoutes,
  () => {
    console.log('menuRoutes', menuRoutes.value)
  },
  { immediate: true }
)

const activeMenu = ref([])

const onMenuItemClick = () => {}
</script>

<style lang="scss" scoped>
.layout-mix {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .layout-mix-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    .left {
      width: 220px;
      background-color: pink;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
}

.header {
  padding: 0 $padding;
  height: 56px;
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-neutral-3);
  display: flex;
  justify-content: end;
  align-items: center;
}
</style>
