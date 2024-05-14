<template>
  <a-tag v-if="props.status === 1" color="arcoblue" size="small">
    <template #icon><icon-check-circle-fill /></template>
    <template #default>正常</template>
  </a-tag>
  <a-tag v-if="props.status === 0" color="orangered" size="small">
    <template #icon><icon-minus-circle-fill /></template>
    <template #default>禁用</template>
  </a-tag>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiCellStatus' })

const props = withDefaults(defineProps<Props>(), {
  status: 1
})

interface Props {
  status: 0 | 1
}
</script>

<style lang="scss" scoped></style>
