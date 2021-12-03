<template>
  <a-layout-sider collapsible breakpoint="xl">
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
  width: 100%;
  height: 100%;
  &-item {
    height: 70px;
    color: #9ea6b2;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      color: #fff;
    }
    &:hover {
      color: #fff;
    }
    .menu-name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        margin: 5px;
        font-size: 25px;
      }
      .text {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        user-select: none;
      }
    }
    .menu-line {
      width: 3px;
      height: 60px;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      background: #fff;
    }
  }
}
</style>
