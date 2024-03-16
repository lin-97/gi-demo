<template>
  <GiOption :class="{ option: showClassStyle }">
    <GiOptionItem label="重命名" icon="menu-edit" @click="onClickItem('rename')"> </GiOptionItem>
    <GiOptionItem label="移动到" icon="menu-move" @click="onClickItem('move')"></GiOptionItem>
    <GiOptionItem label="下载" icon="menu-download" @click="onClickItem('download')"></GiOptionItem>
    <a-popover
      position="right"
      :content-style="{ padding: 0, overflow: 'hidden', width: '150px' }"
      :arrow-style="{ display: 'none' }"
      v-if="props.fileInfo.extendName === 'zip'"
    >
      <GiOptionItem label="解压" icon="menu-zip" more></GiOptionItem>
      <template #content>
        <GiOption>
          <GiOptionItem label="解压到当前目录" icon="file-rar" @click="onClickItem('zip1')"> </GiOptionItem>
          <GiOptionItem label="解压到其他目录" icon="file-rar" @click="onClickItem('zip2')"> </GiOptionItem>
        </GiOption>
      </template>
    </a-popover>
    <GiOptionItem label="详情" icon="menu-detail" @click="onClickItem('detail')"> </GiOptionItem>
    <GiOptionItem label="删除" icon="menu-delete" @click="onClickItem('delete')"> </GiOptionItem>
  </GiOption>
</template>

<script setup lang="ts">
import GiOption from '@/components/GiOption/index.vue'
import GiOptionItem from '@/components/GiOptionItem/index.vue'
import type { FileItem } from '@/apis'

interface Props {
  fileInfo?: FileItem
  showClassStyle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fileInfo: () => ({
    id: '',
    type: '',
    name: '',
    extendName: '',
    src: '',
    updateTime: '',
    isDir: false,
    filePath: ''
  }), // 文件数据
  showClassStyle: true
})

const emit = defineEmits<{
  (e: 'click', mode: string): void
}>()

const onClickItem = (mode: string) => {
  emit('click', mode)
}
</script>

<style lang="scss" scoped>
.option {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  background: var(--color-bg-popup);
}
</style>
