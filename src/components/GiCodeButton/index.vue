<template>
  <a-button type="primary" status="warning" @click="onViewCode">
    <template #icon><icon-code /></template>
  </a-button>
</template>

<script setup lang='ts'>
import { Drawer } from '@arco-design/web-vue'
import GiCodeView from '@/components/GiCodeView/index.vue'

interface Props {
  code?: string
  lang?: 'vue' | 'javascript'
}

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
