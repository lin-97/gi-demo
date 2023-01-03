<template>
  <ErrorPage :src="Page403"></ErrorPage>
</template>

<script setup lang="ts" name="ErrorPage">
import ErrorPage from '../components/ErrorPage.vue'
import Page403 from '@/assets/svgs/403.svg'
</script>

<style lang="scss" scoped></style>
