<template>
  <div class="user-manage">
    <section class="left">
      <GiTitle title="部门列表"></GiTitle>

      <div class="content">
        <a-input v-model="treeInputValue" placeholder="请输入搜索关键词" allow-clear style="margin-bottom: 10px">
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
        <div class="tree-box" v-loading="treeLoading">
          <a-tree
            ref="treeRef"
            block-node
            default-expand-all
            :data="treeData"
            :field-names="{
              key: 'id',
              title: 'name',
              children: 'children'
            }"
            @select="getTableData"
          >
            <template #switcher-icon>
              <IconDown />
            </template>
            <template #icon="{ node }">
              <GiSvgIcon name="com-dept" :size="14" v-if="node.level == 1"></GiSvgIcon>
              <GiSvgIcon name="com-sub-dept" :size="12" v-if="node.level == 2"></GiSvgIcon>
              <GiSvgIcon name="com-group" :size="12" v-if="node.level == 3"></GiSvgIcon>
            </template>
          </a-tree>
        </div>
      </div>
    </section>
    <section class="right">
      <GiTitle title="用户列表"></GiTitle>

      <a-row justify="space-between" class="head">
        <a-space>
          <a-button type="primary" @click="showAddUserModal = true">
            <template #icon><icon-plus /></template>
            <span>新增用户</span>
          </a-button>

          <a-input-group>
            <a-select placeholder="部门状态" allow-clear style="width: 120px">
              <a-option :value="1">正常</a-option>
              <a-option :value="0">禁用</a-option>
            </a-select>
            <a-input placeholder="请输入关键词..." allow-clear style="width: 250px"> </a-input>
            <a-button type="primary" @click="getTableData">
              <template #icon><icon-search /></template>
              <span>搜索</span>
            </a-button>
          </a-input-group>
        </a-space>

        <a-button type="primary" status="danger">
          <template #icon><icon-delete /></template>
        </a-button>
      </a-row>
      <section class="table-box">
        <a-table
          row-key="id"
          v-loading="loading"
          :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
          :pagination="{ showPageSize: true, total: total, current: current, pageSize: pageSize }"
          @page-change="changeCurrent"
          @page-size-change="changePageSize"
        >
          <template #columns>
            <a-table-column title="用户编号" data-index="userNo"></a-table-column>
            <a-table-column title="用户名" data-index="userName"></a-table-column>
            <a-table-column title="用户昵称" data-index="nickName"></a-table-column>
            <a-table-column title="性别" data-index="sex">
              <template #cell="{ record }">
                <span v-if="record.sex === 1">男</span>
                <span v-else>女</span>
              </template>
            </a-table-column>
            <a-table-column title="头像" data-index="avatar">
              <template #cell="{ record }">
                <GiSvgIcon name="avatar-man" :size="40" v-if="record.sex === 1"></GiSvgIcon>
                <GiSvgIcon name="avatar-woman" :size="40" v-else></GiSvgIcon>
              </template>
            </a-table-column>
            <a-table-column title="地址" data-index="address"></a-table-column>
            <a-table-column title="状态" :width="100">
              <template #cell="{ record }">
                <a-tag v-if="record.status == 1" color="green">正常</a-tag>
                <a-tag v-else color="red">禁用</a-tag>
              </template>
            </a-table-column>
            <a-table-column title="创建时间" data-index="createTime"></a-table-column>
            <a-table-column title="操作" :width="100" align="center">
              <template #cell="{ record }">
                <a-space>
                  <a-button type="primary" size="mini" @click="showAddUserModal = true">
                    <template #icon><icon-edit /></template>
                  </a-button>
                  <a-popconfirm type="warning" content="您确定要删除该项吗?">
                    <a-button type="primary" status="danger" size="mini">
                      <template #icon><icon-delete /></template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </section>
    </section>

    <AddUserModal v-model="showAddUserModal"></AddUserModal>
  </div>
</template>

<script setup lang="ts" name="UserManage">
import { ref, nextTick } from 'vue'
import { usePagination } from '@/hooks'
import { getSystemDeptList, getSystemUserList } from '@/apis'
import type { ApiUserItem, ApiDeptItem } from '@/apis'
import AddUserModal from './AddUserModal.vue'

const treeLoading = ref(false)
const treeData = ref<ApiDeptItem[]>([])
const treeInputValue = ref('')
const treeRef = ref(null)
const showAddUserModal = ref(false)

const loading = ref(false)
const tableData = ref<ApiUserItem[]>([])

const { current, pageSize, total, changeCurrent, changePageSize, setTotal } = usePagination(() => {
  getTableData()
})

const getTreeData = async () => {
  try {
    treeLoading.value = true
    const res = await getSystemDeptList()
    if (res.success) {
      treeData.value = res.data.list
      setTimeout(() => {
        treeLoading.value = false
      }, 200)
      nextTick(() => {
        treeRef.value?.expandNode(res.data.list[0].id)
      })
    }
  } catch (error) {
    treeLoading.value = false
    return error
  }
}
getTreeData()

const getTableData = async () => {
  try {
    loading.value = true
    const res = await getSystemUserList()
    if (res.success) {
      tableData.value = res.data.list
      setTotal(res.data.total)
    }
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}
getTableData()
</script>

<style lang="scss" scoped>
.user-manage {
  flex: 1;
  height: 100%;
  margin: $margin;
  box-sizing: border-box;
  display: flex;
  background: var(--color-bg-1);
  overflow: hidden;
  > .left {
    flex: 1;
    min-width: 250px;
    height: 100%;
    flex-shrink: 0;
    border-right: 1px dashed $color-border;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      padding: $padding;
      padding-top: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .tree-box {
      flex: 1;
      overflow: auto;
      padding-left: 4px;
    }
  }
  > .right {
    flex: 4;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .head {
      padding: $margin $padding 0;
    }
    .table-box {
      flex: 1;
      margin-top: $margin;
      margin-bottom: $padding;
      padding: 0 $padding;
      overflow: hidden;
    }
  }
}
</style>
