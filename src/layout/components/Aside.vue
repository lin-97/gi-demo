<template>
  <a-layout-sider collapsible breakpoint="xl" class="aside">
    <a-menu
      :selected-keys="[activeKey]"
      :default-open-keys="['/home']"
      :auto-open-selected="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <MenuItem v-for="item in menuStore.menuTree" :key="item.id" :data="item" @click="handleClickItem"></MenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts" name="Aside">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/store'
import MenuItem from './MenuItem.vue'
import type { MenuItem as IMenuItem } from './type'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()

const getMenuKeys = (params: IMenuItem[]) => {
  const data: string[] = []
  function forTree(arr: IMenuItem[]) {
    arr.forEach((item: IMenuItem) => {
      if (item.path) {
        data.push(item.path)
      }
      if (item.children?.length) {
        forTree(item.children)
      }
    })
  }
  forTree(params)
  return data
}

const activeKey = ref('/home')
const menuKeyList = getMenuKeys(menuStore.menuTree)

onMounted(() => {
  if (menuKeyList.includes(route.path)) {
    activeKey.value = route.path
  }
})

const handleClickItem = (item: IMenuItem) => {
  if (item.path) {
    if (item.path === '/file') {
      router.push({ path: item.path, query: { fileType: 0 } })
    } else {
      router.push({ path: item.path })
    }
    if (menuKeyList.includes(item.path)) {
      activeKey.value = item.path
    }
  }
}
</script>

<style lang="scss" scoped>
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
.aside {
  z-index: 999;
}
</style>
