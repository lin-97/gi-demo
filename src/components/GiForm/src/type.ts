import type * as A from '@arco-design/web-vue'
import type { VNode } from 'vue'

export type ColumnsItemType =
  | 'input'
  | 'input-number'
  | 'input-tag'
  | 'textarea'
  | 'select'
  | 'tree-select'
  | 'radio-group'
  | 'checkbox-group'
  | 'date-picker'
  | 'year-picker'
  | 'quarter-picker'
  | 'month-picker'
  | 'week-picker'
  | 'time-picker'
  | 'range-picker'
  | 'color-picker'
  | 'rate'
  | 'switch'
  | 'slider'
  | 'cascader'
  | 'upload'
  | 'auto-complete'
  | 'mention'
  | 'group-title'

export type ComponentProps =
  & A.InputInstance['$props']
  & A.InputNumberInstance['$props']
  & A.InputTagInstance['$props']
  & A.TextareaInstance['$props']
  & A.SelectInstance['$props']
  & A.TreeSelectInstance['$props']
  & A.RadioGroupInstance['$props']
  & A.CheckboxGroupInstance['$props']
  & A.DatePickerInstance['$props']
  & A.YearPickerInstance['$props']
  & A.QuarterPickerInstance['$props']
  & A.MonthPickerInstance['$props']
  & A.WeekPickerInstance['$props']
  & A.TimePickerInstance['$props']
  & A.RangePickerInstance['$props']
  & A.ColorPickerInstance['$props']
  & A.RateInstance['$props']
  & A.SwitchInstance['$props']
  & A.SliderInstance['$props']
  & A.CascaderInstance['$props']
  & A.UploadInstance['$props']
  & A.AutoCompleteInstance['$props']
  & A.MentionInstance['$props']
  & A.AlertInstance['$props']

interface ColumnsItemProps extends Partial<Omit<ComponentProps, 'placeholder'>> {
  placeholder?: string | string[]
}

export type ColumnsItemOptions =
  | A.SelectInstance['$props']['options']
  | A.RadioGroupInstance['$props']['options']
  | A.CheckboxGroupInstance['$props']['options']
  | A.CascaderInstance['$props']['options']

export type ColumnsItemData =
  | A.TreeSelectInstance['$props']['data']
  | A.AutoCompleteInstance['$props']['data']
  | A.MentionInstance['$props']['data']

type AutoCompleteSlots = {
  option: (e: { data: (string | number | A.SelectOptionData | A.SelectOptionGroup)[] }) => VNode
  footer: () => VNode
}

type CascaderSlots = {
  'label': (e: { data: A.CascaderOption }) => VNode
  'prefix': () => VNode
  'arrow-icon': () => VNode
  'loading-icon': () => VNode
  'search-icon': () => VNode
  'empty': () => VNode
  'option': (e: { data: A.CascaderOption }) => VNode
}

type CheckboxGroupSlots = {
  checkbox: (e: { checked: boolean, disabled: string }) => VNode
  label: (e: { data: A.CheckboxOption }) => VNode
}

type RadioGroupSlots = {
  radio: (e: { checked: boolean, disabled: string }) => VNode
  label: (e: { data: any }) => VNode
}

type DatePickerSlots = {
  'prefix': () => VNode
  'suffix-icon': () => VNode
  'icon-next-double': () => VNode
  'icon-prev-double': () => VNode
  'icon-next': () => VNode
  'icon-prev': () => VNode
  'cell': (e: { data: Date }) => VNode
  'extra': () => VNode
}

type InputSlots = {
  append: (() => VNode) | string
  prepend: (() => VNode) | string
  suffix: (() => VNode) | string
  prefix: (() => VNode) | string
}

type InputNumberSlots = {
  minus: (() => VNode) | string
  plus: (() => VNode) | string
  append: (() => VNode) | string
  prepend: (() => VNode) | string
  suffix: (() => VNode) | string
}

type InputTagSlots = {
  tag: (e: { data: A.TagData }) => VNode
  prefix: (() => VNode) | string
  suffix: (() => VNode) | string
}

type RateSlots = {
  character: (e: { index: number }) => VNode
}

type SelectSlots = {
  'trigger': () => VNode
  'prefix': () => VNode
  'search-icon': () => VNode
  'loading-icon': () => VNode
  'arrow-icon': () => VNode
  'footer': () => VNode
  'header': () => VNode
  'label': (e: { data: A.SelectOptionData }) => VNode
  'option': (e: { data: A.SelectOptionData }) => VNode
  'empty': () => VNode
}

type SwitchSlots = {
  'checked-icon': () => VNode
  'unchecked-icon': () => VNode
  'checked': () => VNode
  'unchecked': () => VNode
}

type TreeSelectSlots = {
  'trigger': () => VNode
  'prefix': () => VNode
  'label': (e: { data: any }) => VNode
  'header': () => VNode
  'loader': () => VNode
  'empty': () => VNode
  'footer': () => VNode
  'tree-slot-extra': () => VNode
  'tree-slot-title': (e: { title: string }) => VNode
  'tree-slot-icon': (e: { node: A.TreeNodeData }) => VNode
  'tree-slot-switcher-icon': () => VNode
}

type MentionSlots = {
  option: (e: { data: any }) => VNode
}

export type ComponentSlots =
  & AutoCompleteSlots
  & CascaderSlots
  & CheckboxGroupSlots
  & RadioGroupSlots
  & DatePickerSlots
  & InputSlots
  & InputNumberSlots
  & InputTagSlots
  & RateSlots
  & SelectSlots
  & SwitchSlots
  & TreeSelectSlots
  & MentionSlots

export interface ColumnsItemSlots extends Omit<ComponentSlots, 'label' | 'option'> {
  label?: (e: { data: A.CheckboxOption | A.SelectOptionData | A.CascaderOption }) => VNode
  option?: (e: { data: (string | number | A.SelectOptionData | A.SelectOptionGroup)[] | A.CascaderOption | A.SelectOptionData }) => VNode
}

export type ColumnsItemHide<F> = boolean | ((form: F) => boolean)
export type ColumnsItemShow<F> = boolean | ((form: F) => boolean)
export type ColumnsItemDisabled<F> = boolean | ((form: F) => boolean)
export type ColumnsItemRequest<F = any> = (form: F) => Promise<any>
export type ColumnsItemFormat<T = any> = (res: T) => ColumnsItemOptions | ColumnsItemData

export interface ColumnsItem<F = any> {
  type?: ColumnsItemType // 类型
  label?: A.FormItemInstance['label'] | (() => VNode) // 标签
  field: A.FormItemInstance['field'] // 字段(必须唯一)
  span?: A.GridItemProps['span']
  props?: ColumnsItemProps
  gridItemProps?: A.GridItemProps
  formItemProps?: Omit<A.FormItemInstance['$props'], 'label' | 'field'> // a-form-item的props
  required?: boolean // 是否必填
  rules?: A.FormItemInstance['$props']['rules'] // 表单校验规则
  options?: ColumnsItemOptions
  data?: ColumnsItemData
  hide?: ColumnsItemHide<F> // 是否隐藏
  show?: ColumnsItemShow<F> // 是否显示（优先级比hide高）
  disabled?: ColumnsItemDisabled<F> // 是否禁用
  request?: ColumnsItemRequest<F> // 接口请求api
  resultFormat?: ColumnsItemFormat // 结果集格式化
  init?: boolean // 初始化请求
  cascader?: string[] // 级联的field字段列表
  slots?: Partial<ColumnsItemSlots>
  formItemSlots?: Partial<Record<'help' | 'extra', string | (() => VNode)>>
}

export interface Options {
  form?: Omit<A.FormInstance['$props'], 'model'>
  grid?: A.GridProps
  gridItem?: A.GridItemProps
  btns?: { hide?: boolean, searchBtnText?: string }
  fold?: { enable?: boolean, defaultCollapsed?: boolean }
}

export type Columns<F = any> = ColumnsItem<F>[]
