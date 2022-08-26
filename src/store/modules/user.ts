import { defineStore } from 'pinia'
import { login as userLogin, logout as userLogout } from '@/apis'
import type { LoginParams, UserInfo } from '@/apis'
import { setToken, clearToken } from '@/utils/auth'

export type RoleType = '' | '*' | 'admin' | 'user'

interface UserState {
  userInfo: UserInfo
}

export const useUserStore = defineStore({
  id: 'User',
  state: (): UserState => {
    return {
      userInfo: JSON.parse(localStorage.getItem('UserInfo') as string) || {
        name: '',
        avatar: '',
        phone: '',
        registrationDate: '',
        accountId: '',
        role: ''
      }
    }
  },
  getters: {
    userName(): string {
      return this.userInfo.name
    }
  },
  actions: {
    // 登录
    async login(loginForm: LoginParams) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
        this.userInfo = res.data.userInfo
        localStorage.setItem('UserInfo', JSON.stringify(this.userInfo))
      } catch (err) {
        clearToken()
        throw err
      }
    },
    // 退出登录
    async logout() {
      try {
        await userLogout()
        clearToken()
      } catch (err) {
        return err
      }
    }
  }
})
