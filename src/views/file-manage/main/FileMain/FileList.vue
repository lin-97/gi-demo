<template>
  <div class="file-list">
    <a-table
      row-key="id"
      :data="props.data"
      :bordered="false"
      :pagination="false"
      :row-selection="isBatchMode ? rowSelection : undefined"
      @row-click.capture="handleRowClick"
    >
      <template #columns>
        <a-table-column title="名称">
          <template #cell="{ record }">
            <div class="file-name" @contextmenu="handleContextMenu($event, record)">
              <div class="file-image">
                <FileImg :data="record"></FileImg>
              </div>
              <span>{{ record.name }}</span>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="扩展名" data-index="extendName" width="100"></a-table-column>
        <a-table-column title="更改时间" data-index="updateTime" width="200"></a-table-column>
        <a-table-column title="操作" width="120" align="center">
          <template #cell="{ record }">
            <a-button type="text" @click="handleContextMenu($event, record)"><icon-more :size="16" /></a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FileImg from './FileImg.vue'

const props = defineProps({
  // 文件数据
  data: {
    type: Array,
    default: () => []
  },
  // 是否是批量模式
  isBatchMode: {
    type: Boolean,
    default: false
  }
})

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true
})

const emit = defineEmits(['click', 'contextmenu'])

// 行点击事件
const handleRowClick = (row: File.FileItem) => {
  emit('click', row)
}

// 右键事件
const handleContextMenu = (e: PointerEvent, row: File.FileItem) => {
  e.preventDefault()
  emit('contextmenu', e, row)
}
</script>

<style lang="scss" scoped>
.file-list {
  width: 100%;
  padding-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
  .file-name {
    height: 100%;
    display: flex;
    align-items: center;
    .file-image {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
