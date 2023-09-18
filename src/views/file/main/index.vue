<template>
  <div class="file-manage">
    <FileAside></FileAside>
    <FileMain></FileMain>
  </div>
</template>

<script setup lang="ts">
import FileAside from './FileAside.vue'
import FileMain from './FileMain/index.vue'

defineOptions({ name: 'FileIndex' })
</script>

<style lang="scss" scoped>
.file-manage {
  flex: 1;
  overflow: hidden;
  display: flex;
}
</style>
