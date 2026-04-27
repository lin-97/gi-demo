<template>
  <div class="g-page">
    <a-watermark content="gi.admin.pro">
      <a-card title="基本信息" :bordered="false">
        <template #extra>
          <a-button>返回</a-button>
        </template>
        <a-descriptions table-layout="fixed" layout="inline-horizontal"
          :column="{ xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }">
          <a-descriptions-item label="姓名：">Lin</a-descriptions-item>
          <a-descriptions-item label="性别：">男</a-descriptions-item>
          <a-descriptions-item label="生日：">07月16日</a-descriptions-item>
          <a-descriptions-item label="城市：">广州市</a-descriptions-item>
          <a-descriptions-item label="手机号：">155 **** 8810</a-descriptions-item>
          <a-descriptions-item label="邮箱：">326010228@qq.com</a-descriptions-item>
          <a-descriptions-item label="星座：">双鱼座</a-descriptions-item>
          <a-descriptions-item label="爱好：">
            <a-space :size="5" wrap>
              <a-tag color="purple">王者荣耀</a-tag>
              <a-tag color="magenta">打疫苗</a-tag>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item label="座右铭：">哈哈哈</a-descriptions-item>
          <a-descriptions-item label="标签：">
            <a-space :size="5" wrap>
              <a-tag color="#f53f3f">vue3</a-tag>
              <a-tag color="#7816ff">pinia</a-tag>
              <a-tag color="#00b42a">vite</a-tag>
              <a-tag color="#165dff">ts</a-tag>
              <a-tag color="#ff7d00">arco design</a-tag>
            </a-space>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>

      <a-card title="其他信息" :bordered="false" class="g-mt">
        <a-descriptions :column="1">
          <a-descriptions-item label="姓名">Lin</a-descriptions-item>
          <a-descriptions-item label="性别">男</a-descriptions-item>
          <a-descriptions-item label="生日">07月16日</a-descriptions-item>
          <a-descriptions-item label="城市">广州市</a-descriptions-item>
          <a-descriptions-item label="手机号">155 **** 8810</a-descriptions-item>
          <a-descriptions-item label="邮箱">326010228@qq.com</a-descriptions-item>
          <a-descriptions-item label="星座">双鱼座</a-descriptions-item>
          <a-descriptions-item label="爱好">
            <a-space :size="5" wrap>
              <a-tag color="purple">王者荣耀</a-tag>
              <a-tag color="magenta">打疫苗</a-tag>
            </a-space>
          </a-descriptions-item>
          <a-descriptions-item label="座右铭">哈哈哈</a-descriptions-item>
          <a-descriptions-item label="图像">
            <img style="width: 100%; max-width: 400px" src="https://s1.ax1x.com/2022/06/14/XhNRDf.jpg" />
          </a-descriptions-item>
          <a-descriptions-item label="标签">
            <a-space :size="5" wrap>
              <a-tag color="#f53f3f">vue3</a-tag>
              <a-tag color="#7816ff">pinia</a-tag>
              <a-tag color="#00b42a">vite</a-tag>
              <a-tag color="#165dff">ts</a-tag>
              <a-tag color="#ff7d00">arco design</a-tag>
            </a-space>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-watermark>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DetailBase' })
</script>

<style lang="scss" scoped></style>
