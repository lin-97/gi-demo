<template>
  <ErrorPage :src="Page404"></ErrorPage>
</template>

<script setup lang="ts" name="ErrorPage">
import ErrorPage from '../components/ErrorPage.vue'
import Page404 from '@/assets/svgs/404.svg'
</script>

<style lang="scss" scoped></style>
