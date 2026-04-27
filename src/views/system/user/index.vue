<template>
  <GiPageLayout margin collapsed>
    <template #left>
      <a-input v-model="treeInputValue" placeholder="输入部门名称搜索" allow-clear :style="{ marginBottom: '8px' }">
        <template #prefix><icon-search /></template>
      </a-input>
      <div class="g-full-column">
        <a-scrollbar style="height: 100%; overflow: auto" outer-style="height: 100%">
          <a-tree ref="treeRef" block-node show-line default-expand-all :data="deptList" :field-names="{
            key: 'id',
            title: 'name',
            children: 'children',
          }" @select="search">
          </a-tree>
        </a-scrollbar>
      </div>
    </template>

    <a-row justify="space-between" class="g-row-tool">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onBatchDelete"></GiButton>
      </a-space>
      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="dictData.STATUS" placeholder="用户状态" allow-clear
            style="width: 150px"></a-select>
          <a-input v-model="queryParams.username" placeholder="输入用户名搜索" allow-clear style="max-width: 250px">
          </a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table class="g-table" row-key="id" :loading="loading" :data="userList" :columns="tableColumns"
      :bordered="{ cell: true }" :scroll="{ x: '100%', y: '100%', minWidth: 1700 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
    </a-table>

    <UserFormModal ref="UserFormModalRef" @save-success="search"></UserFormModal>
    <UserDetailDrawer ref="UserDetailDrawerRef"></UserDetailDrawer>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableColumnData } from '@arco-design/web-vue'
import type * as T from '@/apis/system/user'
import { Link, Popconfirm, Space, Tag } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/user'
import { useDict, useTable } from '@/hooks'
import { useDept } from '@/hooks/app'
import UserDetailDrawer from './UserDetailDrawer.vue'
import UserFormModal from './UserFormModal.vue'

defineOptions({ name: 'SystemUser' })

const { dictData } = useDict(['STATUS'])
const treeRef = useTemplateRef('treeRef')
const UserFormModalRef = useTemplateRef('UserFormModalRef')
const UserDetailDrawerRef = useTemplateRef('UserDetailDrawerRef')
const treeInputValue = ref('')

const { deptList, getDeptList } = useDept({
  onSuccess: () => {
    nextTick(() => {
      treeRef.value?.expandAll(true)
    })
  }
})
getDeptList()

const queryParams = reactive({ status: '', username: '' })

const { loading, tableData: userList, pagination, selectedKeys, search, select, selectAll, fixed, onDelete, onBatchDelete } = useTable({
  listAPI: (page) => baseAPI.getList({ ...page, ...queryParams }),
  deleteAPI: (ids) => baseAPI.delete({ ids }),
  immediate: true
})

const reset = () => {
  queryParams.status = ''
  queryParams.username = ''
  search()
}

const onAdd = () => {
  UserFormModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  UserFormModalRef.value?.edit(item.id)
}

const onDetail = (item: T.ListItem) => {
  UserDetailDrawerRef.value?.open(item.id)
}

const tableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => (<span>{rowIndex + 1}</span>)
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
    render: ({ record }) => (
      <Link onClick={() => onDetail(record as T.ListItem)}>{record.username}</Link>
    )
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 150,
    render: ({ record }) => (
      <GiCellAvatar avatar={record.avatar} name={record.nickname} />
    )
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => <GiCellStatus status={record.status} />
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    align: 'center',
    render: ({ record }) => <GiCellGender gender={record.gender} />
  },
  { title: '联系方式', dataIndex: 'phone', width: 180 },
  { title: '部门', dataIndex: 'deptName', width: 180 },
  {
    title: '类型',
    width: 100,
    align: 'center',
    render: ({ record }) => (
      <>
        {record.type === 1 && <Tag>系统内置 </Tag>}
        {record.type === 2 && <Tag>自定义 </Tag>}
      </>
    )
  },
  { title: '描述', dataIndex: 'description', width: 200, ellipsis: true, tooltip: true },
  { title: '创建时间', dataIndex: 'createTime', width: 200 },
  {
    title: '操作',
    width: 180,
    align: 'center',
    fixed: fixed.value,
    render: ({ record }) => (
      <Space>
        <GiButton
          type="edit"
          size="mini"
          disabled={record.disabled}
          onClick={() => onEdit(record as T.ListItem)}
        />
        <Popconfirm type="warning" content="确定删除该用户吗?" onBeforeOk={() => onDelete(record as T.ListItem)}>
          <GiButton type="delete" size="mini" disabled={record.disabled} />
        </Popconfirm>
      </Space>
    )
  }
]
</script>

<style lang="scss" scoped></style>
