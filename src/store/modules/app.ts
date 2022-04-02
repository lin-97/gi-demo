import { defineStore } from 'pinia'

interface AppState {
  systemName: string
  activePath: string | null
}

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示
export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      systemName: 'Admin管理系统', // 系统名称
      activePath: window.sessionStorage.getItem('ActivePath') || '/home' // 当前激活的路径
    }
  },
  getters: {},
  actions: {
    // 设置激活路径地址
    setActivePath(path: string) {
      this.activePath = path
      window.sessionStorage.setItem('ActivePath', path)
    }
  }
})
