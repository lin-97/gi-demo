<template>
  <GiPageLayout margin>
    <a-row justify="space-between">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
      </a-space>

      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="options" placeholder="角色状态" allow-clear
            style="width: 120px"></a-select>
          <a-input v-model="queryParams.name" placeholder="输入角色名搜索" allow-clear style="width: 250px"></a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :data="roleList" :bordered="{ cell: true }" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1200 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="68" align="center">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="角色名称" data-index="name"></a-table-column>
        <a-table-column title="角色编码" data-index="code" :width="150"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="描述" data-index="description" :ellipsis="true" :tooltip="true"></a-table-column>
        <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>
        <a-table-column title="操作" :width="280" align="center" :fixed="fixed">
          <template #cell="{ record }">
            <a-space>
              <GiButton type="edit" size="mini" :disabled="record.disabled" @click="onEdit(record)"></GiButton>
              <a-button type="primary" status="success" size="mini" :disabled="record.disabled" @click="onPerm(record)">
                <template #icon><icon-safe /></template>
                <template #default>分配权限</template>
              </a-button>
              <a-popconfirm type="warning" content="确定删除该角色吗?" @before-ok="onDelete(record)">
                <GiButton type="delete" size="mini" :disabled="record.disabled"></GiButton>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddRoleModal ref="AddRoleModalRef" @save-success="search"></AddRoleModal>
    <PermModal ref="PermModalRef"></PermModal>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type * as T from '@/apis/system/role'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/role'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import AddRoleModal from './AddRoleModal.vue'
import PermModal from './PermModal.vue'

defineOptions({ name: 'SystemRole' })

const { data: options } = useDict({ code: 'status' })
const AddRoleModalRef = useTemplateRef('AddRoleModalRef')
const PermModalRef = useTemplateRef('PermModalRef')

const queryParams = reactive({
  name: '',
  status: ''
})

const {
  loading,
  tableData: roleList,
  pagination,
  selectedKeys,
  search,
  select,
  selectAll,
  fixed,
  handleDelete
} = useTable((page) => baseAPI.getList({ ...page, ...queryParams }), { immediate: true })

const reset = () => {
  queryParams.name = ''
  queryParams.status = ''
  search()
}

const onAdd = () => {
  AddRoleModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  AddRoleModalRef.value?.edit(item.id)
}

const onDelete = (item: T.ListItem) => {
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择角色！')
  }
  handleDelete(() => baseAPI.delete({ ids: selectedKeys.value as string[] }))
}

const onPerm = (item: T.ListItem) => {
  PermModalRef.value?.open({ code: item.code, title: item.name })
}
</script>

<style lang="scss" scoped></style>
