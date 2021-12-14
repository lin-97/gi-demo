<template>
  <a-layout class="gi-layout">
    <GiAside></GiAside>
    <a-layout>
      <GiHeader></GiHeader>
      <GiMain></GiMain>
    </a-layout>
  </a-layout>
</template>

<script setup>
import GiAside from './components/GiAside.vue'
import GiHeader from './components/GiHeader.vue'
import GiMain from './components/GiMain.vue'
</script>

<style scoped>
.gi-layout {
  height: 100%;
}
</style>
