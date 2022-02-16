<template>
  <div class="file-aside">
    <a-menu
      :style="{ width: '250px', height: '100%', 'border-radius': '2px' }"
      :default-open-keys="['0']"
      :default-selected-keys="[currentKey]"
    >
      <div class="title">文件管理</div>
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
const route = useRoute()
const router = useRouter()

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

let currentKey = ref<string>('0')

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
  router.push({ path: '/file-manage', query: { fileType: item.key } })
}
</script>

<style lang="scss" scoped>
.file-aside {
  height: 60%;
  padding: $margin 0 $margin $margin;
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    font-size: 14px;
    border-bottom: 1px solid var(--color-border-2);
    margin-bottom: 10px;
  }
}
</style>
