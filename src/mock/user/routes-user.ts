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
          title: '列表',
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
    redirect: '/table/base',
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
        path: 'base',
        component: 'table/base/index',
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
    redirect: '/demo',
    component: 'Layout',
    children: [
      {
        name: 'Demo',
        path: 'demo',
        component: 'demo/index',
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
  }
] as MockRouteItem[]
