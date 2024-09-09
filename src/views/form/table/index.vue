<template>
  <div class="gi_page">
    <a-card title="编辑表格">
      <a-row justify="end">
        <a-space wrap>
          <a-button type="primary" @click="addTableRow">
            <template #icon><icon-plus /></template>
            <span>新增</span>
          </a-button>
        </a-space>
      </a-row>

      <a-form ref="formRef" :model="form">
        <a-table :columns="columns" :data="form.tableData" :bordered="{ cell: true }" :scroll="{ minWidth: 680 }"
          :pagination="false">
          <template #name="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].name`" :label-col-style="{ display: 'none' }"
              :wrapper-col-props="{ span: 24 }" :rules="[{ required: true, message: '请输入姓名' }]">
              <a-input v-model="record.name" placeholder="请输入姓名" allow-clear />
            </a-form-item>
          </template>
          <template #phone="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].phone`" :label-col-style="{ display: 'none' }"
              :wrapper-col-props="{ span: 24 }" :rules="[{ required: true, message: '请输入手机号' }]">
              <a-input v-model="record.phone" placeholder="请输入手机号" allow-clear />
            </a-form-item>
          </template>
          <template #address="{ record, rowIndex }">
            <a-form-item :field="`tableData[${rowIndex}].address`" :label-col-style="{ display: 'none' }"
              :wrapper-col-props="{ span: 24 }">
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
        本示例均采用原生arco组件开发，并不建议过渡封装编辑表格，过渡封装会限制灵活性，还有可维护性，多点代码也没啥，直接copy就行
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
    headerCellClass: 'gi_column_require'
  },
  {
    title: '手机',
    dataIndex: 'phone',
    slotName: 'phone',
    headerCellClass: 'gi_column_require'
  },
  {
    title: '地址',
    dataIndex: 'address',
    slotName: 'address'
  },
  {
    title: '操作',
    width: 80,
    slotName: 'action',
    fixed: 'right',
    align: 'center'
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
  if (valid) {
    const arr = Object.values(valid)
    Message.warning(arr[0].message)
    return
  }
  Message.success('提交通过')
}

const reset = () => {
  formRef.value?.resetFields()
  formRef.value?.clearValidate()
}
</script>

<style lang='scss' scoped>
:deep(.arco-form-item) {
  margin-bottom: 0;

  .arco-form-item-message {
    display: none;
  }
}
</style>
