<template>
  <GiTable row-key="id" :loading="loading" :columns="columns" :data="tableData"
    :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    :pagination="pagination" :disabled-column-keys="['序号', 'name']" @refresh="getTableData">
    <template #custom-title>
      <GiButton type="add" @click="onAdd"></GiButton>
      <GiButton type="delete" @click="onBatchDelete"></GiButton>
      <GiButton type="import" @click="onImport"></GiButton>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <template #action="{ record }">
      <a-space>
        <a-button type="primary" size="mini">修改</a-button>
        <a-button size="mini">详情</a-button>
        <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
          <a-button type="primary" status="danger" size="mini">删除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </GiTable>
</template>

<script lang="ts" setup>
import type { TableInstance } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { GiCellAvatar, GiCellGender, GiCellStatus } from '@/components/GiCell'
import { useTable } from '@/hooks'
import Demo1Code from '../demo1/index.vue?raw'
import Demo2Code from '../demo2/index.vue?raw'
import Demo3Code from '../demo3/index.vue?raw'
import Demo4Code from '../demo4/index.vue?raw'
import Demo5Code from '../demo5/index.vue?raw'

const route = useRoute()
const CODE_MAP: Record<string, string> = {
  '/layout/demo1': Demo1Code,
  '/layout/demo2': Demo2Code,
  '/layout/demo3': Demo3Code,
  '/layout/demo4': Demo4Code,
  '/layout/demo5': Demo5Code
}
const CodeJson = CODE_MAP[route.path]

const columns: TableInstance['columns'] = [
  { title: '序号', width: 66, align: 'center', render: ({ rowIndex }) => h('span', {}, rowIndex + 1) },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: ({ record }) =>
      h(GiCellAvatar, { isLink: true, avatar: record.avatar, name: record.name, onClick: () => onClickName(record as T.ListItem) })
  },
  { title: '手机号', dataIndex: 'phone', width: 150 },
  { title: '性别', dataIndex: 'gender', width: 100, align: 'center', render: ({ record }) => h(GiCellGender, { gender: record.gender }) },
  { title: '账户', dataIndex: 'account', width: 120 },
  { title: '状态', width: 100, align: 'center', render: ({ record }) => h(GiCellStatus, { status: record.status }) },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '操作', width: 200, slotName: 'action', align: 'center' }
]

const { tableData, getTableData, pagination, search, loading, onDelete, onBatchDelete, onImport } = useTable({
  listAPI: (p) => baseAPI.getList(p),
  deleteAPI: (ids) => baseAPI.delete({ ids }),
  immediate: true
})

function onClickName(record: T.ListItem) {
  Message.success(`点击了${record.name}`)
}

const onAdd = () => {
  Message.info('点击了新增')
}

defineExpose({ search })
</script>
