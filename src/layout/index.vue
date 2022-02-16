<template>
  <a-layout class="layout">
    <Aside></Aside>
    <a-layout>
      <Header></Header>
      <NavTab></NavTab>
      <Main></Main>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
