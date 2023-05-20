<template>
  <ErrorPage :src="Page404"></ErrorPage>
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'
import Page404 from '@/assets/svgs/404.svg'

defineOptions({ name: 'Error404' })
</script>

<style lang="scss" scoped></style>
