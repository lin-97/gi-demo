<template>
  <a-card title="富文本编辑器" :bordered="false">
    <div class="editor">
      <Toolbar class="editor-toolbar" :editor="editorRef" :default-config="toolbarConfig" />
      <Editor v-model="valueHtml" class="editor-content" style="height: 500px; overflow-y: hidden"
        :default-config="editorConfig" @on-created="handleCreated" />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// 编辑器实例，必须用shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = '<p>富文本内容</p>'
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style lang="less" scoped>
.editor {
  border: 1px solid var(--color-border-3);

  &.w-e-full-screen-container {
    z-index: 9999;
  }

  &-toolbar {
    border-bottom: 1px solid var(--color-border-3);
  }
}
</style>
