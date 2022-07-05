export default {
  path: '/table-manage',
  name: 'TableManage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/table-manage/main-table',
      name: 'TableManageMainTable',
      component: () => import('@/views/table-manage/main-table/index.vue'),
      meta: { title: '综合表格', keepAlive: false }
    },
    {
      path: '/table-manage/custom-table',
      name: 'TableManageCustomTable',
      component: () => import('@/views/table-manage/custom-table/index.vue'),
      meta: { title: '自定义表格', keepAlive: false }
    }
  ]
}
