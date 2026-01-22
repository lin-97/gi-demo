<template>
  <CodeMirror :model-value="codeValue" :tab-size="config.tabSize" :basic="config.basic" :dark="config.dark"
    :readonly="config.readonly" :extensions="extensions" />
</template>

<script setup lang="ts">
import type { CodeViewProps as Props } from './type'
import { javascript } from '@codemirror/lang-javascript'
import { vue } from '@codemirror/lang-vue'
import { oneDark } from '@codemirror/theme-one-dark'
import { computed } from 'vue'
import CodeMirror from 'vue-codemirror6'

defineOptions({
  name: 'GiCodeView'
})

const props = withDefaults(defineProps<Props>(), {
  type: 'javascript',
  codeJson: ''
})

// 默认配置
const defaultConfig = {
  tabSize: 2,
  basic: true,
  dark: true,
  readonly: true
}

const config = defaultConfig

// 语言扩展映射表
const languageExtensions = {
  javascript: () => javascript(),
  vue: () => vue()
} as const

// 代码值
const codeValue = computed(() => props.codeJson)

// CodeMirror 扩展配置
const extensions = computed(() => {
  const exts = [oneDark]
  const langExt = languageExtensions[props.type]
  if (langExt) {
    exts.push(langExt())
  }
  return exts
})
</script>

<style lang="scss" scoped>
:deep(.ͼ1 .cm-scroller) {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
</style>
