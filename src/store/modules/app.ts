import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'
import type { TabModeType, animateModeType } from '@/config/option'

interface ThemeState {
  theme: 'light' | 'dark'
  themeColor: string
  header: boolean
  footer: boolean
  menu: boolean
  hideMenu: boolean
  menuWidth: number
  menuCollapse: boolean
  tab: boolean
  tabMode: TabModeType
  animate: boolean
  animateMode: animateModeType
  [propName: string]: any
}

const ThemeStorage = JSON.parse(localStorage.getItem('Theme') || '{}')

export const useAppStore = defineStore({
  id: 'App',
  state: (): ThemeState => {
    return {
      ...defaultSettings,
      ...ThemeStorage,
      systemName: 'Admin Pro', // 系统名称
      time: '' // 当前日期时间
    }
  },
  getters: {
    transitionName(): string {
      return this.animate ? this.animateMode : ''
    }
  },
  actions: {
    // 切换主题  暗黑模式|简白模式
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
        localStorage.setItem('Theme', JSON.stringify(this.$state))
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
        localStorage.setItem('Theme', JSON.stringify(this.$state))
      }
      this.setThemeColor(this.themeColor)
      this.changeThemeColor(this.themeColor)
    },
    // 设置主题色
    setThemeColor(color: string) {
      this.themeColor = color
      localStorage.setItem('Theme', JSON.stringify(this.$state))
    },
    // 改变主题色
    changeThemeColor(themeColor: string) {
      const list = generate(themeColor, { list: true, dark: this.theme === 'dark' ? true : false })
      list.forEach((color: string, index: number) => {
        const rgbStr = getRgbStr(color)
        document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
      })
    },
    // 设置页签可见
    setTabVisible(visible: boolean) {
      this.tab = visible
      localStorage.setItem('Theme', JSON.stringify(this.$state))
    },
    // 设置页签的样式类型
    setTabMode(mode: TabModeType) {
      this.tabMode = mode
      localStorage.setItem('Theme', JSON.stringify(this.$state))
    },
    // 设置是否使用过渡动画
    setAnimateVisible(visible: boolean) {
      this.animate = visible
      localStorage.setItem('Theme', JSON.stringify(this.$state))
    },
    // 设置页面过渡动画类型
    setAnimateMode(mode: animateModeType) {
      this.animateMode = mode
      localStorage.setItem('Theme', JSON.stringify(this.$state))
    },
    // 初始化时间
    initTime() {
      const weekList = ['日', '一', '二', '三', '四', '五', '六']
      setInterval(() => {
        this.time = `${dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${weekList[dayjs(new Date()).day()]}`
      }, 1000)
    }
  }
})
