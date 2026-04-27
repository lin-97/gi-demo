<template>
  <GiPageLayout margin>
    <a-row justify="space-between" class="g-row-tool">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onBatchDelete"></GiButton>
      </a-space>

      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="dictData.STATUS" placeholder="状态" allow-clear
            style="width: 120px"></a-select>
          <a-input v-model="queryParams.name" placeholder="字典类型名称/编码" allow-clear style="width: 250px"></a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table class="g-table" row-key="id" :data="dictList" :columns="tableColumns" :bordered="{ cell: true }"
      :loading="loading" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
    </a-table>

    <DictFormModal ref="DictFormModalRef" @save-success="search"></DictFormModal>
    <DictDataModal ref="DictDataModalRef"></DictDataModal>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableColumnData } from '@arco-design/web-vue'
import type * as T from '@/apis/system/dict'
import { Button, Popconfirm, Space } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dict'
import { useDict, useTable } from '@/hooks'
import DictDataModal from './DictDataModal/index.vue'
import DictFormModal from './DictFormModal.vue'

defineOptions({ name: 'SystemDict' })

const { dictData } = useDict(['STATUS'])
const DictFormModalRef = useTemplateRef('DictFormModalRef')
const DictDataModalRef = useTemplateRef('DictDataModalRef')

const queryParams = reactive({
  name: '',
  status: ''
})

const { loading, tableData: dictList, pagination, selectedKeys, search, select, selectAll, fixed, onDelete, onBatchDelete } = useTable({
  listAPI: (page) => baseAPI.getList({ ...page, ...queryParams }),
  deleteAPI: (ids) => baseAPI.delete({ ids }),
  immediate: true
})

const reset = () => {
  queryParams.name = ''
  queryParams.status = ''
  search()
}

const onAdd = () => {
  DictFormModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  DictFormModalRef.value?.edit(item.id)
}

const onViewDictData = (item: T.ListItem) => {
  DictDataModalRef.value?.open({ code: item.code, name: item.name })
}

const tableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  { title: '字典名称', dataIndex: 'name' },
  { title: '字典编码', dataIndex: 'code' },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => <GiCellStatus status={record.status} />
  },
  { title: '描述', dataIndex: 'description', ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  {
    title: '操作',
    width: 280,
    align: 'center',
    fixed: fixed.value,
    render: ({ record }) => (
      <Space>
        <Button
          type="primary"
          status="success"
          size="mini"
          v-slots={{ icon: () => <icon-storage /> }}
          onClick={() => onViewDictData(record as T.ListItem)}
        >
          字典数据
        </Button>
        <GiButton type="edit" size="mini" disabled={record.disabled} onClick={() => onEdit(record as T.ListItem)} />
        <Popconfirm type="warning" content="确定删除该字典吗?" onBeforeOk={() => onDelete(record as T.ListItem)}>
          <GiButton type="delete" size="mini" disabled={record.disabled} />
        </Popconfirm>
      </Space>
    )
  }
]
</script>

<style lang="scss" scoped></style>
