<template>
  <GiTable row-key="id" :loading="loading" :columns="columns" :data="tableData"
    :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
    :pagination="pagination" :disabled-column-keys="['序号', 'name']" @refresh="getTableData">
    <template #custom-title>
      <GiButton type="add" @click="onAdd"></GiButton>
      <GiButton type="delete" @click="onMulDelete"></GiButton>
      <GiButton type="import" @click="onImport"></GiButton>
      <GiCodeButton :code="CodeJson"></GiCodeButton>
    </template>
    <template #avatar="{ record }">
      <a-avatar :size="28" shape="circle">
        <img :src="record.avatar" />
      </a-avatar>
    </template>
    <template #gender="{ record }">
      <GiCellGender :gender="record.gender"></GiCellGender>
    </template>
    <template #status="{ record }">
      <GiCellStatus :status="record.status"></GiCellStatus>
    </template>
    <template #action>
      <a-space>
        <a-button type="primary" size="mini">修改</a-button>
        <a-button size="mini">详情</a-button>
        <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete">
          <a-button type="primary" status="danger" size="mini">删除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </GiTable>
</template>

<script lang="ts" setup>
import type { PopconfirmInstance, TableInstance } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import { Link, Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
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
      h(Link, { onClick: () => onClickName(record as T.ListItem) }, { default: () => record.name })
  },
  { title: '头像', width: 80, align: 'center', slotName: 'avatar' },
  { title: '手机号', dataIndex: 'phone', width: 150 },
  { title: '性别', dataIndex: 'gender', width: 100, align: 'center', slotName: 'gender' },
  { title: '账户', dataIndex: 'account', width: 120 },
  { title: '状态', width: 100, slotName: 'status', align: 'center' },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '操作', width: 200, slotName: 'action', align: 'center' }
]

const { tableData, getTableData, pagination, search, loading } = useTable((p) => baseAPI.getList(p))

function onClickName(record: T.ListItem) {
  Message.success(`点击了${record.name}`)
}

const onAdd = () => {
  Message.info('点击了新增')
}

const onMulDelete = () => {
  Message.error('点击了批量删除')
}

const onImport = () => {
  Message.warning('点击了导入')
}

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}

defineExpose({ search })
</script>
