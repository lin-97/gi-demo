<template>
  <a-sub-menu :key="data.name" v-if="data.children && data.children.length && !data.meta.hidden">
    <template #icon>
      <GiSvgIcon v-if="data.meta.icon" :size="24" :name="data.meta.icon"></GiSvgIcon>
    </template>
    <template #title>{{ data.meta.title }}</template>
    <MenuItem v-for="item in data.children" :key="item.name" :data="item" @click="onClickMenuItem"></MenuItem>
  </a-sub-menu>

  <a-menu-item v-else :key="data.name" @click="onClickMenuItem(data)" v-if="!data.meta.hidden">
    <template #icon>
      <GiSvgIcon v-if="data.meta.icon" :size="24" :name="data.meta.icon"></GiSvgIcon>
      <icon-unordered-list v-else :size="20" />
    </template>
    {{ data.meta.title }}
  </a-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
import type { PropType } from 'vue'

defineProps({
  data: {
    type: Object as PropType<MenuItem>,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {}
  }
})

const emit = defineEmits(['click'])

const onClickMenuItem = (item: MenuItem) => {
  emit('click', item)
}
</script>

<style lang="scss" scoped></style>
