<template>
  <div class="gi-edit-table">
    <a-form ref="formRef" scroll-to-first-error :model="form">
      <a-table :data="form.tableData" :bordered="{ cell: true }" :pagination="false" v-bind="attrs">
        <template #columns>
          <a-table-column v-for="col in props.columns" :key="col.dataIndex" :data-index="col.dataIndex"
            :header-cell-class="headerCellClass(col)" v-bind="col.columnProps" :title="col.title">
            <template #title>
              <component :is="col?.columnProps?.title" v-if="typeof col?.columnProps?.title === 'function'"></component>
              <template v-else>{{ col?.columnProps?.title || col.title }}</template>
            </template>
            <template #cell="{ record, rowIndex, column }">
              <template v-if="!col.type && !col.slotName">{{ record[col.dataIndex] }}</template>
              <a-form-item v-else :field="`tableData[${rowIndex}].${col.dataIndex}`"
                :label-col-style="{ display: 'none' }" :wrapper-col-props="{ span: 24 }" v-bind="col.formItemProps"
                :rules="[{ required: col.required || false, message: getRuleMessage(col) }, ...(col.rules || [])]">
                <template v-if="col.slotName">
                  <slot :name="col.dataIndex" v-bind="{ record, rowIndex, column }"></slot>
                </template>
                <component :is="COMP_MAP[col.type!]" v-else-if="col.type" v-bind="getComponentBindProps(col)"
                  v-model="record[col.dataIndex]" :disabled="isDisabled({ row: record, rowIndex, col })">
                </component>
              </a-form-item>
            </template>
          </a-table-column>
        </template>
        <template #tr="{ record, rowIndex }">
          <tr class="gi-edit-table-tr" @dblclick="emit('tr-dblclick', { record, rowIndex })"></tr>
        </template>
        <template #td="{ record, column, rowIndex }">
          <td class="gi-edit-table-td" @dblclick="emit('td-dblclick', { record, column, rowIndex })"></td>
        </template>
      </a-table>
    </a-form>
  </div>
</template>

<script lang='ts' setup generic="T extends TableData">
import type { TableColumnData, TableData } from '@arco-design/web-vue'
import type { Component } from 'vue'
import type { EditTableColumnItem, EditTableProps as Props } from './type'
import * as A from '@arco-design/web-vue'

defineOptions({ name: 'GiEditTable', inheritAttrs: false })

const props = withDefaults(defineProps<Props<T>>(), {
  cellDisabled: false
})

/** 事件定义 */
const emit = defineEmits<{
  (e: 'tr-dblclick', value: { record: any, rowIndex: number }): void
  (e: 'td-dblclick', value: { record: any, rowIndex: number, column: TableColumnData }): void
}>()

/** 插槽定义 */
defineSlots<{
  [propsName: string]: (props: { record: T, rowIndex: number, column: EditTableColumnItem }) => void
}>()

const attrs = useAttrs()

const COMP_MAP: Record<string, Component> = {
  'input': A.Input,
  'input-number': A.InputNumber,
  'input-tag': A.InputTag,
  'input-search': A.InputSearch,
  'textarea': A.Textarea,
  'select': A.Select,
  'tree-select': A.TreeSelect,
  'radio': A.Radio,
  'radio-group': A.RadioGroup,
  'checkbox': A.Checkbox,
  'checkbox-group': A.CheckboxGroup,
  'date-picker': A.DatePicker,
  'year-picker': A.YearPicker,
  'quarter-picker': A.QuarterPicker,
  'month-picker': A.MonthPicker,
  'week-picker': A.WeekPicker,
  'time-picker': A.TimePicker,
  'range-picker': A.RangePicker,
  'color-picker': A.ColorPicker,
  'rate': A.Rate,
  'switch': A.Switch,
  'slider': A.Slider,
  'cascader': A.Cascader,
  'upload': A.Upload,
  'auto-complete': A.AutoComplete,
  'mention': A.Mention
}

/** 表单数据 */
const form = computed(() => ({ tableData: props.data }))

/** 表单实例 */
const formRef = useTemplateRef('formRef')

/** 获取表头必填星号*样式 */
const headerCellClass = (col: EditTableColumnItem) => {
  return col.required ? 'gi-column-require' : ''
}

/** 静态配置 */
const STATIC_PROPS = new Map<EditTableColumnItem['type'], Partial<EditTableColumnItem['props']>>([
  ['input', { allowClear: true, maxLength: 20 }],
  ['textarea', { allowClear: false, maxLength: 200 }],
  ['input-tag', { allowClear: true }],
  ['mention', { allowClear: true }],
  ['select', { allowClear: true }],
  ['tree-select', { allowClear: true }],
  ['cascader', { allowClear: true }],
  ['date-picker', { allowClear: true }],
  ['time-picker', { allowClear: true }]
])

/** 获取组件默认占位 */
const getPlaceholder = (item: EditTableColumnItem) => {
  if (!item.type) return undefined
  if (['input', 'input-tag', 'mention'].includes(item.type)) {
    return `请输入${item.title}`
  }
  if (['textarea'].includes(item.type)) {
    return `请填写${item.title}`
  }
  if (['select', 'tree-select', 'cascader'].includes(item.type)) {
    return `请选择${item.title}`
  }
  if (['date-picker'].includes(item.type)) {
    return '请选择日期'
  }
  if (['time-picker'].includes(item.type)) {
    return '请选择时间'
  }
  return undefined
}

/** 获取组件默认配置 */
const getComponentBindProps = (col: EditTableColumnItem) => {
  return {
    ...STATIC_PROPS.get(col.type) || {},
    placeholder: getPlaceholder(col),
    ...col.props
  }
}

/** 获取组件默认规则 */
const getRuleMessage = (col: EditTableColumnItem) => {
  if (['input', 'input-number', 'input-tag', 'mention'].includes(col.type ?? '')) {
    return `请输入${col.title}`
  }
  if (['textarea'].includes(col.type ?? '')) {
    return `请填写${col.title}`
  }
  return `请选择${col.title}`
}

/** 判断是否禁用 */
const isDisabled: Props<T>['cellDisabled'] = (p) => {
  if (typeof props?.cellDisabled === 'boolean') return props.cellDisabled
  if (typeof props?.cellDisabled === 'function') return props.cellDisabled(p)
  return false
}

/** 暴露表单实例 */
defineExpose({ formRef })
</script>

<style lang='scss' scoped>
:deep(.arco-form-item) {
  margin-bottom: 0;

  .arco-form-item-message {
    display: none;
  }
}
</style>
