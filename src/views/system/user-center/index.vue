<template>
  <div class="user-center">
    <section class="user-card">
      <div class="head">
        <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
          <img :src="userStore.userInfo.avatar" />
          <template #trigger-icon>
            <IconCamera />
          </template>
        </a-avatar>
        <div class="name">{{ userStore.userName }}</div>
        <p class="desc">尘缘已定，不念过往</p>
      </div>

      <ul class="list">
        <li class="list-item">
          <span class="icon"><icon-bookmark :stroke-width="1" :size="16" /></span>
          <span>前端工程师</span>
        </li>
        <li class="list-item">
          <span class="icon"><icon-branch :stroke-width="1" :size="16" /></span
          ><span>中台-数据平台团队-前端创新团队-前端架构和平台工具团队</span>
        </li>
        <li class="list-item">
          <span class="icon"><icon-location :stroke-width="1" :size="16" /></span><span>广州市</span>
        </li>
      </ul>

      <a-row justify="space-around" class="img-list">
        <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-weibo.cbf658a0.svg" />
        <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-zhihu.1dc5a4ff.svg" />
        <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-facebook.e95df60e.svg" />
        <img src="https://file.iviewui.com/admin-pro-dist/img/icon-social-twitter.5db80e81.svg" />
      </a-row>

      <a-divider style="border-bottom-style: dashed" />

      <a-typography-title :heading="6">标签</a-typography-title>
      <a-space :size="5">
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
          <a-space :size="5">
            <a-tag color="purple">王者荣耀</a-tag>
            <a-tag color="magenta">旅行</a-tag>
          </a-space>
        </a-descriptions-item>
      </a-descriptions>
    </section>

    <RightBox></RightBox>
  </div>
</template>

<script setup lang="ts" name="UserCenter">
import RightBox from './RightBox.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user-center {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
}
.user-card {
  width: 320px;
  height: fit-content;
  margin: $margin;
  padding: $padding;
  box-sizing: border-box;
  background: var(--color-bg-1);
  border-radius: 2px;
  .head {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .name {
      font-size: 20px;
      font-weight: bolder;
      line-height: 1.5;
      margin: 8px;
    }
    .desc {
      font-size: 12px;
      color: $color-text-3;
    }
  }
  .list {
    margin-top: 20px;
    .list-item {
      padding-bottom: 16px;
      display: flex;
      .icon {
        margin-right: 8px;
      }
    }
  }
  .img-list {
    margin: 10px 0;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}
</style>
