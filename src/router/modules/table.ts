export default {
  path: '/table',
  name: 'Table',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/table/main-table',
      name: 'TableMainTable',
      component: () => import('@/views/table/main-table/index.vue'),
      meta: { title: '综合表格', keepAlive: false }
    },
    {
      path: '/table/custom-table',
      name: 'TableCustomTable',
      component: () => import('@/views/table/custom-table/index.vue'),
      meta: { title: '自定义表格', keepAlive: false }
    }
  ]
}
