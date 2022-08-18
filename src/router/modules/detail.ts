import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Deatail: AppRouteRecordRaw = {
  path: '/detail',
  name: 'Detail',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '详情页',
    locale: 'menu.detail',
    requiresAuth: true,
    icon: 'menu-detail',
    order: 6
  },
  children: [
    {
      path: 'base',
      name: 'BaseDetail',
      component: () => import('@/views/detail/base/index.vue'),
      meta: {
        title: '基础详情页',
        keepAlive: false,
        locale: 'menu.detail.base',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'senior',
      name: 'SeniorDetail',
      component: () => import('@/views/detail/senior/index.vue'),
      meta: {
        title: '高级详情页',
        keepAlive: false,
        locale: 'menu.detail.senior',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default Deatail
