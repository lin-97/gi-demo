<template>
  <div class="main-table">
    <a-row justify="space-between">
      <a-space>
        <a-button type="primary">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
        <a-button type="primary" status="danger">
          <template #icon><icon-delete /></template>
          <span>删除</span>
        </a-button>
        <a-button>
          <template #icon><icon-export /></template>
          <span>导入</span>
        </a-button>
      </a-space>
      <a-space :size="15">
        <a-tooltip content="表格斑马纹">
          <a-switch size="medium" />
        </a-tooltip>
        <a-tooltip content="刷新">
          <icon-refresh :size="18" />
        </a-tooltip>
        <a-tooltip content="列设置">
          <icon-settings :size="18" />
        </a-tooltip>
        <a-tooltip content="全屏">
          <icon-fullscreen :size="18" />
        </a-tooltip>
      </a-space>
    </a-row>
    <section class="table-box">
      <a-table
        :data="tableData"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="{ 'show-page-size': true }"
      >
        <template #columns>
          <a-table-column title="序号" :width="60">
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
      </a-table>
    </section>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getTableList } from '@/apis/table'
import GiFooter from '@/components/GiFooter.vue'

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: ''
})

const tableData = ref<object[]>([])
let loading = ref<boolean>(false)

type PageInfo = {
  page: number
  pageSize: number
}

const pageInfo: PageInfo = reactive({
  page: 1,
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
</script>

<style lang="scss" scoped>
.main-table {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-2);
  padding: $margin $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: $margin;
  }
  .table-box {
    margin-top: $margin;
    flex: 1;
    overflow: hidden;
  }
}
</style>
