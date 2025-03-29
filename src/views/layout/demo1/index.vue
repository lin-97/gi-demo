<template>
  <GiPageLayout :margin="true">
    <template #header>
      <GiForm v-model="form" search :columns="searchColumns"
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"
        @reset="TableRef?.search">
      </GiForm>
    </template>
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>

    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Tree from '../components/Tree.vue'
import Table from '../components/Table.vue'
import type { ColumnItem } from '@/components/GiForm'

defineOptions({ name: 'LayoutDemo1' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})

const searchColumns = computed(() => [
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
    label: '性别',
    field: 'gender',
    props: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 0 }
      ]
    }
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
] as ColumnItem[])
</script>
