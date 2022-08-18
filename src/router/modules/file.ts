import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const File: AppRouteRecordRaw = {
  path: '/file',
  name: 'File',
  component: DEFAULT_LAYOUT,
  meta: {
    title: '文件管理',
    locale: 'menu.file',
    requiresAuth: true,
    icon: 'menu-file',
    order: 2,
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      name: 'File',
      component: () => import('@/views/file/main/index.vue'),
      meta: {
        title: '文件管理',
        keepAlive: false,
        locale: 'menu.file.main',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'detail',
      name: 'FileDetail',
      component: () => import('@/views/file/detail/index.vue'),
      meta: {
        title: '文件详情',
        keepAlive: false,
        locale: 'menu.file.detail',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default File
