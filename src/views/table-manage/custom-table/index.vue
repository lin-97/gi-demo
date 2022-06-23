<template>
  <div class="table-page">
    <GiTable
      row-key="id"
      :data="tableData"
      v-loading="loading"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
      :pagination="{ 'show-page-size': true }"
      :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      @refresh="getTableData"
    >
      <template #left>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger" @click="onDelete">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button @click="onImport">
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
      </template>
      <template #columns>
        <a-table-column title="序号" :width="68">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name"></a-table-column>
        <a-table-column title="头像" :width="100">
          <template #cell="{ record }">
            <a-avatar :size="30" :style="{ backgroundColor: record.color }">{{ record.name[0] }}</a-avatar>
          </template>
        </a-table-column>
        <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
        <a-table-column title="创建时间" data-index="startTime"></a-table-column>
        <a-table-column title="地址" data-index="address"></a-table-column>
        <a-table-column title="状态" :width="100">
          <template #cell="{ record }">
            <a-switch v-model="record.status" size="medium">
              <template #checked>开启</template>
              <template #unchecked>关闭</template>
            </a-switch>
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="200">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" size="mini">修改</a-button>
              <a-button size="mini">详情</a-button>
              <a-popconfirm content="您确定要删除该项吗?">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </GiTable>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getTableList } from '@/apis/table'
import { Message } from '@arco-design/web-vue'

const tableData = ref([])
const loading = ref(false)

const pageInfo: Pagination.PageData = reactive({
  current: 1,
  pageSize: 1000
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getTableList(pageInfo)
    tableData.value = res.data.list
    loading.value = false
  } catch (error) {
    loading.value = false
    return error
  }
}

getTableData()

const onAdd = () => {
  Message.info('点击了新增')
}

const onDelete = () => {
  Message.info('点击了删除')
}

const onImport = () => {
  Message.info('点击了导入')
}
</script>

<style lang="scss" scoped>
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-2);
  padding: $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: 12px;
  }
}
</style>
