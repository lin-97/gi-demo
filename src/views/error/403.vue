<template>
  <ErrorPage :src="Page403"></ErrorPage>
</template>

<script setup lang="ts">
import ErrorPage from './components/ErrorPage.vue'
import Page403 from '@/assets/svgs/403.svg'

defineOptions({ name: 'Error403' })
</script>

<style lang="scss" scoped></style>
