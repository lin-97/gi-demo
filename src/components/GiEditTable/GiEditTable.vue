<template>
  <div class="gi-edit-table">
    <a-form ref="formRef" :model="form">
      <a-table :data="form.tableData" :bordered="{ cell: true }" :pagination="false" v-bind="attrs">
        <template #columns>
          <a-table-column v-for="col in props.columns" :key="col.dataIndex" :title="col.title"
            :data-index="col.dataIndex" :header-cell-class="headerCellClass(col)" v-bind="col.columnProps">
            <template #cell="{ record, rowIndex }">
              <a-form-item :field="`tableData[${rowIndex}].${col.dataIndex}`" :label-col-style="{ display: 'none' }"
                :wrapper-col-props="{ span: 24 }" v-bind="col.formItemProps"
                :rules="[{ required: col.required || false, message: getRuleMessage(col) }, ...(col.rules || [])]">
                <component :is="`a-${col.type}`" v-bind="getComponentBindProps(col)" v-model="record[col.dataIndex]"
                  :disabled="isDisabled({ row: record, rowIndex, col })">
                </component>
              </a-form-item>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-form>
  </div>
</template>

<script lang='ts' setup generic="T extends TableData">
import type { TableData } from '@arco-design/web-vue'
import type { ColumnItem, Disabled } from './type'

defineOptions({ name: 'GiEditTable', inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

interface Props {
  columns: ColumnItem[]
  data: T[]
  disabled?: Disabled<T>
}

const attrs = useAttrs()

const form = computed(() => ({ tableData: props.data }))

const formRef = useTemplateRef('formRef')
defineExpose({ formRef })

const headerCellClass = (col: ColumnItem) => {
  return col.required ? 'gi_column_require' : ''
}

const getComponentBindProps = (col: ColumnItem) => {
  const obj: Partial<ColumnItem['props'] & { placeholder: string }> = {}
  if (col.type === 'input') {
    obj.allowClear = true
    obj.placeholder = `请输入${col.title}`
    obj.maxLength = 50
  }
  if (col.type === 'input-number') {
    obj.placeholder = `请输入${col.title}`
  }
  if (col.type === 'textarea') {
    obj.allowClear = true
    obj.placeholder = `请输入${col.title}`
    obj.maxLength = 200
  }
  if (col.type === 'select') {
    obj.allowClear = true
    obj.placeholder = `请输入${col.title}`
  }
  if (col.type === 'cascader') {
    obj.allowClear = true
    obj.placeholder = `请输入${col.title}`
  }
  if (col.type === 'tree-select') {
    obj.allowClear = true
    obj.placeholder = `请输入${col.title}`
  }
  if (col.type === 'date-picker') {
    obj.placeholder = '请选择日期'
  }
  if (col.type === 'time-picker') {
    obj.allowClear = true
    obj.placeholder = `请选择时间`
  }
  return { ...obj, ...col.props }
}

const getRuleMessage = (col: ColumnItem) => {
  const obj: Record<string, string> = {
    input: '请输入'
  }
  return `${obj[col.type]}${col.title}`
}

const isDisabled: Props['disabled'] = (p) => {
  if (typeof props?.disabled === 'boolean') return props.disabled
  if (typeof props?.disabled === 'function') return props.disabled(p)
  return false
}
</script>

<style lang='scss' scoped></style>
