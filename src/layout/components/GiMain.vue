<template>
  <a-layout class="gi-main">
    <!-- <router-view #default="{ Component }">
      <transition name="fade-transform" class="abs">
        <component :is="Component" :key="key" />
      </transition>
    </router-view> -->
    <router-view></router-view>
  </a-layout>
</template>

<script setup>
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
</style>
