<template>
  <a-modal v-model:visible="visible" title="查看代码" fullscreen>
    <CodeMirror :model-value="codeValue" :tab-size="4" basic :dark="true" readonly :extensions="extensions" />
  </a-modal>
</template>

<script lang="ts" setup>
import CodeMirror from 'vue-codemirror6'
import { vue } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'
import { Pane2Code } from './pane2-code'

const visible = ref(false)
const open = () => {
  visible.value = true
}
defineExpose({ open })

const codeValue = ref(Pane2Code)

const extensions = [vue(), oneDark]
</script>

<style lang="scss" scoped></style>
