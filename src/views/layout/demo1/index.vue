<template>
  <GiPageLayout :margin="true">
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>
    <template #header>
      <GiForm :model-value="form" search :columns="columns"
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }"
        @update:model-value="Object.assign(form, $event)" @search="TableRef?.search" @reset="TableRef?.search">
      </GiForm>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo1' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})

const { columns } = useSearchColumns()
</script>
