export default [
  {
    path: '/tool',
    name: 'Tool',
    component: () => import('@/views/tool/index.vue'),
    meta: {
      title: '功能页',
      keepAlive: false
    }
  }
]
