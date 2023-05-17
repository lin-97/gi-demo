export default {
  path: '/result',
  name: 'Result',
  component: import('@/layout/index.vue'),
  redirect: '/result/success',
  meta: { title: '结果页', keepAlive: false },
  children: [
    {
      path: '/result/success',
      name: 'ResultSuccess',
      component: () => import('@/views/result/success/index.vue'),
      meta: { title: '成功页', keepAlive: false }
    },
    {
      path: '/result/fail',
      name: 'ResultFail',
      component: () => import('@/views/result/fail/index.vue'),
      meta: { title: '失败页', keepAlive: false }
    }
  ]
}
