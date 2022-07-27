<template>
  <div class="table-page">
    <a-alert type="success"
      >三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例。详情页请点击操作列按钮，支持tab多开并高亮左侧菜单</a-alert
    >
    <a-form label-align="right" auto-label-width :model="form" class="form">
      <a-row :gutter="16" wrap>
        <a-col :md="6" :xxl="12">
          <a-form-item field="value1" label="姓名">
            <a-input v-model="form.value1" placeholder="请输入姓名" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :xxl="12">
          <a-form-item field="value2" label="手机">
            <a-input v-model="form.value2" placeholder="请输入手机号码" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :xxl="12" v-show="collapsed">
          <a-form-item field="value3" label="类型">
            <a-select placeholder="请选择">
              <a-option>北京</a-option>
              <a-option>上海</a-option>
              <a-option>广州</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="6" :xxl="12" v-show="collapsed">
          <a-form-item field="value3" label="时间">
            <a-date-picker show-time v-model="form.value3" placeholder="请选择创建时间" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :md="6" :xxl="12" v-show="collapsed">
          <a-form-item field="value4" label="状态">
            <a-select placeholder="请选择">
              <a-option>开启</a-option>
              <a-option>关闭</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="6" :xxl="12" v-show="collapsed">
          <a-form-item field="value5" label="地址">
            <a-input v-model="form.value5" placeholder="请输入查询地址" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="getTableData">
              <template #icon>
                <icon-search />
              </template>
              <template #default>查询</template>
            </a-button>
            <a-button>
              <template #default>重置</template>
            </a-button>
            <a-button type="text" class="collapsed-btn" @click="collapsed = !collapsed">
              <template #icon>
                <icon-up v-if="collapsed" />
                <icon-down v-else />
              </template>
              <template #default>{{ !collapsed ? '展开' : '收起' }}</template>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>

    <section class="table-box">
      <a-table
        row-key="id"
        page-position="bottom"
        :bordered="{ cell: true }"
        v-loading="loading"
        :data="tableData"
        :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
        :pagination="{ showPageSize: true, total: total, current: current, pageSize: pageSize }"
        @page-change="changeCurrent"
        @page-size-change="changePageSize"
      >
        <template #columns>
          <a-table-column title="序号" :width="66" align="center">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="姓名" data-index="name" :width="120"></a-table-column>
          <a-table-column title="头像" :width="80">
            <template #cell="{ record }">
              <a-avatar :size="30" :style="{ backgroundColor: record.color }">{{ record.name[0] }}</a-avatar>
            </template>
          </a-table-column>
          <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
          <a-table-column title="创建时间" data-index="startTime" ellipsis tooltip></a-table-column>
          <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
          <a-table-column title="状态" :width="100">
            <template #cell="{ record }">
              <a-switch :model-value="record.status" size="medium" checked-color="rgb(var(--success-6))">
                <template #checked>开启</template>
                <template #unchecked>关闭</template>
              </a-switch>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="200" align="center">
            <template #cell="{ record }">
              <a-row justify="center">
                <a-space>
                  <a-button type="primary" size="mini">修改</a-button>
                  <a-button size="mini">详情</a-button>
                  <a-popconfirm type="warning" content="您确定要删除该项吗?">
                    <a-button type="primary" status="danger" size="mini">删除</a-button>
                  </a-popconfirm>
                </a-space>
              </a-row>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>

    <GiFooter></GiFooter>
  </div>
</template>

<script setup lang="ts" name="MainTable">
import { reactive, ref } from 'vue'
import { usePagination } from '@/hooks'
import { getTableList } from '@/apis'
import type { ApiTableItem } from '@/apis'

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: ''
})

const loading = ref(false)
const tableData = ref<ApiTableItem[]>([])
const collapsed = ref(false)

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => {
  getTableData()
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getTableList({
      current: current.value,
      pageSize: pageSize.value
    })
    tableData.value = res.data.list
    setTotal(res.data.total)
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

getTableData()
</script>

<style lang="scss" scoped>
:deep(.arco-grid) {
  flex-wrap: wrap;
}
:deep(.arco-grid-item) {
  min-width: 250px;
}
:deep(.arco-alert-success) {
  padding: 5px 15px;
  border-color: rgb(var(--success-6));
  background-color: rgba(var(--success-6), 0.08);
  .arco-alert-content {
    color: rgb(var(--success-6));
    font-size: 12px;
  }
}
.collapsed-btn {
  &:hover,
  &:active {
    background: none;
  }
}
.table-page {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-1);
  padding: $padding;
  padding-bottom: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: 12px;
    :deep(.arco-form-item) {
      margin-bottom: 10px;
    }
  }
  .table-box {
    flex: 1;
    overflow: hidden;
    margin-top: 12px;
  }
}
</style>
