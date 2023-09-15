export default {
  path: '',
  name: 'System',
  redirect: 'noRedirect',
  component: 'Layout',
  meta: {
    hidden: false,
    alwaysShow: true,
    title: '系统管理',
    svgIcon: 'menu-system',
    keepAlive: false,
    sort: 9
  },
  children: [
    {
      path: '/system/user',
      name: 'SystemUser',
      component: 'system/user/index',
      meta: {
        hidden: false,
        title: '用户管理',
        icon: 'icon-user',
        keepAlive: false,
        sort: 1
      }
    },
    {
      path: '/system/role',
      name: 'SystemRole',
      component: 'system/role/index',
      meta: {
        hidden: false,
        title: '角色管理',
        icon: 'icon-common',
        keepAlive: false,
        sort: 2
      }
    },
    {
      path: '/system/dept',
      name: 'SystemDept',
      component: 'system/dept/index',
      meta: {
        hidden: false,
        title: '部门管理',
        icon: 'icon-mind-mapping',
        keepAlive: false,
        sort: 3
      }
    },
    {
      path: '/system/menu',
      name: 'SystemMenu',
      component: 'system/menu/index',
      meta: {
        hidden: false,
        title: '菜单管理',
        icon: 'icon-menu',
        keepAlive: false,
        sort: 4
      }
    }
  ]
}
