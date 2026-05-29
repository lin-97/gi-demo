/** @file 用户状态管理模块 - 处理用户登录、权限和信息管理 */

import type { UserInfo } from '@/apis/user'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo as getUserInfoApi, getUserRoutes, login as loginApi, logout as logoutApi } from '@/apis/user'
import { resetRouter } from '@/router'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { useRouteStore } from './useRouteStore'

/** 登录参数接口 */
type LoginParams = Parameters<typeof loginApi>[0]

/** 用户 Store 的核心设置逻辑 - 管理用户相关的状态和操作 */
const storeSetup = () => {
  const routeStore = useRouteStore()
  const router = useRouter()
  /** 用户基本信息 */
  const userInfo: UserInfo = reactive({
    id: '',
    nickname: '',
    avatar: '',
    roles: [],
    permissions: []
  })
  /** 用户昵称 */
  const name = computed(() => userInfo.nickname)
  /** 用户头像 */
  const avatar = computed(() => userInfo.avatar)
  /** 用户角色列表 */
  const roles = computed(() => userInfo.roles)
  /** 用户权限列表 */
  const permissions = computed(() => userInfo.permissions)
  /** 用户令牌 */
  const token = ref(getToken() || '')

  /** 重置用户令牌 - 清除令牌并重置路由权限标志 */
  const resetToken = () => {
    token.value = ''
    clearToken()
  }

  /**
   * 用户登录
   * @description 处理用户登录请求并保存令牌
   * @param {LoginParams} params - 登录参数
   * @throws {Error} 当登录失败时抛出错误
   */
  const login = async (params: LoginParams): Promise<void> => {
    try {
      const res = await loginApi(params)
      const { token: newToken } = res.data
      setToken(newToken)
      token.value = newToken
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  /**
   * 用户退出
   * @description 处理用户退出请求并清除状态
   * @returns {Promise<boolean>} 退出是否成功
   */
  const logout = async (): Promise<boolean> => {
    try {
      await logoutApi()
      // 清除用户状态
      token.value = ''
      resetToken()
      resetRouter()
      return true
    } catch (error) {
      console.error('退出失败:', error)
      return false
    }
  }

  /**
   * 获取用户信息
   * @description 获取用户详细信息，包括角色和权限
   * @throws {Error} 当获取用户信息失败时抛出错误
   */
  const fetchUserInfo = async (): Promise<boolean> => {
    try {
      const res = await getUserInfoApi()
      Object.assign(userInfo, res.data)
      return true
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  const generateRoutes = async (): Promise<boolean> => {
    try {
      await fetchUserInfo()
      const res = await getUserRoutes()
      routeStore.setRoutes(res.data)
      routeStore.asyncRoutes.forEach((item) => {
        if (!isHttp(item.path)) {
          router.addRoute(item)
        }
      })
      return true
    } catch (error) {
      console.error('生成路由失败:', error)
      throw error
    }
  }

  return {
    userInfo,
    name,
    avatar,
    token,
    roles,
    permissions,
    login,
    logout,
    fetchUserInfo,
    resetToken,
    generateRoutes
  }
}

/**
 * 用户状态管理 Store
 * @description 创建用户相关的状态管理 store，使用 localStorage 进行持久化存储
 */
export const useUserStore = defineStore('user', storeSetup, {
  persist: {
    pick: ['token'],
    storage: localStorage
  }
})
