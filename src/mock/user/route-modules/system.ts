export default {
  name: 'System',
  path: '/system',
  redirect: 'noRedirect',
  component: 'Layout',
  meta: {
    hidden: false,
    alwaysShow: true,
    title: '系统管理',
    svgIcon: 'menu-system',
    keepAlive: false
  },
  children: [
    {
      name: 'SystemUser',
      path: 'user',
      component: 'system/user/index',
      meta: {
        hidden: false,
        title: '用户管理',
        icon: 'icon-user',
        keepAlive: false
      }
    },
    {
      name: 'SystemRole',
      path: 'role',
      component: 'system/role/index',
      meta: {
        hidden: false,
        title: '角色管理',
        icon: 'icon-common',
        keepAlive: false
      }
    },
    {
      name: 'SystemMenu',
      path: 'menu',
      component: 'system/menu/index',
      meta: {
        hidden: false,
        title: '菜单管理',
        icon: 'icon-menu',
        keepAlive: false
      }
    },
    {
      name: 'SystemDept',
      path: 'dept',
      component: 'system/dept/index',
      meta: {
        hidden: false,
        title: '部门管理',
        icon: 'icon-mind-mapping',
        keepAlive: false
      }
    }
  ]
}
