import type * as A from '@arco-design/web-vue'

export interface ColumnItem {
  type?:
    | 'input'
    | 'select'
    | 'radio-group'
    | 'checkbox-group'
    | 'textarea'
    | 'date-picker'
    | 'year-picker'
    | 'quarter-picker'
    | 'week-picker'
    | 'range-picker'
    | 'month-picker'
    | 'time-picker'
    | 'color-picker'
    | 'input-number'
    | 'rate'
    | 'switch'
    | 'slider'
    | 'cascader'
    | 'tree-select'
    | 'upload'
    | ''
  title: string
  dataIndex: string
  required?: boolean
  rules?: A.FormItemInstance['$props']['rules'] // 表单校验规则
  props?:
    & A.InputInstance['$props']
    & A.SelectInstance['$props']
    & A.TextareaInstance['$props']
    & A.DatePickerInstance['$props']
    & A.TimePickerInstance['$props']
    & A.RadioGroupInstance['$props']
    & A.CheckboxGroupInstance['$props']
    & A.InputNumberInstance['$props']
    & A.RateInstance['$props']
    & A.SwitchInstance['$props']
    & A.SliderInstance['$props']
    & A.CascaderInstance['$props']
    & A.TreeSelectInstance['$props']
    & A.UploadInstance['$props']
    & A.AlertInstance['$props']
  columnProps?: A.TableColumnInstance['$props']
  formItemProps?: A.FormItemInstance['$props']
  slotName?: string
}

export type Disabled<T> = boolean | ((e: { row: T, rowIndex: number, col: ColumnItem }) => boolean)
