/** 组件属性定义 */
export interface SpaceProps {
  /** 间距大小，可以是预设值、具体数字或者行列间距数组 */
  size?: number | [number, number] | 'mini' | 'small' | 'medium' | 'large'
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 水平对齐方式 */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  /** 垂直对齐方式 */
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  /** 是否自动换行 */
  wrap?: boolean
  /** 是否充满整行 */
  fill?: boolean
}
