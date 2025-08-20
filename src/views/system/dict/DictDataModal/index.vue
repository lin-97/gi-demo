<template>
  <a-modal v-model:visible="visible" title="字典数据" width="calc(100% - 20px)" :mask-closable="false"
    :modal-style="{ maxWidth: '680px' }">
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

    <a-table row-key="id" :data="tableData" :bordered="{ cell: true }" :loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 600 }" :pagination="{ ...pagination }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="selectedKeys" @select="select"
      @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="64">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="字典名" data-index="name"></a-table-column>
        <a-table-column title="字典值" data-index="value"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="140" align="center">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" size="mini" @click="onEdit(record)">编辑</a-button>
              <a-popconfirm type="warning" content="确定删除该角色吗?">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>

    <AddDictDataModal ref="AddDictDataModalRef" @save-success="search"></AddDictDataModal>
  </a-modal>
</template>

<script lang="ts" setup>
import type { DictDataItem } from '@/apis/system/dict'
import { Message } from '@arco-design/web-vue'
import { getDictDataList } from '@/apis/system/dict'
import { useTable } from '@/hooks'
import AddDictDataModal from './AddDictDataModal.vue'

const visible = ref(false)
const AddDictDataModalRef = useTemplateRef('AddDictDataModalRef')

const dictCode = ref('')

const { loading, tableData, pagination, selectedKeys, search, select, selectAll } = useTable(
  (page) => getDictDataList({ ...page, code: dictCode.value }),
  { immediate: false }
)

const open = (data: { code: string }) => {
  tableData.value = []
  dictCode.value = data.code
  visible.value = true
  search()
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择字典数据！')
  }
}

const onAdd = () => {
  AddDictDataModalRef.value?.add()
}

const onEdit = (item: DictDataItem) => {
  AddDictDataModalRef.value?.edit({ id: item.id, code: dictCode.value })
}

defineExpose({ open })
</script>

<style lang="scss" scoped></style>
