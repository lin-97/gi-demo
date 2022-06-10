import { defineStore } from 'pinia'
import { generate, getRgbStr } from '@arco-design/color'

type Theme = 'light' | 'dark'

export const useThemeStore = defineStore({
  id: 'Theme',
  state: () => {
    return {
      theme: localStorage.getItem('theme') || 'light', // light简白模式  dark暗黑模式
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
    // 初始化主题
    initTheme() {
      if (this.theme === 'dark') {
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        document.body.removeAttribute('arco-theme')
      }
    },
    // 切换主题  暗黑模式|简白模式
    toggleTheme() {
      if (this.theme === 'light') {
        document.body.setAttribute('arco-theme', 'dark')
        this.theme = 'dark'
        localStorage.setItem('theme', 'dark')
      } else {
        document.body.removeAttribute('arco-theme')
        this.theme = 'light'
        localStorage.setItem('theme', 'light')
      }
    },
    // 设置主题色
    setThemeColor(color: string) {
      this.themeColor = color
      localStorage.setItem('ThemeColor', color)
    },
    // 改变主题色
    changeThemeColor(themeColor: string) {
      const list = generate(themeColor, { list: true })
      // console.log('list', list)
      list.forEach((color: string, index: number) => {
        const rgbStr = getRgbStr(color)
        document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
      })
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
