<template>
  <a-menu-item v-if="!item.children?.length" :key="item?.path">
    <template #icon>
      <MenuIcon :icon="item?.meta?.icon"></MenuIcon>
    </template>
    <a-row v-if="menuBadgeStore.badgeMap[item.path] !== undefined" justify="space-between" align="center"
      style="flex-wrap: nowrap;">
      <div class="gi_line_1">{{ item?.meta?.title }}</div>
      <a-badge class="gi_ml" :count="menuBadgeStore.badgeMap[item.path]"
        v-bind="menuBadgeStore.BadgePropsMap[item.path]" />
    </a-row>
    <template v-else>{{ item?.meta?.title }}</template>
  </a-menu-item>

  <a-sub-menu v-else :key="item.path" :title="item?.meta?.title">
    <template #icon>
      <MenuIcon :icon="item?.meta?.icon"></MenuIcon>
    </template>
    <MenuItem v-for="child in item.children" :key="child.path" :item="child">
    </MenuItem>
  </a-sub-menu>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { useMenuBadgeStore } from '@/stores'
import MenuIcon from './MenuIcon.vue'

defineOptions({ name: 'MenuItem' })

withDefaults(defineProps<Props>(), {})

interface Props {
  item: RouteRecordRaw
}

const menuBadgeStore = useMenuBadgeStore()
</script>

<style lang="scss" scoped>
:deep(.arco-badge) {
  display: inline-flex;
}
</style>
