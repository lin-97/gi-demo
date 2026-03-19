<template>
  <div>
    <a-typography-text type="secondary">提供常用的图标按钮，不支持的场景使用回a-button组件</a-typography-text>
    <a-card title="基本类型" :bordered="true" class="gi-my">
      <template #extra>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </template>
      <a-space wrap>
        <GiButton type="add"></GiButton>
        <GiButton type="add" loading></GiButton>
        <GiButton type="edit"></GiButton>
        <GiButton type="edit" disabled></GiButton>
        <GiButton type="delete"></GiButton>
        <GiButton type="search"></GiButton>
        <GiButton type="search">查询</GiButton>
        <GiButton type="reset"></GiButton>
        <GiButton type="upload"></GiButton>
        <GiButton type="import"></GiButton>
        <GiButton type="export"></GiButton>
      </a-space>
    </a-card>

    <a-card title="尺寸大小" :bordered="true" class="gi-mb">
      <a-space wrap>
        <GiButton type="add" size="mini"></GiButton>
        <GiButton type="edit" size="small"></GiButton>
        <GiButton type="delete" size="medium"></GiButton>
        <GiButton type="search" size="large"></GiButton>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import CodeJson from './index.vue?raw'
</script>

<style lang="scss" scoped></style>
