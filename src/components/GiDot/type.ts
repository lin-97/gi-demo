/** 点的类型 */
export type DotType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** 组件属性定义 */
export interface DotProps {
  /** 点的类型 */
  type?: DotType
  /** 是否启用动画效果 */
  animation?: boolean
}
