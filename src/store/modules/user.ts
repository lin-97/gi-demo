import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { resetRouter } from '@/router'
import { login as loginApi, logout as logoutApi, getUserInfo as getUserInfoApi } from '@/apis'
import type { UserInfo } from '@/apis'
import { setToken, clearToken, getToken } from '@/utils/auth'

const storeSetup = () => {
  const userInfo = ref<UserInfo>({
    name: '',
    avatar: ''
  })
  const userName = computed(() => userInfo.value.name)
  const avatar = computed(() => userInfo.value.avatar)

  const token = ref<string>(getToken() || '')
  const roles = ref<string[]>([]) // 当前用户角色

  // 登录
  const login = async (params: any) => {
    const res = await loginApi(params)
    setToken(res.data.token)
    token.value = res.data.token
  }

  // 退出
  const logout = async () => {
    clearToken()
    token.value = ''
    roles.value = []
    resetRouter()
  }

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    userInfo.value = res.data
  }

  // 切换角色
  const changeRole = async (role: string) => {
    const newToken = 'TOKEN-' + role
    token.value = newToken
    setToken(newToken)
    await getUserInfo()
    // permissionStore.setRoutes(roles.value)
    resetRouter()
    // permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
    //   router.addRoute(item)
    // })
    // _resetTagsView()
  }

  return { userInfo, userName, avatar, token, roles, login, logout, getUserInfo, changeRole }
}

export const useUserStore = defineStore('user', storeSetup, { persist: true })
