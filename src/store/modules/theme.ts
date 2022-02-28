import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore({
  id: 'Theme',
  state: () => {
    return {
      theme: 'light', // light简白模式  dark暗黑模式
      themeColor: '#1571FA',
      tab: {
        visible: true,
        mode: 'card-gutter',
        modeList: [
          { label: 'card-gutter', value: 'card-gutter' },
          { label: 'card', value: 'card' },
          { label: 'rounded', value: 'rounded' }
        ]
      },
      animate: {
        visible: true,
        mode: 'zoom-fade',
        modeList: [
          { label: 'fade-slide', value: 'fade-slide' },
          { label: 'fade', value: 'fade' },
          { label: 'fade-bottom', value: 'fade-bottom' },
          { label: 'fade-scale', value: 'fade-scale' },
          { label: 'zoom-fade', value: 'zoom-fade' },
          { label: 'zoom-out', value: 'zoom-out' }
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
