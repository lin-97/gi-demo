<template>
  <div class="user">
    <div class="head">
      <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
        <img src="@/assets/images/avatar.jpg" />
        <template #trigger-icon>
          <IconCamera />
        </template>
      </a-avatar>
      <section class="user-name">黄林</section>
      <section class="label-list">
        <div><icon-user /><span>前端开发工程师</span></div>
        <div><icon-safe /><span>前端</span></div>
        <div><icon-location /><span>广州</span></div>
      </section>
      <a-button type="primary" class="edit-btn"
        ><template #icon> <icon-edit /> </template>编辑信息</a-button
      >
    </div>
    <!-- 用户设置 -->
    <UserSet></UserSet>
  </div>
</template>

<script lang="ts" setup>
import UserSet from './UserSet.vue'
</script>

<style lang="scss" scoped>
.edit-btn {
  color: #fff;
  border-color: #fff;
  background: transparent;
  &:hover {
    background: rgb(var(--primary-5));
    border-color: rgb(var(--primary-5));
  }
}
.user {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .head {
    height: 204px;
    background-color: rgb(var(--arcoblue-6));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    .user-name {
      font-size: 16px;
      font-weight: 500;
      margin: 10px 0;
    }
    .label-list {
      display: flex;
      margin-bottom: 10px;
      > div {
        margin-right: 15px;
        span {
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
