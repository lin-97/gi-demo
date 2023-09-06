<template>
  <div class="user-manage">
    <a-card title="部门列表" :bordered="false" class="gi_card left">
      <div class="content">
        <a-input v-model="treeInputValue" placeholder="输入部门名称搜索" allow-clear style="margin-bottom: 10px">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-spin class="tree-box" :loading="treeLoading">
          <a-tree
            ref="TreeRef"
            block-node
            show-line
            default-expand-all
            :data="deptList"
            :field-names="{
              key: 'id',
              title: 'name',
              children: 'children'
            }"
            @select="search"
          >
          </a-tree>
        </a-spin>
      </div>
    </a-card>

    <a-card title="用户列表" :bordered="false" class="gi_card right">
      <a-row justify="space-between">
        <a-space>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>

          <a-button type="primary" status="danger">
            <template #icon><icon-delete /></template>
            <span>删除</span>
          </a-button>
        </a-space>

        <a-space>
          <a-input-group>
            <a-select v-model="form.status" placeholder="用户状态" allow-clear style="width: 120px">
              <a-option :value="1">正常</a-option>
              <a-option :value="0">禁用</a-option>
            </a-select>
            <a-input v-model="form.username" placeholder="输入用户名搜索" allow-clear style="width: 250px"> </a-input>
          </a-input-group>
          <a-button type="primary" @click="search">
            <template #icon><icon-search /></template>
            <span>查询</span>
          </a-button>
          <a-button @click="reset">
            <template #icon><icon-refresh /></template>
            <span>重置</span>
          </a-button>
        </a-space>
      </a-row>

      <section class="gi_table_box table-box">
        <a-table
          row-key="id"
          :loading="loading"
          :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 1200 }"
          :pagination="pagination"
        >
          <template #columns>
            <a-table-column title="ID" data-index="id"></a-table-column>
            <a-table-column title="用户名" data-index="username" :width="120">
              <template #cell="{ record }">
                <a-link>{{ record.username }}</a-link>
              </template>
            </a-table-column>
            <a-table-column title="昵称" data-index="nickname" :width="150"></a-table-column>
            <a-table-column title="性别" data-index="gender" :width="80">
              <template #cell="{ record }">{{ record.gender === 1 ? '男' : '女' }}</template>
            </a-table-column>
            <a-table-column title="头像" data-index="avatar" :width="100">
              <template #cell="{ record }">
                <a-avatar>
                  <img alt="avatar" :src="record.avatar" />
                </a-avatar>
              </template>
            </a-table-column>
            <a-table-column title="联系方式" data-index="email" :width="180"></a-table-column>
            <a-table-column title="状态" :width="100">
              <template #cell="{ record }">
                <a-tag v-if="record.status == 1" color="green">正常</a-tag>
                <a-tag v-else color="red">禁用</a-tag>
              </template>
            </a-table-column>
            <a-table-column title="类型" :width="100">
              <template #cell="{ record }">
                <a-tag v-if="record.type === 1" color="red">系统内置</a-tag>
                <a-tag v-if="record.type === 2" color="orange">自定义</a-tag>
              </template>
            </a-table-column>
            <a-table-column title="创建时间" data-index="createTime" :width="200"></a-table-column>
            <a-table-column title="操作" :width="100" align="center" fixed="right">
              <template #cell="{ record }">
                <a-space>
                  <a-button type="primary" size="mini" @click="onEdit(record)">
                    <template #icon><icon-edit /></template>
                  </a-button>
                  <a-popconfirm type="warning" content="确定删除该用户吗?">
                    <a-button type="primary" status="danger" size="mini" :disabled="record.disabled">
                      <template #icon><icon-delete /></template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </section>
    </a-card>

    <AddUserModal ref="AddUserModalRef"></AddUserModal>
  </div>
</template>

<script setup lang="ts">
import { usePagination } from '@/hooks'
import { useDept } from '@/hooks/app'
import { getSystemUserList } from '@/apis'
import type { UserItem } from '@/apis'
import AddUserModal from './AddUserModal.vue'
import type { TreeInstance } from '@arco-design/web-vue'

defineOptions({ name: 'SystemUser' })

const TreeRef = ref<TreeInstance>()
const AddUserModalRef = ref<InstanceType<typeof AddUserModal>>()

const treeLoading = ref(false)
const treeInputValue = ref('')
const loading = ref(false)
const tableData = ref<UserItem[]>([])

const { pagination, setTotal } = usePagination(() => {
  getUserList()
})

const { deptList, getDeptList } = useDept()
getDeptList()

nextTick(() => {
  setTimeout(() => {
    TreeRef.value?.expandAll(true)
  }, 300)
})

const onAdd = () => {
  AddUserModalRef.value?.add()
}

const onEdit = (item: UserItem) => {
  AddUserModalRef.value?.edit(item.id)
}

const form = reactive({ status: '', username: '' })
const getUserList = async () => {
  loading.value = true
  const res = await getSystemUserList()
  if (res.success) {
    tableData.value = res.data.list
    setTotal(res.data.total)
    loading.value = false
  } else {
    loading.value = false
  }
}
getUserList()

const search = () => {
  pagination.onChange(1)
}

const reset = () => {
  form.status = ''
  form.username = ''
  pagination.onChange(1)
}
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
    .content {
      flex: 1;
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
    .table-box {
      margin-top: $margin;
    }
  }
}
</style>
