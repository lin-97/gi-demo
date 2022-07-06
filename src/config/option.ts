// 导航标签的样式类型列表
export type TabModeType = 'card' | 'card-gutter' | 'rounded'

export interface TabModeItem {
  label: string
  value: TabModeType
}

export const tabModeList: TabModeItem[] = [
  { label: '卡片', value: 'card' },
  { label: '间隔卡片', value: 'card-gutter' },
  { label: '圆角', value: 'rounded' }
]

// 页面切换动画类型列表
export type animateModeType =
  | 'zoom-fade'
  | 'slide-dynamic-origin'
  | 'fade-slide'
  | 'fade'
  | 'fade-bottom'
  | 'fade-scale'

export interface animateModeItem {
  label: string
  value: animateModeType
}

export const animateModeList: animateModeItem[] = [
  { label: '默认', value: 'zoom-fade' },
  { label: '滑动', value: 'fade-slide' },
  { label: '渐变', value: 'fade' },
  { label: '底部滑出', value: 'fade-bottom' },
  { label: '缩放消退', value: 'fade-scale' }
]
