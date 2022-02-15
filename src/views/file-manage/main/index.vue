<template>
  <div class="file-manage">
    <FileAside></FileAside>
    <FileMain></FileMain>
  </div>
</template>

<script setup lang="ts" name="FileManage">
import FileAside from './FileAside.vue'
import FileMain from './FileMain/index.vue'
</script>

<style lang="scss" scoped>
.file-manage {
  flex: 1;
  overflow: hidden;
  display: flex;
}
</style>
