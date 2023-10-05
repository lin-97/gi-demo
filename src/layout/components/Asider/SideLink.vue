<template>
  <component :is="type" v-bind="linkProps()" @click="onClick">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import { isPhone } from '@/utils/common'
import { useAppStore } from '@/stores'

const appStore = useAppStore()

interface Props {
  to: string | AnyObject
}

const props = withDefaults(defineProps<Props>(), {})

// 是否是外链
const isExt = computed(() => {
  if (typeof props.to === 'string') {
    return isExternal(props.to)
  } else {
    return false
  }
})

// 如果是外链，渲染为<a>标签，否则渲染为<router-link>组件
const type = computed(() => (isExt.value ? 'a' : 'router-link'))

// 绑定属性
const linkProps = () => {
  if (isExt.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return { to: props.to }
}

const onClick = () => {
  if (!isPhone()) return
  appStore.menuCollapse = false
}
</script>
