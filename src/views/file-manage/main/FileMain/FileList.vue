<template>
  <div class="file-list-wrap">
    <a-table :data="props.data" :bordered="false" :pagination="false" @row-click="handleRowClick">
      <template #columns>
        <!-- <a-table-column title="序号" width="60">
          <template #cell="{ record }">{{ record.index + 1 }}</template>
        </a-table-column> -->
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
        <!-- <a-table-column title="操作" width="230">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" @click="onEdit(record)">修改</a-button>
              <a-button @click="onDetail">详情</a-button>
              <a-button type="primary" status="danger" @click="onDelete">删除</a-button>
            </a-space>
          </template>
        </a-table-column> -->
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
  emit('contextmenu', row)
}
</script>

<style lang="scss" scoped>
.file-list-wrap {
  margin-top: $margin;
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
