<template>
  <div class="file-list-wrap">
    <a-table
      :data="props.data"
      :bordered="false"
      :pagination="false"
      row-key="id"
      :row-selection="{
        type: 'checkbox',
        showCheckedAll: isBatchMode
      }"
      @row-click="handleRowClick"
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
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
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

const emit = defineEmits(['click', 'contextmenu'])

// 行点击事件
const handleRowClick = (row) => {
  emit('click', row)
}

// 右键事件
const handleContextMenu = (e: Event, row) => {
  e.preventDefault()
  emit('contextmenu', e, row)
}
</script>

<style lang="scss" scoped>
.file-list-wrap {
  width: 100%;
  padding-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
  .file-name {
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
