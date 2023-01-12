<template>
  <div class="data-pane">
    <section class="gi_box pane-left">
      <GiHead title="数据分类(ZTree)"></GiHead>
      <TheCateTree placeholder="请输入搜索关键词" @node-click="pagination.onChange(1)"></TheCateTree>
    </section>
    <section class="gi_box pane-right">
      <GiHead title="数据列表"></GiHead>

      <div class="content">
        <a-row justify="space-between" style="margin-bottom: 12px">
          <a-space>
            <a-button type="primary" @click="onAdd">
              <template #icon><icon-plus /></template>
              <template #default>新增</template>
            </a-button>
            <a-button type="primary" status="danger" @click="onMulDelete">
              <template #icon><icon-delete /></template>
              <template #default>删除</template>
            </a-button>
            <a-button type="primary" status="success" @click="onExport">
              <template #icon><icon-export /></template>
              <template #default>导出</template>
            </a-button>
          </a-space>

          <a-space>
            <a-select v-model="form.status" placeholder="请选择" allow-clear class="gi_select_input">
              <a-option v-for="item in StatusList" :key="item.value" :value="item.value">{{ item.name }}</a-option>
            </a-select>
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

        <section class="table-box">
          <a-table
            row-key="id"
            size="small"
            :loading="loading"
            :bordered="{ cell: true }"
            :columns="columns"
            :data="tableData"
            :scroll="{ x: '100%', y: '100%', minWidth: 1000 }"
            :row-selection="{ type: 'checkbox', showCheckedAll: true }"
            :pagination="pagination"
            @select="select"
            @select-all="selectAll"
          >
            <template #index="{ rowIndex }">{{ rowIndex + 1 }}</template>
            <template #proportion="{ record }">
              <a-progress :status="getProportionColor(record.proportion)" :percent="record.proportion / 100" />
            </template>
            <template #status="{ record }">
              <template v-for="item in StatusList" :key="item.value">
                <a-tag size="small" v-if="item.value === record.status" :color="item.color">{{ item.name }}</a-tag>
              </template>
            </template>
            <template #operation="{ record }">
              <a-space>
                <a-button type="primary" size="mini" @click="onEdit(record)">修改</a-button>
                <a-button size="mini" @click="onDetail">详情</a-button>
                <a-popconfirm type="warning" content="您确定要删除该项吗?" @ok="onDelete(record.id)">
                  <a-button type="primary" status="danger" size="mini">删除</a-button>
                </a-popconfirm>
              </a-space>
            </template>
          </a-table>
        </section>
      </div>
    </section>

    <EditModal ref="EditModalRef"></EditModal>
  </div>
</template>

<script setup lang="ts" name="DataManage">
import { reactive, ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, Message } from '@arco-design/web-vue'
import type { TableColumnData, TableInstance } from '@arco-design/web-vue'
import { usePagination } from '@/hooks'
import TheCateTree from '@/views/components/TheCateTree/index.vue'
import EditModal from './EditModal.vue'
import { getPersonList } from '@/apis'
import type { PersonItem } from '@/apis'
import { StatusList } from '@/constant/person'

const router = useRouter()

const columns: TableColumnData[] = [
  {
    title: '序号',
    width: 68,
    slotName: 'index'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '比例',
    slotName: 'proportion',
    width: 200
  },
  {
    title: '状态',
    slotName: 'status',
    width: 100,
    align: 'center'
  },
  {
    title: '操作',
    slotName: 'operation',
    width: 200,
    align: 'center',
    fixed: 'right'
  }
]

const { pagination, setTotal } = usePagination(() => getTableData())

const form = reactive({
  name: '',
  status: ''
})

const tableData = ref<PersonItem[]>([])
const loading = ref(false)
const EditModalRef = ref<InstanceType<typeof EditModal>>()

// 比例进度条颜色
const getProportionColor = (proportion: number) => {
  if (proportion < 30) return 'danger'
  if (proportion < 60) return 'warning'
  return 'success'
}

const getTableData = async () => {
  loading.value = true
  const res = await getPersonList({
    current: pagination.current,
    pageSize: pagination.pageSize,
    ...form
  })
  if (res.success) {
    tableData.value = res.data.list
    setTotal(res.data.total)
    loading.value = false
  } else {
    loading.value = false
  }
}

onActivated(() => {
  getTableData()
})

// 批量删除
const onMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false,
    onOk: () => {
      tableData.value = []
    }
  })
}

const onAdd = () => {
  EditModalRef.value?.add()
}

const onEdit = (item: PersonItem) => {
  EditModalRef.value?.edit(item.id)
}

const onDetail = () => {
  router.push({ path: '/data/detail' })
}

const onDelete = (id: string) => {
  Message.success('删除成功')
  getTableData()
}

const onExport = () => {
  if (!selectRowKeys.value.length) {
    return Message.warning('请勾选数据')
  }
  Message.success('点击了导出')
}

// 勾选
const selectRowKeys = ref<(string | number)[]>([])

const select: TableInstance['onSelect'] = (rowKeys) => {
  selectRowKeys.value = rowKeys
}

// 全选
const selectAll: TableInstance['onSelectAll'] = (checked) => {
  selectRowKeys.value = checked ? tableData.value.map((i) => i.id) : []
}
</script>

<style lang="scss" scoped></style>
