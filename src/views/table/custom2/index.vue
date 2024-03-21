<template>
  <div class="table-page">
    <GiForm :options="options" :columns="QueryFormColumns" v-model="form" @search="search" @reset="search"></GiForm>

    <GiTable
      row-key="id"
      :loading="loading"
      :columns="columns"
      :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination"
      :disabled-column-keys="['序号', 'name']"
      @refresh="getTableData"
    >
      <template #custom-title>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button @click="onImport">
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
      </template>
      <template #avatar="{ record }">
        <a-avatar :size="30" :style="{ backgroundColor: record.color }">{{ record.name[0] }}</a-avatar>
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.status === 1" color="arcoblue" size="small">
          <template #icon><icon-check-circle-fill /></template>
          <template #default>开启</template>
        </a-tag>
        <a-tag v-if="record.status === 0" color="orangered" size="small">
          <template #icon><icon-minus-circle-fill /></template>
          <template #default>禁用</template>
        </a-tag>
      </template>
      <template #action>
        <a-space>
          <a-button type="primary" size="mini">修改</a-button>
          <a-button size="mini">详情</a-button>
          <a-popconfirm type="warning" content="您确定要删除该项吗?">
            <a-button type="primary" status="danger" size="mini">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts">
import { Message, Link, type TableInstance } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getPersonList, type PersonItem } from '@/apis'
import type { Options, Columns } from '@/components/GiForm'
import { useBreakpointIndex } from '@/hooks'

defineOptions({ name: 'TableCustom2' })
const form = reactive({})

const options: Options = reactive({
  form: { layout: 'inline' },
  col: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 },
  btns: { col: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6 } },
  fold: { enable: true, index: 2, defaultCollapsed: true }
})

useBreakpointIndex((index) => {
  // 自适应折叠，让折叠后始终一行显示
  options.fold && (options.fold.index = index)
})

const QueryFormColumns: Columns = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    }
  },
  {
    type: 'select',
    label: '类型',
    field: 'type',
    options: [
      { label: '党员', value: 1 },
      { label: '群众', value: 2 }
    ]
  },
  {
    type: 'date-picker',
    label: '创建日期',
    field: 'createTime'
  },
  {
    type: 'input',
    label: '地址',
    field: 'address'
  }
])

const loading = ref(false)
const tableData = ref<PersonItem[]>([])
const columns: TableInstance['columns'] = [
  { title: '序号', width: 66, align: 'center', render: ({ rowIndex }) => h('span', {}, rowIndex + 1) },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: ({ record }) =>
      h(Link, { onClick: () => onClickName(record as PersonItem) }, { default: () => record.name })
  },
  { title: '头像', width: 80, slotName: 'avatar' },
  { title: '手机号', dataIndex: 'phone', width: 150 },
  { title: '创建时间', dataIndex: 'createTime', ellipsis: true, tooltip: true },
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '状态', width: 100, slotName: 'status', align: 'center' },
  { title: '操作', width: 200, slotName: 'action', align: 'center' }
]

const { pagination, setTotal } = usePagination(() => getTableData())

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getPersonList({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
    tableData.value = res.data.records
    setTotal(res.data.total)
  } finally {
    loading.value = false
  }
}

getTableData()

const search = () => {
  pagination.onChange(1)
}

function onClickName(record: PersonItem) {
  Message.success('点击了' + record.name)
}

const onAdd = () => {
  Message.info('点击了新增')
}

const onDelete = () => {
  Message.error('点击了删除')
}

const onImport = () => {
  Message.warning('点击了导入')
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
