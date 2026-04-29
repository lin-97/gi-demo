<template>
  <a-card title="消息" :bordered="false" class="g-base-card message-card">
    <template #extra>
      <a-link>更多</a-link>
    </template>
    <a-comment v-for="(item, index) in list" :key="index" :author="item.name" :content="item.content" align="right"
      :class="`animated-fade-up-${index}`" style="overflow: hidden">
      <template #avatar>
        <a-avatar>
          <img :src="avatarList[index]" />
        </a-avatar>
      </template>
      <template #datetime>
        <a-space :size="4">
          <p>{{ item.datetime }}</p>
          <a-tag v-if="item.type === 1" color="orangered" size="small">活动</a-tag>
          <a-tag v-if="item.type === 2" color="cyan" size="small">消息</a-tag>
          <a-tag v-if="item.type === 3" color="blue" size="small">通知</a-tag>
        </a-space>
      </template>
    </a-comment>
  </a-card>
</template>

<script setup lang="ts">
import { avatarList } from './avatar-data'

const list = [
  { type: 1, name: '管理员', content: '内容最新优惠活动', datetime: '5分钟前' },
  { type: 2, name: '管理员', content: '新增内容尚未通过审核，详情请点击查看', datetime: '半小时前' },
  { type: 3, name: '管理员', content: '1月新系统升级计划通知', datetime: '2天前' },
  { type: 2, name: '管理员', content: '新增内容已经通过审核，详情请点击查看', datetime: '一周前' },
  { type: 3, name: '管理员', content: '当前产品试用期即将结束，如需续费请点击查看', datetime: '1小时前' }
]
</script>

<style lang="scss" scoped>
:deep(.arco-comment:not(:first-of-type), .arco-comment-inner-comment) {
  margin-top: 10px;
}

:deep(.arco-comment) {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border-1);
}

:deep(.arco-comment-content) {
  font-size: 12px;
  color: var(--color-text-1);
}

:deep(.arco-comment-datetime) {
  color: var(--color-text-4);
}

.message-card {
  // empty
}
</style>
