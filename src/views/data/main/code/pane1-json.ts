export default `
<template>
  <GiPageLayout>
    <template #left>
      <CateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></CateTree>
    </template>

    <a-row justify="space-between">
      <a-space wrap>
        <a-button type="primary" @click="onAdd">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" status="danger" @click="onMulDelete">
          <template #icon><icon-delete /></template>
          <template #default>删除</template>
        </a-button>
        <a-button type="primary" status="success" @click="onExport">
          <template #icon><icon-export /></template>
        </a-button>
        <a-button type="primary" status="warning" @click="onViewCode">
          <template #icon><icon-code /></template>
        </a-button>
      </a-space>

      <a-space wrap>
        <a-select v-model="form.status" class="gi_select_input" :options="options" placeholder="请选择"
          allow-clear></a-select>
        <a-input-group>
          <a-input v-model="form.name" placeholder="请输入搜索关键词" allow-clear> </a-input>
          <a-button type="primary" @click="getTableData">
            <icon-search />
          </a-button>
        </a-input-group>
        <a-button type="primary" @click="getTableData">
          <template #icon><icon-refresh /></template>
        </a-button>
      </a-space>
    </a-row>

    <a-table class="gi_table" row-key="id" :loading="loading" :bordered="{ cell: true }" :data="tableData"
      :scroll="{ x: '100%', y: '100%', minWidth: 1000 }" :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      :pagination="pagination" :selected-keys="selectedKeys" @select="select" @select-all="selectAll">
      <template #columns>
        <a-table-column title="序号" :width="68">
          <template #cell="cell">{{ cell.rowIndex + 1 }}</template>
        </a-table-column>
        <a-table-column title="姓名" data-index="name"></a-table-column>
        <a-table-column title="地址" data-index="address" ellipsis tooltip></a-table-column>
        <a-table-column title="比例" :width="200">
          <template #cell="{ record }">
            <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />
          </template>
        </a-table-column>
        <a-table-column title="状态" :width="100" align="center">
          <template #cell="{ record }">
            <GiCellStatus :status="record.status"></GiCellStatus>
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createTime" :width="180"></a-table-column>
        <a-table-column title="操作" :width="200" align="center" :fixed="fixed">
          <template #cell="{ record }">
            <a-space>
              <a-button type="primary" size="mini" @click="onEdit">修改</a-button>
              <a-button size="mini" @click="onDetail(record)">详情</a-button>
              <a-popconfirm type="warning" content="您确定要删除该项吗?" @before-ok="onDelete(record)">
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
import { Drawer, Message } from '@arco-design/web-vue'
import { useWindowSize } from '@vueuse/core'
import CateTree from './CateTree/index.vue'
import Pane1Json from './code/pane1-json'
import { useTable } from '@/hooks'
import { type PersonItem, deletePerson, getPersonList } from '@/apis/person'
import { useDict } from '@/hooks/app'
import GiCodeView from '@/components/GiCodeView/index.vue'

const { width } = useWindowSize()
const router = useRouter()

const { data: options } = useDict({ code: 'status' })
const form = reactive({
  name: '',
  status: ''
})

// 这里使用了表格hooks：useTable, 节省了大量代码
const { loading, tableData, getTableData, pagination, selectedKeys, select, selectAll, handleDelete, fixed } = useTable(
  (page) => getPersonList({ ...form, ...page }),
  { immediate: false, formatResult: (data) => data.map((i) => ({ ...i, isEdit: false })) }
)

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

onActivated(() => {
  getTableData()
})

const onAdd = () => {
  router.push({ path: '/data/form' })
}

const onEdit = () => {
  router.push({ path: '/data/form', query: { id: 'ID123456' } })
}

const onDetail = (item: PersonItem) => {
  router.push({ name: 'DataDetailId', params: { id: item.id } })
}

// 删除
const onDelete = (item: PersonItem) => {
  return handleDelete(() => deletePerson({ ids: [item.id] }), { content: \`是否删除-\${item.name}?\`, showModal: false })
}

// 批量删除
const onMulDelete = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请选择删除项！')
  }
  handleDelete(() => deletePerson({ ids: selectedKeys.value as string[] }), { successTip: '批量删除成功！' })
}

const onExport = () => {
  if (!selectedKeys.value.length) {
    return Message.warning('请勾选数据')
  }
  Message.success('点击了导出')
}

const onViewCode = () => {
  Drawer.open({
    title: '查看代码',
    content: () => h(GiCodeView, { codeJson: Pane1Json, type: 'vue' }),
    width: width.value < 500 ? '100%' : 800
  })
}
</script>

<style lang="scss" scoped></style>

`
