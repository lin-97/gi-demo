<template>
  <a-drawer v-model:visible="visible" title="数据结构" width="560px">
    <CodeMirror :model-value="codeValue" :tab-size="4" basic :dark="true" readonly :extensions="extensions" />
  </a-drawer>
</template>

<script lang="ts" setup>
import CodeMirror from 'vue-codemirror6'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import type { MenuItem } from '@/apis'

interface Props {
  data?: MenuItem[]
}

const props = withDefaults(defineProps<Props>(), {})

const visible = ref(false)
const open = () => {
  visible.value = true
}
defineExpose({ open })

const initJson = { name: '哈哈', year: 2023 }
const codeValue = ref('')
watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      codeValue.value = JSON.stringify(props.data, null, '\t')
    } else {
      codeValue.value = JSON.stringify(initJson, null, '\t')
    }
  }
)

const extensions = [javascript(), oneDark]
</script>

<style lang="scss" scoped></style>
