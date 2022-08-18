import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Indicator: AppRouteRecordRaw = {
  path: '/indicator',
  name: 'Indicator',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.indicator',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 2
  },
  children: [
    {
      path: '',
      name: 'IndicatorMain',
      component: () => import('@/views/indicator/main/index.vue'),
      meta: { title: '指标管理', keepAlive: false, locale: 'menu.indicator.main', requiresAuth: true, roles: ['*'] }
    },
    {
      path: 'detail',
      name: 'IndicatorDetail',
      component: () => import('@/views/indicator/detail/index.vue'),
      meta: {
        title: '指标管理-详情',
        keepAlive: false,
        locale: 'menu.indicator.detail',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default Indicator
