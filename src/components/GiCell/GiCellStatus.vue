<template>
  <a-tag v-if="props.status === '1'" color="arcoblue">
    <template #icon><icon-check-circle-fill /></template>
    <template #default>正常</template>
  </a-tag>
  <a-tag v-if="props.status === '0'" color="orangered">
    <template #icon><icon-minus-circle-fill /></template>
    <template #default>禁用</template>
  </a-tag>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiCellStatus' })

const props = withDefaults(defineProps<Props>(), {
  status: '1'
})

interface Props {
  status?: Status
}
</script>

<style lang="scss" scoped></style>
