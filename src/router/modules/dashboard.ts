import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '仪表盘',
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'menu-work',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作台',
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default DASHBOARD
