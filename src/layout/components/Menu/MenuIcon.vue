<template>
  <GiSvgIcon v-if="item?.meta?.svgIcon" :name="item?.meta?.svgIcon" :size="24"></GiSvgIcon>
  <component :is="item?.meta?.icon" v-else-if="item?.meta?.icon"></component>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'

interface Props {
  item?: RouteRecordRaw
}

withDefaults(defineProps<Props>(), {
  item: () => ({} as RouteRecordRaw)
})
</script>

<style lang="scss" scoped></style>
