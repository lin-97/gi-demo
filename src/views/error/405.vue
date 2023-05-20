<template>
  <ErrorPage :src="Page500"></ErrorPage>
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'
import Page500 from '@/assets/svgs/500.svg'

defineOptions({ name: 'Error405' })
</script>

<style lang="scss" scoped></style>
