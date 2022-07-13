import { defineStore } from 'pinia'
import dayjs from 'dayjs'

interface AppState {
  systemName: string
  time: string
}

export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      systemName: 'Admin Pro', // 系统名称
      time: '' // 当前日期时间
    }
  },
  getters: {},
  actions: {
    // 初始化时间
    initTime() {
      const weekList = ['日', '一', '二', '三', '四', '五', '六']
      setInterval(() => {
        this.time = `${dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${weekList[dayjs(new Date()).day()]}`
      }, 1000)
    }
  }
})
