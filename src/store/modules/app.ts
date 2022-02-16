import { defineStore } from 'pinia'

type Theme = 'light' | 'dark'

interface AppState {
  systemName: string
  theme: Theme
  activePath: string | null
  menuList: App.MenuItem[]
}

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示

export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      systemName: 'Admin管理系统', // 系统名称
      theme: 'light', // light简白模式  dark暗黑模式
      activePath: window.localStorage.getItem('ActivePath') || '/home', // 当前激活的路径
      menuList: [
        {
          icon: 'menu-work',
          id: 'GZT',
          name: '工作台',
          path: '/home'
        },
        {
          icon: 'menu-indicator',
          id: 'ZBGL',
          name: '指标管理',
          path: '/indicator-manage'
        },
        {
          icon: 'menu-file',
          id: 'WJGL',
          name: '文件管理',
          path: '/file-manage'
        },
        {
          icon: 'menu-user',
          id: 'ZBGL',
          name: '个人中心',
          path: '/user'
        },
        {
          icon: 'menu-page',
          id: 'P404',
          name: '404页',
          path: '/404'
        },
        {
          icon: 'menu-test',
          id: 'TEST',
          name: '测试',
          path: '/test'
        }
      ]
    }
  },
  getters: {},
  actions: {
    // 设置激活路径地址
    setActivePath(path: string) {
      this.activePath = path
      window.localStorage.setItem('ActivePath', path)
    },
    // 切换主题  暗黑模式|简白模式
    toggleTheme(isDark: boolean) {
      if (isDark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    }
  }
})
