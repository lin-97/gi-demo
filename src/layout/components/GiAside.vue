<template>
  <a-layout-sider collapsible breakpoint="xl" class="gi-aside">
    <div class="logo" />
    <a-menu :defaultSelectedKeys="[activePath]" :style="{ width: '100%', height: '100%' }">
      <a-menu-item v-for="item in menuList" :key="item.path" @click="handleClickItem(item)">
        <component :is="item.icon"></component>
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
const store = useStore()
const router = useRouter()

const menuList = computed(() => store.state.app.menuList)
const activePath = computed(() => store.state.app.activePath)

const handleClickItem = (item: MenuItem) => {
  store.commit('app/storeSetActivePath', item.path)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.gi-aside {
  z-index: 999;
}
</style>
