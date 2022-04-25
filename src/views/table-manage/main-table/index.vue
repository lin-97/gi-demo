<template>
  <div class="main-table">
    <a-form label-align="right" auto-label-width :model="form" class="form">
      <a-row :gutter="16" wrap>
        <a-col :span="6">
          <a-form-item field="value1" label="姓名">
            <a-input v-model="form.value1" placeholder="请输入姓名" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="value2" label="手机">
            <a-input v-model="form.value2" placeholder="请输入手机号码" />
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="collapsed">
          <a-form-item field="value3" label="类型">
            <a-select placeholder="请选择">
              <a-option>北京</a-option>
              <a-option>上海</a-option>
              <a-option>广州</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="collapsed">
          <a-form-item field="value3" label="创建时间">
            <a-date-picker show-time v-model="form.value3" placeholder="请选择创建时间" />
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="collapsed">
          <a-form-item field="value4" label="状态">
            <a-select placeholder="请选择">
              <a-option>开启</a-option>
              <a-option>关闭</a-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6" v-show="collapsed">
          <a-form-item field="value5" label="标题">
            <a-input v-model="form.value5" placeholder="please enter..." />
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
        stripe
        row-key="id"
        page-position="bottom"
        :data="tableData"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%' }"
        :pagination="{ 'show-page-size': true }"
      >
        <template #columns>
          <a-table-column title="序号" :width="60">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="姓名" data-index="name" :width="150"></a-table-column>
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
          <a-table-column title="操作" width="230">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary">修改</a-button>
                <a-button>详情</a-button>
                <a-popconfirm content="你确定要删除该项吗?">
                  <a-button type="primary" status="danger">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getTableList } from '@/apis/table'

const form = reactive({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: ''
})

const tableData = ref<object[]>([])
let loading = ref<boolean>(false)
let collapsed = ref<boolean>(false)

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
:deep(.arco-grid) {
  flex-wrap: wrap;
}
:deep(.arco-grid-item) {
  min-width: 250px;
}
.collapsed-btn {
  &:hover,
  &:active {
    background: none;
  }
}
.main-table {
  height: 100%;
  overflow: hidden;
  margin: $margin;
  background: var(--color-bg-2);
  padding: $margin $padding;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .form {
    margin-top: $margin;
  }
  .table-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>
