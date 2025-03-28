export default `
<template>
  <GiPageLayout>
    <a-row justify="end" align="center" wrap>
      <a-space wrap>
        <a-button type="primary">导出</a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
        </a-button>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :columns="columns"
      :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :pagination="pagination" @select="select"
      @select-all="selectAll">
    </a-table>
  </GiPageLayout>
</template>

<script lang="tsx" setup>
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import { Modal } from '@arco-design/web-vue'
import Pane2Json from './code/pane2-json'
import { useTable } from '@/hooks'
import { getPersonList } from '@/apis/person'
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '比例',
    width: 68,
    align: 'center',
    render: ({ record }) => (
      <a-progress size="mini" status={getProportionColor(record.proportion)} percent={record.proportion / 100} />
    )
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => {
      return <GiCellStatus status={record.status} />
    }
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    render: () => (
      <a-space>
        <a-button type="primary" size="mini">
          <icon-edit></icon-edit>
        </a-button>
        <a-button size="mini">详情</a-button>
        <a-popconfirm type="warning" content="您确定要删除该项吗?" onBeforeOk={() => onDelete()}>
          <a-button type="primary" status="danger" size="mini">
            <icon-delete />
          </a-button>
        </a-popconfirm>
      </a-space>
    )
  }
]

const { tableData, getTableData, pagination, loading } = useTable((p) => getPersonList(p))

onActivated(() => {
  getTableData()
})

// 比例进度条颜色
function getProportionColor(proportion: number) {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []
}

// 删除
function onDelete() {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}

// 查看代码
const onViewCode = () => {
  Modal.open({
    title: '查看代码',
    content: () => <gi-code-view type="vue" codeJson={Pane2Json}></gi-code-view>,
    fullscreen: true
  })
}
</script>

<style lang="scss" scoped></style>
`
