export default {
  path: '/indicator-manage',
  name: '/IndicatorManage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/indicator-manage',
      name: 'IndicatorManageMain',
      component: () => import('@/views/indicator-manage/main/index.vue'),
      meta: { title: '指标管理', keepAlive: false }
    },
    {
      path: '/indicator-manage/detail',
      name: 'IndicatorManageDetail',
      component: () => import('@/views/indicator-manage/detail/index.vue'),
      meta: { title: '指标管理-详情', keepAlive: false }
    }
  ]
}
