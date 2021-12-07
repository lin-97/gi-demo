<template>
  <a-layout-sider collapsible breakpoint="xl" class="gi-aside">
    <div class="logo" />
    <a-menu :defaultSelectedKeys="[activePath]" :style="{ width: '100%' }" @menuItemClick="onClickMenuItem">
      <a-menu-item v-for="item in menuList" :key="item.path" @click="handleClickItem(item)">
        <IconHome />
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

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { IconCaretRight, IconCaretLeft, IconHome, IconCalendar } from '@arco-design/web-vue/es/icon'

const store = useStore()
const router = useRouter()
console.log(store)
const menuList = computed(() => store.state.app.menuList)
const activePath = computed(() => store.state.app.activePath)

const handleClickItem = (item) => {
  store.commit('app/storeSetActivePath', item.path)
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.gi-aside {
  z-index: 999;
}
</style>
