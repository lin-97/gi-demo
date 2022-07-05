export default {
  path: '/error-page',
  name: 'ErrorPage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/error-page/403',
      name: 'ErrorPage403',
      component: () => import('@/views/error-page/index.vue'),
      meta: { title: '异常页403', keepAlive: false }
    },
    {
      path: '/error-page/404',
      name: 'ErrorPage404',
      component: () => import('@/views/error-page/index.vue'),
      meta: { title: '异常页404', keepAlive: false }
    },
    {
      path: '/error-page/500',
      name: 'ErrorPage500',
      component: () => import('@/views/error-page/index.vue'),
      meta: { title: '异常页500', keepAlive: false }
    }
  ]
}
