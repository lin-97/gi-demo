import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const Document: AppRouteRecordRaw = {
  path: '/document',
  name: 'Document',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.document',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 9
  },
  children: [
    {
      path: 'vue3',
      name: 'DocumentVue3',
      component: () => import('@/views/document/vue3/index.vue'),
      meta: { title: 'vue3文档', keepAlive: false, locale: 'menu.document.vue3', requiresAuth: false, roles: ['*'] }
    },
    {
      path: 'arco-design',
      name: 'DocumentArcoDesign',
      component: () => import('@/views/document/arco-design/index.vue'),
      meta: {
        title: 'arco design文档',
        keepAlive: false,
        locale: 'menu.document.arco-design',
        requiresAuth: false,
        roles: ['*']
      }
    },
    {
      path: 'juejin',
      name: 'DocumentJueJin',
      component: () => import('@/views/document/juejin/index.vue'),
      meta: { title: '掘金', keepAlive: false, locale: 'menu.document.juejin', requiresAuth: false, roles: ['*'] }
    }
  ]
}

export default Document
