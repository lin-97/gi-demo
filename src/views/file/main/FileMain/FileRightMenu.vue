<template>
  <GiOption :class="{ shadow: props.shadow }">
    <GiOptionItem label="重命名" @click="onClickItem('rename')">
      <template #icon>
        <GiIconBox color="#4F6BF6"><icon-edit /></GiIconBox>
      </template>
    </GiOptionItem>
    <GiOptionItem label="移动到" @click="onClickItem('move')">
      <template #icon>
        <GiIconBox color="#62C558"><icon-export /></GiIconBox>
      </template>
    </GiOptionItem>
    <GiOptionItem label="下载" @click="onClickItem('download')">
      <template #icon>
        <GiIconBox color="#1677FF"><icon-download /></GiIconBox>
      </template>
    </GiOptionItem>
    <a-popover v-if="props.data?.extendName === 'zip'" position="right"
      :content-style="{ padding: 0, overflow: 'hidden', width: '150px' }" :arrow-style="{ display: 'none' }">
      <GiOptionItem label="解压" more>
        <template #icon>
          <GiIconBox color="#62C558"><icon-attachment /></GiIconBox>
        </template>
      </GiOptionItem>
      <template #content>
        <GiOption>
          <GiOptionItem label="解压到当前目录" icon="file-rar" @click="onClickItem('zip1')"> </GiOptionItem>
          <GiOptionItem label="解压到其他目录" icon="file-rar" @click="onClickItem('zip2')"> </GiOptionItem>
        </GiOption>
      </template>
    </a-popover>
    <GiOptionItem label="详情" @click="onClickItem('detail')">
      <template #icon>
        <GiIconBox color="#A15FDE"><icon-drive-file /></GiIconBox>
      </template>
    </GiOptionItem>
    <GiOptionItem label="删除" @click="onClickItem('delete')">
      <template #icon>
        <GiIconBox color="danger"><icon-delete /></GiIconBox>
      </template>
    </GiOptionItem>
  </GiOption>
</template>

<script setup lang="ts">
import type { FileItem } from '@/apis/file'
import GiOption from '@/components/GiOption/index.vue'
import GiOptionItem from '@/components/GiOptionItem/index.vue'

interface Props {
  data?: FileItem
  shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  shadow: true
})

const emit = defineEmits<{
  (e: 'click', mode: string): void
}>()

const onClickItem = (mode: string) => {
  emit('click', mode)
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  background: var(--color-bg-popup);
}
</style>
