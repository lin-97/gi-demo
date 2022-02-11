<template>
  <a-space direction="vertical" fill>
    <GiTitle title="基础详情"> </GiTitle>

    <GiTitle title="基础详情">
      <a-button type="primary">确认</a-button>
      <a-button>返回</a-button>
    </GiTitle>

    <GiTitle title="基础详情">
      <a-input :style="{ width: '250px' }" placeholder="请输入关键词搜索" allow-clear>
        <template #prefix>
          <icon-search />
        </template>
      </a-input>
    </GiTitle>
  </a-space>
</template>

<script setup lang="ts">
import GiTitle from '@/components/GiTitle.vue'
</script>
