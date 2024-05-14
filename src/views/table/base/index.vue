<template>
  <div class="table-page">
    <GiForm v-model="form" :options="options" :columns="columns" @search="search" @reset="reset"></GiForm>

    <div class="gi_table_box">
      <a-table row-key="id" page-position="bottom" :bordered="{ cell: true }" :loading="loading" :data="tableData"
        :scroll="{ x: '100%', y: '100%', minWidth: 1400 }" :pagination="pagination">
        <template #columns>
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="姓名" data-index="name" :width="120">
            <template #cell="{ record }">
              <GiCellAvatar :avatar="record.avatar" :name="record.name"></GiCellAvatar>
            </template>
          </a-table-column>
          <a-table-column title="账户" data-index="account" :width="120"></a-table-column>
          <a-table-column title="状态" :width="100" align="center">
            <template #cell="{ record }">
              <GiCellStatus :status="record.status"></GiCellStatus>
            </template>
          </a-table-column>
          <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
          <a-table-column title="性别" data-index="gender" :width="100" align="center">
            <template #cell="{ record }">
              <GiCellGender :gender="record.gender"></GiCellGender>
            </template>
          </a-table-column>
          <a-table-column title="爱好" data-index="hobbys">
            <template #cell="{ record }">
              <GiCellTags :data="record.hobbys"></GiCellTags>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="180"
            :sortable="{ sortDirections: ['ascend', 'descend'] }"></a-table-column>
          <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
          <a-table-column title="操作" :width="200" align="center" fixed="right">
            <template #cell>
              <a-space>
                <a-button type="primary" size="mini">编辑</a-button>
                <a-button size="mini">详情</a-button>
                <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete">
                  <a-button type="primary" status="danger" size="mini">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PopconfirmInstance } from '@arco-design/web-vue'
import { useBreakpointIndex, usePagination } from '@/hooks'
import { type PersonItem, getPersonList } from '@/apis'
import { useDict } from '@/hooks/app'
import type { Columns, Options } from '@/components/GiForm'

defineOptions({ name: 'TableBase' })

const { data: statusOptions } = useDict({ code: 'status' })
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

const columns: Columns = reactive([
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
    label: '状态',
    field: 'status',
    options: statusOptions
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

const { pagination, setTotal } = usePagination(() => getTableData())

async function getTableData() {
  try {
    loading.value = true
    const res = await getPersonList({
      page: pagination.current,
      size: pagination.pageSize
    })
    tableData.value = res.data.records
    setTotal(res.data.total)
  } finally {
    loading.value = false
  }
}

getTableData()

const search = () => {
  pagination.current = 1
  getTableData()
}

const reset = () => {
  getTableData()
}

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
