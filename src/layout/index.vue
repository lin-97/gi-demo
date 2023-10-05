<template>
  <a-layout class="layout">
    <Asider></Asider>
    <a-layout class="layout-right">
      <Header></Header>
      <Tabs></Tabs>
      <Main></Main>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Asider from './components/Asider/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'

defineOptions({ name: 'Layout' })
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  flex-direction: row;
  &-right {
    overflow: hidden;
  }
}
</style>
