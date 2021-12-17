<template>
  <a-layout class="gi-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in" appear>
          <component :is="Component" :key="route.path" />
        </transition>
      </template>
    </router-view>
    <!-- <router-view></router-view> -->
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let key = computed(() => route.path)
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
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  z-index: 999;
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
