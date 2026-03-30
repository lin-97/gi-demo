<template>
  <a-card title="图标选择器" :bordered="true">
    <GiIconSelector v-model="icon" style="maxWidth: 380px"></GiIconSelector>
  </a-card>
</template>

<script setup lang="ts">
const icon = ref('')
</script>
