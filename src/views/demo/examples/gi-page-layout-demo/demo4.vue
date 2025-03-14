<template>
  <GiPageLayout :margin="false">
    <a-card class="gi_card" :header-style="{ display: 'none' }">
      <Table />
    </a-card>
  </GiPageLayout>
</template>

<script lang="ts" setup>
import Table from './components/Table.vue'
</script>
