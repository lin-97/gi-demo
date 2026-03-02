<template>
  <GiPageLayout collapsed margin>
    <template #left>
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
    </template>

    <a-row justify="space-between" class="gi-row-tool">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onBatchDelete"></GiButton>
        <GiButton type="export" @click="onExport"></GiButton>
        <GiCodeButton :code="CodeJson"></GiCodeButton>
      </a-space>
      <a-input-group>
        <a-select v-model="form.status" class="gi-select-input" :options="dictData.STATUS" placeholder="请选择"
          allow-clear></a-select>
        <a-input v-model="form.name" placeholder="请输入搜索关键词" allow-clear> </a-input>
        <GiButton type="search" @click="search"></GiButton>
      </a-input-group>
    </a-row>

    <a-table class="gi-table" row-key="id" :loading="loading" :bordered="{ cell: true }" :columns="columns"
      :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :pagination="pagination" :selected-keys="selectedKeys"
      @select="select" @select-all="selectAll">
    </a-table>
  </GiPageLayout>
</template>

<script lang="tsx" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import { baseAPI } from '@/apis/person'
import { GiCellAvatar, GiCellGender, GiCellStatus } from '@/components/index'
import { useDict, useTable } from '@/hooks'
import { useTabsStore } from '@/stores'
import { hidePhone } from '@/utils'
import CateTree from './CateTree.vue'
import CodeJson from './index.vue?raw'

defineOptions({ name: 'CrudIndex' })
const router = useRouter()
const { setTabTitle } = useTabsStore()

const { dictData } = useDict(['STATUS'])
const form = reactive({
  name: '',
  status: ''
})

// 这里使用了表格hooks：useTable, 节省了大量代码
const { loading, tableData, getTableData, pagination, search, selectedKeys, select, selectAll, onDelete, onBatchDelete, onExport, fixed } = useTable({
  immediate: true,
  rowKey: 'id',
  crossPageSelect: true,
  listAPI: (page) => baseAPI.getList({ ...form, ...page }),
  formatResult: (data) => data.map((i) => ({ ...i, isEdit: false })),
  deleteAPI: (ids) => baseAPI.delete({ ids })
})

onActivated(() => {
  getTableData()
})

const onAdd = () => {
  router.push({ path: '/crud/form' })
}

const onEdit = (row: T.ListItem) => {
  router.push({ path: '/crud/form', query: { id: row.id } })
  setTabTitle('编辑')
}

const onDetail = (item: T.ListItem) => {
  router.push({ name: 'CrudDetailId', params: { id: item.id } })
}

const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    width: 60,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: ({ record }) => (
      <GiCellAvatar
        isLink
        avatar={record.avatar ?? ''}
        name={record.name ?? '-'}
        onClick={() => onDetail(record as T.ListItem)}
      />
    )
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 130,
    render: ({ record }) => <span>{record.phone ? hidePhone(record.phone) : '-'}</span>
  },
  {
    title: '年龄',
    dataIndex: 'age',
    width: 80,
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 100,
    align: 'center',
    render: ({ record }) => <GiCellGender gender={record.gender} />
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => <GiCellStatus status={record.status} />
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    width: 200,
    ellipsis: true,
    tooltip: true
  },
  {
    title: '操作',
    width: 200,
    align: 'center',
    fixed: fixed.value as 'right',
    render: ({ record }) => (
      <a-space>
        <a-button type="primary" size="mini" onClick={() => onEdit(record as T.ListItem)}>
          修改
        </a-button>
        <a-button size="mini" onClick={() => onDetail(record as T.ListItem)}>
          详情
        </a-button>
        <a-popconfirm
          type="warning"
          content="您确定要删除该项吗?"
          onBeforeOk={() => onDelete(record as T.ListItem & { isEdit: boolean })}
        >
          <a-button type="primary" status="danger" size="mini">
            删除
          </a-button>
        </a-popconfirm>
      </a-space>
    )
  }
])
</script>

<style lang="scss" scoped></style>
