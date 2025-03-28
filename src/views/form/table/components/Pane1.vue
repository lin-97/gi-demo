<template>
  <div class="gi_padding">
    <a-row justify="end">
      <a-space wrap>
        <a-button type="primary" :status="isReadOnly ? 'success' : 'warning'" @click="toggleReadOnly">
          {{ isReadOnly ? '编辑' : '只读' }}
        </a-button>
        <a-button type="primary" @click="addTableRow">
          <template #icon><icon-plus /></template>
          <span>新增</span>
        </a-button>
      </a-space>
    </a-row>

    <gi-edit-table ref="GiEditTableRef" :scroll="{ minWidth: 1200 }" :columns="columns" :data="data"
      :cell-disabled="cellDisabled">
      <template #action="{ rowIndex }">
        <a-space>
          <a-button type="primary" status="danger" size="mini" :disabled="rowIndex === 0" @click="onDelete(rowIndex)">
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
import FilterAddress from './FilterAddress.vue'
import type { ColumnItem, Disabled } from '@/components/GiEditTable'
import * as Regexp from '@/utils/regexp'
import { useDict } from '@/hooks/app'

defineOptions({ name: 'FormTable' })

const { data: status_options } = useDict({ code: 'status' })

const isReadOnly = ref(false)

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
      width: 250,
      title: () => (
        <a-space>
          <span>地址 </span>
          <FilterAddress onConfirm={(value: string) => {
            Message.success(`点击了确认，查询值为: ${value || '空'}`)
          }}
          >
          </FilterAddress>
        </a-space>
      )
    }
  },
  {
    type: '',
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    columnProps: {
      width: 100,
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

const onDelete = (index: number) => {
  data.value.splice(index, 1)
}

const toggleReadOnly = () => {
  isReadOnly.value = !isReadOnly.value
  if (isReadOnly.value) {
    GiEditTableRef.value?.formRef?.clearValidate()
  }
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

const cellDisabled: Disabled<DataItem> = ({ rowIndex, col }) => {
  if (isReadOnly.value) return true
  if (col.dataIndex === 'name' && rowIndex === 0) return true
  return false
}
</script>

<style lang='scss' scoped></style>
