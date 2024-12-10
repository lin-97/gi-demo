<template>
  <div class="gi-edit-table">
    <a-form ref="formRef" :model="form">
      <a-table :data="form.tableData" :bordered="{ cell: true }" :pagination="false" v-bind="attrs">
        <template #columns>
          <a-table-column v-for="col in props.columns" :key="col.dataIndex" :title="(col.title as any)"
            :data-index="col.dataIndex" :header-cell-class="headerCellClass(col)" v-bind="col.columnProps">
            <template #cell="{ record, rowIndex, column }">
              <a-form-item :field="`tableData[${rowIndex}].${col.dataIndex}`" :label-col-style="{ display: 'none' }"
                :wrapper-col-props="{ span: 24 }" v-bind="col.formItemProps"
                :rules="[{ required: col.required || false, message: getRuleMessage(col) }, ...(col.rules || [])]">
                <template v-if="col.slotName">
                  <slot :name="col.dataIndex" v-bind="{ record, rowIndex, column }"></slot>
                </template>
                <component :is="`a-${col.type}`" v-else v-bind="getComponentBindProps(col)"
                  v-model="record[col.dataIndex]" :disabled="isDisabled({ row: record, rowIndex, col })">
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
  cellDisabled: false
})

defineSlots<{
  [propsName: string]: (props: { record: T, rowIndex: number, column: ColumnItem }) => void
}>()

interface Props {
  columns: ColumnItem[]
  data: T[]
  cellDisabled?: Disabled<T>
}

const attrs = useAttrs()

const form = computed(() => ({ tableData: props.data }))

const formRef = useTemplateRef('formRef')

const headerCellClass = (col: ColumnItem) => {
  return col.required ? 'gi_column_require' : ''
}

const getComponentBindProps = (col: ColumnItem) => {
  // 组件默认配置映射表
  const ConfigMap = new Map<ColumnItem['type'], Partial<Omit<ColumnItem['props'], 'placeholder'> & { placeholder?: string | string[] }>>([
    ['input', { allowClear: true, placeholder: `请输入${col.title}`, maxLength: 50 }],
    ['input-number', { placeholder: `请输入${col.title}` }],
    ['textarea', { allowClear: false, placeholder: `请填写${col.title}`, maxLength: 200 }],
    ['input-tag', { allowClear: true, placeholder: `请输入${col.title}` }],
    ['mention', { allowClear: true, placeholder: `请输入${col.title}` }],
    ['select', { allowClear: true, placeholder: `请选择${col.title}` }],
    ['tree-select', { allowClear: true, placeholder: `请选择${col.title}` }],
    ['cascader', { allowClear: true, placeholder: `请选择${col.title}` }],
    ['radio-group', {}],
    ['checkbox-group', {}],
    ['date-picker', { allowClear: true, placeholder: '请选择日期' }],
    ['time-picker', { allowClear: true, placeholder: '请选择时间' }]
  ])
  // 获取默认配置
  const defaultProps = ConfigMap.get(col.type) || {}
  // 合并默认配置和自定义配置
  return { ...defaultProps, ...col.props }
}

const getRuleMessage = (col: ColumnItem) => {
  if (['input', 'input-number', 'input-tag', 'mention'].includes(col.type ?? '')) {
    return `请输入${col.title}`
  }
  if (['textarea'].includes(col.type ?? '')) {
    return `请填写${col.title}`
  }
  return `请选择${col.title}`
}

const isDisabled: Props['cellDisabled'] = (p) => {
  if (typeof props?.cellDisabled === 'boolean') return props.cellDisabled
  if (typeof props?.cellDisabled === 'function') return props.cellDisabled(p)
  return false
}

defineExpose({ formRef })
</script>

<style lang='scss' scoped></style>
