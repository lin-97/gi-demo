<template>
  <GiPageLayout margin>
    <a-row justify="space-between">
      <a-space wrap>
        <GiButton type="add" @click="onAdd"></GiButton>
        <GiButton type="delete" @click="onMulDelete"></GiButton>
      </a-space>

      <a-space wrap>
        <a-input-group>
          <a-select v-model="queryParams.status" :options="options" placeholder="状态" allow-clear
            style="width: 120px"></a-select>
          <a-input v-model="queryParams.name" placeholder="字典类型名称/编码" allow-clear style="width: 250px"></a-input>
        </a-input-group>
        <GiButton type="search" @click="search"></GiButton>
        <GiButton type="reset" @click="reset"></GiButton>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :data="dictList" :bordered="{ cell: true }" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="pagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="68" align="center">
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
              <GiButton type="edit" size="mini" :disabled="record.disabled" @click="onEdit(record)"></GiButton>
              <a-popconfirm type="warning" content="确定删除该角色吗?" @before-ok="onDelete(record)">
                <GiButton type="delete" size="mini" :disabled="record.disabled"></GiButton>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddDictModal ref="AddDictModalRef" @save-success="search"></AddDictModal>
    <DictDataModal ref="DictDataModalRef"></DictDataModal>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type * as T from '@/apis/system/dict'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/system/dict'
import { useTable } from '@/hooks'
import { useDict } from '@/hooks/app'
import AddDictModal from './AddDictModal.vue'
import DictDataModal from './DictDataModal/index.vue'

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
