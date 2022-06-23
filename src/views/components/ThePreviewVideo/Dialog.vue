<template>
  <a-modal title="视频播放" width="auto" draggable v-model:visible="visible" @cancel="handleCancel">
    <div id="videoId"></div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Player from 'xgplayer'

const props = defineProps({
  fileInfo: Object,
  onCancel: Function
})

const visible = ref(false)

onMounted(() => {
  visible.value = true
  nextTick(() => {
    new Player({
      id: 'videoId',
      url: props.fileInfo?.src,
      lang: 'zh-cn',
      autoplay: true,
      closeVideoClick: true,
      videoInit: true
    })
  })
})

const handleCancel = () => {
  visible.value = false
  props.onCancel()
}

defineExpose({
  visible,
  handleCancel
})
</script>
