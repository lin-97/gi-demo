/** @file 路由权限守卫模块 - 处理路由访问权限和动态路由加载 */

import { Message } from '@arco-design/web-vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { useRouteStore, useUserStore } from '@/stores'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'

/** 免登录白名单路径 */
const whiteList = ['/login', '/register']

/** 是否已生成动态路由 */
let isDynamicRoutesGenerated = false

/**
 * 处理动态路由加载
 * @param router - 路由实例
 * @param to - 目标路由
 */
async function handleDynamicRoutes(
  router: Router,
  to: RouteLocationNormalized
): Promise<{ path: string, query?: any, replace: boolean }> {
  const userStore = useUserStore()
  const routeStore = useRouteStore()

  try {
    // 获取用户信息和权限
    await userStore.getInfo()

    // 生成可访问的路由表
    const accessRoutes = await routeStore.generateRoutes()

    // 动态添加可访问路由
    accessRoutes.forEach((route) => {
      if (!isHttp(route.path)) {
        router.addRoute(route)
      }
    })

    // 标记动态路由已生成
    isDynamicRoutesGenerated = true

    // 确保路由添加完成后返回目标路由
    return { ...to, replace: true }
  } catch (error) {
    // 发生错误时重置用户状态并跳转登录页
    userStore.resetToken()
    const errorMessage = error instanceof Error ? error.message : '路由守卫过程发生错误'
    Message.error(errorMessage)
    return { path: `/login`, query: { redirect: to.path }, replace: true }
  }
}

/**
 * 初始化路由守卫
 * @param router - 路由实例
 */
export const setupPermissionGuard = (router: Router): void => {
  router.beforeEach(async (to, _from, next) => {
    const token = getToken()
    const userStore = useUserStore()

    // 已登录状态
    if (token) {
      if (to.path === '/login') {
        // 已登录时访问登录页，直接放行（通常会被重定向到首页）
        next()
        return
      }

      // 只在首次访问或路由未生成时处理动态路由
      if (!isDynamicRoutesGenerated) {
        try {
          const redirectRoute = await handleDynamicRoutes(router, to)
          next(redirectRoute)
        } catch (error) {
          // 如果出错，清空角色信息并重定向到登录页
          userStore.resetToken()
          // 重置路由生成标志
          isDynamicRoutesGenerated = false
          next(`/login?redirect=${to.path}`)
        }
        return
      }

      // 正常访问
      next()
      return
    }

    // 未登录状态时重置路由生成标志
    isDynamicRoutesGenerated = false

    if (whiteList.includes(to.path)) {
      // 白名单路径直接访问
      next()
      return
    }

    // 其他路径重定向到登录页
    next('/login')
  })
}
