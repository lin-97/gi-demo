<template>
  <a-menu-item v-if="!item.children?.length" :key="item?.path">
    <template #icon>
      <MenuIcon :svg-icon="item?.meta?.svgIcon" :icon="item?.meta?.icon"></MenuIcon>
    </template>
    <span>{{ item?.meta?.title }}</span>
  </a-menu-item>

  <a-sub-menu v-else :key="item.path" :title="item?.meta?.title">
    <template #icon>
      <MenuIcon :svg-icon="item?.meta?.svgIcon" :icon="item?.meta?.icon"></MenuIcon>
    </template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child">
    </MenuItem>
  </a-sub-menu>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import MenuIcon from './MenuIcon.vue'

defineOptions({ name: 'MenuItem' })

withDefaults(defineProps<Props>(), {})

interface Props {
  item: RouteRecordRaw
}
</script>
