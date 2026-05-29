declare namespace App {
  /** 系统配置 */
  interface SettingConfig {
    themeColor: string // 主题色
    layout: 'left' | 'mix' | 'top' | 'columns'
    tabStyle: 'card' | 'card-gutter' | 'rounded' | 'custom1' | 'custom2' // 页签风格
    isTabVisible: boolean // 是否显示页签
    transitionName: 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale' // 动画类名
    isTransitionEnabled: boolean // 是否启用页面切换动画
    isMenuCollapsed: boolean // 左侧菜单折叠状态
    isMenuAccordion: boolean // 左侧菜单手风琴效果
    isMenuDark: boolean // 菜单深色模式
  }
}
