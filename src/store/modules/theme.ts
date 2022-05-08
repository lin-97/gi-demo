import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore({
  id: 'Theme',
  state: () => {
    return {
      theme: 'light', // light简白模式  dark暗黑模式
      themeColor: localStorage.getItem('ThemeColor') || '#1571FA',
      tab: {
        visible: true,
        mode: 'card',
        modeList: [
          { label: '卡片', value: 'card' },
          { label: '间隔卡片', value: 'card-gutter' },
          { label: '圆角', value: 'rounded' }
        ]
      },
      animate: {
        visible: true,
        mode: 'zoom-fade',
        modeList: [
          { label: '默认', value: 'zoom-fade' },
          { label: '动态滑动', value: 'slide-dynamic-origin' },
          { label: '滑动', value: 'fade-slide' },
          { label: '渐变', value: 'fade' },
          { label: '底部滑出', value: 'fade-bottom' },
          { label: '缩放消退', value: 'fade-scale' }
        ]
      }
    }
  },
  getters: {
    transitionName(): string {
      return this.animate.visible ? this.animate.mode : ''
    }
  },
  actions: {
    // 切换主题  暗黑模式|简白模式
    toggleTheme(isDark: boolean) {
      if (isDark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    },
    // 设置主题色
    setThemeColor(color: string) {
      this.themeColor = color
      localStorage.setItem('ThemeColor', color)
    },
    // 设置页签可见
    setTabVisible(visible: boolean) {
      this.tab.visible = visible
    },
    // 设置页签的显示类型
    setTabMode(mode: string) {
      this.tab.mode = mode
    },
    // 设置是否使用过渡动画
    setAnimateVisible(visible: boolean) {
      this.animate.visible = visible
    },
    // 设置页面过渡动画类型
    setAnimateMode(mode: string) {
      this.animate.mode = mode
    }
  }
})
