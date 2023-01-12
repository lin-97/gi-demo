<template>
  <div class="role-manage">
    <a-row class="head">
      <a-button type="primary" @click="onAdd">
        <template #icon><icon-plus /></template>
        <span>新增角色</span>
      </a-button>
    </a-row>
    <section class="table-box">
      <a-table
        :data="roleList"
        row-key="id"
        :loading="loading"
        :scroll="{ x: '100%', y: '100%', minWidth: 900 }"
        :pagination="false"
      >
        <template #columns>
          <a-table-column title="序号" :width="60">
            <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
          </a-table-column>
          <a-table-column title="角色名称" data-index="name"></a-table-column>
          <a-table-column title="角色编号" data-index="roleCode"></a-table-column>
          <a-table-column title="状态" :width="100">
            <template #cell="{ record }">
              <a-tag v-if="record.status == 1" color="green">正常</a-tag>
              <a-tag v-else color="red">禁用</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="角色描述" data-index="description"></a-table-column>
          <a-table-column title="创建时间" data-index="createTime"></a-table-column>
          <a-table-column title="操作" :width="220" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="onDelete">
                  <a-button type="primary" status="danger" size="mini">
                    <template #icon><icon-delete /></template>
                  </a-button>
                </a-popconfirm>
                <a-button type="primary" size="mini" @click="onEdit(record)">
                  <template #icon><icon-edit /></template>
                </a-button>
                <a-button type="primary" status="success" size="mini">
                  <template #icon><icon-safe /></template>
                  <template #default>菜单权限</template>
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </section>

    <EditRoleModal ref="EditRoleModalRef"></EditRoleModal>
  </div>
</template>

<script setup lang="ts" name="RoleManage">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import EditRoleModal from './EditRoleModal.vue'
import { useApiRole } from '@/hooks'
import type { RoleItem } from '@/apis'

const loading = ref(false)
const EditRoleModalRef = ref<InstanceType<typeof EditRoleModal>>()
const { roleList } = useApiRole()

const onAdd = () => {
  EditRoleModalRef.value?.add()
}

const onEdit = (item: RoleItem) => {
  EditRoleModalRef.value?.edit(item.id)
}

const onDelete = () => {
  Message.info('点击了确认按钮')
}
</script>

<style lang="scss" scoped>
.role-manage {
  flex: 1;
  height: 100%;
  margin: $margin;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-1);
  overflow: hidden;
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
