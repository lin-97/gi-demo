<!--
  @file GiIframe 组件 - iframe 容器
  @description 提供带加载状态的 iframe 容器，支持错误处理和事件回调
-->
<template>
  <a-spin class="gi-iframe" :loading="loading" :loading-tip="loadingTip">
    <iframe ref="iframeRef" class="iframe" :src="src" :sandbox="sandbox" :allow="allow" @load="handleLoad"
      @error="handleError" />
  </a-spin>
</template>

<script setup lang="ts">
import type { IframeEmits, IframeProps as Props } from './type'
import { Message } from '@arco-design/web-vue'
import { ref } from 'vue'

/** 组件名称 */
defineOptions({ name: 'GiIframe' })

const props = withDefaults(defineProps<Props>(), {
  src: '',
  loadingTip: '加载中...',
  sandbox: 'allow-scripts allow-same-origin allow-forms',
  allow: 'fullscreen payment',
  showError: true
})

const emit = defineEmits<IframeEmits>()

/** iframe DOM 引用 */
const iframeRef = ref<HTMLIFrameElement>()

/** 加载状态 */
const loading = ref(true)

/** 处理 iframe 加载完成事件 */
const handleLoad = () => {
  loading.value = false
  emit('load')
  emit('loading-change', false)
}

/** 处理 iframe 加载错误事件 */
const handleError = (event: Event) => {
  loading.value = false
  emit('error', event)
  emit('loading-change', false)

  if (props.showError) {
    Message.error('iframe 加载失败，请检查网络连接或链接是否有效')
  }
}

/** 重新加载 iframe */
const reload = () => {
  if (iframeRef.value) {
    loading.value = true
    emit('loading-change', true)
    iframeRef.value.src = props.src
  }
}

// 暴露方法给父组件
defineExpose({
  reload,
  iframeRef
})
</script>

<style lang="scss" scoped>
.gi-iframe {
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .iframe {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: transparent;
    border: none;
  }
}
</style>
