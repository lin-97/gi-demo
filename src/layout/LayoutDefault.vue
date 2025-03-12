<template>
  <a-layout class="layout-default">
    <Asider></Asider>
    <a-layout class="layout-default__right">
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

defineOptions({ name: 'LayoutDefault' })
</script>

<style lang="scss" scoped>
.layout-default {
  height: 100%;
  flex-direction: row;

  &__right {
    overflow: hidden;
  }
}
</style>
