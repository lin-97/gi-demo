import type * as A from '@arco-design/web-vue'

export type FormType =
  | 'input'
  | 'select'
  | 'radio-group'
  | 'checkbox-group'
  | 'textarea'
  | 'date-picker'
  | 'time-picker'
  | 'input-number'
  | 'rate'
  | 'switch'
  | 'slider'
  | 'cascader'
  | 'tree-select'

export type ColumnsItemPropsKey =
  | keyof A.InputInstance['$props']
  | keyof A.SelectInstance['$props']
  | keyof A.TextareaInstance['$props']
  | keyof A.DatePickerInstance['$props']
  | keyof A.TimePickerInstance['$props']
  | keyof A.RadioGroupInstance['$props']
  | keyof A.CheckboxGroupInstance['$props']
  | keyof A.InputNumberInstance['$props']
  | keyof A.RateInstance['$props']
  | keyof A.SwitchInstance['$props']
  | keyof A.SliderInstance['$props']
  | keyof A.CascaderInstance['$props']
  | keyof A.TreeSelectInstance['$props']

export interface ColumnsItem {
  type: FormType
  label: A.FormItemInstance['label']
  field: A.FormItemInstance['field']
  span?: number
  col?: A.ColProps
  item?: Omit<A.FormItemInstance['$props'], 'label' | 'field'>
  props?:
    | A.InputInstance['$props']
    | A.SelectInstance['$props']
    | A.TextareaInstance['$props']
    | A.DatePickerInstance['$props']
    | A.TimePickerInstance['$props']
    | A.RadioGroupInstance['$props']
    | A.CheckboxGroupInstance['$props']
    | A.InputNumberInstance['$props']
    | A.RateInstance['$props']
    | A.SwitchInstance['$props']
    | A.SliderInstance['$props']
    | A.CascaderInstance['$props']
    | A.TreeSelectInstance['$props']
  rules?: A.FormItemInstance['$props']['rules']
  options?:
    | A.SelectInstance['$props']['options']
    | A.RadioGroupInstance['$props']['options']
    | A.CheckboxGroupInstance['$props']['options']
    | A.CascaderInstance['$props']['options']
  data?: A.TreeSelectInstance['$props']['data']
  hide?: boolean
}

export interface Options {
  form: Omit<A.FormInstance['$props'], 'model'>
  row?: Partial<typeof import('@arco-design/web-vue')['Row']['__defaults']>
  columns: ColumnsItem[]
  btns?: { hide?: boolean; span?: number; col?: A.ColProps; searchBtnText?: string }
  fold?: { enable?: boolean; index?: number }
}
