import { defineStore } from 'pinia'

interface MenuState {
  list: Menu.MenuItem[]
}

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示
export const useMenuStore = defineStore({
  id: 'Menu',
  state: (): MenuState => {
    return {
      list: [
        {
          icon: 'menu-work',
          id: 'YBP',
          name: '仪表盘',
          path: '/',
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
          path: '/indicator-manage',
          keepAlive: true,
          hidden: false
        },
        {
          icon: 'menu-file',
          id: 'WJGL',
          name: '文件管理',
          path: '/file-manage',
          keepAlive: false,
          hidden: false
        },
        {
          icon: 'menu-form',
          id: 'BDGL',
          name: '表单管理',
          path: '/form-manage',
          keepAlive: true,
          hidden: false
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
              path: '/system-manage/dept-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'YHGL',
              name: '用户管理',
              path: '/system-manage/user-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'JSGL',
              name: '角色管理',
              path: '/system-manage/role-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'CDGL',
              name: '菜单管理',
              path: '/system-manage/menu-manage',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'NQST',
              name: '内嵌页面',
              path: '/system-manage',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-page',
          id: 'ERROR',
          name: '异常页',
          keepAlive: false,
          hidden: false,
          children: [
            {
              id: 'error403',
              name: '403',
              path: '/error-page/403',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'error404',
              name: '404',
              path: '/error-page/404',
              keepAlive: false,
              hidden: false
            },
            {
              id: 'error500',
              name: '500',
              path: '/error-page/500',
              keepAlive: false,
              hidden: false
            }
          ]
        },
        {
          icon: 'menu-test',
          id: 'TEST',
          name: '测试页',
          path: '/test',
          keepAlive: false,
          hidden: false
        }
      ]
    }
  },
  getters: {},
  actions: {}
})
