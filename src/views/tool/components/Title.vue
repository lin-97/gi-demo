<template>
  <a-space direction="vertical" fill class="title-box">
    <GiTitle title="基础详情"> </GiTitle>

    <GiTitle title="基础详情">
      <a-button type="primary">确认</a-button>
      <a-button>返回</a-button>
    </GiTitle>

    <GiTitle title="基础详情" border-type="solid">
      <a-input :style="{ width: '250px' }" placeholder="请输入关键词搜索" allow-clear>
        <template #prefix>
          <icon-search />
        </template>
      </a-input>
    </GiTitle>

    <GiTitle title="标题" fill>
      <a-button type="primary">确认</a-button>
      <a-button>返回</a-button>
    </GiTitle>

    <GiTitle title="标题" fill shadow>
      <a-button type="primary">确认</a-button>
      <a-button>返回</a-button>
    </GiTitle>
  </a-space>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.title-box {
  height: 100%;
  border: 1px solid var(--color-border-3);
}
</style>
