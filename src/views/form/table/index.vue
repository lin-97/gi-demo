<template>
  <div class="gi_page form-table">
    <a-card title="编辑表格">
      <a-row justify="end">
        <a-space wrap>
          <a-button type="primary" @click="addTableRow">新增</a-button>
        </a-space>
      </a-row>

      <a-form ref="formRef" :model="form">
        <a-table :columns="columns" :data="form.tableData" :bordered="{ cell: true }" :pagination="false">
          <template #name="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].name`" :label-col-style="{ display: 'none' }"
              :rules="[{ required: true, message: '请输入姓名' }]">
              <a-input v-model="record.name" placeholder="请输入姓名" allow-clear />
            </a-form-item>
          </template>
          <template #phone="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].phone`" :label-col-style="{ display: 'none' }"
              :rules="[{ required: true, message: '请输入手机号' }]">
              <a-input v-model="record.phone" placeholder="请输入手机号" allow-clear />
            </a-form-item>
          </template>
          <template #address="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].address`" :label-col-style="{ display: 'none' }">
              <a-input v-model="record.address" placeholder="请输入地址" allow-clear />
            </a-form-item>
          </template>
          <template #action="{ rowIndex }">
            <a-button type="primary" status="danger" @click="onDelete(rowIndex)">
              <template #icon>
                <icon-delete />
              </template>
            </a-button>
          </template>
        </a-table>
      </a-form>

      <a-row justify="end" style="margin-top: 8px">
        <a-space wrap>
          <a-button @click="reset">重置</a-button>
          <a-button type="primary" @click="submit">验证并提交</a-button>
        </a-space>
      </a-row>

      <GiCodeView :code-json="tableDataJson"></GiCodeView>

      <a-alert type="warning" style="margin-top: 8px">
        本示例均采用原生arco组件开发，并不建议过渡封装编辑表格，经历过才知道，过渡封装会限制灵活性，还有可维护性，多点代码也没啥，直接copy就行
      </a-alert>
    </a-card>
  </div>
</template>

<script lang='ts' setup>
import type { FormInstance, TableColumnData } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'

defineOptions({ name: 'FormTable' })

const formRef = ref<FormInstance>()
const columns: TableColumnData[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    slotName: 'name',
    headerCellClass: 'column-require'
  },
  {
    title: '手机',
    dataIndex: 'phone',
    slotName: 'phone',
    headerCellClass: 'column-require'
  },
  {
    title: '地址',
    dataIndex: 'address',
    slotName: 'address'
  },
  {
    title: '操作',
    width: 60,
    slotName: 'action'
  }
]

const form = reactive({
  tableData: [
    { name: '', phone: '', address: '' }
  ]
})

const tableDataJson = computed(() => {
  return JSON.stringify(form.tableData, null, '\t')
})

const addTableRow = () => {
  form.tableData.push({ name: '', phone: '', address: '' })
}

const onDelete = (index: number) => {
  form.tableData.splice(index, 1)
}

const submit = async () => {
  const valid = await formRef.value?.validate()
  if (valid) return
  Message.success('提交通过')
}

const reset = () => {
  formRef.value?.resetFields()
  formRef.value?.clearValidate()
}
</script>

<style lang='scss' scoped>
// :deep(.arco-form-item-message),
// :deep(.arco-form-item) {
//   display: none;
// }

:deep(.column-require) {
  .arco-table-th-title {
    &::before {
      content: '*';
      color: red;
      padding-right: 2px;
    }
  }
}

.form-table {
  padding: $padding;
}
</style>
