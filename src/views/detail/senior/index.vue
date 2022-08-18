<template>
  <div class="detail" ref="containerRef">
    <a-affix :target="containerRef">
      <section class="head">
        <a-page-header title="详情" subtitle="Detail Page">
          <template #extra>
            <a-button>返回</a-button>
          </template>
        </a-page-header>
      </section>
    </a-affix>

    <section class="item">
      <a-descriptions title="基本信息" layout="inline-horizontal" size="medium">
        <a-descriptions-item label="姓名：">Lin</a-descriptions-item>
        <a-descriptions-item label="性别：">男</a-descriptions-item>
        <a-descriptions-item label="生日：">07月16日</a-descriptions-item>
        <a-descriptions-item label="城市：">广州市</a-descriptions-item>
        <a-descriptions-item label="手机号：">155 **** 8810</a-descriptions-item>
        <a-descriptions-item label="邮箱：">326010228@qq.com</a-descriptions-item>
        <a-descriptions-item label="星座：">双鱼座</a-descriptions-item>
        <a-descriptions-item label="爱好：">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭：">哈哈哈</a-descriptions-item>
        <a-descriptions-item label="标签：">
          <a-space :size="5">
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </section>

    <a-row justify="space-between" class="item">
      <a-steps :current="2" direction="vertical">
        <a-step description="申请人：Lin">申请</a-step>
        <a-step description="审批人：尤大大"
          >领导审批<template #icon><GiDot></GiDot></template
        ></a-step>
        <a-step description="Echo">财务审批</a-step>
      </a-steps>

      <a-descriptions title="基本信息" layout="inline-horizontal" size="medium" style="flex: 1; margin-left: 20%">
        <a-descriptions-item label="姓名：">Lin</a-descriptions-item>
        <a-descriptions-item label="性别：">男</a-descriptions-item>
        <a-descriptions-item label="生日：">07月16日</a-descriptions-item>
        <a-descriptions-item label="城市：">广州市</a-descriptions-item>
        <a-descriptions-item label="手机号：">155 **** 8810</a-descriptions-item>
        <a-descriptions-item label="邮箱：">326010228@qq.com</a-descriptions-item>
        <a-descriptions-item label="星座：">双鱼座</a-descriptions-item>
        <a-descriptions-item label="爱好：">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭：">哈哈哈</a-descriptions-item>
        <a-descriptions-item label="标签：">
          <a-space :size="5">
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </a-row>

    <section class="item" style="padding: 0">
      <a-card title="审批流程" size="medium" :bordered="false">
        <a-steps :current="2" style="margin: 20px 0">
          <a-step description="申请人：Lin">申请</a-step>
          <a-step description="Mark"
            >领导审批<template #icon><GiDot></GiDot></template
          ></a-step>
          <a-step description="Echo">财务审批</a-step>
        </a-steps>
      </a-card>
    </section>

    <section class="item">
      <a-descriptions title="其他信息" :column="1">
        <a-descriptions-item label="姓名：">Lin</a-descriptions-item>
        <a-descriptions-item label="性别：">男</a-descriptions-item>
        <a-descriptions-item label="生日：">07月16日</a-descriptions-item>
        <a-descriptions-item label="城市：">广州市</a-descriptions-item>
        <a-descriptions-item label="手机号：">155 **** 8810</a-descriptions-item>
        <a-descriptions-item label="邮箱：">326010228@qq.com</a-descriptions-item>
        <a-descriptions-item label="星座：">双鱼座</a-descriptions-item>
        <a-descriptions-item label="爱好：">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭：">哈哈哈</a-descriptions-item>
        <a-descriptions-item label="图像：">
          <img
            style="width: 400px"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F09fc753c76d4a8575c105452c81b76ba563c0d8d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652531003&t=100230590302237a20f8e136de146f6b"
          />
        </a-descriptions-item>
        <a-descriptions-item label="标签：">
          <a-space :size="5">
            <a-tag color="#f53f3f">vue3</a-tag>
            <a-tag color="#7816ff">pinia</a-tag>
            <a-tag color="#00b42a">vite</a-tag>
            <a-tag color="#165dff">ts</a-tag>
            <a-tag color="#ff7d00">arco design</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </section>
  </div>
</template>

<script setup lang="ts" name="SeniorDetail">
import { ref } from 'vue'

const containerRef = ref()
</script>

<style lang="scss" scoped>
:deep(.arco-steps-item-process .arco-steps-icon) {
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail {
  overflow: auto;
  .head {
    background: var(--color-bg-1);
  }
  .item {
    margin: $margin;
    padding: 20px 30px;
    background: var(--color-bg-1);
    border-radius: 2px;
  }
}
</style>
