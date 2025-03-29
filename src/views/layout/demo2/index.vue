<template>
  <GiPageLayout :margin="true">
    <template #left>
      <Tree @node-click="TableRef?.search" />
    </template>

    <Table ref="TableRef" />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Tree from '../components/Tree.vue'
import Table from '../components/Table.vue'

defineOptions({ name: 'LayoutDemo2' })
const TableRef = useTemplateRef('TableRef')
</script>
