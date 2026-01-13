<template>
  <Icon v-if="props?.icon && props?.icon?.startsWith('icon-park')" :icon="props?.icon" :width="16" :height="16"></Icon>
  <component :is="props?.icon" v-else-if="props?.icon && props?.icon?.startsWith('icon')" :size="24">
  </component>
  <GiSvgIcon v-else-if="props?.icon" :name="props?.icon" :size="24"></GiSvgIcon>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'

interface Props {
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: ''
})
</script>

<style lang="scss" scoped></style>
