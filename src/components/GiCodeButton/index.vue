<template>
  <a-button type="primary" status="warning" @click="onViewCode">
    <template #icon><icon-code /></template>
  </a-button>
</template>

<script setup lang='ts'>
import { Drawer } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import GiCodeView from '@/components/GiCodeView/index.vue'

interface Props {
  code?: string
  lang?: 'vue' | 'javascript'
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  lang: 'vue'
})

const { width } = useWindowSize()
const onViewCode = () => {
  Drawer.open({
    title: '查看代码',
    content: () => h(GiCodeView, { codeJson: props.code, type: props.lang }),
    width: width.value < 500 ? '100%' : 800
  })
}
</script>

<style lang='scss' scoped></style>
