import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: AppRouteItem[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
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
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404/index.vue'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error/403/index.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        name: 'Index',
        meta: { title: '工作台', icon: 'icon-dashboard', affix: true }
      }
    ]
  }
]

/** 常驻路由 */
// export const constantRoutes: RouteRecordRaw[] = [
//   {
//     path: '/redirect',
//     component: Layout,
//     meta: {
//       hidden: true
//     },
//     children: [
//       {
//         path: '/redirect/:path(.*)',
//         component: () => import('@/views/redirect/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/403',
//     component: () => import('@/views/error/403.vue'),
//     meta: {
//       hidden: true
//     }
//   },
//   {
//     path: '/404',
//     component: () => import('@/views/error/404.vue'),
//     meta: {
//       hidden: true
//     },
//     alias: '/:pathMatch(.*)*'
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index.vue'),
//     meta: {
//       hidden: true
//     }
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('@/views/dashboard/workplace/index.vue'),
//         name: 'Dashboard',
//         meta: {
//           title: '首页',
//           svgIcon: 'dashboard',
//           affix: true
//         }
//       }
//     ]
//   }
// ]

export default constantRoutes
