export default {
  path: '/indicator',
  name: '/Indicator',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/indicator',
      name: 'IndicatorMain',
      component: () => import('@/views/indicator/main/index.vue'),
      meta: { title: '指标管理', keepAlive: false }
    },
    {
      path: '/indicator/detail',
      name: 'IndicatorDetail',
      component: () => import('@/views/indicator/detail/index.vue'),
      meta: { title: '指标管理-详情', keepAlive: false }
    }
  ]
}
