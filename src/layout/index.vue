<template>
  <a-layout class="layout">
    <Asider></Asider>
    <a-layout>
      <Header></Header>
      <NavTab></NavTab>
      <Main></Main>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Asider from './components/Asider.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  flex-direction: row;
}
</style>
