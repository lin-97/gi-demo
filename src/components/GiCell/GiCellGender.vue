<template>
  <a-tag v-if="props.gender === 1" color="arcoblue" size="small" class="gi_round">
    <template #icon><icon-man /></template>
    <template #default>男</template>
  </a-tag>
  <a-tag v-if="props.gender === 2" color="purple" size="small" class="gi_round">
    <template #icon><icon-woman /></template>
    <template #default>女</template>
  </a-tag>
  <a-tag v-if="props.gender === 3" color="gray" size="small" class="gi_round">
    <template #icon><icon-lock /></template>
    <template #default>保密</template>
  </a-tag>
</template>

<script lang="ts" setup>
defineOptions({ name: 'GiCellGender' })

const props = withDefaults(defineProps<Props>(), {
  gender: 1
})

interface Props {
  gender: 1 | 2 | 3
}
</script>

<style lang="scss" scoped></style>
