<template>
  <div class="dept-manage">
    <a-row class="head">
      <a-button type="primary" @click="showAddDeptModal = true">
        <template #icon><icon-plus /></template>
        <span>新增部门</span>
      </a-button>
    </a-row>
    <section class="table-box">
      <a-table
        :data="tableData"
        row-key="id"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 800 }"
        :pagination="{ 'show-page-size': true }"
        :expandable="{ width: 80 }"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
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
          <a-table-column title="操作" width="100">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" @click="showAddDeptModal = true">
                  <template #icon><icon-edit /></template>
                </a-button>
                <a-popconfirm content="您确定要删除该项吗?">
                  <a-button type="primary" status="danger">
                    <template #icon><icon-delete /></template>
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>

    <AddDeptModal :tree-data="tableData" v-model="showAddDeptModal"></AddDeptModal>
  </div>
</template>

<script setup lang="ts" name="DeptManage">
import { ref, reactive } from 'vue'
import AddDeptModal from './AddDeptModal.vue'
import { getSystemDeptList } from '@/apis/system'

const tableData = ref<object[]>([])
let total = ref<number>(0)
let loading = ref<boolean>(false)
let showAddDeptModal = ref<boolean>(false)

const pageData: Pagination.PageData = reactive({
  pageCount: 1,
  pageSize: 1000
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getSystemDeptList()
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
  flex: 1;
  height: 100%;
  margin: $margin;
  box-sizing: border-box;
  background: var(--color-bg-2);
  display: flex;
  flex-direction: column;
  .head {
    padding: $padding $padding 0;
  }
  .table-box {
    flex: 1;
    margin-top: 12px;
    padding: 0 $padding $padding;
    overflow: hidden;
  }
}
</style>
