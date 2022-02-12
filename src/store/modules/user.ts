import { defineStore } from 'pinia'

type User = {
  id: string
  name: string
}

interface UserState {
  user: User
}

export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => {
    return {
      user: JSON.parse(localStorage.getItem('USER') as string)  || { id: 'admin123456', name: 'admin' }
    }
  },
  getters: {
    userName():string {
      return this.user.name
    }
  },
  actions: {
    // 设置用户信息
    setUser(userInfo: User) {
      const { id, name } = userInfo
      this.user = { id, name }
      localStorage.setItem('USER', JSON.stringify(this.user))
    }
  }
})
