import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

type MenuItem = {
  icon: string
  id: string
  name: string
  path: string
}

type AppState = {
  SystemName: string
  ThemeMode: ThemeMode
  activePath: string
  menuList: MenuItem[]
}

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示

export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      SystemName: 'Admin管理系统', // 系统名称
      ThemeMode: window.localStorage.getItem('ThemeMode') || 'light', // light简白模式  dark暗黑模式
      activePath: JSON.parse(window.localStorage.getItem('ActivePath')) || '/home', // 当前激活的路径
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
      window.localStorage.setItem('ActivePath', JSON.stringify(path))
    },
    // 设置暗黑模式
    setThemeMode(value: ThemeMode) {
      this.ThemeMode = value
      window.localStorage.setItem('ThemeMode', value)
    }
  }
})
