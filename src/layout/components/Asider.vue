<template>
  <a-layout-sider collapsible breakpoint="xl" class="asider">
    <a-menu
      :selected-keys="[activeKey]"
      :default-open-keys="['Workplace']"
      :auto-open-selected="true"
      :style="{ width: '100%', height: '100%' }"
    >
      <LoopMenuItem v-for="item in menuTree" :key="item.name" :data="item" @click="handleClickItem"></LoopMenuItem>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts" name="Asider">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoopMenuItem from './MenuItem.vue'
import useMenuTree from './useMenuTree'

const route = useRoute()
const router = useRouter()

const { menuTree } = useMenuTree()

const getMenuKeys = (params: MenuItem[]) => {
  const data: string[] = []
  function forTree(arr: MenuItem[]) {
    arr.forEach((item: MenuItem) => {
      if (item.name) {
        data.push(item.name)
      }
      if (item.children?.length) {
        forTree(item.children)
      }
    })
  }
  forTree(params)
  return data
}

const activeKey = ref('Workplace')
const menuKeyList = getMenuKeys(menuTree.value)

watch(
  () => route.path,
  () => {
    console.log(route)
    if (menuKeyList.includes(route.name?.toString() || '')) {
      activeKey.value = route.name?.toString() || ''
    }
  },
  { immediate: true }
)

const handleClickItem = (item: MenuItem) => {
  activeKey.value = item.name
  if (item.name) {
    if (item.name === 'File') {
      router.push({ name: item.name, query: { fileType: 0 } })
    } else {
      router.push({ name: item.name })
    }
    if (menuKeyList.includes(item.path)) {
      activeKey.value = item.name
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

.asider {
  z-index: 9;
}
</style>
