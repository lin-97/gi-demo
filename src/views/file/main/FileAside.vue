<template>
  <div class="file-aside" v-if="windowWidth > 715">
    <GiTitle title="文件管理"></GiTitle>
    <a-menu
      :style="{ width: '220px', height: '100%', 'border-radius': '2px' }"
      :default-open-keys="['0']"
      :default-selected-keys="[currentKey]"
    >
      <a-sub-menu key="0">
        <template #icon>
          <icon-apps></icon-apps>
        </template>
        <template #title>文件类型</template>
        <a-menu-item :key="item.key" v-for="item in fileTypeList" @click="onClickMenuItem(item)">
          <template #icon>
            <GiSvgIcon :size="28" :name="item.icon"></GiSvgIcon>
          </template>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
const route = useRoute()
const router = useRouter()

const { width: windowWidth } = useWindowSize()

interface FileTypeListItem {
  key: string
  name: string
  icon: string
}

const fileTypeList = ref<FileTypeListItem[]>([
  { key: '0', name: '全部', icon: 'menu-file' },
  { key: '1', name: '图片', icon: 'file-image' },
  { key: '2', name: '文档', icon: 'file-txt' },
  { key: '3', name: '视频', icon: 'file-video' },
  { key: '4', name: '音乐', icon: 'file-music' },
  { key: '5', name: '其他', icon: 'file-other' }
])

const currentKey = ref<unknown>('0')

// 监听路由变化
watch(
  () => route.query,
  () => {
    currentKey.value = route.query.fileType
  },
  {
    immediate: true
  }
)

const onClickMenuItem = (item: FileTypeListItem) => {
  console.log(route)
  router.push({ path: '/file', query: { fileType: item.key } })
}
</script>

<style lang="scss" scoped>
.file-aside {
  height: fit-content;
  margin: $margin 0 $margin $margin;
  background: var(--color-bg-2);
  border-radius: 2px;
}
</style>
