<template>
  <a-layout class="main">
    <router-view>
      <template #default="{ Component, route }">
        <transition :name="appStore.transitionName" mode="out-in" appear>
          <keep-alive :include="navtabStore.cacheList">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts" name="Main">
import { useNavTabStore, useAppStore } from '@/store'
const navtabStore = useNavTabStore()
const appStore = useAppStore()
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
