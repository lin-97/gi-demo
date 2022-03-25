<template>
  <div class="dept-manage">
    <GiTitle title="部门管理">
      <a-button type="primary">
        <template #icon>
          <icon-plus />
        </template>
        <template #default>新增</template>
      </a-button>
    </GiTitle>

    <section class="table-box">
      <a-table
        :data="tableData"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%' }"
        :pagination="{ 'show-page-size': true }"
        :expandable="{ width: 80 }"
      >
        <template #columns>
          <a-table-column title="部门名称" data-index="name"></a-table-column>
          <a-table-column title="部门编码" data-index="deptCode"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime" width="200"></a-table-column>
          <a-table-column title="状态" width="100">
            <template #cell="{ record }">
              <a-switch v-model="record.status" size="medium" :checked-value="1" :unchecked-value="0">
                <template #checked>正常</template>
                <template #unchecked>禁用</template>
              </a-switch>
            </template>
          </a-table-column>
          <a-table-column title="操作" width="200">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary">编辑</a-button>
                <a-button type="primary" status="danger">删除</a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script setup lang="ts" name="DeptManage">
import { ref, reactive } from 'vue'
import { getSystemDeptList } from '@/apis/system'

const tableData = ref<object[]>([])
let total = ref<number>(0)
let loading = ref<boolean>(false)

const pageData: Pagination.PageData = reactive({
  pageCount: 1,
  pageSize: 1000
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getSystemDeptList({ ...pageData })
    if (res.success) {
      tableData.value = res.data.list
      total.value = res.data.total
      loading.value = false
    }
  } catch (error) {
    loading.value = false
    return error
  }
}

getTableData()
</script>

<style lang="scss" scoped>
.dept-manage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .table-box {
    margin-top: $margin;
    padding: 0 $padding;
  }
}
</style>
