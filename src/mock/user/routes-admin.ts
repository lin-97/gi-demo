export default [
  {
    name: 'Analyse',
    path: '/analyse',
    hideen: false,
    redirect: '/analyse',
    component: 'Layout',
    children: [
      {
        path: '',
        component: 'dashboard/analyse/index',
        meta: {
          title: '分析页',
          icon: 'icon-bar-chart',
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'Data',
    path: '/data',
    hideen: false,
    component: 'Layout',
    redirect: '/data/main',
    meta: {
      title: '数据页',
      icon: 'icon-list',
      keepAlive: true
    },
    children: [
      {
        path: '',
        component: 'data/main/index',
        hidden: true,
        meta: {
          title: '数据页',
          icon: 'icon-list',
          keepAlive: true
        }
      },
      {
        name: 'DataDetail',
        path: 'detail',
        component: 'data/detail/index',
        hidden: true,
        meta: {
          title: '详情',
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'File',
    path: '/file',
    hideen: false,
    component: 'Layout',
    redirect: '/file/main',
    meta: {
      title: '文件管理',
      icon: 'icon-folder',
      keepAlive: true
    },
    children: [
      {
        path: '',
        component: 'file/main/index',
        hidden: true,
        meta: {
          title: '文件列表',
          icon: 'icon-folder',
          keepAlive: true
        }
      },
      {
        name: 'FileDetail',
        path: 'detail',
        component: 'file/detail/index',
        hidden: true,
        meta: {
          title: '详情',
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'icon-computer',
      keepAlive: false,
      link: null
    },
    children: [
      {
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          icon: 'icon-user',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'icon-common',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'icon-menu',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Dept',
        path: 'dept',
        hidden: false,
        component: 'system/dept/index',
        meta: {
          title: '部门管理',
          icon: 'icon-mind-mapping',
          keepAlive: false,
          link: null
        }
      }
    ]
  },
  {
    name: 'Https://gitee.com/lin0716/gi-demo',
    path: 'https://gitee.com/lin0716/gi-demo',
    hidden: false,
    component: 'Layout',
    meta: {
      title: '项目地址',
      icon: 'icon-attachment',
      keepAlive: false,
      link: 'https://gitee.com/lin0716/gi-demo'
    }
  }
]
