import { DEFAULT_LAYOUT } from '../base'
import type { AppRouteRecordRaw } from '../types'

const System: AppRouteRecordRaw = {
  path: '/system',
  name: 'System',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.system',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 5
  },
  children: [
    {
      path: '',
      name: 'SystemMain',
      component: () => import('@/views/system/index.vue'),
      meta: { title: '系统管理', keepAlive: false, locale: 'menu.system.main', requiresAuth: true, roles: ['admin'] }
    },
    {
      path: 'dept-manage',
      name: 'SystemDeptManage',
      component: () => import('@/views/system/dept-manage/index.vue'),
      meta: {
        title: '部门管理',
        keepAlive: false,
        locale: 'menu.system.dept-manage',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'user-manage',
      name: 'SystemUserManage',
      component: () => import('@/views/system/user-manage/index.vue'),
      meta: {
        title: '用户管理',
        keepAlive: false,
        locale: 'menu.system.user-manage',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'role-manage',
      name: 'SystemRoleManage',
      component: () => import('@/views/system/role-manage/index.vue'),
      meta: {
        title: '角色管理',
        keepAlive: false,
        locale: 'menu.system.role-manage',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'menu-manage',
      name: 'SystemMenuManage',
      component: () => import('@/views/system/menu-manage/index.vue'),
      meta: {
        title: '菜单管理',
        keepAlive: false,
        locale: 'menu.system.menu-manage',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'user-center',
      name: 'SystemUserCenter',
      component: () => import('@/views/system/user-center/index.vue'),
      meta: {
        title: '个人中心',
        keepAlive: false,
        locale: 'menu.system.user-center',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default System
