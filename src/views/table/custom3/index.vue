<template>
  <GiPageLayout margin>
    <a-alert class="g-mb">
      <div>GiTableSetting 组件主要是为了在不需要二封a-table组件的情况下，提供表格的工具栏和列设置功能</div>
      <template #action>
        <GiCodeButton :code="CodeJson" />
      </template>
    </a-alert>

    <GiTableSetting title="会员列表" :columns="columns" :disabled-column-keys="['序号', 'name']" @refresh="getTableData"
      @export="onExport">
      <template #default="{ settingColumns, tableProps }">
        <a-table row-key="id" v-bind="tableProps" :loading="loading" :columns="settingColumns" :data="tableData"
          :scroll="{ x: '100%', y: '100%', minWidth: 1300 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
          :pagination="pagination">
          <template #action="{ record }">
            <a-space>
              <a-button type="primary" size="mini">修改</a-button>
              <a-button size="mini">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table>
      </template>
    </GiTableSetting>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { TableInstance } from '@arco-design/web-vue'
import type * as T from '@/apis/person'
import { Message } from '@arco-design/web-vue'
import { baseAPI } from '@/apis/person'
import { GiCellAvatar, GiCellGender, GiCellStatus } from '@/components/GiCell'
import { useTable } from '@/hooks'
import CodeJson from './index.vue?raw'

defineOptions({ name: 'TableCustom3' })

const columns: TableInstance['columns'] = [
  { title: '序号', width: 66, align: 'center', render: ({ rowIndex }) => h('span', {}, rowIndex + 1) },
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
    render: ({ record }) =>
      h(GiCellAvatar, {
        isLink: true,
        avatar: record.avatar,
        name: record.name,
        onClick: () => onClickName(record as T.ListItem)
      })
  },
  { title: '手机号', dataIndex: 'phone', width: 150 },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 100,
    align: 'center',
    render: ({ record }) => h(GiCellGender, { gender: record.gender })
  },
  { title: '账户', dataIndex: 'account', width: 120 },
  {
    title: '状态',
    width: 100,
    align: 'center',
    render: ({ record }) => h(GiCellStatus, { status: record.status })
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    ellipsis: true,
    tooltip: true,
    sortable: {
      sortDirections: ['ascend', 'descend']
    }
  },
  { title: '地址', dataIndex: 'address', ellipsis: true, tooltip: true },
  { title: '操作', width: 200, slotName: 'action', align: 'center', fixed: 'right' }
]

const { tableData, getTableData, pagination, loading, onDelete } = useTable({
  listAPI: (p) => baseAPI.getList(p),
  deleteAPI: (ids) => baseAPI.delete({ ids }),
  immediate: true
})

function onClickName(record: T.ListItem) {
  Message.success(`点击了${record.name}`)
}

function onExport() {
  Message.success('点击了导出')
}
</script>

<style lang="scss" scoped></style>
