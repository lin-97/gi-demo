export default [
  {
    path: '/navigation',
    name: 'Navigation',
    component: () => import('@/views/navigation/index.vue'),
    meta: {
      title: '导航',
      keepAlive: false
    }
  }
]
