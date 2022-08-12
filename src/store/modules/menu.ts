import { defineStore } from 'pinia'

interface MenuState {
  menuTree: MenuItem[]
}

export const useMenuStore = defineStore({
  id: 'Menu',
  state: (): MenuState => {
    return {
      menuTree: [
        {
          icon: 'menu-work',
          id: 'YBP',
          name: '仪表盘',
          path: '/home',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'GZT',
              name: '工作台',
              path: '/home',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-indicator',
          id: 'ZBGL',
          name: '指标管理',
          path: '/indicator',
          keepAlive: true,
          hidden: false
        },
        {
          icon: 'menu-file',
          id: 'WJGL',
          name: '文件管理',
          path: '/file',
          keepAlive: false,
          hidden: false
        },
        {
          icon: 'menu-form',
          id: 'BDGL',
          name: '表单管理',
          path: '/form',
          keepAlive: true,
          hidden: false,
          children: [
            {
              id: 'JCBD',
              name: '基础表单',
              path: '/form/base-form',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'FBBD',
              name: '分步表单',
              path: '/form/step-form',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-table',
          id: 'BGGL',
          name: '表格管理',
          path: '/table',
          keepAlive: true,
          hidden: false,
          children: [
            {
              id: 'ZHBG',
              name: '综合表格',
              path: '/table/main-table',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'ZDYBG',
              name: '自定义表格',
              path: '/table/custom-table',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-system',
          id: 'XTGL',
          name: '系统管理',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'BMGL',
              name: '部门管理',
              path: '/system/dept-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'YHGL',
              name: '用户管理',
              path: '/system/user-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'JSGL',
              name: '角色管理',
              path: '/system/role-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'CDGL',
              name: '菜单管理',
              path: '/system/menu-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'GRZX',
              name: '个人中心',
              path: '/system/user-center',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'NQST',
              name: '内嵌页面',
              path: '/system',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-detail',
          id: 'XQYM',
          name: '详情页',
          path: '/detail',
          keepAlive: true,
          hidden: false,
          children: [
            {
              id: 'JCXQY',
              name: '基础详情页',
              path: '/detail/base-detail',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'GJXQY',
              name: '高级详情页',
              path: '/detail/senior-detail',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-error',
          id: 'ERROR',
          name: '异常页',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'error403',
              name: '403',
              path: '/error/403',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'error404',
              name: '404',
              path: '/error/404',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'error500',
              name: '500',
              path: '/error/500',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-result',
          id: 'RESULT',
          name: '结果页',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'page-success',
              name: '成功页',
              path: '/result/success',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'page-fail',
              name: '失败页',
              path: '/result/fail',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-document',
          id: 'WD',
          name: '文档',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'vue3',
              name: 'vue3文档',
              path: '/document/vue3',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'arco-design',
              name: 'arco ui文档',
              path: '/document/arco-design',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'juejin',
              name: '掘金',
              path: '/document/juejin',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-test',
          id: 'Tool',
          name: '功能页',
          path: '/tool',
          keepAlive: false,
          hidden: false
        },
        {
          icon: 'menu-nav',
          id: 'DHY',
          name: '导航',
          path: '/navigation',
          keepAlive: false,
          hidden: false
        },
        {
          icon: 'menu-about',
          id: 'ABOUT',
          name: '关于',
          path: '/about',
          keepAlive: false,
          hidden: false
        }
      ]
    }
  },
  getters: {},
  actions: {}
})
