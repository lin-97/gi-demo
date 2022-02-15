<template>
  <a-modal width="auto" v-model:visible="visible" @cancel="handleCancel">
    <canvas height="110" style="width: 100%"></canvas>
    <div id="audio"></div>
  </a-modal>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import 'xgplayer'
import Music from 'xgplayer-music'

export default defineComponent({
  props: {
    onCancel: Function
  },
  setup(props) {
    let visible = ref<boolean>(false)

    onMounted(() => {
      visible.value = true
      let player = new Music({
        id: 'audio',
        url: [
          {
            src: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/audio.mp3',
            name: '林宥嘉·脆弱一分钟',
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

      player.crossOrigin = 'anonymous'
      player.analyze(document.querySelector('canvas'))
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
