<template>
  <a-layout class="layout layout-left" v-if="appStore.layout === 'left'">
    <Asider></Asider>
    <a-layout class="layout-right">
      <Header></Header>
      <Tabs></Tabs>
      <Main></Main>
    </a-layout>
  </a-layout>

  <div class="layout layout-top" v-if="appStore.layout === 'top'">
    <div style="overflow: hidden; height: 60px">
      <Menu></Menu>
    </div>
    <Tabs></Tabs>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Asider from './components/Asider/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import { useAppStore } from '@/stores'
import Menu from './components/Menu/index.vue'

defineOptions({ name: 'Layout' })
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.layout-left {
  flex-direction: row;
  &-right {
    overflow: hidden;
  }
}

.layout-top {
  flex-direction: column;
  overflow: hidden;
}
</style>
