<template>
  <a-card title="工作报告" :bordered="false" class="g-base-card g-card-title report-card">
    <template #extra>
      <a-button type="primary" size="small">新建报告</a-button>
    </template>
    <a-table class="g-table" row-key="id" :data="list" :scroll="{ x: '100%', y: '100%', minWidth: 500 }"
      :pagination="false" :bordered="false" size="small">
      <template #columns>
        <a-table-column title="报告标题" :ellipsis="true" :tooltip="true">
          <template #cell="{ record }">
            <div class="report-card__title-cell">
              <span class="report-card__dot" :class="record.status ? 'report-card__dot--o' : 'report-card__dot--b'" />
              <div class="g-line-1">{{ record.title }}</div>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="提交人" :width="160" align="center">
          <template #cell="{ record }">
            <GiCellAvatar :avatar="record.avatar" :name="record.userName" style="display: inline-flex;"></GiCellAvatar>
          </template>
        </a-table-column>
        <a-table-column title="提交时间" data-index="submitTime" :width="160" align="center"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <a-tag v-if="record.status" color="blue">已审阅</a-tag>
            <a-tag v-else color="orange"> 未审阅 </a-tag>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script setup lang="ts">
import Dayjs from 'dayjs'
import { avatarList2 } from './avatar-data'

defineOptions({ name: 'ReportCard' })

type ReportItem = {
  id: number
  title: string
  userName: string
  avatar: string
  status: boolean
  submitTime: string
}

const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']
const list = ref<ReportItem[]>([])

Array.from({ length: 8 }).forEach((_, index) => {
  list.value.push({
    id: index + 1,
    title: `${Dayjs().subtract(index, 'day').format('YYYY-MM-DD')}工作日报`,
    userName: names[index]!,
    avatar: avatarList2[index]!,
    status: index % 2 === 0,
    submitTime: Dayjs().subtract(index, 'day').format('YYYY-MM-DD HH:mm')
  })
})
</script>

<style lang="scss" scoped>
.report-card {
  :deep(.arco-table-td) {
    border-bottom: none;
  }

  &__title-cell {
    display: flex;
    gap: 8px;
    align-items: center;
    min-width: 0;
  }

  &__dot {
    box-sizing: border-box;
    flex: 0 0 auto;
    width: 8px;
    height: 8px;
    background: transparent;
    border: 2px solid;
    border-radius: 50%;

    &--o {
      border-color: #faad14;
    }

    &--b {
      border-color: #1890ff;
    }
  }

  &__tag--o {
    color: #faad14;
    background: #fff7e6;
  }

  &__tag--b {
    color: #1890ff;
    background: #e6f7ff;
  }
}
</style>
