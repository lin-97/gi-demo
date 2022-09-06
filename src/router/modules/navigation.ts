import { DEFAULT_LAYOUT } from '../base'

const Navigation = {
  path: '/navigation',
  name: 'Navigation',
  redirect: '/navigation',
  component: DEFAULT_LAYOUT,
  children: [
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
}

export default Navigation
