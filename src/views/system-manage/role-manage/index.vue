<template>
  <div class="role-manage">
    <a-row class="head">
      <a-button type="primary" @click="showAddRoleModal = true">
        <template #icon><icon-plus /></template>新增角色
      </a-button>
    </a-row>
    <section class="table-box">
      <a-table
        :data="tableData"
        v-loading="loading"
        :scroll="{ x: '100%', y: '100%' }"
        :pagination="{ 'show-page-size': true }"
      >
        <template #columns>
          <a-table-column title="序号">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="角色名称" data-index="name"></a-table-column>
          <a-table-column title="角色编号" data-index="roleCode"></a-table-column>
          <a-table-column title="角色描述" data-index="description"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime"></a-table-column>
          <a-table-column title="操作" width="100">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary">
                  <template #icon><icon-edit /></template>
                </a-button>
                <a-button type="primary" status="danger">
                  <template #icon><icon-delete /></template>
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>

    <AddRoleModal v-model="showAddRoleModal"></AddRoleModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AddRoleModal from './AddRoleModal.vue'
import { getSystemRoleList } from '@/apis/system'

let loading = ref<boolean>(false)
const tableData = ref<object[]>([])
let total = ref<number>(0)
let showAddRoleModal = ref<boolean>(false)

const pageData: Pagination.PageData = reactive({
  pageCount: 1,
  pageSize: 500
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getSystemRoleList({ ...pageData })
    if (res.success) {
      tableData.value = res.data.list
      total.value = res.data.total
      loading.value = false
    }
  } catch (error) {
    return error
  }
}
getTableData()
</script>

<style lang="scss" scoped>
.role-manage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-2);
  .head {
    padding: $padding $padding 0;
  }
  .table-box {
    flex: 1;
    margin-top: $margin;
    padding: 0 $padding $padding;
    overflow: hidden;
  }
}
</style>
