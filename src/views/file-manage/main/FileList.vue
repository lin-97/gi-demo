<template>
  <div class="file-list-wrap">
    <a-table :data="props.data" :bordered="false" :pagination="false">
      <template #columns>
        <!-- <a-table-column title="序号" width="60">
          <template #cell="{ record }">{{ record.index + 1 }}</template>
        </a-table-column> -->
        <a-table-column title="名称" data-index="name"></a-table-column>
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
const props = defineProps({
  // 文件数据
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.file-list-wrap {
  margin-top: $margin;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
