<template>
  <a-card title="图标选择器" :bordered="false">
    <a-space fill>
      <GiIconSelector v-model="icon"></GiIconSelector>
      <GiIconSelector v-model="icon2" type="custom"></GiIconSelector>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
const icon = ref('')
const icon2 = ref('')
</script>
