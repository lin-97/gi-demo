import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Error: AppRouteRecordRaw = {
  path: '/error',
  name: 'Error',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '异常页',
    locale: 'menu.error',
    requiresAuth: true,
    icon: 'menu-error',
    order: 7
  },
  children: [
    {
      path: '403',
      name: 'Error403',
      component: () => import('@/views/error/403/index.vue'),
      meta: { title: '异常页403', keepAlive: false, locale: 'menu.error.403', requiresAuth: false, roles: ['*'] }
    },
    {
      path: '404',
      name: 'Error404',
      component: () => import('@/views/error/404/index.vue'),
      meta: { title: '异常页404', keepAlive: false, locale: 'menu.error.404', requiresAuth: false, roles: ['*'] }
    },
    {
      path: '500',
      name: 'Error500',
      component: () => import('@/views/error/405/index.vue'),
      meta: { title: '异常页500', keepAlive: false, locale: 'menu.error.405', requiresAuth: false, roles: ['*'] }
    }
  ]
}

export default Error
