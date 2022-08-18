import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Table: AppRouteRecordRaw = {
  path: '/table',
  name: 'Table',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '表格管理',
    locale: 'menu.table',
    requiresAuth: true,
    icon: 'menu-table',
    order: 4
  },
  children: [
    {
      path: 'main',
      name: 'TableMain',
      component: () => import('@/views/table/main/index.vue'),
      meta: { title: '综合表格', keepAlive: false, locale: 'menu.table.main', requiresAuth: true, roles: ['*'] }
    },
    {
      path: 'custom',
      name: 'TableCustom',
      component: () => import('@/views/table/custom/index.vue'),
      meta: { title: '自定义表格', keepAlive: false, locale: 'menu.table.custom', requiresAuth: true, roles: ['*'] }
    }
  ]
}

export default Table
