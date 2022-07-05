export default {
  path: '/system-manage',
  name: 'SystemManage',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/system-manage',
      name: 'SystemManageMain',
      component: () => import('@/views/system-manage/index.vue'),
      meta: { title: '系统管理', keepAlive: false }
    },
    {
      path: '/system-manage/dept-manage',
      name: 'SystemManageDeptManage',
      component: () => import('@/views/system-manage/dept-manage/index.vue'),
      meta: { title: '部门管理', keepAlive: false }
    },
    {
      path: '/system-manage/user-manage',
      name: 'SystemManageUserManage',
      component: () => import('@/views/system-manage/user-manage/index.vue'),
      meta: { title: '用户管理', keepAlive: false }
    },
    {
      path: '/system-manage/role-manage',
      name: 'SystemManageRoleManage',
      component: () => import('@/views/system-manage/role-manage/index.vue'),
      meta: { title: '角色管理', keepAlive: false }
    },
    {
      path: '/system-manage/menu-manage',
      name: 'SystemManageMenuManage',
      component: () => import('@/views/system-manage/menu-manage/index.vue'),
      meta: { title: '菜单管理', keepAlive: false }
    },
    {
      path: '/system-manage/user-center',
      name: 'SystemManageUserCenter',
      component: () => import('@/views/system-manage/user-center/index.vue'),
      meta: { title: '个人中心', keepAlive: false }
    }
  ]
}
