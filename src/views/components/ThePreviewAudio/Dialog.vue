<template>
  <a-modal width="auto" v-model:visible="visible" @cancel="handleCancel">
    <canvas height="110" style="width: 100%"></canvas>
    <div id="audio"></div>
  </a-modal>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import 'xgplayer'
import Music from 'xgplayer-music'

export default defineComponent({
  props: {
    fileInfo: Object,
    onCancel: Function
  },
  setup(props) {
    let visible = ref<boolean>(false)
    let player = ref<any>(null)

    onMounted(() => {
      visible.value = true
      player.value = new Music({
        id: 'audio',
        url: [
          {
            src: props.fileInfo?.src,
            name: props.fileInfo?.name,
            poster: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-small.jpeg'
          }
        ],
        volume: 0.8,
        width: 900,
        height: 50,
        preloadNext: true,
        switchKeepProgress: false,
        volumeShow: true,
        autoplay: true
      })

      player.value.crossOrigin = 'anonymous'
      player.value.analyze(document.querySelector('canvas'))
    })

    onBeforeUnmount(() => {
      player.value = null
    })

    const handleCancel = () => {
      visible.value = false
      props.onCancel()
    }

    return {
      visible,
      handleCancel
    }
  }
})
</script>
