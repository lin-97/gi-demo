<template>
  <Icon v-if="props?.icon && (props.icon.startsWith('icon-park') || props.icon.startsWith('custom:'))"
    :icon="props.icon" :width="16" :height="16" />
  <component :is="props?.icon" v-else-if="props?.icon && props?.icon?.startsWith('icon')" :size="24">
  </component>
  <Icon v-else-if="props?.icon" :icon="props.icon" :width="24" :height="24" />
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
