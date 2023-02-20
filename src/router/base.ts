import type { RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'

/** @desc 默认布局 */
export const Layout = () => import('@/layout/index.vue')

/** @desc 静态路由: 无需验证权限 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { title: '' },
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
    meta: { title: '登录页', keepAlive: false }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404/index.vue'),
    meta: { title: '404页' }
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard/workplace',
        name: 'DashboardWorkplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: { title: '工作台' }
      },
      {
        path: '/dashboard/analyse',
        name: 'DashboardAnalyse',
        component: () => import('@/views/dashboard/analyse/index.vue'),
        meta: { title: '分析页' }
      }
    ]
  }
]

/** @desc 重置路由 */
// export function resetRouter() {
//   const router = useRouter()
//   const permissionStore = usePermissionStoreHook()
//   permissionStore.routes.forEach((route) => {
//     const name = route.name
//     if (name && router.hasRoute(name)) {
//       router.removeRoute(name)
//     }
//   })
// }
