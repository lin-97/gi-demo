<template>
  <a-layout class="gi-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in" appear>
          <keep-alive :include="navtab.cacheList">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </a-layout>
</template>

<script setup lang="ts">
import { useNavTabStore } from '@/store/navtab'
const navtab = useNavTabStore()
</script>

<style lang="scss" scoped>
.gi-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
