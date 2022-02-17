<template>
  <div class="work-platform">
    <section class="left">
      <a-avatar :size="80">
        <img src="@/assets/images/avatar.jpg" />
      </a-avatar>
      <div class="tip">
        <p>早安，Lin，开始您一天的工作吧！</p>
        <p>今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
      </div>
    </section>
    <section class="right">
      <div class="item"><span>项目数</span><span>16</span></div>
      <div class="item"><span>待办</span><span>3/15</span></div>
      <div class="item"><span>消息</span><span>35</span></div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.work-platform {
  background: var(--color-bg-2);
  margin-top: $margin;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  .left {
    display: flex;
    align-items: center;
    .tip {
      margin-left: 12px;
      color: var(--color-text-3);
      p {
        &:first-child {
          font-size: 1.25rem;
          line-height: 2em;
          color: var(--color-text-1);
        }
      }
    }
  }
  .right {
    width: 30%;
    display: flex;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        color: var(--color-text-2);
        &:last-child {
          font-size: 1.5rem;
          line-height: 2rem;
          color: var(--color-text-1);
        }
      }
    }
  }
}
</style>
