<template>
  <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
    <slot></slot>
  </a>
  <router-link v-else :to="props.to">
    <slot></slot>
  </router-link>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'

interface Props {
  to: string
}

const props = withDefaults(defineProps<Props>(), {
  to: ''
})
</script>
