<template>
  <GiSvgIcon v-if="props.svgIcon" :name="props.svgIcon" :size="24"></GiSvgIcon>
  <component :is="props.icon" v-else-if="props.icon"></component>
</template>

<script lang="ts" setup>
interface Props {
  svgIcon?: string
  icon?: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>
