<template>
  <div class="detail">
    <section class="head">
      <a-page-header title="详情" subtitle="指标管理详情" @back="back">
        <template #breadcrumb>
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Channel</a-breadcrumb-item>
            <a-breadcrumb-item>News</a-breadcrumb-item>
          </a-breadcrumb>
        </template>
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
      </a-page-header>
    </section>
    <section class="item" v-for="i in 3" :key="i">
      <a-descriptions :data="data.list" title="基本信息" layout="inline-horizontal"> </a-descriptions>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

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

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.detail {
  .head {
    background: var(--color-bg-2);
  }
  .item {
    margin: 0 $margin;
    margin-top: $margin;
    padding: 20px 30px;
    background: var(--color-bg-2);
  }
}
</style>
