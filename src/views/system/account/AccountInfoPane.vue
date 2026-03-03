<template>
  <section class="account-info-pane">
    <a-descriptions :column="1" :label-style="{ marginRight: '0' }">
      <a-descriptions-item>
        <template #label><icon-bookmark :stroke-width="1" :size="16" /></template>
        <span>前端工程师</span>
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label><icon-branch :stroke-width="1" :size="16" /></template>
        <span>中台-数据平台团队-前端创新团队-前端架构和平台工具团队</span>
      </a-descriptions-item>
      <a-descriptions-item>
        <template #label><icon-location :stroke-width="1" :size="16" /></template>
        <span>广州市</span>
      </a-descriptions-item>
    </a-descriptions>

    <a-row justify="space-around">
      <a-avatar :size="32"
        image-url="https://file.iviewui.com/admin-pro-dist/img/icon-social-weibo.cbf658a0.svg"></a-avatar>
      <a-avatar :size="32"
        image-url="https://file.iviewui.com/admin-pro-dist/img/icon-social-zhihu.1dc5a4ff.svg"></a-avatar>
      <a-avatar :size="32"
        image-url="https://file.iviewui.com/admin-pro-dist/img/icon-social-facebook.e95df60e.svg"></a-avatar>
      <a-avatar :size="32"
        image-url="https://file.iviewui.com/admin-pro-dist/img/icon-social-twitter.5db80e81.svg"></a-avatar>
    </a-row>

    <a-divider type="dashed" />

    <a-typography-title :heading="6">标签</a-typography-title>
    <a-space wrap :size="5">
      <a-tag>vue3</a-tag>
      <a-tag>pinia</a-tag>
      <a-tag>vite</a-tag>
      <a-tag>ts</a-tag>
      <a-tag>arco design</a-tag>
    </a-space>

    <a-descriptions :column="1" style="margin-top: 20px">
      <a-descriptions-item label="星座">双鱼座</a-descriptions-item>
      <a-descriptions-item label="生日">07月16日</a-descriptions-item>
      <a-descriptions-item label="爱好">
        <a-space wrap :size="5">
          <a-tag color="purple">王者荣耀</a-tag>
          <a-tag color="magenta">旅行</a-tag>
        </a-space>
      </a-descriptions-item>
    </a-descriptions>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.account-info-pane {
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  padding: var(--padding);
  background: var(--color-bg-1);
  border-radius: 2px;
}
</style>
