<template>
  <div class="gi_padding">
    <a-alert>此示例基于GiEditTable实现了行编辑，以及行双击编辑</a-alert>

    <a-row class="gi_mt" justify="end">
      <a-space wrap>
        <a-button type="primary" @click="addTableRow">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </a-space>
    </a-row>

    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"
      :cell-disabled="cellDisabled" @tr-dblclick="customRowDblclick" @row-dblclick="rowDblclick">
      <template #action="{ rowIndex }">
        <a-space>
          <a-button v-if="rowIndex !== currentRowIndex" type="primary" size="mini" @click="onEdit(rowIndex)">
            编辑
          </a-button>
          <a-button v-else type="primary" status="success" size="mini" @click="onSave()">保存</a-button>
          <a-button type="primary" status="danger" size="mini" @click="onDelete(rowIndex)">
            删除
          </a-button>
        </a-space>
      </template>
    </gi-edit-table>

    <a-row justify="end" class="gi_mt">
      <a-space wrap>
        <a-button @click="reset">重置</a-button>
        <a-button type="primary" @click="submit">验证并提交</a-button>
      </a-space>
    </a-row>
    <GiCodeView :code-json="tableDataJson"></GiCodeView>
  </div>
</template>

<script lang='tsx' setup>
import { Message } from '@arco-design/web-vue'
import type { ColumnItem, Disabled } from '@/components/GiEditTable'
import * as Regexp from '@/utils/regexp'
import { useDict } from '@/hooks/app'

defineOptions({ name: 'FormTable' })

const { data: status_options } = useDict({ code: 'status' })

const currentRowIndex = ref(-1) // 当前编辑的行

type DataItem = { name: string, phone: string, address: string, rate: number, status: 1 | 0, num: number }
const data = ref<DataItem[]>([{ name: '张三', phone: '', address: '广州市', rate: 3, status: 0, num: 0 }])
const tableDataJson = computed(() => {
  return JSON.stringify(data.value, null, '\t')
})
const GiEditTableRef = useTemplateRef('GiEditTableRef')

const columns = computed<ColumnItem[]>(() => [
  {
    type: 'input',
    title: '姓名',
    dataIndex: 'name',
    required: true
  },
  {
    type: 'input',
    title: '手机号',
    dataIndex: 'phone',
    required: true,
    rules: [{ match: Regexp.Phone, message: '手机号格式不正确' }]
  },
  {
    type: 'select',
    title: '状态',
    dataIndex: 'status',
    props: {
      options: status_options.value
    }
  },
  {
    type: 'rate',
    title: '评分',
    dataIndex: 'rate',
    columnProps: {
      width: 200
    }
  },
  {
    type: 'input-number',
    title: '小数',
    dataIndex: 'num',
    columnProps: {
      width: 120
    }
  },
  {
    type: 'textarea',
    title: '地址',
    dataIndex: 'address',
    props: {
      autoSize: true,
      maxLength: 200,
      showWordLimit: true
    },
    columnProps: {
      width: 250
    }
  },
  {
    type: '',
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    columnProps: {
      width: 140,
      align: 'center',
      fixed: 'right'
    },
    formItemProps: {
      contentClass: 'arco-table-cell-align-center'
    }
  }
])

const addTableRow = () => {
  data.value.push({ name: '', phone: '', address: '', rate: 0, status: 0, num: 0 })
}

// 行双击 GiEditTable自定义的双击事件，参数有rowIndex
const customRowDblclick = (e: { rowIndex: number }) => {
  currentRowIndex.value = e.rowIndex
  Message.success('GiEditTable自定义的双击事件，参数有rowIndex')
}

// 行双击
const rowDblclick = () => {
  Message.info('Arco表格原生自带双击事件')
}

const onEdit = (index: number) => {
  currentRowIndex.value = index
}

const onSave = () => {
  currentRowIndex.value = -1
}

const onDelete = (index: number) => {
  data.value.splice(index, 1)
}

const reset = () => {
  GiEditTableRef.value?.formRef?.resetFields()
  GiEditTableRef.value?.formRef?.clearValidate()
}

const submit = async () => {
  const valid = await GiEditTableRef.value?.formRef?.validate()
  if (valid) {
    const arr = Object.values(valid)
    Message.warning(arr[0].message)
    return
  }
  Message.success('验证通过~')
}

const cellDisabled: Disabled<DataItem> = ({ rowIndex }) => {
  if (currentRowIndex.value === rowIndex) return false
  return true
}
</script>

<style lang='scss' scoped></style>
