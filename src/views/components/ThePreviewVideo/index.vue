<template>
  <a-modal width="auto" v-model:visible="visible" @cancel="handleCancel">
    <div id="video"></div>
  </a-modal>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import Player from 'xgplayer/dist/simple_player'

export default defineComponent({
  props: {
    onCancel: Function
  },
  setup(props) {
    let visible = ref<boolean>(false)

    onMounted(() => {
      visible.value = true
      let player = new Player({
        id: 'video',
        url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
        autoplay: true
      })
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
