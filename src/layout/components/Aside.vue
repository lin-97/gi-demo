<template>
  <a-layout-sider collapsible breakpoint="xl" class="the-aside">
    <div class="logo" />
    <a-menu :selected-keys="[appStore.activePath]" :style="{ width: '100%', height: '100%' }">
      <a-menu-item v-for="item in appStore.menuList" :key="item.path" @click="handleClickItem(item)">
        <template #icon><GiSvgIcon class="menu-icon" :name="item.icon"></GiSvgIcon></template>
        {{ item.name }}
      </a-menu-item>
    </a-menu>
    <!-- trigger -->
    <!-- <template #trigger="{ collapsed }">
      <IconCaretRight v-if="collapsed" />
      <IconCaretLeft v-else />
    </template> -->
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store'
const router = useRouter()
const appStore = useAppStore()

const handleClickItem = (item) => {
  appStore.setActivePath(item.path)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
:deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
  // Menu菜单组件修改
  .arco-menu-icon {
    margin-right: 0;
  }
  .arco-menu-has-icon {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arco-menu-title {
    display: none;
  }
}
.the-aside {
  z-index: 999;
  .menu-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
