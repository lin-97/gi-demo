<template>
  <a-layout class="gi-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform">
          <component :is="Component" :key="route.fullPath" />
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

.abs {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
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

.slide-y-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }

  &-move {
    transition: transform 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-15px);
  }
}

.slide-y-reverse-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }

  &-move {
    transition: transform 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(15px);
  }
}

.slide-x-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }

  &-move {
    transition: transform 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(-15px);
  }
}

.slide-x-reverse-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
  }

  &-move {
    transition: transform 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(15px);
  }
}
</style>
