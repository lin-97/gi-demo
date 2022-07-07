export default {
  path: '/detail',
  name: 'Detail',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/detail/base-detail',
      name: 'DetailBaseDetail',
      component: () => import('@/views/detail/base-detail/index.vue'),
      meta: { title: '基础详情页', keepAlive: false }
    },
    {
      path: '/detail/senior-detail',
      name: 'DetailSeniorDetail',
      component: () => import('@/views/detail/senior-detail/index.vue'),
      meta: { title: '高级详情页', keepAlive: false }
    }
  ]
}
