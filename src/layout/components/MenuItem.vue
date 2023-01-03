<template>
  <a-sub-menu :key="data.path" v-if="data.children && data.children.length && !data.hidden">
    <template #icon>
      <GiSvgIcon v-if="data.icon" :size="24" :name="data.icon"></GiSvgIcon>
    </template>
    <template #title>{{ data.name }}</template>
    <MenuItem v-for="item in data.children" :key="item.id" :data="item" @click="onClickMenuItem"></MenuItem>
  </a-sub-menu>

  <a-menu-item v-else :key="data.path" @click="onClickMenuItem(data)">
    <template #icon>
      <GiSvgIcon v-if="data.icon" :size="24" :name="data.icon"></GiSvgIcon>
      <icon-unordered-list v-else :size="20" />
    </template>
    {{ data.name }}
  </a-menu-item>
</template>

<script setup lang="ts" name="MenuItem">
export interface Props {
  data: MenuItem
}

withDefaults(defineProps<Props>(), {
  data: () => ({ id: '', name: '' })
})

const emit = defineEmits(['click'])

const onClickMenuItem = (item: MenuItem) => {
  emit('click', item)
}
</script>

<style lang="scss" scoped></style>
