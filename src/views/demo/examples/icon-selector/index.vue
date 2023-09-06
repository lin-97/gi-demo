<template>
  <a-space fill>
    <GiIconSelector v-model="icon" enableCopy></GiIconSelector>
  </a-space>
</template>

<script setup lang="ts">
const icon = ref('')
</script>
