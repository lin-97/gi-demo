<template>
  <div class="file-grid-wrap">
    <FileCard
      v-for="item in props.data"
      :key="item.id"
      :data="item"
      :check-mode="isBatchMode"
      :checked="selectedFileIdList.includes(item.id)"
      @click="handleClickFile(item)"
      @check="handleCheckFile(item)"
      @contextmenu="handleContextMenu"
    ></FileCard>
  </div>
</template>

<script setup lang="ts">
import FileCard from './FileCard.vue'

const props = defineProps({
  // 文件数据
  data: {
    type: Array,
    default: () => []
  },
  // 批量模式下选中的文件id数组
  selectedFileIdList: {
    type: Array,
    default: () => []
  },
  // 是否是批量模式
  isBatchMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'check', 'contextmenu'])

// 点击事件
const handleClickFile = (row) => {
  emit('click', row)
}

// 选中事件
const handleCheckFile = (row) => {
  emit('check', row)
}

// 右键事件
const handleContextMenu = (e: Event, fileInfo: any) => {
  e.preventDefault()
  emit('contextmenu', e, fileInfo)
}
</script>

<style lang="scss" scoped>
.file-grid-wrap {
  flex: 1;
  margin-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
  background: var(--color-bg-4);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
