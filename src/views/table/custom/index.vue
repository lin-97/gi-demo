<template>
  <GiPageLayout>
    <GiTable row-key="id" title="会员列表" :loading="loading" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" @refresh="getTableData">
      <template #custom-extra>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button @click="onImport">
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
      </template>
      <template #columns>
        <a-table-column title="序号" :width="66" align="center">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name" :width="120">
          <template #cell="{ record }">
            <GiCellAvatar is-link :avatar="record.avatar" :name="record.name" @click="onClickName(record)">
            </GiCellAvatar>
          </template>
        </a-table-column>
        <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
        <a-table-column title="性别" data-index="gender" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellGender :gender="record.gender"></GiCellGender>
          </template>
        </a-table-column>
        <a-table-column title="角色" :width="100" align="center">
          <template #cell>
            <a-tag size="small" color="#7816ff">普通用户</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createTime" ellipsis tooltip
          :sortable="{ sortDirections: ['ascend', 'descend'] }"></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="操作" :width="180" align="center">
          <template #cell>
            <a-space>
              <template #split>
                <a-divider direction="vertical" :margin="0" />
              </template>
              <a-link>编辑</a-link>
              <a-link>详情</a-link>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" :ok-button-props="{ status: 'danger' }"
                @before-ok="onDelete">
                <a-link status="danger">删除</a-link>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { Message, type PopconfirmInstance } from '@arco-design/web-vue'
import { useTable } from '@/hooks'
import { type PersonItem, getPersonList } from '@/apis/person'

defineOptions({ name: 'TableCustom' })

const { tableData, getTableData, pagination, loading } = useTable((p) => getPersonList(p))

const onClickName = (record: PersonItem) => {
  Message.success(`点击了${record.name}`)
}

const onAdd = () => {
  Message.info('点击了新增')
}

const onMulDelete = () => {
  Message.info('点击了批量删除')
}

const onImport = () => {
  Message.info('点击了导入')
}

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}
</script>

<style lang="scss" scoped></style>
