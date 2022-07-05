export default {
  path: '/result-page',
  name: 'ResultPage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/result-page/success',
      name: 'ResultPageSuccess',
      component: () => import('@/views/result-page/success/index.vue'),
      meta: { title: '成功页', keepAlive: false }
    },
    {
      path: '/result-page/fail',
      name: 'ResultPageFail',
      component: () => import('@/views/result-page/fail/index.vue'),
      meta: { title: '失败页', keepAlive: false }
    }
  ]
}
