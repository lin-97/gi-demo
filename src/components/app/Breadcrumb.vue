<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in route.matched" :key="index">{{ item.meta.title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()

console.log('route', route.matched)
</script>

<style lang="scss" scoped></style>
