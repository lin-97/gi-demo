<template>
  <a-layout class="main">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.matched[1].meta.animation !== false ? appStore.transitionName : ''" mode="out-in" appear>
        <keep-alive :include="(tabsStore.cacheList as string[])">
          <component :is="Component" :key="route.matched[1].path" />
        </keep-alive>
      </transition>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts" name="Main">
import { useAppStore, useTabsStore } from '@/store'

const appStore = useAppStore()
const tabsStore = useTabsStore()
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
</style>
