<template>
  <a-card title="部门管理" class="gi_page_card">
    <a-space wrap>
      <a-input v-model="form.name" placeholder="输入部门名称搜索" allow-clear style="width: 250px">
        <template #prefix><icon-search /></template>
      </a-input>
      <a-select v-model="form.status" :options="options" placeholder="部门状态" style="width: 120px"></a-select>
      <a-button type="primary" @click="search">
        <template #icon><icon-search /></template>
        <span>搜索</span>
      </a-button>
      <a-button @click="reset">
        <template #icon><icon-refresh /></template>
        <span>重置</span>
      </a-button>
    </a-space>

    <a-row>
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
              <a-button type="primary" size="mini" @click="onEdit(record)">
                <template #icon><icon-edit /></template>
                <span>编辑</span>
              </a-button>
              <a-button v-if="record.parentId" type="primary" status="success" size="mini" @click="onAdd()">
                <template #icon><icon-plus /></template>
                <span>新增</span>
              </a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?">
                <a-button type="primary" status="danger" size="mini">
                  <template #icon><icon-delete /></template>
                  <span>删除</span>
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddDeptModal ref="AddDeptModalRef" @save-success="search"></AddDeptModal>
  </a-card>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import AddDeptModal from './AddDeptModal.vue'
import { useTable } from '@/hooks'
import { type DeptItem, getDeptList } from '@/apis/system'
import { useDict } from '@/hooks/app'

defineOptions({ name: 'SystemDept' })

const { data: options } = useDict({ code: 'status' })
const AddDeptModalRef = useTemplateRef('AddDeptModalRef')
const tableRef = useTemplateRef('tableRef')

const form = reactive({
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
  fixed
} = useTable(() => getDeptList(), {
  immediate: true,
  onSuccess: () => {
    nextTick(() => {
      tableRef.value?.expandAll(true)
    })
  }
})

const reset = () => {
  form.name = ''
  form.status = ''
  search()
}

const onAdd = () => {
  AddDeptModalRef.value?.add()
}

const onEdit = (item: DeptItem) => {
  AddDeptModalRef.value?.edit(item.id)
}

const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择部门')
  }
  // 批量删除
}
</script>

<style lang="scss" scoped></style>
