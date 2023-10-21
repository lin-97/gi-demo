import type * as A from '@arco-design/web-vue'

export type FormType =
  | 'input'
  | 'select'
  | 'radio-group'
  | 'checkbox-group'
  | 'textarea'
  | 'date-picker'
  | 'input-number'

type CommonProps = A.InputInstance['$props'] & A.SelectInstance['$props'] & A.TextareaInstance['$props']
interface ColumnsItem extends Partial<Pick<CommonProps, 'placeholder' | 'disabled' | 'allowClear' | 'error'>> {
  type: FormType
  label: A.FormItemInstance['label']
  field: A.FormItemInstance['field']
  span?: number
  col?: A.ColProps
  item?: A.FormItemInstance['$props']
  props?:
    | A.InputInstance['$props']
    | A.SelectInstance['$props']
    | A.TextareaInstance['$props']
    | A.DatePickerInstance['$props']
    | A.RadioGroupInstance['$props']
    | A.CheckboxGroupInstance['$props']
    | A.InputNumberInstance['$props']
  rules?: A.FormItemInstance['$props']['rules']
  options?:
    | A.SelectInstance['$props']['options']
    | A.RadioGroupInstance['$props']['options']
    | A.CheckboxGroupInstance['$props']['options']
}

export interface Options {
  form: Pick<A.FormInstance['$props'], 'size' | 'layout' | 'disabled' | 'rules' | 'autoLabelWidth'>
  row?: typeof import('@arco-design/web-vue')['Row']
  columns: ColumnsItem[]
  btns?: { hide?: boolean }
}
