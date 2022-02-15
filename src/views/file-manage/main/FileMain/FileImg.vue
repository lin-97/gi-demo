<template>
  <img class="img" :src="props.data.src" v-if="isImg" />
  <GiSvgIcon class="svg" :name="getFileImg" v-else></GiSvgIcon>
</template>

<script setup lang="ts">
import { fileImgMap, imageTypeList } from '@/libs/file-map'
import { computed } from 'vue-demi'

const props = defineProps({
  // 文件数据
  data: {
    type: Object,
    default: () => {}
  }
})

let isImg = computed<boolean>(() => {
  return imageTypeList.includes(props.data.extendName)
})

let getFileImg = computed<string>(() => {
  if (props.data.isDir) {
    return fileImgMap['dir']
  } else if (imageTypeList.includes(props.data.extendName)) {
    return props.data.src
  } else if (!Object.keys(fileImgMap).includes(props.data.extendName)) {
    return fileImgMap['other']
  } else {
    return fileImgMap[props.data.extendName]
  }
})
</script>

<style lang="scss" scoped>
.img,
.svg {
  width: 100%;
  height: 100%;
}
</style>
