/** 组件属性定义 */
export interface IframeProps {
  /** iframe 的源地址 */
  src?: string
  /** 加载提示文本 */
  loadingTip?: string
  /**
   * 安全限制选项
   * @description 默认启用最基本的安全限制
   */
  sandbox?: string
  /**
   * 允许的特性列表
   * @description 默认允许全屏和支付
   */
  allow?: string
  /** 是否在加载失败时显示错误提示 */
  showError?: boolean
}

/** 组件事件定义 */
export interface IframeEmits {
  (e: 'load'): void
  (e: 'error', error: Event): void
  (e: 'loading-change', loading: boolean): void
}
