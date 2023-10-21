import type * as A from '@arco-design/web-vue'
import { Row } from '@arco-design/web-vue'

export type FormType =
  | 'input'
  | 'select'
  | 'radio-group'
  | 'checkbox-group'
  | 'textarea'
  | 'date-picker'
  | 'input-number'

export interface FormOption {
  label: string
  value: string | number
}

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
    | A.InputNumberInstance['$props']
  rules?: A.FormItemInstance['$props']['rules']
  // extra?: A.FormItemInstance['$props']['extra']
}

export interface Options {
  form: Pick<A.FormInstance['$props'], 'size' | 'layout' | 'disabled' | 'rules' | 'autoLabelWidth'>
  row?: InstanceType<typeof Row>
  columns: ColumnsItem[]
  btns?: { hide?: boolean }
}
