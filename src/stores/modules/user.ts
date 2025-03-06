/** @file 用户状态管理模块 - 处理用户登录、权限和信息管理 */

import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { resetRouter } from '@/router'
import { type UserInfo, getUserInfo as getUserInfoApi, login as loginApi, logout as logoutApi } from '@/apis/user'
import { clearToken, getToken, setToken } from '@/utils/auth'

/** 登录参数接口 */
interface LoginParams {
  username: string
  password: string
  code?: string
}

/** 用户 Store 的核心设置逻辑 - 管理用户相关的状态和操作 */
const storeSetup = () => {
  /** 用户基本信息 */
  const userInfo = reactive<Pick<UserInfo, 'nickname' | 'avatar'>>({
    nickname: '',
    avatar: ''
  })

  /** 用户昵称 */
  const name = computed(() => userInfo.nickname)

  /** 用户头像 */
  const avatar = computed(() => userInfo.avatar)

  /** 用户令牌 */
  const token = ref<string>(getToken() || '')

  /** 用户角色列表 */
  const roles = ref<string[]>([])

  /** 用户权限列表 */
  const permissions = ref<string[]>([])

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
      roles.value = []
      permissions.value = []
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
  const getInfo = async (): Promise<void> => {
    try {
      const res = await getUserInfoApi()
      const { nickname, avatar: userAvatar, roles: userRoles, permissions: userPermissions } = res.data

      // 更新用户基本信息
      userInfo.nickname = nickname
      userInfo.avatar = userAvatar

      // 更新用户角色和权限
      if (userRoles?.length) {
        roles.value = userRoles
        permissions.value = userPermissions || []
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  /**
   * 更新令牌（仅用于开发测试）
   * @description 用于模拟令牌过期场景
   * @param {string} value - 新的令牌值
   */
  const editToken = (value: string): void => {
    token.value = value
    setToken(value)
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
    getInfo,
    resetToken,
    editToken
  }
}

/**
 * 用户状态管理 Store
 * @description 创建用户相关的状态管理 store，使用 localStorage 进行持久化存储
 */
export const useUserStore = defineStore('user', storeSetup, {
  persist: {
    paths: ['token'],
    storage: localStorage
  }
})
