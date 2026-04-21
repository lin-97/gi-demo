/** 组件属性定义 */
export interface FlexProps {
  /** 排列方向 */
  column?: boolean
  /** 水平对齐方式（与 CSS justify-content 一致） */
  justify?:
  | 'start'
  | 'center'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  /** 垂直对齐方式（与 CSS align-items 一致） */
  align?:
  | 'start'
  | 'center'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'stretch'
  /** 是否自动换行 */
  wrap?: boolean
  gap?: number | string
  flex?: number | string
}
