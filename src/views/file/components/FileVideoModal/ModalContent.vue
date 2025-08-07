<template>
  <div id="videoId"></div>
</template>

<script lang="ts" setup>
import type { FileItem } from '@/apis/file'
import Player from 'xgplayer'

interface Props {
  data: FileItem
}
const props = withDefaults(defineProps<Props>(), {})

onMounted(() => {
  new Player({
    id: 'videoId',
    url: props.data?.src ?? '',
    lang: 'zh-cn',
    autoplay: true,
    closeVideoClick: true,
    videoInit: true
  })
})
</script>

<style lang="scss" scoped></style>
