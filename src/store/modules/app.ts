import { defineStore } from 'pinia'

interface AppState {
  systemName: string
  activePath: string | null
  menuList: App.MenuItem[]
}

// 注意: id 是必填的, 并且所有 Store 中唯一, 因为Pinia会将它在devtools显示

export const useAppStore = defineStore({
  id: 'App',
  state: (): AppState => {
    return {
      systemName: 'Admin管理系统', // 系统名称
      activePath: window.sessionStorage.getItem('ActivePath') || '/home', // 当前激活的路径
      menuList: [
        {
          icon: 'menu-work',
          id: 'GZT',
          name: '工作台',
          path: '/home'
        },
        {
          icon: 'menu-indicator',
          id: 'ZBGL',
          name: '指标管理',
          path: '/indicator-manage'
        },
        {
          icon: 'menu-file',
          id: 'WJGL',
          name: '文件管理',
          path: '/file-manage'
        },
        {
          icon: 'menu-form',
          id: 'BDGL',
          name: '表单管理',
          path: '/form-manage'
        },
        {
          icon: 'menu-system',
          id: 'XTGL',
          name: '系统管理',
          children: [
            {
              id: 'BMGL',
              name: '部门管理',
              path: '/system-manage/dept-manage'
            },
            {
              id: 'YHGL',
              name: '用户管理',
              path: '/system-manage/user-manage'
            },
            {
              id: 'JSGL',
              name: '角色管理',
              path: '/system-manage/role-manage'
            },
            {
              id: 'CDGL',
              name: '菜单管理',
              path: '/system-manage/menu-manage'
            },
            {
              id: 'NQST',
              name: '内嵌页面',
              path: '/system-manage'
            }
          ]
        },
        {
          icon: 'menu-page',
          id: 'ERROR',
          name: '异常页',
          children: [
            {
              id: 'error403',
              name: '异常页403',
              path: '/error-page/403'
            },
            {
              id: 'error404',
              name: '异常页404',
              path: '/error-page/404'
            },
            {
              id: 'error500',
              name: '异常页500',
              path: '/error-page/500'
            }
          ]
        },
        {
          icon: 'menu-test',
          id: 'TEST',
          name: '测试页',
          path: '/test'
        }
      ]
    }
  },
  getters: {},
  actions: {
    // 设置激活路径地址
    setActivePath(path: string) {
      this.activePath = path
      window.sessionStorage.setItem('ActivePath', path)
    }
  }
})
