<template>
  <div class="user-manage">
    <section class="left" v-loading="treeLoading">
      <a-tree
        show-line
        :data="treeData"
        :default-expand-all="true"
        block-node
        :field-names="{
          key: 'id',
          title: 'name',
          children: 'children'
        }"
        @select="getTableData"
      ></a-tree>
    </section>
    <section class="right">
      <GiTitle title="用户管理">
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
        >
          <template #columns>
            <a-table-column title="序号">
              <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
            </a-table-column>
            <a-table-column title="名称" data-index="nickName"></a-table-column>
            <a-table-column title="性别" data-index="sex">
              <template #cell="{ record }">
                <span v-if="record.sex === 1">男</span>
                <span v-else>女</span>
              </template>
            </a-table-column>
            <a-table-column title="头像" data-index="avatar">
              <template #cell>
                <GiSvgIcon name="avatar" :size="40"></GiSvgIcon>
              </template>
            </a-table-column>
            <a-table-column title="地址" data-index="address"></a-table-column>
            <a-table-column title="登录时间" data-index="lastLoginTime"></a-table-column>
            <a-table-column title="登录IP" data-index="lastLoginIp"></a-table-column>
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
    </section>
  </div>
</template>

<script setup lang="ts" name="UserManage">
import { ref, reactive } from 'vue'
import { getSystemDeptList, getSystemUserList } from '@/apis/system'
import GiSvgIcon from '../../../components/GiSvgIcon.vue'

let treeLoading = ref<boolean>(false)
const treeData = ref<object[]>([])

let loading = ref<boolean>(false)
const tableData = ref<object[]>([])
let total = ref<number>(0)

const getTreeData = async () => {
  try {
    treeLoading.value = true
    const res = await getSystemDeptList({})
    if (res.success) {
      treeData.value = res.data.list
      treeLoading.value = false
    }
  } catch (error) {
    treeLoading.value = false
    return error
  }
}
getTreeData()

const pageData: Pagination.PageData = reactive({
  pageCount: 1,
  pageSize: 500
})

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getSystemUserList({ ...pageData })
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
.user-manage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  background: var(--color-bg-2);
  > .left {
    flex: 1;
    min-width: 220px;
    height: 100%;
    flex-shrink: 0;
    border-right: 1px solid $border-color;
    padding: $padding;
    box-sizing: border-box;
    overflow: auto;
  }
  > .right {
    flex: 4;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .table-box {
      flex: 1;
      margin-top: $margin;
      margin-bottom: $margin;
      padding: 0 $padding;
      overflow: hidden;
    }
  }
}
</style>
