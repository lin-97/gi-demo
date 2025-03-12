<!--
  @file Main 组件
  @description 主内容区组件，支持路由切换动画、页面缓存和组件重载功能
-->
<template>
  <a-layout class="main">
    <router-view v-slot="{ Component, route }">
      <transition :name="appStore.transitionName" mode="out-in" appear>
        <keep-alive :include="(tabsStore.cacheList as string[])">
          <component :is="Component" v-if="tabsStore.reloadFlag" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts">
import { useAppStore, useTabsStore } from '@/stores'

/** 组件名称 */
defineOptions({ name: 'AppMain' })

/** 状态管理 */
const appStore = useAppStore()
const tabsStore = useTabsStore()
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
