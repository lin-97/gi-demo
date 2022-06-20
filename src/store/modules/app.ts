import { defineStore } from 'pinia'
import dayjs from 'dayjs'

interface AppState {
  systemName: string
  activePath: string | null
  time: string
}

export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      systemName: 'Admin Pro', // 系统名称
      activePath: window.sessionStorage.getItem('ActivePath') || '/home', // 当前激活的路径
      time: '' // 当前日期时间
    }
  },
  getters: {},
  actions: {
    // 设置激活路径地址
    setActivePath(path: string) {
      this.activePath = path
      window.sessionStorage.setItem('ActivePath', path)
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
