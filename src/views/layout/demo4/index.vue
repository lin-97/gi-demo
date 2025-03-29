<template>
  <GiPageLayout :margin="true">
    <Table />
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from '../components/Table.vue'

defineOptions({ name: 'LayoutDemo4' })
</script>
