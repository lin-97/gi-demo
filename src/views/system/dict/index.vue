<template>
  <a-card title="字典管理" class="gi_page_card">
    <a-space wrap>
      <a-input v-model="queryParams.name" placeholder="字典类型名称/编码" allow-clear style="width: 250px">
        <template #prefix><icon-search /></template>
      </a-input>
      <a-select v-model="queryParams.status" :options="options" placeholder="状态" allow-clear
        style="width: 120px"></a-select>
      <a-button type="primary" @click="search">
        <template #icon><icon-search /></template>
        <span>查询</span>
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

    <a-table class="gi_table" row-key="id" :data="dictList" :bordered="{ cell: true }" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="64">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="字典名称" data-index="name"></a-table-column>
        <a-table-column title="字典编码" data-index="code"></a-table-column>
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
              <a-button type="primary" status="success" size="mini" @click="onViewDictData(record)">
                <template #icon><icon-storage /></template>
                <span>字典数据</span>
              </a-button>
              <a-button type="primary" size="mini" @click="onEdit(record)">
                <template #icon><icon-edit /></template>
                <span>编辑</span>
              </a-button>
              <a-popconfirm type="warning" content="确定删除该角色吗?" @before-ok="onDelete(record)">
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

    <AddDictModal ref="AddDictModalRef" @save-success="search"></AddDictModal>
    <DictDataModal ref="DictDataModalRef"></DictDataModal>
  </a-card>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import AddDictModal from './AddDictModal.vue'
import DictDataModal from './DictDataModal/index.vue'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import { baseAPI } from '@/apis/system/dict'
import type * as T from '@/apis/system/dict'

defineOptions({ name: 'SystemRole' })

const { data: options } = useDict({ code: 'status' })
const AddDictModalRef = useTemplateRef('AddDictModalRef')
const DictDataModalRef = useTemplateRef('DictDataModalRef')

const queryParams = reactive({
  name: '',
  status: ''
})

const {
  loading,
  tableData: dictList,
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
  AddDictModalRef.value?.add()
}

const onEdit = (item: T.ListItem) => {
  AddDictModalRef.value?.edit(item.id)
}

const onDelete = (item: T.ListItem) => {
  return handleDelete(() => baseAPI.delete({ ids: [item.id] }), { showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择字典！')
  }
  return handleDelete(() => baseAPI.delete({ ids: selectedKeys.value as string[] }))
}

const onViewDictData = (item: T.ListItem) => {
  DictDataModalRef.value?.open({ code: item.code })
}
</script>

<style lang="scss" scoped></style>
