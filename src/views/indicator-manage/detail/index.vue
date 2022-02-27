<template>
  <div class="detail">
    <section class="head">
      <a-page-header title="详情" subtitle="指标管理详情" @back="back">
        <template #breadcrumb>
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in route.matched" :key="index">{{
              item.meta.title
            }}</a-breadcrumb-item>
          </a-breadcrumb>
        </template>
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
      </a-page-header>
    </section>
    <section class="item">
      <a-descriptions :data="list" title="基本信息" layout="inline-horizontal"> </a-descriptions>
    </section>

    <section class="item">
      <a-descriptions title="其他信息" :column="1">
        <a-descriptions-item label="星座">双鱼座</a-descriptions-item>
        <a-descriptions-item label="生日">07月16日</a-descriptions-item>
        <a-descriptions-item label="标签">
          <a-space :size="5">
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="爱好">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="性别">
          <a-switch type="round" size="medium" :default-checked="true">
            <template #checked> 男 </template>
            <template #unchecked> 女 </template>
          </a-switch>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">哈哈哈</a-descriptions-item>
      </a-descriptions>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

type ListItem = {
  label: string
  value: string | number
}

const list = ref<ListItem[]>([
  { label: '姓名：', value: 'Lin' },
  { label: '手机号：', value: '123-1234-1234' },
  { label: '邮箱：', value: '326010228@qq.com' },
  { label: '性别：', value: '男' },
  { label: '地址：', value: '广州越秀区' }
])

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-2);
  }
  .item {
    margin: $margin;
    padding: 20px 30px;
    background: var(--color-bg-2);
    border-radius: 2px;
  }
}
</style>
