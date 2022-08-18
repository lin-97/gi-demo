import { defineStore } from 'pinia'
import { generate, getRgbStr } from '@arco-design/color'
import defaultSettings from '@/config/setting.json'
import type { TabModeType, animateModeType } from '@/config/option'
import { Notification } from '@arco-design/web-vue'
import type { NotificationReturn } from '@arco-design/web-vue'
import { getMenuList } from '@/apis'

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
  menuFromServer: boolean
  serverMenu: any[]
}

const storageAppSetting = JSON.parse(localStorage.getItem('AppSetting') || '{}')

export const useAppStore = defineStore({
  id: 'App',
  state: (): ThemeState => ({ ...defaultSettings, ...storageAppSetting }),
  getters: {
    // 页面切换动画类名
    transitionName(): string {
      return this.animate ? this.animateMode : ''
    },
    // 动态菜单
    asyncMenus(): any {
      return this.serverMenu
    }
  },
  actions: {
    // 切换主题  暗黑模式|简白模式
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
      this.setThemeColor(this.themeColor)
    },
    // 设置主题色
    setThemeColor(color: string) {
      this.themeColor = color
      const list = generate(this.themeColor, { list: true, dark: this.theme === 'dark' })
      list.forEach((color: string, index: number) => {
        const rgbStr = getRgbStr(color)
        document.body.style.setProperty(`--primary-${index + 1}`, rgbStr)
      })
      localStorage.setItem('AppSetting', JSON.stringify(this.$state))
    },
    // 设置页签可见
    setTabVisible(visible: boolean) {
      this.tab = visible
      localStorage.setItem('AppSetting', JSON.stringify(this.$state))
    },
    // 设置页签的样式类型
    setTabMode(mode: TabModeType) {
      this.tabMode = mode
      localStorage.setItem('AppSetting', JSON.stringify(this.$state))
    },
    // 设置是否使用过渡动画
    setAnimateVisible(visible: boolean) {
      this.animate = visible
      localStorage.setItem('AppSetting', JSON.stringify(this.$state))
    },
    // 设置页面过渡动画类型
    setAnimateMode(mode: animateModeType) {
      this.animateMode = mode
      localStorage.setItem('AppSetting', JSON.stringify(this.$state))
    },
    // 获取动态菜单
    async getServerMenus() {
      let notifyInstance: NotificationReturn | null = null
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: '动态菜单加载中',
          closable: true
        })
        const { data } = await getMenuList()
        this.serverMenu = data
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: '加载成功',
          closable: true
        })
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: '加载失败',
          closable: true
        })
      }
    },
    // 清除服务菜单
    clearServerMenu() {
      this.serverMenu = []
    },
    // 改变菜单来源方式
    changeMenuFromServer(value: boolean) {
      this.menuFromServer = value
    }
  }
})
