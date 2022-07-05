export default {
  path: '/detail-page',
  name: 'DetailPage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/detail-page/base-detail',
      name: 'DetailPageBaseDetail',
      component: () => import('@/views/detail-page/base-detail/index.vue'),
      meta: { title: '基础详情页', keepAlive: false }
    },
    {
      path: '/detail-page/senior-detail',
      name: 'DetailPageSeniorDetail',
      component: () => import('@/views/detail-page/senior-detail/index.vue'),
      meta: { title: '高级详情页', keepAlive: false }
    }
  ]
}
