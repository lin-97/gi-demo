import { defineStore } from 'pinia'
import dayjs from 'dayjs'

const weekList = ['一', '二', '三', '四', '五', '六', '日']

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示
export const useTimeStore = defineStore({
  id: 'Time',
  state: () => {
    return {
      time: ''
    }
  },
  getters: {},
  actions: {
    // 设置激活路径地址
    initTime() {
      setInterval(() => {
        this.time = `${dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')} 星期${
          weekList[dayjs(new Date()).day() - 1]
        }`
      }, 1000)
    }
  }
})
