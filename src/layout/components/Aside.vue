<template>
  <a-layout-sider collapsible breakpoint="xl" class="aside">
    <a-menu
      :selected-keys="[appStore.activePath]"
      :default-open-keys="['/']"
      :style="{ width: '100%', height: '100%' }"
    >
      <template v-for="item in menuStore.list">
        <a-sub-menu :key="item.path" v-if="item.children && item.children.length">
          <template #icon>
            <GiSvgIcon :size="24" :name="item.icon"></GiSvgIcon>
          </template>
          <template #title>{{ item.name }}</template>
          <template v-if="item.children && item.children.length">
            <a-menu-item v-for="i in item.children" :key="i.path" @click="handleClickItem(i)">
              {{ i.name }}
            </a-menu-item>
          </template>
        </a-sub-menu>

        <template v-else>
          <a-menu-item :key="item.path" @click="handleClickItem(item)">
            <template #icon>
              <GiSvgIcon :size="24" :name="item.icon"></GiSvgIcon>
            </template>
            {{ item.name }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore, useMenuStore } from '@/store'
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()

const handleClickItem = (item: Menu.MenuItem) => {
  if (item.path) {
    appStore.setActivePath(item.path)
    router.push({ path: item.path })
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
