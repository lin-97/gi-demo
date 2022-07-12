<template>
  <div class="json">
    <JsonEditorVue class="editor" v-model="jsonData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonEditorVue from 'json-editor-vue3'

const jsonData = ref({
  sites: {
    site: [
      {
        id: '1',
        name: '菜鸟教程',
        url: 'www.runoob.com'
      },
      {
        id: '2',
        name: '菜鸟工具',
        url: 'c.runoob.com'
      },
      {
        id: '3',
        name: 'Google',
        url: 'www.google.com'
      }
    ]
  }
})
</script>

<style lang="scss" scoped>
.json {
  flex: 1;
  width: 100%;
  height: 100%;
}
:deep(.editor) {
  height: 100%;
}
</style>
