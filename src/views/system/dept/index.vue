<template>
  <GiPageLayout margin>
    <a-row justify="space-between">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
      </a-space>

      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="options" placeholder="部门状态" style="width: 120px"></a-select>
          <a-input v-model="queryParams.name" placeholder="输入部门名称搜索" allow-clear style="width: 250px">
            <template #prefix><icon-search /></template>
          </a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table ref="tableRef" class="gi_table" row-key="id" :bordered="{ cell: true }" :data="deptList" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="false"
      :row-selection="{ type: 'checkbox', showCheckedAll: false }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
      <template #expand-icon="{ expanded }">
        <IconDown v-if="expanded" />
        <IconRight v-else />
      </template>
      <template #columns>
        <a-table-column title="部门名称" data-index="name" :width="160"></a-table-column>
        <a-table-column title="排序" data-index="sort" :width="100" align="center"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="描述" data-index="description" :width="250" :ellipsis="true"
          :tooltip="true"></a-table-column>
        <a-table-column title="创建时间" data-index="createTime" :width="200"></a-table-column>
        <a-table-column title="操作" :width="200" align="center" :fixed="fixed">
          <template #cell="{ record }">
            <a-space>
              <GiButton type="edit" size="mini" :disabled="record.disabled" @click="onEdit(record)"></GiButton>
              <GiButton v-if="record.parentId" type="add" size="mini" status="success" :disabled="record.disabled"
                @click="onAdd()"></GiButton>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
                <GiButton type="delete" size="mini" :disabled="record.disabled"></GiButton>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddDeptModal ref="AddDeptModalRef" @save-success="search"></AddDeptModal>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type * as T from '@/apis/system/dept'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dept'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import AddDeptModal from './AddDeptModal.vue'

defineOptions({ name: 'SystemDept' })

const { data: options } = useDict({ code: 'status' })
const AddDeptModalRef = useTemplateRef('AddDeptModalRef')
const tableRef = useTemplateRef('tableRef')

const queryParams = reactive({
  name: '',
  status: ''
})

const {
  loading,
  tableData: deptList,
  selectedKeys,
  search,
  select,
  selectAll,
  fixed,
  handleDelete
} = useTable(() => baseAPI.getList({ ...queryParams }), {
  immediate: true,
  onSuccess: () => {
    nextTick(() => {
      tableRef.value?.expandAll(true)
    })
  }
})

const reset = () => {
  queryParams.name = ''
  queryParams.status = ''
  search()
}

const onAdd = () => {
  AddDeptModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  AddDeptModalRef.value?.edit(item.id)
}

const onDelete = (item: T.ListItem) => {
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { showModal: false })
}

const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择部门')
  }
  return handleDelete(() => baseAPI.delete({ ids: selectedKeys.value as string[] }))
}
</script>

<style lang="scss" scoped></style>
