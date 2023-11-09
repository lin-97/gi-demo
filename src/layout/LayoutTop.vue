<template>
  <div class="layout layout-top">
    <a-row align="center" class="header">
      <Menu style="flex: 1"></Menu>
      <HeaderRight></HeaderRight>
    </a-row>
    <Tabs></Tabs>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import Menu from './components/Menu/index.vue'
import HeaderRight from './components/HeaderRight/index.vue'

defineOptions({ name: 'LayoutTop' })
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
}

.layout-top {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-1);
  }
}
</style>
