import { createRouter, createWebHashHistory, type RouteRecordNormalized, type RouteRecordRaw } from 'vue-router'
import _XEUtils_ from 'xe-utils'
import ConstantRoutes from './constant-routes'
import AsyncRoutes from './async-routes'

/** 常驻路由 */
export const constantRoutes = ConstantRoutes

/** 动态路由/异步路由 */
export const asyncRoutes = AsyncRoutes

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes as RouteRecordRaw[]
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
