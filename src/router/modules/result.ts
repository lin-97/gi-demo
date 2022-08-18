import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Result: AppRouteRecordRaw = {
  path: '/result',
  name: 'Result',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.result',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 8
  },
  children: [
    {
      path: 'success',
      name: 'ResultSuccess',
      component: () => import('@/views/result/success/index.vue'),
      meta: { title: '成功页', keepAlive: false, locale: 'menu.result.success', requiresAuth: true, roles: ['*'] }
    },
    {
      path: 'fail',
      name: 'ResultFail',
      component: () => import('@/views/result/fail/index.vue'),
      meta: { title: '失败页', keepAlive: false, locale: 'menu.result.fail', requiresAuth: true, roles: ['*'] }
    }
  ]
}

export default Result
