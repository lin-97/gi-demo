<template>
  <div class="data-pane3">
    <a-row justify="space-between" align="center" class="head">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>数据管理</a-breadcrumb-item>
        <a-breadcrumb-item>单位管理</a-breadcrumb-item>
      </a-breadcrumb>

      <a-space>
        <a-button>重置</a-button>
        <a-button type="primary">提交</a-button>
      </a-space>
    </a-row>

    <section class="content">
      <section class="table-box">
        <a-table
          row-key="id"
          size="small"
          :loading="loading"
          :bordered="{ cell: true }"
          :columns="columns"
          :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
          :row-selection="{ type: 'checkbox', showCheckedAll: true }"
          :pagination="pagination"
          @select="select"
          @select-all="selectAll"
        >
          <template #index="{ rowIndex }">{{ rowIndex + 1 }}</template>
          <template #proportion="{ record }">
            <a-progress
              size="mini"
              :status="getProportionColor(record.proportion)"
              :percent="record.proportion / 100"
            />
          </template>
          <template #status="{ record }">
            <template v-for="item in StatusList" :key="item.value">
              <a-tag size="small" v-if="item.value === record.status" :color="item.color">{{ item.name }}</a-tag>
            </template>
          </template>
          <template #operation="{ record }">
            <a-space>
              <a-button type="primary" size="mini">
                <icon-edit></icon-edit>
              </a-button>
              <a-button size="mini">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?">
                <a-button type="primary" status="danger" size="mini">
                  <icon-delete />
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import { getPersonList } from '@/apis'
import type { PersonItem } from '@/apis'
import { StatusList } from '@/constant/person'

const router = useRouter()

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    slotName: 'index'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '比例',
    slotName: 'proportion',
    width: 68,
    align: 'center'
  },
  {
    title: '状态',
    slotName: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 200,
    align: 'center'
  }
]

const { pagination, setTotal } = usePagination(() => getTableData())
const tableData = ref<PersonItem[]>([])
const loading = ref(false)

const getTableData = async () => {
  loading.value = true
  const res = await getPersonList({
    current: pagination.current,
    pageSize: pagination.pageSize
  })
  if (res.success) {
    tableData.value = res.data.list
    setTotal(res.data.total)
    loading.value = false
  } else {
    loading.value = false
  }
}

onActivated(() => {
  getTableData()
})

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []
}
</script>

<style lang="scss" scoped>
.data-pane3 {
  flex: 1;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    padding: 0 $padding;
    height: 50px;
    box-sizing: border-box;
  }
}
.content {
  flex: 1;
  margin: $margin;
  margin-top: 0;
  padding: $padding;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--color-bg-1);
  border-radius: $radius-box;
  .table-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>
