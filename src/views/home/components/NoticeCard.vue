<template>
  <a-card title="通知公告" :bordered="false" :body-style="{ paddingTop: 0 }" class="g-base-card notice-card">
    <template #extra>
      <a-link>更多</a-link>
    </template>

    <div class="notice-card__list">
      <div v-for="(item, index) in noticeList" :key="index" class="notice-card__item">
        <div class="notice-card__date" :class="`date--${item.type}`">
          <div class="date-week">{{ item.date.week }}</div>
          <div class="date-day">{{ item.date.day }}</div>
        </div>

        <div class="notice-card__content">
          <div class="notice-card__header">
            <div class="notice-card__header-left">
              <p class="notice-card__title g-line-1">{{ item.title }}</p>
              <p class="notice-card__desc g-line-1">{{ item.description }}</p>
            </div>

            <div class="notice-card__header-right">
              <a-dropdown>
                <a-button type="text" size="mini">
                  <IconMoreVertical />
                </a-button>
                <template #content>
                  <a-doption>标记为未读</a-doption>
                  <a-doption>删除</a-doption>
                </template>
              </a-dropdown>
              <a-tag v-if="item.status === '已读'" color="purple">{{ item.status }}</a-tag>
              <a-tag v-if="item.status === '未读'">{{ item.status }}</a-tag>
            </div>
          </div>

          <div class="notice-card__footer">
            <span class="notice-card__author">{{ item.author }}</span>
            <span class="notice-card__time">{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { IconMoreVertical } from '@arco-design/web-vue/es/icon'
import Dayjs from 'dayjs'

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const currentWeek = `周${weekDays[Dayjs().day()]}`
const currentDay = Number(Dayjs().format('D'))

interface NoticeItem {
  title: string
  description: string
  author: string
  time: string
  status: string
  type: 'blue' | 'orange'
  date: {
    week: string
    day: number
  }
}

const noticeList = ref<NoticeItem[]>([
  {
    title: '系统通知',
    description: '关于系统例行维护升级通知',
    author: '超级管理员',
    time: Dayjs().format('YYYY-MM-DD HH:mm'),
    status: '已读',
    type: 'blue',
    date: {
      week: currentWeek,
      day: currentDay
    }
  },
  {
    title: '人事公告',
    description: '2026年第二季度考勤制度调整说明',
    author: '超级管理员',
    time: Dayjs().format('YYYY-MM-DD HH:mm'),
    status: '未读',
    type: 'orange',
    date: {
      week: currentWeek,
      day: currentDay
    }
  }
])
</script>

<style lang="scss" scoped>
.notice-card {
  &__item {
    box-sizing: border-box;
    display: flex;
    padding: 8px 0;
    overflow: hidden;
    font-size: 12px;
  }

  &__date {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 8px;

    &.date--blue {
      color: #377DFF;
      background-color: rgb(55 125 255 / 10%);
    }

    &.date--orange {
      color: #FAAD14;
      background-color: rgb(250 173 20 / 15%);
    }

    .date-week {
      font-size: 12px;
      font-weight: 500;
    }

    .date-day {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;
    }
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 16px;
    overflow: hidden;
  }

  &__header {
    display: flex;
  }

  &__header-left {
    flex: 1;
    overflow: hidden;
  }

  &__header-right {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-text-1);
  }

  &__desc {
    margin: 8px 0;
    font-size: 13px;
    color: var(--color-text-2);
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }

  &__author,
  &__time {
    color: var(--color-text-4);
    white-space: nowrap;
  }
}
</style>
