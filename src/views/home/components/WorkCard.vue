<template>
  <a-card title="工作台" :bordered="false" size="medium" class="card">
    <template #extra>
      <NowTime></NowTime>
    </template>
    <a-row align="center" :gutter="14" class="content">
      <a-col :xs="24" :md="14" :lg="16" :xl="16" :xxl="18">
        <a-space :size="15" class="padding-y">
          <a-avatar :size="68">
            <img :src="userStore.userInfo.avatar" />
          </a-avatar>
          <div class="tip">
            <p>早安，{{ userStore.userName }}，开始您一天的工作吧！</p>
            <p>今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
          </div>
        </a-space>
      </a-col>

      <a-col :xs="24" :md="10" :lg="8" :xl="8" :xxl="6">
        <a-row justify="space-between" align="center" class="padding-y">
          <a-statistic :value="16" :value-from="0" :start="true" animation>
            <template #title>
              <a-space>
                <GiSvgIcon name="icon-num"></GiSvgIcon>
                <span>项目数</span>
              </a-space>
            </template>
          </a-statistic>
          <a-statistic :value="3" :value-from="0" :start="true" animation>
            <template #title>
              <a-space>
                <GiSvgIcon name="icon-wait"></GiSvgIcon>
                <span>待办</span>
              </a-space>
            </template>
            <template #suffix>/15</template>
          </a-statistic>
          <a-statistic :value="35" :value-from="0" :start="true" animation>
            <template #title>
              <a-space>
                <GiSvgIcon name="icon-msg"></GiSvgIcon>
                <span>消息</span>
              </a-space>
            </template>
          </a-statistic>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import NowTime from './NowTime/index.vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
:deep(.arco-statistic-title) {
  margin-bottom: 0;
}

.card {
  margin-top: $margin;
  .content {
    padding: 0 20px;
    .tip {
      color: $color-text-3;
      p {
        &:first-child {
          font-size: 1.25rem;
          color: $color-text-1;
          margin-bottom: 10px;
        }
      }
    }
  }
}

.padding-y {
  padding: 8px 0;
}
</style>
