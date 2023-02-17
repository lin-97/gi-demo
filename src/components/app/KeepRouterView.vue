<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="[...navtabStore.cacheList, ...['KeepRouterView']]">
      <component :is="Component" v-if="route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.keepAlive" />
  </router-view>
</template>

<script lang="ts" setup name="KeepRouterView">
import { useNavTabStore } from '@/store'

const navtabStore = useNavTabStore()
</script>

<style lang="scss" scoped></style>
