/** 组件属性定义 */
export interface TagProps {
  /** 标签类型 */
  type?: 'dark' | 'light' | 'outline' | 'light-outline'
  /** 标签状态 */
  status?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /** 自定义颜色，支持预设颜色名或十六进制颜色值 */
  color?: 'red' | 'orangered' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'gray' | string
  /** 标签尺寸 */
  size?: 'mini' | 'small' | 'large'
  /** 是否可关闭 */
  closable?: boolean
}
