import { DEFAULT_LAYOUT } from '../base'

const DASHBOARD = {
  path: '/dashboard',
  name: 'Dashboard',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作台',
        locale: 'menu.dashboard.workplace'
      }
    }
  ]
}

export default DASHBOARD
