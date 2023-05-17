export default {
  path: '/system',
  name: 'System',
  component: import('@/layout/index.vue'),
  redirect: '/system/dept',
  meta: { title: '系统管理', keepAlive: false },
  children: [
    {
      path: '/system/dept',
      name: 'SystemDept',
      component: () => import('@/views/system/dept/index.vue'),
      meta: { title: '部门管理', keepAlive: false }
    },
    {
      path: '/system/user',
      name: 'SystemUser',
      component: () => import('@/views/system/user/index.vue'),
      meta: { title: '用户管理', keepAlive: false }
    },
    {
      path: '/system/role',
      name: 'SystemRole',
      component: () => import('@/views/system/role/index.vue'),
      meta: { title: '角色管理', keepAlive: false }
    },
    {
      path: '/system/menu',
      name: 'SystemMenu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: { title: '菜单管理', keepAlive: false }
    },
    {
      path: '/system/account',
      name: 'SystemAccount',
      component: () => import('@/views/system/account/index.vue'),
      meta: { title: '个人中心', keepAlive: false }
    }
  ]
}
