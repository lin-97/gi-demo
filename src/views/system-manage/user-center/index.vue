<template>
  <div class="user-center">
    <HeadBox></HeadBox>

    <section style="margin-top: 20px; padding-left: 20px">
      <a-descriptions title="基本信息" :column="1">
        <a-descriptions-item label="昵称">Lin</a-descriptions-item>
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
            <a-tag color="magenta">旅行</a-tag>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="性别">
          <a-switch size="medium" :model-value="true">
            <template #checked-icon>
              <icon-man />
            </template>
            <template #unchecked-icon>
              <icon-woman />
            </template>
          </a-switch>
        </a-descriptions-item>
        <a-descriptions-item label="座右铭">优雅永不过时</a-descriptions-item>
      </a-descriptions>
    </section>
  </div>
</template>

<script setup lang="ts">
import HeadBox from './HeadBox.vue'
</script>

<style lang="scss" scoped>
.user-center {
  width: 100%;
  height: 100%;
  padding: $padding;
  box-sizing: border-box;
}
</style>
