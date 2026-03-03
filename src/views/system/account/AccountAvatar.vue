<template>
  <section class="account-avatar">
    <a-avatar :size="60" :trigger-icon-style="{ color: '#3491FA' }">
      <img :src="userStore.avatar" />
      <template #trigger-icon>
        <IconCamera />
      </template>
    </a-avatar>
    <section class="account-avatar__username">{{ userStore.name }}</section>
    <ul class="account-avatar__list">
      <li><icon-user /><span>前端开发工程师</span></li>
      <li><icon-safe /><span>前端</span></li>
      <li><icon-location /><span>广州</span></li>
    </ul>
    <a-button type="primary" class="account-avatar__edit-btn">
      <template #icon> <icon-edit /> </template>编辑信息
    </a-button>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.account-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  min-height: 204px;
  color: var(--color-white);
  background-color: rgb(var(--primary-6));

  &__username {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 500;
  }

  &__list {
    display: flex;
    margin-bottom: 10px;

    >li {
      margin-right: 15px;

      span {
        margin-left: 2px;
      }
    }
  }

  &__edit-btn {
    color: #fff;
    background: transparent;
    border-color: #fff;

    &:hover {
      background: rgb(var(--primary-5));
      border-color: rgb(var(--primary-5));
    }
  }
}
</style>
