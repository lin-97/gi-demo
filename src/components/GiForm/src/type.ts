/**
 * @file GiForm 组件类型定义
 * @description 包含表单组件所需的所有类型定义，用于构建动态表单
 */

import type * as A from '@arco-design/web-vue'
import type { VNode } from 'vue'
import type { FormItemProps, GridItemProps } from '@arco-design/web-vue'

/** 支持的表单项类型 */
export type ColumnItemType =
  | 'input' // 输入框
  | 'input-number' // 数字输入框
  | 'input-tag' // 标签输入框
  | 'textarea' // 文本域
  | 'select' // 选择器
  | 'tree-select' // 树选择器
  | 'radio-group' // 单选框组
  | 'checkbox-group' // 复选框组
  | 'date-picker' // 日期选择器
  | 'year-picker' // 年份选择器
  | 'quarter-picker' // 季度选择器
  | 'month-picker' // 月份选择器
  | 'week-picker' // 周选择器
  | 'time-picker' // 时间选择器
  | 'range-picker' // 范围选择器
  | 'color-picker' // 颜色选择器
  | 'rate' // 评分
  | 'switch' // 开关
  | 'slider' // 滑块
  | 'cascader' // 级联选择器
  | 'upload' // 上传
  | 'auto-complete' // 自动完成
  | 'mention' // 提及
  | 'group-title' // 分组标题

/** 组件属性合并类型 */
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

/** 表单项属性接口 */
interface ColumnItemProps extends Partial<Omit<ComponentProps, 'placeholder'>> {
  placeholder?: string | string[]
}

/** 选项类型定义 */
export type ColumnItemOptions =
  | A.SelectInstance['$props']['options']
  | A.RadioGroupInstance['$props']['options']
  | A.CheckboxGroupInstance['$props']['options']
  | A.CascaderInstance['$props']['options']

/** 数据源类型定义 */
export type ColumnItemData =
  | A.TreeSelectInstance['$props']['data']
  | A.AutoCompleteInstance['$props']['data']
  | A.MentionInstance['$props']['data']

/** 自动完成组件插槽 */
type AutoCompleteSlots = {
  option: (e: { data: (string | number | A.SelectOptionData | A.SelectOptionGroup)[] }) => VNode
  footer: () => VNode
}

/** 级联选择器插槽 */
type CascaderSlots = {
  'label': (e: { data: A.CascaderOption }) => VNode
  'prefix': () => VNode
  'arrow-icon': () => VNode
  'loading-icon': () => VNode
  'search-icon': () => VNode
  'empty': () => VNode
  'option': (e: { data: A.CascaderOption }) => VNode
}

/** 复选框组插槽 */
type CheckboxGroupSlots = {
  checkbox: (e: { checked: boolean, disabled: string }) => VNode
  label: (e: { data: A.CheckboxOption }) => VNode
}

/** 单选框组插槽 */
type RadioGroupSlots = {
  radio: (e: { checked: boolean, disabled: string }) => VNode
  label: (e: { data: any }) => VNode
}

/** 日期选择器插槽 */
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

/** 输入框插槽 */
type InputSlots = {
  append: (() => VNode) | string
  prepend: (() => VNode) | string
  suffix: (() => VNode) | string
  prefix: (() => VNode) | string
}

/** 数字输入框插槽 */
type InputNumberSlots = {
  minus: (() => VNode) | string
  plus: (() => VNode) | string
  append: (() => VNode) | string
  prepend: (() => VNode) | string
  suffix: (() => VNode) | string
}

/** 标签输入框插槽 */
type InputTagSlots = {
  tag: (e: { data: A.TagData }) => VNode
  prefix: (() => VNode) | string
  suffix: (() => VNode) | string
}

/** 评分插槽 */
type RateSlots = {
  character: (e: { index: number }) => VNode
}

/** 选择器插槽 */
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

/** 开关插槽 */
type SwitchSlots = {
  'checked-icon': () => VNode
  'unchecked-icon': () => VNode
  'checked': () => VNode
  'unchecked': () => VNode
}

/** 树选择器插槽 */
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

/** 提及插槽 */
type MentionSlots = {
  option: (e: { data: any }) => VNode
}

/** 组件插槽合并类型 */
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

/** 表单项插槽接口 */
export interface ColumnItemSlots extends Omit<ComponentSlots, 'label' | 'option'> {
  label?: (e: { data: A.CheckboxOption | A.SelectOptionData | A.CascaderOption }) => VNode
  option?: (e: { data: (string | number | A.SelectOptionData | A.SelectOptionGroup)[] | A.CascaderOption | A.SelectOptionData }) => VNode
}

/** 表单项显隐控制类型 */
export type ColumnItemHide<F> = boolean | ((form: F) => boolean)
export type ColumnItemShow<F> = boolean | ((form: F) => boolean)
export type ColumnItemDisabled<F> = boolean | ((form: F) => boolean)

/** 表单项数据请求相关类型 */
export type ColumnItemRequest<F = any> = (form: F) => Promise<any>
export type ColumnItemFormat<T = any> = (res: T) => ColumnItemOptions | ColumnItemData

/** 表单列配置项接口 */
export interface ColumnItem<F = any> {
  /** 字段名 */
  field: string
  /** 标签名（支持字符串或自定义渲染函数） */
  label?: string | VNode | (() => VNode)
  /** 表单项类型 */
  type?: string
  /** 表单项属性 */
  props?: Record<string, any>
  /** 表单项校验规则 */
  rules?: FormItemProps['rules']
  /** 是否必填 */
  required?: boolean
  /** 栅格属性 */
  gridItemProps?: GridItemProps
  /** 表单项属性 */
  formItemProps?: FormItemProps
  /** 表单项插槽 */
  slots?: Record<string, string | ((scope: any) => VNode)>
  /** 表单项组件插槽 */
  formItemSlots?: Record<string, string | VNode | (() => VNode)>
  /** 是否显示（支持函数） */
  show?: boolean | ((model: any) => boolean)
  /** 是否隐藏（支持函数） */
  hide?: boolean | ((model: any) => boolean)
  /** 是否禁用（支持函数） */
  disabled?: boolean | ((model: any) => boolean)
  /** 栅格跨度 */
  span?: number | Record<string, number>
  /** 数据请求函数 */
  request?: (params: any) => Promise<any>
  /** 是否初始化请求 */
  init?: boolean
  /** 结果格式化函数 */
  resultFormat?: (res: any) => any[]
  /** 级联字段 */
  cascader?: string[]
}
