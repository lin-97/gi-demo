<template>
  <div ref="containerRef" class="gi_page gi_p0">
    <a-affix :target="containerRef ?? undefined">
      <a-page-header title="详情" @back="back">
        <template #extra>
          <a-button @click="back">返回</a-button>
        </template>
      </a-page-header>
    </a-affix>

    <a-card title="基本信息" class="gi_mx gi_my">
      <a-descriptions table-layout="fixed" :label-style="{ width: '60px' }"
        :column="{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }">
        <a-descriptions-item label="姓名">Lin</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="生日">07月16日</a-descriptions-item>
        <a-descriptions-item label="城市">广州市</a-descriptions-item>
        <a-descriptions-item label="手机号">199 **** 6962</a-descriptions-item>
        <a-descriptions-item label="邮箱">326010228@qq.com</a-descriptions-item>
        <a-descriptions-item label="星座">双鱼座</a-descriptions-item>
        <a-descriptions-item label="爱好">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">优雅永不过时</a-descriptions-item>
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

    <a-card title="其他信息" class="gi_mx gi_my">
      <a-descriptions :column="1">
        <a-descriptions-item label="姓名">Lin</a-descriptions-item>
        <a-descriptions-item label="性别">男</a-descriptions-item>
        <a-descriptions-item label="生日">07月16日</a-descriptions-item>
        <a-descriptions-item label="城市">广州市</a-descriptions-item>
        <a-descriptions-item label="手机号">199 **** 6962</a-descriptions-item>
        <a-descriptions-item label="邮箱">326010228@qq.com</a-descriptions-item>
        <a-descriptions-item label="星座">双鱼座</a-descriptions-item>
        <a-descriptions-item label="爱好">
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">打疫苗</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">优雅永不过时</a-descriptions-item>
        <a-descriptions-item label="图像">
          <a-image width="100%"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F09fc753c76d4a8575c105452c81b76ba563c0d8d.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652531003&t=100230590302237a20f8e136de146f6b"
            style="max-width: 400px"></a-image>
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
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'DataDetailId' })

const router = useRouter()
const containerRef = useTemplateRef('containerRef')

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
