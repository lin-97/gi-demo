import type { TableInstance } from '@arco-design/web-vue'

export interface GiTableSettingProps {
  /** 工具栏标题 */
  title?: string
  /** 列配置（用于列设置） */
  columns?: TableInstance['columns']
  /** 禁止控制显示隐藏的列 key */
  disabledColumnKeys?: string[]
}

/** 列设置项类型 */
export interface TableSettingColumnListItem {
  title: string
  key: string
  show: boolean
  disabled: boolean
  /** 固定左侧 */
  fixedLeft?: boolean
  /** 固定右侧 */
  fixedRight?: boolean
}
