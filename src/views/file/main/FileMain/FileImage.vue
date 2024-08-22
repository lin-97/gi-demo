<template>
  <img v-if="isImage" class="file-image" :src="props.data.src" />
  <GiSvgIcon v-else size="100%" :name="getFileImg"></GiSvgIcon>
</template>

<script setup lang="ts">
import { FileIcon, ImageTypes } from '@/constant/file'
import type { FileItem } from '@/apis/file'

interface Props {
  data: FileItem
}

const props = withDefaults(defineProps<Props>(), {})

// 是否是图片类型文件
const isImage = computed(() => {
  const extendName = props.data.extendName.toLowerCase()
  return ImageTypes.includes(extendName)
})

// 获取文件图标，如果是图片就显示图片
const getFileImg = computed<string>(() => {
  const extendName = props.data.extendName.toLowerCase()
  if (props.data?.isDir) {
    return FileIcon['dir']
  }
  if (ImageTypes.includes(extendName)) {
    return props.data.src
  }
  if (!Object.keys(FileIcon).includes(extendName)) {
    return FileIcon['other']
  }
  return FileIcon[extendName]
})
</script>

<style lang="scss" scoped>
.file-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
