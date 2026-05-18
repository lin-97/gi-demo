<template>
  <GiPageLayout margin size="280px" collapsed
    :left-style="{ padding: 'var(--padding)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }">
    <template #left>
      <LeftDictList @refresh="onDictTypeRefresh" />
    </template>

    <a-row justify="space-between" class="g-row-tool">
      <a-space wrap>
        <GiButton type="add" :disabled="!dictCode" @click="onDataAdd" />
        <GiButton type="delete" @click="onDataBatchDelete" />
      </a-space>

      <a-space wrap>
        <a-input v-model="dataQuery.name" placeholder="数据标签" allow-clear style="width: 160px" />
        <a-select v-model="dataQuery.status" :options="dictData.STATUS" placeholder="状态" allow-clear
          style="width: 120px" />
        <GiButton type="search" @click="search" />
        <GiButton type="reset" @click="resetDataQuery" />
      </a-space>
    </a-row>

    <a-table class="g-table" row-key="id" :data="dictDataList" :columns="dataTableColumns" :bordered="{ cell: true }"
      :loading="dataLoading" :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :pagination="dataPagination"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }" :selected-keys="dataSelectedKeys" @select="select"
      @select-all="selectAll" />

    <DictDataFormModal ref="DictDataFormModalRef" @save-success="search" />
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableColumnData } from '@arco-design/web-vue'
import type * as T from '@/apis/system/dict'
import { Message, Popconfirm, Space, Switch } from '@arco-design/web-vue'
import { getDictDataList } from '@/apis/system/dict'
import { useDict, useTable } from '@/hooks'
import DictDataFormModal from './DictDataFormModal.vue'
import LeftDictList from './LeftDictList.vue'

defineOptions({ name: 'SystemDict' })

const { dictData } = useDict(['STATUS'])

const DictDataFormModalRef = useTemplateRef('DictDataFormModalRef')

/** 当前左侧选中的字典类型编码，由 LeftDictList 唯一事件 `refresh` 同步 */
const dictCode = ref('')

const dataQuery = reactive({
  name: '',
  status: '' as string
})

const {
  loading: dataLoading,
  tableData: dictDataList,
  pagination: dataPagination,
  selectedKeys: dataSelectedKeys,
  search,
  select,
  selectAll,
  refresh
} = useTable({
  listAPI: (page) => {
    const code = dictCode.value || ''
    return getDictDataList({
      ...page,
      code,
      name: dataQuery.name.trim() || undefined,
      status: dataQuery.status === '' ? undefined : dataQuery.status
    })
  },
  immediate: false
})

const onDictTypeRefresh = ({ code }: { code: string | null }) => {
  dictCode.value = code ?? ''
  if (code)
    search()
  else
    refresh()
}

const resetDataQuery = () => {
  dataQuery.name = ''
  dataQuery.status = ''
  search()
}

const onDataAdd = () => {
  const code = dictCode.value
  if (!code) {
    Message.warning('请先选择字典类型')
    return
  }
  DictDataFormModalRef.value?.add(code)
}

const onDataBatchDelete = () => {
  if (!dataSelectedKeys.value.length)
    Message.warning('请选择字典数据！')
}

const onDataEdit = (item: T.DictDataItem) => {
  const code = dictCode.value
  if (!code)
    return
  DictDataFormModalRef.value?.edit({ id: item.id, code })
}

const onDataDelete = (_item: T.DictDataItem) => {
  return Promise.resolve(true)
}

const dataTableColumns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => <span>{rowIndex + 1}</span>
  },
  { title: '数据标签', dataIndex: 'name', ellipsis: true, tooltip: true },
  { title: '数据键值', dataIndex: 'value', width: 120 },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => <Switch checkedValue="1" uncheckedValue="0" checkedText="启用" uncheckedText="禁用" checkedColor="#00B42A" uncheckedColor="#F53F3F" modelValue={record.status} onUpdate:modelValue={(value) => record.status = value as Status} />
  },
  { title: '备注', dataIndex: 'remark', ellipsis: true, tooltip: true, width: 140 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
  {
    title: '操作',
    width: 160,
    align: 'center',
    fixed: 'right',
    render: ({ record }) => (
      <Space>
        <GiButton type="edit" size="mini" onClick={() => onDataEdit(record as T.DictDataItem)} />
        <Popconfirm type="warning" content="确定删除该字典数据吗?" onBeforeOk={() => onDataDelete(record as T.DictDataItem)}>
          <GiButton type="delete" size="mini" />
        </Popconfirm>
      </Space>
    )
  }
]
</script>

<style lang="scss" scoped></style>
