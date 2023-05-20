<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition :name="appStore.transitionName" mode="out-in" appear>
        <keep-alive :include="(tabsStore.cacheList as string[])">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useTabsStore, useAppStore } from '@/store'

defineOptions({ name: 'ParentView' })

const tabsStore = useTabsStore()
const appStore = useAppStore()
</script>

<style lang="scss" scoped></style>
