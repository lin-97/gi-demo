import type { CSSProperties } from 'vue'

/** 组件属性定义 */
export interface PageLayoutProps {
  size?: string
  margin?: boolean
  inner?: boolean
  headerBordered?: boolean
  leftStyle?: CSSProperties
  headerStyle?: CSSProperties
  bodyStyle?: CSSProperties
  collapsed?: boolean
}
