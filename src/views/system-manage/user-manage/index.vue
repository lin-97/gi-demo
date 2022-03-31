<template>
  <div class="user-manage">
    <section class="left" v-loading="treeLoading">
      <a-input v-model="treeInputValue" allow-clear style="margin-bottom: 10px">
        <template #prefix>
          <icon-search />
        </template>
      </a-input>
      <div class="tree-box">
        <a-tree
          ref="treeRef"
          show-line
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
          <template #icon="{ node }">
            <GiSvgIcon name="com-dept" :size="14" v-if="node.level == 1"></GiSvgIcon>
            <GiSvgIcon name="com-sub-dept" :size="14" v-if="node.level == 2"></GiSvgIcon>
            <GiSvgIcon name="com-group" :size="14" v-if="node.level == 3"></GiSvgIcon>
          </template>
        </a-tree>
      </div>
    </section>
    <section class="right">
      <a-row justify="space-between" class="head">
        <a-space>
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            新增用户
          </a-button>

          <a-input-group>
            <a-input placeholder="请输入关键词..." allow-clear style="width: 250px"> </a-input>
            <a-button type="primary" @click="getTableData"><icon-search /> 搜索</a-button>
          </a-input-group>
        </a-space>

        <a-button type="primary" status="danger">
          <template #icon>
            <icon-delete />
          </template>
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
import { ref, reactive, nextTick } from 'vue'
import { getSystemDeptList, getSystemUserList } from '@/apis/system'
import GiSvgIcon from '../../../components/GiSvgIcon.vue'

let treeLoading = ref<boolean>(false)
const treeData = ref<object[]>([])
let treeInputValue = ref<string>('')
const treeRef = ref<HTMLInputElement | null>(null)

let loading = ref<boolean>(false)
const tableData = ref<object[]>([])
let total = ref<number>(0)

const getTreeData = async () => {
  try {
    treeLoading.value = true
    const res = await getSystemDeptList()
    if (res.success) {
      treeData.value = res.data.list
      treeLoading.value = false
      nextTick(() => {
        treeRef.value.expandNode(res.data.list[0].id)
      })
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tree-box {
      flex: 1;
      overflow: auto;
    }
  }
  > .right {
    flex: 5;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .head {
      padding: $padding $padding 0;
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
