<template>
  <a-button type="primary" status="warning" @click="onViewCode">
    <template #icon><icon-code /></template>
  </a-button>
</template>

<script setup lang='ts'>
import type { CodeButtonProps as Props } from './type'
import { Drawer } from '@arco-design/web-vue'
import { GiCodeView } from '@/components/index'

const props = withDefaults(defineProps<Props>(), {
  code: '',
  lang: 'vue'
})

const onViewCode = () => {
  Drawer.open({
    title: '查看代码',
    content: () => h(GiCodeView, { codeJson: props.code, type: props.lang }),
    width: '100%',
    drawerStyle: { maxWidth: '800px' }
  })
}
</script>

<style lang='scss' scoped></style>
