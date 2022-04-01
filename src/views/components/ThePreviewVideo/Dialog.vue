<template>
  <a-modal title="视频播放" width="auto" v-model:visible="visible" @cancel="handleCancel">
    <div id="videoId"></div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Player from 'xgplayer'

const props = defineProps({
  fileInfo: Object,
  onCancel: Function
})

let visible = ref<boolean>(false)

onMounted(() => {
  visible.value = true
  nextTick(() => {
    new Player({
      id: 'videoId',
      url: props.fileInfo?.src,
      autoplay: true,
      width: 900,
      height: 500
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
