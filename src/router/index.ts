import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'
import { Layout, constantRoutes } from './base'

// 路由模块化自动导入
const modules: any = import.meta.globEager('./modules/*.ts')
export const routeModuleList: RouteRecordRaw[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  if (!mod) return
  const moduleList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...moduleList)
})

const routes: RouteRecordRaw[] = [...constantRoutes, ...routeModuleList]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = getToken()
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
