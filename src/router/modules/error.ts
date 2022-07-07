export default {
  path: '/error',
  name: 'Error',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/error/403',
      name: 'Error403',
      component: () => import('@/views/error/index.vue'),
      meta: { title: '异常页403', keepAlive: false }
    },
    {
      path: '/error/404',
      name: 'Error404',
      component: () => import('@/views/error/index.vue'),
      meta: { title: '异常页404', keepAlive: false }
    },
    {
      path: '/error/500',
      name: 'Error500',
      component: () => import('@/views/error/index.vue'),
      meta: { title: '异常页500', keepAlive: false }
    }
  ]
}
