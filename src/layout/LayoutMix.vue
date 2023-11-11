<template>
  <div class="layout-mix">
    <header class="header">
      <Logo></Logo>
      <a-menu
        mode="horizontal"
        :selected-keys="activeMenu"
        :auto-open-selected="false"
        @menu-item-click="onMenuItemClick"
      >
        <a-menu-item
          v-for="item in menuRoutes"
          :key="item?.redirect && item.redirect !=='noRedirect' ? item.redirect as string:  item.path"
        >
          <template #icon>
            <GiSvgIcon
              v-if="item?.meta?.svgIcon || item?.meta?.svgIcon || item.children?.[0]?.meta?.svgIcon"
              :name="item?.meta?.svgIcon || item?.meta?.svgIcon || item.children?.[0]?.meta?.svgIcon"
              :size="24"
            ></GiSvgIcon>
            <template v-else>
              <component
                v-if="item?.meta?.icon || item?.meta?.icon || item.children?.[0]?.meta?.icon"
                :is="item?.meta?.icon || item?.meta?.icon || item.children?.[0]?.meta?.icon"
              ></component>
            </template>
          </template>
          <span>{{ item.meta?.title || item.children?.[0]?.meta?.title || '' }}</span>
        </a-menu-item>
      </a-menu>
      <HeaderRightBar></HeaderRightBar>
    </header>
    <div class="layout-mix-wrapper">
      <section class="left">
        <Menu :menus="childrenMenus"></Menu>
      </section>
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
import Menu from './components/Menu/index.vue'
import HeaderRightBar from './components/HeaderRightBar/index.vue'
import Logo from './components/Logo.vue'
import { useRouteStore } from '@/stores'
import type { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'

defineOptions({ name: 'LayoutMix' })
const route = useRoute()
const router = useRouter()
const routeStore = useRouteStore()

const menuRoutes = ref<RouteRecordRaw[]>([])
menuRoutes.value = JSON.parse(JSON.stringify(routeStore.routes))
menuRoutes.value = menuRoutes.value.filter((i) => i.meta?.hidden === false)
menuRoutes.value.forEach((item) => {
  if (item.children && item.children.length) {
    const showChildrens = item.children.filter((i) => i.meta?.hidden === false)
    if (showChildrens.length === 1) {
      // item = { ...item, meta: showChildrens[0].meta }
      item.children = showChildrens
    }
  }
})
console.log('menuRoutes', toRaw(menuRoutes.value))

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
  getChildrenMenus(key)
  const obj = menuRoutes.value.find((i) => i.path === key)
  if (obj && obj.redirect === 'noRedirect') return
  router.push({ path: key })
}

const childrenMenus = ref<RouteRecordRaw[]>([])
const getChildrenMenus = (key: string) => {
  const obj = routeStore.routes.find((i) => i.path === key || (i.redirect === key && i.redirect !== 'noRedirect'))
  if (obj) {
    childrenMenus.value = obj.children as RouteRecordRaw[]
  }
}

getChildrenMenus(route.path)
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
      width: 200px;
      border-right: 1px solid var(--color-border);
      background-color: var(--color-bg-1);
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
  padding-left: 0;
  height: 56px;
  background: var(--color-bg-1);
  border-bottom: 1px solid var(--color-neutral-3);
  display: flex;
  justify-content: end;
  align-items: center;
  overflow: hidden;
}
</style>
