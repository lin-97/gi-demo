import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Navigation: AppRouteRecordRaw = {
  path: '/navigation',
  name: 'Navigation',
  redirect: '/navigation',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '导航',
    locale: 'menu.navigation',
    requiresAuth: true,
    icon: 'menu-nav',
    hideChildrenInMenu: true,
    order: 11
  },
  children: [
    {
      path: '',
      name: 'Navigation',
      component: () => import('@/views/navigation/index.vue'),
      meta: {
        title: '导航',
        keepAlive: false,
        locale: 'menu.navigation.main',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default Navigation
