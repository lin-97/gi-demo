<template>
  <GiPageLayout>
    <a-row justify="end">
      <a-space wrap>
        <a-input v-model="searchParams.username" placeholder="输入用户名搜索" allow-clear style="max-width: 250px">
        </a-input>
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>查询</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <span>重置</span>
        </a-button>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :columns="columns"
      :data="tableData" :scroll="{ x: '100%', y: '100%' }"
      :row-selection="{ type: props.multiple ? 'checkbox' : 'radio', showCheckedAll: true }" :pagination="pagination"
      @select="select" @select-all="selectAll">
    </a-table>
  </GiPageLayout>
</template>

<script setup lang="tsx">
import type { TableColumnData } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import GiCellStatus from '@/components/GiCell/GiCellStatus.vue'
import { useTable } from '@/hooks'

interface Props {
  multiple?: boolean
  queryParams?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  queryParams: () => ({})
})

const searchParams = reactive({
  username: ''
})

const columns = [
  {
    title: '序号',
    width: 68,
    align: 'center',
    render: ({ rowIndex }) => (<span>{rowIndex + 1}</span>)
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 180
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => {
      return <GiCellStatus status={record.status} />
    }
  }
] as TableColumnData[]

const {
  loading,
  tableData,
  pagination,
  search,
  select,
  selectAll,
  getSelectedData
} = useTable((page) => baseAPI.getList({ ...page, ...searchParams, ...props.queryParams }), { immediate: true })

const reset = () => {
  searchParams.username = ''
  search()
}

defineExpose({ getSelectedData })
</script>

<style lang="scss" scoped></style>
