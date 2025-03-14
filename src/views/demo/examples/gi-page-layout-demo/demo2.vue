<template>
  <GiPageLayout :margin="false">
    <template #left>
      <a-card class="gi_card" :header-style="{ display: 'none' }">
        <Tree />
      </a-card>
    </template>
    <a-card class="gi_card" :header-style="{ display: 'none' }">
      <Table />
    </a-card>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Tree from './components/Tree.vue'
import Table from './components/Table.vue'
</script>
