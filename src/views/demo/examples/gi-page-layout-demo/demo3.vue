<template>
  <GiPageLayout :margin="false">
    <template #header>
      <a-card class="gi_card" :header-style="{ display: 'none' }" :body-style="{ paddingBottom: 0 }">
        <GiForm v-model="form" search :columns="searchColumns"
          :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 } }">
        </GiForm>
      </a-card>
    </template>
    <a-card class="gi_card" :header-style="{ display: 'none' }">
      <Table />
    </a-card>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from './components/Table.vue'
import type { ColumnItem } from '@/components/GiForm'

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
    label: '类型',
    field: 'status',
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
