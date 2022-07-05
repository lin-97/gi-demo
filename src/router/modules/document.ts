export default {
  path: '/document',
  name: 'Document',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/document/vue3',
      name: 'DocumentVue3',
      component: () => import('@/views/document/vue3/index.vue'),
      meta: { title: 'vue3文档', keepAlive: false }
    },
    {
      path: '/document/arco-design',
      name: 'DocumentArcoDesign',
      component: () => import('@/views/document/arco-design/index.vue'),
      meta: { title: 'arco design文档', keepAlive: false }
    },
    {
      path: '/document/juejin',
      name: 'DocumentJueJin',
      component: () => import('@/views/document/juejin/index.vue'),
      meta: { title: '掘金', keepAlive: false }
    }
  ]
}
