import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const About: AppRouteRecordRaw = {
  path: '/about',
  name: 'About',
  redirect: '/about',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '关于',
    locale: 'menu.about',
    requiresAuth: true,
    icon: 'menu-about',
    hideChildrenInMenu: true,
    order: 12
  },
  children: [
    {
      path: '',
      name: 'About',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        keepAlive: false,
        locale: 'menu.about.main',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default About
