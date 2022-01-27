<template>
  <a-layout class="gi-layout">
    <Aside></Aside>
    <a-layout>
      <Header></Header>
      <NavTab></NavTab>
      <Main></Main>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import NavTab from './components/NavTab.vue'
</script>

<style scoped>
.gi-layout {
  height: 100%;
}
</style>
