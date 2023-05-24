import type { MockRouteItem } from './type'

export default [
  {
    path: '',
    redirect: '/analyse',
    component: 'Layout',
    children: [
      {
        name: 'Analyse',
        path: 'analyse',
        component: 'analyse/index',
        meta: {
          hideen: false,
          title: '分析页',
          svgIcon: 'menu-chart',
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
      svgIcon: 'menu-data',
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
          keepAlive: false,
          affix: false,
          activeMenu: '/data/main'
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
      svgIcon: 'menu-file',
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
          hidden: false
        }
      },
      {
        name: 'FileDetail',
        path: 'detail',
        component: 'file/detail/index',
        meta: {
          hidden: true,
          title: '详情',
          keepAlive: false,
          affix: false,
          activeMenu: '/file/main'
        }
      }
    ]
  },
  {
    name: 'Form',
    path: '/form',
    redirect: '/form/base',
    component: 'Layout',
    meta: {
      hidden: false,
      title: '表单管理',
      svgIcon: 'menu-form',
      keepAlive: false
    },
    children: [
      {
        name: 'FormBase',
        path: 'base',
        component: 'form/base/index',
        meta: {
          hidden: false,
          title: '基础表单',
          icon: 'icon-menu',
          keepAlive: false
        }
      },
      {
        name: 'Form',
        path: 'step',
        component: 'form/step/index',
        meta: {
          hidden: false,
          title: '分步表单',
          icon: 'icon-menu',
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'Table',
    path: '/table',
    redirect: '/table/main',
    component: 'Layout',
    meta: {
      hidden: false,
      alwaysShow: true,
      title: '表格管理',
      svgIcon: 'menu-table',
      keepAlive: false
    },
    children: [
      {
        name: 'TableMain',
        path: 'main',
        component: 'table/main/index',
        meta: {
          hidden: false,
          title: '基础表格',
          icon: 'icon-menu',
          keepAlive: false
        }
      },
      {
        name: 'TableCustom',
        path: 'custom',
        component: 'table/custom/index',
        meta: {
          hidden: false,
          title: '自定义表单',
          icon: 'icon-menu',
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
  },
  {
    name: 'Error',
    path: '/error',
    redirect: '/form/403',
    component: 'Layout',
    meta: {
      hidden: false,
      title: '错误页',
      svgIcon: 'menu-error',
      keepAlive: false
    },
    children: [
      {
        name: 'Error403',
        path: '403',
        component: 'error/403',
        meta: {
          hidden: false,
          title: '403页',
          icon: 'icon-menu',
          keepAlive: false,
          affix: false
        }
      },
      {
        name: 'Error404',
        path: '404',
        component: 'error/404',
        meta: {
          hidden: false,
          title: '404页',
          icon: 'icon-menu',
          keepAlive: false,
          affix: false
        }
      },
      {
        name: 'Error405',
        path: '405',
        component: 'error/405',
        meta: {
          hidden: false,
          title: '405页',
          icon: 'icon-menu',
          keepAlive: false,
          affix: false
        }
      }
    ]
  },
  {
    name: 'Result',
    path: '/result',
    redirect: '/result/success',
    component: 'Layout',
    meta: {
      hidden: false,
      title: '结果页',
      svgIcon: 'menu-result',
      keepAlive: false
    },
    children: [
      {
        name: 'ResultSuccess',
        path: 'success',
        component: 'result/success/index',
        meta: {
          hidden: false,
          title: '成功页',
          icon: 'icon-menu',
          keepAlive: false,
          affix: false
        }
      },
      {
        name: 'ResultFail',
        path: 'fail',
        component: 'result/fail/index',
        meta: {
          hidden: false,
          title: '失败页',
          icon: 'icon-menu',
          keepAlive: false,
          affix: false
        }
      }
    ]
  },
  {
    path: '',
    redirect: '/example',
    component: 'Layout',
    children: [
      {
        name: 'Example',
        path: 'example',
        component: 'example/index',
        meta: {
          hideen: false,
          title: '功能页',
          svgIcon: 'menu-example',
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '',
    redirect: '/about',
    component: 'Layout',
    children: [
      {
        name: 'About',
        path: 'about',
        component: 'about/index',
        meta: {
          hideen: false,
          title: '关于我们',
          svgIcon: 'menu-about',
          keepAlive: false
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
      svgIcon: 'menu-gitee',
      keepAlive: false
    }
  },
  {
    path: '/user',
    name: 'User',
    component: 'Layout',
    // redirect: '/user/index',
    meta: {
      hideen: false,
      title: '个人中心',
      icon: 'icon-list',
      svgIcon: 'menu-user',
      keepAlive: true
    },
    children: [
      {
        name: 'User',
        path: '',
        component: 'user/index',
        redirect: '/user/index',
        meta: {
          hidden: true,
          title: '',
          icon: 'icon-list',
          keepAlive: true
          // affix: false
        },
        children: [
          {
            name: 'UserIndex',
            path: 'index',
            component: 'user/pages/index/index',
            meta: {
              hidden: true,
              title: '个人中心',
              icon: 'icon-list',
              keepAlive: false,
              animation: false
              // affix: false
            }
          },
          {
            name: 'UserNotice',
            path: 'notice',
            component: 'user/pages/notice/index',
            meta: {
              hidden: true,
              title: '消息通知',
              icon: 'icon-list',
              keepAlive: true
              // affix: false
            }
          }
        ]
      }
    ]
  }
] as MockRouteItem[]
