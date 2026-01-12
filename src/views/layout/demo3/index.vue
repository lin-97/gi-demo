<template>
  <GiPageLayout :margin="true">
    <template #header>
      <GiForm :model-value="form" search :columns="columns"
        :grid-item-props="{ span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 } }" :suffix="false"
        @update:model-value="Object.assign(form, $event)" @search="TableRef?.search" @reset="TableRef?.search">
      </GiForm>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'

defineOptions({ name: 'LayoutDemo3' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})

const { columns } = useSearchColumns()
</script>
