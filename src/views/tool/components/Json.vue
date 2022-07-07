<template>
  <div class="json">
    <JsonEditorVue class="editor" v-model="jsonData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
import data from '@/views/file/main/FileMain/filedata'

const jsonData = ref(data)
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
