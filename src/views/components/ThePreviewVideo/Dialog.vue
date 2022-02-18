<template>
  <a-modal width="auto" v-model:visible="visible" @cancel="handleCancel">
    <div id="video"></div>
  </a-modal>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount, defineComponent } from 'vue'
import Player from 'xgplayer/dist/simple_player'

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
      player.value = new Player({
        id: 'video',
        url: props.fileInfo?.src,
        autoplay: true
      })
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
