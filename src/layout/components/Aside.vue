<template>
  <a-layout-sider collapsible breakpoint="xl" class="gi-aside">
    <div class="logo" />
    <a-menu :selected-keys="[app.activePath]" :style="{ width: '100%', height: '100%' }">
      <a-menu-item v-for="item in app.menuList" :key="item.path" @click="handleClickItem(item)">
        <template #icon><GiSvgIcon class="menu-icon" :name="item.icon"></GiSvgIcon></template>
        {{ item.name }}
      </a-menu-item>
    </a-menu>
    <!-- trigger -->
    <template #trigger="{ collapsed }">
      <IconCaretRight v-if="collapsed" />
      <IconCaretLeft v-else />
    </template>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { MenuItem } from '@/models'
import { useAppStore } from '@/store/app'
const router = useRouter()
const app = useAppStore()

const handleClickItem = (item: MenuItem) => {
  app.setActivePath(item.path)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.gi-aside {
  z-index: 999;
  .menu-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
