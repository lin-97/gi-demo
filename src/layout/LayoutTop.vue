<template>
  <div class="layout layout-top">
    <div class="header">
      <Menu></Menu>
    </div>
    <Tabs></Tabs>
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main.vue'
import Tabs from './components/Tabs/index.vue'
import Menu from './components/Menu/index.vue'

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
  }
}
</style>
