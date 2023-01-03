<template>
  <ErrorPage :src="Page500"></ErrorPage>
</template>

<script setup lang="ts" name="ErrorPage">
import ErrorPage from '../components/ErrorPage.vue'
import Page500 from '@/assets/svgs/500.svg'
</script>

<style lang="scss" scoped></style>
