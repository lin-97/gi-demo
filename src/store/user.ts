import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'User',
  state() {
    return {
      user: JSON.parse(localStorage.getItem('USER')) || { id: 'admin123456', name: 'admin' }
    }
  },
  getters: {
    userName() {
      return this.user.name
    }
  },
  actions: {
    // 设置用户信息
    setUser(userInfo) {
      const { id, name, phone } = userInfo
      this.user = { id, name, phone }
      localStorage.setItem('USER', JSON.stringify(this.user))
    }
  }
})
