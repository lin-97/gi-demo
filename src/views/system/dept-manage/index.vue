<template>
  <div class="dept-manage">
    <a-space :size="20" class="head">
      <a-space>
        <span>部门名称</span>
        <a-input v-model="form.name" placeholder="请输入部门名称" allow-clear style="width: 250px" />
      </a-space>
      <a-space>
        <span>状态</span>
        <a-select v-model="form.status" placeholder="部门状态" style="width: 120px">
          <a-option :value="1">正常</a-option>
          <a-option :value="0">禁用</a-option>
        </a-select>
      </a-space>
      <a-space>
        <a-button type="primary" @click="search">
          <template #icon><icon-search /></template>
          <span>搜索</span>
        </a-button>
        <a-button @click="reset">
          <template #icon><icon-sync /></template>
          <span>重置</span>
        </a-button>
      </a-space>
    </a-space>
    <a-row class="head">
      <a-button type="primary" @click="onAdd">
        <template #icon><icon-plus /></template>
        <span>新增部门</span>
      </a-button>
    </a-row>
    <section class="table-box">
      <a-table
        :loading="loading"
        ref="tableRef"
        row-key="id"
        :data="deptList"
        :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
        :pagination="false"
        :expandable="{ width: 80 }"
      >
        <template #expand-icon="{ expanded }">
          <IconDown v-if="expanded" />
          <IconRight v-else />
        </template>
        <template #columns>
          <a-table-column title="部门名称" data-index="name"></a-table-column>
          <a-table-column title="排序" data-index="sort" :width="100"></a-table-column>
          <a-table-column title="状态" :width="100">
            <template #cell="{ record }">
              <a-tag v-if="record.status == 1" color="green">正常</a-tag>
              <a-tag v-else color="red">禁用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="createTime" :width="200"></a-table-column>
          <a-table-column title="操作" :width="150" align="left">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                </a-button>
                <a-button v-if="record.parentId" type="primary" status="success" size="mini" @click="onAdd()">
                  <template #icon><icon-plus /></template>
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

    <EditDeptModal ref="EditDeptModalRef"></EditDeptModal>
  </div>
</template>

<script setup lang="ts" name="DeptManage">
import { ref, reactive } from 'vue'
import EditDeptModal from './EditDeptModal.vue'
import type { DeptItem } from '@/apis'
import { useApiDept } from '@/hooks'

const { deptList, getDeptList } = useApiDept()
const EditDeptModalRef = ref<InstanceType<typeof EditDeptModal>>()

const loading = ref(false)
const form = reactive({
  name: '',
  status: ''
})

const search = () => {
  getDeptList()
}

const reset = () => {
  form.name = ''
  form.status = ''
}

const onAdd = () => {
  EditDeptModalRef.value?.add()
}

const onEdit = (item: DeptItem) => {
  EditDeptModalRef.value?.edit(item.id)
}
</script>

<style lang="scss" scoped>
.dept-manage {
  flex: 1;
  height: 100%;
  margin: $margin;
  box-sizing: border-box;
  background: var(--color-bg-1);
  display: flex;
  flex-direction: column;
  .head {
    padding: 12px $padding 0;
  }
  .table-box {
    flex: 1;
    margin-top: 12px;
    padding: 0 $padding $padding;
    overflow: hidden;
  }
}
</style>
