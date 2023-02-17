export default [
  {
    path: '/dashboard/workplace',
    name: 'DashboardWorkplace',
    component: () => import('@/views/dashboard/workplace/index.vue'),
    meta: {
      title: '工作台'
    }
  },
  {
    path: '/dashboard/analyse',
    name: 'DashboardAnalyse',
    component: () => import('@/views/dashboard/analyse/index.vue'),
    meta: {
      title: '分析页'
    }
  }
]
