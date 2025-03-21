declare namespace App {
  /** 系统配置 */
  interface SettingConfig {
    theme: 'light' | 'dark' // 主题
    themeColor: string // 主题色
    tab: 'card' | 'card-gutter' | 'rounded' | 'custom1' | 'custom2' // 页签风格
    tabVisible: boolean // 是否显示页签
    animate: 'zoom-fade' | 'slide-dynamic-origin' | 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale' // 动画类名
    animateVisible: boolean // 是否显示动画
    menuCollapse: boolean // 左侧菜单折叠状态
    menuAccordion: boolean // 左侧菜单手风琴效果
    menuDark: boolean // 菜单深色模式
    layout: 'left' | 'mix' | 'top'
  }
}
