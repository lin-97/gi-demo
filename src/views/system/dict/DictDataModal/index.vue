<template>
  <a-modal v-model:visible="visible" :title="`字典数据-(${dictName})`" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '680px' }">
    <a-row class="gi-row-tool">
      <a-space wrap>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
      </a-space>
    </a-row>

    <a-table row-key="id" :data="tableData" :columns="tableColumns" :bordered="{ cell: true }" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 600 }" :pagination="{ ...pagination }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
    </a-table>

    <DictDataFormModal ref="DictDataFormModalRef" @save-success="search"></DictDataFormModal>
  </a-modal>
</template>

<script lang="tsx" setup>
import type { TableColumnData } from '@arco-design/web-vue'
import type { DictDataItem } from '@/apis/system/dict'
import { Button, Message, Popconfirm, Space } from '@arco-design/web-vue'
import { getDictDataList } from '@/apis/system/dict'
import { useTable } from '@/hooks'
import DictDataFormModal from './DictDataFormModal.vue'

const visible = ref(false)
const DictDataFormModalRef = useTemplateRef('DictDataFormModalRef')

const dictCode = ref('')

const { loading, tableData, pagination, selectedKeys, search, select, selectAll } = useTable({
  listAPI: (page) => getDictDataList({ ...page, code: dictCode.value }),
  immediate: false
})

const dictName = ref('')

const open = (data: { code: string, name: string }) => {
  tableData.value = []
  dictCode.value = data.code
  dictName.value = data.name
  visible.value = true
  search()
}

const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择字典数据！')
  }
}

const onAdd = () => {
  DictDataFormModalRef.value?.add()
}

const onEdit = (item: DictDataItem) => {
  DictDataFormModalRef.value?.edit({ id: item.id, code: dictCode.value })
}

const onDelete = (_item: DictDataItem) => {
  return Promise.resolve()
}

const tableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 64,
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  { title: '字典名', dataIndex: 'name' },
  { title: '字典值', dataIndex: 'value' },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => <GiCellStatus status={record.status} />
  },
  {
    title: '操作',
    width: 140,
    align: 'center',
    render: ({ record }) => (
      <Space>
        <Button type="primary" size="mini" onClick={() => onEdit(record as DictDataItem)}>
          编辑
        </Button>
        <Popconfirm type="warning" content="确定删除该字典数据吗?" onBeforeOk={() => onDelete(record as DictDataItem)}>
          <Button type="primary" status="danger" size="mini">
            删除
          </Button>
        </Popconfirm>
      </Space>
    )
  }
]

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
