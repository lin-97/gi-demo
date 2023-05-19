export default [
  {
    path: '',
    redirect: '/analyse',
    component: 'Layout',
    children: [
      {
        name: 'Analyse',
        path: 'analyse',
        component: 'dashboard/analyse/index',
        meta: {
          hideen: false,
          title: '分析页',
          icon: 'icon-bar-chart',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/data',
    component: 'Layout',
    redirect: '/data/main',
    meta: {
      hideen: false,
      title: '数据管理',
      icon: 'icon-list',
      keepAlive: true
    },
    children: [
      {
        name: 'Data',
        path: 'main',
        component: 'data/main/index',
        meta: {
          hidden: false,
          title: '数据管理',
          icon: 'icon-list',
          keepAlive: true
        }
      },
      {
        name: 'DataDetail',
        path: 'detail',
        component: 'data/detail/index',
        meta: {
          hidden: true,
          title: '详情',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/file',
    component: 'Layout',
    redirect: '/file/main',
    meta: {
      hideen: false,
      title: '文件管理',
      icon: 'icon-folder',
      keepAlive: true
    },
    children: [
      {
        name: 'File',
        path: 'main',
        component: 'file/main/index',
        meta: {
          title: '文件列表',
          icon: 'icon-folder',
          keepAlive: true,
          hidden: true
        }
      },
      {
        name: 'FileDetail',
        path: 'detail',
        component: 'file/detail/index',
        meta: {
          hidden: true,
          title: '详情',
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'System',
    path: '/system',
    redirect: 'noRedirect',
    component: 'Layout',
    meta: {
      hidden: false,
      alwaysShow: true,
      title: '系统管理',
      icon: 'icon-computer',
      keepAlive: false,
      link: null
    },
    children: [
      {
        name: 'User',
        path: 'user',
        component: 'system/user/index',
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'icon-user',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Role',
        path: 'role',
        component: 'system/role/index',
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'icon-common',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Menu',
        path: 'menu',
        component: 'system/menu/index',
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'icon-menu',
          keepAlive: false,
          link: null
        }
      },
      {
        name: 'Dept',
        path: 'dept',
        component: 'system/dept/index',
        meta: {
          hidden: false,
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
    component: 'Layout',
    meta: {
      hidden: false,
      title: '项目地址',
      icon: 'icon-attachment',
      keepAlive: false,
      link: 'https://gitee.com/lin0716/gi-demo'
    }
  }
]
