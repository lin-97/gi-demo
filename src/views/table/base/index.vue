<template>
  <GiPageLayout>
    <GiForm v-model="form" :columns="columns" search hide-fold-btn :suffix="false"
      :grid-item-props="{ span: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, xxl: 6 } }" @search="search" @reset="search">
    </GiForm>

    <a-table class="gi_full_table" row-key="id" page-position="bottom" :bordered="{ cell: true }" :loading="loading"
      :data="tableData" :scroll="{ x: '100%', y: '100%', minWidth: 1400 }" :pagination="pagination">
      <template #columns>
        <a-table-column title="序号" :width="66" align="center">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name" :width="120">
          <template #cell="{ record }">
            <GiCellAvatar :avatar="record.avatar" :name="record.name"></GiCellAvatar>
          </template>
        </a-table-column>
        <a-table-column title="账户" data-index="account" :width="120"></a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="手机号" data-index="phone" :width="150"></a-table-column>
        <a-table-column title="性别" data-index="gender" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellGender :gender="record.gender"></GiCellGender>
          </template>
        </a-table-column>
        <a-table-column title="爱好" data-index="hobbys">
          <template #cell="{ record }">
            <GiCellTags :data="record.hobbys"></GiCellTags>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createTime" :width="180"
          :sortable="{ sortDirections: ['ascend', 'descend'] }"></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="操作" :width="200" align="center" fixed="right">
          <template #cell>
            <a-space>
              <a-button type="primary" size="mini">编辑</a-button>
              <a-button size="mini">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete">
                <a-button type="primary" status="danger" size="mini">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </GiPageLayout>
</template>

<script setup lang="ts">
import type { PopconfirmInstance } from '@arco-design/web-vue'
import { useTable } from '@/hooks'
import { getPersonList } from '@/apis/person'
import type { ColumnItem } from '@/components/GiForm'

defineOptions({ name: 'TableBase' })

const form = reactive({})

const columns: ColumnItem[] = reactive([
  {
    type: 'input',
    label: '姓名',
    field: 'name'
  },
  {
    type: 'input',
    label: '手机',
    field: 'phone',
    props: {
      maxLength: 11
    }
  }
])

const { tableData, pagination, search, loading } = useTable((p) => getPersonList(p))

const onDelete: PopconfirmInstance['onBeforeOk'] = () => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 300))
}
</script>

<style lang="scss" scoped></style>
