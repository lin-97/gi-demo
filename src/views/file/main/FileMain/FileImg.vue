<template>
  <img class="img" :src="props.data.src" v-if="isImg" />
  <GiSvgIcon size="100%" :name="getFileImg" v-else></GiSvgIcon>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { fileImgMap, imageTypeList } from '@/libs/file-map'
import { computed } from 'vue-demi'
import type { ApiFileItem } from '@/apis'

const props = defineProps({
  // 文件数据
  data: {
    type: Object as PropType<ApiFileItem>,
    default: () => {}
  }
})

const isImg = computed<boolean>(() => {
  return imageTypeList.includes(props.data.extendName)
})

const getFileImg = computed<string>(() => {
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
img {
  width: 100%;
  height: 100%;
}
</style>
