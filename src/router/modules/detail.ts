export default {
  path: '/detail',
  name: 'Detail',
  component: import('@/layout/index.vue'),
  redirect: '/detail/base',
  meta: { title: '详情页', keepAlive: false },
  children: [
    {
      path: '/detail/base',
      name: 'BaseDetail',
      component: () => import('@/views/detail/base/index.vue'),
      meta: {
        title: '基础详情页',
        keepAlive: false
      }
    },
    {
      path: '/detail/senior',
      name: 'SeniorDetail',
      component: () => import('@/views/detail/senior/index.vue'),
      meta: {
        title: '高级详情页',
        keepAlive: false
      }
    }
  ]
}
