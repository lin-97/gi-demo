<template>
  <div class="gi_page role-manage">
    <a-card title="角色管理">
      <a-space wrap>
        <a-input v-model="form.name" placeholder="输入角色名搜索" allow-clear style="width: 250px">
          <template #prefix><icon-search /></template>
        </a-input>
        <a-select v-model="form.status" placeholder="角色状态" allow-clear style="width: 120px">
          <a-option :value="1">正常</a-option>
          <a-option :value="0">禁用</a-option>
        </a-select>
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>查询</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-refresh /></template>
          <span>重置</span>
        </a-button>
      </a-space>

      <a-row>
        <a-space wrap>
          <a-button type="primary" @click="onAdd">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
          <a-button type="primary" status="danger" @click="onMulDelete">
            <template #icon><icon-delete /></template>
            <span>删除</span>
          </a-button>
        </a-space>
      </a-row>

      <a-table
        style="margin-top: 8px"
        row-key="id"
        :data="roleList"
        :bordered="{ cell: true }"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
        :pagination="pagination"
        :row-selection="{ type: 'checkbox', showCheckedAll: false }"
        @select="select"
      >
        <template #columns>
          <a-table-column title="序号" :width="64">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="角色名称" data-index="name"></a-table-column>
          <a-table-column title="角色编号" data-index="code"></a-table-column>
          <a-table-column title="状态" :width="100" align="center">
            <template #cell="{ record }">
              <a-tag v-if="record.status == 1" color="green">正常</a-tag>
              <a-tag v-if="record.status == 0" color="red">禁用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="描述" data-index="description"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime"></a-table-column>
          <a-table-column title="操作" :width="280" align="center" :fixed="!isMobile() ? 'right' : undefined">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" :disabled="record.disabled" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                  <span>编辑</span>
                </a-button>
                <a-button
                  type="primary"
                  status="success"
                  size="mini"
                  :disabled="record.disabled"
                  @click="onPerm(record)"
                >
                  <template #icon><icon-safe /></template>
                  <template #default>分配权限</template>
                </a-button>
                <a-popconfirm type="warning" content="确定删除该角色吗?" @ok="onDelete">
                  <a-button type="primary" status="danger" size="mini" :disabled="record.disabled">
                    <template #icon><icon-delete /></template>
                    <span>删除</span>
                  </a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <AddRoleModal ref="AddRoleModalRef"></AddRoleModal>
      <PermModal ref="PermModalRef"></PermModal>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { Message, type TableInstance } from '@arco-design/web-vue'
import AddRoleModal from './AddRoleModal.vue'
import PermModal from './PermModal.vue'
import type { RoleItem } from '@/apis'
import { usePagination } from '@/hooks'
import { getSystemRoleList } from '@/apis'
import { isMobile } from '@/utils'

defineOptions({ name: 'SystemRole' })

const AddRoleModalRef = ref<InstanceType<typeof AddRoleModal>>()
const PermModalRef = ref<InstanceType<typeof PermModal>>()

const form = reactive({
  name: '',
  status: ''
})

const { pagination, setTotal } = usePagination(() => {
  getRoleList()
})

const loading = ref(false)
const roleList = ref<RoleItem[]>([])
const getRoleList = async () => {
  try {
    loading.value = true
    const res = await getSystemRoleList()
    roleList.value = res.data.records
    setTotal(res.data.total)
  } catch (error) {
  } finally {
    loading.value = false
  }
}
getRoleList()

const search = () => {
  pagination.onChange(1)
}

const reset = () => {
  form.status = ''
  form.status = ''
  pagination.onChange(1)
}

const onAdd = () => {
  AddRoleModalRef.value?.add()
}

const onEdit = (item: RoleItem) => {
  AddRoleModalRef.value?.edit(item.id)
}

const onDelete = () => {
  Message.info('点击了确认按钮')
}

const onPerm = (item: RoleItem) => {
  PermModalRef.value?.open({ code: item.code, title: item.name })
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])
const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}
const onMulDelete = () => {
  if (!selectRowKeys.value.length) {
    return Message.warning('请选择角色')
  }
  Message.info('点击了批量删除')
}
</script>

<style lang="scss" scoped></style>
