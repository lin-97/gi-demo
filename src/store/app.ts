import { defineStore } from 'pinia'

type ThemeMode = 'light' | 'dark'

type MenuItem = {
  icon: string
  id: string
  name: string
  path: string
}

export const useAppStore = defineStore({
  // id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示
  id: 'App',
  state() {
    return {
      systemName: 'Admin管理系统', // 系统名称
      ThemeMode: (window.localStorage.getItem('ThemeMode') || 'light') as ThemeMode, // light简白模式  dark暗黑模式
      activePath: (JSON.parse(window.localStorage.getItem('ActivePath')) || '/home') as string, // 当前激活的路径
      menuList: [
        {
          icon: 'IconRobot',
          id: 'GZT',
          name: '工作台',
          path: '/home'
        },
        {
          icon: 'IconCopyright',
          id: 'ZBGL',
          name: '指标管理',
          path: '/indicator-manage'
        },
        {
          icon: 'IconSettings',
          id: 'ZBGL',
          name: '个人中心',
          path: '/user'
        },
        {
          icon: 'IconSettings',
          id: 'P404',
          name: '404页',
          path: '/404'
        },
        {
          icon: 'IconSettings',
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
      this.$patch((state) => {
        state.activePath = path
        window.localStorage.setItem('ActivePath', JSON.stringify(path))
      })
    },
    // 设置暗黑模式
    setThemeMode(value: ThemeMode) {
      this.$patch((state) => {
        state.ThemeMode = value
        window.localStorage.setItem('ThemeMode', value)
      })
    }
  }
})
