<template>
  <div class="file-path">
    <a-breadcrumb>
      <a-breadcrumb-item><span class="file-path__item">全部</span></a-breadcrumb-item>
      <a-breadcrumb-item><span class="file-path__item">文件夹</span></a-breadcrumb-item>
      <a-breadcrumb-item><span class="file-path__item">分类</span></a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'FilePath' })
</script>

<style lang="scss" scoped>
.file-path {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  padding: 10px var(--padding) 12px;
  cursor: pointer;

  &__item {
    font-size: 12px;

    &:hover {
      color: rgb(var(--primary-6));
    }
  }
}
</style>
