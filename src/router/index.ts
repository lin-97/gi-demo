/** @file 路由配置模块 - 处理路由的创建、守卫和重置 */

import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { useRouteStore } from '@/stores'
import createRouteGuard from '@/router/guard'

/** 默认布局组件 */
const Layout = () => import('@/layout/index.vue')

/** 基础路由配置 */
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  }
]

/** 错误页面路由配置 */
const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    meta: { hidden: true }
  }
]

/** 主页路由配置 */
const homeRoute: RouteRecordRaw = {
  path: '/',
  name: 'Home',
  component: Layout,
  redirect: '/home',
  meta: { hidden: false },
  children: [
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      name: 'HomeIndex',
      meta: {
        title: '首页',
        icon: 'icon-dashboard',
        svgIcon: 'menu-home',
        affix: true,
        hidden: false,
        breadcrumb: false
      }
    }
  ]
}

/** 静态路由配置 */
export const constantRoutes: RouteRecordRaw[] = [...baseRoutes, ...errorRoutes, homeRoute]

/** 创建路由实例 */
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 创建路由守卫
createRouteGuard(router)

/** 重置路由配置 - 清除所有动态添加的路由 */
export function resetRouter(): void {
  try {
    const routeStore = useRouteStore()
    // 移除所有动态路由
    routeStore.asyncRoutes.forEach((route) => {
      const { name } = route
      if (name && router.hasRoute(name)) {
        router.removeRoute(name)
      }
    })
  } catch (error) {
    console.error('重置路由失败:', error)
    // 降级处理：刷新页面以重置路由状态
    window.location.reload()
  }
}

export default router
