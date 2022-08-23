import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Function: AppRouteRecordRaw = {
  path: '/tool',
  name: 'Tool',
  redirect: '/tool',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '功能页',
    locale: 'menu.tool',
    requiresAuth: true,
    icon: 'menu-test',
    hideChildrenInMenu: true,
    order: 10
  },
  children: [
    {
      path: '',
      name: 'Tool',
      component: () => import('@/views/tool/index.vue'),
      meta: {
        title: '功能页',
        keepAlive: false,
        locale: 'menu.tool.main',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default Function
