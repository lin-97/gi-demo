<template>
  <div class="detail">
    <section class="item">
      <a-descriptions :data="data.list" title="基本信息" layout="inline-horizontal" />
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'

const data = reactive({
  list: [
    {
      label: '姓名：',
      value: 'Lin'
    },
    {
      label: '手机号：',
      value: '123-1234-1234'
    },
    {
      label: '邮箱：',
      value: '326010228@qq.com'
    },
    {
      label: '性别：',
      value: '男'
    },
    {
      label: '地址：',
      value: '广州天河区'
    }
  ]
})
</script>

<style lang="scss" scoped>
.detail {
  background: var(--color-bg-2);
  .item {
    padding: 20px 30px;
  }
}
</style>
