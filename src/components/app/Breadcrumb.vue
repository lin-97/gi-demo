<template>
  <a-breadcrumb>
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">{{ item.meta.title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const breadcrumbList = computed(() => route.matched.filter((i) => i.meta.title))
</script>

<style lang="scss" scoped></style>
