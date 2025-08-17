<template>
  <GiPageLayout :margin="true" :header-style="{ padding: 0, borderBottom: 'none' }">
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>
    <template #header>
      <a-tabs v-model:active-key="activeKey" size="large" hide-content @change="handleChange">
        <a-tab-pane key="1" title="页签1"></a-tab-pane>
        <a-tab-pane key="2" title="页签2"></a-tab-pane>
        <a-tab-pane key="3" title="页签3"></a-tab-pane>
        <template #extra>
          <a-button>返回</a-button>
        </template>
      </a-tabs>
    </template>
    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from '../components/Table.vue'
import Tree from '../components/Tree.vue'

defineOptions({ name: 'LayoutDemo2' })
const TableRef = useTemplateRef('TableRef')

const activeKey = ref(1)
const handleChange = () => {
  TableRef.value?.search()
}
</script>
