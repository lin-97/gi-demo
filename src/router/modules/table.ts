export default {
  path: '/table',
  name: 'Table',
  component: import('@/layout/index.vue'),
  redirect: '/table/main',
  meta: {
    title: '表格管理',
    keepAlive: false
  },
  children: [
    {
      path: '/table/main',
      name: 'TableMain',
      component: () => import('@/views/table/main/index.vue'),
      meta: { title: '综合表格', keepAlive: false }
    },
    {
      path: '/table/custom',
      name: 'TableCustom',
      component: () => import('@/views/table/custom/index.vue'),
      meta: { title: '自定义表格', keepAlive: false }
    }
  ]
}
