<template>
  <component :is="type" v-bind="linkProps()">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

interface Props {
  to: string
}

const props = withDefaults(defineProps<Props>(), {})

const isExt = computed(() => isExternal(props.to))

const type = computed(() => {
  if (isExt.value) {
    return 'a'
  }
  return 'router-link'
})

function linkProps() {
  if (isExt.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: props.to
  }
}
</script>
