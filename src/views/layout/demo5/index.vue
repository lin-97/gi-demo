<template>
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }" :body-style="{ padding: 0 }">
    <template #header>
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="TableRef?.search">
        <a-tab-pane key="1" title="页签1"></a-tab-pane>
        <a-tab-pane key="2" title="页签2"></a-tab-pane>
        <a-tab-pane key="3" title="页签3"></a-tab-pane>
      </a-tabs>
    </template>

    <GiPageLayout collapsed>
      <template #header>
        <GiForm v-model="form" search :columns="columns"
          :grid-item-props="{ span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 8, xxl: 8 } }" @search="TableRef?.search"
          @reset="TableRef?.search">
        </GiForm>
      </template>
      <template #left>
        <Tree @node-click="TableRef?.search" />
      </template>
      <Table ref="TableRef" />
    </GiPageLayout>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import { useSearchColumns } from '../_hooks/useSearchColumns'
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo1' })
const TableRef = useTemplateRef('TableRef')
const form = reactive({})
const activeKey = ref(1)

const { columns } = useSearchColumns()
</script>
