<template>
  <GiPageLayout margin>
    <a-row justify="space-between" class="g-row-tool">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onBatchDelete"></GiButton>
      </a-space>

      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="dictData.STATUS" placeholder="角色状态" allow-clear
            style="width: 120px"></a-select>
          <a-input v-model="queryParams.name" placeholder="输入角色名搜索" allow-clear style="width: 250px"></a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table class="g-table" row-key="id" :data="roleList" :columns="tableColumns" :bordered="{ cell: true }"
      :loading="loading" :scroll="{ x: '100%', y: '100%', minWidth: 1200 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
    </a-table>

    <RoleFormModal ref="RoleFormModalRef" @save-success="search"></RoleFormModal>
    <RolePermModal ref="RolePermModalRef"></RolePermModal>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableColumnData } from '@arco-design/web-vue'
import type * as T from '@/apis/system/role'
import { Button, Popconfirm, Space } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/role'
import { useDict, useTable } from '@/hooks'

import RoleFormModal from './RoleFormModal.vue'
import RolePermModal from './RolePermModal.vue'

defineOptions({ name: 'SystemRole' })

const { dictData } = useDict(['STATUS'])
const RoleFormModalRef = useTemplateRef('RoleFormModalRef')
const RolePermModalRef = useTemplateRef('RolePermModalRef')

const queryParams = reactive({
  name: '',
  status: ''
})

const { loading, tableData: roleList, pagination, selectedKeys, search, select, selectAll, fixed, onDelete, onBatchDelete } = useTable({
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
  RoleFormModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  RoleFormModalRef.value?.edit(item.id)
}

const onPerm = (item: T.ListItem) => {
  RolePermModalRef.value?.open({ code: item.code, title: item.name })
}

const tableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  { title: '角色名称', dataIndex: 'name' },
  { title: '角色编码', dataIndex: 'code', width: 150 },
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
        <GiButton type="edit" size="mini" disabled={record.disabled} onClick={() => onEdit(record as T.ListItem)} />
        <Button
          type="primary"
          status="success"
          size="mini"
          disabled={record.disabled}
          v-slots={{ icon: () => <icon-safe /> }}
          onClick={() => onPerm(record as T.ListItem)}
        >
          分配权限
        </Button>
        <Popconfirm type="warning" content="确定删除该角色吗?" onBeforeOk={() => onDelete(record as T.ListItem)}>
          <GiButton type="delete" size="mini" disabled={record.disabled} />
        </Popconfirm>
      </Space>
    )
  }
]
</script>

<style lang="scss" scoped></style>
