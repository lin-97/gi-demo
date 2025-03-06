/** @file 路由守卫配置模块 - 处理路由导航守卫和权限控制 */

import type { Router } from 'vue-router'
import { setupPermissionGuard } from './setupPermissionGuard'
import { setRouteEmitter } from '@/hooks'

/**
 * 设置页面路由守卫
 * @description 处理路由变化时的页面级操作，如路由变化事件通知
 * @param router - Vue Router 实例
 */
export const setupPageGuard = (router: Router) => {
  router.beforeEach((to, from) => {
    // 触发路由变化事件，通知所有监听器
    setRouteEmitter(to, from)
  })
}

/**
 * 创建路由守卫
 * @description 统一配置所有路由守卫，包括：
 * 1. 页面路由守卫 - 处理路由变化事件
 * 2. 权限路由守卫 - 处理路由访问权限
 * @param router - Vue Router 实例
 */
export default function createRouteGuard(router: Router) {
  // 设置页面路由守卫
  setupPageGuard(router)
  // 设置权限路由守卫
  setupPermissionGuard(router)
}
