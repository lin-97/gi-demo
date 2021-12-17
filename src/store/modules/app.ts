// 系统信息

type ThemeMode = 'light' | 'dark'

type MenuItem = {
  icon: string
  id: string
  name: string
  path: string
}

type State = {
  systemName: string
  ThemeMode: string
  activePath: string
  menuList: MenuItem[]
}

const state: State = {
  systemName: 'Admin管理系统', // 系统名称
  ThemeMode: (window.localStorage.getItem('ThemeMode') || 'light') as ThemeMode, // light简白模式  dark暗黑模式
  activePath: JSON.parse(window.localStorage.getItem('ActivePath')) || '/home', // 当前激活的路径
  menuList: [
    {
      icon: 'IconRobot',
      id: 'GZT',
      name: '工作台',
      path: '/home'
    },
    {
      icon: 'IconCopyright',
      id: 'ZBGL',
      name: '指标管理',
      path: '/indicator-manage'
    },
    {
      icon: 'IconSettings',
      id: 'ZBGL',
      name: '个人中心',
      path: '/user'
    },
    {
      icon: 'IconSettings',
      id: 'TEST',
      name: '测试',
      path: '/test'
    }
  ]
}

const getters = {
  storeGetMenuList(state) {
    return state.menuList
  }
}

const mutations = {
  // 设置激活路径地址
  storeSetActivePath(state, path: string) {
    state.activePath = path
    window.localStorage.setItem('ActivePath', JSON.stringify(path))
  },
  // 设置暗黑模式
  storeSetThemeMode(state, value: ThemeMode) {
    state.ThemeMode = value
    window.localStorage.setItem('ThemeMode', value)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
