import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { resetRouter } from '@/router'
import { login as loginApi, logout as logoutApi, getUserInfo as getUserInfoApi } from '@/apis'
import type { UserInfo } from '@/apis'
import { setToken, clearToken, getToken } from '@/utils/auth'

const storeSetup = () => {
  const userInfo = reactive<Pick<UserInfo, 'name' | 'avatar'>>({
    name: '',
    avatar: ''
  })
  const userName = computed(() => userInfo.name)
  const avatar = computed(() => userInfo.avatar)

  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([]) // 当前用户角色
  const permissions = ref<string[]>([]) // 当前角色权限标识集合

  // 登录
  const login = async (params: any) => {
    const res = await loginApi(params)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 退出
  const logout = async () => {
    token.value = ''
    roles.value = []
    permissions.value = []
    clearToken()
    resetRouter()
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.name = res.data.name
    userInfo.avatar = res.data.avatar
    if (res.data.roles && res.data.roles.length) {
      roles.value = res.data.roles
      permissions.value = res.data.permissions
    } else {
      roles.value = ['ROLE_DEFAULT']
    }
  }

  return { userInfo, userName, avatar, token, roles, permissions, login, logout, getUserInfo }
}

export const useUserStore = defineStore('user', storeSetup, { persist: true })
